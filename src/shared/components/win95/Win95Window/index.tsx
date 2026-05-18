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
  /** Stretch the bezel chain so the body can flex:1 in a constrained parent. */
  fill?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
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
  fill,
  onClose,
  onMinimize,
  onMaximize,
  children,
  style,
  bodyStyle,
  testID,
}: Win95WindowProps) {
  // Decorative controls (no handler passed) are dropped to avoid the dead-button trap.
  const showMin = controls.includes('min') && !!onMinimize;
  const showMax = controls.includes('max') && !!onMaximize;
  const showClose = controls.includes('close') && !!onClose;
  return (
    <Bezel variant="raised" fill={fill} containerStyle={style} testID={testID}>
      <TitleBar $inactive={inactive}>
        <TitleText>
          {icon ? <TitleIconSlot>{icon}</TitleIconSlot> : null}
          <Win95Text bold onDark numberOfLines={1} variant="title">
            {title}
          </Win95Text>
        </TitleText>
        <Controls>
          {showMin && (
            <Bezel variant="raised">
              <ControlButton
                accessibilityRole="button"
                accessibilityLabel="Minimize"
                onPress={onMinimize}
                testID={testID ? `${testID}-min` : 'window-min'}
              >
                <Win95Text bold>_</Win95Text>
              </ControlButton>
            </Bezel>
          )}
          {showMax && (
            <Bezel variant="raised">
              <ControlButton
                accessibilityRole="button"
                accessibilityLabel="Maximize"
                onPress={onMaximize}
                testID={testID ? `${testID}-max` : 'window-max'}
              >
                <Win95Text bold>□</Win95Text>
              </ControlButton>
            </Bezel>
          )}
          {showClose && (
            <Bezel variant="raised">
              <ControlButton
                accessibilityRole="button"
                accessibilityLabel="Close"
                onPress={onClose}
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
