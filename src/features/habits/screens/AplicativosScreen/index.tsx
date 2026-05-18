import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95Text,
} from '@/shared/components/win95';
import {
  HabitIcon,
  IconAlert,
  IconCheck,
  IconRun32,
  IconX,
} from '@/shared/components/icons';
import { useHabits } from '@/shared/context/HabitsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { HabitStatus } from '@/shared/types/habit';
import { formatDisplayDate } from '@/shared/utils/date';
import { RootStackParamList } from '@/navigation/types';
import { AppRow, Footer, IconSlot, Info, ListWrap } from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

function statusLine(
  status: HabitStatus,
  reminder: string | null,
  t: ReturnType<typeof useTranslation>['t']
): string {
  switch (status) {
    case 'done':
      return t('apps.doneAt');
    case 'crashed':
      return t('apps.crashed');
    case 'pending':
      return reminder
        ? t('apps.waiting', { time: reminder })
        : t('apps.waitingNoTime');
    case 'paused':
      return t('apps.paused');
    default:
      return t('apps.running');
  }
}

export function AplicativosScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { habitsWithStats, today, toggleCompletion } = useHabits();

  return (
    <View style={{ flex: 1 }}>
      <Win95Text style={{ marginBottom: 4 }}>
        {t('apps.today', { date: formatDisplayDate(today) })}
      </Win95Text>
      <Bezel variant="inset" containerStyle={{ flex: 1 }}>
        <ListWrap>
          <ScrollView>
            {habitsWithStats.map((habit) => {
              const done = habit.stats.completedToday;
              return (
                <AppRow
                  key={habit.id}
                  onPress={() => toggleCompletion(habit.id)}
                  testID={`apps-row-${habit.id}`}
                >
                  <IconSlot>
                    <HabitIcon iconKey={habit.iconKey} size={32} />
                  </IconSlot>
                  <Info>
                    <Win95Text bold numberOfLines={1}>
                      {habit.name}.exe
                    </Win95Text>
                    <Win95Text variant="caption">
                      {statusLine(habit.stats.status, habit.reminderTime, t)}
                    </Win95Text>
                  </Info>
                  {done ? (
                    <IconCheck size={20} />
                  ) : habit.stats.status === 'crashed' ? (
                    <IconX size={20} />
                  ) : (
                    <IconAlert size={20} />
                  )}
                </AppRow>
              );
            })}
          </ScrollView>
        </ListWrap>
      </Bezel>
      <Footer>
        <Win95Button
          label={t('btn.run')}
          primary
          icon={<IconRun32 size={14} />}
          onPress={() => navigation.navigate('RunDialog')}
          testID="apps-run"
        />
      </Footer>
    </View>
  );
}
