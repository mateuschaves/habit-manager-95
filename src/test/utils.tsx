import {
  NavigationContainer,
} from '@react-navigation/native';
import { render, RenderOptions } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { HabitsProvider } from '@/shared/context/HabitsContext';
import { SettingsProvider } from '@/shared/context/SettingsContext';
import { MemoryHabitStore } from '@/shared/db';
import { Language } from '@/shared/i18n';
import { buildTheme, PaletteName } from '@/shared/theme';
import { Completion, Habit } from '@/shared/types/habit';

interface ProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  palette?: PaletteName;
  language?: Language;
  store?: MemoryHabitStore;
  today?: string;
  withHabits?: boolean;
  withNavigation?: boolean;
}

export function makeStore(seed?: {
  habits?: Habit[];
  completions?: Completion[];
}): MemoryHabitStore {
  return new MemoryHabitStore(seed);
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    palette = 'classic',
    language = 'pt-BR',
    store,
    today,
    withHabits = false,
    withNavigation = false,
    ...options
  }: ProvidersOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    let tree = <>{children}</>;
    if (withHabits) {
      tree = (
        <HabitsProvider store={store ?? makeStore()} today={today}>
          {tree}
        </HabitsProvider>
      );
    }
    if (withNavigation) {
      tree = <NavigationContainer>{tree}</NavigationContainer>;
    }
    return (
      <SafeAreaProvider>
        <SettingsProvider initialState={{ palette, language }}>
          <ThemeProvider theme={buildTheme(palette)}>{tree}</ThemeProvider>
        </SettingsProvider>
      </SafeAreaProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}

export const sampleHabit = (over: Partial<Habit> = {}): Habit => ({
  id: 'h1',
  name: 'hidratar',
  iconKey: 'water',
  frequency: 'daily',
  weeklyTarget: 3,
  days: [],
  reminderTime: null,
  goalAmount: 8,
  goalUnit: 'copos',
  notifyIfLate: true,
  createdAt: '2026-01-01T00:00:00.000Z',
  archived: false,
  ...over,
});
