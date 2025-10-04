import React, { forwardRef, memo } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const base = 'inline-flex items-center justify-center rounded-md font-medium tracking-tight transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
const variants: Record<string, string> = {
  primary: 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white',
  ghost: 'bg-transparent hover:bg-white/5 text-gray-200',
  outline: 'border border-gray-700 hover:border-brand-500 text-gray-100'
};
const sizes: Record<string, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-8 text-base'
};

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { variant = 'primary', size = 'md', className, type = 'button', ...props }, ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  })
);
