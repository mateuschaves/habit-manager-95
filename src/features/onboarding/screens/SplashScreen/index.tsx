import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Win95Text } from '@/shared/components/win95';
import { useSettings } from '@/shared/context/SettingsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { RootStackParamList } from '@/navigation/types';
import { Block, Root } from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const GREEN = '#00ff00';
const AMBER = '#fcff00';

export function SplashScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { onboarded, loading } = useSettings();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: onboarded ? 'Main' : 'Onboarding' }],
      });
    }, 1800);
    return () => clearTimeout(timer);
  }, [loading, onboarded, navigation]);

  return (
    <Root style={{ paddingTop: insets.top + 24 }}>
      <Block>
        <Win95Text mono color="#c0c0c0" variant="label">
          {t('splash.bios')}
        </Win95Text>
        <Win95Text mono color="#c0c0c0">
          {t('splash.copyright')}
        </Win95Text>
      </Block>
      <Block>
        <Win95Text mono color={GREEN}>
          {t('splash.memory')}
        </Win95Text>
        <Win95Text mono color="#c0c0c0">
          {t('splash.detecting')}
        </Win95Text>
        <Win95Text mono color="#c0c0c0">
          {'  '}Primary Master: streak.dat
        </Win95Text>
        <Win95Text mono color="#c0c0c0">
          {'  '}Secondary Master: history.db
        </Win95Text>
      </Block>
      <Block>
        <Win95Text mono color={GREEN}>
          {t('splash.loadingKernel')}
        </Win95Text>
        <Win95Text mono color={GREEN}>
          {t('splash.mounting')}
        </Win95Text>
        <Win95Text mono color={GREEN}>
          {t('splash.scheduling')}
        </Win95Text>
      </Block>
      <Win95Text mono color={AMBER}>
        {t('splash.press')}
      </Win95Text>
      <Win95Text mono color="#c0c0c0" style={{ marginTop: 36 }}>
        {'C:\\HABITS>_'}
      </Win95Text>
    </Root>
  );
}
