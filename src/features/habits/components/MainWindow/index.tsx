import React from 'react';
import { View } from 'react-native';
import {
  Win95TabPane,
  Win95Tabs,
  Win95Text,
  Win95Window,
} from '@/shared/components/win95';
import { IconProcesses } from '@/shared/components/icons';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useMainTab } from '@/features/habits/context/MainTabContext';
import { MenuBar, MenuItem, PaneInner, TabsWrap } from './styles';

export function MainWindow({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { index, setIndex } = useMainTab();

  const menus = [
    t('menu.file'),
    t('menu.options'),
    t('menu.view'),
    t('menu.window'),
    t('menu.help'),
  ];
  const tabs = [
    t('tab.apps'),
    t('tab.processes'),
    t('tab.performance'),
    t('tab.history'),
  ];

  return (
    <Win95Window
      title={t('app.title')}
      icon={<IconProcesses size={14} />}
      controls={['min', 'max', 'close']}
      style={{ flex: 1 }}
      bodyStyle={{ flex: 1, padding: 4 }}
    >
      <MenuBar>
        {menus.map((m) => (
          <MenuItem key={m}>
            <Win95Text>{m}</Win95Text>
          </MenuItem>
        ))}
      </MenuBar>
      <TabsWrap>
        <Win95Tabs
          tabs={tabs}
          active={index}
          onChange={setIndex}
          testID="main-tabs"
        />
      </TabsWrap>
      <View style={{ flex: 1, paddingHorizontal: 4, paddingBottom: 4 }}>
        <Win95TabPane style={{ flex: 1 }}>
          <PaneInner>{children}</PaneInner>
        </Win95TabPane>
      </View>
    </Win95Window>
  );
}
