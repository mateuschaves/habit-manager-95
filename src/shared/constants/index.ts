import { TranslationKey } from '@/shared/i18n';
import { Frequency, HabitIconKey } from '@/shared/types/habit';

export const HABIT_ICON_KEYS: HabitIconKey[] = [
  'run',
  'walk',
  'bike',
  'swim',
  'exercise',
  'meditate',
  'pray',
  'sleep',
  'water',
  'food',
  'coffee',
  'pill',
  'heart',
  'sun',
  'phone',
  'pets',
  'plant',
  'book',
  'study',
  'journal',
  'code',
  'music',
  'art',
  'money',
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

export const GOAL_UNIT_KEYS = [
  'cups',
  'minutes',
  'times',
  'pages',
  'km',
  'hours',
] as const;

export type GoalUnitKey = (typeof GOAL_UNIT_KEYS)[number];

export const GOAL_UNIT_LABEL_KEYS: Record<GoalUnitKey, TranslationKey> = {
  cups: 'unit.cups',
  minutes: 'unit.minutes',
  times: 'unit.times',
  pages: 'unit.pages',
  km: 'unit.km',
  hours: 'unit.hours',
};

/** @deprecated Use GOAL_UNIT_KEYS + GOAL_UNIT_LABEL_KEYS. Kept for tests. */
export const GOAL_UNITS = GOAL_UNIT_KEYS as readonly string[];

export const APP_VERSION = '4.51.2026';
export const APP_BUILD = 'Build 0518 — "Não Está Respondendo"';
