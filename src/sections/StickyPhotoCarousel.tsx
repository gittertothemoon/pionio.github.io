import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n } from '../i18n/I18nProvider';
import { useMotionSystem } from '../motion/MotionProvider';
import { useTheme } from '../contexts/ThemeContext';
import { tr } from '../utils/loc';
import { stickySteps, Vector, StickyImage } from '../data/stickyCarousel';
import { cn } from '../utils/cn';

// Helper per calcolare gli offset iniziali based on vector
const getVectorTransform = (vector: Vector, rotate = 0, depth = 0) => {
  const baseOffset = {
    right: { x: '18vw', y: '0vh' },
    left: { x: '-18vw', y: '0vh' },
    top: { x: '0vw', y: '-14vh' },
    bottom: { x: '0vw', y: '14vh' },
    'corner-tr': { x: '14vw', y: '-10vh' },
    'corner-tl': { x: '-14vw', y: '-10vh' },
    'corner-br': { x: '14vw', y: '10vh' },
    'corner-bl': { x: '-14vw', y: '10vh' }
  };

  const offset = baseOffset[vector];
  const parallaxExtra = depth * 0.03; // 2-6% extra parallax per depth (più sottile)

  return {
    initial: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      rotate: rotate,
      scale: 0.96, // Scaling più sottile
      willChange: 'transform, opacity'
    },
    animate: {
      opacity: 1,
      x: '0vw',
      y: `${parallaxExtra * 100}vh`, // Leggero parallax per profondità
      rotate: 0,
      scale: 1,
      willChange: 'auto'
    }
  };
};

interface StickyImageComponentProps {
  image: StickyImage;
  isActive: boolean;
  imageIndex: number;
  totalImages: number;
}

