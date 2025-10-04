import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionSystem } from './MotionProvider';

interface ScrollytellingStep {
  id: string;
  content: React.ReactNode;
}

interface ScrollytellingProps {
  steps: ScrollytellingStep[];
  stickyImage: React.ReactNode;
  className?: string;
}

export const Scrollytelling: React.FC<ScrollytellingProps> = ({
  steps,
  stickyImage,
  className = '',
}) => {
  const { reducedMotion } = useMotionSystem();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for non-sticky version
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll progress for image transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const imageX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -8, -16, -24, -32]
  );

  // Intersection observer for active step
  useEffect(() => {
    if (reducedMotion || isMobile) {
      setActiveStep(0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-scrolly-step') || '0');
            setActiveStep(stepIndex);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.3 }
    );

    const stepElements = containerRef.current?.querySelectorAll('[data-scrolly-step]');
    stepElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [reducedMotion, isMobile]);

  // Mobile/reduced motion: simple sequential layout
  if (reducedMotion || isMobile) {
    return (
      <div className={className}>
        <div className="space-y-16">
          {steps.map((step, _i) => (
            <div key={step.id} className="space-y-8">
              {/* Image for each step on mobile */}
              <div className="relative">{stickyImage}</div>
              {/* Step content */}
              <div>{step.content}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop: sticky image with scrolling text
  return (
    <div ref={containerRef} className={`relative flex gap-12 ${className}`}>
      {/* Sticky image column */}
      <div className="sticky top-1/4 flex-shrink-0 w-5/12 h-fit">
        <motion.div
          style={{ x: imageX }}
          className="transition-opacity duration-500"
        >
          {stickyImage}
        </motion.div>
      </div>

      {/* Scrolling content column */}
      <div className="flex-1 space-y-32">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            data-scrolly-step={i}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ 
              duration: 0.6, 
              delay: i * 0.1, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className={`transition-all duration-500 ${
              i === activeStep ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {step.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
};