// src/services/briefing.service.ts
// Daily Briefing Service - Combines weather, calendar, emails, tasks, reminders

import { getBriefWeather, getCurrentWeather } from './weather.service.js';
import { getTodayEvents } from './calendar.service.js';
import { getTodayEmails } from './gmail.service.js';
import { isGoogleAuthenticated } from './google-auth.service.js';
import { getUserAlarms } from './alarm.service.js';
import prisma from '../lib/prisma.js';
import { chat } from './llm.service.js';

// ============ INTERFACES ============

export interface BriefingWeather {
  available: boolean;
  city?: string;
  current?: string;
  today?: string;
  temperature?: number;
  icon?: string;
  error?: string;
}

export interface BriefingCalendar {
  available: boolean;
  totalEvents?: number;
  events?: {
    title: string;
    time: string;
    location?: string;
  }[];
  error?: string;
}

export interface BriefingEmail {
  available: boolean;
  totalEmails?: number;
  unread?: number;
  important?: {
    from: string;
    subject: string;
  }[];
  summary?: string;
  error?: string;
}

export interface BriefingTasks {
  available: boolean;
  pending?: number;
  dueToday?: number;
  overdue?: number;
  tasks?: {
    title: string;
    priority: string;
    dueDate?: string;
  }[];
}

export interface BriefingReminders {
  available: boolean;
  todayCount?: number;
  reminders?: {
    title: string;
    time: string;
  }[];
}

export interface BriefingAlarms {
  available: boolean;
  activeCount?: number;
  nextAlarm?: {
    title: string;
    time: string;
  };
}

export interface DailyBriefing {
  greeting: string;
  date: string;
  dayOfWeek: string;
  time: string;
  weather: BriefingWeather;
  calendar: BriefingCalendar;
  email: BriefingEmail;
  tasks: BriefingTasks;
  reminders: BriefingReminders;
  alarms: BriefingAlarms;
  aiSummary?: string;
}

// ============ HELPER FUNCTIONS ============

function getGreeting(name?: string): string {
  const hour = new Date().getHours();
  let greeting = '';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';
  else greeting = 'Good evening';
  
  return name ? `${greeting}, ${name}` : greeting;
}

/**
 * Get user's name from database
 */
async function getUserName(userId: number): Promise<string | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { displayName: true, email: true },
    });
    // Return displayName if available, otherwise first part of email
    if (user?.displayName) return user.displayName;
    if (user?.email) {
      // Capitalize first letter of email prefix
      const emailPrefix = user.email.split('@')[0];
      return emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
    }
    return undefined;
  } catch {
    return undefined;
  }
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ============ BRIEFING FUNCTIONS ============

/**
 * Get weather briefing
 */
async function getWeatherBriefing(city?: string): Promise<BriefingWeather> {
  try {
    const weather = await getCurrentWeather(city);
    const brief = await getBriefWeather(city);
    
    return {
      available: true,
      city: weather.city,
      current: brief.current,
      today: brief.today,
      temperature: weather.temperature,
      icon: weather.icon,
    };
  } catch (error: any) {
    return {
      available: false,
      error: error.message,
    };
  }
}

/**
 * Get calendar briefing
 */
async function getCalendarBriefing(): Promise<BriefingCalendar> {
  try {
    if (!isGoogleAuthenticated()) {
      return {
        available: false,
        error: 'Google Calendar not connected',
      };
    }

    const events = await getTodayEvents();
    
    return {
      available: true,
      totalEvents: events.length,
      events: events.map(e => ({
        title: e.title,
        time: e.allDay ? 'All day' : new Date(e.start).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        location: e.location,
      })),
    };
  } catch (error: any) {
    return {
      available: false,
      error: error.message,
    };
  }
}

/**
 * Get email briefing
 */
async function getEmailBriefing(): Promise<BriefingEmail> {
  try {
    if (!isGoogleAuthenticated()) {
      return {
        available: false,
        error: 'Gmail not connected',
      };
    }

    const emails = await getTodayEmails(10);
    const unread = emails.filter(e => e.unread).length;
    
    // Get important emails (starred or from known contacts)
    const important = emails
      .filter(e => e.unread)
      .slice(0, 5)
      .map(e => ({
        from: e.from.split('<')[0].trim(),
        subject: e.subject,
      }));

    return {
      available: true,
      totalEmails: emails.length,
      unread,
      important,
    };
  } catch (error: any) {
    return {
      available: false,
      error: error.message,
    };
  }
}

