// src/services/notion.service.ts
// Notion API integration

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_VERSION = '2022-06-28';
const NOTION_BASE_URL = 'https://api.notion.com/v1';

// ============ INTERFACES ============

export interface NotionPage {
  id: string;
  title: string;
  url: string;
  createdTime: string;
  lastEditedTime: string;
  icon?: string;
  cover?: string;
  parent: {
    type: string;
    id?: string;
  };
}

export interface NotionDatabase {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdTime: string;
  lastEditedTime: string;
  properties: Record<string, any>;
}

export interface NotionBlock {
  id: string;
  type: string;
  content: string;
  hasChildren: boolean;
}

export interface CreatePageInput {
  parentId: string; // Database ID or Page ID
  parentType: 'database' | 'page';
  title: string;
  content?: string;
  properties?: Record<string, any>;
  icon?: string;
}

export interface SearchFilter {
  query?: string;
  filter?: 'page' | 'database';
  sort?: 'last_edited_time' | 'created_time';
  pageSize?: number;
}

// ============ HELPER FUNCTIONS ============

/**
 * Check if Notion is configured
 */
export function isNotionConfigured(): boolean {
  return !!NOTION_API_KEY;
}

/**
 * Make authenticated request to Notion API
 */
async function notionRequest(
  endpoint: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
  body?: any
): Promise<any> {
  if (!NOTION_API_KEY) {
    throw new Error('Notion API key not configured. Set NOTION_API_KEY in environment.');
  }

  const response = await fetch(`${NOTION_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Notion API error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Extract title from Notion page/database
 */
function extractTitle(titleProperty: any[]): string {
  if (!titleProperty || !Array.isArray(titleProperty)) return 'Untitled';
  return titleProperty.map(t => t.plain_text || '').join('') || 'Untitled';
}

/**
 * Parse Notion page response
 */
function parsePage(page: any): NotionPage {
  let title = 'Untitled';
  
  // Try to get title from properties
  if (page.properties) {
    const titleProp = Object.values(page.properties).find((p: any) => p.type === 'title') as any;
    if (titleProp?.title) {
      title = extractTitle(titleProp.title);
    }
  }
  
  // For child pages, title might be in properties.title
  if (page.properties?.title?.title) {
    title = extractTitle(page.properties.title.title);
  }
  
  // For database pages, check Name property
  if (page.properties?.Name?.title) {
    title = extractTitle(page.properties.Name.title);
  }

  return {
    id: page.id,
    title,
    url: page.url,
    createdTime: page.created_time,
    lastEditedTime: page.last_edited_time,
    icon: page.icon?.emoji || page.icon?.external?.url,
    cover: page.cover?.external?.url || page.cover?.file?.url,
    parent: {
      type: page.parent?.type,
      id: page.parent?.database_id || page.parent?.page_id || page.parent?.workspace,
    },
  };
}

/**
 * Parse Notion database response
 */
function parseDatabase(db: any): NotionDatabase {
  return {
    id: db.id,
    title: extractTitle(db.title),
    url: db.url,
    description: db.description?.[0]?.plain_text,
    createdTime: db.created_time,
    lastEditedTime: db.last_edited_time,
    properties: db.properties,
  };
}

/**
 * Parse block content to text
 */
function parseBlockContent(block: any): string {
  const type = block.type;
  const content = block[type];
  
  if (!content) return '';
  
  // Rich text blocks
  if (content.rich_text) {
    return content.rich_text.map((t: any) => t.plain_text || '').join('');
  }
  
  // Other block types
  if (content.text) {
    return content.text.map((t: any) => t.plain_text || '').join('');
  }
  
  return '';
}

// ============ API FUNCTIONS ============

/**
 * Search Notion (pages and databases)
 */
export async function search(filter: SearchFilter = {}): Promise<{
  pages: NotionPage[];
  databases: NotionDatabase[];
}> {
  const body: any = {
    page_size: filter.pageSize || 20,
  };
  
  if (filter.query) {
    body.query = filter.query;
  }
  
  if (filter.filter) {
    body.filter = { property: 'object', value: filter.filter };
  }
  
  if (filter.sort) {
    body.sort = {
      direction: 'descending',
      timestamp: filter.sort,
    };
  }
  
  const response = await notionRequest('/search', 'POST', body);
  
  const pages: NotionPage[] = [];
  const databases: NotionDatabase[] = [];
  
  for (const result of response.results) {
    if (result.object === 'page') {
      pages.push(parsePage(result));
    } else if (result.object === 'database') {
      databases.push(parseDatabase(result));
    }
  }
  
  return { pages, databases };
}

/**
 * Get a specific page
 */
export async function getPage(pageId: string): Promise<NotionPage> {
  const response = await notionRequest(`/pages/${pageId}`);
  return parsePage(response);
}

/**
 * Get page content (blocks)
 */
export async function getPageContent(pageId: string): Promise<NotionBlock[]> {
  const response = await notionRequest(`/blocks/${pageId}/children`);
  
  return response.results.map((block: any) => ({
    id: block.id,
    type: block.type,
    content: parseBlockContent(block),
    hasChildren: block.has_children,
  }));
}

/**
 * Get full page with content as text
 */
export async function getPageWithContent(pageId: string): Promise<NotionPage & { content: string }> {
  const page = await getPage(pageId);
  const blocks = await getPageContent(pageId);
  
  const content = blocks
    .map(b => b.content)
    .filter(c => c)
    .join('\n\n');
  
  return { ...page, content };
}

/**
 * Create a new page
 */
export async function createPage(input: CreatePageInput): Promise<NotionPage> {
  const body: any = {
    parent: input.parentType === 'database'
      ? { database_id: input.parentId }
      : { page_id: input.parentId },
    properties: {},
  };
  
  // Set title
  if (input.parentType === 'database') {
    // For database pages, use Name or title property
    body.properties.Name = {
      title: [{ text: { content: input.title } }],
    };
  } else {
    // For sub-pages
    body.properties.title = {
      title: [{ text: { content: input.title } }],
    };
  }
  
  // Add icon
  if (input.icon) {
    body.icon = { emoji: input.icon };
  }
  
  // Add content as children blocks
  if (input.content) {
    body.children = input.content.split('\n').map(line => ({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ type: 'text', text: { content: line } }],
      },
    }));
  }
  
  // Add custom properties
  if (input.properties) {
    body.properties = { ...body.properties, ...input.properties };
  }
  
  const response = await notionRequest('/pages', 'POST', body);
  return parsePage(response);
}

/**
 * Update a page
 */
export async function updatePage(
  pageId: string,
  updates: { title?: string; icon?: string; archived?: boolean; properties?: Record<string, any> }
): Promise<NotionPage> {
  const body: any = { properties: {} };
  
  if (updates.title) {
    body.properties.title = {
      title: [{ text: { content: updates.title } }],
    };
  }
  
  if (updates.icon) {
    body.icon = { emoji: updates.icon };
  }
  
  if (updates.archived !== undefined) {
    body.archived = updates.archived;
  }
  
  if (updates.properties) {
    body.properties = { ...body.properties, ...updates.properties };
  }
  
  const response = await notionRequest(`/pages/${pageId}`, 'PATCH', body);
  return parsePage(response);
}

/**
 * Append content to a page
 */
export async function appendToPage(pageId: string, content: string): Promise<NotionBlock[]> {
  const children = content.split('\n').map(line => ({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [{ type: 'text', text: { content: line } }],
    },
  }));
  
  const response = await notionRequest(`/blocks/${pageId}/children`, 'PATCH', { children });
  
  return response.results.map((block: any) => ({
    id: block.id,
    type: block.type,
    content: parseBlockContent(block),
    hasChildren: block.has_children,
  }));
}

/**
 * Delete (archive) a page
 */
export async function deletePage(pageId: string): Promise<void> {
  await updatePage(pageId, { archived: true });
}

/**
 * Get a database
 */
export async function getDatabase(databaseId: string): Promise<NotionDatabase> {
  const response = await notionRequest(`/databases/${databaseId}`);
  return parseDatabase(response);
}

/**
 * Query database items
 */
export async function queryDatabase(
  databaseId: string,
  options: {
    filter?: any;
    sorts?: any[];
    pageSize?: number;
  } = {}
): Promise<NotionPage[]> {
  const body: any = {
    page_size: options.pageSize || 50,
  };
  
  if (options.filter) {
    body.filter = options.filter;
  }
  
  if (options.sorts) {
    body.sorts = options.sorts;
  }
  
  const response = await notionRequest(`/databases/${databaseId}/query`, 'POST', body);
  
  return response.results.map(parsePage);
}

/**
 * List all databases user has access to
 */
export async function listDatabases(): Promise<NotionDatabase[]> {
  const { databases } = await search({ filter: 'database', pageSize: 100 });
  return databases;
}

/**
 * List recent pages
 */
export async function listRecentPages(limit: number = 20): Promise<NotionPage[]> {
  const { pages } = await search({ 
    filter: 'page', 
    sort: 'last_edited_time',
    pageSize: limit 
  });
  return pages;
}

