import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations } from '../types/i18n';
import { getTranslations, DEFAULT_LANGUAGE } from '../lib/i18n';
import { getCookie, setCookie } from '../lib/cookie';

const LANGUAGE_COOKIE_KEY = 'todoist_countdown_language';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * Language context provider that manages global language state
 * Ensures all components share the same language state and update together
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
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

  const value: LanguageContextType = {
    language,
    setLanguage,
    translations,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook to use the language context
 * Throws an error if used outside of LanguageProvider
 */
export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};