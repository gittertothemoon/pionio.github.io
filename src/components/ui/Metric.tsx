import React, { memo } from 'react';
import { cn } from '../../utils/cn';

interface MetricProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export const Metric: React.FC<MetricProps> = memo(({ label, value, highlight }) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 p-4 rounded-lg border border-gray-800 bg-gray-900/40 backdrop-blur-sm',
        highlight && 'border-brand-500 shadow-[0_0_0_1px_rgba(var(--accent-highlight-rgb) / 0.3)]'
      )}
      role="figure"
      aria-label={`${label} ${value}`}
    >
      <span className="text-xs uppercase tracking-wide text-gray-400">{label}</span>
      <span className="text-2xl font-semibold text-gray-100 tabular-nums">{value}</span>
    </div>
  );
});
