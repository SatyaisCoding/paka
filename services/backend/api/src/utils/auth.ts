// src/utils/auth.ts
import type { User } from '../lib/generated/prisma/client.js';

// Helper to build safe user object (excludes password)
export function safeUser(user: Partial<User>) {
  const { password, ...rest } = user as any;
  return rest;
}

// Helper to check if user owns a resource
export function isOwner(userId: number, resourceUserId: number): boolean {
  return userId === resourceUserId;
}
