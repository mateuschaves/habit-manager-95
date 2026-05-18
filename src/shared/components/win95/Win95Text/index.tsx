import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { StyledText, TextVariant } from './styles';

interface Win95TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  bold?: boolean;
  mono?: boolean;
  onDark?: boolean;
  color?: string;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  testID?: string;
}

export function Win95Text({
  children,
  variant = 'body',
  bold,
  mono,
  onDark,
  color,
  numberOfLines,
  style,
  testID,
}: Win95TextProps) {
  return (
    <StyledText
      $variant={variant}
      $bold={bold}
      $mono={mono}
      $onDark={onDark}
      $color={color}
      numberOfLines={numberOfLines}
      style={style}
      testID={testID}
    >
      {children}
    </StyledText>
  );
}

export type { TextVariant } from './styles';
