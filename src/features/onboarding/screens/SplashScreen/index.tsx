import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';
import { useSettings } from '@/shared/context/SettingsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { RootStackParamList } from '@/navigation/types';
import {
  Block,
  Cursor,
  HeaderRow,
  Indent,
  KeyCap,
  Mono,
  PressBlock,
  Root,
  Row,
} from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const GREEN = '#00ff00';
const AMBER = '#fcff00';
const WHITE = '#ffffff';
const BLUE = '#00aaff';

function EnergyStar() {
  return (
    <Svg width={60} height={60} viewBox="0 0 60 60" testID="energy-star">
      <Circle cx={30} cy={30} r={28} fill="none" stroke={BLUE} strokeWidth={3} />
      <Path
        d="M15 35 Q22 18 30 30 Q38 42 45 25"
        stroke={AMBER}
        strokeWidth={3}
        fill="none"
      />
      <SvgText
        x={30}
        y={55}
        fontSize={6}
        fill={BLUE}
        textAnchor="middle"
      >
        ENERGY
      </SvgText>
    </Svg>
  );
}

export function SplashScreen() {
  const navigation = useNavigation<Nav>();
  const { onboarded, loading } = useSettings();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: onboarded ? 'Main' : 'Onboarding' }],
      });
    }, 2200);
    return () => clearTimeout(timer);
  }, [loading, onboarded, navigation]);

  return (
    <Root style={{ paddingTop: insets.top + 10 }}>
      <HeaderRow>
        <View>
          <Mono $s={16} $b>
            {t('splash.bios')}
          </Mono>
          <Mono>{t('splash.copyright')}</Mono>
        </View>
        <EnergyStar />
      </HeaderRow>

      <Block>
        <Mono>{t('splash.kernel')}</Mono>
        <Mono>{t('splash.award')}</Mono>
      </Block>

      <Block>
        <Mono>{t('splash.processor')}</Mono>
        <Row>
          <Mono>{t('splash.memoryLabel')} </Mono>
          <Mono $c={GREEN}>{t('splash.memoryValue')}</Mono>
        </Row>
        <Mono>{t('splash.detecting')}</Mono>
        <Indent>
          <Mono>{t('splash.ide.primary')}</Mono>
          <Mono $c={GREEN}>{t('splash.ide.days', { n: 12 })}</Mono>
        </Indent>
        <Indent>
          <Mono>{t('splash.ide.slave')}</Mono>
          <Mono $c={GREEN}>{t('splash.ide.ok')}</Mono>
        </Indent>
        <Indent>
          <Mono>{t('splash.ide.secondary')}</Mono>
          <Mono $c={GREEN}>{t('splash.ide.ok')}</Mono>
        </Indent>
      </Block>

      <Block>
        <Row>
          <Mono>{t('splash.loadKernel')}</Mono>
          <Mono $c={GREEN}>{t('splash.statusOk')}</Mono>
        </Row>
        <Row>
          <Mono>{t('splash.mounting')}</Mono>
          <Mono $c={GREEN}>{t('splash.statusOk')}</Mono>
        </Row>
        <Row>
          <Mono>{t('splash.schedulingShort')}</Mono>
          <Mono $c={GREEN}>{t('splash.statusOk')}</Mono>
        </Row>
        <Row>
          <Mono>{t('splash.initStreaks')}</Mono>
          <Mono $c={AMBER}>{t('splash.streaksActive', { n: 8 })}</Mono>
        </Row>
      </Block>

      <PressBlock>
        <Row>
          <Mono $c={WHITE}>{t('splash.prompt.press')}</Mono>
          <KeyCap>
            <Mono $c="#000000">DEL</Mono>
          </KeyCap>
          <Mono $c={WHITE}>{t('splash.prompt.toSetup')}</Mono>
          <KeyCap>
            <Mono $c="#000000">F2</Mono>
          </KeyCap>
          <Mono $c={WHITE}>{t('splash.prompt.toStart')}</Mono>
        </Row>
        <Mono style={{ marginTop: 8 }}>{t('splash.tag')}</Mono>
      </PressBlock>

      <Cursor>
        <Mono>{t('splash.dosPath')}</Mono>
      </Cursor>
    </Root>
  );
}
