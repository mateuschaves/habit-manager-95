import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Win95Desktop } from '@/shared/components/win95';
import { RootStackParamList } from '@/navigation/types';
import {
  MainTabProvider,
  useMainTab,
} from '@/features/habits/context/MainTabContext';
import { MainWindow } from '@/features/habits/components/MainWindow';
import { ProcessosScreen } from '../ProcessosScreen';
import { AplicativosScreen } from '../AplicativosScreen';
import { DesempenhoScreen } from '../DesempenhoScreen';
import { HistoricoScreen } from '../HistoricoScreen';

type Nav = NativeStackNavigationProp<RootStackParamList>;

function ActiveTab() {
  const { tab } = useMainTab();
  switch (tab) {
    case 'apps':
      return <AplicativosScreen />;
    case 'performance':
      return <DesempenhoScreen />;
    case 'history':
      return <HistoricoScreen />;
    case 'processes':
    default:
      return <ProcessosScreen />;
  }
}

export function MainScreen() {
  const navigation = useNavigation<Nav>();
  return (
    <MainTabProvider>
      <Win95Desktop onStart={() => navigation.navigate('Settings')}>
        <MainWindow>
          <ActiveTab />
        </MainWindow>
      </Win95Desktop>
    </MainTabProvider>
  );
}
