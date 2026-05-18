import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Win95GroupBox, Win95Text } from '@/shared/components/win95';
import { useHabits } from '@/shared/context/HabitsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { PerfGraph } from '@/features/habits/components/PerfGraph';
import {
  aggregateTotals,
  consistencyWeeks,
  focusLast7,
} from '@/features/habits/utils/performance';
import { Empty, Spacer, TotalsRow, Wrap } from './styles';

export function DesempenhoScreen() {
  const { t } = useTranslation();
  const { habits, completions, habitsWithStats, today } = useHabits();

  const weekly = useMemo(
    () => consistencyWeeks(habits, completions, today),
    [habits, completions, today]
  );
  const focus = useMemo(
    () => focusLast7(habits, completions, today),
    [habits, completions, today]
  );
  const totals = useMemo(
    () => aggregateTotals(habitsWithStats),
    [habitsWithStats]
  );

  if (habitsWithStats.length === 0) {
    return (
      <Empty>
        <Win95Text variant="label">{t('perf.none')}</Win95Text>
      </Empty>
    );
  }

  const rows: Array<[string, string]> = [
    [t('perf.avgStreak'), `${totals.avgStreak} ${t('unit.days')}`],
    [
      t('perf.bestStreak'),
      totals.bestActiveName
        ? `${totals.bestActiveName}.exe (${totals.bestActiveStreak}d)`
        : '—',
    ],
    [t('perf.weeklyRate'), `${totals.weeklyRate}%`],
    [t('perf.crashes'), String(totals.crashes)],
    [t('perf.uptime'), String(totals.activeHabits)],
  ];

  return (
    <Wrap>
      <ScrollView>
        <PerfGraph
          label={t('perf.consistency')}
          value={`${totals.weeklyRate}%`}
          data={weekly}
          color="#00ff00"
          testID="perf-consistency"
        />
        <Spacer />
        <PerfGraph
          label={t('perf.focus')}
          value={`${focus[focus.length - 1] ?? 0}%`}
          data={focus}
          color="#00ffff"
          testID="perf-focus"
        />
        <Win95GroupBox title={t('perf.totals')} testID="perf-totals">
          {rows.map(([k, v]) => (
            <TotalsRow key={k}>
              <Win95Text variant="caption">{k}</Win95Text>
              <Win95Text variant="caption" mono>
                {v}
              </Win95Text>
            </TotalsRow>
          ))}
        </Win95GroupBox>
      </ScrollView>
    </Wrap>
  );
}
