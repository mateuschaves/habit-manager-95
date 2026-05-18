import { Completion, Habit, HabitWithStats } from '@/shared/types/habit';
import { addDays, todayISO } from '@/shared/utils/date';
import { completionDateSet, isDueOn } from '@/shared/utils/streak';

/** Completion ratio (0–100) over a date window across all habits. */
function ratioInWindow(
  habits: Habit[],
  completions: Completion[],
  start: string,
  days: number
): number {
  let due = 0;
  let done = 0;
  for (const habit of habits) {
    const set = completionDateSet(
      completions.filter((c) => c.habitId === habit.id)
    );
    for (let i = 0; i < days; i += 1) {
      const date = addDays(start, i);
      if (isDueOn(habit, date)) {
        due += 1;
        if (set.has(date)) done += 1;
      }
    }
  }
  return due === 0 ? 0 : Math.round((done / due) * 100);
}

export function consistencyWeeks(
  habits: Habit[],
  completions: Completion[],
  today: string = todayISO(),
  weeks = 12
): number[] {
  const out: number[] = [];
  for (let w = weeks - 1; w >= 0; w -= 1) {
    const start = addDays(today, -(w + 1) * 7 + 1);
    out.push(ratioInWindow(habits, completions, start, 7));
  }
  return out;
}

export function focusLast7(
  habits: Habit[],
  completions: Completion[],
  today: string = todayISO()
): number[] {
  const out: number[] = [];
  for (let d = 6; d >= 0; d -= 1) {
    const date = addDays(today, -d);
    out.push(ratioInWindow(habits, completions, date, 1));
  }
  return out;
}

export interface PerformanceTotals {
  activeHabits: number;
  avgStreak: number;
  bestActiveName: string | null;
  bestActiveStreak: number;
  weeklyRate: number;
  crashes: number;
}

export function aggregateTotals(
  habits: HabitWithStats[]
): PerformanceTotals {
  if (habits.length === 0) {
    return {
      activeHabits: 0,
      avgStreak: 0,
      bestActiveName: null,
      bestActiveStreak: 0,
      weeklyRate: 0,
      crashes: 0,
    };
  }
  const best = habits.reduce((a, b) =>
    b.stats.currentStreak > a.stats.currentStreak ? b : a
  );
  const avgStreak =
    habits.reduce((s, h) => s + h.stats.currentStreak, 0) / habits.length;
  const weeklyRate =
    habits.reduce((s, h) => s + h.stats.completionRate, 0) / habits.length;
  return {
    activeHabits: habits.length,
    avgStreak: Math.round(avgStreak * 10) / 10,
    bestActiveName: best.name,
    bestActiveStreak: best.stats.currentStreak,
    weeklyRate: Math.round(weeklyRate),
    crashes: habits.filter((h) => h.stats.status === 'crashed').length,
  };
}
