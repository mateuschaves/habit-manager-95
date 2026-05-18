import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Win95Text } from '@/shared/components/win95';
import { useHabits } from '@/shared/context/HabitsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { RootStackParamList } from '@/navigation/types';
import { Banner, Para, Root, Tech, Tips } from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;
const WHITE = '#ffffff';
const AMBER = '#fcff00';

export function BsodScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { pendingCrash, acknowledgeCrash } = useHabits();

  useEffect(() => {
    if (!pendingCrash) navigation.goBack();
  }, [pendingCrash, navigation]);

  function dismiss() {
    acknowledgeCrash();
    navigation.goBack();
  }

  const name = pendingCrash?.name ?? '???';
  const days = pendingCrash?.stats.bestStreak ?? 0;

  return (
    <Root onPress={dismiss} style={{ paddingTop: insets.top + 30 }}>
      <Banner>
        <Win95Text bold color="#0000aa">
          {t('bsod.brand')}
        </Win95Text>
      </Banner>
      <Para>
        <Win95Text mono color={WHITE}>
          {t('bsod.fatal', { name, days })}
        </Win95Text>
      </Para>
      <Para>
        <Win95Text mono color={WHITE}>
          {t('bsod.blame')}
        </Win95Text>
      </Para>
      <Para>
        <Win95Text mono color={WHITE}>
          {t('bsod.advice')}
        </Win95Text>
      </Para>
      <Tips>
        <Win95Text mono color={WHITE}>
          {t('bsod.tip1')}
        </Win95Text>
        <Win95Text mono color={WHITE}>
          {t('bsod.tip2')}
        </Win95Text>
        <Win95Text mono color={WHITE}>
          {t('bsod.tip3')}
        </Win95Text>
      </Tips>
      <Para>
        <Win95Text mono color={WHITE}>
          {t('bsod.tech')}
        </Win95Text>
      </Para>
      <Tech>
        <Win95Text mono color={WHITE} variant="caption">
          STOP: 0x000000C0 (0x00000000, 0xC0000005, 0x80544E50)
        </Win95Text>
        <Win95Text mono color={WHITE} variant="caption">
          PROCESS_NAME: {name}.exe
        </Win95Text>
        <Win95Text mono color={WHITE} variant="caption">
          BUGCHECK_STR: STREAK_BROKEN_INTERRUPT
        </Win95Text>
      </Tech>
      <Win95Text mono color={AMBER} style={{ textAlign: 'center' }}>
        {t('bsod.continue')}
      </Win95Text>
    </Root>
  );
}
