// src/routes/vectors.ts
import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, getValidatedBody } from '../middleware/validate.js';
import { z } from 'zod';
import {
  processDocumentChunks,
  semanticSearch,
  deleteDocumentVectors,
  getUserVectorStats,
  chunkText,
} from '../services/vector.service.js';
import { isEmbeddingConfigured, getProviderInfo } from '../services/embedding.service.js';
import { checkQdrantHealth } from '../lib/qdrant.js';

const vectors = new Hono();

// All vector routes require authentication
vectors.use('*', authMiddleware);

// Schemas
const processDocumentSchema = z.object({
  documentId: z.number().int().positive(),
  chunkSize: z.number().int().min(100).max(4000).optional(),
  overlap: z.number().int().min(0).max(1000).optional(),
});

const processTextSchema = z.object({
  text: z.string().min(1).max(100000),
  documentId: z.number().int().positive(),
  chunkSize: z.number().int().min(100).max(4000).optional(),
  overlap: z.number().int().min(0).max(1000).optional(),
});

const searchSchema = z.object({
  query: z.string().min(1).max(2000),
  limit: z.number().int().min(1).max(50).optional(),
  scoreThreshold: z.number().min(0).max(1).optional(),
  documentIds: z.array(z.number().int().positive()).optional(),
});

const previewChunksSchema = z.object({
  text: z.string().min(1).max(100000),
  chunkSize: z.number().int().min(100).max(4000).optional(),
  overlap: z.number().int().min(0).max(1000).optional(),
});

// ============ HEALTH CHECK ============
// GET /vectors/health - Check vector services health
vectors.get('/health', async (c) => {
  const embeddingConfigured = isEmbeddingConfigured();
  const qdrantHealthy = await checkQdrantHealth();
  const providerInfo = getProviderInfo();

  return c.json({
    ok: true,
    services: {
      embeddings: {
        configured: embeddingConfigured,
        status: embeddingConfigured ? 'ready' : 'not_configured',
        provider: providerInfo.provider,
        model: providerInfo.model,
        dimension: providerInfo.dimension,
      },
      qdrant: {
        healthy: qdrantHealthy,
        status: qdrantHealthy ? 'connected' : 'disconnected',
      },
    },
    ready: embeddingConfigured && qdrantHealthy,
  });
});

