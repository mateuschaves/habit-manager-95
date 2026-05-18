import React, { useMemo, useState } from 'react';
import { useTheme } from 'styled-components/native';
import {
  Bezel,
  Win95Button,
  Win95Text,
} from '@/shared/components/win95';
import { IconCheck, IconFolder, IconX } from '@/shared/components/icons';
import { useHabits } from '@/shared/context/HabitsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import {
  MONTHS_EN,
  MONTHS_PT,
  parseISODate,
  toISODate,
} from '@/shared/utils/date';
import { completionDateSet, isDueOn } from '@/shared/utils/streak';
import {
  Day,
  DowCell,
  DowRow,
  Grid,
  Legend,
  LegendItem,
  Marker,
  NavRow,
  Week,
} from './styles';

type DayState = 'ok' | 'partial' | 'fail' | 'none';

const DOW = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function HistoricoScreen() {
  const { t, language } = useTranslation();
  const theme = useTheme();
  const { habits, completions, today } = useHabits();

  const todayDate = parseISODate(today);
  const [cursor, setCursor] = useState({
    year: todayDate.getFullYear(),
    month: todayDate.getMonth(),
  });

  const sets = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    for (const h of habits) {
      map[h.id] = completionDateSet(
        completions.filter((c) => c.habitId === h.id)
      );
    }
    return map;
  }, [habits, completions]);

  function dayState(date: string): DayState {
    const considered = habits.filter(
      (h) => h.createdAt.slice(0, 10) <= date && isDueOn(h, date)
    );
    if (considered.length === 0) return 'none';
    const done = considered.filter((h) => sets[h.id]?.has(date)).length;
    if (done === considered.length) return 'ok';
    if (done > 0) return 'partial';
    return 'fail';
  }

  const months = language === 'en-US' ? MONTHS_EN : MONTHS_PT;
  const first = new Date(cursor.year, cursor.month, 1);
  const startOffset = first.getDay();
  const cells = Array.from({ length: 42 }).map((_, i) => {
    const dayNum = i - startOffset + 1;
    const d = new Date(cursor.year, cursor.month, dayNum);
    return {
      inMonth: d.getMonth() === cursor.month,
      iso: toISODate(d),
      label: d.getDate(),
      future: toISODate(d) > today,
    };
  });

  function shift(delta: number) {
    const m = cursor.month + delta;
    setCursor({
      year: cursor.year + Math.floor(m / 12),
      month: ((m % 12) + 12) % 12,
    });
  }

  const itemCount = habits.length;

  return (
    <>
      <NavRow>
        <Win95Button label="<" onPress={() => shift(-1)} testID="hist-prev" />
        <Win95Text variant="label" style={{ flex: 1, textAlign: 'center' }}>
          {months[cursor.month]} {cursor.year}
        </Win95Text>
        <Win95Button label=">" onPress={() => shift(1)} testID="hist-next" />
      </NavRow>
      <Bezel variant="inset" containerStyle={{ flex: 1 }}>
        <Grid>
          <DowRow>
            {DOW.map((d, i) => (
              <DowCell key={i}>
                <Win95Text variant="caption" bold>
                  {d}
                </Win95Text>
              </DowCell>
            ))}
          </DowRow>
          {Array.from({ length: 6 }).map((_, w) => (
            <Week key={w}>
              {cells.slice(w * 7, w * 7 + 7).map((cell, i) => {
                const isToday = cell.iso === today && cell.inMonth;
                const state =
                  cell.inMonth && !cell.future ? dayState(cell.iso) : 'none';
                return (
                  <Day
                    key={i}
                    $today={isToday}
                    $dim={!cell.inMonth || cell.future}
                    testID={isToday ? 'hist-today' : undefined}
                  >
                    <IconFolder size={12} open={isToday} />
                    <Win95Text variant="caption" mono>
                      {cell.label}
                    </Win95Text>
                    {state === 'ok' && <IconCheck size={8} />}
                    {state === 'partial' && <Marker $color="#fcff00" />}
                    {state === 'fail' && <IconX size={8} />}
                    {state === 'none' && <Marker $color="transparent" />}
                  </Day>
                );
              })}
            </Week>
          ))}
        </Grid>
      </Bezel>
      <Legend>
        <LegendItem>
          <IconCheck size={10} />
          <Win95Text variant="caption" style={{ marginLeft: 3 }}>
            {t('history.legendOk')}
          </Win95Text>
        </LegendItem>
        <LegendItem>
          <Marker $color="#fcff00" />
          <Win95Text variant="caption" style={{ marginLeft: 3 }}>
            {t('history.legendPartial')}
          </Win95Text>
        </LegendItem>
        <LegendItem>
          <IconX size={10} />
          <Win95Text variant="caption" style={{ marginLeft: 3 }}>
            {t('history.legendFail')}
          </Win95Text>
        </LegendItem>
        <Win95Text
          variant="caption"
          style={{ marginLeft: 'auto' }}
          color={theme.colors.textDisabled}
        >
          {t('history.items', { n: itemCount })}
        </Win95Text>
      </Legend>
    </>
  );
}
