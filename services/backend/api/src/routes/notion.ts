// src/routes/notion.ts
import { Hono } from 'hono';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, getValidatedBody } from '../middleware/validate.js';
import { z } from 'zod';
import {
  isNotionConfigured,
  search,
  getPage,
  getPageContent,
  getPageWithContent,
  createPage,
  updatePage,
  appendToPage,
  deletePage,
  getDatabase,
  queryDatabase,
  listDatabases,
  listRecentPages,
} from '../services/notion.service.js';

const notion = new Hono();

// Schemas
const createPageSchema = z.object({
  parentId: z.string().min(1),
  parentType: z.enum(['database', 'page']),
  title: z.string().min(1).max(500),
  content: z.string().max(50000).optional(),
  icon: z.string().max(10).optional(),
});

const updatePageSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  icon: z.string().max(10).optional(),
  archived: z.boolean().optional(),
});

const appendContentSchema = z.object({
  content: z.string().min(1).max(50000),
});

const searchSchema = z.object({
  query: z.string().max(200).optional(),
  filter: z.enum(['page', 'database']).optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
});

// ============ STATUS ============

// GET /notion/status - Check if Notion is configured
notion.get('/status', authMiddleware, (c) => {
  return c.json({
    ok: true,
    configured: isNotionConfigured(),
    message: isNotionConfigured()
      ? 'Notion is configured and ready'
      : 'Notion not configured. Set NOTION_API_KEY in environment.',
  });
});

// ============ SEARCH ============

// POST /notion/search - Search pages and databases
notion.post('/search', authMiddleware, validateBody(searchSchema), async (c) => {
  try {
    if (!isNotionConfigured()) {
      return c.json({ ok: false, error: 'Notion not configured' }, 400);
    }

    const filter = getValidatedBody<z.infer<typeof searchSchema>>(c);
    const results = await search(filter);

    return c.json({
      ok: true,
      ...results,
      totalPages: results.pages.length,
      totalDatabases: results.databases.length,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ PAGES ============

// GET /notion/pages - List recent pages
notion.get('/pages', authMiddleware, async (c) => {
  try {
    if (!isNotionConfigured()) {
      return c.json({ ok: false, error: 'Notion not configured' }, 400);
    }

    const limit = parseInt(c.req.query('limit') || '20');
    const pages = await listRecentPages(limit);

    return c.json({
      ok: true,
      count: pages.length,
      pages,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /notion/pages/:id - Get a specific page
notion.get('/pages/:id', authMiddleware, async (c) => {
  try {
    if (!isNotionConfigured()) {
      return c.json({ ok: false, error: 'Notion not configured' }, 400);
    }

    const pageId = c.req.param('id');
    const includeContent = c.req.query('content') === 'true';

    const page = includeContent
      ? await getPageWithContent(pageId)
      : await getPage(pageId);

    return c.json({
      ok: true,
      page,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /notion/pages/:id/content - Get page content (blocks)
notion.get('/pages/:id/content', authMiddleware, async (c) => {
  try {
    if (!isNotionConfigured()) {
      return c.json({ ok: false, error: 'Notion not configured' }, 400);
    }

    const pageId = c.req.param('id');
    const blocks = await getPageContent(pageId);

    return c.json({
      ok: true,
      count: blocks.length,
      blocks,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /notion/pages - Create a new page
notion.post('/pages', authMiddleware, validateBody(createPageSchema), async (c) => {
  try {
    if (!isNotionConfigured()) {
      return c.json({ ok: false, error: 'Notion not configured' }, 400);
    }

    const input = getValidatedBody<z.infer<typeof createPageSchema>>(c);
    const page = await createPage(input);

    return c.json({
      ok: true,
      message: 'Page created successfully',
      page,
    }, 201);
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// PATCH /notion/pages/:id - Update a page
notion.patch('/pages/:id', authMiddleware, validateBody(updatePageSchema), async (c) => {
  try {
    if (!isNotionConfigured()) {
      return c.json({ ok: false, error: 'Notion not configured' }, 400);
    }

    const pageId = c.req.param('id');
    const updates = getValidatedBody<z.infer<typeof updatePageSchema>>(c);
    const page = await updatePage(pageId, updates);

    return c.json({
      ok: true,
      message: 'Page updated successfully',
      page,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /notion/pages/:id/append - Append content to a page
notion.post('/pages/:id/append', authMiddleware, validateBody(appendContentSchema), async (c) => {
  try {
    if (!isNotionConfigured()) {
      return c.json({ ok: false, error: 'Notion not configured' }, 400);
    }

    const pageId = c.req.param('id');
    const { content } = getValidatedBody<{ content: string }>(c);
    const blocks = await appendToPage(pageId, content);

    return c.json({
      ok: true,
      message: 'Content appended successfully',
      blocksAdded: blocks.length,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// DELETE /notion/pages/:id - Delete (archive) a page
notion.delete('/pages/:id', authMiddleware, async (c) => {
  try {
    if (!isNotionConfigured()) {
      return c.json({ ok: false, error: 'Notion not configured' }, 400);
    }

    const pageId = c.req.param('id');
    await deletePage(pageId);

    return c.json({
      ok: true,
      message: 'Page archived successfully',
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ DATABASES ============

// GET /notion/databases - List all databases
notion.get('/databases', authMiddleware, async (c) => {
  try {
    if (!isNotionConfigured()) {
      return c.json({ ok: false, error: 'Notion not configured' }, 400);
    }

    const databases = await listDatabases();

    return c.json({
      ok: true,
      count: databases.length,
      databases,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /notion/databases/:id - Get a specific database
notion.get('/databases/:id', authMiddleware, async (c) => {
  try {
    if (!isNotionConfigured()) {
      return c.json({ ok: false, error: 'Notion not configured' }, 400);
    }

    const databaseId = c.req.param('id');
    const database = await getDatabase(databaseId);

    return c.json({
      ok: true,
      database,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /notion/databases/:id/items - Query database items
notion.get('/databases/:id/items', authMiddleware, async (c) => {
  try {
    if (!isNotionConfigured()) {
      return c.json({ ok: false, error: 'Notion not configured' }, 400);
    }

    const databaseId = c.req.param('id');
    const pageSize = parseInt(c.req.query('limit') || '50');
    
    const items = await queryDatabase(databaseId, { pageSize });

    return c.json({
      ok: true,
      count: items.length,
      items,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default notion;

