import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionSystem } from './MotionProvider';

export const ScrollOrchestrator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { reducedMotion } = useMotionSystem();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Background parallax effect
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0%', '0%'] : ['0%', '-10%']
  );

  // Page progress indicator
  useEffect(() => {
    if (reducedMotion) return;

    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      progressBar.style.transform = `scaleX(${latest})`;
    });

    return unsubscribe;
  }, [scrollYProgress, reducedMotion]);

  return (
    <div ref={containerRef} className="relative">
      {/* Background parallax layer */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{ y: backgroundY }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(var(--accent-highlight-rgb) / 0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(var(--accent-warm-rgb) / 0.02),transparent_50%)]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};