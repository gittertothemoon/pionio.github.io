import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nProvider';
import { Button } from '../components/ui/Button';
import { Container } from '../components/layout/Container';
import { Reveal, Stagger, StaggerItem, useMotionSystem } from '../motion/MotionProvider';
import { AnchorGlow } from '../motion/AnchorGlow';
import { Icon } from '../components/ui/icons/Icon';

export const CTA: React.FC = () => {
  const { t } = useI18n();
  const { reducedMotion } = useMotionSystem();

  return (
    <section id="cta" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <Container className="relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Stagger>
            <StaggerItem>
              <motion.div
                className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs md:text-sm mb-6 md:mb-8"
                whileHover={{ scale: 1.05, borderColor: 'rgba(var(--accent-highlight-rgb) / 0.4)' }}
                transition={{ duration: 0.2 }}
              >
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
                Consulenza strategica personalizzata
              </motion.div>
            </StaggerItem>
            
            <StaggerItem>
              <h2 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-gradient-green mb-6 md:mb-8 leading-tight uppercase px-2">
                {t.cta.heading}
              </h2>
            </StaggerItem>
            
            <StaggerItem>
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto font-light px-2">
                {t.cta.subheading}
              </p>
            </StaggerItem>
            
            <StaggerItem>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-6 md:mb-8">
                <AnchorGlow to="contact" className="magnetic-cta group w-full sm:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="relative overflow-hidden px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-semibold w-full sm:w-auto min-h-[56px] touch-manipulation">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {t.cta.action}
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="inline-flex"
                        >
                          <Icon name="chevron-right" size={20} className="text-brand-300 md:w-6 md:h-6" />
                        </motion.span>
                      </span>
                      {!reducedMotion && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute -inset-2 bg-gradient-to-r from-brand-600 to-brand-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </AnchorGlow>
                
                <div className="flex flex-col gap-1 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-400 rounded-full" />
                    <span>Risposta in 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-400 rounded-full" />
                    <span>Consulenza iniziale gratuita</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Enhanced trust indicators */}
          <Reveal className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <motion.div 
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-black/30 border border-brand-800/30"
                whileHover={{ y: -4, borderColor: 'rgba(var(--accent-highlight-rgb) / 0.4)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <Icon name="chart" size={30} className="text-brand-300" />
                </div>
                <div className="text-center">
                  <div className="text-brand-200 font-semibold">ROI misurabile</div>
                  <div className="text-sm text-gray-400">Metriche pre/post sempre incluse</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-black/30 border border-brand-800/30"
                whileHover={{ y: -4, borderColor: 'rgba(var(--accent-highlight-rgb) / 0.4)' }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <Icon name="target" size={30} className="text-brand-300" />
                </div>
                <div className="text-center">
                  <div className="text-brand-200 font-semibold">Processo trasparente</div>
                  <div className="text-sm text-gray-400">Milestone chiare, zero sorprese</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-black/30 border border-brand-800/30"
                whileHover={{ y: -4, borderColor: 'rgba(var(--accent-highlight-rgb) / 0.4)' }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <Icon name="bolt" size={30} className="text-brand-300" />
                </div>
                <div className="text-center">
                  <div className="text-brand-200 font-semibold">Impact veloce</div>
                  <div className="text-sm text-gray-400">Risultati visibili in 4-6 settimane</div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
