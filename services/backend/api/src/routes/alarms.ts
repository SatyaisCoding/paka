// src/routes/alarms.ts
import { Hono } from 'hono';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, getValidatedBody } from '../middleware/validate.js';
import { z } from 'zod';
import {
  createAlarm,
  getUserAlarms,
  getActiveAlarms,
  getAlarm,
  updateAlarm,
  deleteAlarm,
  toggleAlarm,
  snoozeAlarm,
  getUpcomingAlarms,
  getTriggeredAlarms,
  markTriggered,
  getAlarmStats,
} from '../services/alarm.service.js';

const alarms = new Hono();

// Schemas
const createAlarmSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  time: z.string(), // ISO datetime or HH:MM
  repeat: z.enum(['none', 'daily', 'weekly', 'weekdays', 'weekends', 'custom']).optional(),
  repeatDays: z.array(z.number().int().min(0).max(6)).optional(), // 0-6 for Sun-Sat
  sound: z.string().max(100).optional(),
});

const updateAlarmSchema = createAlarmSchema.partial().extend({
  isActive: z.boolean().optional(),
});

const snoozeSchema = z.object({
  minutes: z.number().int().min(1).max(120).optional(),
});

// ============ ALARM ROUTES ============

// GET /alarms - List all alarms
alarms.get('/', authMiddleware, (c) => {
  try {
    const userId = getUserId(c);
    const activeOnly = c.req.query('active') === 'true';
    
    const userAlarms = activeOnly ? getActiveAlarms(userId) : getUserAlarms(userId);
    
    return c.json({
      ok: true,
      count: userAlarms.length,
      alarms: userAlarms,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /alarms/stats - Get alarm statistics
alarms.get('/stats', authMiddleware, (c) => {
  try {
    const userId = getUserId(c);
    const stats = getAlarmStats(userId);
    
    return c.json({
      ok: true,
      ...stats,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /alarms/upcoming - Get upcoming alarms
alarms.get('/upcoming', authMiddleware, (c) => {
  try {
    const userId = getUserId(c);
    const hours = parseInt(c.req.query('hours') || '24');
    
    const upcoming = getUpcomingAlarms(userId, hours);
    
    return c.json({
      ok: true,
      hours,
      count: upcoming.length,
      alarms: upcoming,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /alarms/triggered - Get alarms that should trigger now
alarms.get('/triggered', authMiddleware, (c) => {
  try {
    const userId = getUserId(c);
    const triggered = getTriggeredAlarms(userId);
    
    return c.json({
      ok: true,
      count: triggered.length,
      alarms: triggered,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /alarms/:id - Get single alarm
alarms.get('/:id', authMiddleware, (c) => {
  try {
    const userId = getUserId(c);
    const alarmId = c.req.param('id');
    
    const alarm = getAlarm(alarmId, userId);
    
    if (!alarm) {
      return c.json({ ok: false, error: 'Alarm not found' }, 404);
    }
    
    return c.json({
      ok: true,
      alarm,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /alarms - Create new alarm
alarms.post('/', authMiddleware, validateBody(createAlarmSchema), (c) => {
  try {
    const userId = getUserId(c);
    const input = getValidatedBody<z.infer<typeof createAlarmSchema>>(c);
    
    const alarm = createAlarm(userId, input);
    
    return c.json({
      ok: true,
      message: 'Alarm created successfully',
      alarm,
    }, 201);
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// PATCH /alarms/:id - Update alarm
alarms.patch('/:id', authMiddleware, validateBody(updateAlarmSchema), (c) => {
  try {
    const userId = getUserId(c);
    const alarmId = c.req.param('id');
    const updates = getValidatedBody<z.infer<typeof updateAlarmSchema>>(c);
    
    const alarm = updateAlarm(alarmId, userId, updates);
    
    if (!alarm) {
      return c.json({ ok: false, error: 'Alarm not found' }, 404);
    }
    
    return c.json({
      ok: true,
      message: 'Alarm updated successfully',
      alarm,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /alarms/:id/toggle - Toggle alarm on/off
alarms.post('/:id/toggle', authMiddleware, (c) => {
  try {
    const userId = getUserId(c);
    const alarmId = c.req.param('id');
    
    const alarm = toggleAlarm(alarmId, userId);
    
    if (!alarm) {
      return c.json({ ok: false, error: 'Alarm not found' }, 404);
    }
    
    return c.json({
      ok: true,
      message: `Alarm ${alarm.isActive ? 'activated' : 'deactivated'}`,
      alarm,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /alarms/:id/snooze - Snooze alarm
alarms.post('/:id/snooze', authMiddleware, validateBody(snoozeSchema), (c) => {
  try {
    const userId = getUserId(c);
    const alarmId = c.req.param('id');
    const { minutes = 5 } = getValidatedBody<{ minutes?: number }>(c);
    
    const alarm = snoozeAlarm(alarmId, userId, minutes);
    
    if (!alarm) {
      return c.json({ ok: false, error: 'Alarm not found' }, 404);
    }
    
    return c.json({
      ok: true,
      message: `Alarm snoozed for ${minutes} minutes`,
      alarm,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /alarms/:id/triggered - Mark alarm as triggered
alarms.post('/:id/triggered', authMiddleware, (c) => {
  try {
    const userId = getUserId(c);
    const alarmId = c.req.param('id');
    
    const alarm = markTriggered(alarmId, userId);
    
    if (!alarm) {
      return c.json({ ok: false, error: 'Alarm not found' }, 404);
    }
    
    return c.json({
      ok: true,
      message: 'Alarm marked as triggered',
      alarm,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// DELETE /alarms/:id - Delete alarm
alarms.delete('/:id', authMiddleware, (c) => {
  try {
    const userId = getUserId(c);
    const alarmId = c.req.param('id');
    
    const deleted = deleteAlarm(alarmId, userId);
    
    if (!deleted) {
      return c.json({ ok: false, error: 'Alarm not found' }, 404);
    }
    
    return c.json({
      ok: true,
      message: 'Alarm deleted successfully',
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default alarms;

