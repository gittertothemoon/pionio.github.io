import React from 'react';
import { services } from '../data/services';
import { Icon } from '../components/ui/icons/Icon';
import { useI18n } from '../i18n/I18nProvider';
import { tr } from '../utils/loc';
import { Container } from '../components/layout/Container';
import { StaggerItem, Reveal } from '../motion/MotionProvider';

export const Services: React.FC = () => {
  const { locale, t } = useI18n();

  // Icone per i servizi con sizing responsive
  const serviceIcons: Record<string, React.ReactNode> = {
    'design-system': <Icon name="palette" size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />,
    'conversion-site': <Icon name="target" size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />,
    'performance-refactor': <Icon name="bolt" size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />,
    'growth-analytics': <Icon name="chart" size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />,
    'ux-experimentation': <Icon name="rocket" size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
  };

  return (
    <section id="services" className="py-24 md:py-32 lg:py-40 -my-16 relative">
      <Container className="px-4 md:px-6">
        <Reveal as="header" className="mb-12 md:mb-16 max-w-2xl text-center mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gradient-green mb-3 md:mb-4 uppercase bg-transparent">{t.services.heading}</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed bg-transparent">{t.services.subheading}</p>
        </Reveal>

        {/* Brick wall layout: responsive grid */}
        <ul className="flex flex-col gap-6 md:gap-8" role="list">
          <li>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.slice(0,3).map((service, index) => (
                <StaggerItem key={service.id} customDelay={index * 0.08}>
                  <article
                tabIndex={0}
                aria-labelledby={`service-${service.id}-title`}
                className="group relative h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 rounded-xl md:rounded-2xl transition-transform duration-300 will-change-transform touch-manipulation"
              >
                <div className="relative border border-zinc-700/50 hover:border-emerald-500/50 rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 h-full flex flex-col transition-colors duration-300 bg-transparent">
                  <div className="relative flex-1">
                    <header className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                      <div className="text-2xl md:text-3xl transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110" aria-hidden>
                        {serviceIcons[service.id]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 id={`service-${service.id}-title`} className="text-lg md:text-xl font-semibold text-brand-200 mb-2 leading-tight">
                          {tr(service.name, locale)}
                        </h3>
                        <p className="text-sm md:text-base text-brand-400/90 font-medium">
                          {tr(service.tagline, locale)}
                        </p>
                      </div>
                    </header>
                    <p className="text-sm md:text-base text-gray-300 mb-5 md:mb-6 leading-relaxed">
                      {tr(service.description, locale)}
                    </p>
                    <div className="mb-5 md:mb-6">
                      <h4 className="text-xs uppercase tracking-wide text-brand-300/80 mb-3 font-medium">
                        Risultati attesi:
                      </h4>
                      <ul className="space-y-2" role="list">
                        {service.outcomes.map((outcome) => (
                          <li
                            key={outcome.en}
                            className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 flex items-start gap-3 transition-colors duration-300 group-focus-within:text-gray-200"
                          >
                            <span
                              className="mt-1.5 md:mt-2 block h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0 transition-transform duration-300 group-hover:scale-125 group-focus-visible:scale-125 group-hover:shadow-lg group-hover:shadow-emerald-500/60"
                            />
                            <span className="leading-relaxed">{tr(outcome, locale)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {service.roiNote && (
                    <footer className="relative mt-auto pt-4 md:pt-6 border-t border-brand-800/30">
                      <p className="text-xs md:text-sm text-brand-400/90 italic flex items-start gap-2">
                        <Icon name="bulb" size={14} className="text-brand-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{tr(service.roiNote, locale)}</span>
                      </p>
                    </footer>
                  )}
                </div>
              </article>
                </StaggerItem>
              ))}
            </div>
          </li>
          <li>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
              {/* offset with empty col on large screens */}
              <div className="hidden lg:block" />
              {services.slice(3).map((service, index) => (
                <StaggerItem key={service.id} customDelay={(index + 3) * 0.08} className="lg:col-span-2">
                  <article
                    tabIndex={0}
                    aria-labelledby={`service-${service.id}-title`}
                    className="group relative h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 rounded-xl md:rounded-2xl transition-transform duration-300 will-change-transform touch-manipulation"
                  >
                    <div className="relative border border-zinc-700/50 hover:border-emerald-500/50 rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 h-full flex flex-col transition-colors duration-300 bg-transparent">
                      <div className="relative flex-1">
                        <header className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                          <div className="text-2xl md:text-3xl transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110" aria-hidden>
                            {serviceIcons[service.id]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 id={`service-${service.id}-title`} className="text-lg md:text-xl font-semibold text-brand-200 mb-2 leading-tight">
                              {tr(service.name, locale)}
                            </h3>
                            <p className="text-sm md:text-base text-brand-400/90 font-medium">
                              {tr(service.tagline, locale)}
                            </p>
                          </div>
                        </header>
                        <p className="text-sm md:text-base text-gray-300 mb-5 md:mb-6 leading-relaxed">
                          {tr(service.description, locale)}
                        </p>
                        <div className="mb-5 md:mb-6">
                          <h4 className="text-xs uppercase tracking-wide text-brand-300/80 mb-3 font-medium">
                            Risultati attesi:
                          </h4>
                          <ul className="space-y-2" role="list">
                            {service.outcomes.map((outcome) => (
                              <li
                                key={outcome.en}
                                className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 flex items-start gap-3 transition-colors duration-300 group-focus-within:text-gray-200"
                              >
                                <span
                                  className="mt-1.5 md:mt-2 block h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0 transition-transform duration-300 group-hover:scale-125 group-focus-visible:scale-125 group-hover:shadow-lg group-hover:shadow-emerald-500/60"
                                />
                                <span className="leading-relaxed">{tr(outcome, locale)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {service.roiNote && (
                        <footer className="relative mt-auto pt-4 md:pt-6 border-t border-brand-800/30">
                          <p className="text-xs md:text-sm text-brand-400/90 italic flex items-start gap-2">
                            <Icon name="bulb" size={14} className="text-brand-500 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{tr(service.roiNote, locale)}</span>
                          </p>
                        </footer>
                      )}
                    </div>
                  </article>
                </StaggerItem>
              ))}
              <div className="hidden md:block" />
            </div>
          </li>
        </ul>

        {/* CTA section bottom */}
        <Reveal className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-500/20 text-brand-300 text-sm bg-transparent">
            <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
            Ogni deliverable è progettato per impattare metriche specifiche
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
