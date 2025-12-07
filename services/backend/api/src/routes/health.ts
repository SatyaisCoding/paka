// src/routes/health.ts
import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import { checkQdrantHealth } from '../lib/qdrant.js';
import { getProviderInfo, isEmbeddingConfigured } from '../services/embedding.service.js';
import { getLLMProviderInfo, isLLMConfigured } from '../services/llm.service.js';

const health = new Hono();

// Basic health check
health.get('/', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Detailed health check with all services
health.get('/detailed', async (c) => {
  const checks: Record<string, { status: string; latencyMs?: number; error?: string; details?: any }> = {};
  let allHealthy = true;

  // Check PostgreSQL
  const dbStart = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.postgres = {
      status: 'healthy',
      latencyMs: Date.now() - dbStart,
    };
  } catch (err: any) {
    checks.postgres = {
      status: 'unhealthy',
      error: err.message,
    };
    allHealthy = false;
  }

  // Check Qdrant
  const qdrantStart = Date.now();
  try {
    const healthy = await checkQdrantHealth();
    checks.qdrant = {
      status: healthy ? 'healthy' : 'unhealthy',
      latencyMs: Date.now() - qdrantStart,
    };
    if (!healthy) allHealthy = false;
  } catch (err: any) {
    checks.qdrant = {
      status: 'unhealthy',
      error: err.message,
    };
    allHealthy = false;
  }

  // Check Embedding Service (OpenAI)
  const embeddingInfo = getProviderInfo();
  const embeddingConfigured = isEmbeddingConfigured();
  checks.embeddings = {
    status: embeddingConfigured ? 'configured' : 'not_configured',
    details: {
      provider: embeddingInfo.provider,
      model: embeddingInfo.model,
      dimension: embeddingInfo.dimension,
    },
  };
  if (!embeddingConfigured) {
    checks.embeddings.error = 'OPENAI_API_KEY not set';
    allHealthy = false;
  }

  // Check LLM Service (OpenAI)
  const llmInfo = getLLMProviderInfo();
  const llmConfigured = isLLMConfigured();
  checks.llm = {
    status: llmConfigured ? 'configured' : 'not_configured',
    details: {
      provider: llmInfo.provider,
      model: llmInfo.model,
    },
  };
  if (!llmConfigured) {
    checks.llm.error = 'OPENAI_API_KEY not set';
    allHealthy = false;
  }

  return c.json({
    status: allHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    services: checks,
  }, allHealthy ? 200 : 503);
});

// Readiness probe (for k8s)
health.get('/ready', async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return c.json({ ready: true });
  } catch {
    return c.json({ ready: false }, 503);
  }
});

// Liveness probe (for k8s)
health.get('/live', (c) => {
  return c.json({ alive: true });
});

export default health;
