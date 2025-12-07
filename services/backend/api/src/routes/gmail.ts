// src/routes/gmail.ts
import { Hono } from 'hono';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, getValidatedBody } from '../middleware/validate.js';
import { z } from 'zod';
import {
  getAuthUrl,
  exchangeCodeForTokens,
  isAuthenticated,
  disconnect,
  getProfile,
  listEmails,
  getTodayEmails,
  getUnreadEmails,
  getEmail,
  sendEmail,
  replyToEmail,
  deleteEmail,
  markAsRead,
  markAsUnread,
  getLabels,
  type EmailFilter,
} from '../services/gmail.service.js';
import { chat } from '../services/llm.service.js';

const gmail = new Hono();

// Schemas
const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1).max(500),
  body: z.string().min(1).max(50000),
});

const replyEmailSchema = z.object({
  body: z.string().min(1).max(50000),
});

const filterSchema = z.object({
  query: z.string().max(500).optional(),
  from: z.string().max(200).optional(),
  to: z.string().max(200).optional(),
  subject: z.string().max(200).optional(),
  after: z.string().regex(/^\d{4}\/\d{1,2}\/\d{1,2}$/).optional(),
  before: z.string().regex(/^\d{4}\/\d{1,2}\/\d{1,2}$/).optional(),
  isUnread: z.boolean().optional(),
  hasAttachment: z.boolean().optional(),
  label: z.string().max(100).optional(),
  maxResults: z.number().int().min(1).max(100).optional(),
});

// ============ AUTH ROUTES ============

