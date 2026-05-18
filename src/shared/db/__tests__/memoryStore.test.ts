import { NewHabitInput } from '@/shared/types/habit';
import { MemoryHabitStore } from '../memoryStore';

const input: NewHabitInput = {
  name: 'correr',
  iconKey: 'run',
  frequency: 'daily',
  weeklyTarget: 3,
  days: [],
  reminderTime: '07:00',
  goalAmount: 5,
  goalUnit: 'km',
  notifyIfLate: true,
};

describe('MemoryHabitStore', () => {
  it('creates and reads habits', async () => {
    const store = new MemoryHabitStore();
    await store.init();
    const habit = await store.createHabit(input);
    expect(habit.id).toBeTruthy();
    expect(await store.getHabits()).toHaveLength(1);
  });

  it('updates a habit', async () => {
    const store = new MemoryHabitStore();
    const habit = await store.createHabit(input);
    const updated = await store.updateHabit(habit.id, { name: 'pedalar' });
    expect(updated.name).toBe('pedalar');
  });

  it('toggles completion idempotently', async () => {
    const store = new MemoryHabitStore();
    const habit = await store.createHabit(input);
    await store.setCompletion(habit.id, '2026-05-18', true);
    await store.setCompletion(habit.id, '2026-05-18', true);
    expect(await store.getCompletions()).toHaveLength(1);
    await store.setCompletion(habit.id, '2026-05-18', false);
    expect(await store.getCompletions()).toHaveLength(0);
  });

  it('deletes a habit and its completions', async () => {
    const store = new MemoryHabitStore();
    const habit = await store.createHabit(input);
    await store.setCompletion(habit.id, '2026-05-18', true);
    await store.deleteHabit(habit.id);
    expect(await store.getHabits()).toHaveLength(0);
    expect(await store.getCompletions()).toHaveLength(0);
  });

  it('seeds from constructor and clears all', async () => {
    const store = new MemoryHabitStore({
      habits: [
        {
          ...input,
          id: 'h1',
          createdAt: '2026-01-01',
          archived: false,
        },
      ],
      completions: [
        { id: 'c1', habitId: 'h1', date: '2026-05-18', createdAt: '' },
      ],
    });
    expect(await store.getHabits()).toHaveLength(1);
    await store.clearAll();
    expect(await store.getHabits()).toHaveLength(0);
    expect(await store.getCompletions()).toHaveLength(0);
  });
});
