import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Icon } from './icons/Icon';

// Accessible custom select (ARIA combobox with listbox popup)
// Keyboard support: Enter/Space toggle, ArrowUp/Down navigate, Home/End jump, Escape close, typeahead (first-letter basic)

export interface ProjectTypeOption {
  value: string;
  label: string;
  group: string;
  icon: React.ComponentProps<typeof Icon>['name'];
  description?: string;
}

interface ProjectTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  'aria-describedby'?: string;
}

const OPTIONS: ProjectTypeOption[] = [
  { value: 'web-design', label: 'Web Design & Development', group: 'Creazione', icon: 'rocket', description: 'Siti, landing, web app' },
  { value: 'brand-identity', label: 'Brand Identity & Branding', group: 'Creazione', icon: 'palette', description: 'Logo, tono, immagine' },
  { value: 'digital-strategy', label: 'Strategia Digitale & Marketing', group: 'Crescita', icon: 'target', description: 'Pianificazione e canali' },
  { value: 'ecommerce', label: 'E-commerce & Vendite Online', group: 'Crescita', icon: 'chart', description: 'Conversioni e funnel' },
  { value: 'optimization', label: 'Ottimizzazione & Performance', group: 'Crescita', icon: 'bolt', description: 'Velocità & flussi' },
  { value: 'other', label: 'Altro (specificare nel messaggio)', group: 'Altro', icon: 'bulb', description: 'Idea fuori categoria' }
];

const groups = Array.from(new Set(OPTIONS.map(o => o.group)));

