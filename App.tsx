import { useFonts } from 'expo-font';
import {
  PixelifySans_400Regular,
  PixelifySans_700Bold,
} from '@expo-google-fonts/pixelify-sans';
import { VT323_400Regular } from '@expo-google-fonts/vt323';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { HabitsProvider } from '@/shared/context/HabitsContext';
import {
  SettingsProvider,
  useSettings,
} from '@/shared/context/SettingsContext';
import {
  configureNotifications,
  ensurePermissions,
} from '@/shared/notifications';
import { buildTheme } from '@/shared/theme';
import { RootNavigator } from '@/navigation';

function ThemedApp() {
  const { palette, brightness, colorDepth } = useSettings();
  const theme = buildTheme(palette);
  // Brightness 0–100 maps to a dim overlay opacity. Cap at 0.7 so the UI
  // is always at least legible — same vibe as the Win95 brightness knob.
  const dimOpacity = Math.max(0, Math.min(0.7, (100 - brightness) / 100 * 0.7));
  // Color-depth knob: 16 mutes saturation (gray haze), True Color adds a
  // faint cyan vibrancy. 256 is the natural baseline (no overlay).
  const colorOverlay =
    colorDepth === '16'
      ? 'rgba(128, 128, 128, 0.35)'
      : colorDepth === 'true'
      ? 'rgba(0, 200, 255, 0.06)'
      : null;
  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1, backgroundColor: theme.colors.desktop }}>
        <StatusBar style="light" />
        <HabitsProvider>
          <RootNavigator />
        </HabitsProvider>
        {colorOverlay ? (
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: colorOverlay,
            }}
          />
        ) : null}
        {dimOpacity > 0 ? (
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: `rgba(0, 0, 0, ${dimOpacity})`,
            }}
          />
        ) : null}
      </View>
    </ThemeProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    PixelifySans_400Regular,
    PixelifySans_700Bold,
    VT323_400Regular,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await configureNotifications();
        if (!cancelled) await ensurePermissions();
      } catch {
        // No-op: notifications are best-effort. The app works without them.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#008080' }} />;
  }

  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <ThemedApp />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
