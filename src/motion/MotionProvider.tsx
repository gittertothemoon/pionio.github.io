import React, { createContext, useContext, useMemo, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

// Motion design tokens
export const motionTokens = {
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  duration: { short: 0.45, base: 0.55, long: 0.65 },
  y: { small: 16, base: 20, large: 24 },
  stagger: { tight: 0.06, base: 0.08, loose: 0.09 },
  threshold: 0.15,
};

// Hook to detect prefers-reduced-motion
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

interface MotionContextValue {
  tokens: typeof motionTokens;
  reducedMotion: boolean;
  reveal: (opts?: { distance?: number; delay?: number; duration?: number }) => Variants;
}

const MotionContext = createContext<MotionContextValue | null>(null);

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reducedMotion = useReducedMotion();
  
  const value = useMemo<MotionContextValue>(() => ({
    tokens: motionTokens,
    reducedMotion,
    reveal: ({ distance = motionTokens.y.base, delay = 0, duration = motionTokens.duration.base } = {}) => 
      reducedMotion 
        ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
        : { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0, transition: { duration, delay, ease: motionTokens.ease } } },
  }), [reducedMotion]);

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
};

export const useMotionSystem = () => {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error('useMotionSystem must be used within MotionProvider');
  return ctx;
};

// Reusable reveal component respecting reduced motion
export const Reveal: React.FC<{
  children: React.ReactNode;
  distance?: number;
  delay?: number;
  duration?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
}> = ({ children, distance, delay, duration, as = 'div', className, once = true }) => {
  const { reveal, tokens, reducedMotion } = useMotionSystem();
  const Base = as as any;
  const Tag = motion(Base);
  
  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }
  
  return (
    <Tag
      className={className}
      variants={reveal({ distance, delay, duration })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: tokens.threshold }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </Tag>
  );
};

export const Stagger: React.FC<{
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
  className?: string;
}> = ({ children, as = 'div', delay = 0, stagger, className }) => {
  const { tokens, reducedMotion } = useMotionSystem();
  const Base = as as any;
  const Tag = motion(Base);
  
  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }
  
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: tokens.threshold }}
      variants={{ visible: { transition: { staggerChildren: stagger ?? tokens.stagger.base, delayChildren: delay } } }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </Tag>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; index?: number; customDelay?: number; distance?: number; className?: string; }> = ({ children, customDelay, distance, className }) => {
  const { reveal, reducedMotion } = useMotionSystem();
  
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div className={className} variants={reveal({ delay: customDelay, distance })}>{children}</motion.div>
  );
};

// Hook to build a counter animation for metrics (soft ease)
export const useSoftCounter = (value: number, duration = 1.2) => {
  // This will be integrated when metrics need animated counting; placeholder for future expansion.
  return value;
};
