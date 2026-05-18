import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
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

export function NotificationsDialog() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { habits } = useHabits();

  const [tab, setTab] = useState(1);
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(habits.map((h) => [h.id, h.notifyIfLate]))
  );
  const [activeId, setActiveId] = useState<string | null>(habits[1]?.id ?? habits[0]?.id ?? null);
  const [repeat, setRepeat] = useState('2');
  const [unit, setUnit] = useState('horas');
  const [persistence, setPersistence] = useState('insist');
  const [priority, setPriority] = useState<Priority>('normal');
  const [lockscreen, setLockscreen] = useState(true);

  const active = habits.find((h) => h.id === activeId) ?? habits[0];

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

              <View style={{ marginTop: 6 }}>
                <Win95Checkbox
                  checked={lockscreen}
                  onToggle={setLockscreen}
                  label={t('cfg.notif.lockscreen')}
                />
              </View>
            </Win95GroupBox>
          </View>
        ) : null}

        <DndRow>
          <IconInfo size={14} />
          <View style={{ flex: 1, marginLeft: 6 }}>
            <Win95Text variant="caption">{t('cfg.notif.dnd')}</Win95Text>
          </View>
          <Win95Button label={t('cfg.notif.change')} />
        </DndRow>

        <Footer>
          <Win95Button
            label={t('btn.ok')}
            primary
            onPress={() => navigation.goBack()}
            style={{ marginRight: 4 }}
          />
          <Win95Button
            label={t('btn.cancel')}
            onPress={() => navigation.goBack()}
            style={{ marginRight: 4 }}
          />
          <Win95Button label={t('btn.apply')} />
        </Footer>
      </Win95TabPane>
    </Win95DialogShell>
  );
}
