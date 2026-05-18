import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Habit } from '@/shared/types/habit';

const CHANNEL_ID = 'habit-reminders';

let configured = false;

/** Idempotent — sets the foreground handler + Android channel. */
export async function configureNotifications(): Promise<void> {
  if (configured) return;
  configured = true;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Lembretes de hábitos',
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: 'default',
    });
  }
}

/** Returns true when permission is granted. Safe to call multiple times. */
export async function ensurePermissions(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

function parseTime(value: string): [number, number] | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!m) return null;
  const h = Number(m[1]);
  const mn = Number(m[2]);
  if (h < 0 || h > 23 || mn < 0 || mn > 59) return null;
  return [h, mn];
}

function dailyId(habitId: string): string {
  return `habit:${habitId}:daily`;
}

function weeklyId(habitId: string, weekday: number): string {
  return `habit:${habitId}:w${weekday}`;
}

function lateId(habitId: string): string {
  return `habit:${habitId}:late`;
}

const HABIT_PREFIX = 'habit:';

function buildContent(habit: Habit): Notifications.NotificationContentInput {
  return {
    title: `${habit.name}.exe`,
    body: 'Está na hora de executar.',
    data: { habitId: habit.id, kind: 'reminder' },
    sound: 'default',
  };
}

async function safeCancel(id: string): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch {
    // Identifier may not exist — ignore.
  }
}

/** Removes any previously-scheduled notifications for this habit. */
export async function cancelHabitReminder(habitId: string): Promise<void> {
  await safeCancel(dailyId(habitId));
  await safeCancel(lateId(habitId));
  // Cancel every weekday id (Expo weekdays are 1..7).
  for (let w = 1; w <= 7; w++) {
    await safeCancel(weeklyId(habitId, w));
  }
}

/**
 * Schedules reminder(s) for a single habit. Replaces any prior schedule.
 * - daily: one repeating notification at habit.reminderTime
 * - custom: one weekly notification per selected weekday
 * - weekly: one weekly notification on Monday (placeholder)
 */
export async function scheduleHabitReminder(habit: Habit): Promise<void> {
  await cancelHabitReminder(habit.id);
  if (habit.archived) return;
  if (!habit.reminderTime) return;

  const parsed = parseTime(habit.reminderTime);
  if (!parsed) return;
  const [hour, minute] = parsed;
  const content = buildContent(habit);

  if (habit.frequency === 'daily') {
    await Notifications.scheduleNotificationAsync({
      identifier: dailyId(habit.id),
      content,
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
    return;
  }

  if (habit.frequency === 'custom' && habit.days.length > 0) {
    // Expo weekday: 1 = Sunday … 7 = Saturday.
    for (const dow of habit.days) {
      const weekday = dow + 1;
      await Notifications.scheduleNotificationAsync({
        identifier: weeklyId(habit.id, weekday),
        content,
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
          weekday,
          hour,
          minute,
        },
      });
    }
    return;
  }

  if (habit.frequency === 'weekly') {
    await Notifications.scheduleNotificationAsync({
      identifier: weeklyId(habit.id, 2), // Monday
      content,
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday: 2,
        hour,
        minute,
      },
    });
  }
}

/**
 * Cancels EVERY scheduled notification and re-creates them from current
 * habits. This is the single source of truth — used at boot, after every
 * mutation (add/update/delete), and after restore/reset.
 *
 * Nuclear by design: cancels all scheduled notifications regardless of
 * identifier so stale schedules from older builds, prefix mismatches, or
 * race-condition double-schedules can never survive a sync.
 */
export async function syncAllHabits(habits: Habit[]): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    // Fall back to per-id cancel if the bulk API fails for any reason.
    const all = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(all.map((n) => safeCancel(n.identifier)));
  }
  for (const habit of habits) {
    await scheduleHabitReminder(habit);
  }
}

/** Cancels every habit-owned notification (used by clearAll / reset). */
export async function cancelAllHabitReminders(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    const all = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(all.map((n) => safeCancel(n.identifier)));
  }
}
