import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, ScrollView } from 'react-native';
import {
  Bezel,
  Win95Checkbox,
  Win95Desktop,
  Win95GroupBox,
  Win95Select,
  Win95Text,
  Win95Window,
} from '@/shared/components/win95';
import {
  IconBell,
  IconCalendar,
  IconExe,
  IconFloppy,
  IconGear,
  IconHelp,
  IconInfo,
  IconMonitor,
  IconTrash,
} from '@/shared/components/icons';
import { useHabits } from '@/shared/context/HabitsContext';
import { useSettings } from '@/shared/context/SettingsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { LANGUAGE_LABELS, Language } from '@/shared/i18n';
import { PALETTE_LABELS, PaletteName } from '@/shared/theme';
import { RootStackParamList } from '@/navigation/types';
import {
  Grid,
  GridWrap,
  Item,
  ItemLabel,
  Panel,
  PanelRow,
} from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function SettingsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const {
    palette,
    language,
    notifyLate,
    setPalette,
    setLanguage,
    setNotifyLate,
    resetSettings,
  } = useSettings();
  const { clearAll } = useHabits();

  function emptyRecycle() {
    Alert.alert(t('settings.resetTitle'), t('settings.resetConfirm'), [
      { text: t('btn.cancel'), style: 'cancel' },
      {
        text: t('btn.delete'),
        style: 'destructive',
        onPress: async () => {
          await clearAll();
          resetSettings();
          Alert.alert(t('settings.resetTitle'), t('settings.resetDone'));
        },
      },
    ]);
  }

  const items = [
    { icon: <IconBell size={32} />, label: t('settings.notifications') },
    { icon: <IconGear size={32} />, label: t('settings.appearance') },
    { icon: <IconFloppy size={32} />, label: t('settings.backup') },
    { icon: <IconCalendar size={32} />, label: t('settings.datetime') },
    { icon: <IconMonitor size={32} />, label: t('settings.screen') },
    {
      icon: <IconExe size={32} />,
      label: t('settings.addHabit'),
      onPress: () => navigation.navigate('RunDialog'),
    },
    {
      icon: <IconTrash size={32} />,
      label: t('settings.recycle'),
      onPress: emptyRecycle,
    },
    { icon: <IconHelp size={32} />, label: t('settings.help') },
    {
      icon: <IconInfo size={32} />,
      label: t('settings.about'),
      onPress: () => navigation.navigate('About'),
    },
  ];

  return (
    <Win95Desktop activeApp={t('settings.title')}>
      <Win95Window
        title={t('settings.title')}
        icon={<IconGear size={14} />}
        controls={['close']}
        onClose={() => navigation.goBack()}
        style={{ flex: 1 }}
        bodyStyle={{ flex: 1 }}
        testID="settings-window"
      >
        <ScrollView>
          <Bezel variant="inset">
            <GridWrap>
              <Grid>
                {items.map((it) => (
                  <Item
                    key={it.label}
                    onPress={it.onPress}
                    testID={`settings-item-${it.label}`}
                  >
                    {it.icon}
                    <ItemLabel>
                      <Win95Text variant="caption">{it.label}</Win95Text>
                    </ItemLabel>
                  </Item>
                ))}
              </Grid>
            </GridWrap>
          </Bezel>

          <Panel>
            <Win95GroupBox title={t('settings.appearance')}>
              <PanelRow>
                <Win95Text variant="caption" style={{ marginBottom: 2 }}>
                  {t('settings.theme')}
                </Win95Text>
                <Win95Select
                  value={palette}
                  onChange={(v) => setPalette(v as PaletteName)}
                  options={(
                    Object.keys(PALETTE_LABELS) as PaletteName[]
                  ).map((p) => ({ value: p, label: PALETTE_LABELS[p] }))}
                  testID="settings-theme"
                />
              </PanelRow>
              <PanelRow>
                <Win95Text variant="caption" style={{ marginBottom: 2 }}>
                  {t('settings.language')}
                </Win95Text>
                <Win95Select
                  value={language}
                  onChange={(v) => setLanguage(v as Language)}
                  options={(
                    Object.keys(LANGUAGE_LABELS) as Language[]
                  ).map((l) => ({ value: l, label: LANGUAGE_LABELS[l] }))}
                  testID="settings-language"
                />
              </PanelRow>
              <Win95Checkbox
                checked={notifyLate}
                onToggle={setNotifyLate}
                label={t('settings.notifyLate')}
                testID="settings-notify"
              />
            </Win95GroupBox>
          </Panel>
        </ScrollView>
      </Win95Window>
    </Win95Desktop>
  );
}
