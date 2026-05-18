import { Completion, Habit, HabitStats, HabitStatus } from '@/shared/types/habit';
import { addDays, diffDays, todayISO, weekdayOf } from './date';

const MAX_LOOKBACK = 3650;

/**
 * Whether the habit is "due" (expected) on a given date.
 *
 * Simplification: `weekly` habits are treated as due every day for the
 * purpose of the streak engine — the weekly target only informs the goal
 * copy, not streak math. This keeps the engine uniform and deterministic.
 */
export function isDueOn(habit: Pick<Habit, 'frequency' | 'days'>, date: string): boolean {
  switch (habit.frequency) {
    case 'daily':
    case 'weekly':
      return true;
    case 'custom':
      return habit.days.includes(weekdayOf(date));
    default:
      return true;
  }
}

export function completionDateSet(completions: Completion[]): Set<string> {
  return new Set(completions.map((c) => c.date));
}

/** Most recent due date strictly before `date`, or null if none within bounds. */
function previousDueDate(habit: Habit, date: string): string | null {
  let cursor = addDays(date, -1);
  for (let i = 0; i < MAX_LOOKBACK; i += 1) {
    if (isDueOn(habit, cursor)) return cursor;
    cursor = addDays(cursor, -1);
  }
  return null;
}

/**
 * Current streak counted in consecutive completed *due* days, ending at
 * today (or yesterday if today is due but not yet completed — a grace day).
 */
export function computeStreak(
  habit: Habit,
  completed: Set<string>,
  today: string = todayISO()
): number {
  let cursor = today;
  if (isDueOn(habit, today) && !completed.has(today)) {
    cursor = addDays(today, -1);
  }

  let streak = 0;
  for (let i = 0; i < MAX_LOOKBACK; i += 1) {
    if (isDueOn(habit, cursor)) {
      if (completed.has(cursor)) {
        streak += 1;
        cursor = addDays(cursor, -1);
      } else {
        break;
      }
    } else {
      cursor = addDays(cursor, -1);
    }
  }
  return streak;
}

export function computeBestStreak(
  habit: Habit,
  completed: Set<string>,
  today: string = todayISO()
): number {
  if (completed.size === 0) return 0;
  const dates = [...completed].sort();
  let cursor = dates[0];
  let best = 0;
  let run = 0;
  for (let i = 0; i < MAX_LOOKBACK && diffDays(today, cursor) >= 0; i += 1) {
    if (isDueOn(habit, cursor)) {
      if (completed.has(cursor)) {
        run += 1;
        best = Math.max(best, run);
      } else {
        run = 0;
      }
    }
    cursor = addDays(cursor, 1);
  }
  return best;
}

/** Adherence over the last `window` due days, as 0–100. */
export function completionRate(
  habit: Habit,
  completed: Set<string>,
  today: string = todayISO(),
  window = 14
): number {
  let cursor = today;
  let dueSeen = 0;
  let done = 0;
  for (let i = 0; i < MAX_LOOKBACK && dueSeen < window; i += 1) {
    if (isDueOn(habit, cursor)) {
      dueSeen += 1;
      if (completed.has(cursor)) done += 1;
    }
    cursor = addDays(cursor, -1);
  }
  if (dueSeen === 0) return 0;
  return Math.round((done / dueSeen) * 100);
}

export function deriveStatus(
  habit: Habit,
  completed: Set<string>,
  today: string = todayISO()
): HabitStatus {
  if (habit.archived) return 'paused';
  if (completed.has(today)) return 'done';

  const prevDue = previousDueDate(habit, today);
  const missedPrevious = prevDue !== null && !completed.has(prevDue);

  if (missedPrevious && completed.size > 0) return 'crashed';
  if (isDueOn(habit, today)) return 'pending';
  return 'running';
}

export function buildStats(
  habit: Habit,
  completions: Completion[],
  today: string = todayISO()
): HabitStats {
  const completed = completionDateSet(completions);
  const status = deriveStatus(habit, completed, today);
  const rate = completionRate(habit, completed, today);
  return {
    currentStreak: computeStreak(habit, completed, today),
    bestStreak: computeBestStreak(habit, completed, today),
    totalCompletions: completed.size,
    completionRate: rate,
    energy: status === 'crashed' ? 0 : rate,
    status,
    completedToday: completed.has(today),
  };
}
