import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95DialogShell,
  Win95GroupBox,
  Win95Select,
  Win95Tabs,
  Win95TabPane,
  Win95Text,
} from '@/shared/components/win95';
import { IconMonitor } from '@/shared/components/icons';
import { useSettings } from '@/shared/context/SettingsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { PALETTE_LABELS, PaletteName, palettes } from '@/shared/theme';
import {
  Footer,
  ItemField,
  ItemGrid,
  ItemLabel,
  ItemValue,
  Monitor,
  MonitorBase,
  MonitorPreview,
  MonitorStand,
  PreviewBar,
  PreviewBg,
  PreviewBody,
  PreviewLine,
  PreviewTaskbar,
  PreviewWindow,
  Swatch,
  ThemeName,
  ThemeRow,
  ThemeTile,
} from './styles';

export function AppearanceDialog() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { palette, setPalette } = useSettings();
  const [tab, setTab] = useState(1);

  const paletteNames = Object.keys(PALETTE_LABELS) as PaletteName[];
  const active = palettes[palette];

  return (
    <Win95DialogShell
      title={t('cfg.appearance.title')}
      icon={<IconMonitor size={14} />}
      testID="dialog-appearance"
    >
      <Win95Tabs
        tabs={[
          t('cfg.appearance.tab.bg'),
          t('cfg.appearance.tab.scheme'),
          t('cfg.appearance.tab.settings'),
        ]}
        active={tab}
        onChange={setTab}
      />
      <Win95TabPane>
        {/* Mini monitor preview */}
        <MonitorPreview>
          <Monitor>
            <PreviewBg style={{ backgroundColor: active.desktop }}>
              <PreviewBar style={{ backgroundColor: active.desktop }} />
              <PreviewWindow style={{ backgroundColor: active.surface }}>
                <PreviewBar
                  style={{ backgroundColor: active.titleBar, height: 6 }}
                />
                <PreviewBody>
                  <PreviewLine />
                  <PreviewLine style={{ width: '70%' }} />
                  <PreviewLine style={{ width: '40%' }} />
                </PreviewBody>
              </PreviewWindow>
              <PreviewTaskbar style={{ backgroundColor: active.surface }} />
            </PreviewBg>
          </Monitor>
          <MonitorBase />
          <MonitorStand />
        </MonitorPreview>

        <Win95GroupBox title={t('cfg.appearance.scheme')}>
          <Win95Select
            value={palette}
            onChange={(v) => setPalette(v as PaletteName)}
            options={paletteNames.map((p) => ({
              value: p,
              label: PALETTE_LABELS[p],
            }))}
            testID="appearance-scheme"
          />

          <ThemeRow>
            {paletteNames.map((p) => {
              const pl = palettes[p];
              const isActive = p === palette;
              return (
                <ThemeTile
                  key={p}
                  $active={isActive}
                  onPress={() => setPalette(p)}
                  testID={`appearance-theme-${p}`}
                >
                  <Swatch style={{ backgroundColor: pl.desktop }} />
                  <ThemeName>
                    <Win95Text
                      variant="caption"
                      color={isActive ? '#ffffff' : undefined}
                    >
                      {PALETTE_LABELS[p]}
                    </Win95Text>
                  </ThemeName>
                </ThemeTile>
              );
            })}
          </ThemeRow>
        </Win95GroupBox>

        <View style={{ marginTop: 8 }}>
          <Win95GroupBox title={t('cfg.appearance.item')}>
            <ItemGrid>
              <ItemLabel>
                <Win95Text variant="caption">
                  {t('cfg.appearance.itemLabel')}
                </Win95Text>
              </ItemLabel>
              <ItemValue>
                <Win95Select
                  value="titleBarActive"
                  onChange={() => undefined}
                  options={[
                    {
                      value: 'titleBarActive',
                      label: t('cfg.appearance.titleBarActive'),
                    },
                    {
                      value: 'titleBarInactive',
                      label: t('cfg.appearance.titleBarInactive'),
                    },
                    { value: 'menuBar', label: t('cfg.appearance.menuBar') },
                  ]}
                />
              </ItemValue>

              <ItemLabel>
                <Win95Text variant="caption">
                  {t('cfg.appearance.size')}
                </Win95Text>
              </ItemLabel>
              <ItemField>
                <Win95Text mono>18</Win95Text>
              </ItemField>

              <ItemLabel>
                <Win95Text variant="caption">
                  {t('cfg.appearance.color1')}
                </Win95Text>
              </ItemLabel>
              <ItemValue style={{ flexDirection: 'row' }}>
                <Bezel variant="raised">
                  <View
                    style={{
                      width: 48,
                      height: 22,
                      backgroundColor: active.titleBar,
                    }}
                  />
                </Bezel>
              </ItemValue>

              <ItemLabel>
                <Win95Text variant="caption">
                  {t('cfg.appearance.color2')}
                </Win95Text>
              </ItemLabel>
              <ItemValue style={{ flexDirection: 'row' }}>
                <Bezel variant="raised">
                  <View
                    style={{
                      width: 48,
                      height: 22,
                      backgroundColor: active.titleBar2,
                    }}
                  />
                </Bezel>
              </ItemValue>
            </ItemGrid>
          </Win95GroupBox>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 8,
          }}
        >
          <Win95Button
            label={t('cfg.appearance.saveAs')}
            style={{ marginRight: 4 }}
          />
          <Win95Button label={t('btn.delete')} />
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
