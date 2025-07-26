'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="min-w-[50px] font-medium"
    >
      {language === 'en' ? 'EN' : 'FR'}
    </Button>
  );
} 