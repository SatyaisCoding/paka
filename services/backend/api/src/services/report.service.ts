// src/services/report.service.ts
// Weekly Report Service - AI-powered summary of your week

import { listEmails } from './gmail.service.js';
import { listEvents } from './calendar.service.js';
import { isGoogleAuthenticated } from './google-auth.service.js';
import prisma from '../lib/prisma.js';
import { chat } from './llm.service.js';

// ============ INTERFACES ============

export interface WeeklyEmailStats {
  received: number;
  sent: number;
  unread: number;
  topSenders: { name: string; count: number }[];
  importantSubjects: string[];
}

export interface WeeklyCalendarStats {
  totalEvents: number;
  totalHours: number;
  byDay: { day: string; count: number }[];
  categories: { type: string; count: number }[];
  busyDays: string[];
}

export interface WeeklyTaskStats {
  created: number;
  completed: number;
  pending: number;
  overdue: number;
  completionRate: number;
}

export interface WeeklyReminderStats {
  total: number;
  completed: number;
  missed: number;
}

export interface WeeklyReport {
  period: {
    start: string;
    end: string;
    weekNumber: number;
  };
  email: WeeklyEmailStats | { available: false; error: string };
  calendar: WeeklyCalendarStats | { available: false; error: string };
  tasks: WeeklyTaskStats;
  reminders: WeeklyReminderStats;
  highlights: string[];
  aiSummary: string;
  generatedAt: string;
}

// ============ HELPER FUNCTIONS ============

function getWeekRange(weeksAgo: number = 0): { start: Date; end: Date } {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday
  
  // Start of this week (Monday)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - currentDay + 1 - (weeksAgo * 7));
  startOfWeek.setHours(0, 0, 0, 0);
  
  // End of week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return { start: startOfWeek, end: endOfWeek };
}

