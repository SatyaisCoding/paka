// src/utils/auth.ts
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import type { User } from '../lib/generated/prisma/client.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';
const JWT_EXPIRES_IN = '7d';

export function signJwt(payload: { userId: number; email: string }) {
  return sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt(token: string) {
  try {
    const decoded = verify(token, JWT_SECRET);
    return { ok: true, payload: decoded as any };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

// Helper to build safe user object returned to client
export function safeUser(user: Partial<User>) {
  const { password, ...rest } = user;
  return rest;
}
