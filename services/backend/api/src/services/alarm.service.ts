// src/services/alarm.service.ts
// In-memory alarm system (can be enhanced with database later)

export interface Alarm {
  id: string;
  userId: number;
  title: string;
  description?: string;
  time: string; // ISO datetime or HH:MM format
  repeat: 'none' | 'daily' | 'weekly' | 'weekdays' | 'weekends' | 'custom';
  repeatDays?: number[]; // 0-6 for Sunday-Saturday
  isActive: boolean;
  snoozeMinutes?: number;
  sound?: string;
  createdAt: string;
  lastTriggered?: string;
}

export interface CreateAlarmInput {
  title: string;
  description?: string;
  time: string;
  repeat?: Alarm['repeat'];
  repeatDays?: number[];
  sound?: string;
}

// In-memory storage (replace with database in production)
const alarms: Map<string, Alarm> = new Map();
let alarmIdCounter = 1;

/**
 * Generate unique alarm ID
 */
function generateAlarmId(): string {
  return `alarm_${Date.now()}_${alarmIdCounter++}`;
}

/**
 * Create a new alarm
 */
export function createAlarm(userId: number, input: CreateAlarmInput): Alarm {
  const alarm: Alarm = {
    id: generateAlarmId(),
    userId,
    title: input.title,
    description: input.description,
    time: input.time,
    repeat: input.repeat || 'none',
    repeatDays: input.repeatDays,
    isActive: true,
    sound: input.sound || 'default',
    createdAt: new Date().toISOString(),
  };
  
  alarms.set(alarm.id, alarm);
  return alarm;
}

/**
 * Get all alarms for a user
 */
export function getUserAlarms(userId: number): Alarm[] {
  return Array.from(alarms.values())
    .filter(a => a.userId === userId)
    .sort((a, b) => a.time.localeCompare(b.time));
}

/**
 * Get active alarms for a user
 */
export function getActiveAlarms(userId: number): Alarm[] {
  return getUserAlarms(userId).filter(a => a.isActive);
}

/**
 * Get single alarm by ID
 */
export function getAlarm(alarmId: string, userId: number): Alarm | null {
  const alarm = alarms.get(alarmId);
  if (!alarm || alarm.userId !== userId) return null;
  return alarm;
}

/**
 * Update an alarm
 */
export function updateAlarm(
  alarmId: string,
  userId: number,
  updates: Partial<CreateAlarmInput> & { isActive?: boolean }
): Alarm | null {
  const alarm = getAlarm(alarmId, userId);
  if (!alarm) return null;
  
  const updated: Alarm = {
    ...alarm,
    title: updates.title ?? alarm.title,
    description: updates.description ?? alarm.description,
    time: updates.time ?? alarm.time,
    repeat: updates.repeat ?? alarm.repeat,
    repeatDays: updates.repeatDays ?? alarm.repeatDays,
    isActive: updates.isActive ?? alarm.isActive,
    sound: updates.sound ?? alarm.sound,
  };
  
  alarms.set(alarmId, updated);
  return updated;
}

/**
 * Delete an alarm
 */
export function deleteAlarm(alarmId: string, userId: number): boolean {
  const alarm = getAlarm(alarmId, userId);
  if (!alarm) return false;
  
  alarms.delete(alarmId);
  return true;
}

/**
 * Toggle alarm active state
 */
export function toggleAlarm(alarmId: string, userId: number): Alarm | null {
  const alarm = getAlarm(alarmId, userId);
  if (!alarm) return null;
  
  alarm.isActive = !alarm.isActive;
  alarms.set(alarmId, alarm);
  return alarm;
}

/**
 * Snooze an alarm
 */
export function snoozeAlarm(alarmId: string, userId: number, minutes: number = 5): Alarm | null {
  const alarm = getAlarm(alarmId, userId);
  if (!alarm) return null;
  
  const now = new Date();
  const snoozeTime = new Date(now.getTime() + minutes * 60 * 1000);
  
  alarm.snoozeMinutes = minutes;
  alarm.time = snoozeTime.toISOString();
  alarms.set(alarmId, alarm);
  
  return alarm;
}

/**
 * Get upcoming alarms (next N hours)
 */
export function getUpcomingAlarms(userId: number, hours: number = 24): Alarm[] {
  const now = new Date();
  const cutoff = new Date(now.getTime() + hours * 60 * 60 * 1000);
  
  return getActiveAlarms(userId).filter(alarm => {
    const alarmTime = new Date(alarm.time);
    return alarmTime >= now && alarmTime <= cutoff;
  });
}

/**
 * Check if alarm should trigger now
 */
export function shouldTrigger(alarm: Alarm): boolean {
  if (!alarm.isActive) return false;
  
  const now = new Date();
  const alarmTime = new Date(alarm.time);
  
  // Check if within 1 minute window
  const diff = Math.abs(now.getTime() - alarmTime.getTime());
  return diff < 60000; // 1 minute
}

/**
 * Get alarms that should trigger now
 */
export function getTriggeredAlarms(userId: number): Alarm[] {
  return getActiveAlarms(userId).filter(shouldTrigger);
}

/**
 * Mark alarm as triggered
 */
export function markTriggered(alarmId: string, userId: number): Alarm | null {
  const alarm = getAlarm(alarmId, userId);
  if (!alarm) return null;
  
  alarm.lastTriggered = new Date().toISOString();
  
  // If non-repeating, deactivate
  if (alarm.repeat === 'none') {
    alarm.isActive = false;
  } else {
    // Calculate next trigger time based on repeat
    const next = calculateNextTrigger(alarm);
    if (next) {
      alarm.time = next.toISOString();
    }
  }
  
  alarms.set(alarmId, alarm);
  return alarm;
}

/**
 * Calculate next trigger time for repeating alarms
 */
function calculateNextTrigger(alarm: Alarm): Date | null {
  const current = new Date(alarm.time);
  const now = new Date();
  
  switch (alarm.repeat) {
    case 'daily':
      current.setDate(current.getDate() + 1);
      break;
      
    case 'weekly':
      current.setDate(current.getDate() + 7);
      break;
      
    case 'weekdays':
      do {
        current.setDate(current.getDate() + 1);
      } while (current.getDay() === 0 || current.getDay() === 6);
      break;
      
    case 'weekends':
      do {
        current.setDate(current.getDate() + 1);
      } while (current.getDay() !== 0 && current.getDay() !== 6);
      break;
      
    case 'custom':
      if (alarm.repeatDays && alarm.repeatDays.length > 0) {
        do {
          current.setDate(current.getDate() + 1);
        } while (!alarm.repeatDays.includes(current.getDay()));
      }
      break;
      
    default:
      return null;
  }
  
  return current;
}

/**
 * Get alarm stats
 */
export function getAlarmStats(userId: number): {
  total: number;
  active: number;
  inactive: number;
  upcoming: number;
} {
  const userAlarms = getUserAlarms(userId);
  const active = userAlarms.filter(a => a.isActive);
  const upcoming = getUpcomingAlarms(userId, 24);
  
  return {
    total: userAlarms.length,
    active: active.length,
    inactive: userAlarms.length - active.length,
    upcoming: upcoming.length,
  };
}

