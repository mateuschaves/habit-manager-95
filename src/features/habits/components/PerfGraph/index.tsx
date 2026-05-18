import React from 'react';
import { Bezel, Win95Text } from '@/shared/components/win95';
import { Bar, Header, Screen } from './styles';

interface PerfGraphProps {
  label: string;
  value: string;
  data: number[];
  color?: string;
  testID?: string;
}

export function PerfGraph({
  label,
  value,
  data,
  color = '#00ff00',
  testID,
}: PerfGraphProps) {
  const max = Math.max(...data, 1);
  return (
    <Bezel variant="inset" testID={testID}>
      <Header>
        <Win95Text variant="caption">{label}</Win95Text>
        <Win95Text variant="caption" mono>
          {value}
        </Win95Text>
      </Header>
      <Screen>
        {data.map((v, i) => (
          <Bar key={i} $h={(v / max) * 100} $color={color} />
        ))}
      </Screen>
    </Bezel>
  );
}