const StickyImageComponent: React.FC<StickyImageComponentProps> = ({ 
  image, 
  isActive, 
  imageIndex,
  totalImages 
}) => {
  const { locale } = useI18n();
  const { tokens, reducedMotion } = useMotionSystem();
  const transforms = getVectorTransform(image.from, image.rotate, image.depth);

  // Calcola dimensioni e posizione centrate per 1-2 immagini
  const getImageLayout = (index: number, total: number) => {
    if (total === 1) {
      // Singola immagine: responsive sizing
      return {
        width: '85%', // Più grande su mobile
        height: '65%', 
        left: '7.5%', 
        top: '17.5%',
        position: 'absolute' as const,
        zIndex: 1,
      };
    } else {
      // Due immagini: stack verticalmente su mobile, side-by-side su desktop
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      
      if (isMobile) {
        // Layout intersecato per mobile
        const layouts = [
          {
            width: '75%',
            height: '45%', 
            left: '5%',
            top: '15%',
            position: 'absolute' as const,
            zIndex: 1,
          },
          {
            width: '75%',
            height: '45%',
            left: '20%',
            top: '40%',
            position: 'absolute' as const,
            zIndex: 2,
          }
        ];
        return layouts[index];
      } else {
        // Layout orizzontale per desktop
        const layouts = [
          {
            width: '45%',
            height: '55%', 
            left: '7.5%',
            top: '22.5%',
            position: 'absolute' as const,
            zIndex: 1,
          },
          {
            width: '45%',
            height: '55%',
            left: '47.5%',
            top: '22.5%',
            position: 'absolute' as const,
            zIndex: 1,
          }
        ];
        return layouts[index];
      }
    }
  };

  const layout = getImageLayout(imageIndex, totalImages);

  if (reducedMotion) {
    return (
      <div 
        className="rounded-2xl overflow-hidden shadow-xl"
        style={{
          position: 'absolute',
          width: layout.width,
          height: layout.height,
          left: layout.left,
          top: layout.top,
          zIndex: layout.zIndex || 1,
        }}
      >
        <img
          src={image.src}
          alt={tr(image.alt, locale)}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <motion.div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{
        position: 'absolute',
        width: layout.width,
        height: layout.height,
        left: layout.left,
        top: layout.top,
        zIndex: layout.zIndex,
      }}
      initial={transforms.initial}
      animate={isActive ? transforms.animate : transforms.initial}
      transition={{
        duration: tokens.duration.long, // Più lento per eleganza
        ease: tokens.ease,
        delay: isActive ? imageIndex * (tokens.stagger.base * 1.5) : 0 // Stagger più pronunciato
      }}
    >
      <div className="relative w-full h-full group">
        <img
          src={image.src}
          alt={tr(image.alt, locale)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading={imageIndex === 0 ? 'eager' : 'lazy'}
          decoding="async"
          sizes="(max-width: 768px) 90vw, 70vw"
        />
        {/* Subtle overlay per depth */}
        <div className="hidden" />
      </div>
    </motion.div>
  );
};

export const StickyPhotoCarousel: React.FC = () => {
  const { locale } = useI18n();
  const { tokens, reducedMotion } = useMotionSystem();
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const isLight = theme === 'light';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const stepProgress = useTransform(scrollYProgress, [0, 0.7], [0, stickySteps.length]);

  useEffect(() => {
    if (reducedMotion) return;

    const unsubscribe = stepProgress.on('change', (latest) => {
      // Migliore calcolo per includere tutti gli step
      const progress = Math.max(0, Math.min(latest, stickySteps.length - 0.01));
      const newIndex = Math.floor(progress);
      setActiveStepIndex(Math.min(newIndex, stickySteps.length - 1));
    });

    return unsubscribe;
  }, [stepProgress, reducedMotion]);

  // Reduced motion fallback: static panels centered
  if (reducedMotion) {
    return (
      <section className={cn(
        "py-16 md:py-24 transition-colors duration-500",
        isLight ? "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50" : "bg-black"
      )}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 md:space-y-32">
            {stickySteps.map((step, _index) => (
              <div key={step.id} className="text-center">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8">
                  {step.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="w-full max-w-sm md:max-w-lg">
                      <div className="aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={image.src}
                          alt={tr(image.alt, locale)}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative -my-16" style={{ height: window.innerWidth < 768 ? '280vh' : '350vh', marginTop: '-4rem', marginBottom: '-4rem' }}>
      {/* Sticky Content */}
      <div
        ref={stickyRef}
        className={cn(
          "sticky top-0 h-screen w-full overflow-hidden transition-colors duration-500",
          isLight ? "bg-gradient-to-br from-gray-50 via-white to-gray-100" : "bg-black"
        )}
        style={{ marginTop: '-4rem', marginBottom: '-4rem', height: 'calc(100vh + 8rem)' }}
      >


        {/* Full Screen Image Container */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {stickySteps.map((step, stepIndex) => (
              <div key={step.id} id={`step-${step.id}`} className="absolute inset-0">
                {step.images.map((image, imageIndex) => (
                  <StickyImageComponent
                    key={`${step.id}-${imageIndex}`}
                    image={image}
                    isActive={stepIndex === activeStepIndex}
                    imageIndex={imageIndex}
                    totalImages={step.images.length}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Clean Scroll Indicators - Hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
          {/* Left Side - Up Arrow */}
          <motion.div
            animate={{ 
              y: [0, -12, 0],
              opacity: activeStepIndex === 0 ? 0.3 : 0.8
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute left-8 lg:left-24 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 md:gap-4"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              className={cn(
                "md:w-6 md:h-6",
                isLight ? "text-gray-600/70" : "text-white/70"
              )}
            >
              <path 
                d="M12 19V5m-7 7l7-7 7 7" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <div className={cn(
              "font-medium text-base md:text-lg tracking-wider flex flex-col items-center leading-tight",
              isLight ? "text-gray-600/70" : "text-white/70"
            )}>
              <span>S</span>
              <span>C</span>
              <span>R</span>
              <span>O</span>
              <span>L</span>
              <span>L</span>
            </div>
          </motion.div>

          {/* Right Side - Down Arrow */}
          <motion.div
            animate={{ 
              y: [0, 12, 0],
              opacity: activeStepIndex === stickySteps.length - 1 ? 0.3 : 0.8
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute right-8 lg:right-24 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 md:gap-4"
          >
            <div className={cn(
              "font-medium text-base md:text-lg tracking-wider flex flex-col items-center leading-tight",
              isLight ? "text-gray-600/70" : "text-white/70"
            )}>
              <span>S</span>
              <span>C</span>
              <span>R</span>
              <span>O</span>
              <span>L</span>
              <span>L</span>
            </div>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              className={cn(
                "md:w-6 md:h-6",
                isLight ? "text-gray-600/70" : "text-white/70"
              )}
            >
              <path 
                d="M12 5v14m-7-7l7 7 7-7" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
        
        {/* Mobile Progress Indicator - Removed */}

      </div>
    </section>
  );
};
