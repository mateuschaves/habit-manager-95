import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { BezelVariant, Inner, Outer } from './styles';

interface BezelProps {
  variant?: BezelVariant;
  /** Style applied to the content surface (background, padding, flex…). */
  style?: StyleProp<ViewStyle>;
  /** Style applied to the outermost wrapper (size, margin…). */
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  testID?: string;
}

const THIN: BezelVariant[] = ['thinRaised', 'thinInset'];

/**
 * The Win95 3D chamfer. `raised`/`pressed`/`inset` use the classic
 * double bevel; `thin*` use a single-line bevel for group boxes/panels.
 */
export function Bezel({
  variant = 'raised',
  style,
  containerStyle,
  children,
  testID,
}: BezelProps) {
  if (THIN.includes(variant)) {
    return (
      <Outer $variant={variant} style={containerStyle} testID={testID}>
        <View style={style}>{children}</View>
      </Outer>
    );
  }
  return (
    <Outer $variant={variant} style={containerStyle} testID={testID}>
      <Inner $variant={variant}>
        <View style={style}>{children}</View>
      </Inner>
    </Outer>
  );
}

export type { BezelVariant } from './styles';
