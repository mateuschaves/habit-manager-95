import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import { RootStackParamList } from '@/navigation/types';
import { MenuBar, MenuItem, PaneInner, TabsWrap } from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function MainWindow({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { index, setIndex } = useMainTab();

  const menus: Array<{ label: string; onPress?: () => void }> = [
    { label: t('menu.file'), onPress: () => navigation.navigate('RunDialog') },
    { label: t('menu.options'), onPress: () => navigation.navigate('Settings') },
    { label: t('menu.view'), onPress: () => setIndex((index + 1) % 4) },
    { label: t('menu.window'), onPress: () => navigation.navigate('Settings') },
    { label: t('menu.help'), onPress: () => navigation.navigate('CfgHelp') },
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
      controls={[]}
      fill
      style={{ flex: 1 }}
      bodyStyle={{ flex: 1, padding: 4 }}
    >
      <MenuBar>
        {menus.map((m) => (
          <MenuItem
            key={m.label}
            onPress={m.onPress}
            accessibilityRole="button"
            testID={`menu-${m.label}`}
          >
            <Win95Text>{m.label}</Win95Text>
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
