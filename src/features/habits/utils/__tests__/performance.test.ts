import { Completion } from '@/shared/types/habit';
import { buildStats } from '@/shared/utils/streak';
import { sampleHabit } from '@/test/utils';
import {
  aggregateTotals,
  consistencyWeeks,
  focusLast7,
} from '../performance';

const TODAY = '2026-05-18';

describe('performance aggregation', () => {
  const habit = sampleHabit();
  const completions: Completion[] = ['2026-05-18', '2026-05-17'].map(
    (date, i) => ({ id: `c${i}`, habitId: 'h1', date, createdAt: '' })
  );

  it('consistencyWeeks returns one value per week', () => {
    const weeks = consistencyWeeks([habit], completions, TODAY, 12);
    expect(weeks).toHaveLength(12);
    weeks.forEach((w) => {
      expect(w).toBeGreaterThanOrEqual(0);
      expect(w).toBeLessThanOrEqual(100);
    });
  });

  it('focusLast7 returns 7 daily values ending today', () => {
    const focus = focusLast7([habit], completions, TODAY);
    expect(focus).toHaveLength(7);
    expect(focus[focus.length - 1]).toBe(100); // completed today
  });

  it('aggregateTotals summarises habit stats', () => {
    const withStats = {
      ...habit,
      stats: buildStats(habit, completions, TODAY),
    };
    const totals = aggregateTotals([withStats]);
    expect(totals.activeHabits).toBe(1);
    expect(totals.bestActiveName).toBe('hidratar');
    expect(totals.crashes).toBe(0);
  });

  it('aggregateTotals handles an empty list', () => {
    const totals = aggregateTotals([]);
    expect(totals).toEqual({
      activeHabits: 0,
      avgStreak: 0,
      bestActiveName: null,
      bestActiveStreak: 0,
      weeklyRate: 0,
      crashes: 0,
    });
  });
});
