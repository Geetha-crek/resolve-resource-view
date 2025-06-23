
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '../hooks/useTranslation';
import { Language } from '../i18n';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, availableLanguages } = useTranslation();

  const languageNames = {
    en: 'English',
    es: 'Español'
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {availableLanguages.map((lang) => (
          <SelectItem key={lang} value={lang}>
            {languageNames[lang]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
