import React from 'react';
import { Container } from './Container';
import { Logo } from '../ui/Logo';
import { useI18n } from '../../i18n/I18nProvider';
import { useTheme } from '../../contexts/ThemeContext';
import { useCookieConsent } from '../../contexts/CookieConsentContext';
import { cn } from '../../utils/cn';

// Footer sections ideas: brand mission, quick nav, services summary, social, legal.
// Keeping structure semantic: <footer> with nav (aria-label), list of social links with rel security.

interface SocialGlyphProps {
  className?: string;
}

const InstagramGlyph: React.FC<SocialGlyphProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    focusable="false"
    className={className}
  >
    <rect
      x="2.75"
      y="2.75"
      width="18.5"
      height="18.5"
      rx="5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
    />
    <circle
      cx="12"
      cy="12"
      r="4.25"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
    />
    <circle cx="17.4" cy="6.6" r="1.35" fill="currentColor" />
  </svg>
);

const TikTokGlyph: React.FC<SocialGlyphProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    focusable="false"
    className={className}
  >
    <path
      d="M9.85 7.26a4.68 4.68 0 1 0 4.68 4.68V4.02h2.67a5.63 5.63 0 0 0 2.99 2.57v2.7a7.47 7.47 0 0 1-3.17-.88v6.63a6.41 6.41 0 1 1-6.41-6.41c.41 0 .81.04 1.21.11Z"
      fill="#25F4EE"
      opacity="0.9"
    />
    <path
      d="M15.1 5.32c.7.53 1.51.92 2.37 1.04v2.33a4.91 4.91 0 0 1-2.37-.62v6.7a4.83 4.83 0 1 1-4.83-4.83c.28 0 .55.02.82.07v2.86a2.07 2.07 0 1 0 1.54 1.99V3.02h2.47Z"
      fill="#FE2C55"
      opacity="0.9"
    />
    <path
      d="M15.05 5.12c.67.53 1.48.93 2.38 1.06v1.7c-.91-.1-1.78-.4-2.54-.87v6.77a4.2 4.2 0 1 1-4.2-4.21c.22 0 .44.02.65.07v2a2.53 2.53 0 1 0 1.89 2.44V3.02h1.82Z"
      fill="#FFFFFF"
    />
  </svg>
);

const LinkedInGlyph: React.FC<SocialGlyphProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    focusable="false"
    className={className}
  >
    <path
      d="M5.54 7.44a2.06 2.06 0 1 1 .01-4.12 2.06 2.06 0 0 1-.01 4.12Zm1.78 13h-3.6V9h3.6v11.44ZM9.56 9h3.44v1.62h.05c.52-.93 1.72-1.92 3.54-1.92 3.69 0 4.37 2.43 4.37 5.58v6.16h-3.6v-5.46c0-1.3-.02-2.97-1.87-2.97-1.87 0-2.15 1.46-2.15 2.87v5.56h-3.63V9Z"
      fill="#FFFFFF"
    />
  </svg>
);

const XGlyph: React.FC<SocialGlyphProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    focusable="false"
    className={className}
  >
    <path
      d="M18.25 3h3.75l-7.5 8.52L22 21h-6.15l-3.97-5.45L7.64 21H3.8l7.3-8.22L3.5 3h6.2l3.6 4.96L18.25 3Z"
      fill="currentColor"
    />
  </svg>
);

interface SocialPalette {
  background: string;
  focusRing: string;
  shadow: string;
  border?: string;
}

interface SocialLink {
  id: string;
  href: string;
  label: string;
  Icon: React.FC<SocialGlyphProps>;
  palette: SocialPalette;
}

