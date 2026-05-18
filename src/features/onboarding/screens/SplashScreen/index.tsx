import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';
import { useSettings } from '@/shared/context/SettingsContext';
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
            Habit BIOS v4.51
          </Mono>
          <Mono>Copyright (C) 1995-2026, Habit Industries Inc.</Mono>
        </View>
        <EnergyStar />
      </HeaderRow>

      <Block>
        <Mono>Habit Manager 95 BIOS, Build 0518.2026</Mono>
        <Mono>Awarding Personal OS, AwardBIOS v6.00PG</Mono>
      </Block>

      <Block>
        <Mono>Main Processor: User Brain @ 1.0 wmps</Mono>
        <Row>
          <Mono>Memory Test: </Mono>
          <Mono $c={GREEN}>262144K OK</Mono>
        </Row>
        <Mono>Detecting IDE drives...</Mono>
        <Indent>
          <Mono>Primary Master: streak.dat   </Mono>
          <Mono $c={GREEN}>(12 dias)</Mono>
        </Indent>
        <Indent>
          <Mono>Primary Slave : config.ini   </Mono>
          <Mono $c={GREEN}>OK</Mono>
        </Indent>
        <Indent>
          <Mono>Secondary Master: history.db </Mono>
          <Mono $c={GREEN}>OK</Mono>
        </Indent>
      </Block>

      <Block>
        <Row>
          <Mono>Loading habit kernel.....</Mono>
          <Mono $c={GREEN}>[OK]</Mono>
        </Row>
        <Row>
          <Mono>Mounting /home/voce....</Mono>
          <Mono $c={GREEN}>[OK]</Mono>
        </Row>
        <Row>
          <Mono>Scheduling notifications</Mono>
          <Mono $c={GREEN}>[OK]</Mono>
        </Row>
        <Row>
          <Mono>Initializing streaks....</Mono>
          <Mono $c={AMBER}>[8 ativos]</Mono>
        </Row>
      </Block>

      <PressBlock>
        <Row>
          <Mono $c={WHITE}>Press </Mono>
          <KeyCap>
            <Mono $c="#000000">DEL</Mono>
          </KeyCap>
          <Mono $c={WHITE}> to enter SETUP, </Mono>
          <KeyCap>
            <Mono $c="#000000">F2</Mono>
          </KeyCap>
          <Mono $c={WHITE}> to start day</Mono>
        </Row>
        <Mono style={{ marginTop: 8 }}>
          05/18/2026-AwardBIOS-Habit95-W83977EF-6A69KP9AC-00
        </Mono>
      </PressBlock>

      <Cursor>
        <Mono>{'C:\\HABITS>_'}</Mono>
      </Cursor>
    </Root>
  );
}
