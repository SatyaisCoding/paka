// src/schemas/reminder.schema.ts
import { z } from 'zod';

// Create reminder validation
export const createReminderSchema = z.object({
  text: z
    .string({ required_error: 'Reminder text is required' })
    .min(1, 'Reminder text is required')
    .max(500, 'Reminder text must be less than 500 characters'),
  remindAt: z
    .string({ required_error: 'Reminder time is required' })
    .datetime({ message: 'Invalid date format. Use ISO 8601 format (e.g., 2025-12-10T10:00:00Z)' }),
});

// Update reminder validation
export const updateReminderSchema = z.object({
  text: z
    .string()
    .min(1, 'Reminder text cannot be empty')
    .max(500, 'Reminder text must be less than 500 characters')
    .optional(),
  remindAt: z
    .string()
    .datetime({ message: 'Invalid date format. Use ISO 8601 format' })
    .optional(),
  sent: z
    .boolean()
    .optional(),
});

// Snooze reminder validation
export const snoozeReminderSchema = z.object({
  minutes: z
    .number()
    .int()
    .min(1, 'Snooze must be at least 1 minute')
    .max(1440, 'Snooze cannot exceed 24 hours (1440 minutes)')
    .optional()
    .default(15),
});

// Query params for listing reminders
export const listRemindersQuerySchema = z.object({
  sent: z
    .enum(['true', 'false'])
    .optional(),
  upcoming: z
    .enum(['true', 'false'])
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

// Type exports
export type CreateReminderInput = z.infer<typeof createReminderSchema>;
export type UpdateReminderInput = z.infer<typeof updateReminderSchema>;
export type SnoozeReminderInput = z.infer<typeof snoozeReminderSchema>;
export type ListRemindersQuery = z.infer<typeof listRemindersQuerySchema>;

