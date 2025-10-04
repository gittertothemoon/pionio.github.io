import React, { useState, useEffect, useRef, useCallback } from 'react';
import { testimonials } from '../data/testimonials';
import { useI18n } from '../i18n/I18nProvider';
import { tr } from '../utils/loc';
import { Container } from '../components/layout/Container';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../components/ui/icons/Icon';
import { Reveal, useMotionSystem } from '../motion/MotionProvider';


export const Testimonials: React.FC = () => {
  const { locale, t } = useI18n();
  const { reducedMotion } = useMotionSystem();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const intervalRef = useRef<number | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (reducedMotion || !isAutoPlay) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlay, reducedMotion]);

  // Memoized handlers to prevent unnecessary re-renders
  const handlePause = useCallback(() => {
    setIsAutoPlay(false);
  }, []);

  const handleResume = useCallback(() => {
    setIsAutoPlay(true);
  }, []);

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    setCurrentIndex(newIndex);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 6000);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    setCurrentIndex(newIndex);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 6000);
  }, [currentIndex]);

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlay(true), 6000);
  }, []);

  // Swipe handlers for touch devices
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 6000);
  };

  const current = testimonials[currentIndex];

  // Keyboard controls (left/right, space to pause/play)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === ' ') {
      e.preventDefault();
      setIsAutoPlay(p => !p);
    }
  };

  // Reduced motion: simple static display
  if (reducedMotion) {
    return (
      <section id="testimonials" className="py-16 md:py-20 lg:py-28 -my-16 relative overflow-hidden">
        <Container className="px-4 md:px-6 relative">
          <Reveal as="header" className="mb-12 md:mb-16 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gradient-green mb-3 uppercase">{t.testimonials.heading}</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed px-2">{t.testimonials.subheading}</p>
          </Reveal>
          <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.id} delay={i * 0.1}>
                <div className="text-center p-5 md:p-6 lg:p-8 border border-brand-800/50 rounded-xl bg-black/30 backdrop-blur-sm">
                  <blockquote className="text-base md:text-lg text-gray-300 mb-4 md:mb-6 leading-relaxed">
                    "{tr(testimonial.quote, locale)}"
                  </blockquote>
                  <footer className="text-sm md:text-base text-brand-300">
                    <strong>{testimonial.author}</strong>
                    <span className="text-gray-500 ml-2">{testimonial.role}</span>
                  </footer>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Full interactive carousel enhanced
  return (
    <section
      id="testimonials"
      className="py-16 md:py-20 lg:py-28 -my-16 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >

      <Container className="relative px-4 md:px-6">
        <Reveal as="header" className="mb-12 md:mb-16 lg:mb-20 max-w-3xl mx-auto text-center">
          <h2 id="testimonials-heading" className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gradient-green mb-3 md:mb-4 uppercase">{t.testimonials.heading}</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed px-2">{t.testimonials.subheading}</p>
        </Reveal>
        
        <div className="max-w-5xl mx-auto relative px-4 md:px-6" role="region" aria-roledescription="carousel" aria-label="Testimonials" aria-live="off">
          <div 
            className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-brand-800/50 bg-black/40 backdrop-blur-sm shadow-2xl transition-all duration-300"
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onKeyDown={onKeyDown}
            tabIndex={0}
            aria-describedby="carousel-instructions"
          >
            <p id="carousel-instructions" className="sr-only">Usa le frecce sinistra e destra per cambiare testimonial, spazio per mettere in pausa o avviare.</p>
            {/* Enhanced main content area */}
            <div className="relative h-64 md:h-72 lg:h-80 flex items-center justify-center p-6 md:p-8 lg:p-12">
              {/* Static background decorative elements - hidden on mobile */}
              <div className="absolute inset-0 opacity-30 hidden md:block">
                <div className="absolute w-32 h-32 rounded-full blur-3xl bg-gradient-radial from-emerald-500/15 to-transparent top-1/4 left-1/4" />
                <div className="absolute w-24 h-24 rounded-full blur-2xl bg-gradient-radial from-emerald-600/10 to-transparent bottom-1/4 right-1/3" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center relative z-10 max-w-3xl w-full"
                >
                  {/* Quote mark */}
                  <div className="text-4xl md:text-5xl lg:text-6xl text-brand-500/30 mb-3 md:mb-4 lg:mb-6">
                    "
                  </div>

                  <blockquote
                    className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 mb-6 md:mb-8 leading-relaxed font-light italic px-2"
                    aria-live="polite"
                  >
                    "{tr(current.quote, locale)}"
                  </blockquote>
                  
                  <footer className="flex items-center justify-center gap-3 md:gap-4">
                    {/* Avatar placeholder */}
                    <div 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-500/20 border-2 border-brand-500/40 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/40 flex items-center justify-center transition-all duration-300"
                    >
                      <span className="text-brand-300 font-semibold text-base md:text-lg">
                        {current.author.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-brand-200 font-semibold text-base md:text-lg">
                        {current.author}
                      </div>
                      <div className="text-gray-400 text-xs md:text-sm">
                        {current.role}
                      </div>
                    </div>
                  </footer>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Enhanced progress indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 md:h-1.5 bg-brand-900/40 overflow-hidden" aria-hidden>
              <motion.div
                className="h-full bg-gradient-to-r from-brand-600 to-brand-500"
                initial={{ width: '0%' }}
                animate={{ width: isAutoPlay ? '100%' : '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
                key={`${currentIndex}-${isAutoPlay}`}
              />
            </div>

            {/* Desktop navigation arrows */}
            <div className="hidden md:block">
              <button
                onClick={handlePrevious}
                className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-brand-800/50 hover:border-emerald-500 text-brand-300 hover:text-gray-100 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center backdrop-blur-sm active:scale-95"
                aria-label="Testimonial precedente"
              >
                <Icon name="chevron-left" size={20} className="text-brand-300 lg:w-6 lg:h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-brand-800/50 hover:border-emerald-500 text-brand-300 hover:text-gray-100 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center backdrop-blur-sm active:scale-95"
                aria-label="Testimonial successivo"
              >
                <Icon name="chevron-right" size={20} className="text-brand-300 lg:w-6 lg:h-6" />
              </button>
            </div>
          </div>

          {/* Enhanced navigation dots */}
          <div className="flex justify-center gap-3 mt-10" role="tablist" aria-label="Seleziona testimonial">
            {testimonials.map((testimonial, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`relative transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 ${
                  i === currentIndex
                    ? 'w-8 h-3 bg-brand-500 rounded-full shadow-lg shadow-emerald-500/40'
                    : 'w-3 h-3 bg-brand-800/60 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/40 rounded-full'
                }`}
                role="tab"
                aria-selected={i === currentIndex}
                aria-controls={`testimonial-panel-${i}`}
                id={`testimonial-tab-${i}`}
                aria-label={`Vai al testimonial ${i + 1} di ${testimonials.length} (${testimonial.author})`}
              >
                <span className="sr-only">
                  Testimonial {i + 1} from {testimonial.author}
                </span>
              </button>
            ))}
          </div>

          {/* Auto-play status indicator */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsAutoPlay(p => !p)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 ${
                isAutoPlay
                  ? 'bg-brand-500/10 border border-brand-500/20 text-brand-300'
                  : 'bg-gray-800/60 border border-gray-700/50 text-gray-400'
              }`}
              aria-pressed={!isAutoPlay}
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isAutoPlay ? 'bg-brand-400 animate-pulse' : 'bg-gray-500'
              }`} />
              <span>{isAutoPlay ? 'Pausa autoplay (Space)' : 'Avvia autoplay (Space)'}</span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
