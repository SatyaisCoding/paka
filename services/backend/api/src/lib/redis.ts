// src/lib/redis.ts
import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

type RedisClient = ReturnType<typeof createClient>;

let redisClient: RedisClient | null = null;
let isConnected = false;

/**
 * Get or create Redis client
 */
export async function getRedisClient(): Promise<RedisClient> {
  if (redisClient && isConnected) {
    return redisClient;
  }

  redisClient = createClient({ url: REDIS_URL });

  redisClient.on('error', (err) => {
    console.error('Redis error:', err);
    isConnected = false;
  });

  redisClient.on('connect', () => {
    console.log('✅ Redis connected');
    isConnected = true;
  });

  redisClient.on('disconnect', () => {
    console.log('⚠️ Redis disconnected');
    isConnected = false;
  });

  await redisClient.connect();
  return redisClient;
}

/**
 * Initialize Redis connection
 */
export async function initRedis(): Promise<void> {
  try {
    await getRedisClient();
  } catch (err) {
    console.warn('⚠️ Redis not available:', (err as Error).message);
  }
}

/**
 * Check Redis health
 */
export async function checkRedisHealth(): Promise<boolean> {
  try {
    if (!redisClient || !isConnected) {
      return false;
    }
    await redisClient.ping();
    return true;
  } catch {
    return false;
  }
}

/**
 * Close Redis connection
 */
export async function closeRedis(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    isConnected = false;
  }
}

export default { getRedisClient, initRedis, checkRedisHealth, closeRedis };
