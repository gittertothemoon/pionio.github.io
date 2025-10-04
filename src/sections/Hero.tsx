import React, { useRef, useEffect, useCallback } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/ui/Button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Stagger, StaggerItem, useMotionSystem } from '../motion/MotionProvider';
import { cn } from '../utils/cn';

export const Hero: React.FC = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const { reducedMotion } = useMotionSystem();
  const ref = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const isLight = theme === 'light';
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], reducedMotion ? ['0%', '0%'] : ['0%', '20%']);
  const yContent = useTransform(scrollYProgress, [0, 1], reducedMotion ? ['0%', '0%'] : ['0%', '10%']);

  const headlineWords = t.hero.title.split(' ');

  // Mouse tracking ottimizzato con DOM manipulation diretta
  const throttledMouseMove = useCallback((e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    const gradient = gradientRef.current;
    if (!rect || !gradient) return;
    
    const x = Math.max(-1, Math.min(1, (e.clientX - rect.left - rect.width / 2) / rect.width));
    const y = Math.max(-1, Math.min(1, (e.clientY - rect.top - rect.height / 2) / rect.height));
    
    // Aggiorna il gradiente direttamente via CSS custom properties (effetto potenziato)
    gradient.style.setProperty('--mouse-x', `${50 + x * 15}%`);
    gradient.style.setProperty('--mouse-y', `${50 + y * 15}%`);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let throttleTimer: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimer) return;
      
      throttleTimer = window.setTimeout(() => {
        throttledMouseMove(e);
        throttleTimer = null;
      }, 8); // ~120fps per maggiore fluidità
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        if (throttleTimer) {
          clearTimeout(throttleTimer);
        }
      };
    }
  }, [reducedMotion, throttledMouseMove]);

  return (
    <section 
      ref={ref} 
      id="hero" 
      className={cn(
        "-mt-28 md:-mt-32 lg:-mt-36 pt-32 md:pt-48 lg:pt-72 pb-32 md:pb-48 lg:pb-64 relative overflow-hidden min-h-[100vh] flex items-center px-4 md:px-6 transition-colors duration-500",
        isLight 
          ? "bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-yellow-50/40" 
          : ""
      )}
    >
      {/* Background layers with parallax - Solo estensione del background */}
      <motion.div 
        style={{ y: yBg }} 
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden
      >
        {/* Base gradient - adattato per tema chiaro */}
        <div className={cn(
          "absolute inset-0",
          isLight 
            ? "bg-gradient-to-br from-amber-100/30 via-orange-50/20 to-yellow-100/25"
            : ""
        )} />
        
        {/* Animated beam effects */}
        <div 
          className={cn(
            "absolute inset-0",
            isLight ? "opacity-30" : "opacity-70"
          )}
          style={{ 
            background: isLight 
              ? 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.12), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(var(--accent-highlight-rgb) / 0.45), transparent)',
            animation: reducedMotion ? 'none' : 'beam-sweep 12s ease-in-out infinite alternate'
          }} 
        />
        <div 
          className={cn(
            "absolute inset-0",
            isLight ? "opacity-20" : "opacity-50"
          )}
          style={{ 
            background: isLight
              ? 'linear-gradient(-90deg, transparent, rgba(217, 119, 6, 0.08), transparent)'
              : 'linear-gradient(-90deg, transparent, rgba(var(--accent-highlight-rgb) / 0.3), transparent)',
            animation: reducedMotion ? 'none' : 'beam-sweep 16s ease-in-out infinite alternate reverse'
          }} 
        />
        
        {/* Radial gradients - adattati per tema chiaro */}
        <div className={cn(
          "absolute inset-0",
          isLight 
            ? "bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.06),transparent_70%)]"
            : "bg-[radial-gradient(circle_at_30%_30%,rgba(var(--accent-highlight-rgb) / 0.12),transparent_70%)]"
        )} />
        <div className={cn(
          "absolute inset-0",
          isLight 
            ? "bg-[radial-gradient(circle_at_70%_70%,rgba(217,119,6,0.04),transparent_60%)]"
            : "bg-[radial-gradient(circle_at_70%_70%,rgba(var(--accent-warm-rgb) / 0.08),transparent_60%)]"
        )} />
        
        {/* Enhanced mesh gradient with dynamic mouse tracking */}
        <div 
          ref={gradientRef}
          className={cn(
            "absolute inset-0",
            isLight ? "opacity-25" : "opacity-35"
          )}
          style={{
            background: isLight 
              ? `
                radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.1), transparent 60%),
                radial-gradient(circle at calc(100% - var(--mouse-x, 50%)) calc(100% - var(--mouse-y, 50%)), rgba(217, 119, 6, 0.06), transparent 70%)
              `
              : `
                radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--accent-highlight-rgb) / 0.18), transparent 60%),
                radial-gradient(circle at calc(100% - var(--mouse-x, 50%)) calc(100% - var(--mouse-y, 50%)), rgba(var(--accent-highlight-rgb) / 0.08), transparent 70%)
              `,
            transition: 'background 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'background'
          }}
        />

        {/* Tema chiaro: layer aggiuntivo cinematografico */}
        {isLight && (
          <div className="absolute inset-0 opacity-15">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-100/20 via-transparent to-amber-50/10" />
            <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_45deg_at_50%_50%,rgba(251,191,36,0.03)_0deg,transparent_60deg,rgba(245,158,11,0.04)_120deg,transparent_180deg,rgba(217,119,6,0.02)_240deg,transparent_300deg,rgba(251,191,36,0.03)_360deg)]" />
            {/* Effetto shimmer dorato */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.08) 45%, rgba(251,191,36,0.12) 50%, rgba(245,158,11,0.08) 55%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: reducedMotion ? 'none' : 'golden-shimmer 8s ease-in-out infinite'
              }}
            />
            {/* Overlay finale per profondità */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-50/5 to-amber-100/8" />
          </div>
        )}
      </motion.div>

      {/* Floating particles (subtle) */}
      {!reducedMotion && (
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brand-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 8}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
      )}

      <motion.div 
        style={{ y: yContent }}
        className="relative max-w-5xl mx-auto text-center"
      >


        {/* Web Designer Label */}
        <Stagger>
          <StaggerItem>
            <div className="mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.15em] md:tracking-[0.2em] text-center text-brand-200 opacity-90">
                WEB DESIGNER
              </h2>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Headline con effetto typewriter per le parole chiave */}
        <Stagger as="h1" className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-6 md:mb-8">
          {headlineWords.map((word: string, i: number) => {
            const isKeyword = ['interfacce', 'risultati', 'interfaces', 'outcomes'].includes(word.toLowerCase());
            return (
              <StaggerItem key={i} className="inline-block mr-2 md:mr-3 align-baseline">
                <span 
                  className={
                    isKeyword 
                      ? "bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent"
                      : "bg-gradient-to-b from-brand-100 to-brand-300/80 bg-clip-text text-transparent"
                  }
                >
                  {word}
                </span>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Subtitle potenziata */}
        <Stagger as="div" className="max-w-2xl mx-auto space-y-3 md:space-y-4 mb-8 md:mb-12 px-2">
          <StaggerItem>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
              {t.hero.subtitle}
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="text-sm text-brand-400/80 font-medium">
              {t.hero.proof}
            </p>
          </StaggerItem>
        </Stagger>

        {/* CTA buttons */}
        <Stagger as="div" className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-2">
          <StaggerItem>
            <Button size="lg" className="w-full sm:w-auto">
              {t.hero.ctaPrimary}
            </Button>
          </StaggerItem>
          <StaggerItem>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t.hero.ctaSecondary}
              <span className="ml-2 text-brand-400">→</span>
            </Button>
          </StaggerItem>
        </Stagger>

        {/* Metrics teaser */}
        <Stagger className="mt-12 md:mt-16 pt-8 md:pt-12">
          <StaggerItem>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-center opacity-80">
              <div className="flex flex-col items-center">
                <span className="text-xl md:text-2xl font-semibold text-brand-200">95%</span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">KPI Migliorati</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl md:text-2xl font-semibold text-brand-200">+14%</span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">Conversioni</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl md:text-2xl font-semibold text-brand-200">-20%</span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">Bounce Rate</span>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </motion.div>
    </section>
  );
};
