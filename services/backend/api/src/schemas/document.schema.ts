// src/schemas/document.schema.ts
import { z } from 'zod';

// Valid document types
const docTypeEnum = z.enum(['pdf', 'txt', 'md', 'email', 'html', 'doc', 'docx']);

// Create document validation
export const createDocumentSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title is required')
    .max(300, 'Title must be less than 300 characters'),
  docType: docTypeEnum.refine((val) => val !== undefined, {
    message: 'Document type is required',
  }),
  s3Path: z
    .string({ required_error: 'S3 path is required' })
    .min(1, 'S3 path is required')
    .max(500, 'S3 path must be less than 500 characters'),
  sourceId: z
    .number()
    .int()
    .positive()
    .optional()
    .nullable(),
  size: z
    .number()
    .int()
    .min(0)
    .optional(),
  language: z
    .string()
    .max(20, 'Language must be less than 20 characters')
    .optional(),
});

// Update document validation
export const updateDocumentSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(300, 'Title must be less than 300 characters')
    .optional(),
  docType: docTypeEnum.optional(),
  s3Path: z
    .string()
    .min(1, 'S3 path cannot be empty')
    .max(500, 'S3 path must be less than 500 characters')
    .optional(),
  language: z
    .string()
    .max(20, 'Language must be less than 20 characters')
    .nullable()
    .optional(),
});

// Query params for listing documents
export const listDocumentsQuerySchema = z.object({
  docType: docTypeEnum.optional(),
  sourceId: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive())
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

// Bulk delete validation
export const bulkDeleteDocumentsSchema = z.object({
  ids: z
    .array(z.number().int().positive())
    .min(1, 'At least one document ID is required')
    .max(100, 'Cannot delete more than 100 documents at once'),
});

// Type exports
export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
export type ListDocumentsQuery = z.infer<typeof listDocumentsQuerySchema>;
export type BulkDeleteDocuments = z.infer<typeof bulkDeleteDocumentsSchema>;
export type DocType = z.infer<typeof docTypeEnum>;

