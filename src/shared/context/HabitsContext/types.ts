import {
  Completion,
  Habit,
  HabitWithStats,
  NewHabitInput,
} from '@/shared/types/habit';

export interface HabitsContextValue {
  loading: boolean;
  habits: Habit[];
  completions: Completion[];
  /** Habits with derived stats (streak, status, energy). */
  habitsWithStats: HabitWithStats[];
  today: string;
  /** A habit whose streak just broke and hasn't been acknowledged. */
  pendingCrash: HabitWithStats | null;
  addHabit: (input: NewHabitInput) => Promise<Habit>;
  updateHabit: (id: string, patch: Partial<NewHabitInput>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleCompletion: (habitId: string, date?: string) => Promise<void>;
  getHabit: (id: string) => HabitWithStats | undefined;
  acknowledgeCrash: () => void;
  refresh: () => Promise<void>;
  clearAll: () => Promise<void>;
}
