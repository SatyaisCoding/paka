// src/routes/upload.ts
import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { createWriteStream, mkdirSync, existsSync, unlinkSync, statSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

const upload = new Hono();

// All upload routes require authentication
upload.use('*', authMiddleware);

// Upload directory (local storage for now, replace with MinIO/S3 later)
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

// Ensure upload directory exists
if (!existsSync(UPLOAD_DIR)) {
  mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Upload a file
upload.post('/', async (c) => {
  try {
    const userId = getUserId(c);
    const formData = await c.req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return c.json({ ok: false, error: 'No file provided' }, 400);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop() || '';
    const uniqueFilename = `${randomUUID()}.${fileExt}`;
    const s3Path = `uploads/${userId}/${uniqueFilename}`;
    const localPath = join(UPLOAD_DIR, `${userId}`);

    // Ensure user directory exists
    if (!existsSync(localPath)) {
      mkdirSync(localPath, { recursive: true });
    }

    const fullPath = join(localPath, uniqueFilename);

    // Write file to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const writeStream = createWriteStream(fullPath);
    writeStream.write(buffer);
    writeStream.end();

    // Wait for write to complete
    await new Promise<void>((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Save to database
    const fileUpload = await prisma.fileUpload.create({
      data: {
        userId,
        filename: file.name,
        s3Path,
        size: file.size,
        mimeType: file.type || null,
      },
    });

    return c.json({
      ok: true,
      file: fileUpload,
    }, 201);
  } catch (err: any) {
    console.error('Upload error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// List all uploaded files for the user
upload.get('/', async (c) => {
  try {
    const userId = getUserId(c);
    const { limit, offset, mimeType } = c.req.query();

    const where: any = { userId };
    if (mimeType) {
      where.mimeType = { contains: mimeType };
    }

    const take = limit ? parseInt(limit, 10) : 50;
    const skip = offset ? parseInt(offset, 10) : 0;

    const [files, total] = await Promise.all([
      prisma.fileUpload.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      prisma.fileUpload.count({ where }),
    ]);

    return c.json({
      ok: true,
      files,
      total,
      limit: take,
      offset: skip,
    });
  } catch (err: any) {
    console.error('List uploads error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Get file statistics
upload.get('/stats', async (c) => {
  try {
    const userId = getUserId(c);

    const [totalFiles, totalSize, byMimeType] = await Promise.all([
      prisma.fileUpload.count({ where: { userId } }),
      prisma.fileUpload.aggregate({
        where: { userId },
        _sum: { size: true },
      }),
      prisma.fileUpload.groupBy({
        by: ['mimeType'],
        where: { userId },
        _count: { mimeType: true },
        _sum: { size: true },
      }),
    ]);

    return c.json({
      ok: true,
      stats: {
        totalFiles,
        totalSize: totalSize._sum.size || 0,
        byMimeType: byMimeType.map((m) => ({
          mimeType: m.mimeType || 'unknown',
          count: m._count.mimeType,
          size: m._sum.size || 0,
        })),
      },
    });
  } catch (err: any) {
    console.error('Upload stats error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Get a single file by ID
upload.get('/:id', async (c) => {
  try {
    const userId = getUserId(c);
    const fileId = parseInt(c.req.param('id'), 10);

    if (isNaN(fileId)) {
      return c.json({ ok: false, error: 'Invalid file ID' }, 400);
    }

    const file = await prisma.fileUpload.findFirst({
      where: { id: fileId, userId },
    });

    if (!file) {
      return c.json({ ok: false, error: 'File not found' }, 404);
    }

    return c.json({ ok: true, file });
  } catch (err: any) {
    console.error('Get file error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Delete a file
upload.delete('/:id', async (c) => {
  try {
    const userId = getUserId(c);
    const fileId = parseInt(c.req.param('id'), 10);

    if (isNaN(fileId)) {
      return c.json({ ok: false, error: 'Invalid file ID' }, 400);
    }

    const file = await prisma.fileUpload.findFirst({
      where: { id: fileId, userId },
    });

    if (!file) {
      return c.json({ ok: false, error: 'File not found' }, 404);
    }

    // Delete from disk
    const localPath = join(UPLOAD_DIR, `${userId}`, file.s3Path.split('/').pop() || '');
    try {
      if (existsSync(localPath)) {
        unlinkSync(localPath);
      }
    } catch (fsErr) {
      console.warn('Could not delete file from disk:', fsErr);
    }

    // Delete from database
    await prisma.fileUpload.delete({
      where: { id: fileId },
    });

    return c.json({ ok: true, message: 'File deleted successfully' });
  } catch (err: any) {
    console.error('Delete file error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default upload;
