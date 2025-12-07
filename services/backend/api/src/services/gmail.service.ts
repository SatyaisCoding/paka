// src/services/gmail.service.ts
import { google, gmail_v1 } from 'googleapis';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/gmail/callback';

// Scopes for Gmail API
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.modify',
];

// Store tokens in memory (for single user, single account)
let storedTokens: {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
} | null = null;

/**
 * Create OAuth2 client
 */
export function createOAuth2Client() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error('Google OAuth credentials not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET');
  }
  
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
}

/**
 * Get authorization URL for OAuth flow
 */
export function getAuthUrl(): string {
  const oauth2Client = createOAuth2Client();
  
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
}

/**
 * Exchange authorization code for tokens
 */
export async function exchangeCodeForTokens(code: string): Promise<void> {
  const oauth2Client = createOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  
  storedTokens = {
    access_token: tokens.access_token!,
    refresh_token: tokens.refresh_token!,
    expiry_date: tokens.expiry_date!,
  };
}

/**
 * Check if authenticated
 */
export function isAuthenticated(): boolean {
  return storedTokens !== null;
}

/**
 * Get authenticated Gmail client
 */
export function getGmailClient(): gmail_v1.Gmail {
  if (!storedTokens) {
    throw new Error('Not authenticated. Please connect Gmail first.');
  }
  
  const oauth2Client = createOAuth2Client();
  oauth2Client.setCredentials(storedTokens);
  
  return google.gmail({ version: 'v1', auth: oauth2Client });
}

/**
 * Disconnect Gmail (clear tokens)
 */
export function disconnect(): void {
  storedTokens = null;
}

// ============ EMAIL INTERFACES ============

export interface Email {
  id: string;
  threadId: string;
  from: string;
  to: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
  isRead: boolean;
  labels: string[];
}

export interface EmailFilter {
  query?: string;      // Gmail search query
  from?: string;       // From address
  to?: string;         // To address
  subject?: string;    // Subject contains
  after?: string;      // After date (YYYY/MM/DD)
  before?: string;     // Before date (YYYY/MM/DD)
  isUnread?: boolean;  // Only unread
  hasAttachment?: boolean;
  label?: string;      // Label name
  maxResults?: number; // Limit results
}

// ============ EMAIL FUNCTIONS ============

/**
 * Build Gmail search query from filter
 */
function buildQuery(filter: EmailFilter): string {
  const parts: string[] = [];
  
  if (filter.query) parts.push(filter.query);
  if (filter.from) parts.push(`from:${filter.from}`);
  if (filter.to) parts.push(`to:${filter.to}`);
  if (filter.subject) parts.push(`subject:${filter.subject}`);
  if (filter.after) parts.push(`after:${filter.after}`);
  if (filter.before) parts.push(`before:${filter.before}`);
  if (filter.isUnread) parts.push('is:unread');
  if (filter.hasAttachment) parts.push('has:attachment');
  if (filter.label) parts.push(`label:${filter.label}`);
  
  return parts.join(' ');
}

/**
 * Parse email headers
 */
function parseHeaders(headers: gmail_v1.Schema$MessagePartHeader[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const header of headers) {
    if (header.name && header.value) {
      result[header.name.toLowerCase()] = header.value;
    }
  }
  return result;
}

/**
 * Decode base64 email body
 */
function decodeBody(body: string): string {
  return Buffer.from(body.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
}

/**
 * Extract email body from message parts
 */
function extractBody(payload: gmail_v1.Schema$MessagePart): string {
  // Simple text body
  if (payload.body?.data) {
    return decodeBody(payload.body.data);
  }
  
  // Multipart message
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        return decodeBody(part.body.data);
      }
    }
    // Fallback to HTML
    for (const part of payload.parts) {
      if (part.mimeType === 'text/html' && part.body?.data) {
        // Strip HTML tags for plain text
        return decodeBody(part.body.data).replace(/<[^>]*>/g, '');
      }
    }
    // Check nested parts
    for (const part of payload.parts) {
      if (part.parts) {
        const nested = extractBody(part);
        if (nested) return nested;
      }
    }
  }
  
  return '';
}

/**
 * Parse Gmail message to Email object
 */
function parseMessage(message: gmail_v1.Schema$Message): Email {
  const headers = parseHeaders(message.payload?.headers || []);
  
  return {
    id: message.id!,
    threadId: message.threadId!,
    from: headers['from'] || '',
    to: headers['to'] || '',
    subject: headers['subject'] || '(no subject)',
    snippet: message.snippet || '',
    body: extractBody(message.payload!),
    date: headers['date'] || '',
    isRead: !message.labelIds?.includes('UNREAD'),
    labels: message.labelIds || [],
  };
}

