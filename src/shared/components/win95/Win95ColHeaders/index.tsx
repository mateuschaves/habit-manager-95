import React from 'react';
import { Win95Text } from '../Win95Text';
import { HeaderBar, HeaderCell } from './styles';

export interface HeaderColumn {
  label: string;
  flex?: number;
  width?: number;
  align?: 'left' | 'right';
}

export function Win95ColHeaders({
  columns,
  testID,
}: {
  columns: HeaderColumn[];
  testID?: string;
}) {
  return (
    <HeaderBar testID={testID}>
      {columns.map((c, i) => (
        <HeaderCell
          key={c.label}
          $align={c.align}
          style={
            c.width != null
              ? { width: c.width, flexGrow: 0, flexShrink: 0 }
              : { flex: c.flex ?? 1 }
          }
        >
          <Win95Text variant="caption" bold>
            {c.label}
          </Win95Text>
        </HeaderCell>
      ))}
    </HeaderBar>
  );
}
