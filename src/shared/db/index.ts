import { MemoryHabitStore } from './memoryStore';
import { SqliteHabitStore } from './sqliteStore';
import { HabitStore } from './types';

/**
 * Opens the SQLite-backed store. Falls back to an in-memory store if
 * SQLite is unavailable (e.g. web / unsupported runtime) so the app
 * stays usable rather than crashing.
 */
export async function createDefaultStore(): Promise<HabitStore> {
  const sqlite = new SqliteHabitStore();
  try {
    await sqlite.init();
    return sqlite;
  } catch {
    const memory = new MemoryHabitStore();
    await memory.init();
    return memory;
  }
}

export { MemoryHabitStore } from './memoryStore';
export { SqliteHabitStore } from './sqliteStore';
export type { HabitStore } from './types';
export { uid } from './types';
