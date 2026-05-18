import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DEFAULT_SETTINGS, SettingsContextValue, SettingsState } from './types';

const STORAGE_KEY = '@hm95/settings';

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
  /** Test seam: skip AsyncStorage and start from these values. */
  initialState?: Partial<SettingsState>;
}

export function SettingsProvider({ children, initialState }: ProviderProps) {
  const [state, setState] = useState<SettingsState>({
    ...DEFAULT_SETTINGS,
    ...initialState,
  });
  const [loading, setLoading] = useState(!initialState);

  useEffect(() => {
    if (initialState) return;
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (active && raw) {
          setState((prev) => ({ ...prev, ...JSON.parse(raw) }));
        }
      })
      .catch(() => undefined)
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [initialState]);

  const persist = useCallback((next: SettingsState) => {
    setState(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => undefined);
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({
      ...state,
      loading,
      setPalette: (palette) => persist({ ...state, palette }),
      setLanguage: (language) => persist({ ...state, language }),
      setNotifyLate: (notifyLate) => persist({ ...state, notifyLate }),
      setBrightness: (brightness) =>
        persist({
          ...state,
          brightness: Math.max(0, Math.min(100, Math.round(brightness))),
        }),
      setColorDepth: (colorDepth) => persist({ ...state, colorDepth }),
      completeOnboarding: () => persist({ ...state, onboarded: true }),
      resetSettings: () => persist({ ...DEFAULT_SETTINGS, onboarded: true }),
    }),
    [state, loading, persist]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
}

export type { SettingsContextValue, SettingsState } from './types';
