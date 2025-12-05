// src/routes/documents.ts
import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, validateQuery, getValidatedBody, getValidatedQuery } from '../middleware/validate.js';
import {
  createDocumentSchema,
  updateDocumentSchema,
  listDocumentsQuerySchema,
  bulkDeleteDocumentsSchema,
  type CreateDocumentInput,
  type UpdateDocumentInput,
  type ListDocumentsQuery,
  type BulkDeleteDocuments,
} from '../schemas/document.schema.js';
import { z } from 'zod';

const documents = new Hono();

// Apply auth middleware to all routes
documents.use('*', authMiddleware);

// Extended create schema with hash
const createDocumentSchemaExtended = createDocumentSchema.extend({
  hash: z.string().max(100).optional(),
});

// Extended query schema for documents list
const listDocsQuerySchema = listDocumentsQuerySchema.extend({
  page: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().min(1)).optional(),
  search: z.string().max(200).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'title', 'size']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// ============ CREATE ============
// POST /documents - Create a new document
documents.post('/', validateBody(createDocumentSchemaExtended), async (c) => {
  const userId = getUserId(c);

  try {
    const { title, docType, s3Path, size, language, sourceId, hash } = getValidatedBody<
      CreateDocumentInput & { hash?: string }
    >(c);

    // Check for duplicate hash (same file already uploaded)
    if (hash) {
      const existing = await prisma.document.findUnique({ where: { hash } });
      if (existing) {
        return c.json({ ok: false, error: 'Document with same content already exists', existingId: existing.id }, 409);
      }
    }

    // If sourceId provided, verify it belongs to user
    if (sourceId) {
      const source = await prisma.source.findFirst({
        where: { id: sourceId, userId },
      });
      if (!source) {
        return c.json({ ok: false, error: 'Source not found or access denied' }, 404);
      }
    }

    // Create document
    const document = await prisma.document.create({
      data: {
        userId,
        title,
        docType: docType.toLowerCase(),
        s3Path,
        size: size ?? null,
        language: language ?? null,
        sourceId: sourceId ?? null,
        hash: hash ?? null,
      },
    });

    return c.json({ ok: true, document }, 201);
  } catch (err: any) {
    console.error('Create document error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to create document' }, 500);
  }
});

// ============ READ ALL ============
// GET /documents - List all documents for user
documents.get('/', validateQuery(listDocsQuerySchema), async (c) => {
  const userId = getUserId(c);

  try {
    const query = getValidatedQuery<ListDocumentsQuery & { page?: number; search?: string; sortBy?: string; sortOrder?: string }>(c);
    const { docType, sourceId, page, search, sortBy, sortOrder, limit, offset } = query;

    const pageNum = page ?? 1;
    const limitNum = limit ?? 20;
    const skip = offset ?? (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = { userId };

    if (docType) {
      where.docType = docType.toLowerCase();
    }

    if (sourceId) {
      where.sourceId = sourceId;
    }

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    // Build orderBy
    const orderByField = sortBy || 'createdAt';
    const orderByDirection = sortOrder === 'asc' ? 'asc' : 'desc';

    // Get documents with pagination
    const [documentsList, total] = await Promise.all([
      prisma.document.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [orderByField]: orderByDirection },
        include: {
          source: {
            select: { id: true, provider: true, displayName: true },
          },
          _count: {
            select: { chunks: true },
          },
        },
      }),
      prisma.document.count({ where }),
    ]);

    return c.json({
      ok: true,
      documents: documentsList,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err: any) {
    console.error('List documents error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to list documents' }, 500);
  }
});

