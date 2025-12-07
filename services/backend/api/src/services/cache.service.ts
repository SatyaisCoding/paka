// src/services/cache.service.ts
import { createHash } from 'crypto';
import { getRedisClient } from '../lib/redis.js';

// Cache TTL defaults (in seconds)
const TTL = {
  QUERY: 60 * 60,        // 1 hour for query results
  EMBEDDING: 60 * 60 * 24, // 24 hours for embeddings
  USER: 60 * 5,          // 5 minutes for user data
  STATS: 60 * 10,        // 10 minutes for stats
};

/**
 * Generate cache key
 */
function generateKey(prefix: string, ...parts: (string | number)[]): string {
  return `paka:${prefix}:${parts.join(':')}`;
}

/**
 * Get cached value
 */
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const client = await getRedisClient();
    const value = await client.get(key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return null;
  } catch (err) {
    console.warn('Cache get error:', err);
    return null;
  }
}

/**
 * Set cached value
 */
export async function setCached<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
  try {
    const client = await getRedisClient();
    const serialized = JSON.stringify(value);
    if (ttlSeconds) {
      await client.setEx(key, ttlSeconds, serialized);
    } else {
      await client.set(key, serialized);
    }
  } catch (err) {
    console.warn('Cache set error:', err);
  }
}

/**
 * Delete cached value
 */
export async function deleteCached(key: string): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.del(key);
  } catch (err) {
    console.warn('Cache delete error:', err);
  }
}

/**
 * Delete by pattern
 */
export async function deleteByPattern(pattern: string): Promise<number> {
  try {
    const client = await getRedisClient();
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(keys);
    }
    return keys.length;
  } catch (err) {
    console.warn('Cache delete pattern error:', err);
    return 0;
  }
}

// ============ Query Cache ============

/**
 * Cache query result
 */
export async function cacheQueryResult(
  userId: number,
  queryHash: string,
  result: any
): Promise<void> {
  const key = generateKey('query', userId, queryHash);
  await setCached(key, result, TTL.QUERY);
}

/**
 * Get cached query result
 */
export async function getCachedQueryResult(
  userId: number,
  queryHash: string
): Promise<any | null> {
  const key = generateKey('query', userId, queryHash);
  return getCached(key);
}

/**
 * Invalidate user's query cache
 */
export async function invalidateUserQueryCache(userId: number): Promise<number> {
  return deleteByPattern(`paka:query:${userId}:*`);
}

// ============ Embedding Cache ============

/**
 * Cache embedding for text
 */
export async function cacheEmbedding(
  textHash: string,
  embedding: number[]
): Promise<void> {
  const key = generateKey('embedding', textHash);
  await setCached(key, embedding, TTL.EMBEDDING);
}

/**
 * Get cached embedding
 */
export async function getCachedEmbedding(textHash: string): Promise<number[] | null> {
  const key = generateKey('embedding', textHash);
  return getCached(key);
}

// ============ User Cache ============

/**
 * Cache user data
 */
export async function cacheUser(userId: number, userData: any): Promise<void> {
  const key = generateKey('user', userId);
  await setCached(key, userData, TTL.USER);
}

/**
 * Get cached user
 */
export async function getCachedUser(userId: number): Promise<any | null> {
  const key = generateKey('user', userId);
  return getCached(key);
}

/**
 * Invalidate user cache
 */
export async function invalidateUserCache(userId: number): Promise<void> {
  const key = generateKey('user', userId);
  await deleteCached(key);
}

// ============ Stats Cache ============

/**
 * Cache stats
 */
export async function cacheStats(
  type: string,
  userId: number,
  stats: any
): Promise<void> {
  const key = generateKey('stats', type, userId);
  await setCached(key, stats, TTL.STATS);
}

/**
 * Get cached stats
 */
export async function getCachedStats(type: string, userId: number): Promise<any | null> {
  const key = generateKey('stats', type, userId);
  return getCached(key);
}

// ============ Rate Limiting ============

/**
 * Check rate limit (sliding window)
 */
export async function checkRateLimit(
  identifier: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  try {
    const client = await getRedisClient();
    const key = generateKey('ratelimit', identifier);
    const now = Date.now();
    const windowStart = now - windowSeconds * 1000;

    // Remove old entries
    await client.zRemRangeByScore(key, 0, windowStart);

    // Count current requests
    const count = await client.zCard(key);

    if (count >= limit) {
      // Get oldest entry to calculate reset time
      const oldest = await client.zRange(key, 0, 0, { REV: false });
      const resetIn = oldest.length > 0 
        ? Math.ceil((parseInt(oldest[0]) + windowSeconds * 1000 - now) / 1000)
        : windowSeconds;

      return { allowed: false, remaining: 0, resetIn };
    }

    // Add new request
    await client.zAdd(key, { score: now, value: now.toString() });
    await client.expire(key, windowSeconds);

    return { 
      allowed: true, 
      remaining: limit - count - 1, 
      resetIn: windowSeconds 
    };
  } catch (err) {
    console.warn('Rate limit check error:', err);
    // Allow on error to not block requests
    return { allowed: true, remaining: limit, resetIn: windowSeconds };
  }
}

// ============ Utility ============

/**
 * Generate hash for text (for cache keys)
 */
export function hashText(text: string): string {
  return createHash('md5').update(text).digest('hex');
}

/**
 * Get cache stats
 */
export async function getCacheInfo(): Promise<{
  connected: boolean;
  keys?: number;
  memory?: string;
}> {
  try {
    const client = await getRedisClient();
    const info = await client.info('memory');
    const dbSize = await client.dbSize();
    
    const memoryMatch = info.match(/used_memory_human:(\S+)/);
    
    return {
      connected: true,
      keys: dbSize,
      memory: memoryMatch ? memoryMatch[1] : 'unknown',
    };
  } catch {
    return { connected: false };
  }
}

