// src/services/parser.service.ts
// File parsing service for PDFs, Word docs, and text files

import { readFile } from 'fs/promises';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export interface ParseResult {
  text: string;
  metadata: {
    pageCount?: number;
    wordCount: number;
    charCount: number;
    fileType: string;
    title?: string;
  };
}

// Supported file types
export const SUPPORTED_TYPES = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/msword': 'doc',
  'text/plain': 'txt',
  'text/markdown': 'md',
  'text/csv': 'csv',
} as const;

/**
 * Get file type from mime type or extension
 */
export function getFileType(mimeType: string, filename: string): string | null {
  // Check mime type first
  if (SUPPORTED_TYPES[mimeType as keyof typeof SUPPORTED_TYPES]) {
    return SUPPORTED_TYPES[mimeType as keyof typeof SUPPORTED_TYPES];
  }

  // Fall back to extension
  const ext = filename.split('.').pop()?.toLowerCase();
  if (ext && ['pdf', 'docx', 'doc', 'txt', 'md', 'csv'].includes(ext)) {
    return ext;
  }

  return null;
}

/**
 * Check if file type is supported
 */
export function isSupported(mimeType: string, filename: string): boolean {
  return getFileType(mimeType, filename) !== null;
}

/**
 * Parse PDF file and extract text
 */
async function parsePDF(filePath: string): Promise<ParseResult> {
  const dataBuffer = await readFile(filePath);
  const data = await pdf(dataBuffer);

  const text = data.text.trim();

  return {
    text,
    metadata: {
      pageCount: data.numpages,
      wordCount: text.split(/\s+/).filter(Boolean).length,
      charCount: text.length,
      fileType: 'pdf',
      title: data.info?.Title || undefined,
    },
  };
}

/**
 * Parse Word document (.docx) and extract text
 */
async function parseDocx(filePath: string): Promise<ParseResult> {
  const dataBuffer = await readFile(filePath);
  const result = await mammoth.extractRawText({ buffer: dataBuffer });

  const text = result.value.trim();

  return {
    text,
    metadata: {
      wordCount: text.split(/\s+/).filter(Boolean).length,
      charCount: text.length,
      fileType: 'docx',
    },
  };
}

/**
 * Parse plain text file
 */
async function parseText(filePath: string, fileType: string): Promise<ParseResult> {
  const text = (await readFile(filePath, 'utf-8')).trim();

  return {
    text,
    metadata: {
      wordCount: text.split(/\s+/).filter(Boolean).length,
      charCount: text.length,
      fileType,
    },
  };
}

/**
 * Parse file based on type and extract text
 */
export async function parseFile(
  filePath: string,
  mimeType: string,
  filename: string
): Promise<ParseResult> {
  const fileType = getFileType(mimeType, filename);

  if (!fileType) {
    throw new Error(`Unsupported file type: ${mimeType}`);
  }

  switch (fileType) {
    case 'pdf':
      return parsePDF(filePath);

    case 'docx':
    case 'doc':
      return parseDocx(filePath);

    case 'txt':
    case 'md':
    case 'csv':
      return parseText(filePath, fileType);

    default:
      throw new Error(`Parser not implemented for: ${fileType}`);
  }
}

/**
 * Parse file from buffer (for in-memory processing)
 */
export async function parseBuffer(
  buffer: Buffer,
  mimeType: string,
  filename: string
): Promise<ParseResult> {
  const fileType = getFileType(mimeType, filename);

  if (!fileType) {
    throw new Error(`Unsupported file type: ${mimeType}`);
  }

  switch (fileType) {
    case 'pdf': {
      const data = await pdf(buffer);
      const text = data.text.trim();
      return {
        text,
        metadata: {
          pageCount: data.numpages,
          wordCount: text.split(/\s+/).filter(Boolean).length,
          charCount: text.length,
          fileType: 'pdf',
          title: data.info?.Title || undefined,
        },
      };
    }

    case 'docx':
    case 'doc': {
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value.trim();
      return {
        text,
        metadata: {
          wordCount: text.split(/\s+/).filter(Boolean).length,
          charCount: text.length,
          fileType: 'docx',
        },
      };
    }

    case 'txt':
    case 'md':
    case 'csv': {
      const text = buffer.toString('utf-8').trim();
      return {
        text,
        metadata: {
          wordCount: text.split(/\s+/).filter(Boolean).length,
          charCount: text.length,
          fileType,
        },
      };
    }

    default:
      throw new Error(`Parser not implemented for: ${fileType}`);
  }
}

/**
 * Get supported file types info
 */
export function getSupportedTypes(): { extension: string; mimeType: string; description: string }[] {
  return [
    { extension: 'pdf', mimeType: 'application/pdf', description: 'PDF Document' },
    { extension: 'docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', description: 'Word Document' },
    { extension: 'txt', mimeType: 'text/plain', description: 'Plain Text' },
    { extension: 'md', mimeType: 'text/markdown', description: 'Markdown' },
    { extension: 'csv', mimeType: 'text/csv', description: 'CSV File' },
  ];
}

