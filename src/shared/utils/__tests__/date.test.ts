import {
  addDays,
  diffDays,
  formatClock,
  formatDisplayDate,
  parseISODate,
  toISODate,
  todayISO,
  weekdayOf,
} from '../date';

describe('date utils', () => {
  it('formats and parses ISO dates locally', () => {
    expect(toISODate(new Date(2026, 4, 18))).toBe('2026-05-18');
    expect(toISODate(parseISODate('2026-05-18'))).toBe('2026-05-18');
  });

  it('todayISO derives from a given date', () => {
    expect(todayISO(new Date(2026, 0, 9))).toBe('2026-01-09');
  });

  it.each([
    ['2026-05-18', 1, '2026-05-19'],
    ['2026-05-18', -1, '2026-05-17'],
    ['2026-05-31', 1, '2026-06-01'],
    ['2026-01-01', -1, '2025-12-31'],
  ])('addDays(%s, %s) = %s', (date, delta, expected) => {
    expect(addDays(date, delta)).toBe(expected);
  });

  it('diffDays counts whole days', () => {
    expect(diffDays('2026-05-20', '2026-05-18')).toBe(2);
    expect(diffDays('2026-05-18', '2026-05-20')).toBe(-2);
  });

  it('weekdayOf returns 0=Sun..6=Sat', () => {
    expect(weekdayOf('2026-05-17')).toBe(0); // Sunday
    expect(weekdayOf('2026-05-18')).toBe(1); // Monday
  });

  it('formatClock and formatDisplayDate pad correctly', () => {
    expect(formatClock(new Date(2026, 4, 18, 9, 5))).toBe('09:05');
    expect(formatDisplayDate('2026-05-08')).toBe('08/05/2026');
  });
});
