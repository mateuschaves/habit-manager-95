import { act, renderHook, waitFor } from '@testing-library/react-native';
import React from 'react';
import { SettingsProvider, useSettings } from '../SettingsContext';

function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider initialState={{ palette: 'classic', language: 'pt-BR' }}>
      {children}
    </SettingsProvider>
  );
}

describe('SettingsContext', () => {
  it('exposes defaults merged with initialState', () => {
    const { result } = renderHook(() => useSettings(), { wrapper });
    expect(result.current.palette).toBe('classic');
    expect(result.current.language).toBe('pt-BR');
    expect(result.current.notifyLate).toBe(true);
    expect(result.current.onboarded).toBe(false);
  });

  it('updates palette and language', async () => {
    const { result } = renderHook(() => useSettings(), { wrapper });
    act(() => result.current.setPalette('hotdog'));
    await waitFor(() => expect(result.current.palette).toBe('hotdog'));
    act(() => result.current.setLanguage('en-US'));
    await waitFor(() => expect(result.current.language).toBe('en-US'));
  });

  it('completes onboarding', async () => {
    const { result } = renderHook(() => useSettings(), { wrapper });
    act(() => result.current.completeOnboarding());
    await waitFor(() => expect(result.current.onboarded).toBe(true));
  });

  it('throws when used outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useSettings())).toThrow(
      /must be used within a SettingsProvider/
    );
    spy.mockRestore();
  });
});
