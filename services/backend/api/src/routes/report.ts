// src/routes/report.ts
// Weekly Report Routes - AI-powered summaries

import { Hono } from 'hono';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import {
  generateWeeklyReport,
  getWeeklyReportText,
  getWeekComparison,
} from '../services/report.service.js';
import { sendMessage, isTelegramConfigured } from '../services/telegram.service.js';

const report = new Hono();

// All report routes require authentication
report.use('*', authMiddleware);

// ============ WEEKLY REPORT ============

/**
 * GET /report/weekly - Get weekly report (JSON)
 * 
 * Query params:
 * - weeksAgo: 0 = current week (default), 1 = last week, etc.
 */
report.get('/weekly', async (c) => {
  try {
    const userId = getUserId(c);
    const weeksAgo = parseInt(c.req.query('weeksAgo') || '0');

    const weeklyReport = await generateWeeklyReport(userId, weeksAgo);

    return c.json({
      ok: true,
      report: weeklyReport,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

/**
 * GET /report/weekly/text - Get weekly report as formatted text
 */
report.get('/weekly/text', async (c) => {
  try {
    const userId = getUserId(c);
    const weeksAgo = parseInt(c.req.query('weeksAgo') || '0');

    const text = await getWeeklyReportText(userId, weeksAgo);

    return c.json({
      ok: true,
      text,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

/**
 * POST /report/weekly/telegram - Send weekly report to Telegram
 */
report.post('/weekly/telegram', async (c) => {
  try {
    if (!isTelegramConfigured()) {
      return c.json({
        ok: false,
        error: 'Telegram not configured',
      }, 400);
    }

    const userId = getUserId(c);
    const weeksAgo = parseInt(c.req.query('weeksAgo') || '0');

    const text = await getWeeklyReportText(userId, weeksAgo);
    const result = await sendMessage({ text, parseMode: 'Markdown' });

    return c.json({
      ok: true,
      message: 'Weekly report sent to Telegram!',
      messageId: result.message_id,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ COMPARISON ============

/**
 * GET /report/compare - Compare this week vs last week
 */
report.get('/compare', async (c) => {
  try {
    const userId = getUserId(c);
    const comparison = await getWeekComparison(userId);

    return c.json({
      ok: true,
      ...comparison,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ LAST WEEK ============

/**
 * GET /report/lastweek - Shortcut for last week's report
 */
report.get('/lastweek', async (c) => {
  try {
    const userId = getUserId(c);
    const weeklyReport = await generateWeeklyReport(userId, 1);

    return c.json({
      ok: true,
      report: weeklyReport,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default report;

