// src/services/vector.service.ts
import qdrant, { CHUNKS_COLLECTION } from '../lib/qdrant.js';
import { generateEmbedding, generateEmbeddings, EMBEDDING_DIMENSION } from './embedding.service.js';
import prisma from '../lib/prisma.js';
import { createHash } from 'crypto';

export interface ChunkInput {
  text: string;
  documentId: number;
  userId: number;
  startPos?: number;
  endPos?: number;
}

export interface VectorPoint {
  id: string;
  vector: number[];
  payload: {
    chunkId: number;
    documentId: number;
    userId: number;
    text: string;
    startPos?: number;
    endPos?: number;
  };
}

export interface SearchResult {
  chunkId: number;
  documentId: number;
  text: string;
  score: number;
  startPos?: number;
  endPos?: number;
}

/**
 * Generate a unique hash for chunk content
 */
function generateChunkHash(text: string, documentId: number): string {
  return createHash('sha256')
    .update(`${documentId}:${text}`)
    .digest('hex')
    .substring(0, 32);
}

/**
 * Create chunks from text with overlap
 */
export function chunkText(
  text: string,
  chunkSize: number = 1000,
  overlap: number = 200
): { text: string; startPos: number; endPos: number }[] {
  const chunks: { text: string; startPos: number; endPos: number }[] = [];
  
  if (text.length <= chunkSize) {
    return [{ text, startPos: 0, endPos: text.length }];
  }

  let startPos = 0;
  while (startPos < text.length) {
    const endPos = Math.min(startPos + chunkSize, text.length);
    const chunkText = text.slice(startPos, endPos);
    
    chunks.push({
      text: chunkText,
      startPos,
      endPos,
    });

    // Move start position with overlap
    startPos += chunkSize - overlap;
    
    // Prevent infinite loop for very small remaining text
    if (endPos === text.length) break;
  }

  return chunks;
}

/**
 * Process and store chunks with embeddings for a document
 */
export async function processDocumentChunks(
  documentId: number,
  userId: number,
  text: string,
  chunkSize: number = 1000,
  overlap: number = 200
): Promise<{ chunksCreated: number; embeddingsStored: number }> {
  // Generate text chunks
  const textChunks = chunkText(text, chunkSize, overlap);
  
  if (textChunks.length === 0) {
    return { chunksCreated: 0, embeddingsStored: 0 };
  }

  // Generate embeddings for all chunks
  const embeddings = await generateEmbeddings(textChunks.map(c => c.text));

  // Prepare data for database and vector store
  const chunkRecords: any[] = [];
  const vectorPoints: VectorPoint[] = [];

  for (let i = 0; i < textChunks.length; i++) {
    const chunk = textChunks[i];
    const embedding = embeddings[i];
    const chunkHash = generateChunkHash(chunk.text, documentId);

    // Check if chunk already exists
    const existingChunk = await prisma.chunk.findUnique({
      where: { chunkHash },
    });

    if (existingChunk) {
      console.log(`Chunk already exists: ${chunkHash}`);
      continue;
    }

    // Create chunk in database
    const chunkRecord = await prisma.chunk.create({
      data: {
        documentId,
        userId,
        text: chunk.text,
        chunkHash,
        startPos: chunk.startPos,
        endPos: chunk.endPos,
        tokenCount: embedding.tokenCount,
      },
    });

    // Create embedding record
    const embeddingRecord = await prisma.embedding.create({
      data: {
        chunkId: chunkRecord.id,
        model: embedding.model,
        vectorRef: `${CHUNKS_COLLECTION}:${chunkRecord.id}`,
      },
    });

    // Update chunk with embeddingId
    await prisma.chunk.update({
      where: { id: chunkRecord.id },
      data: { embeddingId: embeddingRecord.id },
    });

    chunkRecords.push(chunkRecord);

    // Prepare vector point for Qdrant
    vectorPoints.push({
      id: chunkRecord.id.toString(),
      vector: embedding.embedding,
      payload: {
        chunkId: chunkRecord.id,
        documentId,
        userId,
        text: chunk.text,
        startPos: chunk.startPos,
        endPos: chunk.endPos,
      },
    });
  }

  // Upsert vectors to Qdrant
  if (vectorPoints.length > 0) {
    await qdrant.upsert(CHUNKS_COLLECTION, {
      wait: true,
      points: vectorPoints.map(vp => ({
        id: parseInt(vp.id),
        vector: vp.vector,
        payload: vp.payload,
      })),
    });
  }

  return {
    chunksCreated: chunkRecords.length,
    embeddingsStored: vectorPoints.length,
  };
}

