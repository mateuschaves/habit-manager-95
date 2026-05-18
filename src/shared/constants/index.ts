import { Frequency, HabitIconKey } from '@/shared/types/habit';

export const HABIT_ICON_KEYS: HabitIconKey[] = [
  'run',
  'book',
  'water',
  'meditate',
  'sleep',
  'exercise',
  'food',
  'study',
];

export const FREQUENCIES: Frequency[] = ['daily', 'weekly', 'custom'];

export const WEEKDAY_KEYS = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
] as const;

/** Reminder time options offered in the dropdowns. */
export const REMINDER_TIMES: string[] = (() => {
  const out: string[] = [];
  for (let h = 5; h <= 23; h += 1) {
    out.push(`${String(h).padStart(2, '0')}:00`);
    out.push(`${String(h).padStart(2, '0')}:30`);
  }
  return out;
})();

export const GOAL_UNITS = ['copos', 'min', 'vezes', 'páginas', 'km', 'h'];

export const APP_VERSION = '4.51.2026';
export const APP_BUILD = 'Build 0518 — "Não Está Respondendo"';
