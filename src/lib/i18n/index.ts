import { Language, Translations, LanguageConfig } from '../../types/i18n';
import { en } from './en';
import { zh } from './zh';

// Available languages configuration
export const languages: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳'
  }
];

// Translations map
export const translations: Record<Language, Translations> = {
  en,
  zh
};

// Get translation by language code
export const getTranslations = (language: Language): Translations => {
  return translations[language] || translations.en;
};

// Get language config by code
export const getLanguageConfig = (language: Language): LanguageConfig => {
  return languages.find(lang => lang.code === language) || languages[0];
};

// Default language
export const DEFAULT_LANGUAGE: Language = 'en';