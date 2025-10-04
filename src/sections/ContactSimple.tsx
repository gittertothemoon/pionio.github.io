import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { Container } from '../components/layout/Container';
import { Icon } from '../components/ui/icons/Icon';

interface SelectOption {
  value: string;
  label: string;
  icon: React.ComponentProps<typeof Icon>['name'];
}

interface CustomSelectProps {
  name: string;
  placeholder: string;
  options: SelectOption[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ name, placeholder, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (option: SelectOption) => {
    setSelectedValue(option.value);
    setSelectedLabel(option.label);
    setIsOpen(false);
    
    // Update hidden input for form submission
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = option.value;
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValue('');
    setSelectedLabel('');
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = '';
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative">
      {/* Hidden input for form submission */}
      <input
        ref={hiddenInputRef}
        type="hidden"
        name={name}
        value={selectedValue}
      />
      
      {/* Custom Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-4 bg-black/50 border rounded-xl text-left flex items-center justify-between gap-3 transition-all duration-300 hover:bg-black/70 group-hover:border-accent-secondary/50 ${
          isOpen ? 'border-accent-secondary border-accent-glow bg-black/70' : 'border-gray-700 focus:border-accent-secondary focus:border-accent-glow focus:bg-black/70'
        }`}
      >
        <span className={`flex items-center gap-3 truncate ${selectedValue ? 'text-white' : 'text-gray-400'}`}>
          {selectedValue ? (
            <>
              <Icon 
                name={options.find(opt => opt.value === selectedValue)?.icon || 'bulb'} 
                size={18} 
                className="text-accent-tertiary shrink-0" 
              />
              <span>{selectedLabel}</span>
            </>
          ) : (
            <>
              <span className="text-gray-500 text-xs px-2 py-1 bg-white/5 rounded">OPZIONALE</span>
              <span>{placeholder}</span>
            </>
          )}
        </span>
        
        <div className="flex items-center gap-2">
          {selectedValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-md text-gray-400 hover:text-accent-tertiary hover:bg-white/5 transition-colors"
            >
              <span className="text-sm">✕</span>
            </button>
          )}
          <span className={`transition-transform duration-300 text-accent-tertiary ${isOpen ? 'rotate-180' : ''}`}>
            <span className="text-lg">▼</span>
          </span>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full max-h-80 overflow-auto rounded-xl border border-gray-700/60 bg-black/90 backdrop-blur-xl shadow-2xl shadow-brand-500/10">
          <div className="p-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  selectedValue === option.value
                    ? 'bg-accent-primary/20 text-accent-tertiary border border-accent-primary/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Icon 
                  name={option.icon} 
                  size={18} 
                  className={`shrink-0 ${selectedValue === option.value ? 'text-accent-tertiary' : 'text-accent-secondary'}`} 
                />
                <span className="font-medium truncate">{option.label}</span>
                {selectedValue === option.value && (
                  <Icon name="check-circle" size={16} className="ml-auto text-accent-secondary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500/0 via-brand-500/5 to-brand-500/0 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export const ContactSimple: React.FC = () => {
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Il nome deve essere di almeno 2 caratteri' : '';
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Inserisci un indirizzo email valido' : '';
      }
      case 'message':
        return value.length < 10 ? 'Il messaggio deve essere di almeno 10 caratteri' : '';
      default:
        return '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      project: formData.get('project') as string,
      message: formData.get('message') as string
    };
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(data).forEach(key => {
      if (key !== 'project') { // project is optional
        const error = validateField(key, data[key as keyof typeof data]);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      form.reset();
      setErrors({});
    }, 1500);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (submitStatus === 'success') {
    return (
      <section id="contact" className="py-32 -my-16 relative overflow-hidden">
        <Container className="relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-brand-500/20 border border-brand-400 flex items-center justify-center mx-auto mb-8">
              <Icon name="check-circle" size={46} className="text-brand-400" />
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent mb-6">
              Messaggio Inviato!
            </h2>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Grazie per il tuo interesse! Ti risponderò entro 24 ore con una proposta personalizzata.
            </p>
            
            <div className="space-y-4 text-sm text-gray-400 mb-12">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-brand-400 rounded-full" />
                <span>Controlla anche la cartella spam</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-brand-400 rounded-full" />
                <span>Nel frattempo, seguimi sui social per tips e insights</span>
              </div>
            </div>
            
            <button
              onClick={() => setSubmitStatus('idle')}
              className="px-8 py-3 bg-black/50 border border-brand-500/30 text-brand-200 rounded-xl hover:border-brand-400 transition-colors"
            >
              Torna al form
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 -my-16 relative overflow-hidden">
      <Container className="relative z-10 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs md:text-sm mb-4 md:mb-6">
              <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
              Disponibile per nuovi progetti
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent mb-6 md:mb-8 leading-tight uppercase px-2">
              {t.contact.heading}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-2">
              {t.contact.subheading}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 hover:border-brand-500/30 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/10 relative group">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brand-200 mb-2 md:mb-3">
                        Nome e Cognome *
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          onBlur={handleBlur}
                          className={`w-full px-4 py-4 md:py-5 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-base touch-manipulation min-h-[52px] hover:bg-black/70 group-hover:border-brand-600/50 ${
                            errors.name 
                              ? 'border-red-500 focus:border-red-400' 
                              : 'border-gray-700 focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(var(--accent-highlight-rgb) / 0.1)] focus:bg-black/70'
                          }`}
                          placeholder="Il tuo nome completo"
                        />
                        {/* Subtle glow on focus */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500/0 via-brand-500/5 to-brand-500/0 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-200 mb-3">
                        Email *
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          onBlur={handleBlur}
                          className={`w-full px-4 py-4 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-black/70 group-hover:border-brand-600/50 ${
                            errors.email 
                              ? 'border-red-500 focus:border-red-400' 
                              : 'border-gray-700 focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(var(--accent-highlight-rgb) / 0.1)] focus:bg-black/70'
                          }`}
                          placeholder="la-tua@email.com"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500/0 via-brand-500/5 to-brand-500/0 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="project-type-select" className="block text-sm font-medium text-brand-200 mb-3">
                      Tipo di Progetto <span className="text-xs text-gray-500 font-normal">(opzionale)</span>
                    </label>
                    <div className="relative group">
                      <CustomSelect 
                        name="project"
                        placeholder="Seleziona il tipo di progetto (opzionale)"
                        options={[
                          { value: 'web-design', label: 'Web Design & Development', icon: 'rocket' },
                          { value: 'brand-identity', label: 'Brand Identity & Branding', icon: 'palette' },
                          { value: 'digital-strategy', label: 'Strategia Digitale & Marketing', icon: 'target' },
                          { value: 'ecommerce', label: 'E-commerce & Vendite Online', icon: 'chart' },
                          { value: 'optimization', label: 'Ottimizzazione & Performance', icon: 'bolt' },
                          { value: 'other', label: 'Altro (specificare nel messaggio)', icon: 'bulb' }
                        ]}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-200 mb-3">
                      Messaggio *
                    </label>
                    <div className="relative group">
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-4 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none hover:bg-black/70 group-hover:border-brand-600/50 ${
                          errors.message 
                            ? 'border-red-500 focus:border-red-400' 
                            : 'border-gray-700 focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(var(--accent-highlight-rgb) / 0.1)] focus:bg-black/70'
                        }`}
                        placeholder="Raccontami del tuo progetto: obiettivi, tempistiche, budget indicativo e qualsiasi dettaglio che ritieni importante..."
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500/0 via-brand-500/5 to-brand-500/0 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-2">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-5 px-8 rounded-xl transition-all duration-300 relative overflow-hidden group hover:shadow-2xl hover:shadow-brand-500/25 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Invio in corso...
                        </>
                      ) : (
                        <>
                          Invia Messaggio
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </>
                      )}
                    </span>
                  </button>
                </form>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Direct Contact */}
                <div className="bg-black/40 border border-gray-800/50 hover:border-brand-500/30 rounded-2xl p-6 transition-all duration-300 hover:bg-black/60 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 group">
                  <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2 group-hover:text-brand-100 transition-colors duration-300">
                    <Icon name="phone" size={22} className="text-brand-400" />
                    Contatto Diretto
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Icon name="mail" size={18} className="text-brand-400" />
                      <span>ciao@pionio.dev</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Icon name="chat" size={18} className="text-brand-400" />
                      <span>WhatsApp: +39 123 456 7890</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Icon name="location" size={18} className="text-brand-400" />
                      <span>Milano, Italia (remoto disponibile)</span>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-black/40 border border-gray-800/50 hover:border-brand-500/30 rounded-2xl p-6 transition-all duration-300 hover:bg-black/60 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 group">
                  <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2 group-hover:text-brand-100 transition-colors duration-300">
                    <Icon name="bolt" size={22} className="text-brand-400" />
                    Tempi di Risposta
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-brand-400 rounded-full animate-pulse" />
                      <span className="text-gray-300">Email: entro 24 ore</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-brand-400 rounded-full animate-pulse" />
                      <span className="text-gray-300">WhatsApp: stesso giorno</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-brand-400 rounded-full animate-pulse" />
                      <span className="text-gray-300">Consulenza: entro 3 giorni</span>
                    </div>
                  </div>
                </div>

                {/* Process */}
                <div className="bg-black/40 border border-gray-800/50 hover:border-brand-500/30 rounded-2xl p-6 transition-all duration-300 hover:bg-black/60 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 group">
                  <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2 group-hover:text-brand-100 transition-colors duration-300">
                    <Icon name="rocket" size={22} className="text-brand-400" />
                    Come Lavoriamo
                  </h3>
                  <div className="space-y-4 text-sm text-gray-300">
                    <div className="flex gap-4">
                      <span className="text-brand-400 font-mono text-lg">01</span>
                      <div>
                        <div className="font-medium text-white">Analisi Gratuita</div>
                        <div>Valutiamo insieme i tuoi obiettivi</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-brand-400 font-mono text-lg">02</span>
                      <div>
                        <div className="font-medium text-white">Proposta Strategica</div>
                        <div>Piano dettagliato con timeline e costi</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-brand-400 font-mono text-lg">03</span>
                      <div>
                        <div className="font-medium text-white">Implementazione</div>
                        <div>Sviluppo con milestone e feedback continui</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
