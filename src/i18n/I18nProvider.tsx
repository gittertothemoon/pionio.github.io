import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, Locale } from './translations';

type Dict = typeof translations['it'];
interface I18nContextValue {
  locale: Locale;
  t: Dict;
  switchLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('it');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (stored === 'it' || stored === 'en') setLocale(stored);
  }, []);

  const switchLocale = useCallback((l: Locale) => {
    setLocale(l);
    localStorage.setItem('locale', l);
  }, []);

  const value: I18nContextValue = {
    locale,
    t: translations[locale],
    switchLocale
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n deve essere usato dentro I18nProvider');
  return ctx;
}
