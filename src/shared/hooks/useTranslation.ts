import { useCallback, useMemo } from 'react';
import { useSettings } from '@/shared/context/SettingsContext';
import { translate, TranslateParams, TranslationKey } from '@/shared/i18n';

export function useTranslation() {
  const { language } = useSettings();

  const t = useCallback(
    (key: TranslationKey, params?: TranslateParams) =>
      translate(language, key, params),
    [language]
  );

  return useMemo(() => ({ t, language }), [t, language]);
}
