import React from 'react';
import { useCookieConsent } from '../../contexts/CookieConsentContext';
import { useI18n } from '../../i18n/I18nProvider';
import { Icon } from '../ui/icons/Icon';

export const CookieBanner: React.FC = () => {
  const { t } = useI18n();
  const { shouldShowBanner, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();

  if (!shouldShowBanner) return null;

  return (
    <div className="fixed inset-x-4 bottom-6 z-50 flex justify-center">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-emerald-500/25 bg-zinc-950/95 px-6 py-6 backdrop-blur-xl shadow-[0_35px_70px_-35px_rgba(var(--accent-primary-rgb) / 0.65)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute right-2 top-3 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
          <div className="absolute inset-0 rounded-[32px] border border-emerald-500/10" />
        </div>
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-4 text-sm text-brand-100 md:flex-row md:items-start md:gap-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 shadow-inner shadow-emerald-500/40">
              <Icon name="chart" size={22} className="text-emerald-300" />
            </span>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/90">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
                  {t.footer.cookies}
                </span>
                <span className="text-brand-100 opacity-70 normal-case tracking-normal">
                  {t.cookies.required} · {t.cookies.categories.analytics.title} · {t.cookies.categories.marketing.title}
                </span>
              </div>
              <p className="text-base font-semibold text-brand-100 sm:text-lg">
                {t.cookies.bannerTitle}
              </p>
              <p className="text-brand-100 opacity-80 leading-relaxed">
                {t.cookies.bannerBody}
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-emerald-200">
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
                  {t.cookies.categories.essential.title}
                </span>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 opacity-90">
                  {t.cookies.categories.analytics.title}
                </span>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 opacity-90">
                  {t.cookies.categories.marketing.title}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:w-72">
            <button
              type="button"
              onClick={acceptAll}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 px-4 py-3 text-sm font-semibold text-black shadow-[0_18px_30px_-18px_rgba(var(--accent-primary-rgb) / 0.8)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {t.cookies.acceptAll}
            </button>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={rejectNonEssential}
                className="flex-1 rounded-2xl border border-gray-700/70 px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-gray-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {t.cookies.rejectAll}
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="flex-1 rounded-2xl border border-transparent bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {t.cookies.manage}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
