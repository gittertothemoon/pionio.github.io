import React, { forwardRef, memo } from 'react';
import { cn } from '../../utils/cn';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  bleed?: boolean;
}

export const Section = memo(
  forwardRef<HTMLElement, SectionProps>(function Section(
    { className, children, bleed, ...rest }, ref
  ) {
    const inner = (
      <div className={cn('flex flex-col gap-8', className)} {...rest}>
        {children}
      </div>
    );
    return (
      <section ref={ref} className="py-16 md:py-24 relative">
        {bleed ? inner : <Container>{inner}</Container>}
      </section>
    );
  })
);
