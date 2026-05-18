import React from 'react';
import { useTheme } from 'styled-components/native';
import { Bezel } from '../Bezel';
import { IconCheck } from '@/shared/components/icons';
import { Win95Text } from '../Win95Text';
import { Box, LabelSlot, Row } from './styles';

interface Win95CheckboxProps {
  checked: boolean;
  onToggle?: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  testID?: string;
}

export function Win95Checkbox({
  checked,
  onToggle,
  label,
  disabled,
  testID,
}: Win95CheckboxProps) {
  const theme = useTheme();
  return (
    <Row
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onToggle?.(!checked)}
      testID={testID}
    >
      <Bezel variant="inset">
        <Box>{checked ? <IconCheck size={11} /> : null}</Box>
      </Bezel>
      {label ? (
        <LabelSlot>
          <Win95Text
            color={disabled ? theme.colors.textDisabled : undefined}
          >
            {label}
          </Win95Text>
        </LabelSlot>
      ) : null}
    </Row>
  );
}
