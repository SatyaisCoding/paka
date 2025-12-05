// src/routes/sources.ts
import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, validateQuery, getValidatedBody, getValidatedQuery } from '../middleware/validate.js';
import {
  createSourceSchema,
  updateSourceSchema,
  listSourcesQuerySchema,
  type CreateSourceInput,
  type UpdateSourceInput,
  type ListSourcesQuery,
} from '../schemas/source.schema.js';

const sources = new Hono();

// All source routes require authentication
sources.use('*', authMiddleware);

// Create a new source
sources.post('/', validateBody(createSourceSchema), async (c) => {
  try {
    const userId = getUserId(c);
    const { provider, providerId, displayName, config } = getValidatedBody<CreateSourceInput>(c);

    // Check if source with same provider already exists for user
    const existingSource = await prisma.source.findFirst({
      where: {
        userId,
        provider,
        providerId: providerId || null,
      },
    });

    if (existingSource) {
      return c.json({ ok: false, error: 'Source with this provider already exists' }, 409);
    }

    const source = await prisma.source.create({
      data: {
        userId,
        provider,
        providerId,
        displayName: displayName || provider,
        config: config || {},
        connectedAt: new Date(),
      },
      include: {
        _count: {
          select: { documents: true },
        },
      },
    });

    return c.json({ ok: true, source }, 201);
  } catch (err: any) {
    console.error('Create source error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// List all sources for the authenticated user
sources.get('/', validateQuery(listSourcesQuerySchema), async (c) => {
  try {
    const userId = getUserId(c);
    const { provider } = getValidatedQuery<ListSourcesQuery>(c);

    const where: any = { userId };
    if (provider) {
      where.provider = provider;
    }

    const sourcesList = await prisma.source.findMany({
      where,
      include: {
        _count: {
          select: { documents: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return c.json({
      ok: true,
      sources: sourcesList,
      total: sourcesList.length,
    });
  } catch (err: any) {
    console.error('List sources error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Get available providers (static list)
sources.get('/providers', async (c) => {
  const providers = [
    { id: 'gmail', name: 'Gmail', description: 'Import emails from Gmail' },
    { id: 'drive', name: 'Google Drive', description: 'Import files from Google Drive' },
    { id: 'notion', name: 'Notion', description: 'Import pages from Notion' },
    { id: 'dropbox', name: 'Dropbox', description: 'Import files from Dropbox' },
    { id: 'onedrive', name: 'OneDrive', description: 'Import files from OneDrive' },
    { id: 'upload', name: 'Direct Upload', description: 'Upload files directly' },
    { id: 'url', name: 'URL', description: 'Import from web URLs' },
  ];

  return c.json({ ok: true, providers });
});

// Get a single source by ID
sources.get('/:id', async (c) => {
  try {
    const userId = getUserId(c);
    const sourceId = parseInt(c.req.param('id'), 10);

    if (isNaN(sourceId) || sourceId <= 0) {
      return c.json({ ok: false, error: 'Invalid source ID' }, 400);
    }

    const source = await prisma.source.findFirst({
      where: { id: sourceId, userId },
      include: {
        _count: {
          select: { documents: true },
        },
        documents: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            docType: true,
            size: true,
            createdAt: true,
          },
        },
      },
    });

    if (!source) {
      return c.json({ ok: false, error: 'Source not found' }, 404);
    }

    return c.json({ ok: true, source });
  } catch (err: any) {
    console.error('Get source error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Update a source
sources.patch('/:id', validateBody(updateSourceSchema), async (c) => {
  try {
    const userId = getUserId(c);
    const sourceId = parseInt(c.req.param('id'), 10);

    if (isNaN(sourceId) || sourceId <= 0) {
      return c.json({ ok: false, error: 'Invalid source ID' }, 400);
    }

    const existing = await prisma.source.findFirst({
      where: { id: sourceId, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Source not found' }, 404);
    }

    const { displayName, config, providerId } = getValidatedBody<UpdateSourceInput>(c);

    const updateData: any = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (config !== undefined) updateData.config = config;
    if (providerId !== undefined) updateData.providerId = providerId;

    const source = await prisma.source.update({
      where: { id: sourceId },
      data: updateData,
      include: {
        _count: {
          select: { documents: true },
        },
      },
    });

    return c.json({ ok: true, source });
  } catch (err: any) {
    console.error('Update source error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Delete a source
sources.delete('/:id', async (c) => {
  try {
    const userId = getUserId(c);
    const sourceId = parseInt(c.req.param('id'), 10);

    if (isNaN(sourceId) || sourceId <= 0) {
      return c.json({ ok: false, error: 'Invalid source ID' }, 400);
    }

    const existing = await prisma.source.findFirst({
      where: { id: sourceId, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Source not found' }, 404);
    }

    await prisma.source.delete({
      where: { id: sourceId },
    });

    return c.json({ ok: true, message: 'Source deleted successfully' });
  } catch (err: any) {
    console.error('Delete source error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Reconnect/refresh a source connection
sources.post('/:id/reconnect', async (c) => {
  try {
    const userId = getUserId(c);
    const sourceId = parseInt(c.req.param('id'), 10);

    if (isNaN(sourceId) || sourceId <= 0) {
      return c.json({ ok: false, error: 'Invalid source ID' }, 400);
    }

    const existing = await prisma.source.findFirst({
      where: { id: sourceId, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Source not found' }, 404);
    }

    // Update connectedAt timestamp
    const source = await prisma.source.update({
      where: { id: sourceId },
      data: { connectedAt: new Date() },
      include: {
        _count: {
          select: { documents: true },
        },
      },
    });

    return c.json({ ok: true, source, message: 'Source reconnected successfully' });
  } catch (err: any) {
    console.error('Reconnect source error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Get source statistics
sources.get('/:id/stats', async (c) => {
  try {
    const userId = getUserId(c);
    const sourceId = parseInt(c.req.param('id'), 10);

    if (isNaN(sourceId) || sourceId <= 0) {
      return c.json({ ok: false, error: 'Invalid source ID' }, 400);
    }

    const source = await prisma.source.findFirst({
      where: { id: sourceId, userId },
    });

    if (!source) {
      return c.json({ ok: false, error: 'Source not found' }, 404);
    }

    // Get document stats for this source
    const [documentCount, totalSize, docTypes] = await Promise.all([
      prisma.document.count({ where: { sourceId } }),
      prisma.document.aggregate({
        where: { sourceId },
        _sum: { size: true },
      }),
      prisma.document.groupBy({
        by: ['docType'],
        where: { sourceId },
        _count: { docType: true },
      }),
    ]);

    return c.json({
      ok: true,
      stats: {
        sourceId,
        provider: source.provider,
        documentCount,
        totalSize: totalSize._sum.size || 0,
        documentTypes: docTypes.map((d) => ({
          type: d.docType,
          count: d._count.docType,
        })),
        connectedAt: source.connectedAt,
        createdAt: source.createdAt,
      },
    });
  } catch (err: any) {
    console.error('Source stats error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default sources;
