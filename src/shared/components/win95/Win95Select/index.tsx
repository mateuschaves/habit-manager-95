import React, { useState } from 'react';
import { Modal, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Bezel } from '../Bezel';
import { Win95Text } from '../Win95Text';
import {
  Arrow,
  Backdrop,
  Menu,
  Option,
  SelectRow,
  ValueSlot,
} from './styles';

export interface SelectOption {
  value: string;
  label: string;
}

interface Win95SelectProps {
  value: string;
  options: Array<SelectOption | string>;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

function normalize(o: SelectOption | string): SelectOption {
  return typeof o === 'string' ? { value: o, label: o } : o;
}

export function Win95Select({
  value,
  options,
  onChange,
  placeholder,
  style,
  testID,
}: Win95SelectProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const items = options.map(normalize);
  const current = items.find((i) => i.value === value);

  return (
    <>
      <Bezel variant="inset" containerStyle={style}>
        <SelectRow
          accessibilityRole="button"
          accessibilityState={{ expanded: open }}
          onPress={() => setOpen(true)}
          testID={testID}
        >
          <ValueSlot>
            <Win95Text
              numberOfLines={1}
              color={current ? undefined : theme.colors.textDisabled}
            >
              {current?.label ?? placeholder ?? ''}
            </Win95Text>
          </ValueSlot>
          <Bezel variant={open ? 'pressed' : 'raised'}>
            <Arrow>
              <Win95Text variant="caption">▼</Win95Text>
            </Arrow>
          </Bezel>
        </SelectRow>
      </Bezel>

      <Modal visible={open} transparent animationType="fade">
        <Backdrop onPress={() => setOpen(false)}>
          <Bezel variant="raised">
            <Menu>
              <ScrollView>
                {items.map((item) => {
                  const selected = item.value === value;
                  return (
                    <Option
                      key={item.value}
                      $selected={selected}
                      onPress={() => {
                        onChange(item.value);
                        setOpen(false);
                      }}
                      testID={`${testID ?? 'select'}-opt-${item.value}`}
                    >
                      <Win95Text
                        color={
                          selected ? theme.colors.selectionFg : undefined
                        }
                      >
                        {item.label}
                      </Win95Text>
                    </Option>
                  );
                })}
              </ScrollView>
            </Menu>
          </Bezel>
        </Backdrop>
      </Modal>
    </>
  );
}
