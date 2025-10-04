/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { getCookie, setCookie } from '../utils/cookies';

type CookiePreferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

type PersistedConsent = CookiePreferences & {
  version: string;
  updatedAt: string;
};

const COOKIE_NAME = 'pionio-cookie-consent';
const CONSENT_VERSION = '1.0.0';
const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false
};

interface CookieConsentContextValue {
  preferences: CookiePreferences;
  consentGiven: boolean;
  shouldShowBanner: boolean;
  isManagingPreferences: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  updatePreferences: (prefs: Pick<CookiePreferences, 'analytics' | 'marketing'>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined);

const mergeWithDefaults = (prefs: Partial<CookiePreferences> | null | undefined): CookiePreferences => ({
  ...DEFAULT_PREFERENCES,
  ...prefs,
  essential: true
});

const loadStoredPreferences = (): CookiePreferences | null => {
  try {
    const raw = getCookie(COOKIE_NAME);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedConsent | CookiePreferences;
    if ('version' in parsed && parsed.version !== CONSENT_VERSION) {
      return null;
    }
    return mergeWithDefaults(parsed as Partial<CookiePreferences>);
  } catch (error) {
    console.warn('Unable to parse stored cookie consent preferences', error);
    return null;
  }
};

const persistPreferences = (prefs: CookiePreferences) => {
  const payload: PersistedConsent = {
    ...prefs,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString()
  };
  setCookie(COOKIE_NAME, JSON.stringify(payload));
};

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [consentGiven, setConsentGiven] = useState(false);
  const [shouldShowBanner, setShouldShowBanner] = useState(false);
  const [isManagingPreferences, setIsManagingPreferences] = useState(false);

  useEffect(() => {
    const storedPrefs = loadStoredPreferences();
    if (storedPrefs) {
      setPreferences(storedPrefs);
      setConsentGiven(true);
      setShouldShowBanner(false);
    } else {
      setShouldShowBanner(true);
    }
  }, []);

  const commitPreferences = useCallback((prefs: CookiePreferences, hideBanner = true) => {
    setPreferences(prefs);
    persistPreferences(prefs);
    setConsentGiven(true);
    if (hideBanner) {
      setShouldShowBanner(false);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const accepted = mergeWithDefaults({ analytics: true, marketing: true });
    commitPreferences(accepted);
    setIsManagingPreferences(false);
  }, [commitPreferences]);

  const rejectNonEssential = useCallback(() => {
    const rejected = mergeWithDefaults({ analytics: false, marketing: false });
    commitPreferences(rejected);
    setIsManagingPreferences(false);
  }, [commitPreferences]);

  const updatePreferences = useCallback((prefs: Pick<CookiePreferences, 'analytics' | 'marketing'>) => {
    const merged = mergeWithDefaults(prefs);
    commitPreferences(merged);
    setIsManagingPreferences(false);
  }, [commitPreferences]);

  const openPreferences = useCallback(() => {
    setIsManagingPreferences(true);
    setShouldShowBanner(false);
  }, []);

  const closePreferences = useCallback(() => {
    setIsManagingPreferences(false);
    if (!consentGiven) {
      setShouldShowBanner(true);
    }
  }, [consentGiven]);

  const value = useMemo<CookieConsentContextValue>(() => ({
    preferences,
    consentGiven,
    shouldShowBanner,
    isManagingPreferences,
    acceptAll,
    rejectNonEssential,
    updatePreferences,
    openPreferences,
    closePreferences
  }), [acceptAll, closePreferences, consentGiven, isManagingPreferences, openPreferences, preferences, rejectNonEssential, shouldShowBanner, updatePreferences]);

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
