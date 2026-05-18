import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createDefaultStore, HabitStore } from '@/shared/db';
import {
  Completion,
  Habit,
  HabitWithStats,
  NewHabitInput,
} from '@/shared/types/habit';
import { todayISO } from '@/shared/utils/date';
import { buildStats } from '@/shared/utils/streak';
import { HabitsContextValue } from './types';

const HabitsContext = createContext<HabitsContextValue | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
  /** Test seam: inject a store (e.g. MemoryHabitStore with seed data). */
  store?: HabitStore;
  /** Test seam: pin "today" so streak math is deterministic. */
  today?: string;
}

export function HabitsProvider({ children, store, today }: ProviderProps) {
  const storeRef = useRef<HabitStore | null>(store ?? null);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set());

  const day = today ?? todayISO();

  const load = useCallback(async () => {
    const s = storeRef.current;
    if (!s) return;
    const [h, c] = await Promise.all([s.getHabits(), s.getCompletions()]);
    setHabits(h);
    setCompletions(c);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (!storeRef.current) {
          storeRef.current = await createDefaultStore();
        } else {
          await storeRef.current.init();
        }
        if (active) await load();
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [load]);

  const habitsWithStats = useMemo<HabitWithStats[]>(() => {
    return habits.map((habit) => {
      const habitCompletions = completions.filter((c) => c.habitId === habit.id);
      return { ...habit, stats: buildStats(habit, habitCompletions, day) };
    });
  }, [habits, completions, day]);

  const pendingCrash = useMemo<HabitWithStats | null>(() => {
    return (
      habitsWithStats.find(
        (h) => h.stats.status === 'crashed' && !acknowledged.has(h.id)
      ) ?? null
    );
  }, [habitsWithStats, acknowledged]);

  const addHabit = useCallback(
    async (input: NewHabitInput) => {
      const habit = await storeRef.current!.createHabit(input);
      await load();
      return habit;
    },
    [load]
  );

  const updateHabit = useCallback(
    async (id: string, patch: Partial<NewHabitInput>) => {
      await storeRef.current!.updateHabit(id, patch);
      await load();
    },
    [load]
  );

  const deleteHabit = useCallback(
    async (id: string) => {
      await storeRef.current!.deleteHabit(id);
      await load();
    },
    [load]
  );

  const toggleCompletion = useCallback(
    async (habitId: string, date?: string) => {
      const target = date ?? day;
      const done = completions.some(
        (c) => c.habitId === habitId && c.date === target
      );
      await storeRef.current!.setCompletion(habitId, target, !done);
      await load();
    },
    [completions, day, load]
  );

  const getHabit = useCallback(
    (id: string) => habitsWithStats.find((h) => h.id === id),
    [habitsWithStats]
  );

  const acknowledgeCrash = useCallback(() => {
    if (pendingCrash) {
      setAcknowledged((prev) => new Set(prev).add(pendingCrash.id));
    }
  }, [pendingCrash]);

  const clearAll = useCallback(async () => {
    await storeRef.current!.clearAll();
    setAcknowledged(new Set());
    await load();
  }, [load]);

  const value = useMemo<HabitsContextValue>(
    () => ({
      loading,
      habits,
      completions,
      habitsWithStats,
      today: day,
      pendingCrash,
      addHabit,
      updateHabit,
      deleteHabit,
      toggleCompletion,
      getHabit,
      acknowledgeCrash,
      refresh: load,
      clearAll,
    }),
    [
      loading,
      habits,
      completions,
      habitsWithStats,
      day,
      pendingCrash,
      addHabit,
      updateHabit,
      deleteHabit,
      toggleCompletion,
      getHabit,
      acknowledgeCrash,
      load,
      clearAll,
    ]
  );

  return (
    <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
  );
}

export function useHabits(): HabitsContextValue {
  const ctx = useContext(HabitsContext);
  if (!ctx) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return ctx;
}

export type { HabitsContextValue } from './types';
