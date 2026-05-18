import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Win95Button,
  Win95Desktop,
  Win95GroupBox,
  Win95Text,
  Win95Window,
} from '@/shared/components/win95';
import { IconInfo, Win95Logo } from '@/shared/components/icons';
import { useHabits } from '@/shared/context/HabitsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { APP_BUILD, APP_VERSION } from '@/shared/constants';
import { RootStackParamList } from '@/navigation/types';
import { Divider, Footer, Header, Info, Logo, ResRow } from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function AboutScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { habitsWithStats } = useHabits();

  const combined = habitsWithStats.reduce(
    (s, h) => s + h.stats.currentStreak,
    0
  );

  return (
    <Win95Desktop activeApp={t('about.title')}>
      <Win95Window
        title={t('about.title')}
        icon={<IconInfo size={14} />}
        controls={['close']}
        onClose={() => navigation.goBack()}
        testID="about-window"
      >
        <Header>
          <Logo>
            <Win95Logo size={44} />
          </Logo>
          <Info>
            <Win95Text variant="title" bold>
              Habit Manager 95
            </Win95Text>
            <Win95Text variant="caption">
              {t('about.version', { v: APP_VERSION })}
            </Win95Text>
            <Win95Text variant="caption">{APP_BUILD}</Win95Text>
            <Win95Text variant="caption" style={{ marginTop: 6 }}>
              © 1995-2026 Habit Industries Inc.
            </Win95Text>
          </Info>
        </Header>

        <Divider />

        <Win95Text variant="caption">{t('about.licensed')}</Win95Text>
        <Win95Text variant="caption" bold style={{ marginTop: 4 }}>
          {t('about.licensee')}
        </Win95Text>

        <Win95GroupBox title={t('about.resources')}>
          <ResRow>
            <Win95Text variant="caption">{t('about.activeHabits')}</Win95Text>
            <Win95Text variant="caption" mono>
              {habitsWithStats.length}
            </Win95Text>
          </ResRow>
          <ResRow>
            <Win95Text variant="caption">
              {t('about.combinedStreak')}
            </Win95Text>
            <Win95Text variant="caption" mono>
              {combined} {t('unit.days')}
            </Win95Text>
          </ResRow>
          <ResRow>
            <Win95Text variant="caption">{t('about.memoryFree')}</Win95Text>
            <Win95Text variant="caption" mono>
              87%
            </Win95Text>
          </ResRow>
        </Win95GroupBox>

        <Footer>
          <Win95Button
            label={t('btn.ok')}
            primary
            onPress={() => navigation.goBack()}
            testID="about-ok"
          />
        </Footer>
      </Win95Window>
    </Win95Desktop>
  );
}
