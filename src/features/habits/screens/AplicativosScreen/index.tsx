import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95Text,
} from '@/shared/components/win95';
import {
  HabitIcon,
  IconAlert,
  IconCalendar,
  IconCheck,
  IconX,
} from '@/shared/components/icons';
import { useHabits } from '@/shared/context/HabitsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { HabitWithStats } from '@/shared/types/habit';
import { formatDisplayDate } from '@/shared/utils/date';
import { RootStackParamList } from '@/navigation/types';
import {
  Footer,
  GroupHeader,
  IntroRow,
  ListWrap,
  Row,
  RowIcon,
  RowInfo,
  RowMeta,
  RowName,
  RowStatus,
  RunningDot,
} from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type Period = 'morning' | 'afternoon' | 'night' | 'anytime';

function periodOf(reminderTime: string | null): Period {
  if (!reminderTime) return 'anytime';
  const [hh] = reminderTime.split(':').map(Number);
  if (hh >= 5 && hh < 12) return 'morning';
  if (hh >= 12 && hh < 18) return 'afternoon';
  return 'night';
}

interface Group {
  period: Period;
  items: HabitWithStats[];
}

const PERIOD_ORDER: Period[] = ['morning', 'afternoon', 'night', 'anytime'];

function buildGroups(habits: HabitWithStats[]): Group[] {
  const buckets: Record<Period, HabitWithStats[]> = {
    morning: [],
    afternoon: [],
    night: [],
    anytime: [],
  };
  for (const h of habits) buckets[periodOf(h.reminderTime)].push(h);
  for (const p of PERIOD_ORDER) {
    buckets[p].sort((a, b) =>
      (a.reminderTime ?? '99:99').localeCompare(b.reminderTime ?? '99:99')
    );
  }
  return PERIOD_ORDER.filter((p) => buckets[p].length > 0).map((p) => ({
    period: p,
    items: buckets[p],
  }));
}

function statusLine(
  h: HabitWithStats,
  t: ReturnType<typeof useTranslation>['t']
): string {
  switch (h.stats.status) {
    case 'done':
      return t('apps.line.done', { time: h.reminderTime ?? '—' });
    case 'crashed':
      return t('apps.line.crashed', { n: h.stats.bestStreak });
    case 'running':
      return t('apps.line.running');
    case 'pending':
    case 'paused':
    default:
      return h.reminderTime
        ? t('apps.line.pending', { time: h.reminderTime })
        : t('apps.line.pendingNoTime');
  }
}

