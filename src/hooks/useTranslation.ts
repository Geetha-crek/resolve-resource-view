
import { useState, useEffect } from 'react';
import { Language, defaultLanguage, getTranslation } from '../i18n';

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or use default
    const saved = localStorage.getItem('app-language');
    return (saved as Language) || defaultLanguage;
  });

  useEffect(() => {
    // Save language to localStorage when it changes
    localStorage.setItem('app-language', language);
  }, [language]);

  const t = (key: string, params?: Record<string, string | number>) => {
    return getTranslation(key, language, params);
  };

  return {
    t,
    language,
    setLanguage,
    availableLanguages: ['en', 'es'] as Language[]
  };
};