/**
 * Get tasks briefing
 */
async function getTasksBriefing(userId: number): Promise<BriefingTasks> {
  try {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        status: { not: 'COMPLETED' },
      },
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' },
      ],
      take: 10,
    });

    const pending = tasks.length;
    const dueToday = tasks.filter(t => t.dueDate && new Date(t.dueDate) <= today).length;
    const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date()).length;

    return {
      available: true,
      pending,
      dueToday,
      overdue,
      tasks: tasks.slice(0, 5).map(t => ({
        title: t.title,
        priority: t.priority,
        dueDate: t.dueDate?.toISOString(),
      })),
    };
  } catch (error: any) {
    return {
      available: false,
    };
  }
}

/**
 * Get reminders briefing
 */
async function getRemindersBriefing(userId: number): Promise<BriefingReminders> {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    const reminders = await prisma.reminder.findMany({
      where: {
        userId,
        remindAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
        isCompleted: false,
      },
      orderBy: { remindAt: 'asc' },
    });

    return {
      available: true,
      todayCount: reminders.length,
      reminders: reminders.map(r => ({
        title: r.title,
        time: formatTime(r.remindAt),
      })),
    };
  } catch (error: any) {
    return {
      available: false,
    };
  }
}

/**
 * Get alarms briefing
 */
async function getAlarmsBriefing(userId: number): Promise<BriefingAlarms> {
  try {
    const alarms = getUserAlarms(userId);
    const activeAlarms = alarms.filter(a => a.isActive);
    
    // Find next alarm
    const now = new Date();
    const upcomingAlarms = activeAlarms
      .map(a => ({
        ...a,
        alarmDate: new Date(a.time),
      }))
      .filter(a => a.alarmDate > now)
      .sort((a, b) => a.alarmDate.getTime() - b.alarmDate.getTime());

    const nextAlarm = upcomingAlarms[0];

    return {
      available: true,
      activeCount: activeAlarms.length,
      nextAlarm: nextAlarm ? {
        title: nextAlarm.title,
        time: formatTime(nextAlarm.alarmDate),
      } : undefined,
    };
  } catch (error: any) {
    return {
      available: false,
    };
  }
}

/**
 * Generate AI summary of the briefing
 */
async function generateAISummary(briefing: Omit<DailyBriefing, 'aiSummary'>): Promise<string> {
  const parts: string[] = [];

  // Weather
  if (briefing.weather.available) {
    parts.push(`Weather: ${briefing.weather.current}`);
  }

  // Calendar
  if (briefing.calendar.available && briefing.calendar.totalEvents! > 0) {
    parts.push(`Calendar: ${briefing.calendar.totalEvents} events today`);
    briefing.calendar.events?.slice(0, 3).forEach(e => {
      parts.push(`  - ${e.time}: ${e.title}`);
    });
  }

  // Emails
  if (briefing.email.available) {
    parts.push(`Emails: ${briefing.email.totalEmails} today, ${briefing.email.unread} unread`);
  }

  // Tasks
  if (briefing.tasks.available && briefing.tasks.pending! > 0) {
    parts.push(`Tasks: ${briefing.tasks.pending} pending, ${briefing.tasks.dueToday} due today`);
  }

  // Reminders
  if (briefing.reminders.available && briefing.reminders.todayCount! > 0) {
    parts.push(`Reminders: ${briefing.reminders.todayCount} for today`);
  }

  if (parts.length === 0) {
    return "You're all caught up! No pending items for today.";
  }

  try {
    const prompt = `You are a helpful personal assistant. Based on the following daily briefing data, provide a concise, friendly 2-3 sentence summary to help the user start their day. Be encouraging and highlight the most important items.

Data:
${parts.join('\n')}

Provide a brief, conversational summary:`;

    const response = await chat([
      { role: 'system', content: 'You are a helpful personal assistant providing a morning briefing.' },
      { role: 'user', content: prompt },
    ]);

    return response.content;
  } catch (error) {
    // Fallback to simple summary
    return parts.join('. ');
  }
}

// ============ MAIN FUNCTIONS ============

/**
 * Get full daily briefing
 */
