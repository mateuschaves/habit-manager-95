import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Win95Window } from '../Win95Window';
import { Backdrop, Dialog, Shadow } from './styles';

interface Win95DialogShellProps {
  title: string;
  icon?: React.ReactNode;
  /** Top offset for the dialog inside the screen (px). Default 84. */
  top?: number;
  /** When false, render children directly without an inner ScrollView. */
  scroll?: boolean;
  children?: React.ReactNode;
  testID?: string;
}

/**
 * Modal dialog used by Control Panel sub-screens. Rendered above the
 * SettingsScreen via React Navigation's `transparentModal` presentation —
 * the underlying Painel de Controle stays visible behind a dimmed sheet,
 * mimicking the classic Win95 modal Property dialog pattern.
 */
export function Win95DialogShell({
  title,
  icon,
  top = 84,
  scroll = true,
  children,
  testID,
}: Win95DialogShellProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const close = () => navigation.goBack();

  return (
    <Backdrop testID={testID}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('btn.cancel')}
        onPress={close}
        style={{ flex: 1 }}
      />
      <Shadow style={{ top: top + insets.top }}>
        <Dialog>
          <Win95Window
            title={title}
            icon={icon}
            controls={['close']}
            onClose={close}
            bodyStyle={{ padding: 8 }}
          >
            {scroll ? (
              <ScrollView style={{ maxHeight: 620 }}>
                <View>{children}</View>
              </ScrollView>
            ) : (
              children
            )}
          </Win95Window>
        </Dialog>
      </Shadow>
    </Backdrop>
  );
}
