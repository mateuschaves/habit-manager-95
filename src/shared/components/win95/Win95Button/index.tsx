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
