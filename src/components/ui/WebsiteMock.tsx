import React from 'react';
import { cn } from '../../utils/cn';

type Variant = 'landing' | 'dashboard' | 'ecommerce' | 'mobile' | 'saas' | 'checkout';

interface WebsiteMockProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  label?: string;
  density?: 'low' | 'medium' | 'high';
  tone?: 'emerald' | 'neutral';
  height?: number;
}

// SVG-based abstract website mock: keeps bundle light, no external images.
export const WebsiteMock: React.FC<WebsiteMockProps> = ({
  variant = 'landing',
  label,
  density = 'medium',
  tone = 'emerald',
  className,
  height = 160,
  ...rest
}) => {
  const emerald = tone === 'emerald';
  const accentGradient = emerald
    ? 'linear-gradient(120deg, rgba(var(--accent-highlight-rgb) / 0.12), rgba(var(--accent-forest-rgb) / 0) 60%)'
    : 'linear-gradient(120deg, rgba(var(--theme-slate-500) / 0.12), rgba(var(--theme-slate-600) / 0) 60%)';
  const blocks = density === 'high' ? 6 : density === 'low' ? 3 : 4;

  const shapes = Array.from({ length: blocks });

  return (
    <div
      className={cn(
        'relative rounded-xl border border-brand-800/40 bg-gradient-to-br from-black/70 to-brand-900/10 overflow-hidden shadow-inner',
        'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_20%,rgba(var(--accent-highlight-rgb) / 0.15),transparent_70%)] before:opacity-40',
        className
      )}
      style={{ height }}
      aria-label={label || `Mock ${variant}`}
      {...rest}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-black/40 border-b border-brand-800/40 text-[10px] tracking-wider uppercase text-brand-100 opacity-80">
        <span className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400/60" />
          <span className="w-2 h-2 rounded-full bg-brand-400/60" />
          <span className="w-2 h-2 rounded-full bg-brand-500/60" />
        </span>
        <span className="ml-2 truncate">{label || variant}</span>
      </div>
      {/* Content */}
      <div className="p-3 md:p-4 flex flex-col gap-2 h-[calc(100%-1.5rem)]">
        <div className="flex gap-2">
          <div className="h-3 w-1/4 rounded bg-brand-700/40" />
          <div className="h-3 w-1/6 rounded bg-brand-800/40" />
          <div className="h-3 w-1/6 rounded bg-brand-800/40" />
        </div>
        <div className="flex-1 grid grid-cols-12 gap-2 overflow-hidden">
          <div className="col-span-8 space-y-2">
            <div className="h-5 w-3/4 rounded bg-brand-700/40" />
            <div className="h-3 w-2/3 rounded bg-brand-800/40" />
            <div className={cn('mt-2 rounded-md h-16 md:h-20 bg-gradient-to-br', emerald ? 'from-emerald-500/20 to-emerald-400/5' : 'from-slate-500/20 to-slate-400/5', 'border border-brand-700/40 flex items-center justify-center')}> 
              <span className="text-[9px] tracking-widest text-brand-100 opacity-80">HERO</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {shapes.map((_, i) => (
                <div key={i} className="h-10 rounded-md bg-black/30 border border-brand-800/40 flex items-center justify-center">
                  <span className="text-[8px] tracking-wide text-brand-100 opacity-70">CARD</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 space-y-2">
            <div className="h-4 w-3/4 rounded bg-brand-700/40" />
            <div className="space-y-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-2.5 w-full rounded bg-brand-800/40" />
              ))}
            </div>
            <div className={cn('mt-2 h-14 rounded-lg border flex items-center justify-center text-[8px] tracking-widest', emerald ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-slate-500/40 bg-slate-500/10')}>CTA</div>
            <div className="grid grid-cols-2 gap-2">
              <div className={cn('h-8 rounded-md border bg-gradient-to-br flex items-center justify-center text-[8px] tracking-widest text-brand-100 opacity-80', emerald ? 'from-emerald-600/20 to-emerald-400/10 border-emerald-500/30' : 'from-slate-600/20 to-slate-400/10 border-slate-500/30')}>WIDGET</div>
              <div className="h-8 rounded-md border border-brand-700/40 bg-black/30 flex items-center justify-center text-[8px] tracking-widest text-brand-100 opacity-70">AD</div>
            </div>
          </div>
        </div>
        <div className="mt-auto flex gap-2">
          <div className="h-2.5 flex-1 rounded bg-brand-800/40" />
          <div className="h-2.5 w-1/5 rounded bg-brand-700/40" />
        </div>
      </div>
      {/* Accent gradient overlay subtle */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: accentGradient }} />
    </div>
  );
};

export default WebsiteMock;
