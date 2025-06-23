
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '../hooks/useTranslation';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, availableLanguages } = useTranslation();

  const languageNames = {
    en: 'English',
    es: 'Español'
  };

  return (
    <Select value={language} onValueChange={setLanguage}>
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