export function AplicativosScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { habitsWithStats, today, toggleCompletion } = useHabits();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const groups = useMemo(() => buildGroups(habitsWithStats), [habitsWithStats]);

  const doneCount = habitsWithStats.filter((h) => h.stats.completedToday).length;
  const total = habitsWithStats.length;
  const selected = selectedId
    ? habitsWithStats.find((h) => h.id === selectedId) ?? null
    : null;

  function rowTap(habitId: string) {
    // Tap on an already-selected row opens its details; otherwise just select.
    if (selectedId === habitId) {
      navigation.navigate('HabitDetail', { habitId });
    } else {
      setSelectedId(habitId);
    }
  }

  function snooze() {
    if (!selected) return;
    const name = selected.name;
    if (!selected.reminderTime) {
      Alert.alert(t('apps.snoozeTitle'), t('apps.snoozeNoTime', { name }));
      return;
    }
    const [hh, mm] = selected.reminderTime.split(':').map(Number);
    const total = (hh + 1) * 60 + mm;
    const newHh = Math.floor((total % (24 * 60)) / 60);
    const newMm = total % 60;
    const next = `${String(newHh).padStart(2, '0')}:${String(newMm).padStart(2, '0')}`;
    Alert.alert(t('apps.snoozeTitle'), t('apps.snoozeDone', { name, time: next }));
  }

  function skip() {
    if (!selected) return;
    const name = selected.name;
    Alert.alert(
      t('apps.skipTitle', { name }),
      t('apps.skipConfirm', { name }),
      [
        { text: t('btn.cancel'), style: 'cancel' },
        {
          text: t('apps.skip'),
          style: 'destructive',
          onPress: () =>
            Alert.alert(t('apps.skipTitle', { name }), t('apps.skipDone', { name })),
        },
      ]
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <IntroRow>
        <IconCalendar size={14} />
        <View style={{ flex: 1, marginLeft: 6 }}>
          <Win95Text variant="caption">
            {t('apps.routine', {
              date: formatDisplayDate(today),
              done: doneCount,
              total,
            })}
          </Win95Text>
        </View>
        <Win95Button
          label={t('btn.run')}
          onPress={() => navigation.navigate('RunDialog')}
          testID="apps-run"
        />
      </IntroRow>

      <Bezel variant="inset" fill containerStyle={{ flex: 1 }}>
        <ListWrap>
          {groups.length === 0 ? (
            <View style={{ padding: 12, alignItems: 'center' }}>
              <Win95Text variant="caption">{t('apps.empty')}</Win95Text>
            </View>
          ) : (
            <ScrollView>
              {groups.map((g) => (
                <View key={g.period}>
                  <GroupHeader>
                    <Win95Text variant="caption" bold color="#404040">
                      {t(`apps.period.${g.period}` as const).toUpperCase()}
                    </Win95Text>
                  </GroupHeader>
                  {g.items.map((h) => {
                    const isSel = h.id === selected?.id;
                    return (
                      <Row
                        key={h.id}
                        $selected={isSel}
                        onPress={() => rowTap(h.id)}
                        onLongPress={() =>
                          navigation.navigate('HabitDetail', { habitId: h.id })
                        }
                        testID={`apps-row-${h.id}`}
                      >
                        <RowIcon>
                          <HabitIcon iconKey={h.iconKey} size={32} />
                        </RowIcon>
                        <RowInfo>
                          <RowName>
                            <Win95Text
                              bold
                              numberOfLines={1}
                              color={isSel ? '#ffffff' : undefined}
                            >
                              {h.name}.exe
                            </Win95Text>
                            <RowMeta>
                              <Win95Text
                                mono
                                variant="caption"
                                color={isSel ? '#ffffff' : '#5a5a5a'}
                              >
                                {h.reminderTime ?? '—'}
                              </Win95Text>
                            </RowMeta>
                          </RowName>
                          <Win95Text
                            variant="caption"
                            numberOfLines={1}
                            color={isSel ? '#ffffff' : undefined}
                          >
                            {statusLine(h, t)}
                          </Win95Text>
                        </RowInfo>
                        <RowStatus>
                          {h.stats.status === 'done' ? (
                            <IconCheck size={20} />
                          ) : h.stats.status === 'crashed' ? (
                            <IconX size={20} />
                          ) : h.stats.status === 'running' ? (
                            <RunningDot />
                          ) : (
                            <IconAlert size={20} />
                          )}
                        </RowStatus>
                      </Row>
                    );
                  })}
                </View>
              ))}
            </ScrollView>
          )}
        </ListWrap>
      </Bezel>

      <Footer>
        <Win95Button
          label={t('apps.postpone')}
          disabled={!selected || selected.stats.completedToday}
          onPress={snooze}
          style={{ marginRight: 4 }}
          testID="apps-postpone"
        />
        <Win95Button
          label={t('apps.skip')}
          disabled={!selected || selected.stats.completedToday}
          onPress={skip}
          style={{ marginRight: 4 }}
          testID="apps-skip"
        />
        {selected?.stats.completedToday ? (
          <Win95Button
            label={t('apps.undo')}
            onPress={() => toggleCompletion(selected.id)}
            testID="apps-undo"
          />
        ) : (
          <Win95Button
            label={t('apps.completeNow')}
            primary
            icon={<IconCheck size={12} />}
            disabled={!selected || selected.stats.status === 'crashed'}
            onPress={() => selected && toggleCompletion(selected.id)}
            testID="apps-complete"
          />
        )}
      </Footer>
    </View>
  );
}
