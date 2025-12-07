// src/middleware/rateLimit.ts
import type { Context, Next } from 'hono';
import { checkRateLimit } from '../services/cache.service.js';

interface RateLimitOptions {
  limit: number;        // Max requests
  windowSeconds: number; // Time window in seconds
  keyPrefix?: string;   // Custom key prefix
}

/**
 * Rate limiting middleware using Redis
 */
export function rateLimiter(options: RateLimitOptions) {
  const { limit, windowSeconds, keyPrefix = 'api' } = options;

  return async (c: Context, next: Next) => {
    // Get identifier (user ID or IP)
    const userId = c.get('userId');
    const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
    const identifier = userId ? `user:${userId}` : `ip:${ip}`;
    const key = `${keyPrefix}:${identifier}`;

    const result = await checkRateLimit(key, limit, windowSeconds);

    // Set rate limit headers
    c.header('X-RateLimit-Limit', limit.toString());
    c.header('X-RateLimit-Remaining', result.remaining.toString());
    c.header('X-RateLimit-Reset', result.resetIn.toString());

    if (!result.allowed) {
      return c.json({
        ok: false,
        error: 'Too many requests',
        retryAfter: result.resetIn,
      }, 429);
    }

    await next();
  };
}

// Pre-configured rate limiters
export const queryRateLimiter = rateLimiter({
  limit: 30,          // 30 queries
  windowSeconds: 60,  // per minute
  keyPrefix: 'query',
});

export const uploadRateLimiter = rateLimiter({
  limit: 10,          // 10 uploads
  windowSeconds: 60,  // per minute
  keyPrefix: 'upload',
});

export const authRateLimiter = rateLimiter({
  limit: 5,           // 5 attempts
  windowSeconds: 60,  // per minute
  keyPrefix: 'auth',
});

export const apiRateLimiter = rateLimiter({
  limit: 100,         // 100 requests
  windowSeconds: 60,  // per minute
  keyPrefix: 'api',
});

