import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Bezel } from '../Bezel';
import { Segment, Track } from './styles';

interface Win95ProgressProps {
  /** 0–100. */
  value: number;
  segments?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Win95Progress({
  value,
  segments = 20,
  color,
  style,
  testID,
}: Win95ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const filled = Math.round((clamped / 100) * segments);
  return (
    <Bezel variant="inset" containerStyle={style}>
      <Track
        accessibilityRole="progressbar"
        accessibilityValue={{ now: clamped, min: 0, max: 100 }}
        testID={testID}
      >
        {Array.from({ length: segments }).map((_, i) => (
          <Segment key={i} $filled={i < filled} $color={color} />
        ))}
      </Track>
    </Bezel>
  );
}
