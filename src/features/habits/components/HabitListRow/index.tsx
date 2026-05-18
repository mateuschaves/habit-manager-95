import React from 'react';
import { useTheme } from 'styled-components/native';
import {
  Win95Progress,
  Win95Row,
  Win95Status,
  Win95Text,
} from '@/shared/components/win95';
import { HabitIcon } from '@/shared/components/icons';
import { HabitWithStats } from '@/shared/types/habit';
import { IconSlot, NameCell } from './styles';

interface HabitListRowProps {
  habit: HabitWithStats;
  selected?: boolean;
  onPress?: () => void;
  testID?: string;
}

export function HabitListRow({
  habit,
  selected,
  onPress,
  testID,
}: HabitListRowProps) {
  const theme = useTheme();
  const fg = selected ? theme.colors.selectionFg : undefined;
  return (
    <Win95Row
      selected={selected}
      onPress={onPress}
      testID={testID ?? `habit-row-${habit.id}`}
      columns={[
        {
          flex: 2.4,
          content: (
            <NameCell>
              <IconSlot>
                <HabitIcon iconKey={habit.iconKey} size={16} />
              </IconSlot>
              <Win95Text numberOfLines={1} color={fg}>
                {habit.name}.exe
              </Win95Text>
            </NameCell>
          ),
        },
        { flex: 1.5, content: <Win95Status status={habit.stats.status} /> },
        {
          flex: 0.8,
          align: 'right',
          content: (
            <Win95Text mono color={fg}>
              {habit.stats.currentStreak}d
            </Win95Text>
          ),
        },
        {
          width: 64,
          align: 'right',
          content: (
            <Win95Progress
              value={habit.stats.energy}
              segments={6}
              color={
                habit.stats.status === 'crashed' ? '#ff0000' : undefined
              }
            />
          ),
        },
      ]}
    />
  );
}
