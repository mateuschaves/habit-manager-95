import { useFonts } from 'expo-font';
import {
  PixelifySans_400Regular,
  PixelifySans_700Bold,
} from '@expo-google-fonts/pixelify-sans';
import { VT323_400Regular } from '@expo-google-fonts/vt323';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { HabitsProvider } from '@/shared/context/HabitsContext';
import {
  SettingsProvider,
  useSettings,
} from '@/shared/context/SettingsContext';
import { buildTheme } from '@/shared/theme';
import { RootNavigator } from '@/navigation';

function ThemedApp() {
  const { palette } = useSettings();
  const theme = buildTheme(palette);
  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1, backgroundColor: theme.colors.desktop }}>
        <StatusBar style="light" />
        <HabitsProvider>
          <RootNavigator />
        </HabitsProvider>
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