function getWeekNumber(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function getDayName(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

// ============ DATA COLLECTION ============

async function getEmailStats(start: Date, end: Date): Promise<WeeklyEmailStats | { available: false; error: string }> {
  try {
    if (!isGoogleAuthenticated()) {
      return { available: false, error: 'Gmail not connected' };
    }

    // Get emails from this week
    const startStr = `${start.getFullYear()}/${start.getMonth() + 1}/${start.getDate()}`;
    const emails = await listEmails({ after: startStr, maxResults: 200 });
    
    // Filter to only this week
    const weekEmails = emails.filter(e => {
      const emailDate = new Date(e.date);
      return emailDate >= start && emailDate <= end;
    });

    // Count sent vs received
    const sent = weekEmails.filter(e => e.from.includes('satyaprakash74029@gmail.com')).length;
    const received = weekEmails.length - sent;
    const unread = weekEmails.filter(e => e.unread).length;

    // Top senders
    const senderCounts: Record<string, number> = {};
    weekEmails.forEach(e => {
      const senderName = e.from.split('<')[0].trim() || e.from;
      senderCounts[senderName] = (senderCounts[senderName] || 0) + 1;
    });
    
    const topSenders = Object.entries(senderCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Important subjects (unread or recent)
    const importantSubjects = weekEmails
      .filter(e => e.unread)
      .slice(0, 5)
      .map(e => e.subject);

    return {
      received,
      sent,
      unread,
      topSenders,
      importantSubjects,
    };
  } catch (error: any) {
    return { available: false, error: error.message };
  }
}

async function getCalendarStats(start: Date, end: Date): Promise<WeeklyCalendarStats | { available: false; error: string }> {
  try {
    if (!isGoogleAuthenticated()) {
      return { available: false, error: 'Calendar not connected' };
    }

    const events = await listEvents({
      timeMin: start,
      timeMax: end,
      maxResults: 100,
    });

    // Calculate total hours
    let totalMinutes = 0;
    events.forEach(e => {
      if (!e.allDay) {
        const startTime = new Date(e.start).getTime();
        const endTime = new Date(e.end).getTime();
        totalMinutes += (endTime - startTime) / (1000 * 60);
      }
    });

    // Count by day
    const dayCounts: Record<string, number> = {};
    events.forEach(e => {
      const day = getDayName(new Date(e.start));
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });

    const byDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      .map(day => ({ day, count: dayCounts[day] || 0 }));

    // Find busy days (3+ events)
    const busyDays = byDay.filter(d => d.count >= 3).map(d => d.day);

    // Categorize events (simple keyword matching)
    const categories: Record<string, number> = {
      'Meetings': 0,
      'Calls': 0,
      'Personal': 0,
      'Other': 0,
    };

    events.forEach(e => {
      const title = e.title.toLowerCase();
      if (title.includes('meeting') || title.includes('sync') || title.includes('standup')) {
        categories['Meetings']++;
      } else if (title.includes('call') || title.includes('chat')) {
        categories['Calls']++;
      } else if (title.includes('lunch') || title.includes('break') || title.includes('personal')) {
        categories['Personal']++;
      } else {
        categories['Other']++;
      }
    });

    return {
      totalEvents: events.length,
      totalHours: Math.round(totalMinutes / 60 * 10) / 10,
      byDay,
      categories: Object.entries(categories)
        .filter(([_, count]) => count > 0)
        .map(([type, count]) => ({ type, count })),
      busyDays,
    };
  } catch (error: any) {
    return { available: false, error: error.message };
  }
}

async function getTaskStats(userId: number, start: Date, end: Date): Promise<WeeklyTaskStats> {
  try {
    // Tasks created this week
    const created = await prisma.task.count({
      where: {
        userId,
        createdAt: { gte: start, lte: end },
      },
    });

    // Tasks completed this week
    const completed = await prisma.task.count({
      where: {
        userId,
        completed: true,
        updatedAt: { gte: start, lte: end },
      },
    });

    // Pending tasks
    const pending = await prisma.task.count({
      where: {
        userId,
        completed: false,
      },
    });

    // Overdue tasks
    const overdue = await prisma.task.count({
      where: {
        userId,
        completed: false,
        dueAt: { lt: new Date() },
      },
    });

    const completionRate = created > 0 ? Math.round((completed / created) * 100) : 0;

    return { created, completed, pending, overdue, completionRate };
  } catch {
    return { created: 0, completed: 0, pending: 0, overdue: 0, completionRate: 0 };
  }
}

async function getReminderStats(userId: number, start: Date, end: Date): Promise<WeeklyReminderStats> {
  try {
    const total = await prisma.reminder.count({
      where: {
        userId,
        remindAt: { gte: start, lte: end },
      },
    });

    const completed = await prisma.reminder.count({
      where: {
        userId,
        remindAt: { gte: start, lte: end },
        sent: true,
      },
    });

    return {
      total,
      completed,
      missed: total - completed,
    };
  } catch {
    return { total: 0, completed: 0, missed: 0 };
  }
}

// ============ AI SUMMARY ============

async function generateWeeklyAISummary(report: Omit<WeeklyReport, 'aiSummary'>): Promise<string> {
  const parts: string[] = [];
  
  parts.push(`Week of ${report.period.start} to ${report.period.end}`);
  
  // Email stats
  if ('received' in report.email) {
    parts.push(`\nEmails: ${report.email.received} received, ${report.email.sent} sent, ${report.email.unread} unread`);
    if (report.email.topSenders.length > 0) {
      parts.push(`Top senders: ${report.email.topSenders.map(s => s.name).join(', ')}`);
    }
  }
  
  // Calendar stats
  if ('totalEvents' in report.calendar) {
    parts.push(`\nCalendar: ${report.calendar.totalEvents} events, ${report.calendar.totalHours} hours in meetings`);
    if (report.calendar.busyDays.length > 0) {
      parts.push(`Busiest days: ${report.calendar.busyDays.join(', ')}`);
    }
  }
  
  // Task stats
  parts.push(`\nTasks: ${report.tasks.created} created, ${report.tasks.completed} completed (${report.tasks.completionRate}% completion rate)`);
  if (report.tasks.overdue > 0) {
    parts.push(`⚠️ ${report.tasks.overdue} overdue tasks`);
  }
  
  // Reminders
  if (report.reminders.total > 0) {
    parts.push(`\nReminders: ${report.reminders.completed}/${report.reminders.total} completed`);
  }

  try {
    const prompt = `You are a helpful personal assistant creating a weekly productivity report. 
Based on the following data, write a friendly, encouraging 3-4 sentence summary of the person's week.
Include specific numbers and highlight achievements. If there are areas for improvement (like overdue tasks), mention them gently.
Keep it conversational and motivating.

Data:
${parts.join('\n')}

Write the summary:`;

    const response = await chat([
      { role: 'system', content: 'You are a helpful assistant creating weekly productivity summaries.' },
      { role: 'user', content: prompt },
    ]);

    return response.content;
  } catch {
    return parts.join('\n');
  }
}

function generateHighlights(report: Omit<WeeklyReport, 'aiSummary' | 'highlights'>): string[] {
  const highlights: string[] = [];
  
  // Email highlights
  if ('received' in report.email) {
    if (report.email.received > 50) {
      highlights.push(`📧 Busy inbox: ${report.email.received} emails received`);
    }
    if (report.email.unread === 0) {
      highlights.push('✅ Inbox zero achieved!');
    }
  }
  
  // Calendar highlights
  if ('totalEvents' in report.calendar) {
    if (report.calendar.totalEvents > 20) {
      highlights.push(`📅 Meeting-heavy week: ${report.calendar.totalEvents} events`);
    }
    if (report.calendar.totalHours > 20) {
      highlights.push(`⏰ ${report.calendar.totalHours} hours in meetings`);
    }
  }
  
  // Task highlights
  if (report.tasks.completionRate >= 80) {
    highlights.push(`🎯 Great productivity: ${report.tasks.completionRate}% task completion`);
  }
  if (report.tasks.completed > 10) {
    highlights.push(`✅ ${report.tasks.completed} tasks completed!`);
  }
  if (report.tasks.overdue > 0) {
    highlights.push(`⚠️ ${report.tasks.overdue} overdue tasks need attention`);
  }
  
  return highlights;
}

// ============ MAIN FUNCTIONS ============

/**
 * Generate weekly report for a user
 * @param userId - User ID
 * @param weeksAgo - 0 = current week, 1 = last week, etc.
 */
export async function generateWeeklyReport(userId: number, weeksAgo: number = 0): Promise<WeeklyReport> {
  const { start, end } = getWeekRange(weeksAgo);
  
  // Collect all stats in parallel
  const [email, calendar, tasks, reminders] = await Promise.all([
    getEmailStats(start, end),
    getCalendarStats(start, end),
    getTaskStats(userId, start, end),
    getReminderStats(userId, start, end),
  ]);

  const partialReport = {
    period: {
      start: formatDate(start),
      end: formatDate(end),
      weekNumber: getWeekNumber(start),
    },
    email,
    calendar,
    tasks,
    reminders,
    generatedAt: new Date().toISOString(),
  };

  const highlights = generateHighlights(partialReport);
  const aiSummary = await generateWeeklyAISummary({ ...partialReport, highlights });

  return {
    ...partialReport,
    highlights,
    aiSummary,
  };
}

/**
 * Get formatted text report (for Telegram/email)
 */
export async function getWeeklyReportText(userId: number, weeksAgo: number = 0): Promise<string> {
  const report = await generateWeeklyReport(userId, weeksAgo);
  
  const lines: string[] = [
    `📊 *Weekly Report*`,
    `📅 ${report.period.start} - ${report.period.end} (Week ${report.period.weekNumber})`,
    '',
  ];

  // Email section
  if ('received' in report.email) {
    lines.push('📧 *Email*');
    lines.push(`   Received: ${report.email.received} | Sent: ${report.email.sent} | Unread: ${report.email.unread}`);
    if (report.email.topSenders.length > 0) {
      lines.push(`   Top senders: ${report.email.topSenders.slice(0, 3).map(s => s.name).join(', ')}`);
    }
    lines.push('');
  }

  // Calendar section
  if ('totalEvents' in report.calendar) {
    lines.push('📅 *Calendar*');
    lines.push(`   Events: ${report.calendar.totalEvents} | Hours: ${report.calendar.totalHours}h`);
    if (report.calendar.busyDays.length > 0) {
      lines.push(`   Busy days: ${report.calendar.busyDays.join(', ')}`);
    }
    lines.push('');
  }

  // Tasks section
  lines.push('✅ *Tasks*');
  lines.push(`   Created: ${report.tasks.created} | Completed: ${report.tasks.completed}`);
  lines.push(`   Pending: ${report.tasks.pending} | Completion: ${report.tasks.completionRate}%`);
  if (report.tasks.overdue > 0) {
    lines.push(`   ⚠️ Overdue: ${report.tasks.overdue}`);
  }
  lines.push('');

  // Highlights
  if (report.highlights.length > 0) {
    lines.push('🌟 *Highlights*');
    report.highlights.forEach(h => lines.push(`   ${h}`));
    lines.push('');
  }

  // AI Summary
  lines.push('💬 *Summary*');
  lines.push(report.aiSummary);

  return lines.join('\n');
}

/**
 * Compare with previous week
 */
export async function getWeekComparison(userId: number): Promise<{
  thisWeek: WeeklyReport;
  lastWeek: WeeklyReport;
  comparison: {
    emailChange: number;
    eventsChange: number;
    tasksChange: number;
    trend: 'up' | 'down' | 'stable';
  };
}> {
  const [thisWeek, lastWeek] = await Promise.all([
    generateWeeklyReport(userId, 0),
    generateWeeklyReport(userId, 1),
  ]);

  const thisEmails = 'received' in thisWeek.email ? thisWeek.email.received : 0;
  const lastEmails = 'received' in lastWeek.email ? lastWeek.email.received : 0;
  
  const thisEvents = 'totalEvents' in thisWeek.calendar ? thisWeek.calendar.totalEvents : 0;
  const lastEvents = 'totalEvents' in lastWeek.calendar ? lastWeek.calendar.totalEvents : 0;

  const emailChange = lastEmails > 0 ? Math.round(((thisEmails - lastEmails) / lastEmails) * 100) : 0;
  const eventsChange = lastEvents > 0 ? Math.round(((thisEvents - lastEvents) / lastEvents) * 100) : 0;
  const tasksChange = lastWeek.tasks.completed > 0 
    ? Math.round(((thisWeek.tasks.completed - lastWeek.tasks.completed) / lastWeek.tasks.completed) * 100) 
    : 0;

  const avgChange = (emailChange + eventsChange + tasksChange) / 3;
  const trend = avgChange > 10 ? 'up' : avgChange < -10 ? 'down' : 'stable';

  return {
    thisWeek,
    lastWeek,
    comparison: {
      emailChange,
      eventsChange,
      tasksChange,
      trend,
    },
  };
}

