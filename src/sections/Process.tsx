import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { processSteps } from '../data/process';
import { useI18n } from '../i18n/I18nProvider';
import { tr } from '../utils/loc';
import { Container } from '../components/layout/Container';
import { motion } from 'framer-motion';
import { Icon } from '../components/ui/icons/Icon';
import { Reveal, useMotionSystem } from '../motion/MotionProvider';
import './Process.css';

export const Process: React.FC = () => {
  const { locale, t } = useI18n();
  const { reducedMotion } = useMotionSystem();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Memoized deliverables to avoid recalculation
  const deliverables = useMemo(() => [
    ['Wireframes', 'User Flow', 'Prototipo'],
    ['Design System', 'UI Components', 'Mockups HD'],
    ['Frontend', 'Backend', 'Testing'],
    ['Deploy', 'Ottimizzazione', 'Monitoring']
  ], []);

  const durations = useMemo(() => [
    '3-5 giorni',
    '1-2 settimane', 
    '2-3 settimane',
    '1 settimana'
  ], []);

  // Detect mobile for non-sticky version
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  // Optimized intersection observer with throttling
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0');
        setActiveStep(stepIndex);
      }
    });
  }, []);

  useEffect(() => {
    if (reducedMotion || isMobile) {
      setActiveStep(0);
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, { 
      rootMargin: '-50% 0px -50% 0px', 
      threshold: 0 
    });

    const stepElements = containerRef.current?.querySelectorAll('[data-step]');
    stepElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [reducedMotion, isMobile, handleIntersection]);

  // Mobile/reduced motion: simple list
  if (reducedMotion || isMobile) {
    return (
      <section id="process" className="py-16 md:py-20 lg:py-28 -my-16 relative overflow-hidden">
        <Container className="px-4 md:px-6 relative">
          <Reveal as="header" className="mb-12 md:mb-16 max-w-2xl text-center mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-gradient-green mb-3 uppercase">{t.process.heading}</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed px-2">{t.process.subheading}</p>
          </Reveal>
          <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
            {processSteps.map((step, i) => (
              <Reveal key={step.id} delay={i * 0.1}>
                <div className="relative flex gap-4 md:gap-6 items-start p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-700/50 bg-black/40 backdrop-blur-sm">
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-600 border-2 border-brand-500 flex items-center justify-center">
                    <span className="text-xs md:text-sm font-medium text-brand-100">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-medium text-brand-200 mb-2">{tr(step.title, locale)}</h3>
                    <p className="text-sm md:text-base text-gray-400 mb-3 leading-relaxed">{tr(step.summary, locale)}</p>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{tr(step.detail, locale)}</p>
                    
                    {/* Mobile deliverables */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {deliverables[i]?.map((deliverable, j) => (
                        <span key={j} className="text-xs px-2 py-1 bg-brand-500/10 text-brand-300 rounded-md border border-brand-500/20">
                          {deliverable}
                        </span>
                      ))}
                    </div>
                    
                    {/* Mobile duration */}
                    <div className="mt-3 text-xs text-gray-500">
                      <Icon name="clock" size={12} className="inline mr-1" />
                      {durations[i]}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Desktop: centered cards layout with ordered list semantics
  return (
    <section id="process" className="process-section py-20 md:py-28 lg:py-32 -my-16 relative overflow-hidden">
      <Container className="relative px-4 md:px-6">
        <Reveal as="header" className="mb-16 md:mb-20 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gradient-green mb-3 md:mb-4 uppercase">{t.process.heading}</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed px-2">{t.process.subheading}</p>
        </Reveal>
        
        <div ref={containerRef} className="relative" aria-describedby="process-instructions">
          <p id="process-instructions" className="sr-only">Scrolla per evidenziare lo step corrente del processo. Gli step sono in ordine sequenziale.</p>
          {/* Centered steps content */}
          <ol className="max-w-4xl mx-auto space-y-20 md:space-y-32 list-none m-0 p-0" role="list">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.id}
                data-step={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`transition-all duration-700 ${
                  i === activeStep ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
                }`}
                style={{ willChange: i === activeStep ? 'transform, opacity' : 'auto' }}
              >
                <li className="max-w-3xl mx-auto relative" aria-current={i === activeStep ? 'step' : undefined}>
                  {/* Premium Step card */}
                  <div className={`process-step-card relative p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border backdrop-blur-sm transition-all duration-700 group hover:scale-[1.02] ${
                    i === activeStep 
                      ? 'bg-gradient-to-br from-black/70 via-black/60 to-black/70 border-brand-500/60 shadow-2xl shadow-brand-500/30' 
                      : 'bg-gradient-to-br from-black/40 via-black/30 to-black/40 border-brand-800/40 hover:border-brand-700/50'
                  }`}>
                    {/* Optimized active glow system */}
                    {i === activeStep && (
                      <>
                        <div className="process-glow absolute -inset-2 bg-gradient-to-r from-brand-600/25 via-brand-500/25 to-brand-600/25 rounded-3xl" style={{ willChange: 'opacity' }} />
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/15 via-brand-400/15 to-brand-500/15 rounded-3xl blur-md" style={{ willChange: 'opacity' }} />
                        <motion.div
                          animate={{
                            opacity: [0.1, 0.15, 0.1]
                          }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-500/10 via-brand-400/10 to-brand-500/10"
                          style={{ willChange: 'opacity' }}
                        />
                      </>
                    )}
                    
                    {/* Simplified hover glow for inactive steps - CSS only */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-600/5 via-brand-500/5 to-brand-600/5 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative">
                      {/* Premium Header */}
                      <div className="flex items-start gap-6 mb-8">
                        <motion.div
                          className={`relative px-4 py-2 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-500 backdrop-blur-sm ${
                            i === activeStep 
                              ? 'bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-lg shadow-brand-500/40' 
                              : 'bg-brand-500/10 border border-brand-500/30 text-brand-300 hover:bg-brand-500/20'
                          }`}
                          animate={i === activeStep ? { 
                            scale: [1, 1.05, 1]
                          } : { scale: 1 }}
                          transition={{ duration: 4, repeat: i === activeStep ? Infinity : 0, ease: "easeInOut" }}
                          whileHover={{ scale: 1.03 }}
                          style={{ willChange: i === activeStep ? 'transform' : 'auto' }}
                        >
                          {/* Simplified background for active step */}
                          {i === activeStep && (
                            <motion.div
                              animate={{ opacity: [0.1, 0.2, 0.1] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-white/5"
                              style={{ willChange: 'opacity' }}
                            />
                          )}
                          <span className="relative z-10">Step {i + 1}</span>
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 
                            className={`text-2xl font-bold mb-2 transition-all duration-500 uppercase ${
                              i === activeStep 
                                ? 'text-white drop-shadow-sm' 
                                : 'text-brand-200 group-hover:text-brand-100'
                            }`}
                          >
                            {tr(step.title, locale)}
                          </h3>
                          
                          {/* Step progress indicator */}
                          <div className="flex items-center gap-2 mb-2" aria-hidden>
                            <div className="flex gap-1">
                              {[...Array(processSteps.length)].map((_, idx) => (
                                <div
                                  key={idx}
                                  className={`w-2 h-1 rounded-full transition-all duration-300 ${
                                    idx <= i 
                                      ? idx === i && i === activeStep 
                                        ? 'bg-brand-400 shadow-sm shadow-brand-400/50' 
                                        : 'bg-brand-600' 
                                      : 'bg-brand-900'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Content */}
                      <div className="space-y-4 mb-6">
                        <p 
                          className={`text-lg leading-relaxed font-medium transition-all duration-500 ${
                            i === activeStep ? 'text-gray-100' : 'text-gray-200 group-hover:text-gray-150'
                          }`}
                        >
                          {tr(step.summary, locale)}
                        </p>
                        
                        <p 
                          className={`text-sm leading-relaxed transition-all duration-500 ${
                            i === activeStep ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-350'
                          }`}
                        >
                          {tr(step.detail, locale)}
                        </p>
                      </div>

                      {/* Enhanced Duration & Features */}
                      <div className="space-y-4">
                        <div className={`p-4 rounded-xl border transition-all duration-500 ${
                          i === activeStep 
                            ? 'bg-brand-500/10 border-brand-500/30' 
                            : 'bg-brand-900/20 border-brand-800/30 group-hover:border-brand-700/40'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-brand-300">
                              <Icon name="clock" size={18} className="text-brand-300" />
                              <span>Durata stimata</span>
                            </div>
                            <span className={`text-sm font-bold ${
                              i === activeStep ? 'text-brand-200' : 'text-gray-400'
                            }`}>
                              {durations[i]}
                            </span>
                          </div>
                          
                          {/* Key deliverables */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {deliverables[i]?.map((item, idx) => (
                              <motion.span
                                key={item}
                                className="px-2 py-1 text-xs bg-brand-500/15 text-brand-300 rounded-md border border-brand-500/20"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.3 }}
                              >
                                {item}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </motion.div>
            ))}
          </ol>
        </div>

        {/* Process summary */}
        <Reveal className="mt-20 text-center">
          <div className="max-w-2xl mx-auto p-6 bg-black/40 border border-brand-800/40 rounded-2xl">
            <h4 className="text-lg font-medium text-brand-200 mb-3">
              Framework iterativo e trasparente
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ogni fase include review, feedback e ottimizzazioni continue. 
              Il processo si adatta alle esigenze specifiche del progetto mantenendo focus sui risultati.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