/**
 * List emails with optional filter
 */
export async function listEmails(filter: EmailFilter = {}): Promise<Email[]> {
  const gmail = getGmailClient();
  const query = buildQuery(filter);
  const maxResults = filter.maxResults || 20;
  
  const response = await gmail.users.messages.list({
    userId: 'me',
    q: query || undefined,
    maxResults,
  });
  
  if (!response.data.messages) {
    return [];
  }
  
  // Fetch full message details
  const emails: Email[] = [];
  for (const msg of response.data.messages) {
    const fullMsg = await gmail.users.messages.get({
      userId: 'me',
      id: msg.id!,
      format: 'full',
    });
    emails.push(parseMessage(fullMsg.data));
  }
  
  return emails;
}

/**
 * Get today's emails
 */
export async function getTodayEmails(maxResults: number = 50): Promise<Email[]> {
  const today = new Date();
  const dateStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
  
  return listEmails({
    after: dateStr,
    maxResults,
  });
}

/**
 * Get unread emails
 */
export async function getUnreadEmails(maxResults: number = 20): Promise<Email[]> {
  return listEmails({
    isUnread: true,
    maxResults,
  });
}

/**
 * Get single email by ID
 */
export async function getEmail(emailId: string): Promise<Email> {
  const gmail = getGmailClient();
  
  const response = await gmail.users.messages.get({
    userId: 'me',
    id: emailId,
    format: 'full',
  });
  
  return parseMessage(response.data);
}

/**
 * Mark email as read
 */
export async function markAsRead(emailId: string): Promise<void> {
  const gmail = getGmailClient();
  
  await gmail.users.messages.modify({
    userId: 'me',
    id: emailId,
    requestBody: {
      removeLabelIds: ['UNREAD'],
    },
  });
}

/**
 * Mark email as unread
 */
export async function markAsUnread(emailId: string): Promise<void> {
  const gmail = getGmailClient();
  
  await gmail.users.messages.modify({
    userId: 'me',
    id: emailId,
    requestBody: {
      addLabelIds: ['UNREAD'],
    },
  });
}

/**
 * Create email message in RFC 2822 format
 */
function createMessage(to: string, subject: string, body: string, threadId?: string): string {
  const message = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=utf-8',
    '',
    body,
  ].join('\r\n');
  
  return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Send a new email
 */
export async function sendEmail(
  to: string,
  subject: string,
  body: string
): Promise<{ id: string; threadId: string }> {
  const gmail = getGmailClient();
  
  const response = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: createMessage(to, subject, body),
    },
  });
  
  return {
    id: response.data.id!,
    threadId: response.data.threadId!,
  };
}

/**
 * Reply to an email
 */
export async function replyToEmail(
  emailId: string,
  body: string
): Promise<{ id: string; threadId: string }> {
  const gmail = getGmailClient();
  
  // Get original email
  const original = await getEmail(emailId);
  
  // Build reply subject
  const subject = original.subject.startsWith('Re:') 
    ? original.subject 
    : `Re: ${original.subject}`;
  
  // Reply to sender
  const to = original.from;
  
  const response = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: createMessage(to, subject, body),
      threadId: original.threadId,
    },
  });
  
  return {
    id: response.data.id!,
    threadId: response.data.threadId!,
  };
}

/**
 * Delete email (move to trash)
 */
export async function deleteEmail(emailId: string): Promise<void> {
  const gmail = getGmailClient();
  
  await gmail.users.messages.trash({
    userId: 'me',
    id: emailId,
  });
}

/**
 * Get email labels/folders
 */
export async function getLabels(): Promise<{ id: string; name: string }[]> {
  const gmail = getGmailClient();
  
  const response = await gmail.users.labels.list({
    userId: 'me',
  });
  
  return (response.data.labels || []).map(label => ({
    id: label.id!,
    name: label.name!,
  }));
}

/**
 * Get user profile
 */
export async function getProfile(): Promise<{ email: string; messagesTotal: number; threadsTotal: number }> {
  const gmail = getGmailClient();
  
  const response = await gmail.users.getProfile({
    userId: 'me',
  });
  
  return {
    email: response.data.emailAddress!,
    messagesTotal: response.data.messagesTotal!,
    threadsTotal: response.data.threadsTotal!,
  };
}

