import React from 'react';
import { useTheme } from 'styled-components/native';
import { Bezel, Win95Text } from '@/shared/components/win95';
import { Box, ValueRow } from './styles';

interface StatBoxProps {
  label: string;
  value: string | number;
  unit?: string;
  hot?: boolean;
  testID?: string;
}

export function StatBox({ label, value, unit, hot, testID }: StatBoxProps) {
  const theme = useTheme();
  return (
    <Bezel variant="thinInset" testID={testID}>
      <Box>
        <Win95Text variant="caption" color={theme.colors.textDisabled}>
          {label}
        </Win95Text>
        <ValueRow>
          <Win95Text
            variant="heading"
            mono
            bold
            color={hot ? theme.colors.danger : theme.colors.info}
          >
            {String(value)}
          </Win95Text>
          {unit ? (
            <Win95Text variant="caption" style={{ marginLeft: 4 }}>
              {unit}
            </Win95Text>
          ) : null}
        </ValueRow>
      </Box>
    </Bezel>
  );
}
