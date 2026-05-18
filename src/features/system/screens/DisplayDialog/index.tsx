import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95Checkbox,
  Win95DialogShell,
  Win95GroupBox,
  Win95Radio,
  Win95Select,
  Win95Tabs,
  Win95TabPane,
  Win95Text,
} from '@/shared/components/win95';
import { IconMonitor } from '@/shared/components/icons';
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
  SliderTrack,
  SliderTrackInner,
  SliderThumb,
  Spinner,
  SpinnerLine,
  Stand,
} from './styles';

export function DisplayDialog() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [tab, setTab] = useState(1);
  const [colors, setColors] = useState<'16' | '256' | 'true'>('256');
  const [waitMin, setWaitMin] = useState('15');
  const [touchId, setTouchId] = useState(false);
  const [brightness] = useState(72);

  return (
    <Win95DialogShell
      title={t('cfg.display.title')}
      icon={<IconMonitor size={14} />}
      testID="dialog-display"
    >
      <Win95Tabs
        tabs={[
          t('cfg.display.tab.screen'),
          t('cfg.display.tab.protection'),
          t('cfg.display.tab.energy'),
        ]}
        active={tab}
        onChange={setTab}
      />
      <Win95TabPane>
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

        <Win95GroupBox title={t('cfg.display.protection')}>
          <Row>
            <View style={{ width: 70 }}>
              <Win95Text variant="caption">
                {t('cfg.display.protectionLabel')}
              </Win95Text>
            </View>
            <View style={{ flex: 1 }}>
              <Win95Select
                value="bsod"
                onChange={() => undefined}
                options={[
                  { value: 'bsod', label: t('cfg.display.screensaver') },
                  { value: 'none', label: '(Nenhum)' },
                ]}
              />
            </View>
            <View style={{ marginLeft: 4 }}>
              <Win95Button label={t('cfg.display.preview')} />
            </View>
          </Row>

          <Row style={{ marginTop: 6 }}>
            <View style={{ width: 70 }}>
              <Win95Text variant="caption">{t('cfg.display.wait')}</Win95Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Bezel variant="inset">
                <View
                  style={{
                    width: 40,
                    paddingVertical: 3,
                    paddingHorizontal: 6,
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Win95Text mono>{waitMin}</Win95Text>
                </View>
              </Bezel>
              <Spinner>
                <Bezel variant="raised">
                  <SpinnerLine>
                    <Win95Text variant="caption">▲</Win95Text>
                  </SpinnerLine>
                </Bezel>
                <Bezel variant="raised">
                  <SpinnerLine>
                    <Win95Text variant="caption">▼</Win95Text>
                  </SpinnerLine>
                </Bezel>
              </Spinner>
              <Win95Text variant="caption" style={{ marginLeft: 6, flex: 1 }}>
                {t('cfg.display.minutes')}
              </Win95Text>
            </View>
          </Row>

          <View style={{ marginTop: 6 }}>
            <Win95Checkbox
              checked={touchId}
              onToggle={setTouchId}
              label={t('cfg.display.touchId')}
            />
          </View>
        </Win95GroupBox>

        <View style={{ marginTop: 8 }}>
          <Win95GroupBox title={t('cfg.display.brightness')}>
            <Row>
              <View style={{ width: 70 }}>
                <Win95Text variant="caption">
                  {t('cfg.display.brightnessLabel')}
                </Win95Text>
              </View>
              <Slider>
                <SliderTrack>
                  <SliderTrackInner />
                </SliderTrack>
                <SliderThumb style={{ left: `${brightness}%` }} />
              </Slider>
              <Win95Text mono style={{ marginLeft: 6 }}>
                {brightness}%
              </Win95Text>
            </Row>

            <Row style={{ marginTop: 8 }}>
              <View style={{ width: 70 }}>
                <Win95Text variant="caption">
                  {t('cfg.display.colors')}
                </Win95Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={{ marginRight: 8 }}>
                  <Win95Radio
                    checked={colors === '16'}
                    onSelect={() => setColors('16')}
                    label={t('cfg.display.colors.16')}
                  />
                </View>
                <View style={{ marginRight: 8 }}>
                  <Win95Radio
                    checked={colors === '256'}
                    onSelect={() => setColors('256')}
                    label={t('cfg.display.colors.256')}
                  />
                </View>
                <Win95Radio
                  checked={colors === 'true'}
                  onSelect={() => setColors('true')}
                  label={t('cfg.display.colors.true')}
                />
              </View>
            </Row>
          </Win95GroupBox>
        </View>

        <View style={{ marginTop: 8 }}>
          <Win95GroupBox title={t('cfg.display.resolution')}>
            <Row>
              <View style={{ flex: 1 }}>
                <Win95Text variant="caption">
                  {t('cfg.display.area')}
                </Win95Text>
              </View>
              <View style={{ width: 170 }}>
                <Win95Select
                  value="iphone"
                  onChange={() => undefined}
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
      </Win95TabPane>
    </Win95DialogShell>
  );
}
