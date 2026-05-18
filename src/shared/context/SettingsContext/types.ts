import { Language } from '@/shared/i18n';
import { PaletteName } from '@/shared/theme';

export type ColorDepth = '16' | '256' | 'true';

export interface SettingsState {
  palette: PaletteName;
  language: Language;
  notifyLate: boolean;
  onboarded: boolean;
  /** Display brightness, 0–100. Drives the app-level dimming overlay. */
  brightness: number;
  /** Win95-style color depth knob. Maps to a desaturation/vivid overlay. */
  colorDepth: ColorDepth;
}

export interface SettingsContextValue extends SettingsState {
  loading: boolean;
  setPalette: (palette: PaletteName) => void;
  setLanguage: (language: Language) => void;
  setNotifyLate: (value: boolean) => void;
  setBrightness: (value: number) => void;
  setColorDepth: (value: ColorDepth) => void;
  completeOnboarding: () => void;
  resetSettings: () => void;
}

export const DEFAULT_SETTINGS: SettingsState = {
  palette: 'classic',
  language: 'pt-BR',
  notifyLate: true,
  onboarded: false,
  brightness: 100,
  colorDepth: '256',
};
