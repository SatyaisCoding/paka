// src/middleware/validate.ts
import { createMiddleware } from 'hono/factory';
import { z } from 'zod';
type ZodSchema = z.ZodTypeAny;

// Type for validation error response
interface ValidationErrorResponse {
  ok: false;
  error: string;
  details: Array<{
    field: string;
    message: string;
  }>;
}

// Check if error is a Zod error (more reliable than instanceof)
function isZodError(error: unknown): error is z.ZodError {
  return (
    error !== null &&
    typeof error === 'object' &&
    'issues' in error &&
    Array.isArray((error as any).issues)
  );
}

// Format Zod errors into a clean response
function formatZodError(error: z.ZodError): ValidationErrorResponse {
  return {
    ok: false,
    error: 'Validation failed',
    details: error.issues.map((issue) => ({
      field: issue.path.join('.') || 'body',
      message: issue.message,
    })),
  };
}

// Middleware to validate request body
export function validateBody<T extends ZodSchema>(schema: T) {
  return createMiddleware(async (c, next) => {
    try {
      const body = await c.req.json();
      const validated = schema.parse(body);
      c.set('validatedBody', validated);
      await next();
    } catch (error) {
      if (isZodError(error)) {
        return c.json(formatZodError(error), 400);
      }
      // JSON parsing error
      if (error instanceof SyntaxError) {
        return c.json({
          ok: false,
          error: 'Invalid JSON in request body',
          details: [{ field: 'body', message: 'Request body must be valid JSON' }],
        }, 400);
      }
      throw error;
    }
  });
}

// Middleware to validate query parameters
export function validateQuery<T extends ZodSchema>(schema: T) {
  return createMiddleware(async (c, next) => {
    try {
      const query = c.req.query();
      const validated = schema.parse(query);
      c.set('validatedQuery', validated);
      await next();
    } catch (error) {
      if (isZodError(error)) {
        return c.json(formatZodError(error), 400);
      }
      throw error;
    }
  });
}

// Middleware to validate URL parameters
export function validateParams<T extends ZodSchema>(schema: T) {
  return createMiddleware(async (c, next) => {
    try {
      const params = c.req.param();
      const validated = schema.parse(params);
      c.set('validatedParams', validated);
      await next();
    } catch (error) {
      if (isZodError(error)) {
        return c.json(formatZodError(error), 400);
      }
      throw error;
    }
  });
}

// Helper to get validated data from context
export function getValidatedBody<T>(c: any): T {
  return c.get('validatedBody') as T;
}

export function getValidatedQuery<T>(c: any): T {
  return c.get('validatedQuery') as T;
}

export function getValidatedParams<T>(c: any): T {
  return c.get('validatedParams') as T;
}

// Common param schemas
export const idParamSchema = z.object({
  id: z.string().transform((val) => {
    const num = parseInt(val, 10);
    if (isNaN(num) || num <= 0) {
      throw new Error('Invalid ID');
    }
    return num;
  }),
});

export type IdParam = z.infer<typeof idParamSchema>;

// Declare types for Hono context
declare module 'hono' {
  interface ContextVariableMap {
    validatedBody: unknown;
    validatedQuery: unknown;
    validatedParams: unknown;
  }
}
