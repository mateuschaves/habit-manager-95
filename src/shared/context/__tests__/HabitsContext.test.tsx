import { act, renderHook, waitFor } from '@testing-library/react-native';
import React from 'react';
import { MemoryHabitStore } from '@/shared/db';
import { sampleHabit } from '@/test/utils';
import { HabitsProvider, useHabits } from '../HabitsContext';

const TODAY = '2026-05-18';

function makeWrapper(store: MemoryHabitStore) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <HabitsProvider store={store} today={TODAY}>
        {children}
      </HabitsProvider>
    );
  };
}

describe('HabitsContext', () => {
  it('loads habits and derives stats', async () => {
    const store = new MemoryHabitStore({
      habits: [sampleHabit()],
      completions: [
        { id: 'c1', habitId: 'h1', date: TODAY, createdAt: '' },
      ],
    });
    const { result } = renderHook(() => useHabits(), {
      wrapper: makeWrapper(store),
    });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.habitsWithStats).toHaveLength(1);
    expect(result.current.habitsWithStats[0].stats.status).toBe('done');
  });

  it('adds and toggles completion for a habit', async () => {
    const store = new MemoryHabitStore();
    const { result } = renderHook(() => useHabits(), {
      wrapper: makeWrapper(store),
    });
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addHabit({
        name: 'correr',
        iconKey: 'run',
        frequency: 'daily',
        weeklyTarget: 3,
        days: [],
        reminderTime: null,
        goalAmount: null,
        goalUnit: null,
        notifyIfLate: true,
      });
    });
    expect(result.current.habits).toHaveLength(1);

    const id = result.current.habits[0].id;
    await act(async () => {
      await result.current.toggleCompletion(id);
    });
    expect(result.current.getHabit(id)?.stats.completedToday).toBe(true);
  });

  it('surfaces and acknowledges a pending crash', async () => {
    const store = new MemoryHabitStore({
      habits: [sampleHabit()],
      completions: [
        { id: 'c1', habitId: 'h1', date: '2026-05-10', createdAt: '' },
      ],
    });
    const { result } = renderHook(() => useHabits(), {
      wrapper: makeWrapper(store),
    });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.pendingCrash?.id).toBe('h1');

    act(() => result.current.acknowledgeCrash());
    await waitFor(() => expect(result.current.pendingCrash).toBeNull());
  });
});
