import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatClock } from '@/shared/utils/date';
import { Win95Taskbar } from '../Win95Taskbar';
import { Root, Work } from './styles';

interface Win95DesktopProps {
  children: React.ReactNode;
  hideTaskbar?: boolean;
  /** Deprecated — taskbar no longer shows the active-task button. */
  activeApp?: string;
  onStart?: () => void;
  testID?: string;
}

/**
 * Teal wallpaper + iOS safe areas + the Win95 taskbar (Start button + tray).
 */
export function Win95Desktop({
  children,
  hideTaskbar,
  onStart,
  testID,
}: Win95DesktopProps) {
  const insets = useSafeAreaInsets();

  return (
    <Root testID={testID}>
      <View style={{ height: insets.top }} />
      <Work>{children}</Work>
      {hideTaskbar ? null : (
        <Win95Taskbar clock={formatClock()} onStart={onStart} />
      )}
      <View style={{ height: insets.bottom + (hideTaskbar ? 0 : 4) }} />
    </Root>
  );
}
