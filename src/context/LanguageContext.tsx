'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/translations';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { returnObjects?: boolean; [key: string]: any }) => string;
  tArray: (key: string) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const getValue = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  };

  const t = (key: string, options?: { [key: string]: any }) => {
    const value = getValue(key);
    
    if (typeof value === 'string') {
      // Replace any placeholders in the string with values from options
      return value.replace(/\{(\w+)\}/g, (match, key) => {
        return options?.[key]?.toString() || match;
      });
    }

    if (Array.isArray(value)) {
      return value.join(' ');
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return key;
  };

  const tArray = (key: string): string[] => {
    const value = getValue(key);
    if (Array.isArray(value)) {
      return value;
    }
    return [];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 