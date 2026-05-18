import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { BezelVariant, Inner, Outer } from './styles';

interface BezelProps {
  variant?: BezelVariant;
  /** Style applied to the content surface (background, padding, flex…). */
  style?: StyleProp<ViewStyle>;
  /** Style applied to the outermost wrapper (size, margin…). */
  containerStyle?: StyleProp<ViewStyle>;
  /** Stretch the inner bevel layers to flex:1 so child content can fill. */
  fill?: boolean;
  children?: React.ReactNode;
  testID?: string;
}

const THIN: BezelVariant[] = ['thinRaised', 'thinInset'];
const FILL = { flex: 1 } as const;

/**
 * The Win95 3D chamfer. `raised`/`pressed`/`inset` use the classic
 * double bevel; `thin*` use a single-line bevel for group boxes/panels.
 */
export function Bezel({
  variant = 'raised',
  style,
  containerStyle,
  fill,
  children,
  testID,
}: BezelProps) {
  if (THIN.includes(variant)) {
    return (
      <Outer $variant={variant} style={containerStyle} testID={testID}>
        <View style={[fill && FILL, style]}>{children}</View>
      </Outer>
    );
  }
  return (
    <Outer $variant={variant} style={containerStyle} testID={testID}>
      <Inner $variant={variant} style={fill ? FILL : undefined}>
        <View style={[fill && FILL, style]}>{children}</View>
      </Inner>
    </Outer>
  );
}

export type { BezelVariant } from './styles';
