// src/schemas/user.schema.ts
import { z } from 'zod';

// Create user validation (admin)
export const createUserSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be less than 50 characters')
    .optional(),
  timezone: z
    .string()
    .max(50, 'Timezone must be less than 50 characters')
    .optional(),
});

// Update user validation (admin)
export const updateUserSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .optional(),
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be less than 50 characters')
    .nullable()
    .optional(),
  timezone: z
    .string()
    .max(50, 'Timezone must be less than 50 characters')
    .nullable()
    .optional(),
});

// Query params for listing users
export const listUsersQuerySchema = z.object({
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().min(1).max(100))
    .optional(),
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().min(0))
    .optional(),
  search: z
    .string()
    .max(100)
    .optional(),
});

// Type exports
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;

