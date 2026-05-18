import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95Checkbox,
  Win95Desktop,
  Win95Input,
  Win95Select,
  Win95Text,
  Win95Window,
} from '@/shared/components/win95';
import { HabitIcon, IconRun32 } from '@/shared/components/icons';
import { useHabits } from '@/shared/context/HabitsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import {
  GOAL_UNIT_KEYS,
  GOAL_UNIT_LABEL_KEYS,
  HABIT_ICON_KEYS,
  REMINDER_TIMES,
} from '@/shared/constants';
import { Frequency, HabitIconKey } from '@/shared/types/habit';
import { RootStackParamList } from '@/navigation/types';
import {
  Center,
  DayToggle,
  DaysRow,
  Field,
  Footer,
  HeaderIcon,
  HeaderRow,
  IconCell,
  IconGrid,
  TwoCol,
} from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rt = RouteProp<RootStackParamList, 'RunDialog'>;

const DOW = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function RunDialogScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const editingId = route.params?.habitId;
  const { addHabit, updateHabit, getHabit } = useHabits();
  const existing = editingId ? getHabit(editingId) : undefined;

  const [name, setName] = useState(existing?.name ?? '');
  const [iconKey, setIconKey] = useState<HabitIconKey>(
    existing?.iconKey ?? 'meditate'
  );
  const [frequency, setFrequency] = useState<Frequency>(
    existing?.frequency ?? 'daily'
  );
  const [days, setDays] = useState<number[]>(existing?.days ?? [1, 3, 5]);
  const [reminder, setReminder] = useState<string>(
    existing?.reminderTime ?? 'none'
  );
  const [goalAmount, setGoalAmount] = useState<string>(
    existing?.goalAmount != null ? String(existing.goalAmount) : ''
  );
  const [goalUnit, setGoalUnit] = useState<string>(
    existing?.goalUnit ?? GOAL_UNIT_KEYS[0]
  );
  const [notifyIfLate, setNotifyIfLate] = useState<boolean>(
    existing?.notifyIfLate ?? true
  );
  const [error, setError] = useState<string | null>(null);

  function toggleDay(i: number) {
    setDays((prev) =>
      prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i].sort()
    );
  }

  async function save() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError(t('run.nameRequired'));
      return;
    }
    const payload = {
      name: trimmed,
      iconKey,
      frequency,
      weeklyTarget: 3,
      days: frequency === 'custom' ? days : [],
      reminderTime: reminder === 'none' ? null : reminder,
      goalAmount: goalAmount ? Number(goalAmount) : null,
      goalUnit: goalAmount ? goalUnit : null,
      notifyIfLate,
    };
    if (editingId) {
      await updateHabit(editingId, payload);
    } else {
      await addHabit(payload);
    }
    navigation.goBack();
  }

  return (
    <Win95Desktop hideTaskbar activeApp="run.exe">
      <Center>
        <Win95Window
          title={
            editingId
              ? t('run.editTitle', { name: existing?.name ?? '' })
              : t('run.title')
          }
          icon={<IconRun32 size={14} />}
          controls={['close']}
          onClose={() => navigation.goBack()}
          testID="run-window"
        >
          <ScrollView style={{ maxHeight: 520 }}>
            <HeaderRow>
              <HeaderIcon>
                <IconRun32 size={42} />
              </HeaderIcon>
              <Win95Text variant="caption" style={{ flex: 1 }}>
                {t('run.desc')}
              </Win95Text>
            </HeaderRow>

            <Field>
              <Win95Input
                label={t('run.open')}
                value={name}
                onChangeText={(v) => {
                  setName(v);
                  if (error) setError(null);
                }}
                placeholder={t('run.namePlaceholder')}
                error={error}
                autoFocus={!editingId}
                suffix={<Win95Text variant="caption">.exe</Win95Text>}
                testID="run-name"
              />
            </Field>

            <Field>
              <Win95Text style={{ marginBottom: 2 }}>
                {t('field.icon')}
              </Win95Text>
              <Bezel variant="inset">
                <IconGrid>
                  {HABIT_ICON_KEYS.map((key) => (
                    <IconCell
                      key={key}
                      $selected={key === iconKey}
                      onPress={() => setIconKey(key)}
                      testID={`run-icon-${key}`}
                    >
                      <HabitIcon iconKey={key} size={18} />
                    </IconCell>
                  ))}
                </IconGrid>
              </Bezel>
            </Field>

            <TwoCol>
              <Field style={{ flex: 1, marginRight: 8 }}>
                <Win95Text style={{ marginBottom: 2 }}>
                  {t('field.frequency')}
                </Win95Text>
                <Win95Select
                  value={frequency}
                  onChange={(v) => setFrequency(v as Frequency)}
                  options={[
                    { value: 'daily', label: t('freq.daily') },
                    { value: 'weekly', label: t('freq.weekly') },
                    { value: 'custom', label: t('freq.custom') },
                  ]}
                  testID="run-frequency"
                />
              </Field>
              <Field style={{ flex: 1 }}>
                <Win95Text style={{ marginBottom: 2 }}>
                  {t('field.reminder')}
                </Win95Text>
                <Win95Select
                  value={reminder}
                  onChange={setReminder}
                  options={[
                    { value: 'none', label: t('reminder.none') },
                    ...REMINDER_TIMES.map((r) => ({ value: r, label: r })),
                  ]}
                  testID="run-reminder"
                />
              </Field>
            </TwoCol>

            {frequency === 'custom' ? (
              <Field>
                <DaysRow>
                  {DOW.map((d, i) => (
                    <Bezel
                      key={i}
                      variant={days.includes(i) ? 'pressed' : 'raised'}
                    >
                      <DayToggle
                        onPress={() => toggleDay(i)}
                        testID={`run-day-${i}`}
                      >
                        <Win95Text variant="caption">{d}</Win95Text>
                      </DayToggle>
                    </Bezel>
                  ))}
                </DaysRow>
              </Field>
            ) : null}

            <TwoCol>
              <Field style={{ flex: 1, marginRight: 8 }}>
                <Win95Input
                  label={t('field.goal')}
                  value={goalAmount}
                  onChangeText={setGoalAmount}
                  keyboardType="numeric"
                  placeholder="8"
                  testID="run-goal-amount"
                />
              </Field>
              <Field style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Win95Select
                  value={goalUnit}
                  onChange={setGoalUnit}
                  options={GOAL_UNIT_KEYS.map((k) => ({
                    value: k,
                    label: t(GOAL_UNIT_LABEL_KEYS[k]),
                  }))}
                  testID="run-goal-unit"
                />
              </Field>
            </TwoCol>

            <Field>
              <Win95Checkbox
                checked={notifyIfLate}
                onToggle={setNotifyIfLate}
                label={t('field.notifyLate')}
                testID="run-notify"
              />
            </Field>

            <Footer>
              <Win95Button
                label={t('btn.ok')}
                primary
                onPress={save}
                style={{ marginRight: 6 }}
                testID="run-ok"
              />
              <Win95Button
                label={t('btn.cancel')}
                onPress={() => navigation.goBack()}
                testID="run-cancel"
              />
            </Footer>
          </ScrollView>
        </Win95Window>
      </Center>
    </Win95Desktop>
  );
}
