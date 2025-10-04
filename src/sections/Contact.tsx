import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../components/ui/icons/Icon';
import { useI18n } from '../i18n/I18nProvider';
import { Container } from '../components/layout/Container';

import { Reveal, Stagger, StaggerItem, useMotionSystem } from '../motion/MotionProvider';

export const Contact: React.FC = () => {
  const { t } = useI18n();
  const { reducedMotion } = useMotionSystem();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      const error = validateField(key, data[key as keyof typeof data]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      form.reset();
      setErrors({});
    }, 1500);
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    setErrors(prev => {
      if (prev[name]) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validate on blur
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, []);

  // Success state
  if (submitStatus === 'success') {
    return (
      <section id="contact" className="py-32 relative overflow-hidden" aria-labelledby="contact-success-title">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--accent-highlight-rgb) / 0.15),transparent_70%)]" />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-20 h-20 rounded-full bg-brand-500/20 border border-brand-400 flex items-center justify-center mx-auto mb-8"
              >
                <Icon name="check-circle" size={46} className="text-brand-400" />
              </motion.div>
              
              <h2 id="contact-success-title" className="text-4xl font-bold text-gradient-green mb-6" aria-live="polite">
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
              
              <motion.button
                onClick={() => setSubmitStatus('idle')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-black/50 border border-brand-500/30 text-brand-200 rounded-xl hover:border-brand-400 transition-colors"
              >
                Torna al form
              </motion.button>
            </Reveal>
          </div>
        </Container>
      </section>
    );
  }

  return (
  <section id="contact" className="py-16 md:py-24 lg:py-32 relative overflow-hidden" aria-labelledby="contact-heading">
      {/* Enhanced background layers */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Primary glow */}
        <div 
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.2) 0%, transparent 70%)',
            animation: reducedMotion ? 'none' : 'pulse-glow 6s ease-in-out infinite alternate'
          }}
        />
        
        {/* Secondary glow */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            animation: reducedMotion ? 'none' : 'pulse-glow 8s ease-in-out infinite alternate reverse'
          }}
        />

        {/* Floating particles */}
        {!reducedMotion && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-brand-400/40 rounded-full"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <Container className="relative z-10 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <Stagger>
              <StaggerItem>
                <motion.div
                  className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs md:text-sm mb-4 md:mb-6"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(var(--accent-highlight-rgb) / 0.4)' }}
                >
                  <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
                  Disponibile per nuovi progetti
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <h2 id="contact-heading" className="text-2xl md:text-4xl lg:text-6xl font-bold text-gradient-green mb-6 md:mb-8 leading-tight uppercase px-2">
                  {t.contact.heading}
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-2">
                  {t.contact.subheading}
                </p>
              </StaggerItem>
            </Stagger>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Enhanced Contact Form */}
            <div className="lg:col-span-3">
              <Reveal>
                <motion.div 
                  className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10"
                  whileHover={{ borderColor: 'rgba(var(--accent-highlight-rgb) / 0.3)' }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8" aria-describedby="contact-instructions">
                    <p id="contact-instructions" className="sr-only">I campi contrassegnati con asterisco sono obbligatori. Gli errori vengono annunciati automaticamente.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-200 mb-2 md:mb-3">
                          Nome e Cognome *
                        </label>
                        <div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={formData.name}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            required
                            aria-required="true"
                            aria-invalid={!!errors.name || undefined}
                            aria-describedby={errors.name ? 'error-name' : undefined}
                            className={`w-full px-4 py-4 md:py-5 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-base touch-manipulation min-h-[52px] ${
                              errors.name 
                                ? 'border-red-500 focus:border-red-400' 
                                : 'border-gray-700 focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(var(--accent-highlight-rgb) / 0.1)]'
                            }`}
                            placeholder="Il tuo nome completo"
                          />
                        </div>
                        {errors.name && (
                          <motion.p 
                            id="error-name"
                            role="alert"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-2"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-200 mb-3">
                          Email *
                        </label>
                        <div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={formData.email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            required
                            aria-required="true"
                            aria-invalid={!!errors.email || undefined}
                            aria-describedby={errors.email ? 'error-email' : undefined}
                            className={`w-full px-4 py-4 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                              errors.email 
                                ? 'border-red-500 focus:border-red-400' 
                                : 'border-gray-700 focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(var(--accent-highlight-rgb) / 0.1)]'
                            }`}
                            placeholder="la-tua@email.com"
                          />
                        </div>
                        {errors.email && (
                          <motion.p 
                            id="error-email"
                            role="alert"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-2"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="project-type-select" className="block text-sm font-medium text-brand-200 mb-3">
                        Tipo di Progetto <span className="text-xs text-gray-500 font-normal">(opzionale)</span>
                      </label>
                      <div>
                        <select
                          id="project-type-select"
                          name="project"
                          defaultValue=""
                          className="w-full px-4 py-4 bg-black/50 border border-gray-700 focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(var(--accent-highlight-rgb) / 0.1)] rounded-xl text-white focus:outline-none transition-all duration-300"
                          aria-describedby="project-type-select-help"
                        >
                          <option value="">Seleziona il tipo di progetto (opzionale)</option>
                          <option value="web-design">Web Design & Development</option>
                          <option value="brand-identity">Brand Identity & Branding</option>
                          <option value="digital-strategy">Strategia Digitale & Marketing</option>
                          <option value="ecommerce">E-commerce & Vendite Online</option>
                          <option value="optimization">Ottimizzazione & Performance</option>
                          <option value="other">Altro (specificare nel messaggio)</option>
                        </select>
                        <p id="project-type-select-help" className="sr-only">Campo opzionale per indicare la categoria del progetto</p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-brand-200 mb-3">
                        Messaggio *
                      </label>
                      <div>
                        <textarea
                          id="message"
                          name="message"
                          defaultValue={formData.message}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          required
                          aria-required="true"
                          aria-invalid={!!errors.message || undefined}
                          aria-describedby={errors.message ? 'error-message' : undefined}
                          rows={6}
                          className={`w-full px-4 py-4 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none ${
                            errors.message 
                              ? 'border-red-500 focus:border-red-400' 
                              : 'border-gray-700 focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(var(--accent-highlight-rgb) / 0.1)]'
                          }`}
                          placeholder="Raccontami del tuo progetto: obiettivi, tempistiche, budget indicativo e qualsiasi dettaglio che ritieni importante..."
                        />
                      </div>
                      {errors.message && (
                        <motion.p 
                          id="error-message"
                          role="alert"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-5 px-8 rounded-xl transition-all duration-300 relative overflow-hidden group"
                      aria-busy={isSubmitting || undefined}
                      aria-live="polite"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Invio in corso...
                          </>
                        ) : (
                          <>
                            Invia Messaggio
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              →
                            </motion.span>
                          </>
                        )}
                      </span>
                      {!reducedMotion && (
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </Reveal>
            </div>

            {/* Enhanced Contact Info */}
            <div className="lg:col-span-2">
              <Reveal delay={0.2}>
                <div className="space-y-6">
                  {/* Direct Contact */}
                  <motion.div 
                    className="bg-black/40 border border-gray-800/50 rounded-2xl p-6"
                    whileHover={{ y: -4, borderColor: 'rgba(var(--accent-highlight-rgb) / 0.3)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                      <Icon name="phone" size={22} className="text-brand-400" />
                      Contatto Diretto
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-300 hover:text-brand-300 transition-colors cursor-pointer">
                        <Icon name="mail" size={18} className="text-brand-400" />
                        <span>ciao@pionio.dev</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300 hover:text-brand-300 transition-colors cursor-pointer">
                        <Icon name="chat" size={18} className="text-brand-400" />
                        <span>WhatsApp: +39 123 456 7890</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Icon name="location" size={18} className="text-brand-400" />
                        <span>Milano, Italia (remoto disponibile)</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Response Time */}
                  <motion.div 
                    className="bg-black/40 border border-gray-800/50 rounded-2xl p-6"
                    whileHover={{ y: -4, borderColor: 'rgba(var(--accent-highlight-rgb) / 0.3)' }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
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
                  </motion.div>

                  {/* Enhanced Process */}
                  <motion.div 
                    className="bg-black/40 border border-gray-800/50 rounded-2xl p-6"
                    whileHover={{ y: -4, borderColor: 'rgba(var(--accent-highlight-rgb) / 0.3)' }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
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
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};