import { screen } from '@testing-library/react-native';
import React from 'react';
import { renderWithProviders } from '@/test/utils';
import { SplashScreen } from '../index';

const mockReset = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ reset: mockReset }),
}));

describe('SplashScreen', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    mockReset.mockClear();
  });

  it('renders the BIOS/POST boot screen exactly', () => {
    renderWithProviders(<SplashScreen />);
    expect(screen.getByText('Habit BIOS v4.51')).toBeTruthy();
    expect(
      screen.getByText('Copyright (C) 1995-2026, Habit Industries Inc.')
    ).toBeTruthy();
    expect(
      screen.getByText('Habit Manager 95 BIOS, Build 0518.2026')
    ).toBeTruthy();
    expect(screen.getByText('Main Processor: User Brain @ 1.0 wmps')).toBeTruthy();
    expect(screen.getByText('262144K OK')).toBeTruthy();
    expect(screen.getByText('(12 dias)')).toBeTruthy();
    expect(screen.getByText('[8 ativos]')).toBeTruthy();
    expect(screen.getByTestId('energy-star')).toBeTruthy();
    expect(screen.getByText('DEL')).toBeTruthy();
    expect(screen.getByText('F2')).toBeTruthy();
    expect(
      screen.getByText('05/18/2026-AwardBIOS-Habit95-W83977EF-6A69KP9AC-00')
    ).toBeTruthy();
    expect(screen.getByText('C:\\HABITS>_')).toBeTruthy();
  });
});
