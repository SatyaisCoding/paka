// src/routes/upload.ts
import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { createWriteStream, mkdirSync, existsSync, unlinkSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID, createHash } from 'crypto';
import { parseBuffer, isSupported, getSupportedTypes, getFileType } from '../services/parser.service.js';
import { processDocumentChunks } from '../services/vector.service.js';

const upload = new Hono();

// All upload routes require authentication
upload.use('*', authMiddleware);

// Upload directory
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

// Ensure upload directory exists
if (!existsSync(UPLOAD_DIR)) {
  mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Get supported file types
upload.get('/supported-types', (c) => {
  return c.json({
    ok: true,
    types: getSupportedTypes(),
  });
});

// Upload and process a file (PDF, DOCX, TXT, etc.)
upload.post('/', async (c) => {
  try {
    const userId = getUserId(c);
    const formData = await c.req.formData();
    const file = formData.get('file') as File | null;
    const autoProcess = formData.get('autoProcess') !== 'false'; // Default: true
    const chunkSize = parseInt(formData.get('chunkSize') as string) || 1000;
    const overlap = parseInt(formData.get('overlap') as string) || 200;

    if (!file) {
      return c.json({ ok: false, error: 'No file provided' }, 400);
    }

    const mimeType = file.type || 'application/octet-stream';
    const filename = file.name;

    // Check if file type is supported for parsing
    const canParse = isSupported(mimeType, filename);
    const fileType = getFileType(mimeType, filename);

    // Generate unique filename
    const fileExt = filename.split('.').pop() || '';
    const uniqueFilename = `${randomUUID()}.${fileExt}`;
    const s3Path = `uploads/${userId}/${uniqueFilename}`;
    const localPath = join(UPLOAD_DIR, `${userId}`);

    // Ensure user directory exists
    if (!existsSync(localPath)) {
      mkdirSync(localPath, { recursive: true });
    }

    const fullPath = join(localPath, uniqueFilename);

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate content hash for deduplication
    const contentHash = createHash('sha256').update(buffer).digest('hex').substring(0, 32);

    // Write file to disk
    const writeStream = createWriteStream(fullPath);
    writeStream.write(buffer);
    writeStream.end();

    await new Promise<void>((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Save file upload record
    const fileUpload = await prisma.fileUpload.create({
      data: {
        userId,
        filename,
        s3Path,
        size: file.size,
        mimeType,
      },
    });

    // Response object
    const response: any = {
      ok: true,
      file: fileUpload,
      canParse,
      fileType,
    };

    // If file can be parsed and autoProcess is enabled
    if (canParse && autoProcess) {
      try {
        // Parse file and extract text
        const parseResult = await parseBuffer(buffer, mimeType, filename);

        if (parseResult.text.length === 0) {
          response.parsed = false;
          response.parseError = 'No text content found in file';
        } else {
          response.parsed = true;
          response.parseMetadata = parseResult.metadata;

          // Check for duplicate document
          const existingDoc = await prisma.document.findUnique({
            where: { hash: contentHash },
          });

          if (existingDoc) {
            response.document = existingDoc;
            response.documentCreated = false;
            response.note = 'Document with same content already exists';
          } else {
            // Create document record
            const document = await prisma.document.create({
              data: {
                userId,
                title: parseResult.metadata.title || filename.replace(/\.[^/.]+$/, ''),
                docType: fileType || 'unknown',
                s3Path,
                size: file.size,
                hash: contentHash,
              },
            });

            response.document = document;
            response.documentCreated = true;

            // Process chunks and generate embeddings
            try {
              const vectorResult = await processDocumentChunks(
                document.id,
                userId,
                parseResult.text,
                chunkSize,
                overlap
              );

              response.embeddings = {
                processed: true,
                chunksCreated: vectorResult.chunksCreated,
                embeddingsStored: vectorResult.embeddingsStored,
              };
            } catch (embErr: any) {
              response.embeddings = {
                processed: false,
                error: embErr.message,
              };
            }
          }
        }
      } catch (parseErr: any) {
        response.parsed = false;
        response.parseError = parseErr.message;
      }
    }

    return c.json(response, 201);
  } catch (err: any) {
    console.error('Upload error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Upload without auto-processing (just store file)
upload.post('/raw', async (c) => {
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

    if (!existsSync(localPath)) {
      mkdirSync(localPath, { recursive: true });
    }

    const fullPath = join(localPath, uniqueFilename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const writeStream = createWriteStream(fullPath);
    writeStream.write(buffer);
    writeStream.end();

    await new Promise<void>((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    const fileUpload = await prisma.fileUpload.create({
      data: {
        userId,
        filename: file.name,
        s3Path,
        size: file.size,
        mimeType: file.type || null,
      },
    });

    return c.json({ ok: true, file: fileUpload }, 201);
  } catch (err: any) {
    console.error('Raw upload error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Parse an existing uploaded file
upload.post('/:id/parse', async (c) => {
  try {
    const userId = getUserId(c);
    const fileId = parseInt(c.req.param('id'), 10);

    if (isNaN(fileId) || fileId <= 0) {
      return c.json({ ok: false, error: 'Invalid file ID' }, 400);
    }

    const file = await prisma.fileUpload.findFirst({
      where: { id: fileId, userId },
    });

    if (!file) {
      return c.json({ ok: false, error: 'File not found' }, 404);
    }

    const mimeType = file.mimeType || 'application/octet-stream';
    const filename = file.filename;

    if (!isSupported(mimeType, filename)) {
      return c.json({
        ok: false,
        error: 'File type not supported for parsing',
        supportedTypes: getSupportedTypes(),
      }, 400);
    }

    // Read file from disk
    const localPath = join(UPLOAD_DIR, `${userId}`, file.s3Path.split('/').pop() || '');
    const buffer = await readFile(localPath);

    // Parse file
    const parseResult = await parseBuffer(buffer, mimeType, filename);

    return c.json({
      ok: true,
      fileId,
      filename,
      parsed: true,
      text: parseResult.text,
      metadata: parseResult.metadata,
    });
  } catch (err: any) {
    console.error('Parse file error:', err);
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

// Download a file
upload.get('/:id/download', async (c) => {
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

    const localPath = join(UPLOAD_DIR, `${userId}`, file.s3Path.split('/').pop() || '');

    if (!existsSync(localPath)) {
      return c.json({ ok: false, error: 'File not found on disk' }, 404);
    }

    const buffer = await readFile(localPath);

    return new Response(buffer, {
      headers: {
        'Content-Type': file.mimeType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${file.filename}"`,
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (err: any) {
    console.error('Download file error:', err);
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
