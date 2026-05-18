import React from 'react';
import { useTheme } from 'styled-components/native';
import { Win95Text } from '../Win95Text';
import { Dot, LabelSlot, Outer, Row } from './styles';

interface Win95RadioProps {
  checked: boolean;
  onSelect?: () => void;
  label?: string;
  disabled?: boolean;
  testID?: string;
}

export function Win95Radio({
  checked,
  onSelect,
  label,
  disabled,
  testID,
}: Win95RadioProps) {
  const theme = useTheme();
  return (
    <Row
      accessibilityRole="radio"
      accessibilityState={{ selected: checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={onSelect}
      testID={testID}
    >
      <Outer>{checked ? <Dot /> : null}</Outer>
      {label ? (
        <LabelSlot>
          <Win95Text color={disabled ? theme.colors.textDisabled : undefined}>
            {label}
          </Win95Text>
        </LabelSlot>
      ) : null}
    </Row>
  );
}
