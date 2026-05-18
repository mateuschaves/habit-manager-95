import { enUS } from './locales/en-US';
import { ptBR, TranslationKey } from './locales/pt-BR';

export type Language = 'pt-BR' | 'en-US';
export type { TranslationKey };

const DICTIONARIES: Record<Language, Record<TranslationKey, string>> = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

export type TranslateParams = Record<string, string | number>;

export function translate(
  language: Language,
  key: TranslationKey,
  params?: TranslateParams
): string {
  const dict = DICTIONARIES[language] ?? DICTIONARIES['pt-BR'];
  let value = dict[key] ?? ptBR[key] ?? key;
  if (params) {
    for (const [name, raw] of Object.entries(params)) {
      value = value.replace(new RegExp(`\\{${name}\\}`, 'g'), String(raw));
    }
  }
  return value;
}

export const LANGUAGE_LABELS: Record<Language, string> = {
  'pt-BR': 'Português (BR)',
  'en-US': 'English (US)',
};
