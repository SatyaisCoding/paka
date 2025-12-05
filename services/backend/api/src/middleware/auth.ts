// src/middleware/auth.ts
import type { Context, Next } from 'hono';
import pkg from 'jsonwebtoken';
const { verify } = pkg;
import prisma from '../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface JWTPayload {
  userId: number;
  email: string;
}

// Middleware to verify JWT and attach user to context
export async function authMiddleware(c: Context, next: Next) {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Missing or invalid authorization header' }, 401);
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return c.json({ error: 'Token is required' }, 401);
    }
    
    // Verify JWT token
    const decoded = verify(token, JWT_SECRET) as unknown as JWTPayload;
    
    if (!decoded || !decoded.userId) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 401);
    }

    // Attach user to context
    c.set('user', user);
    c.set('userId', user.id);

    await next();
  } catch (error: any) {
    console.error('Auth middleware error:', error.message);
    return c.json({ error: 'Authentication failed' }, 401);
  }
}

// Helper to get current user from context
export function getUser(c: Context) {
  return c.get('user');
}

export function getUserId(c: Context): number {
  return c.get('userId');
}

