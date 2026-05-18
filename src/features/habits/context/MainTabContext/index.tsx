import React, { createContext, useContext, useMemo, useState } from 'react';

export type MainTab = 'apps' | 'processes' | 'performance' | 'history';

export const MAIN_TABS: MainTab[] = [
  'apps',
  'processes',
  'performance',
  'history',
];

interface MainTabContextValue {
  tab: MainTab;
  index: number;
  setIndex: (index: number) => void;
  setTab: (tab: MainTab) => void;
}

const MainTabContext = createContext<MainTabContextValue | undefined>(undefined);

export function MainTabProvider({ children }: { children: React.ReactNode }) {
  // Default to "Processes" — the heart of the app (matches the design).
  const [index, setIndex] = useState(1);

  const value = useMemo<MainTabContextValue>(
    () => ({
      tab: MAIN_TABS[index],
      index,
      setIndex,
      setTab: (tab) => setIndex(MAIN_TABS.indexOf(tab)),
    }),
    [index]
  );

  return (
    <MainTabContext.Provider value={value}>{children}</MainTabContext.Provider>
  );
}

export function useMainTab(): MainTabContextValue {
  const ctx = useContext(MainTabContext);
  if (!ctx) {
    throw new Error('useMainTab must be used within a MainTabProvider');
  }
  return ctx;
}
