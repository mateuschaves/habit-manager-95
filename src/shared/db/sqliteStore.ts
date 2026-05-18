import * as SQLite from 'expo-sqlite';
import {
  Completion,
  Frequency,
  Habit,
  HabitIconKey,
  NewHabitInput,
} from '@/shared/types/habit';
import { HabitStore, uid } from './types';

interface HabitRow {
  id: string;
  name: string;
  icon_key: string;
  frequency: string;
  weekly_target: number;
  days: string;
  reminder_time: string | null;
  goal_amount: number | null;
  goal_unit: string | null;
  notify_if_late: number;
  created_at: string;
  archived: number;
}

interface CompletionRow {
  id: string;
  habit_id: string;
  date: string;
  created_at: string;
}

function rowToHabit(r: HabitRow): Habit {
  return {
    id: r.id,
    name: r.name,
    iconKey: r.icon_key as HabitIconKey,
    frequency: r.frequency as Frequency,
    weeklyTarget: r.weekly_target,
    days: JSON.parse(r.days) as number[],
    reminderTime: r.reminder_time,
    goalAmount: r.goal_amount,
    goalUnit: r.goal_unit,
    notifyIfLate: r.notify_if_late === 1,
    createdAt: r.created_at,
    archived: r.archived === 1,
  };
}

export class SqliteHabitStore implements HabitStore {
  private db: SQLite.SQLiteDatabase | null = null;

  async init(): Promise<void> {
    this.db = await SQLite.openDatabaseAsync('habit-manager-95.db');
    await this.db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS habits (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        icon_key TEXT NOT NULL,
        frequency TEXT NOT NULL,
        weekly_target INTEGER NOT NULL DEFAULT 3,
        days TEXT NOT NULL DEFAULT '[]',
        reminder_time TEXT,
        goal_amount INTEGER,
        goal_unit TEXT,
        notify_if_late INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        archived INTEGER NOT NULL DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS completions (
        id TEXT PRIMARY KEY NOT NULL,
        habit_id TEXT NOT NULL,
        date TEXT NOT NULL,
        created_at TEXT NOT NULL,
        UNIQUE (habit_id, date)
      );
    `);
  }

  private require(): SQLite.SQLiteDatabase {
    if (!this.db) throw new Error('SqliteHabitStore.init() not called');
    return this.db;
  }

  async getHabits(): Promise<Habit[]> {
    const rows = await this.require().getAllAsync<HabitRow>(
      'SELECT * FROM habits ORDER BY created_at ASC'
    );
    return rows.map(rowToHabit);
  }

  async getCompletions(): Promise<Completion[]> {
    const rows = await this.require().getAllAsync<CompletionRow>(
      'SELECT * FROM completions'
    );
    return rows.map((r) => ({
      id: r.id,
      habitId: r.habit_id,
      date: r.date,
      createdAt: r.created_at,
    }));
  }

  async createHabit(input: NewHabitInput): Promise<Habit> {
    const habit: Habit = {
      ...input,
      id: uid('habit'),
      createdAt: new Date().toISOString(),
      archived: false,
    };
    await this.require().runAsync(
      `INSERT INTO habits
        (id, name, icon_key, frequency, weekly_target, days, reminder_time,
         goal_amount, goal_unit, notify_if_late, created_at, archived)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      habit.id,
      habit.name,
      habit.iconKey,
      habit.frequency,
      habit.weeklyTarget,
      JSON.stringify(habit.days),
      habit.reminderTime,
      habit.goalAmount,
      habit.goalUnit,
      habit.notifyIfLate ? 1 : 0,
      habit.createdAt,
      0
    );
    return habit;
  }

  async updateHabit(id: string, patch: Partial<NewHabitInput>): Promise<Habit> {
    const db = this.require();
    const current = await db.getFirstAsync<HabitRow>(
      'SELECT * FROM habits WHERE id = ?',
      id
    );
    if (!current) throw new Error(`Habit ${id} not found`);
    const merged = { ...rowToHabit(current), ...patch };
    await db.runAsync(
      `UPDATE habits SET
        name = ?, icon_key = ?, frequency = ?, weekly_target = ?, days = ?,
        reminder_time = ?, goal_amount = ?, goal_unit = ?, notify_if_late = ?
       WHERE id = ?`,
      merged.name,
      merged.iconKey,
      merged.frequency,
      merged.weeklyTarget,
      JSON.stringify(merged.days),
      merged.reminderTime,
      merged.goalAmount,
      merged.goalUnit,
      merged.notifyIfLate ? 1 : 0,
      id
    );
    return merged;
  }

  async deleteHabit(id: string): Promise<void> {
    const db = this.require();
    await db.runAsync('DELETE FROM completions WHERE habit_id = ?', id);
    await db.runAsync('DELETE FROM habits WHERE id = ?', id);
  }

  async setCompletion(habitId: string, date: string, done: boolean): Promise<void> {
    const db = this.require();
    if (done) {
      await db.runAsync(
        `INSERT OR IGNORE INTO completions (id, habit_id, date, created_at)
         VALUES (?,?,?,?)`,
        uid('cmp'),
        habitId,
        date,
        new Date().toISOString()
      );
    } else {
      await db.runAsync(
        'DELETE FROM completions WHERE habit_id = ? AND date = ?',
        habitId,
        date
      );
    }
  }

  async clearAll(): Promise<void> {
    const db = this.require();
    await db.execAsync('DELETE FROM completions; DELETE FROM habits;');
  }
}
