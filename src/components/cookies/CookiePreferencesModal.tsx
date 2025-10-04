import React, { useEffect, useState } from 'react';
import { useCookieConsent } from '../../contexts/CookieConsentContext';
import { useI18n } from '../../i18n/I18nProvider';

type ToggleKey = 'analytics' | 'marketing';

const toggleStyles = (active: boolean) =>
  `relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
    active ? 'bg-emerald-400/90' : 'bg-gray-700'
  }`;

const knobStyles = (active: boolean) =>
  `inline-block h-5 w-5 transform rounded-full bg-black shadow-md transition-transform duration-300 ${
    active ? 'translate-x-5' : 'translate-x-1'
  }`;

export const CookiePreferencesModal: React.FC = () => {
  const { t } = useI18n();
  const {
    isManagingPreferences,
    closePreferences,
    preferences,
    updatePreferences,
    acceptAll,
    rejectNonEssential
  } = useCookieConsent();

  const [localPrefs, setLocalPrefs] = useState({
    analytics: preferences.analytics,
    marketing: preferences.marketing
  });

  useEffect(() => {
    if (!isManagingPreferences) return;
    setLocalPrefs({
      analytics: preferences.analytics,
      marketing: preferences.marketing
    });
  }, [isManagingPreferences, preferences.analytics, preferences.marketing]);

  useEffect(() => {
    if (!isManagingPreferences) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePreferences();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isManagingPreferences, closePreferences]);

  useEffect(() => {
    if (!isManagingPreferences || typeof document === 'undefined') return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isManagingPreferences]);

  if (!isManagingPreferences) return null;

  const togglePreference = (key: ToggleKey) => {
    setLocalPrefs((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    updatePreferences(localPrefs);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden
        onClick={closePreferences}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
        className="relative z-10 w-full max-w-2xl rounded-3xl border border-emerald-500/25 bg-black/95 p-8 shadow-2xl shadow-emerald-500/20"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 id="cookie-preferences-title" className="text-xl font-semibold text-white">
              {t.cookies.modalTitle}
            </h2>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              {t.cookies.modalDescription}
            </p>
          </div>
          <button
            type="button"
            onClick={closePreferences}
            className="rounded-full border border-gray-700/60 p-2 text-gray-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label={t.cookies.close}
          >
            <span aria-hidden className="text-lg leading-none">×</span>
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <section className="rounded-2xl border border-gray-800/80 bg-black/70 p-5">
            <header className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {t.cookies.categories.essential.title}
                </h3>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                  {t.cookies.categories.essential.description}
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                {t.cookies.required}
              </span>
            </header>
          </section>

          <section className="rounded-2xl border border-gray-800/80 bg-black/70 p-5">
            <header className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {t.cookies.categories.analytics.title}
                </h3>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                  {t.cookies.categories.analytics.description}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={localPrefs.analytics}
                onClick={() => togglePreference('analytics')}
                className={toggleStyles(localPrefs.analytics)}
              >
                <span className={knobStyles(localPrefs.analytics)} />
              </button>
            </header>
          </section>

          <section className="rounded-2xl border border-gray-800/80 bg-black/70 p-5">
            <header className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {t.cookies.categories.marketing.title}
                </h3>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                  {t.cookies.categories.marketing.description}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={localPrefs.marketing}
                onClick={() => togglePreference('marketing')}
                className={toggleStyles(localPrefs.marketing)}
              >
                <span className={knobStyles(localPrefs.marketing)} />
              </button>
            </header>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={rejectNonEssential}
              className="rounded-xl border border-gray-700/70 px-4 py-2.5 text-sm font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {t.cookies.rejectAll}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-xl border border-transparent bg-emerald-400/90 px-4 py-2.5 text-sm font-semibold text-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {t.cookies.acceptAll}
            </button>
          </div>
          <div className="flex flex-1 justify-end gap-3">
            <button
              type="button"
              onClick={closePreferences}
              className="rounded-xl border border-transparent px-4 py-2.5 text-sm font-semibold text-gray-400 transition hover:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {t.cookies.close}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {t.cookies.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesModal;
