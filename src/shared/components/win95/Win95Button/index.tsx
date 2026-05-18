import React, { useState } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Bezel } from '../Bezel';
import { Win95Text } from '../Win95Text';
import { IconSlot, Surface } from './styles';

interface Win95ButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  primary?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
  /** Force the pressed bevel (used by toggle-like buttons). */
  active?: boolean;
  /** Override the label for screen readers (use when label is just a symbol). */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Win95Button({
  label,
  onPress,
  disabled,
  primary,
  danger,
  icon,
  active,
  accessibilityLabel,
  style,
  testID,
}: Win95ButtonProps) {
  const theme = useTheme();
  const [held, setHeld] = useState(false);
  const pressed = held || active;

  const color = disabled
    ? theme.colors.textDisabled
    : danger
    ? theme.colors.danger
    : theme.colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setHeld(true)}
      onPressOut={() => setHeld(false)}
      style={style}
      testID={testID}
    >
      <Bezel variant={pressed ? 'pressed' : 'raised'}>
        <Surface $disabled={disabled}>
          {icon ? <IconSlot>{icon}</IconSlot> : null}
          <Win95Text bold={primary} color={color}>
            {label}
          </Win95Text>
        </Surface>
      </Bezel>
    </Pressable>
  );
}
