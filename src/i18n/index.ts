
import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';

export type Language = 'en' | 'es';

export const translations = {
  en: enTranslations,
  es: esTranslations
};

export const defaultLanguage: Language = 'en';

export const getTranslation = (
  key: string, 
  language: Language = defaultLanguage,
  params?: Record<string, string | number>
): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // Replace parameters
  if (params) {
    let result = value;
    Object.entries(params).forEach(([param, val]) => {
      result = result.replace(new RegExp(`{{${param}}}`, 'g'), String(val));
    });
    return result;
  }
  
  return value;
};
