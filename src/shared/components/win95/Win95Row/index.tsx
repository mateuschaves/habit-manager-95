import React from 'react';
import { Cell, RowWrap } from './styles';

export interface Column {
  /** Flex weight (default 1). */
  flex?: number;
  /** Fixed width in px (overrides flex). */
  width?: number;
  align?: 'left' | 'right';
  content: React.ReactNode;
}

interface Win95RowProps {
  columns: Column[];
  selected?: boolean;
  onPress?: () => void;
  testID?: string;
}

export function Win95Row({
  columns,
  selected,
  onPress,
  testID,
}: Win95RowProps) {
  return (
    <RowWrap
      $selected={selected}
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      testID={testID}
    >
      {columns.map((c, i) => (
        <Cell
          key={i}
          $align={c.align}
          style={
            c.width != null
              ? { width: c.width, flexGrow: 0, flexShrink: 0 }
              : { flex: c.flex ?? 1 }
          }
        >
          {c.content}
        </Cell>
      ))}
    </RowWrap>
  );
}