// ============ STATS ============
// GET /documents/stats/summary - Get document statistics
documents.get('/stats/summary', async (c) => {
  const userId = getUserId(c);

  try {
    const [totalDocs, totalSize, byType, bySource, recentDocs] = await Promise.all([
      // Total documents
      prisma.document.count({ where: { userId } }),
      
      // Total size
      prisma.document.aggregate({
        where: { userId },
        _sum: { size: true },
      }),
      
      // Count by docType
      prisma.document.groupBy({
        by: ['docType'],
        where: { userId },
        _count: { id: true },
      }),
      
      // Count by source
      prisma.document.groupBy({
        by: ['sourceId'],
        where: { userId },
        _count: { id: true },
      }),
      
      // Recent 5 documents
      prisma.document.findMany({
        where: { userId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, docType: true, createdAt: true },
      }),
    ]);

    return c.json({
      ok: true,
      stats: {
        totalDocuments: totalDocs,
        totalSizeBytes: totalSize._sum.size || 0,
        byType: byType.map((t) => ({ type: t.docType, count: t._count.id })),
        bySource: bySource.map((s) => ({ sourceId: s.sourceId, count: s._count.id })),
        recentDocuments: recentDocs,
      },
    });
  } catch (err: any) {
    console.error('Get stats error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to get stats' }, 500);
  }
});

// ============ READ ONE ============
// GET /documents/:id - Get a single document
documents.get('/:id', async (c) => {
  const userId = getUserId(c);
  const id = parseInt(c.req.param('id'), 10);

  if (isNaN(id) || id <= 0) {
    return c.json({ ok: false, error: 'Invalid document ID' }, 400);
  }

  try {
    const document = await prisma.document.findFirst({
      where: { id, userId },
      include: {
        source: {
          select: { id: true, provider: true, displayName: true },
        },
        chunks: {
          select: {
            id: true,
            chunkHash: true,
            startPos: true,
            endPos: true,
            tokenCount: true,
            createdAt: true,
          },
          orderBy: { startPos: 'asc' },
        },
      },
    });

    if (!document) {
      return c.json({ ok: false, error: 'Document not found' }, 404);
    }

    return c.json({ ok: true, document });
  } catch (err: any) {
    console.error('Get document error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to get document' }, 500);
  }
});

// ============ UPDATE ============
// PATCH /documents/:id - Update a document
documents.patch('/:id', validateBody(updateDocumentSchema), async (c) => {
  const userId = getUserId(c);
  const id = parseInt(c.req.param('id'), 10);

  if (isNaN(id) || id <= 0) {
    return c.json({ ok: false, error: 'Invalid document ID' }, 400);
  }

  try {
    // Check ownership
    const existing = await prisma.document.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Document not found' }, 404);
    }

    const { title, docType, s3Path, language } = getValidatedBody<UpdateDocumentInput>(c);

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (docType !== undefined) updateData.docType = docType.toLowerCase();
    if (s3Path !== undefined) updateData.s3Path = s3Path;
    if (language !== undefined) updateData.language = language || null;

    const document = await prisma.document.update({
      where: { id },
      data: updateData,
    });

    return c.json({ ok: true, document });
  } catch (err: any) {
    console.error('Update document error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to update document' }, 500);
  }
});

// ============ DELETE ============
// DELETE /documents/:id - Delete a document
documents.delete('/:id', async (c) => {
  const userId = getUserId(c);
  const id = parseInt(c.req.param('id'), 10);

  if (isNaN(id) || id <= 0) {
    return c.json({ ok: false, error: 'Invalid document ID' }, 400);
  }

  try {
    // Check ownership
    const existing = await prisma.document.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Document not found' }, 404);
    }

    // Delete document (chunks will cascade delete)
    await prisma.document.delete({
      where: { id },
    });

    return c.json({ ok: true, message: 'Document deleted successfully' });
  } catch (err: any) {
    console.error('Delete document error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to delete document' }, 500);
  }
});

// ============ BULK DELETE ============
// POST /documents/bulk-delete - Delete multiple documents
documents.post('/bulk-delete', validateBody(bulkDeleteDocumentsSchema), async (c) => {
  const userId = getUserId(c);

  try {
    const { ids } = getValidatedBody<BulkDeleteDocuments>(c);

    // Delete only user's documents
    const result = await prisma.document.deleteMany({
      where: {
        id: { in: ids },
        userId,
      },
    });

    return c.json({
      ok: true,
      message: `${result.count} document(s) deleted`,
      deletedCount: result.count,
    });
  } catch (err: any) {
    console.error('Bulk delete documents error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to delete documents' }, 500);
  }
});

export default documents;
