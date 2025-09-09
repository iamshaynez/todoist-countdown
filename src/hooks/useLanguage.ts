import { useLanguageContext } from '../contexts/LanguageContext';

/**
 * Custom hook for accessing language context
 * This is a wrapper around useLanguageContext for backward compatibility
 */
export const useLanguage = () => {
  return useLanguageContext();
};