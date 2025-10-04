import React, { forwardRef, memo } from 'react';
import { cn } from '../../utils/cn';

// Lightweight layout wrapper. Forwarding ref allows parent animations / measurements.
export const Container = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function Container(
    { className, ...props }, ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full max-w-[1920px] px-4 md:px-8 lg:px-16 xl:px-20',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-0',
          className
        )}
        {...props}
      />
    );
  })
);
