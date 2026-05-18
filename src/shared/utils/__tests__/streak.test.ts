import { Completion } from '@/shared/types/habit';
import { sampleHabit } from '@/test/utils';
import {
  buildStats,
  completionDateSet,
  completionRate,
  computeBestStreak,
  computeStreak,
  deriveStatus,
  isDueOn,
} from '../streak';

const TODAY = '2026-05-18'; // Monday

function cmp(habitId: string, dates: string[]): Completion[] {
  return dates.map((date, i) => ({
    id: `c${i}`,
    habitId,
    date,
    createdAt: '',
  }));
}

describe('isDueOn', () => {
  it('daily and weekly are due every day', () => {
    expect(isDueOn(sampleHabit({ frequency: 'daily' }), TODAY)).toBe(true);
    expect(isDueOn(sampleHabit({ frequency: 'weekly' }), TODAY)).toBe(true);
  });

  it('custom is due only on configured weekdays', () => {
    const h = sampleHabit({ frequency: 'custom', days: [1, 3, 5] });
    expect(isDueOn(h, '2026-05-18')).toBe(true); // Mon
    expect(isDueOn(h, '2026-05-19')).toBe(false); // Tue
    expect(isDueOn(h, '2026-05-20')).toBe(true); // Wed
  });
});

describe('computeStreak (daily)', () => {
  const h = sampleHabit();

  it('is 0 with no completions', () => {
    expect(computeStreak(h, completionDateSet([]), TODAY)).toBe(0);
  });

  it('counts consecutive days including today', () => {
    const set = completionDateSet(
      cmp('h1', ['2026-05-18', '2026-05-17', '2026-05-16'])
    );
    expect(computeStreak(h, set, TODAY)).toBe(3);
  });

  it('grants a grace day when today is not yet done', () => {
    const set = completionDateSet(cmp('h1', ['2026-05-17', '2026-05-16']));
    expect(computeStreak(h, set, TODAY)).toBe(2);
  });

  it('breaks on a missed day', () => {
    const set = completionDateSet(cmp('h1', ['2026-05-18', '2026-05-16']));
    expect(computeStreak(h, set, TODAY)).toBe(1);
  });
});

describe('computeBestStreak', () => {
  it('finds the longest run across history', () => {
    const h = sampleHabit();
    const set = completionDateSet(
      cmp('h1', [
        '2026-05-01',
        '2026-05-02',
        '2026-05-03',
        '2026-05-10',
        '2026-05-11',
      ])
    );
    expect(computeBestStreak(h, set, TODAY)).toBe(3);
  });
});

describe('completionRate', () => {
  it('is 100 when every due day in the window is done', () => {
    const h = sampleHabit();
    const dates: string[] = [];
    for (let i = 0; i < 14; i += 1) {
      const d = new Date(2026, 4, 18 - i);
      dates.push(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          '0'
        )}-${String(d.getDate()).padStart(2, '0')}`
      );
    }
    expect(completionRate(h, completionDateSet(cmp('h1', dates)), TODAY)).toBe(
      100
    );
  });

  it('is 0 with no completions', () => {
    expect(
      completionRate(sampleHabit(), completionDateSet([]), TODAY)
    ).toBe(0);
  });
});

describe('deriveStatus', () => {
  it('done when completed today', () => {
    const set = completionDateSet(cmp('h1', [TODAY]));
    expect(deriveStatus(sampleHabit(), set, TODAY)).toBe('done');
  });

  it('pending for a brand new habit with no history', () => {
    expect(deriveStatus(sampleHabit(), completionDateSet([]), TODAY)).toBe(
      'pending'
    );
  });

  it('crashed when a streak existed and the previous due day was missed', () => {
    const set = completionDateSet(cmp('h1', ['2026-05-10']));
    expect(deriveStatus(sampleHabit(), set, TODAY)).toBe('crashed');
  });

  it('paused when archived', () => {
    expect(
      deriveStatus(
        sampleHabit({ archived: true }),
        completionDateSet([]),
        TODAY
      )
    ).toBe('paused');
  });

  it('running when not due today (custom) and not crashed', () => {
    const h = sampleHabit({ frequency: 'custom', days: [3] }); // Wed only
    expect(deriveStatus(h, completionDateSet([]), TODAY)).toBe('running');
  });
});

describe('buildStats', () => {
  it('zeroes energy for crashed habits', () => {
    const stats = buildStats(
      sampleHabit(),
      cmp('h1', ['2026-05-10']),
      TODAY
    );
    expect(stats.status).toBe('crashed');
    expect(stats.energy).toBe(0);
  });

  it('reflects a healthy daily habit', () => {
    const stats = buildStats(
      sampleHabit(),
      cmp('h1', ['2026-05-18', '2026-05-17']),
      TODAY
    );
    expect(stats.status).toBe('done');
    expect(stats.currentStreak).toBe(2);
    expect(stats.completedToday).toBe(true);
  });
});
