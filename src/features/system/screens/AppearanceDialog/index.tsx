import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95DialogShell,
  Win95GroupBox,
  Win95Select,
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

  // Deferred-edit model: changes only land in the real theme on Apply/OK.
  const [draft, setDraft] = useState<PaletteName>(palette);
  const dirty = draft !== palette;

  const paletteNames = Object.keys(PALETTE_LABELS) as PaletteName[];
  const preview = palettes[draft];

  function apply() {
    if (dirty) setPalette(draft);
  }

  function ok() {
    apply();
    navigation.goBack();
  }

  function cancel() {
    setDraft(palette);
    navigation.goBack();
  }

  return (
    <Win95DialogShell
      title={t('cfg.appearance.title')}
      icon={<IconMonitor size={14} />}
      testID="dialog-appearance"
    >
      <MonitorPreview>
        <Monitor>
          <PreviewBg style={{ backgroundColor: preview.desktop }}>
            <PreviewBar style={{ backgroundColor: preview.desktop }} />
            <PreviewWindow style={{ backgroundColor: preview.surface }}>
              <PreviewBar
                style={{ backgroundColor: preview.titleBar, height: 6 }}
              />
              <PreviewBody>
                <PreviewLine />
                <PreviewLine style={{ width: '70%' }} />
                <PreviewLine style={{ width: '40%' }} />
              </PreviewBody>
            </PreviewWindow>
            <PreviewTaskbar style={{ backgroundColor: preview.surface }} />
          </PreviewBg>
        </Monitor>
        <MonitorBase />
        <MonitorStand />
      </MonitorPreview>

      <Win95GroupBox title={t('cfg.appearance.scheme')}>
        <Win95Select
          value={draft}
          onChange={(v) => setDraft(v as PaletteName)}
          options={paletteNames.map((p) => ({
            value: p,
            label: PALETTE_LABELS[p],
          }))}
          testID="appearance-scheme"
        />

        <ThemeRow>
          {paletteNames.map((p) => {
            const pl = palettes[p];
            const isActive = p === draft;
            return (
              <ThemeTile
                key={p}
                $active={isActive}
                onPress={() => setDraft(p)}
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
                    backgroundColor: preview.titleBar,
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
                    backgroundColor: preview.titleBar2,
                  }}
                />
              </Bezel>
            </ItemValue>
          </ItemGrid>
        </Win95GroupBox>
      </View>

      <Footer>
        <Win95Button
          label={t('btn.ok')}
          primary
          onPress={ok}
          style={{ marginRight: 4 }}
          testID="appearance-ok"
        />
        <Win95Button
          label={t('btn.cancel')}
          onPress={cancel}
          style={{ marginRight: 4 }}
          testID="appearance-cancel"
        />
        <Win95Button
          label={t('btn.apply')}
          disabled={!dirty}
          onPress={apply}
          testID="appearance-apply"
        />
      </Footer>
    </Win95DialogShell>
  );
}
