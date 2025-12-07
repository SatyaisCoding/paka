// src/routes/query.ts
import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, getValidatedBody } from '../middleware/validate.js';
import { queryRateLimiter } from '../middleware/rateLimit.js';
import { z } from 'zod';
import { semanticSearch } from '../services/vector.service.js';
import { generateRAGAnswer, isLLMConfigured, getLLMProviderInfo } from '../services/llm.service.js';
import { 
  cacheQueryResult, 
  getCachedQueryResult, 
  hashText,
  invalidateUserQueryCache 
} from '../services/cache.service.js';

const query = new Hono();

// Apply auth middleware
query.use('*', authMiddleware);

// Apply rate limiting to POST queries
query.post('*', queryRateLimiter);

// Schemas
const querySchema = z.object({
  query: z.string().min(1).max(2000),
  limit: z.number().int().min(1).max(20).optional(),
  documentIds: z.array(z.number().int().positive()).optional(),
  includeContext: z.boolean().optional(),
  generateAnswer: z.boolean().optional(),
  useCache: z.boolean().optional(), // Allow disabling cache
});

// GET /query - Get query history
query.get('/', async (c) => {
  try {
    const userId = getUserId(c);
    const { limit, offset } = c.req.query();

    const take = limit ? parseInt(limit, 10) : 20;
    const skip = offset ? parseInt(offset, 10) : 0;

    const [queries, total] = await Promise.all([
      prisma.queryLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      prisma.queryLog.count({ where: { userId } }),
    ]);

    return c.json({
      ok: true,
      queries,
      total,
      limit: take,
      offset: skip,
    });
  } catch (err: any) {
    console.error('Get queries error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /query/info - Get LLM provider info
query.get('/info', async (c) => {
  const llmInfo = getLLMProviderInfo();
  const configured = isLLMConfigured();

  return c.json({
    ok: true,
    llm: {
      ...llmInfo,
      configured,
    },
  });
});

// POST /query - Ask a question with RAG (with caching)
query.post('/', validateBody(querySchema), async (c) => {
  const startTime = Date.now();

  try {
    const userId = getUserId(c);
    const {
      query: userQuery,
      limit = 5,
      documentIds,
      includeContext = true,
      generateAnswer = true,
      useCache = true,
    } = getValidatedBody<{
      query: string;
      limit?: number;
      documentIds?: number[];
      includeContext?: boolean;
      generateAnswer?: boolean;
      useCache?: boolean;
    }>(c);

    // Generate cache key from query params
    const cacheKey = hashText(JSON.stringify({
      query: userQuery,
      limit,
      documentIds: documentIds?.sort(),
      includeContext,
      generateAnswer,
    }));

    // Check cache first
    if (useCache) {
      const cachedResult = await getCachedQueryResult(userId, cacheKey);
      if (cachedResult) {
        return c.json({
          ...cachedResult,
          cached: true,
          latencyMs: Date.now() - startTime,
        });
      }
    }

    // Verify document ownership if specified
    if (documentIds && documentIds.length > 0) {
      const ownedDocs = await prisma.document.count({
        where: { id: { in: documentIds }, userId },
      });
      if (ownedDocs !== documentIds.length) {
        return c.json({ ok: false, error: 'Some documents not found or access denied' }, 403);
      }
    }

    // Perform semantic search
    const searchResults = await semanticSearch(userQuery, userId, {
      limit,
      scoreThreshold: 0.5,
      documentIds,
    });

    // Build response
    const response: any = {
      ok: true,
      query: userQuery,
      results: searchResults.length,
    };

    // Include context if requested
    if (includeContext) {
      const docIds = [...new Set(searchResults.map(r => r.documentId))];
      const documents = await prisma.document.findMany({
        where: { id: { in: docIds } },
        select: { id: true, title: true, docType: true },
      });
      const docMap = new Map(documents.map(d => [d.id, d]));

      response.context = searchResults.map(r => ({
        ...r,
        document: docMap.get(r.documentId) || null,
      }));
    }

    // Generate RAG answer if requested and context exists
    if (generateAnswer && searchResults.length > 0) {
      if (isLLMConfigured()) {
        try {
          const ragResponse = await generateRAGAnswer(
            userQuery,
            searchResults.map(r => ({ text: r.text, score: r.score }))
          );
          response.answer = ragResponse.content;
          response.llm = {
            provider: ragResponse.provider,
            model: ragResponse.model,
          };
        } catch (err: any) {
          response.answerError = 'Failed to generate answer: ' + err.message;
        }
      } else {
        response.answerError = 'LLM not configured';
      }
    } else if (generateAnswer && searchResults.length === 0) {
      response.answer = 'No relevant context found in your documents to answer this question.';
    }

    const latencyMs = Date.now() - startTime;
    response.latencyMs = latencyMs;
    response.cached = false;

    // Cache the result (without latency)
    if (useCache && response.ok) {
      const cacheData = { ...response };
      delete cacheData.latencyMs;
      delete cacheData.cached;
      await cacheQueryResult(userId, cacheKey, cacheData);
    }

    // Log query
    await prisma.queryLog.create({
      data: {
        userId,
        query: userQuery,
        response: response.answer || null,
        usedChunks: JSON.stringify(searchResults.map(r => r.chunkId)),
        latencyMs,
      },
    });

    return c.json(response);
  } catch (err: any) {
    console.error('Query error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /query/clear-cache - Clear user's query cache
query.post('/clear-cache', async (c) => {
  try {
    const userId = getUserId(c);
    const deleted = await invalidateUserQueryCache(userId);
    
    return c.json({
      ok: true,
      message: `Cache cleared`,
      keysDeleted: deleted,
    });
  } catch (err: any) {
    console.error('Clear cache error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// DELETE /query/:id - Delete a query from history
query.delete('/:id', async (c) => {
  try {
    const userId = getUserId(c);
    const queryId = parseInt(c.req.param('id'), 10);

    if (isNaN(queryId) || queryId <= 0) {
      return c.json({ ok: false, error: 'Invalid query ID' }, 400);
    }

    const existing = await prisma.queryLog.findFirst({
      where: { id: queryId, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Query not found' }, 404);
    }

    await prisma.queryLog.delete({
      where: { id: queryId },
    });

    return c.json({ ok: true, message: 'Query deleted successfully' });
  } catch (err: any) {
    console.error('Delete query error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// DELETE /query/history - Clear all query history
query.delete('/history', async (c) => {
  try {
    const userId = getUserId(c);

    const result = await prisma.queryLog.deleteMany({
      where: { userId },
    });

    // Also clear cache
    await invalidateUserQueryCache(userId);

    return c.json({
      ok: true,
      message: `${result.count} queries deleted`,
      deletedCount: result.count,
    });
  } catch (err: any) {
    console.error('Clear history error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default query;
