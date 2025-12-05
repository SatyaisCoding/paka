// src/schemas/source.schema.ts
import { z } from 'zod';

// Valid provider types
const providerEnum = z.enum([
  'gmail',
  'drive',
  'notion',
  'dropbox',
  'onedrive',
  'upload',
  'url',
]);

// Create source validation
export const createSourceSchema = z.object({
  provider: providerEnum.refine((val) => val !== undefined, {
    message: 'Provider is required',
  }),
  providerId: z
    .string()
    .max(200, 'Provider ID must be less than 200 characters')
    .optional(),
  displayName: z
    .string()
    .min(1, 'Display name cannot be empty')
    .max(100, 'Display name must be less than 100 characters')
    .optional(),
  config: z
    .record(z.unknown())
    .optional(),
});

// Update source validation
export const updateSourceSchema = z.object({
  providerId: z
    .string()
    .max(200, 'Provider ID must be less than 200 characters')
    .optional(),
  displayName: z
    .string()
    .min(1, 'Display name cannot be empty')
    .max(100, 'Display name must be less than 100 characters')
    .optional(),
  config: z
    .record(z.unknown())
    .optional(),
});

// Query params for listing sources
export const listSourcesQuerySchema = z.object({
  provider: providerEnum.optional(),
});

// Type exports
export type CreateSourceInput = z.infer<typeof createSourceSchema>;
export type UpdateSourceInput = z.infer<typeof updateSourceSchema>;
export type ListSourcesQuery = z.infer<typeof listSourcesQuerySchema>;
export type Provider = z.infer<typeof providerEnum>;