const socials: SocialLink[] = [
  {
    id: 'instagram',
    href: 'https://instagram.com/',
    label: 'Instagram',
    Icon: InstagramGlyph,
    palette: {
      background: 'linear-gradient(135deg, #f58529 0%, #f77737 18%, #dd2a7b 52%, #8134af 72%, #515bd4 100%)',
      focusRing: 'rgba(221, 42, 123, 0.9)',
      shadow: '0 18px 28px -16px rgba(221, 42, 123, 0.55)',
      border: 'rgba(255, 255, 255, 0.22)'
    }
  },
  {
    id: 'tiktok',
    href: 'https://tiktok.com/',
    label: 'TikTok',
    Icon: TikTokGlyph,
    palette: {
      background: 'radial-gradient(circle at 28% 28%, rgba(37, 244, 238, 0.65), transparent 55%), radial-gradient(circle at 72% 26%, rgba(254, 44, 85, 0.55), transparent 60%), #050505',
      focusRing: 'rgba(37, 244, 238, 0.8)',
      shadow: '0 18px 28px -16px rgba(37, 244, 238, 0.45)',
      border: 'rgba(255, 255, 255, 0.14)'
    }
  },
  {
    id: 'linkedin',
    href: 'https://linkedin.com/',
    label: 'LinkedIn',
    Icon: LinkedInGlyph,
    palette: {
      background: 'linear-gradient(135deg, #0a66c2 0%, #0f52a1 40%, #003c78 100%)',
      focusRing: 'rgba(14, 118, 214, 0.85)',
      shadow: '0 18px 28px -16px rgba(10, 102, 194, 0.55)',
      border: 'rgba(255, 255, 255, 0.18)'
    }
  },
  {
    id: 'x',
    href: 'https://x.com/',
    label: 'X',
    Icon: XGlyph,
    palette: {
      background: 'linear-gradient(135deg, #050505 0%, #0f0f10 50%, #1b1b1d 100%)',
      focusRing: 'rgba(226, 232, 240, 0.75)',
      shadow: '0 18px 30px -18px rgba(15, 23, 42, 0.55)',
      border: 'rgba(255, 255, 255, 0.12)'
    }
  }
];

