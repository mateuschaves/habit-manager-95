import React from 'react';
import { Bezel } from '../Bezel';
import { Win95Logo } from '@/shared/components/icons';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Win95Text } from '../Win95Text';
import {
  Bar,
  Clock,
  Spacer,
  StartButton,
  StartLabel,
  Tray,
} from './styles';

interface Win95TaskbarProps {
  clock: string;
  onStart?: () => void;
  testID?: string;
}

export function Win95Taskbar({ clock, onStart, testID }: Win95TaskbarProps) {
  const { t } = useTranslation();
  return (
    <Bezel variant="raised">
      <Bar testID={testID}>
        <Bezel variant="raised">
          <StartButton
            accessibilityRole="button"
            onPress={onStart}
            testID="taskbar-start"
          >
            <Win95Logo size={16} />
            <StartLabel>
              <Win95Text bold>{t('taskbar.start')}</Win95Text>
            </StartLabel>
          </StartButton>
        </Bezel>
        <Spacer />
        <Tray>
          <Clock>
            <Win95Text>{clock}</Win95Text>
          </Clock>
        </Tray>
      </Bar>
    </Bezel>
  );
}
