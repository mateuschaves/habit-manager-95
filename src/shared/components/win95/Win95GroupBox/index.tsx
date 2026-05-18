import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Win95Text } from '../Win95Text';
import { Fieldset, Legend } from './styles';

interface Win95GroupBoxProps {
  title?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Win95GroupBox({
  title,
  children,
  style,
  testID,
}: Win95GroupBoxProps) {
  return (
    <Fieldset style={style} testID={testID}>
      {title ? (
        <Legend>
          <Win95Text variant="caption">{title}</Win95Text>
        </Legend>
      ) : null}
      {children}
    </Fieldset>
  );
}
