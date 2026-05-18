import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';
import { ColorDepth } from '@/shared/context/SettingsContext/types';
import {
  Bezel,
  Win95Button,
  Win95DialogShell,
  Win95GroupBox,
  Win95Radio,
  Win95Select,
  Win95Text,
} from '@/shared/components/win95';
import { IconMonitor } from '@/shared/components/icons';
import { useSettings } from '@/shared/context/SettingsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import {
  BsodPreview,
  BsodTag,
  Footer,
  Led,
  MonitorBezel,
  MonitorWrap,
  Row,
  Slider,
  SliderHit,
  SliderThumb,
  SliderTrack,
  Stand,
} from './styles';

export function DisplayDialog() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { brightness, setBrightness, colorDepth, setColorDepth } = useSettings();
  const [resolution, setResolution] = useState('iphone');
  const [trackWidth, setTrackWidth] = useState(0);

  function onTrackLayout(e: LayoutChangeEvent) {
    setTrackWidth(e.nativeEvent.layout.width);
  }

  function tapSlider(x: number) {
    if (trackWidth <= 0) return;
    const pct = Math.round((x / trackWidth) * 100);
    setBrightness(Math.max(0, Math.min(100, pct)));
  }

  function nudge(delta: number) {
    setBrightness(Math.max(0, Math.min(100, brightness + delta)));
  }

  return (
    <Win95DialogShell
      title={t('cfg.display.title')}
      icon={<IconMonitor size={14} />}
      testID="dialog-display"
    >
      <MonitorWrap>
        <MonitorBezel>
          <BsodPreview>
            <BsodTag>
              <Win95Text bold color="#0000aa" variant="caption">
                Habit Manager
              </Win95Text>
            </BsodTag>
            <Win95Text mono color="#ffffff" variant="caption">
              {t('cfg.display.previewBsod')}
            </Win95Text>
            <Win95Text mono color="#ffffff" variant="caption">
              STOP: 0x000000C0
            </Win95Text>
            <Win95Text mono color="#ffffff" variant="caption">
              Press any habit_
            </Win95Text>
          </BsodPreview>
          <Led />
        </MonitorBezel>
        <Stand />
      </MonitorWrap>

      <Win95GroupBox title={t('cfg.display.brightness')}>
        <Row>
          <View style={{ width: 70 }}>
            <Win95Text variant="caption">
              {t('cfg.display.brightnessLabel')}
            </Win95Text>
          </View>
          <Slider>
            <SliderHit
              onLayout={onTrackLayout}
              onPress={(e) => tapSlider(e.nativeEvent.locationX)}
              testID="brightness-track"
            >
              <SliderTrack />
              <SliderThumb style={{ left: `${brightness}%` }} />
            </SliderHit>
          </Slider>
          <View style={{ flexDirection: 'row', marginLeft: 6 }}>
            <Pressable
              onPress={() => nudge(-10)}
              testID="brightness-down"
              style={{ marginRight: 2 }}
            >
              <Bezel variant="raised">
                <View
                  style={{
                    width: 22,
                    height: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Win95Text bold>−</Win95Text>
                </View>
              </Bezel>
            </Pressable>
            <Pressable onPress={() => nudge(10)} testID="brightness-up">
              <Bezel variant="raised">
                <View
                  style={{
                    width: 22,
                    height: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Win95Text bold>+</Win95Text>
                </View>
              </Bezel>
            </Pressable>
          </View>
          <View style={{ width: 44, alignItems: 'flex-end' }}>
            <Win95Text mono>{brightness}%</Win95Text>
          </View>
        </Row>

        <Row style={{ marginTop: 8 }}>
          <View style={{ width: 70 }}>
            <Win95Text variant="caption">{t('cfg.display.colors')}</Win95Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {(['16', '256', 'true'] as ColorDepth[]).map((value) => (
              <View
                key={value}
                style={{
                  marginRight: value === 'true' ? 0 : 8,
                  marginBottom: 2,
                }}
              >
                <Win95Radio
                  checked={colorDepth === value}
                  onSelect={() => setColorDepth(value)}
                  label={t(`cfg.display.colors.${value}` as const)}
                  testID={`color-depth-${value}`}
                />
              </View>
            ))}
          </View>
        </Row>
      </Win95GroupBox>

      <View style={{ marginTop: 8 }}>
        <Win95GroupBox title={t('cfg.display.resolution')}>
          <Row>
            <View style={{ flex: 1 }}>
              <Win95Text variant="caption">{t('cfg.display.area')}</Win95Text>
            </View>
            <View style={{ width: 170 }}>
              <Win95Select
                value={resolution}
                onChange={setResolution}
                options={[
                  { value: 'iphone', label: '390 × 844 (iPhone)' },
                  { value: 'vga', label: '640 × 480 (VGA)' },
                  { value: 'svga', label: '800 × 600 (SVGA)' },
                ]}
              />
            </View>
          </Row>
        </Win95GroupBox>
      </View>

      <Footer>
        <Win95Button
          label={t('btn.ok')}
          primary
          onPress={() => navigation.goBack()}
          style={{ marginRight: 4 }}
        />
        <Win95Button
          label={t('btn.cancel')}
          onPress={() => navigation.goBack()}
          style={{ marginRight: 4 }}
        />
        <Win95Button label={t('btn.apply')} />
      </Footer>
    </Win95DialogShell>
  );
}
