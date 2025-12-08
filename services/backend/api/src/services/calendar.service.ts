// src/services/calendar.service.ts
import { google, calendar_v3 } from 'googleapis';
import { getAuthenticatedClient, isGoogleAuthenticated } from './google-auth.service.js';

/**
 * Get Google Calendar client
 */
export async function getCalendarClient(): Promise<calendar_v3.Calendar> {
  const oauth2Client = await getAuthenticatedClient();
  return google.calendar({ version: 'v3', auth: oauth2Client });
}

// ============ INTERFACES ============

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  allDay: boolean;
  status: string;
  htmlLink: string;
  attendees: { email: string; name?: string; responseStatus?: string }[];
  organizer: { email: string; name?: string };
  recurrence?: string[];
  reminders?: { method: string; minutes: number }[];
}

export interface CreateEventInput {
  title: string;
  description?: string;
  location?: string;
  start: string; // ISO datetime or date
  end: string;   // ISO datetime or date
  allDay?: boolean;
  attendees?: string[]; // emails
  reminders?: { method: 'email' | 'popup'; minutes: number }[];
  recurrence?: string[]; // RRULE strings
}

export interface EventFilter {
  timeMin?: string; // ISO datetime
  timeMax?: string; // ISO datetime
  maxResults?: number;
  q?: string; // search query
  calendarId?: string;
}

// ============ HELPER FUNCTIONS ============

/**
 * Parse Google Calendar event to our format
 */
function parseEvent(event: calendar_v3.Schema$Event): CalendarEvent {
  const isAllDay = !event.start?.dateTime;
  
  return {
    id: event.id || '',
    title: event.summary || '(No title)',
    description: event.description || '',
    location: event.location || '',
    start: event.start?.dateTime || event.start?.date || '',
    end: event.end?.dateTime || event.end?.date || '',
    allDay: isAllDay,
    status: event.status || 'confirmed',
    htmlLink: event.htmlLink || '',
    attendees: (event.attendees || []).map(a => ({
      email: a.email || '',
      name: a.displayName,
      responseStatus: a.responseStatus,
    })),
    organizer: {
      email: event.organizer?.email || '',
      name: event.organizer?.displayName,
    },
    recurrence: event.recurrence,
    reminders: event.reminders?.overrides?.map(r => ({
      method: r.method || 'popup',
      minutes: r.minutes || 10,
    })),
  };
}

/**
 * Get start/end of today
 */
function getTodayRange(): { start: string; end: string } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  
  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

/**
 * Get start/end of this week
 */
