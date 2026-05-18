import { Language } from '@/shared/i18n';
import { PaletteName } from '@/shared/theme';

export interface SettingsState {
  palette: PaletteName;
  language: Language;
  notifyLate: boolean;
  onboarded: boolean;
}

export interface SettingsContextValue extends SettingsState {
  loading: boolean;
  setPalette: (palette: PaletteName) => void;
  setLanguage: (language: Language) => void;
  setNotifyLate: (value: boolean) => void;
  completeOnboarding: () => void;
  resetSettings: () => void;
}

export const DEFAULT_SETTINGS: SettingsState = {
  palette: 'classic',
  language: 'pt-BR',
  notifyLate: true,
  onboarded: false,
};
