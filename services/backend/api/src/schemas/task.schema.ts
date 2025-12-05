// src/schemas/task.schema.ts
import { z } from 'zod';

// Create task validation
export const createTaskSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  description: z
    .string()
    .max(2000, 'Description must be less than 2000 characters')
    .optional(),
  dueAt: z
    .string()
    .datetime({ message: 'Invalid date format. Use ISO 8601 format (e.g., 2025-12-10T10:00:00Z)' })
    .optional()
    .nullable(),
});

// Update task validation
export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(200, 'Title must be less than 200 characters')
    .optional(),
  description: z
    .string()
    .max(2000, 'Description must be less than 2000 characters')
    .nullable()
    .optional(),
  dueAt: z
    .string()
    .datetime({ message: 'Invalid date format. Use ISO 8601 format' })
    .nullable()
    .optional(),
  completed: z
    .boolean()
    .optional(),
});

// Query params for listing tasks
export const listTasksQuerySchema = z.object({
  completed: z
    .enum(['true', 'false'])
    .optional(),
  sortBy: z
    .enum(['createdAt', 'dueAt', 'title'])
    .optional(),
  order: z
    .enum(['asc', 'desc'])
    .optional(),
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
});

// Bulk operations validation
export const bulkTaskIdsSchema = z.object({
  ids: z
    .array(z.number().int().positive())
    .min(1, 'At least one task ID is required')
    .max(100, 'Cannot process more than 100 tasks at once'),
});

// Type exports
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type ListTasksQuery = z.infer<typeof listTasksQuerySchema>;
export type BulkTaskIds = z.infer<typeof bulkTaskIdsSchema>;

