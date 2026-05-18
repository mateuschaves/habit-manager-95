import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo } from 'react';
import { Alert, ScrollView } from 'react-native';
import {
  Win95Button,
  Win95Desktop,
  Win95GroupBox,
  Win95TabPane,
  Win95Tabs,
  Win95Text,
  Win95Window,
} from '@/shared/components/win95';
import { HabitIcon, IconTrash } from '@/shared/components/icons';
import { useHabits } from '@/shared/context/HabitsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { addDays } from '@/shared/utils/date';
import { completionDateSet } from '@/shared/utils/streak';
import { RootStackParamList } from '@/navigation/types';
import { StatBox } from '@/features/habits/components/StatBox';
import {
  Avatar,
  Footer,
  Header,
  HeaderInfo,
  HeatCol,
  HeatDot,
  HeatGrid,
  StatCell,
  StatGrid,
} from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rt = RouteProp<RootStackParamList, 'HabitDetail'>;

export function HabitDetailScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { getHabit, completions, deleteHabit, today } = useHabits();
  const habit = getHabit(route.params.habitId);

  useEffect(() => {
    if (!habit) navigation.goBack();
  }, [habit, navigation]);

  const heat = useMemo(() => {
    if (!habit) return [];
    const set = completionDateSet(
      completions.filter((c) => c.habitId === habit.id)
    );
    // 12 weeks x 7 days ending today.
    const start = addDays(today, -83);
    return Array.from({ length: 12 }).map((_, col) =>
      Array.from({ length: 7 }).map((__, row) =>
        set.has(addDays(start, col * 7 + row))
      )
    );
  }, [habit, completions, today]);

  if (!habit) return null;

  function confirmDelete() {
    Alert.alert(
      t('detail.deleteConfirmTitle'),
      t('detail.deleteConfirm', { name: habit!.name }),
      [
        { text: t('btn.cancel'), style: 'cancel' },
        {
          text: t('btn.delete'),
          style: 'destructive',
          onPress: async () => {
            await deleteHabit(habit!.id);
            navigation.goBack();
          },
        },
      ]
    );
  }

  const freqLabel =
    habit.frequency === 'daily'
      ? t('freq.daily')
      : habit.frequency === 'weekly'
      ? t('freq.weekly')
      : t('freq.custom');

  return (
    <Win95Desktop activeApp={`${habit.name}.exe`}>
      <Win95Window
        title={t('detail.title', { name: habit.name })}
        icon={<HabitIcon iconKey={habit.iconKey} size={14} />}
        controls={['close']}
        onClose={() => navigation.goBack()}
        style={{ flex: 1 }}
        bodyStyle={{ flex: 1 }}
        testID="detail-window"
      >
        <Win95Tabs
          tabs={[
            t('detail.tabGeneral'),
            t('detail.tabStats'),
            t('detail.tabReminders'),
          ]}
          active={1}
          onChange={() => undefined}
        />
        <Win95TabPane style={{ flex: 1 }}>
          <ScrollView style={{ padding: 10 }}>
            <Header>
              <Avatar>
                <HabitIcon iconKey={habit.iconKey} size={32} />
              </Avatar>
              <HeaderInfo>
                <Win95Text variant="title" bold>
                  {habit.name}.exe
                </Win95Text>
                <Win95Text variant="caption">
                  {t('detail.type', { freq: freqLabel })}
                </Win95Text>
                <Win95Text variant="caption">
                  {t('detail.started', {
                    date: habit.createdAt.slice(0, 10),
                  })}
                </Win95Text>
              </HeaderInfo>
            </Header>

            <StatGrid>
              <StatCell>
                <StatBox
                  label={t('detail.currentStreak')}
                  value={habit.stats.currentStreak}
                  unit={t('unit.days')}
                  hot={habit.stats.currentStreak > 0}
                  testID="detail-current-streak"
                />
              </StatCell>
              <StatCell>
                <StatBox
                  label={t('detail.bestStreak')}
                  value={habit.stats.bestStreak}
                  unit={t('unit.days')}
                />
              </StatCell>
              <StatCell>
                <StatBox
                  label={t('detail.totalRuns')}
                  value={habit.stats.totalCompletions}
                  unit={t('detail.unitTimes')}
                />
              </StatCell>
              <StatCell>
                <StatBox
                  label={t('detail.completionRate')}
                  value={habit.stats.completionRate}
                  unit="%"
                />
              </StatCell>
            </StatGrid>

            <Win95GroupBox title={t('detail.consistencyMap')}>
              <HeatGrid>
                {heat.map((col, ci) => (
                  <HeatCol key={ci}>
                    {col.map((on, ri) => (
                      <HeatDot key={ri} $on={on} />
                    ))}
                  </HeatCol>
                ))}
              </HeatGrid>
            </Win95GroupBox>

            <Footer>
              <Win95Button
                label={t('btn.terminate')}
                danger
                icon={<IconTrash size={14} />}
                onPress={confirmDelete}
                style={{ marginRight: 6 }}
                testID="detail-terminate"
              />
              <Win95Button
                label={t('btn.edit')}
                onPress={() =>
                  navigation.navigate('RunDialog', { habitId: habit.id })
                }
                style={{ marginRight: 6 }}
                testID="detail-edit"
              />
              <Win95Button
                label={t('btn.ok')}
                primary
                onPress={() => navigation.goBack()}
                testID="detail-ok"
              />
            </Footer>
          </ScrollView>
        </Win95TabPane>
      </Win95Window>
    </Win95Desktop>
  );
}
