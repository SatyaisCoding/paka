// src/services/embedding.service.ts
// Supports both Gemini (free) and OpenAI

const EMBEDDING_PROVIDER = process.env.EMBEDDING_PROVIDER || 'gemini';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Model configurations
const MODELS = {
  gemini: {
    embedding: 'text-embedding-004',
    dimension: 768,
  },
  openai: {
    embedding: 'text-embedding-3-small',
    dimension: 1536,
  },
};

const currentModel = MODELS[EMBEDDING_PROVIDER as keyof typeof MODELS] || MODELS.gemini;
export const EMBEDDING_MODEL = currentModel.embedding;
export const EMBEDDING_DIMENSION = currentModel.dimension;

export interface EmbeddingResult {
  embedding: number[];
  model: string;
  tokenCount: number;
}

/**
 * Generate embedding using Google Gemini (FREE!)
 */
async function generateGeminiEmbedding(text: string): Promise<EmbeddingResult> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'models/text-embedding-004',
        content: { parts: [{ text }] },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini embedding failed: ${error}`);
  }

  const data = await response.json();

  return {
    embedding: data.embedding.values,
    model: 'text-embedding-004',
    tokenCount: Math.ceil(text.length / 4),
  };
}

/**
 * Generate embedding using OpenAI
 */
async function generateOpenAIEmbedding(text: string): Promise<EmbeddingResult> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI embedding failed: ${error}`);
  }

  const data = await response.json();

  return {
    embedding: data.data[0].embedding,
    model: 'text-embedding-3-small',
    tokenCount: data.usage.total_tokens,
  };
}

/**
 * Generate embedding for a single text
 */
export async function generateEmbedding(text: string): Promise<EmbeddingResult> {
  if (EMBEDDING_PROVIDER === 'openai') {
    return generateOpenAIEmbedding(text);
  }
  return generateGeminiEmbedding(text);
}

/**
 * Generate embeddings for multiple texts
 */
export async function generateEmbeddings(texts: string[]): Promise<EmbeddingResult[]> {
  if (texts.length === 0) return [];

  const results: EmbeddingResult[] = [];
  for (const text of texts) {
    const result = await generateEmbedding(text);
    results.push(result);
    // Small delay for rate limiting
    if (texts.length > 5) {
      await new Promise(r => setTimeout(r, 100));
    }
  }
  return results;
}

/**
 * Check if embedding service is configured
 */
export function isEmbeddingConfigured(): boolean {
  if (EMBEDDING_PROVIDER === 'openai') {
    return !!OPENAI_API_KEY;
  }
  return !!GEMINI_API_KEY;
}

/**
 * Get embedding dimension
 */
export function getEmbeddingDimension(): number {
  return EMBEDDING_DIMENSION;
}

/**
 * Get provider info
 */
export function getProviderInfo(): { provider: string; model: string; dimension: number } {
  return {
    provider: EMBEDDING_PROVIDER,
    model: EMBEDDING_MODEL,
    dimension: EMBEDDING_DIMENSION,
  };
}
