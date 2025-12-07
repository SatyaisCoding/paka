// src/routes/calendar.ts
import { Hono } from 'hono';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, getValidatedBody } from '../middleware/validate.js';
import { z } from 'zod';
import { isGoogleAuthenticated } from '../services/google-auth.service.js';
import {
  listCalendars,
  listEvents,
  getTodayEvents,
  getWeekEvents,
  getUpcomingEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  quickAddEvent,
  getFreeBusy,
} from '../services/calendar.service.js';
import { chat } from '../services/llm.service.js';

const calendar = new Hono();

// Schemas
const createEventSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(5000).optional(),
  location: z.string().max(500).optional(),
  start: z.string(), // ISO datetime
  end: z.string(),   // ISO datetime
  allDay: z.boolean().optional(),
  attendees: z.array(z.string().email()).optional(),
  reminders: z.array(z.object({
    method: z.enum(['email', 'popup']),
    minutes: z.number().int().min(0).max(40320), // up to 4 weeks
  })).optional(),
  recurrence: z.array(z.string()).optional(),
});

const updateEventSchema = createEventSchema.partial();

const quickAddSchema = z.object({
  text: z.string().min(1).max(500),
});

// ============ CALENDAR ROUTES ============

// GET /calendar/status - Check if calendar is connected
calendar.get('/status', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({
        ok: true,
        connected: false,
        message: 'Google Calendar not connected. Use /google/auth to connect.',
      });
    }
    
    const calendars = await listCalendars();
    const primaryCalendar = calendars.find(cal => cal.primary);
    
    return c.json({
      ok: true,
      connected: true,
      primaryCalendar: primaryCalendar?.name || 'Unknown',
      totalCalendars: calendars.length,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /calendar/calendars - List all calendars
calendar.get('/calendars', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google Calendar not connected' }, 401);
    }
    
    const calendars = await listCalendars();
    
    return c.json({
      ok: true,
      count: calendars.length,
      calendars,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /calendar/events/today - Get today's events
calendar.get('/events/today', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google Calendar not connected' }, 401);
    }
    
    const events = await getTodayEvents();
    
    return c.json({
      ok: true,
      date: new Date().toISOString().split('T')[0],
      count: events.length,
      events,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /calendar/events/week - Get this week's events
calendar.get('/events/week', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google Calendar not connected' }, 401);
    }
    
    const events = await getWeekEvents();
    
    return c.json({
      ok: true,
      count: events.length,
      events,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /calendar/events/upcoming - Get upcoming events
calendar.get('/events/upcoming', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google Calendar not connected' }, 401);
    }
    
    const days = parseInt(c.req.query('days') || '7');
    const limit = parseInt(c.req.query('limit') || '20');
    
    const events = await getUpcomingEvents(days, limit);
    
    return c.json({
      ok: true,
      days,
      count: events.length,
      events,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /calendar/events - List events with filters
calendar.get('/events', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google Calendar not connected' }, 401);
    }
    
    const query = c.req.query();
    
    const events = await listEvents({
      timeMin: query.timeMin,
      timeMax: query.timeMax,
      maxResults: query.maxResults ? parseInt(query.maxResults) : 50,
      q: query.q,
      calendarId: query.calendarId,
    });
    
    return c.json({
      ok: true,
      count: events.length,
      events,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /calendar/events/:id - Get single event
calendar.get('/events/:id', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google Calendar not connected' }, 401);
    }
    
    const eventId = c.req.param('id');
    const calendarId = c.req.query('calendarId') || 'primary';
    
    const event = await getEvent(eventId, calendarId);
    
    return c.json({
      ok: true,
      event,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /calendar/events - Create new event
calendar.post('/events', authMiddleware, validateBody(createEventSchema), async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google Calendar not connected' }, 401);
    }
    
    const input = getValidatedBody<z.infer<typeof createEventSchema>>(c);
    const calendarId = c.req.query('calendarId') || 'primary';
    
    const event = await createEvent(input, calendarId);
    
    return c.json({
      ok: true,
      message: 'Event created successfully',
      event,
    }, 201);
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /calendar/events/quick - Quick add event with natural language
calendar.post('/events/quick', authMiddleware, validateBody(quickAddSchema), async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google Calendar not connected' }, 401);
    }
    
    const { text } = getValidatedBody<{ text: string }>(c);
    const calendarId = c.req.query('calendarId') || 'primary';
    
    const event = await quickAddEvent(text, calendarId);
    
    return c.json({
      ok: true,
      message: 'Event created from text',
      event,
    }, 201);
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// PATCH /calendar/events/:id - Update event
calendar.patch('/events/:id', authMiddleware, validateBody(updateEventSchema), async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google Calendar not connected' }, 401);
    }
    
    const eventId = c.req.param('id');
    const updates = getValidatedBody<z.infer<typeof updateEventSchema>>(c);
    const calendarId = c.req.query('calendarId') || 'primary';
    
    const event = await updateEvent(eventId, updates, calendarId);
    
    return c.json({
      ok: true,
      message: 'Event updated successfully',
      event,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// DELETE /calendar/events/:id - Delete event
calendar.delete('/events/:id', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google Calendar not connected' }, 401);
    }
    
    const eventId = c.req.param('id');
    const calendarId = c.req.query('calendarId') || 'primary';
    
    await deleteEvent(eventId, calendarId);
    
    return c.json({
      ok: true,
      message: 'Event deleted successfully',
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ AI SUMMARY ============

// GET /calendar/summary/today - AI summary of today's schedule
calendar.get('/summary/today', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google Calendar not connected' }, 401);
    }
    
    const events = await getTodayEvents();
    
    if (events.length === 0) {
      return c.json({
        ok: true,
        date: new Date().toISOString().split('T')[0],
        totalEvents: 0,
        summary: 'You have no events scheduled for today. Enjoy your free day!',
      });
    }
    
    // Build event list for LLM
    const eventList = events.map((e, i) => {
      const time = e.allDay ? 'All day' : `${new Date(e.start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${new Date(e.end).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
      return `${i + 1}. ${time}: ${e.title}${e.location ? ` (at ${e.location})` : ''}`;
    }).join('\n');
    
    const response = await chat([
      {
        role: 'system',
        content: `You are a personal assistant. Summarize the user's calendar for today.
Be concise and helpful. Highlight important meetings or deadlines.
Format as a brief paragraph.`
      },
      {
        role: 'user',
        content: `Here are my ${events.length} events for today:\n\n${eventList}\n\nPlease summarize my day.`
      }
    ]);
    
    return c.json({
      ok: true,
      date: new Date().toISOString().split('T')[0],
      totalEvents: events.length,
      summary: response.content,
      events: events.map(e => ({
        title: e.title,
        time: e.allDay ? 'All day' : e.start,
        location: e.location,
      })),
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /calendar/summary/week - AI summary of this week
calendar.get('/summary/week', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({ ok: false, error: 'Google Calendar not connected' }, 401);
    }
    
    const events = await getWeekEvents();
    
    if (events.length === 0) {
      return c.json({
        ok: true,
        totalEvents: 0,
        summary: 'You have no events scheduled for this week.',
      });
    }
    
    // Group by day
    const byDay: Record<string, typeof events> = {};
    for (const event of events) {
      const day = new Date(event.start).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
      if (!byDay[day]) byDay[day] = [];
      byDay[day].push(event);
    }
    
    const eventList = Object.entries(byDay).map(([day, dayEvents]) => {
      const items = dayEvents.map(e => `  - ${e.title}`).join('\n');
      return `${day}:\n${items}`;
    }).join('\n\n');
    
    const response = await chat([
      {
        role: 'system',
        content: `You are a personal assistant. Summarize the user's calendar for the week.
Highlight busy days, important meetings, and suggest time management tips if needed.
Be concise.`
      },
      {
        role: 'user',
        content: `Here's my week:\n\n${eventList}\n\nPlease summarize.`
      }
    ]);
    
    return c.json({
      ok: true,
      totalEvents: events.length,
      summary: response.content,
      byDay: Object.fromEntries(
        Object.entries(byDay).map(([day, evts]) => [day, evts.length])
      ),
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default calendar;

