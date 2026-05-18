import React from 'react';
import { Bar, Tab } from './styles';
import { Win95Text } from '../Win95Text';

interface Win95TabsProps {
  tabs: string[];
  active: number;
  onChange: (index: number) => void;
  testID?: string;
}

export function Win95Tabs({ tabs, active, onChange, testID }: Win95TabsProps) {
  return (
    <Bar testID={testID}>
      {tabs.map((label, i) => {
        const isActive = i === active;
        return (
          <Tab
            key={label}
            $active={isActive}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange(i)}
            testID={`${testID ?? 'tabs'}-tab-${i}`}
          >
            <Win95Text bold={isActive} numberOfLines={1}>
              {label}
            </Win95Text>
          </Tab>
        );
      })}
    </Bar>
  );
}

export { Pane as Win95TabPane } from './styles';
