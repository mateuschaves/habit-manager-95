import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Bezel } from '../Bezel';
import { Win95Text } from '../Win95Text';
import { Field, LabelWrap, Row, Suffix } from './styles';

interface Win95InputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  error?: string | null;
  suffix?: React.ReactNode;
  autoFocus?: boolean;
  keyboardType?: 'default' | 'numeric';
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Win95Input({
  value,
  onChangeText,
  label,
  placeholder,
  error,
  suffix,
  autoFocus,
  keyboardType = 'default',
  style,
  testID,
}: Win95InputProps) {
  const theme = useTheme();
  return (
    <View style={style}>
      {label ? (
        <LabelWrap>
          <Win95Text>{label}</Win95Text>
        </LabelWrap>
      ) : null}
      <Bezel variant="inset">
        <Row>
          <Field
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textDisabled}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            style={{ flex: 1 }}
            testID={testID}
          />
          {suffix ? <Suffix>{suffix}</Suffix> : null}
        </Row>
      </Bezel>
      {error ? (
        <Win95Text variant="caption" color={theme.colors.danger}>
          {error}
        </Win95Text>
      ) : null}
    </View>
  );
}