// GET /gmail/auth - Get OAuth URL to connect Gmail (requires auth)
gmail.get('/auth', authMiddleware, (c) => {
  try {
    const authUrl = getAuthUrl();
    return c.json({
      ok: true,
      authUrl,
      message: 'Open this URL to connect your Gmail account',
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /gmail/callback - OAuth callback (exchange code for tokens)
gmail.get('/callback', async (c) => {
  try {
    const code = c.req.query('code');
    
    if (!code) {
      return c.json({ ok: false, error: 'No authorization code provided' }, 400);
    }
    
    await exchangeCodeForTokens(code);
    const profile = await getProfile();
    
    return c.json({
      ok: true,
      message: 'Gmail connected successfully!',
      email: profile.email,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /gmail/status - Check connection status
gmail.get('/status', authMiddleware, async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({
        ok: true,
        connected: false,
        message: 'Gmail not connected. Use /gmail/auth to connect.',
      });
    }
    
    const profile = await getProfile();
    
    return c.json({
      ok: true,
      connected: true,
      email: profile.email,
      messagesTotal: profile.messagesTotal,
      threadsTotal: profile.threadsTotal,
    });
  } catch (err: any) {
    return c.json({
      ok: true,
      connected: false,
      error: err.message,
    });
  }
});

// POST /gmail/disconnect - Disconnect Gmail
gmail.post('/disconnect', authMiddleware, (c) => {
  disconnect();
  return c.json({
    ok: true,
    message: 'Gmail disconnected',
  });
});

// ============ EMAIL READING ============

// GET /gmail/emails - List emails with optional filters
gmail.get('/emails', authMiddleware, async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({ ok: false, error: 'Gmail not connected' }, 401);
    }
    
    const query = c.req.query();
    const filter: EmailFilter = {
      query: query.query,
      from: query.from,
      to: query.to,
      subject: query.subject,
      after: query.after,
      before: query.before,
      isUnread: query.isUnread === 'true',
      hasAttachment: query.hasAttachment === 'true',
      label: query.label,
      maxResults: query.maxResults ? parseInt(query.maxResults) : 20,
    };
    
    const emails = await listEmails(filter);
    
    return c.json({
      ok: true,
      count: emails.length,
      emails: emails.map(e => ({
        id: e.id,
        from: e.from,
        to: e.to,
        subject: e.subject,
        snippet: e.snippet,
        date: e.date,
        isRead: e.isRead,
      })),
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /gmail/emails/today - Get today's emails
gmail.get('/emails/today', authMiddleware, async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({ ok: false, error: 'Gmail not connected' }, 401);
    }
    
    const maxResults = parseInt(c.req.query('maxResults') || '50');
    const emails = await getTodayEmails(maxResults);
    
    return c.json({
      ok: true,
      date: new Date().toISOString().split('T')[0],
      count: emails.length,
      emails: emails.map(e => ({
        id: e.id,
        from: e.from,
        subject: e.subject,
        snippet: e.snippet,
        date: e.date,
        isRead: e.isRead,
      })),
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /gmail/emails/unread - Get unread emails
gmail.get('/emails/unread', authMiddleware, async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({ ok: false, error: 'Gmail not connected' }, 401);
    }
    
    const maxResults = parseInt(c.req.query('maxResults') || '20');
    const emails = await getUnreadEmails(maxResults);
    
    return c.json({
      ok: true,
      count: emails.length,
      emails: emails.map(e => ({
        id: e.id,
        from: e.from,
        subject: e.subject,
        snippet: e.snippet,
        date: e.date,
      })),
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /gmail/emails/:id - Get single email with full body
gmail.get('/emails/:id', authMiddleware, async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({ ok: false, error: 'Gmail not connected' }, 401);
    }
    
    const emailId = c.req.param('id');
    const email = await getEmail(emailId);
    
    return c.json({
      ok: true,
      email,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ EMAIL SUMMARY (AI) ============

// GET /gmail/summary/today - Get AI summary of today's emails
gmail.get('/summary/today', authMiddleware, async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({ ok: false, error: 'Gmail not connected' }, 401);
    }
    
    const emails = await getTodayEmails(30);
    
    if (emails.length === 0) {
      return c.json({
        ok: true,
        date: new Date().toISOString().split('T')[0],
        totalEmails: 0,
        summary: 'No emails received today.',
        categories: [],
      });
    }
    
    // Build email list for LLM
    const emailList = emails.map((e, i) => 
      `${i + 1}. From: ${e.from}\n   Subject: ${e.subject}\n   Preview: ${e.snippet}`
    ).join('\n\n');
    
    // Generate summary using LLM
    const response = await chat([
      {
        role: 'system',
        content: `You are an email assistant. Summarize the user's emails concisely.
Provide:
1. A brief overall summary (2-3 sentences)
2. Important/action items (if any)
3. Categories of emails received

Be concise and helpful. Format response as JSON:
{
  "summary": "brief summary",
  "important": ["action item 1", "action item 2"],
  "categories": [{"name": "category", "count": N, "highlights": "brief note"}]
}`
      },
      {
        role: 'user',
        content: `Here are my ${emails.length} emails from today:\n\n${emailList}\n\nPlease summarize.`
      }
    ]);
    
    // Parse LLM response
    let parsedSummary;
    try {
      // Extract JSON from response
      const jsonMatch = response.content.match(/\{[\s\S]*\}/);
      parsedSummary = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      parsedSummary = null;
    }
    
    return c.json({
      ok: true,
      date: new Date().toISOString().split('T')[0],
      totalEmails: emails.length,
      unreadCount: emails.filter(e => !e.isRead).length,
      ...(parsedSummary || { summary: response.content }),
      llm: {
        provider: response.provider,
        model: response.model,
      },
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /gmail/summary - Get AI summary with custom filter
gmail.post('/summary', authMiddleware, validateBody(filterSchema), async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({ ok: false, error: 'Gmail not connected' }, 401);
    }
    
    const filter = getValidatedBody<EmailFilter>(c);
    const emails = await listEmails({ ...filter, maxResults: filter.maxResults || 30 });
    
    if (emails.length === 0) {
      return c.json({
        ok: true,
        totalEmails: 0,
        summary: 'No emails found matching the filter.',
      });
    }
    
    const emailList = emails.map((e, i) => 
      `${i + 1}. From: ${e.from}\n   Subject: ${e.subject}\n   Preview: ${e.snippet}`
    ).join('\n\n');
    
    const response = await chat([
      {
        role: 'system',
        content: `Summarize these emails concisely. Highlight important items and categorize them.`
      },
      {
        role: 'user',
        content: `Summarize these ${emails.length} emails:\n\n${emailList}`
      }
    ]);
    
    return c.json({
      ok: true,
      totalEmails: emails.length,
      summary: response.content,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ EMAIL ACTIONS ============

// POST /gmail/send - Send a new email
gmail.post('/send', authMiddleware, validateBody(sendEmailSchema), async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({ ok: false, error: 'Gmail not connected' }, 401);
    }
    
    const { to, subject, body } = getValidatedBody<{
      to: string;
      subject: string;
      body: string;
    }>(c);
    
    const result = await sendEmail(to, subject, body);
    
    return c.json({
      ok: true,
      message: 'Email sent successfully',
      ...result,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /gmail/emails/:id/reply - Reply to an email
gmail.post('/emails/:id/reply', authMiddleware, validateBody(replyEmailSchema), async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({ ok: false, error: 'Gmail not connected' }, 401);
    }
    
    const emailId = c.req.param('id');
    const { body } = getValidatedBody<{ body: string }>(c);
    
    const result = await replyToEmail(emailId, body);
    
    return c.json({
      ok: true,
      message: 'Reply sent successfully',
      ...result,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /gmail/emails/:id/read - Mark as read
gmail.post('/emails/:id/read', authMiddleware, async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({ ok: false, error: 'Gmail not connected' }, 401);
    }
    
    const emailId = c.req.param('id');
    await markAsRead(emailId);
    
    return c.json({ ok: true, message: 'Marked as read' });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /gmail/emails/:id/unread - Mark as unread
gmail.post('/emails/:id/unread', authMiddleware, async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({ ok: false, error: 'Gmail not connected' }, 401);
    }
    
    const emailId = c.req.param('id');
    await markAsUnread(emailId);
    
    return c.json({ ok: true, message: 'Marked as unread' });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// DELETE /gmail/emails/:id - Delete email (move to trash)
gmail.delete('/emails/:id', authMiddleware, async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({ ok: false, error: 'Gmail not connected' }, 401);
    }
    
    const emailId = c.req.param('id');
    await deleteEmail(emailId);
    
    return c.json({ ok: true, message: 'Email moved to trash' });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /gmail/labels - Get email labels/folders
gmail.get('/labels', authMiddleware, async (c) => {
  try {
    if (!isAuthenticated()) {
      return c.json({ ok: false, error: 'Gmail not connected' }, 401);
    }
    
    const labels = await getLabels();
    
    return c.json({
      ok: true,
      labels,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default gmail;

