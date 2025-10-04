import React from 'react';
import { Icon } from '../components/ui/icons/Icon';
import { caseStudies } from '../data/caseStudies';
import { useI18n } from '../i18n/I18nProvider';
import { tr } from '../utils/loc';
import { Container } from '../components/layout/Container';
import { Stagger, StaggerItem, Reveal } from '../motion/MotionProvider';

export const CaseStudies: React.FC = () => {
  const { locale, t } = useI18n();

  return (
    <section id="cases" className="py-28 -my-16 relative overflow-hidden">
      <Container className="relative">
        <Reveal as="header" className="mb-20 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent mb-4 uppercase">{t.caseStudies.heading}</h2>
          <p className="text-gray-300 text-base leading-relaxed">{t.caseStudies.subheading}</p>
        </Reveal>

        <div className="space-y-32" role="list">
          {caseStudies.map((caseStudy, index) => (
            <Stagger
              key={caseStudy.id}
              className={`relative grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center ${index % 2 === 1 ? 'md:grid-cols-[0.8fr_1.2fr]' : ''}`}
            >
              <article aria-labelledby={`case-${caseStudy.id}-title`} role="listitem" className="contents">
              {/* Case Study Content */}
              <StaggerItem 
                className={index % 2 === 1 ? 'md:order-2' : ''}
              >
                <div
                  className="relative group hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300 ease-out"
                >
                  <div 
                    className="relative border border-zinc-700/50 hover:border-brand-500/50 rounded-2xl p-8 bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-300"
                  >
                    {/* Dynamic background glow */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                      style={{ 
                        background: `radial-gradient(circle at ${35 + index * 15}% ${25 + index * 20}%, rgba(var(--accent-highlight-rgb) / 0.12), transparent 70%)` 
                      }} 
                    />

                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6" id={`case-${caseStudy.id}-title`}>
                        <span 
                          className="px-3 py-1.5 rounded-lg bg-brand-500/15 text-brand-300 tracking-wide font-medium uppercase text-xs group-hover:shadow-lg group-hover:shadow-brand-500/40 transition-all duration-300"
                        >
                          {caseStudy.sector}
                        </span>
                        <h3 className="text-2xl font-semibold text-brand-200">
                          {caseStudy.client}
                        </h3>
                      </div>

                      {/* Challenge & Solution */}
                      <div className="space-y-4 mb-8">
                        <div>
                          <h4 className="text-brand-400 font-semibold mb-2 flex items-center gap-2">
                            <Icon name="bolt" size={18} className="text-orange-400" />
                            Challenge:
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {tr(caseStudy.challenge, locale)}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-brand-400 font-semibold mb-2 flex items-center gap-2">
                            <Icon name="bulb" size={18} className="text-brand-400" />
                            Solution:
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {tr(caseStudy.solution, locale)}
                          </p>
                        </div>
                      </div>

                      {/* Testimonial enhanced */}
                      {caseStudy.testimonial && (
                        <blockquote
                          className="relative p-6 bg-black/30 group-hover:bg-black/50 rounded-xl border-l-4 border-brand-600 mb-6 transition-colors duration-300"
                          aria-label={`Testimonianza di ${caseStudy.testimonial.author}`}
                        >
                          <p className="text-gray-200 italic mb-4 text-lg leading-relaxed">
                            "{tr(caseStudy.testimonial.quote, locale)}"
                          </p>
                          <footer className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-500/20 rounded-full flex items-center justify-center">
                              <span className="text-brand-400 font-semibold">
                                {caseStudy.testimonial.author.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-brand-300 font-medium">
                                {caseStudy.testimonial.author}
                              </div>
                              <div className="text-gray-400 text-sm">
                                {caseStudy.testimonial.role}
                              </div>
                            </div>
                          </footer>
                        </blockquote>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Metrics & Visual */}
              <StaggerItem 
                className={index % 2 === 1 ? 'md:order-1' : ''}
              >
                <div className="relative">
                  {/* Impact Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-8" role="list">
                    {caseStudy.impactMetrics.map((metric, _metricIndex) => (
                      <div
                        key={metric.label.it}
                        role="listitem"
                        className={`text-center p-4 rounded-xl border transition-all duration-300 ${
                          metric.highlight
                            ? 'bg-brand-500/10 border-brand-500/40 hover:border-brand-400 focus-visible:border-brand-400'
                            : 'bg-black/40 border-brand-800/40 hover:border-gray-600 focus-visible:border-gray-600'
                        } focus:outline-none`}
                        tabIndex={0}
                        aria-label={`${tr(metric.label, locale)}: ${metric.value}`}
                      >
                        <div 
                          className={`text-xl font-bold mb-1 transition-all duration-300 ${
                            metric.highlight ? 'text-brand-200' : 'text-gray-200'
                          }`}
                        >
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">
                          {tr(metric.label, locale)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Real project visual */}
                  <figure
                    className={`relative w-full rounded-2xl border overflow-hidden group ${
                      caseStudy.visual.className ?? ''
                    } ${
                      index % 2 === 0
                        ? 'border-brand-500/30 bg-brand-500/5'
                        : 'border-brand-800/50 bg-black/40'
                    }`}
                  >
                    <img
                      src={caseStudy.visual.src}
                      alt={tr(caseStudy.visual.alt, locale)}
                      loading="lazy"
                      className="block w-full h-auto transition duration-500 group-hover:brightness-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/20 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  </figure>
                </div>
              </StaggerItem>
            </article>
            </Stagger>
          ))}
        </div>

        {/* Section footer */}
        <Reveal className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm">
            <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
            Ogni progetto include analisi pre/post per misurare l'impatto reale
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
