import React, { forwardRef, memo } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline';
}
export const Badge = memo(
  forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    { variant = 'default', className, ...props }, ref
  ) {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide select-none',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40',
          variant === 'default' && 'bg-brand-500/10 text-brand-300 ring-1 ring-inset ring-brand-500/30',
          variant === 'outline' && 'border border-gray-700 text-gray-300',
          className
        )}
        {...props}
      />
    );
  })
);
