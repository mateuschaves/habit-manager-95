import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95ColHeaders,
  Win95Text,
} from '@/shared/components/win95';
import { IconCheck } from '@/shared/components/icons';
import { useHabits } from '@/shared/context/HabitsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { RootStackParamList } from '@/navigation/types';
import { HabitListRow } from '@/features/habits/components/HabitListRow';
import { Empty, Footer, ListWrap, Sep, StatusLine } from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function ProcessosScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { habitsWithStats, toggleCompletion } = useHabits();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo(
    () => habitsWithStats.find((h) => h.id === selectedId) ?? null,
    [habitsWithStats, selectedId]
  );

  const doneCount = habitsWithStats.filter(
    (h) => h.stats.completedToday
  ).length;
  const focus =
    habitsWithStats.length === 0
      ? 0
      : Math.round(
          habitsWithStats.reduce((s, h) => s + h.stats.completionRate, 0) /
            habitsWithStats.length
        );

  if (habitsWithStats.length === 0) {
    return (
      <Empty>
        <Win95Text variant="label">{t('list.empty')}</Win95Text>
        <View style={{ height: 12 }} />
        <Win95Button
          label={t('btn.run')}
          primary
          onPress={() => navigation.navigate('RunDialog')}
          testID="processos-empty-run"
        />
      </Empty>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Win95ColHeaders
        columns={[
          { label: t('col.habit'), flex: 2.4 },
          { label: t('col.status'), flex: 1.5 },
          { label: t('col.streak'), flex: 0.8, align: 'right' },
          { label: t('col.energy'), width: 64, align: 'right' },
        ]}
      />
      <Bezel variant="inset" containerStyle={{ flex: 1 }}>
        <ListWrap>
          <ScrollView>
            {habitsWithStats.map((habit) => (
              <HabitListRow
                key={habit.id}
                habit={habit}
                selected={habit.id === selectedId}
                onPress={() => setSelectedId(habit.id)}
              />
            ))}
          </ScrollView>
        </ListWrap>
      </Bezel>

      <StatusLine>
        <Win95Text variant="caption">
          {t('bar.processes', { n: habitsWithStats.length })}
        </Win95Text>
        <Sep />
        <Win95Text variant="caption">
          {t('bar.focus', { n: focus })}
        </Win95Text>
        <Sep />
        <Win95Text variant="caption">
          {t('bar.memory', { n: doneCount })}
        </Win95Text>
      </StatusLine>

      <Footer>
        <Win95Button
          label={t('btn.details')}
          disabled={!selected}
          onPress={() =>
            selected &&
            navigation.navigate('HabitDetail', { habitId: selected.id })
          }
          style={{ marginRight: 6 }}
          testID="processos-details"
        />
        <Win95Button
          label={t('btn.finishTask')}
          primary
          disabled={!selected}
          icon={<IconCheck size={12} />}
          onPress={() => selected && toggleCompletion(selected.id)}
          testID="processos-finish"
        />
      </Footer>
    </View>
  );
}
