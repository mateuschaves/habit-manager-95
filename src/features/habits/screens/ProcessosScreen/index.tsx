import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95ColHeaders,
  Win95Row,
  Win95Status,
  Win95Text,
} from '@/shared/components/win95';
import {
  HabitIcon,
  IconExe,
  IconProcesses,
  IconX,
} from '@/shared/components/icons';
import { useHabits } from '@/shared/context/HabitsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { HabitWithStats } from '@/shared/types/habit';
import { RootStackParamList } from '@/navigation/types';
import { Empty, Footer, IntroRow, ListWrap, Sep, StatusLine } from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const MEM_BUCKETS = [16, 32, 64, 128, 256];

function pidFor(index: number): string {
  return String(1024 + index).padStart(4, '0');
}

function memFor(habit: HabitWithStats, index: number): string {
  const bucket = MEM_BUCKETS[(index + habit.name.length) % MEM_BUCKETS.length];
  return `${String(bucket).padStart(3)} KB`;
}

export function ProcessosScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { habitsWithStats, toggleCompletion } = useHabits();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sorted = useMemo(
    () =>
      [...habitsWithStats].sort((a, b) => {
        const order = { running: 0, done: 1, pending: 2, crashed: 3, paused: 4 };
        return order[a.stats.status] - order[b.stats.status];
      }),
    [habitsWithStats]
  );

  const selected = useMemo(
    () => sorted.find((h) => h.id === selectedId) ?? null,
    [sorted, selectedId]
  );

  const active = sorted.filter(
    (h) => h.stats.status === 'running' || h.stats.status === 'done'
  ).length;
  const crashed = sorted.filter((h) => h.stats.status === 'crashed').length;
  const paused = sorted.filter((h) => h.stats.status === 'paused').length;

  const cpuPct = sorted.length === 0
    ? 0
    : Math.round(
        sorted.reduce((s, h) => s + h.stats.completionRate, 0) / sorted.length
      );
  const memSum = sorted.reduce((s, _h, i) => {
    const bucket = MEM_BUCKETS[(i + sorted[i].name.length) % MEM_BUCKETS.length];
    return s + bucket;
  }, 0);
  const threads = sorted.length + 1;

  if (sorted.length === 0) {
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
      <IntroRow>
        <IconProcesses size={14} />
        <View style={{ flex: 1, marginLeft: 6 }}>
          <Win95Text variant="caption">
            {t('proc.intro', { active, crashed, paused })}
          </Win95Text>
        </View>
      </IntroRow>

      <Win95ColHeaders
        columns={[
          { label: t('col.image'), flex: 1.6 },
          { label: t('col.pid'), flex: 0.7, align: 'right' },
          { label: t('col.memory'), flex: 0.9, align: 'right' },
          { label: t('col.uptime'), flex: 0.6, align: 'right' },
          { label: t('col.status'), flex: 1.2 },
        ]}
      />
      <Bezel variant="inset" fill containerStyle={{ flex: 1 }}>
        <ListWrap>
          <ScrollView>
            {sorted.map((h, i) => {
              const isSel = h.id === selectedId;
              return (
                <Win95Row
                  key={h.id}
                  selected={isSel}
                  onPress={() => setSelectedId(h.id)}
                  testID={`proc-row-${h.id}`}
                  columns={[
                    {
                      flex: 1.6,
                      content: (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <HabitIcon iconKey={h.iconKey} size={14} />
                          <View style={{ width: 4 }} />
                          <Win95Text
                            mono
                            numberOfLines={1}
                            color={isSel ? '#ffffff' : undefined}
                          >
                            {h.name}.exe
                          </Win95Text>
                        </View>
                      ),
                    },
                    {
                      flex: 0.7,
                      align: 'right',
                      content: (
                        <Win95Text
                          mono
                          color={isSel ? '#ffffff' : undefined}
                        >
                          {pidFor(i)}
                        </Win95Text>
                      ),
                    },
                    {
                      flex: 0.9,
                      align: 'right',
                      content: (
                        <Win95Text
                          mono
                          color={isSel ? '#ffffff' : undefined}
                        >
                          {memFor(h, i)}
                        </Win95Text>
                      ),
                    },
                    {
                      flex: 0.6,
                      align: 'right',
                      content: (
                        <Win95Text
                          mono
                          color={isSel ? '#ffffff' : undefined}
                        >
                          {t('proc.uptimeDays', { n: h.stats.currentStreak })}
                        </Win95Text>
                      ),
                    },
                    {
                      flex: 1.2,
                      content: <Win95Status status={h.stats.status} />,
                    },
                  ]}
                />
              );
            })}
            <Win95Row
              key="system-idle"
              testID="proc-row-system-idle"
              columns={[
                {
                  flex: 1.6,
                  content: (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconExe size={14} />
                      <View style={{ width: 4 }} />
                      <Win95Text mono numberOfLines={1}>
                        {t('proc.systemIdle')}
                      </Win95Text>
                    </View>
                  ),
                },
                { flex: 0.7, align: 'right', content: <Win95Text mono>0000</Win95Text> },
                { flex: 0.9, align: 'right', content: <Win95Text mono>  1 KB</Win95Text> },
                { flex: 0.6, align: 'right', content: <Win95Text mono>∞</Win95Text> },
                { flex: 1.2, content: <Win95Status status="running" /> },
              ]}
            />
          </ScrollView>
        </ListWrap>
      </Bezel>

      <StatusLine>
        <Win95Text variant="caption">
          {t('proc.cpu')}{' '}
          <Win95Text mono variant="caption" bold>
            {cpuPct}%
          </Win95Text>
        </Win95Text>
        <Sep />
        <Win95Text variant="caption">
          {t('proc.mem')}{' '}
          <Win95Text mono variant="caption" bold>
            {memSum} KB / ∞
          </Win95Text>
        </Win95Text>
        <Sep />
        <Win95Text variant="caption">
          {t('proc.threads')}{' '}
          <Win95Text mono variant="caption" bold>
            {threads}
          </Win95Text>
        </Win95Text>
      </StatusLine>

      <Footer>
        <Win95Button
          label={t('proc.priority')}
          disabled={!selected}
          style={{ marginRight: 4 }}
          testID="proc-priority"
        />
        <Win95Button
          label={t('proc.properties')}
          disabled={!selected}
          onPress={() =>
            selected &&
            navigation.navigate('HabitDetail', { habitId: selected.id })
          }
          style={{ marginRight: 4 }}
          testID="proc-properties"
        />
        <Win95Button
          label={t('proc.terminate')}
          primary
          danger
          icon={<IconX size={12} />}
          disabled={!selected}
          onPress={() => selected && toggleCompletion(selected.id)}
          testID="proc-terminate"
        />
      </Footer>
    </View>
  );
}