export const Footer: React.FC = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const year = new Date().getFullYear();
  const { openPreferences } = useCookieConsent();
  const isLight = theme === 'light';

  return (
    <footer className={cn(
      "relative mt-24 backdrop-blur-sm transition-colors duration-500",
      isLight
        ? "border-t border-orange-200/40 bg-gradient-to-br from-orange-50/90 via-amber-50/60 to-yellow-100/80"
        : "border-t border-zinc-800/70 bg-gradient-to-b from-black/20 to-black/60"
    )}>
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4 lg:grid-cols-6">
          {/* Brand / Mission */}
          <div className="md:col-span-2 lg:col-span-2">
            <Logo size="sm" className="w-24 h-auto md:w-28 lg:w-32 mb-4" />
            <p className={cn(
              "text-sm leading-relaxed max-w-xs",
              isLight ? "text-gray-600" : "text-gray-400"
            )}>
              Interfacce, design system e ottimizzazioni guidate da metriche. Ridurre attrito, scalare conversione, creare asset riusabili.
            </p>
          </div>

          {/* Quick Nav */}
          <nav aria-label="Footer navigation" className="text-sm">
            <h4 className={cn(
              "text-xs font-semibold tracking-wide uppercase mb-4",
              isLight ? "text-brand-400" : "text-brand-300/80"
            )}>{t.footer.map}</h4>
            <ul className="space-y-2" role="list">
              <li><a className={cn(
                "transition-colors",
                isLight 
                  ? "text-gray-600 hover:text-brand-500" 
                  : "text-gray-400 hover:text-brand-300"
              )} href="#services">{t.nav.services}</a></li>
              <li><a className={cn(
                "transition-colors",
                isLight 
                  ? "text-gray-600 hover:text-brand-500" 
                  : "text-gray-400 hover:text-brand-300"
              )} href="#cases">{t.nav.cases}</a></li>
              <li><a className={cn(
                "transition-colors",
                isLight 
                  ? "text-gray-600 hover:text-brand-500" 
                  : "text-gray-400 hover:text-brand-300"
              )} href="#process">{t.nav.process}</a></li>
              <li><a className={cn(
                "transition-colors",
                isLight 
                  ? "text-gray-600 hover:text-brand-500" 
                  : "text-gray-400 hover:text-brand-300"
              )} href="#testimonials">{t.nav.testimonials}</a></li>
              <li><a className={cn(
                "transition-colors",
                isLight 
                  ? "text-gray-600 hover:text-brand-500" 
                  : "text-gray-400 hover:text-brand-300"
              )} href="#contact">{t.nav.contact}</a></li>
            </ul>
          </nav>

          {/* Services summary (manual list to avoid import weight) */}
          <div className="text-sm">
            <h4 className={cn(
              "text-xs font-semibold tracking-wide uppercase mb-4",
              isLight ? "text-brand-400" : "text-brand-300/80"
            )}>{t.footer.focus}</h4>
            <ul className="space-y-2" role="list">
              <li className={cn(
                "transition-colors",
                isLight 
                  ? "text-gray-600 hover:text-brand-500" 
                  : "text-gray-400 hover:text-brand-300"
              )}>Design System & UI Kit</li>
              <li className={cn(
                "transition-colors",
                isLight 
                  ? "text-gray-600 hover:text-brand-500" 
                  : "text-gray-400 hover:text-brand-300"
              )}>Conversion & CRO UX</li>
              <li className={cn(
                "transition-colors",
                isLight 
                  ? "text-gray-600 hover:text-brand-500" 
                  : "text-gray-400 hover:text-brand-300"
              )}>Refactor Performance</li>
              <li className={cn(
                "transition-colors",
                isLight 
                  ? "text-gray-600 hover:text-brand-500" 
                  : "text-gray-400 hover:text-brand-300"
              )}>Growth Analytics</li>
              <li className={cn(
                "transition-colors",
                isLight 
                  ? "text-gray-600 hover:text-brand-500" 
                  : "text-gray-400 hover:text-brand-300"
              )}>UX Experimentation</li>
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-1">
            <h4 className={cn(
              "text-xs font-semibold tracking-wide uppercase mb-4",
              isLight ? "text-brand-400" : "text-brand-300/80"
            )}>{t.footer.social}</h4>
            <ul className="flex gap-3.5" role="list">
              {socials.map((s) => {
                const controlStyle = {
                  '--ring-color': s.palette.focusRing,
                  background: s.palette.background,
                  boxShadow: s.palette.shadow,
                  borderColor: s.palette.border ?? 'transparent'
                } as React.CSSProperties;

                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group relative inline-flex h-7 w-7 items-center justify-center rounded-md border border-transparent text-white transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring-color)] focus-visible:ring-offset-2",
                        isLight ? "focus-visible:ring-offset-white" : "focus-visible:ring-offset-black"
                      )}
                      style={controlStyle}
                      aria-label={s.label}
                    >
                      <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <s.Icon className="h-3 w-3 text-white" />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={cn(
          "mt-14 pt-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 text-xs",
          isLight 
            ? "border-t border-gray-200/70 text-gray-500" 
            : "border-t border-zinc-800/70 text-gray-500"
        )}>
          <p className="order-2 md:order-1">© {year} Pionio. {t.footer.rights}.</p>
          <div className={cn(
            "flex-1 order-1 md:order-2 flex flex-wrap gap-4 text-[11px]",
            isLight ? "text-gray-500/80" : "text-gray-500/80"
          )}>
            <span className={cn(
              "cursor-default transition-colors",
              isLight ? "hover:text-brand-500" : "hover:text-brand-300"
            )}>{t.footer.privacy}</span>
            <span className={cn(
              "cursor-default transition-colors",
              isLight ? "hover:text-brand-500" : "hover:text-brand-300"
            )}>{t.footer.terms}</span>
            <button
              type="button"
              onClick={openPreferences}
              className={cn(
                "text-left text-gray-500/80 transition-colors underline-offset-4 decoration-dotted decoration-transparent",
                isLight 
                  ? "hover:text-brand-500 hover:decoration-brand-500/80" 
                  : "hover:text-brand-300 hover:decoration-brand-300/80"
              )}
            >
              {t.footer.cookies}
            </button>
            <span className={cn(
              isLight ? "text-gray-600" : "text-gray-600"
            )}>{t.footer.build} v1.0</span>
          </div>
        </div>
      </Container>
      {/* Ambient glow */}
      <div 
        aria-hidden 
        className={cn(
          "pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b to-transparent",
          isLight 
            ? "from-orange-200/15" 
            : "from-brand-500/5"
        )} 
      />
    </footer>
  );
};

export default Footer;