function getWeekRange(): { start: string; end: string } {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const start = new Date(now);
  start.setDate(now.getDate() - dayOfWeek); // Sunday
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  
  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

// ============ CALENDAR FUNCTIONS ============

/**
 * List user's calendars
 */
export async function listCalendars(): Promise<{ id: string; name: string; primary: boolean }[]> {
  const calendar = await getCalendarClient();
  
  const { data } = await calendar.calendarList.list();
  
  return (data.items || []).map(cal => ({
    id: cal.id || '',
    name: cal.summary || '',
    primary: cal.primary || false,
  }));
}

/**
 * List events with optional filters
 */
export async function listEvents(filter: EventFilter = {}): Promise<CalendarEvent[]> {
  const calendar = await getCalendarClient();
  
  const { data } = await calendar.events.list({
    calendarId: filter.calendarId || 'primary',
    timeMin: filter.timeMin,
    timeMax: filter.timeMax,
    maxResults: filter.maxResults || 50,
    singleEvents: true,
    orderBy: 'startTime',
    q: filter.q,
  });
  
  return (data.items || []).map(parseEvent);
}

/**
 * Get today's events
 */
export async function getTodayEvents(): Promise<CalendarEvent[]> {
  const { start, end } = getTodayRange();
  return listEvents({ timeMin: start, timeMax: end });
}

/**
 * Get this week's events
 */
export async function getWeekEvents(): Promise<CalendarEvent[]> {
  const { start, end } = getWeekRange();
  return listEvents({ timeMin: start, timeMax: end });
}

/**
 * Get upcoming events (next N days)
 */
export async function getUpcomingEvents(days: number = 7, maxResults: number = 20): Promise<CalendarEvent[]> {
  const now = new Date();
  const end = new Date(now);
  end.setDate(now.getDate() + days);
  
  return listEvents({
    timeMin: now.toISOString(),
    timeMax: end.toISOString(),
    maxResults,
  });
}

/**
 * Get single event by ID
 */
export async function getEvent(eventId: string, calendarId: string = 'primary'): Promise<CalendarEvent> {
  const calendar = await getCalendarClient();
  
  const { data } = await calendar.events.get({
    calendarId,
    eventId,
  });
  
  return parseEvent(data);
}

/**
 * Create a new event
 */
export async function createEvent(input: CreateEventInput, calendarId: string = 'primary'): Promise<CalendarEvent> {
  const calendar = await getCalendarClient();
  
  const eventBody: calendar_v3.Schema$Event = {
    summary: input.title,
    description: input.description,
    location: input.location,
    start: input.allDay
      ? { date: input.start.split('T')[0] }
      : { dateTime: input.start, timeZone: 'Asia/Kolkata' },
    end: input.allDay
      ? { date: input.end.split('T')[0] }
      : { dateTime: input.end, timeZone: 'Asia/Kolkata' },
    attendees: input.attendees?.map(email => ({ email })),
    recurrence: input.recurrence,
  };
  
  if (input.reminders && input.reminders.length > 0) {
    eventBody.reminders = {
      useDefault: false,
      overrides: input.reminders.map(r => ({
        method: r.method,
        minutes: r.minutes,
      })),
    };
  }
  
  const { data } = await calendar.events.insert({
    calendarId,
    requestBody: eventBody,
    sendUpdates: 'all',
  });
  
  return parseEvent(data);
}

/**
 * Update an event
 */
export async function updateEvent(
  eventId: string,
  updates: Partial<CreateEventInput>,
  calendarId: string = 'primary'
): Promise<CalendarEvent> {
  const calendar = await getCalendarClient();
  
  // Get existing event
  const { data: existing } = await calendar.events.get({
    calendarId,
    eventId,
  });
  
  // Merge updates
  const eventBody: calendar_v3.Schema$Event = {
    ...existing,
    summary: updates.title ?? existing.summary,
    description: updates.description ?? existing.description,
    location: updates.location ?? existing.location,
  };
  
  if (updates.start) {
    eventBody.start = updates.allDay
      ? { date: updates.start.split('T')[0] }
      : { dateTime: updates.start, timeZone: 'Asia/Kolkata' };
  }
  
  if (updates.end) {
    eventBody.end = updates.allDay
      ? { date: updates.end.split('T')[0] }
      : { dateTime: updates.end, timeZone: 'Asia/Kolkata' };
  }
  
  if (updates.attendees) {
    eventBody.attendees = updates.attendees.map(email => ({ email }));
  }
  
  const { data } = await calendar.events.update({
    calendarId,
    eventId,
    requestBody: eventBody,
    sendUpdates: 'all',
  });
  
  return parseEvent(data);
}

/**
 * Delete an event
 */
export async function deleteEvent(eventId: string, calendarId: string = 'primary'): Promise<void> {
  const calendar = await getCalendarClient();
  
  await calendar.events.delete({
    calendarId,
    eventId,
    sendUpdates: 'all',
  });
}

/**
 * Quick add event using natural language
 */
export async function quickAddEvent(text: string, calendarId: string = 'primary'): Promise<CalendarEvent> {
  const calendar = await getCalendarClient();
  
  const { data } = await calendar.events.quickAdd({
    calendarId,
    text,
  });
  
  return parseEvent(data);
}

/**
 * Get free/busy info
 */
export async function getFreeBusy(
  timeMin: string,
  timeMax: string,
  calendars: string[] = ['primary']
): Promise<{ calendar: string; busy: { start: string; end: string }[] }[]> {
  const calendarClient = await getCalendarClient();
  
  const { data } = await calendarClient.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      items: calendars.map(id => ({ id })),
    },
  });
  
  return calendars.map(cal => ({
    calendar: cal,
    busy: (data.calendars?.[cal]?.busy || []).map(b => ({
      start: b.start || '',
      end: b.end || '',
    })),
  }));
}

