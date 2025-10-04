import React, { useEffect, useRef } from 'react';
import { useMotionSystem } from './MotionProvider';

interface AnchorGlowProps {
  href?: string; // For external links
  to?: string; // For internal section navigation
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  as?: 'a' | 'button' | 'span';
  'aria-label'?: string;
}

export const AnchorGlow: React.FC<AnchorGlowProps> = ({
  href,
  to,
  onClick,
  children,
  className = '',
  disabled = false,
  as = 'a',
  'aria-label': ariaLabel,
}) => {
  const { reducedMotion } = useMotionSystem();
  const ref = useRef<HTMLElement>(null);

  // Smooth scroll to section with header offset
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const headerHeight = 80; // Approximate navbar height
    const elementTop = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementTop,
      behavior: reducedMotion ? 'auto' : 'smooth'
    });

    // Highlight target section briefly
    if (!reducedMotion) {
      element.classList.add('section-highlight');
      setTimeout(() => element.classList.remove('section-highlight'), 1200);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (to) {
      e.preventDefault();
      const sectionId = to.startsWith('#') ? to.slice(1) : to;
      scrollToSection(sectionId);
    }

    onClick?.();
  };

  // Magnetic effect for desktop CTA buttons
  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    
    const element = ref.current;
    const isMagnetic = element.classList.contains('magnetic-cta');
    
    if (!isMagnetic) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < 24) {
        const force = Math.max(0, 1 - distance / 24);
        const moveX = deltaX * force * 0.15;
        const moveY = deltaY * force * 0.15;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        element.style.transform = 'translate(0, 0)';
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion]);

  const baseClasses = `anchor-glow ${className}`;
  const Component = as;

  const commonProps = {
    ref: ref as any,
    className: baseClasses,
    onClick: handleClick,
    'aria-label': ariaLabel,
    ...(disabled && { 'aria-disabled': true, tabIndex: -1 }),
  };

  if (as === 'a' && href) {
    return (
      <a
        {...commonProps}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  if (as === 'button') {
    return (
      <button {...commonProps} type="button" disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <Component {...commonProps} role={to ? 'button' : undefined} tabIndex={to ? 0 : undefined}>
      {children}
    </Component>
  );
};