export const ProjectTypeSelect: React.FC<ProjectTypeSelectProps> = ({
  value,
  onChange,
  id,
  placeholder = 'Seleziona il tipo di progetto',
  className,
  disabled,
  'aria-describedby': ariaDescribedBy
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [typeahead, setTypeahead] = useState('');
  const typeTimeout = useRef<number | null>(null);
  const instanceId = useId();
  const listboxId = `${instanceId}-listbox`;

  const currentOption = OPTIONS.find(o => o.value === value) || null;

  const commitChange = useCallback((opt: ProjectTypeOption) => {
    onChange(opt.value);
    setOpen(false);
    buttonRef.current?.focus();
  }, [onChange]);

  const openList = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    // Set active to current or first
    const idx = currentOption ? OPTIONS.findIndex(o => o.value === currentOption.value) : 0;
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [disabled, currentOption]);

  const closeList = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!buttonRef.current || !listRef.current) return;
      if (buttonRef.current.contains(e.target as Node)) return;
      if (listRef.current.contains(e.target as Node)) return;
      closeList();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, closeList]);

  // Typeahead basic (first-letter accumulation)
  useEffect(() => {
    if (!typeahead) return;
    const lower = typeahead.toLowerCase();
    const found = OPTIONS.findIndex(o => o.label.toLowerCase().startsWith(lower));
    if (found >= 0) {
      setActiveIndex(found);
      if (open) {
        const el = listRef.current?.querySelector(`[data-index='${found}']`);
        if (el) (el as HTMLElement).scrollIntoView({ block: 'nearest' });
      }
    }
  }, [typeahead, open]);

  const handleButtonKey = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) openList(); else setActiveIndex(i => Math.min(OPTIONS.length - 1, (i < 0 ? 0 : i + 1)));
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!open) openList(); else setActiveIndex(i => Math.max(0, (i < 0 ? OPTIONS.length - 1 : i - 1)));
        break;
      case 'Enter':
      case ' ': // Space
        e.preventDefault();
        if (!open) openList(); else if (activeIndex >= 0) commitChange(OPTIONS[activeIndex]);
        break;
      case 'Home':
        if (open) { e.preventDefault(); setActiveIndex(0); }
        break;
      case 'End':
        if (open) { e.preventDefault(); setActiveIndex(OPTIONS.length - 1); }
        break;
      case 'Escape':
        if (open) { e.preventDefault(); closeList(); }
        break;
      default:
        if (e.key.length === 1 && /[\w\d]/i.test(e.key)) {
          const next = (typeahead + e.key).slice(-30);
            setTypeahead(next);
            if (typeTimeout.current) window.clearTimeout(typeTimeout.current);
            typeTimeout.current = window.setTimeout(() => setTypeahead(''), 800);
        }
    }
  };

  const handleOptionKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      commitChange(OPTIONS[index]);
    }
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    buttonRef.current?.focus();
  };

  return (
    <div className={cn('relative text-left', className)}>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-activedescendant={open && activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        onClick={() => (open ? closeList() : openList())}
        onKeyDown={handleButtonKey}
        className={cn(
          'w-full px-4 py-4 bg-black/50 border rounded-xl text-left flex items-center justify-between gap-3 text-white transition-all duration-300 focus:outline-none',
          open ? 'border-brand-400 shadow-[0_0_0_3px_rgba(var(--accent-highlight-rgb) / 0.1)]' : 'border-gray-700 hover:border-brand-500 focus:border-brand-500',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className={cn('flex items-center gap-2 truncate text-sm sm:text-base', !currentOption && 'text-gray-400')}> 
          {currentOption ? (
            <>
              <Icon name={currentOption.icon} size={18} className="text-brand-300" />
              <span className="truncate">{currentOption.label}</span>
            </>
          ) : (
            <span className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] tracking-wider bg-white/5 text-gray-500 rounded">PLACEHOLDER</span>
              {placeholder}
            </span>
          )}
        </span>
        <span className="flex items-center gap-2">
          {currentOption && (
            <button
              type="button"
              aria-label="Reset selezione"
              onClick={clearSelection}
              className="p-1 rounded-md text-gray-400 hover:text-brand-300 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
            >
              <Icon name="check-circle" size={16} className="rotate-45 text-gray-500" />
            </button>
          )}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            className="transition-transform text-brand-300"
          >
            <Icon name="chevron-right" size={18} className="-rotate-90" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={listRef}
            id={listboxId}
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute z-20 mt-2 w-full max-h-80 overflow-auto rounded-xl border border-gray-700/60 bg-black/80 backdrop-blur-xl shadow-lg p-1 focus:outline-none"
            tabIndex={-1}
          >
            {groups.map(group => (
              <div key={group} className="py-1">
                <div className="px-2 py-1 text-[10px] tracking-wider uppercase text-gray-500 font-medium select-none" aria-hidden="true">{group}</div>
                {OPTIONS.filter(o => o.group === group).map((opt) => {
                  const globalIndex = OPTIONS.findIndex(o => o.value === opt.value); // stable
                  const selected = value === opt.value;
                  const active = activeIndex === globalIndex;
                  return (
                    <div
                      id={`${listboxId}-opt-${globalIndex}`}
                      key={opt.value}
                      role="option"
                      aria-selected={selected}
                      data-index={globalIndex}
                      tabIndex={-1}
                      onMouseEnter={() => setActiveIndex(globalIndex)}
                      onClick={() => commitChange(opt)}
                      onKeyDown={(e) => handleOptionKey(e, globalIndex)}
                      className={cn(
                        'flex items-start gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors select-none',
                        active ? 'bg-brand-500/15 text-brand-100' : 'text-gray-300 hover:bg-white/5',
                        selected && 'ring-1 ring-brand-500/40'
                      )}
                    >
                      <Icon name={opt.icon} size={18} className="mt-0.5 text-brand-300 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium leading-snug truncate">{opt.label}</span>
                        {opt.description && (
                          <span className="text-[11px] text-gray-500 truncate">{opt.description}</span>
                        )}
                      </div>
                      {selected && (
                        <Icon name="check-circle" size={16} className="ml-auto text-brand-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <p id={`${instanceId}-help`} className="mt-2 text-xs text-gray-500">
        Opzionale: aiuta a indirizzare meglio la consulenza.
      </p>
    </div>
  );
};

export default ProjectTypeSelect;
