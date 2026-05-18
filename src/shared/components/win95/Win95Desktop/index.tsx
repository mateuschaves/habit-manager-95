import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { formatClock } from '@/shared/utils/date';
import { Win95Taskbar } from '../Win95Taskbar';
import { Root, Work } from './styles';

interface Win95DesktopProps {
  children: React.ReactNode;
  hideTaskbar?: boolean;
  activeApp?: string;
  onStart?: () => void;
  testID?: string;
}

/**
 * Teal wallpaper + iOS safe areas + the Win95 taskbar. The active-app
 * label defaults to the app title from i18n (no prop drilling required).
 */
export function Win95Desktop({
  children,
  hideTaskbar,
  activeApp,
  onStart,
  testID,
}: Win95DesktopProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <Root testID={testID}>
      <View style={{ height: insets.top }} />
      <Work>{children}</Work>
      {hideTaskbar ? null : (
        <Win95Taskbar
          activeApp={activeApp ?? t('app.title')}
          clock={formatClock()}
          onStart={onStart}
        />
      )}
      <View style={{ height: insets.bottom + (hideTaskbar ? 0 : 4) }} />
    </Root>
  );
}