// ============ PROCESS DOCUMENT ============
// POST /vectors/process - Process a document and generate embeddings
vectors.post('/process', validateBody(processDocumentSchema), async (c) => {
  try {
    const userId = getUserId(c);
    const { documentId, chunkSize = 1000, overlap = 200 } = getValidatedBody<{
      documentId: number;
      chunkSize?: number;
      overlap?: number;
    }>(c);

    // Check if document exists and belongs to user
    const document = await prisma.document.findFirst({
      where: { id: documentId, userId },
    });

    if (!document) {
      return c.json({ ok: false, error: 'Document not found' }, 404);
    }

    // Check if document already has chunks
    const existingChunks = await prisma.chunk.count({
      where: { documentId },
    });

    if (existingChunks > 0) {
      return c.json({
        ok: false,
        error: 'Document already processed',
        existingChunks,
        hint: 'Delete existing vectors first with DELETE /vectors/document/:id',
      }, 409);
    }

    // For now, we need the text content to be provided
    // In a full implementation, we'd fetch from S3/storage
    return c.json({
      ok: false,
      error: 'Use POST /vectors/process-text to provide text content',
      hint: 'Document storage integration pending',
    }, 400);
  } catch (err: any) {
    console.error('Process document error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /vectors/process-text - Process raw text for a document
vectors.post('/process-text', validateBody(processTextSchema), async (c) => {
  try {
    const userId = getUserId(c);
    const { text, documentId, chunkSize = 1000, overlap = 200 } = getValidatedBody<{
      text: string;
      documentId: number;
      chunkSize?: number;
      overlap?: number;
    }>(c);

    // Check if document exists and belongs to user
    const document = await prisma.document.findFirst({
      where: { id: documentId, userId },
    });

    if (!document) {
      return c.json({ ok: false, error: 'Document not found' }, 404);
    }

    // Check if document already has chunks
    const existingChunks = await prisma.chunk.count({
      where: { documentId },
    });

    if (existingChunks > 0) {
      return c.json({
        ok: false,
        error: 'Document already has embeddings',
        existingChunks,
        hint: 'Delete existing vectors first with DELETE /vectors/document/:id',
      }, 409);
    }

    // Process chunks and generate embeddings
    const result = await processDocumentChunks(
      documentId,
      userId,
      text,
      chunkSize,
      overlap
    );

    return c.json({
      ok: true,
      message: 'Document processed successfully',
      documentId,
      ...result,
    }, 201);
  } catch (err: any) {
    console.error('Process text error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ SEMANTIC SEARCH ============
// POST /vectors/search - Semantic search across documents
vectors.post('/search', validateBody(searchSchema), async (c) => {
  try {
    const userId = getUserId(c);
    const { query, limit = 10, scoreThreshold = 0.5, documentIds } = getValidatedBody<{
      query: string;
      limit?: number;
      scoreThreshold?: number;
      documentIds?: number[];
    }>(c);

    // If documentIds provided, verify ownership
    if (documentIds && documentIds.length > 0) {
      const ownedDocs = await prisma.document.count({
        where: {
          id: { in: documentIds },
          userId,
        },
      });

      if (ownedDocs !== documentIds.length) {
        return c.json({ ok: false, error: 'Some documents not found or access denied' }, 403);
      }
    }

    // Perform semantic search
    const results = await semanticSearch(query, userId, {
      limit,
      scoreThreshold,
      documentIds,
    });

    // Get document details for results
    const docIds = [...new Set(results.map(r => r.documentId))];
    const documents = await prisma.document.findMany({
      where: { id: { in: docIds } },
      select: { id: true, title: true, docType: true },
    });
    const docMap = new Map(documents.map(d => [d.id, d]));

    // Enrich results with document info
    const enrichedResults = results.map(r => ({
      ...r,
      document: docMap.get(r.documentId) || null,
    }));

    // Log query
    await prisma.queryLog.create({
      data: {
        userId,
        query,
        response: JSON.stringify({ resultCount: results.length }),
        usedChunks: JSON.stringify(results.map(r => r.chunkId)),
        latencyMs: 0, // TODO: measure actual latency
      },
    });

    return c.json({
      ok: true,
      query,
      results: enrichedResults,
      total: results.length,
    });
  } catch (err: any) {
    console.error('Search error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ PREVIEW CHUNKS ============
// POST /vectors/preview-chunks - Preview how text will be chunked
vectors.post('/preview-chunks', validateBody(previewChunksSchema), async (c) => {
  try {
    const { text, chunkSize = 1000, overlap = 200 } = getValidatedBody<{
      text: string;
      chunkSize?: number;
      overlap?: number;
    }>(c);

    const chunks = chunkText(text, chunkSize, overlap);

    return c.json({
      ok: true,
      totalChunks: chunks.length,
      totalCharacters: text.length,
      chunkSize,
      overlap,
      chunks: chunks.map((chunk, index) => ({
        index,
        preview: chunk.text.substring(0, 100) + (chunk.text.length > 100 ? '...' : ''),
        length: chunk.text.length,
        startPos: chunk.startPos,
        endPos: chunk.endPos,
      })),
    });
  } catch (err: any) {
    console.error('Preview chunks error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ GET STATS ============
// GET /vectors/stats - Get vector statistics for user
vectors.get('/stats', async (c) => {
  try {
    const userId = getUserId(c);
    const stats = await getUserVectorStats(userId);

    return c.json({
      ok: true,
      stats,
    });
  } catch (err: any) {
    console.error('Get stats error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ GET DOCUMENT CHUNKS ============
// GET /vectors/document/:id - Get chunks for a specific document
vectors.get('/document/:id', async (c) => {
  try {
    const userId = getUserId(c);
    const documentId = parseInt(c.req.param('id'), 10);

    if (isNaN(documentId) || documentId <= 0) {
      return c.json({ ok: false, error: 'Invalid document ID' }, 400);
    }

    // Check document ownership
    const document = await prisma.document.findFirst({
      where: { id: documentId, userId },
      select: { id: true, title: true, docType: true },
    });

    if (!document) {
      return c.json({ ok: false, error: 'Document not found' }, 404);
    }

    // Get chunks
    const chunks = await prisma.chunk.findMany({
      where: { documentId },
      select: {
        id: true,
        chunkHash: true,
        startPos: true,
        endPos: true,
        tokenCount: true,
        createdAt: true,
        embedding: {
          select: {
            id: true,
            model: true,
            vectorRef: true,
          },
        },
      },
      orderBy: { startPos: 'asc' },
    });

    return c.json({
      ok: true,
      document,
      chunks,
      total: chunks.length,
    });
  } catch (err: any) {
    console.error('Get document chunks error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ DELETE DOCUMENT VECTORS ============
// DELETE /vectors/document/:id - Delete all vectors for a document
vectors.delete('/document/:id', async (c) => {
  try {
    const userId = getUserId(c);
    const documentId = parseInt(c.req.param('id'), 10);

    if (isNaN(documentId) || documentId <= 0) {
      return c.json({ ok: false, error: 'Invalid document ID' }, 400);
    }

    // Check document ownership
    const document = await prisma.document.findFirst({
      where: { id: documentId, userId },
    });

    if (!document) {
      return c.json({ ok: false, error: 'Document not found' }, 404);
    }

    // Delete vectors from Qdrant
    const deletedCount = await deleteDocumentVectors(documentId);

    // Delete chunks and embeddings from database (cascade)
    await prisma.chunk.deleteMany({
      where: { documentId },
    });

    return c.json({
      ok: true,
      message: 'Vectors deleted successfully',
      documentId,
      deletedCount,
    });
  } catch (err: any) {
    console.error('Delete document vectors error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ GET CHUNK BY ID ============
// GET /vectors/chunk/:id - Get a specific chunk with its embedding info
vectors.get('/chunk/:id', async (c) => {
  try {
    const userId = getUserId(c);
    const chunkId = parseInt(c.req.param('id'), 10);

    if (isNaN(chunkId) || chunkId <= 0) {
      return c.json({ ok: false, error: 'Invalid chunk ID' }, 400);
    }

    const chunk = await prisma.chunk.findFirst({
      where: { id: chunkId, userId },
      include: {
        document: {
          select: { id: true, title: true, docType: true },
        },
        embedding: true,
      },
    });

    if (!chunk) {
      return c.json({ ok: false, error: 'Chunk not found' }, 404);
    }

    return c.json({
      ok: true,
      chunk,
    });
  } catch (err: any) {
    console.error('Get chunk error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default vectors;