/**
 * Semantic search across user's documents
 */
export async function semanticSearch(
  query: string,
  userId: number,
  options: {
    limit?: number;
    scoreThreshold?: number;
    documentIds?: number[];
  } = {}
): Promise<SearchResult[]> {
  const { limit = 10, scoreThreshold = 0.5, documentIds } = options;

  // Generate embedding for query
  const { embedding } = await generateEmbedding(query);

  // Build filter
  const filter: any = {
    must: [
      { key: 'userId', match: { value: userId } },
    ],
  };

  if (documentIds && documentIds.length > 0) {
    filter.must.push({
      key: 'documentId',
      match: { any: documentIds },
    });
  }

  // Search in Qdrant
  const searchResults = await qdrant.search(CHUNKS_COLLECTION, {
    vector: embedding,
    limit,
    score_threshold: scoreThreshold,
    filter,
    with_payload: true,
  });

  // Map results
  return searchResults.map(result => ({
    chunkId: (result.payload as any).chunkId,
    documentId: (result.payload as any).documentId,
    text: (result.payload as any).text,
    score: result.score,
    startPos: (result.payload as any).startPos,
    endPos: (result.payload as any).endPos,
  }));
}

/**
 * Delete all vectors for a document
 */
export async function deleteDocumentVectors(documentId: number): Promise<number> {
  // Get all chunk IDs for the document
  const chunks = await prisma.chunk.findMany({
    where: { documentId },
    select: { id: true },
  });

  if (chunks.length === 0) return 0;

  const chunkIds = chunks.map(c => c.id);

  // Delete from Qdrant
  await qdrant.delete(CHUNKS_COLLECTION, {
    wait: true,
    filter: {
      must: [
        { key: 'documentId', match: { value: documentId } },
      ],
    },
  });

  return chunkIds.length;
}

/**
 * Delete all vectors for a user
 */
export async function deleteUserVectors(userId: number): Promise<number> {
  // Get count before deletion
  const count = await prisma.chunk.count({ where: { userId } });

  // Delete from Qdrant
  await qdrant.delete(CHUNKS_COLLECTION, {
    wait: true,
    filter: {
      must: [
        { key: 'userId', match: { value: userId } },
      ],
    },
  });

  return count;
}

/**
 * Get vector statistics for a user
 */
export async function getUserVectorStats(userId: number): Promise<{
  totalChunks: number;
  totalEmbeddings: number;
  byDocument: { documentId: number; title: string; chunkCount: number }[];
}> {
  const [totalChunks, totalEmbeddings, byDocument] = await Promise.all([
    prisma.chunk.count({ where: { userId } }),
    prisma.embedding.count({
      where: { chunk: { userId } },
    }),
    prisma.chunk.groupBy({
      by: ['documentId'],
      where: { userId },
      _count: { id: true },
    }),
  ]);

  // Get document titles
  const documentIds = byDocument.map(d => d.documentId);
  const documents = await prisma.document.findMany({
    where: { id: { in: documentIds } },
    select: { id: true, title: true },
  });

  const documentMap = new Map(documents.map(d => [d.id, d.title]));

  return {
    totalChunks,
    totalEmbeddings,
    byDocument: byDocument.map(d => ({
      documentId: d.documentId,
      title: documentMap.get(d.documentId) || 'Unknown',
      chunkCount: d._count.id,
    })),
  };
}

