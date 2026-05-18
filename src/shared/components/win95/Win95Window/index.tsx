import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Bezel } from '../Bezel';
import { IconClose } from '@/shared/components/icons';
import { Win95Text } from '../Win95Text';
import {
  Body,
  ControlButton,
  Controls,
  TitleBar,
  TitleIconSlot,
  TitleText,
} from './styles';

interface Win95WindowProps {
  title: string;
  icon?: React.ReactNode;
  inactive?: boolean;
  controls?: Array<'min' | 'max' | 'close'>;
  fullBleed?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Win95Window({
  title,
  icon,
  inactive,
  controls = ['close'],
  fullBleed,
  onClose,
  children,
  style,
  bodyStyle,
  testID,
}: Win95WindowProps) {
  return (
    <Bezel variant="raised" fill containerStyle={style} testID={testID}>
      <TitleBar $inactive={inactive}>
        <TitleText>
          {icon ? <TitleIconSlot>{icon}</TitleIconSlot> : null}
          <Win95Text bold onDark numberOfLines={1} variant="title">
            {title}
          </Win95Text>
        </TitleText>
        <Controls>
          {controls.includes('min') && (
            <Bezel variant="raised">
              <ControlButton>
                <Win95Text bold>_</Win95Text>
              </ControlButton>
            </Bezel>
          )}
          {controls.includes('max') && (
            <Bezel variant="raised">
              <ControlButton>
                <Win95Text bold>□</Win95Text>
              </ControlButton>
            </Bezel>
          )}
          {controls.includes('close') && (
            <Bezel variant="raised">
              <ControlButton
                accessibilityRole="button"
                onTouchEnd={onClose}
                testID={testID ? `${testID}-close` : 'window-close'}
              >
                <IconClose size={9} />
              </ControlButton>
            </Bezel>
          )}
        </Controls>
      </TitleBar>
      <Body $fullBleed={fullBleed} style={bodyStyle}>
        {children}
      </Body>
    </Bezel>
  );
}
