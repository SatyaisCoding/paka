// src/services/docs.service.ts
// Google Docs API integration

import { google, docs_v1 } from 'googleapis';
import { getAuthenticatedClient, isGoogleAuthenticated } from './google-auth.service.js';

/**
 * Get Google Docs client
 */
export function getDocsClient(): docs_v1.Docs {
  const oauth2Client = getAuthenticatedClient();
  return google.docs({ version: 'v1', auth: oauth2Client });
}

/**
 * Get Google Drive client (for listing docs)
 */
function getDriveClient() {
  const oauth2Client = getAuthenticatedClient();
  return google.drive({ version: 'v3', auth: oauth2Client });
}

// ============ INTERFACES ============

export interface GoogleDoc {
  id: string;
  title: string;
  content?: string;
  url: string;
  createdTime?: string;
  modifiedTime?: string;
}

export interface CreateDocInput {
  title: string;
  content?: string;
}

// ============ HELPER FUNCTIONS ============

/**
 * Extract text content from document
 */
function extractContent(document: docs_v1.Schema$Document): string {
  const content: string[] = [];
  
  if (document.body?.content) {
    for (const element of document.body.content) {
      if (element.paragraph?.elements) {
        for (const elem of element.paragraph.elements) {
          if (elem.textRun?.content) {
            content.push(elem.textRun.content);
          }
        }
      }
    }
  }
  
  return content.join('').trim();
}

// ============ API FUNCTIONS ============

/**
 * List Google Docs
 */
export async function listDocs(maxResults: number = 20): Promise<GoogleDoc[]> {
  const drive = getDriveClient();
  
  const response = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.document'",
    pageSize: maxResults,
    fields: 'files(id, name, createdTime, modifiedTime, webViewLink)',
    orderBy: 'modifiedTime desc',
  });
  
  return (response.data.files || []).map(file => ({
    id: file.id!,
    title: file.name!,
    url: file.webViewLink!,
    createdTime: file.createdTime,
    modifiedTime: file.modifiedTime,
  }));
}

/**
 * Search Google Docs
 */
export async function searchDocs(query: string, maxResults: number = 20): Promise<GoogleDoc[]> {
  const drive = getDriveClient();
  
  const response = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.document' and fullText contains '${query}'`,
    pageSize: maxResults,
    fields: 'files(id, name, createdTime, modifiedTime, webViewLink)',
    orderBy: 'modifiedTime desc',
  });
  
  return (response.data.files || []).map(file => ({
    id: file.id!,
    title: file.name!,
    url: file.webViewLink!,
    createdTime: file.createdTime,
    modifiedTime: file.modifiedTime,
  }));
}

/**
 * Get a document by ID
 */
export async function getDoc(documentId: string): Promise<GoogleDoc> {
  const docs = getDocsClient();
  
  const response = await docs.documents.get({
    documentId,
  });
  
  const document = response.data;
  
  return {
    id: document.documentId!,
    title: document.title!,
    content: extractContent(document),
    url: `https://docs.google.com/document/d/${document.documentId}/edit`,
  };
}

/**
 * Get document content only
 */
export async function getDocContent(documentId: string): Promise<string> {
  const doc = await getDoc(documentId);
  return doc.content || '';
}

/**
 * Create a new document
 */
export async function createDoc(input: CreateDocInput): Promise<GoogleDoc> {
  const docs = getDocsClient();
  
  // Create empty document
  const createResponse = await docs.documents.create({
    requestBody: {
      title: input.title,
    },
  });
  
  const documentId = createResponse.data.documentId!;
  
  // Add content if provided
  if (input.content) {
    await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: { index: 1 },
              text: input.content,
            },
          },
        ],
      },
    });
  }
  
  return {
    id: documentId,
    title: input.title,
    content: input.content,
    url: `https://docs.google.com/document/d/${documentId}/edit`,
  };
}

/**
 * Append text to a document
 */
export async function appendToDoc(documentId: string, text: string): Promise<void> {
  const docs = getDocsClient();
  
  // Get current document to find end index
  const doc = await docs.documents.get({ documentId });
  const endIndex = doc.data.body?.content?.slice(-1)[0]?.endIndex || 1;
  
  await docs.documents.batchUpdate({
    documentId,
    requestBody: {
      requests: [
        {
          insertText: {
            location: { index: endIndex - 1 },
            text: '\n' + text,
          },
        },
      ],
    },
  });
}

/**
 * Replace text in a document
 */
export async function replaceInDoc(
  documentId: string,
  findText: string,
  replaceText: string
): Promise<number> {
  const docs = getDocsClient();
  
  const response = await docs.documents.batchUpdate({
    documentId,
    requestBody: {
      requests: [
        {
          replaceAllText: {
            containsText: {
              text: findText,
              matchCase: true,
            },
            replaceText,
          },
        },
      ],
    },
  });
  
  // Return number of replacements
  return response.data.replies?.[0]?.replaceAllText?.occurrencesChanged || 0;
}

/**
 * Delete a document (move to trash)
 */
export async function deleteDoc(documentId: string): Promise<void> {
  const drive = getDriveClient();
  
  await drive.files.update({
    fileId: documentId,
    requestBody: {
      trashed: true,
    },
  });
}

/**
 * Get document metadata
 */
export async function getDocMetadata(documentId: string): Promise<{
  id: string;
  title: string;
  url: string;
  createdTime?: string;
  modifiedTime?: string;
  size?: string;
}> {
  const drive = getDriveClient();
  
  const response = await drive.files.get({
    fileId: documentId,
    fields: 'id, name, createdTime, modifiedTime, webViewLink, size',
  });
  
  return {
    id: response.data.id!,
    title: response.data.name!,
    url: response.data.webViewLink!,
    createdTime: response.data.createdTime || undefined,
    modifiedTime: response.data.modifiedTime || undefined,
    size: response.data.size || undefined,
  };
}

