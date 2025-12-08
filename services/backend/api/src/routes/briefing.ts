// src/routes/briefing.ts
// Daily Briefing Routes - One API call for morning summary

import { Hono } from 'hono';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import {
  getDailyBriefing,
  getQuickBriefing,
  getBriefingText,
} from '../services/briefing.service.js';
import { sendMessage as sendTelegramMessage, isTelegramConfigured } from '../services/telegram.service.js';

const briefing = new Hono();

// All briefing routes require authentication
briefing.use('*', authMiddleware);

// ============ FULL BRIEFING ============

/**
 * GET /briefing - Get full daily briefing
 * 
 * Query params:
 * - city: City for weather (default: Delhi)
 * - ai: Include AI summary (default: true)
 */
briefing.get('/', async (c) => {
  try {
    const userId = getUserId(c);
    const city = c.req.query('city');
    const includeAI = c.req.query('ai') !== 'false';

    const data = await getDailyBriefing(userId, {
      city,
      includeAISummary: includeAI,
    });

    return c.json({
      ok: true,
      briefing: data,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ QUICK BRIEFING ============

/**
 * GET /briefing/quick - Get quick briefing summary
 * 
 * Returns minimal data for quick display or notifications
 */
briefing.get('/quick', async (c) => {
  try {
    const userId = getUserId(c);
    const city = c.req.query('city');

    const data = await getQuickBriefing(userId, city);

    return c.json({
      ok: true,
      ...data,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ TEXT BRIEFING ============

/**
 * GET /briefing/text - Get briefing as formatted text
 * 
 * Returns markdown-formatted text suitable for Telegram or notifications
 */
briefing.get('/text', async (c) => {
  try {
    const userId = getUserId(c);
    const city = c.req.query('city');

    const text = await getBriefingText(userId, city);

    return c.json({
      ok: true,
      text,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ SEND TO TELEGRAM ============

/**
 * POST /briefing/telegram - Send daily briefing to Telegram
 * 
 * Sends the formatted briefing to your configured Telegram chat
 */
briefing.post('/telegram', async (c) => {
  try {
    if (!isTelegramConfigured()) {
      return c.json({
        ok: false,
        error: 'Telegram not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.',
      }, 400);
    }

    const userId = getUserId(c);
    const city = c.req.query('city');

    const text = await getBriefingText(userId, city);
    const result = await sendTelegramMessage(text);

    return c.json({
      ok: true,
      message: 'Briefing sent to Telegram!',
      messageId: result.message_id,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ WEATHER ONLY ============

/**
 * GET /briefing/weather - Get just weather briefing
 */
briefing.get('/weather', async (c) => {
  try {
    const userId = getUserId(c);
    const city = c.req.query('city');

    const data = await getDailyBriefing(userId, {
      city,
      includeAISummary: false,
    });

    return c.json({
      ok: true,
      weather: data.weather,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ CALENDAR ONLY ============

/**
 * GET /briefing/calendar - Get just calendar briefing
 */
briefing.get('/calendar', async (c) => {
  try {
    const userId = getUserId(c);

    const data = await getDailyBriefing(userId, {
      includeAISummary: false,
    });

    return c.json({
      ok: true,
      calendar: data.calendar,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ EMAIL ONLY ============

/**
 * GET /briefing/email - Get just email briefing
 */
briefing.get('/email', async (c) => {
  try {
    const userId = getUserId(c);

    const data = await getDailyBriefing(userId, {
      includeAISummary: false,
    });

    return c.json({
      ok: true,
      email: data.email,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ TASKS ONLY ============

/**
 * GET /briefing/tasks - Get just tasks briefing
 */
briefing.get('/tasks', async (c) => {
  try {
    const userId = getUserId(c);

    const data = await getDailyBriefing(userId, {
      includeAISummary: false,
    });

    return c.json({
      ok: true,
      tasks: data.tasks,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default briefing;

