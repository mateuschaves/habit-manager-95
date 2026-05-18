export type HabitIconKey =
  | 'run'
  | 'book'
  | 'water'
  | 'meditate'
  | 'sleep'
  | 'exercise'
  | 'food'
  | 'study'
  | 'code'
  | 'music'
  | 'art'
  | 'money'
  | 'pets'
  | 'plant'
  | 'bike'
  | 'swim'
  | 'coffee'
  | 'pill'
  | 'heart'
  | 'pray'
  | 'walk'
  | 'journal'
  | 'sun'
  | 'phone'
  | 'exe';

export type Frequency = 'daily' | 'weekly' | 'custom';

/** Status shown in the Task Manager process list. */
export type HabitStatus = 'done' | 'running' | 'pending' | 'crashed' | 'paused';

export interface Habit {
  id: string;
  /** Base process name, without the ".exe" suffix. */
  name: string;
  iconKey: HabitIconKey;
  frequency: Frequency;
  /** For 'weekly': how many times per week. */
  weeklyTarget: number;
  /** For 'custom': weekday indices 0=Sun … 6=Sat. */
  days: number[];
  /** "HH:MM" local reminder, or null. */
  reminderTime: string | null;
  goalAmount: number | null;
  goalUnit: string | null;
  notifyIfLate: boolean;
  createdAt: string;
  archived: boolean;
}

export interface Completion {
  id: string;
  habitId: string;
  /** "YYYY-MM-DD" local date. */
  date: string;
  createdAt: string;
}

export interface HabitStats {
  currentStreak: number;
  bestStreak: number;
  totalCompletions: number;
  /** 0–100, last-14-due-days adherence. */
  completionRate: number;
  /** 0–100 "energy" bar value. */
  energy: number;
  status: HabitStatus;
  completedToday: boolean;
}

export interface HabitWithStats extends Habit {
  stats: HabitStats;
}

export type NewHabitInput = Omit<Habit, 'id' | 'createdAt' | 'archived'>;
