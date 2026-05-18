import { Completion, Habit, NewHabitInput } from '@/shared/types/habit';

export interface HabitStore {
  init(): Promise<void>;
  getHabits(): Promise<Habit[]>;
  getCompletions(): Promise<Completion[]>;
  createHabit(input: NewHabitInput): Promise<Habit>;
  updateHabit(id: string, patch: Partial<NewHabitInput>): Promise<Habit>;
  deleteHabit(id: string): Promise<void>;
  /** Toggle a single day's completion for a habit. */
  setCompletion(habitId: string, date: string, done: boolean): Promise<void>;
  clearAll(): Promise<void>;
}

let counter = 0;
export function uid(prefix = 'id'): string {
  counter += 1;
  return `${prefix}_${Date.now().toString(36)}_${counter.toString(36)}_${Math.floor(
    Math.random() * 1e6
  ).toString(36)}`;
}