export async function getDailyBriefing(
  userId: number,
  options: {
    city?: string;
    includeAISummary?: boolean;
  } = {}
): Promise<DailyBriefing> {
  const now = new Date();
  const { city, includeAISummary = true } = options;

  // Fetch user name and all briefing data in parallel
  const [userName, weather, calendar, email, tasks, reminders, alarms] = await Promise.all([
    getUserName(userId),
    getWeatherBriefing(city),
    getCalendarBriefing(),
    getEmailBriefing(),
    getTasksBriefing(userId),
    getRemindersBriefing(userId),
    getAlarmsBriefing(userId),
  ]);

  const briefing: DailyBriefing = {
    greeting: getGreeting(userName),
    date: formatDate(now),
    dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }),
    time: formatTime(now),
    weather,
    calendar,
    email,
    tasks,
    reminders,
    alarms,
  };

  // Generate AI summary if requested
  if (includeAISummary) {
    briefing.aiSummary = await generateAISummary(briefing);
  }

  return briefing;
}

/**
 * Get quick briefing (minimal data)
 */
export async function getQuickBriefing(
  userId: number,
  city?: string
): Promise<{
  greeting: string;
  weather: string;
  events: number;
  emails: number;
  tasks: number;
}> {
  const [userName, weather, calendar, email, tasks] = await Promise.all([
    getUserName(userId),
    getWeatherBriefing(city),
    getCalendarBriefing(),
    getEmailBriefing(),
    getTasksBriefing(userId),
  ]);

  return {
    greeting: getGreeting(userName),
    weather: weather.available ? weather.current! : 'Weather unavailable',
    events: calendar.available ? calendar.totalEvents! : 0,
    emails: email.available ? email.unread! : 0,
    tasks: tasks.available ? tasks.pending! : 0,
  };
}

/**
 * Get briefing as formatted text (for Telegram/notifications)
 */
export async function getBriefingText(userId: number, city?: string): Promise<string> {
  const briefing = await getDailyBriefing(userId, { city, includeAISummary: false });
  
  const lines: string[] = [
    `🌅 *${briefing.greeting}!*`,
    `📅 ${briefing.date}`,
    '',
  ];

  // Weather
  if (briefing.weather.available) {
    lines.push(`${briefing.weather.icon} *Weather:* ${briefing.weather.current}`);
    lines.push(`   ${briefing.weather.today}`);
    lines.push('');
  }

  // Calendar
  if (briefing.calendar.available) {
    if (briefing.calendar.totalEvents! > 0) {
      lines.push(`📅 *${briefing.calendar.totalEvents} Events Today:*`);
      briefing.calendar.events?.slice(0, 5).forEach(e => {
        lines.push(`   • ${e.time}: ${e.title}`);
      });
    } else {
      lines.push('📅 *Calendar:* No events today');
    }
    lines.push('');
  }

  // Emails
  if (briefing.email.available) {
    lines.push(`📧 *Emails:* ${briefing.email.unread} unread of ${briefing.email.totalEmails} today`);
    if (briefing.email.important && briefing.email.important.length > 0) {
      lines.push('   *Important:*');
      briefing.email.important.slice(0, 3).forEach(e => {
        lines.push(`   • ${e.from}: ${e.subject.substring(0, 40)}...`);
      });
    }
    lines.push('');
  }

  // Tasks
  if (briefing.tasks.available && briefing.tasks.pending! > 0) {
    lines.push(`✅ *Tasks:* ${briefing.tasks.pending} pending`);
    if (briefing.tasks.dueToday! > 0) {
      lines.push(`   ⚠️ ${briefing.tasks.dueToday} due today`);
    }
    if (briefing.tasks.overdue! > 0) {
      lines.push(`   🔴 ${briefing.tasks.overdue} overdue`);
    }
    lines.push('');
  }

  // Reminders
  if (briefing.reminders.available && briefing.reminders.todayCount! > 0) {
    lines.push(`🔔 *${briefing.reminders.todayCount} Reminders Today:*`);
    briefing.reminders.reminders?.forEach(r => {
      lines.push(`   • ${r.time}: ${r.title}`);
    });
    lines.push('');
  }

  // Alarms
  if (briefing.alarms.available && briefing.alarms.nextAlarm) {
    lines.push(`⏰ *Next Alarm:* ${briefing.alarms.nextAlarm.time} - ${briefing.alarms.nextAlarm.title}`);
  }

  return lines.join('\n');
}

