import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionSystem } from './MotionProvider';

interface SectionSeparatorProps {
  className?: string;
}

export const SectionSeparator: React.FC<SectionSeparatorProps> = ({ className = '' }) => {
  const { reducedMotion } = useMotionSystem();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  if (reducedMotion) {
    return (
      <div className={`w-full h-px bg-gradient-to-r from-transparent via-brand-600/30 to-transparent ${className}`} />
    );
  }

  return (
    <div ref={ref} className={`relative w-full h-px ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-800/20 to-transparent" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-600/40 to-transparent origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};