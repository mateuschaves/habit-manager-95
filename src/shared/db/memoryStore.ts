import { Completion, Habit, NewHabitInput } from '@/shared/types/habit';
import { HabitStore, uid } from './types';

/**
 * Pure in-memory store. Used as a fallback when SQLite is unavailable
 * (web / tests) and as the seam that makes the data layer testable
 * without mocking native modules.
 */
export class MemoryHabitStore implements HabitStore {
  private habits: Habit[] = [];
  private completions: Completion[] = [];

  constructor(seed?: { habits?: Habit[]; completions?: Completion[] }) {
    this.habits = seed?.habits ? [...seed.habits] : [];
    this.completions = seed?.completions ? [...seed.completions] : [];
  }

  async init(): Promise<void> {}

  async getHabits(): Promise<Habit[]> {
    return this.habits.map((h) => ({ ...h }));
  }

  async getCompletions(): Promise<Completion[]> {
    return this.completions.map((c) => ({ ...c }));
  }

  async createHabit(input: NewHabitInput): Promise<Habit> {
    const habit: Habit = {
      ...input,
      id: uid('habit'),
      createdAt: new Date().toISOString(),
      archived: false,
    };
    this.habits.push(habit);
    return { ...habit };
  }

  async updateHabit(id: string, patch: Partial<NewHabitInput>): Promise<Habit> {
    const idx = this.habits.findIndex((h) => h.id === id);
    if (idx === -1) throw new Error(`Habit ${id} not found`);
    this.habits[idx] = { ...this.habits[idx], ...patch };
    return { ...this.habits[idx] };
  }

  async deleteHabit(id: string): Promise<void> {
    this.habits = this.habits.filter((h) => h.id !== id);
    this.completions = this.completions.filter((c) => c.habitId !== id);
  }

  async setCompletion(habitId: string, date: string, done: boolean): Promise<void> {
    const exists = this.completions.some(
      (c) => c.habitId === habitId && c.date === date
    );
    if (done && !exists) {
      this.completions.push({
        id: uid('cmp'),
        habitId,
        date,
        createdAt: new Date().toISOString(),
      });
    } else if (!done && exists) {
      this.completions = this.completions.filter(
        (c) => !(c.habitId === habitId && c.date === date)
      );
    }
  }

  async clearAll(): Promise<void> {
    this.habits = [];
    this.completions = [];
  }
}
