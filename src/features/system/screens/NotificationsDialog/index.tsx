import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95Checkbox,
  Win95DialogShell,
  Win95GroupBox,
  Win95Radio,
  Win95Select,
  Win95Text,
} from '@/shared/components/win95';
import { HabitIcon, IconBell, IconInfo } from '@/shared/components/icons';
import { useHabits } from '@/shared/context/HabitsContext';
import { useSettings } from '@/shared/context/SettingsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Win95Tabs, Win95TabPane } from '@/shared/components/win95';
import {
  DndRow,
  Footer,
  HabitName,
  HabitRow,
  List,
  ScheduleGrid,
  SchedulePill,
} from './styles';

type Priority = 'low' | 'normal' | 'crit';
type SoundScheme = 'classic' | 'amiga' | 'silent';

export function NotificationsDialog() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { habits, updateHabit } = useHabits();
  const { notifyLate, setNotifyLate } = useSettings();

  const [tab, setTab] = useState(0);
  const initialEnabled = useMemo(
    () => Object.fromEntries(habits.map((h) => [h.id, h.notifyIfLate])),
    [habits]
  );
  const [enabled, setEnabled] = useState<Record<string, boolean>>(initialEnabled);
  const [globalNotify, setGlobalNotify] = useState(notifyLate);
  const [activeId, setActiveId] = useState<string | null>(habits[0]?.id ?? null);
  const [repeat, setRepeat] = useState('2');
  const [unit, setUnit] = useState('horas');
  const [persistence, setPersistence] = useState('insist');
  const [priority, setPriority] = useState<Priority>('normal');
  const [lockscreen, setLockscreen] = useState(true);
  const [soundScheme, setSoundScheme] = useState<SoundScheme>('classic');
  const [soundEvent, setSoundEvent] = useState('complete');

  const active = habits.find((h) => h.id === activeId) ?? habits[0];

  function showDnd() {
    Alert.alert(t('cfg.notif.dndTitle'), t('cfg.notif.dndBody'));
  }

  async function applyAndStay() {
    setNotifyLate(globalNotify);
    const tasks: Promise<void>[] = [];
    for (const h of habits) {
      const desired = enabled[h.id];
      if (desired !== undefined && desired !== h.notifyIfLate) {
        tasks.push(updateHabit(h.id, { notifyIfLate: desired }));
      }
    }
    await Promise.all(tasks);
    Alert.alert(t('cfg.notif.title'), t('cfg.notif.applied'));
  }

  async function applyAndClose() {
    setNotifyLate(globalNotify);
    const tasks: Promise<void>[] = [];
    for (const h of habits) {
      const desired = enabled[h.id];
      if (desired !== undefined && desired !== h.notifyIfLate) {
        tasks.push(updateHabit(h.id, { notifyIfLate: desired }));
      }
    }
    await Promise.all(tasks);
    navigation.goBack();
  }

  return (
    <Win95DialogShell
      title={t('cfg.notif.title')}
      icon={<IconBell size={14} />}
      testID="dialog-notif"
    >
      <Win95Tabs tabs={[
        t('cfg.notif.tab.general'),
        t('cfg.notif.tab.perHabit'),
        t('cfg.notif.tab.sounds'),
      ]} active={tab} onChange={setTab} />

      <Win95TabPane>
        {tab === 0 && (
          <View>
            <Win95Text variant="caption" style={{ marginBottom: 6 }}>
              {t('cfg.notif.intro')}
            </Win95Text>
            <Win95GroupBox title={t('cfg.notif.tab.general')}>
              <Win95Checkbox
                checked={globalNotify}
                onToggle={setGlobalNotify}
                label={t('cfg.notif.global')}
                testID="notif-global"
              />
              <View style={{ marginTop: 6 }}>
                <Win95Checkbox
                  checked={lockscreen}
                  onToggle={setLockscreen}
                  label={t('cfg.notif.lockscreen')}
                />
              </View>
            </Win95GroupBox>

            <DndRow>
              <IconInfo size={14} />
              <View style={{ flex: 1, marginLeft: 6 }}>
                <Win95Text variant="caption">{t('cfg.notif.dnd')}</Win95Text>
              </View>
              <Win95Button
                label={t('cfg.notif.change')}
                onPress={showDnd}
                testID="notif-dnd-change"
              />
            </DndRow>
          </View>
        )}

        {tab === 1 && (
          <View>
            <Win95Text variant="caption" style={{ marginBottom: 6 }}>
              {t('cfg.notif.intro')}
            </Win95Text>

            <Bezel variant="inset">
              <List>
                {habits.map((h) => {
                  const selected = h.id === active?.id;
                  return (
                    <HabitRow
                      key={h.id}
                      $selected={selected}
                      onPress={() => setActiveId(h.id)}
                      testID={`notif-habit-${h.id}`}
                    >
                      <Win95Checkbox
                        checked={!!enabled[h.id]}
                        onToggle={(v) => setEnabled((e) => ({ ...e, [h.id]: v }))}
                      />
                      <View style={{ marginLeft: 6 }}>
                        <HabitIcon iconKey={h.iconKey} size={14} />
                      </View>
                      <HabitName>
                        <Win95Text color={selected ? '#ffffff' : undefined}>
                          {h.name}.exe
                        </Win95Text>
                      </HabitName>
                      <Win95Text
                        mono
                        color={selected ? '#ffffff' : undefined}
                      >
                        {h.reminderTime ?? '—'}
                      </Win95Text>
                    </HabitRow>
                  );
                })}
              </List>
            </Bezel>

            {active ? (
              <View style={{ marginTop: 8 }}>
                <Win95GroupBox
                  title={t('cfg.notif.scheduleTitle', { name: `${active.name}.exe` })}
                >
                  <ScheduleGrid>
                    <Win95Text variant="caption">{t('cfg.notif.repeat')}</Win95Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <SchedulePill>
                        <Win95Text mono>{repeat}</Win95Text>
                      </SchedulePill>
                      <View style={{ width: 90, marginLeft: 4 }}>
                        <Win95Select
                          value={unit}
                          onChange={setUnit}
                          options={['minutos', 'horas', 'dias']}
                        />
                      </View>
                      <Win95Text variant="caption" style={{ marginLeft: 6 }}>
                        {t('cfg.notif.windowLabel')}
                      </Win95Text>
                    </View>

                    <Win95Text variant="caption">
                      {t('cfg.notif.persistence')}
                    </Win95Text>
                    <Win95Select
                      value={persistence}
                      onChange={setPersistence}
                      options={[
                        { value: 'insist', label: t('cfg.notif.persist.insist') },
                        { value: 'once', label: t('cfg.notif.persist.once') },
                        { value: 'silent', label: t('cfg.notif.persist.silent') },
                      ]}
                    />

                    <Win95Text variant="caption">
                      {t('cfg.notif.priority')}
                    </Win95Text>
                    <View style={{ flexDirection: 'row' }}>
                      {(['low', 'normal', 'crit'] as Priority[]).map((p) => (
                        <View key={p} style={{ marginRight: 8 }}>
                          <Win95Radio
                            checked={priority === p}
                            onSelect={() => setPriority(p)}
                            label={t(`cfg.notif.prio.${p}` as const)}
                          />
                        </View>
                      ))}
                    </View>
                  </ScheduleGrid>
                </Win95GroupBox>
              </View>
            ) : null}
          </View>
        )}

        {tab === 2 && (
          <View>
            <Win95GroupBox title={t('cfg.notif.sound.scheme')}>
              <Win95Select
                value={soundScheme}
                onChange={(v) => setSoundScheme(v as SoundScheme)}
                options={[
                  { value: 'classic', label: t('cfg.notif.sound.classic') },
                  { value: 'amiga', label: t('cfg.notif.sound.amiga') },
                  { value: 'silent', label: t('cfg.notif.sound.silent') },
                ]}
                testID="notif-sound-scheme"
              />
            </Win95GroupBox>

            <View style={{ marginTop: 8 }}>
              <Win95GroupBox title={t('cfg.notif.sound.event')}>
                <Win95Select
                  value={soundEvent}
                  onChange={setSoundEvent}
                  options={[
                    { value: 'complete', label: t('cfg.notif.sound.complete') },
                    { value: 'crash', label: t('cfg.notif.sound.crash') },
                    { value: 'remind', label: t('cfg.notif.sound.remind') },
                    { value: 'startup', label: t('cfg.notif.sound.startup') },
                  ]}
                  testID="notif-sound-event"
                />
              </Win95GroupBox>
            </View>
          </View>
        )}

        <Footer>
          <Win95Button
            label={t('btn.ok')}
            primary
            onPress={applyAndClose}
            style={{ marginRight: 4 }}
            testID="notif-ok"
          />
          <Win95Button
            label={t('btn.cancel')}
            onPress={() => navigation.goBack()}
            style={{ marginRight: 4 }}
            testID="notif-cancel"
          />
          <Win95Button
            label={t('btn.apply')}
            onPress={applyAndStay}
            testID="notif-apply"
          />
        </Footer>
      </Win95TabPane>
    </Win95DialogShell>
  );
}
