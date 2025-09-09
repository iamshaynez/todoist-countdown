import { useState, useEffect } from 'react';
import { Language, Translations } from '../types/i18n';
import { getTranslations, DEFAULT_LANGUAGE } from '../lib/i18n';
import { getCookie, setCookie } from '../lib/cookie';

const LANGUAGE_COOKIE_KEY = 'todoist_countdown_language';

/**
 * Custom hook for managing language state and translations
 * Handles language switching and persistence via cookies
 */
export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from cookie or use default
    const savedLanguage = getCookie(LANGUAGE_COOKIE_KEY) as Language;
    return savedLanguage && ['en', 'zh'].includes(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;
  });

  const [translations, setTranslations] = useState<Translations>(() => {
    return getTranslations(language);
  });

  // Update translations when language changes
  useEffect(() => {
    setTranslations(getTranslations(language));
  }, [language]);

  /**
   * Change the current language and save to cookie
   */
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    setCookie(LANGUAGE_COOKIE_KEY, newLanguage, 365); // Save for 1 year
  };

  /**
   * Get translation text by key with fallback
   */
  const t = (key: keyof Translations): string => {
    return translations[key] || key;
  };

  return {
    language,
    setLanguage,
    translations,
    t
  };
};