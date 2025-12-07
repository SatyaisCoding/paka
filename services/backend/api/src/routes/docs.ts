// src/routes/docs.ts
import { Hono } from 'hono';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, getValidatedBody } from '../middleware/validate.js';
import { z } from 'zod';
import { isGoogleAuthenticated } from '../services/google-auth.service.js';
import {
  listDocs,
  searchDocs,
  getDoc,
  getDocContent,
  createDoc,
  appendToDoc,
  replaceInDoc,
  deleteDoc,
  getDocMetadata,
} from '../services/docs.service.js';

const docs = new Hono();

// Schemas
const createDocSchema = z.object({
  title: z.string().min(1).max(500),
  content: z.string().max(100000).optional(),
});

const appendDocSchema = z.object({
  text: z.string().min(1).max(50000),
});

const replaceDocSchema = z.object({
  find: z.string().min(1).max(1000),
  replace: z.string().max(1000),
});

// ============ STATUS ============

// GET /docs/status - Check if Google Docs is connected
docs.get('/status', authMiddleware, (c) => {
  return c.json({
    ok: true,
    connected: isGoogleAuthenticated(),
    message: isGoogleAuthenticated()
      ? 'Google Docs is connected'
      : 'Google Docs not connected. Use /google/auth to connect.',
  });
});

// ============ LIST & SEARCH ============

// GET /docs - List Google Docs
docs.get('/', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google not connected' }, 401);
    }

    const limit = parseInt(c.req.query('limit') || '20');
    const documents = await listDocs(limit);

    return c.json({
      ok: true,
      count: documents.length,
      documents,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /docs/search - Search Google Docs
docs.get('/search', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google not connected' }, 401);
    }

    const query = c.req.query('q');
    if (!query) {
      return c.json({ ok: false, error: 'Search query required (?q=...)' }, 400);
    }

    const limit = parseInt(c.req.query('limit') || '20');
    const documents = await searchDocs(query, limit);

    return c.json({
      ok: true,
      query,
      count: documents.length,
      documents,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ SINGLE DOCUMENT ============

// GET /docs/:id - Get a document
docs.get('/:id', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google not connected' }, 401);
    }

    const documentId = c.req.param('id');
    const includeContent = c.req.query('content') !== 'false';

    if (includeContent) {
      const doc = await getDoc(documentId);
      return c.json({ ok: true, document: doc });
    } else {
      const metadata = await getDocMetadata(documentId);
      return c.json({ ok: true, document: metadata });
    }
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /docs/:id/content - Get document content only
docs.get('/:id/content', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google not connected' }, 401);
    }

    const documentId = c.req.param('id');
    const content = await getDocContent(documentId);

    return c.json({
      ok: true,
      documentId,
      content,
      length: content.length,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ CREATE & MODIFY ============

// POST /docs - Create a new document
docs.post('/', authMiddleware, validateBody(createDocSchema), async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google not connected' }, 401);
    }

    const input = getValidatedBody<z.infer<typeof createDocSchema>>(c);
    const doc = await createDoc(input);

    return c.json({
      ok: true,
      message: 'Document created successfully',
      document: doc,
    }, 201);
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /docs/:id/append - Append text to document
docs.post('/:id/append', authMiddleware, validateBody(appendDocSchema), async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google not connected' }, 401);
    }

    const documentId = c.req.param('id');
    const { text } = getValidatedBody<{ text: string }>(c);

    await appendToDoc(documentId, text);

    return c.json({
      ok: true,
      message: 'Text appended successfully',
      documentId,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /docs/:id/replace - Find and replace text
docs.post('/:id/replace', authMiddleware, validateBody(replaceDocSchema), async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google not connected' }, 401);
    }

    const documentId = c.req.param('id');
    const { find, replace } = getValidatedBody<{ find: string; replace: string }>(c);

    const replacements = await replaceInDoc(documentId, find, replace);

    return c.json({
      ok: true,
      message: `Replaced ${replacements} occurrences`,
      replacements,
      documentId,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// DELETE /docs/:id - Delete (trash) a document
docs.delete('/:id', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google not connected' }, 401);
    }

    const documentId = c.req.param('id');
    await deleteDoc(documentId);

    return c.json({
      ok: true,
      message: 'Document moved to trash',
      documentId,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default docs;

