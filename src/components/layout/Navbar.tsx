import React, { useState, useEffect } from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import { Container } from './Container';
import { cn } from '../../utils/cn';
import { AnchorGlow } from '../../motion/AnchorGlow';
import { Logo } from '../ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const navItems: { id: string; anchor: string; tKey: keyof ReturnType<typeof useI18n>['t']['nav'] }[] = [
  { id: 'services', anchor: '#services', tKey: 'services' },
  { id: 'cases', anchor: '#cases', tKey: 'cases' },
  { id: 'process', anchor: '#process', tKey: 'process' },
  { id: 'testimonials', anchor: '#testimonials', tKey: 'testimonials' },
  { id: 'contact', anchor: '#contact', tKey: 'contact' }
];

export const Navbar: React.FC = () => {
  const { t, locale, switchLocale } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const menuOverlayColor = isLight ? 'rgba(255,244,226,0.88)' : 'rgba(0,0,0,0.8)';

  useEffect(() => {
    const handleScroll = () => {
      // Considera "scrolled" dopo aver superato l'altezza della viewport (circa la Hero section)
      const scrolled = window.scrollY > window.innerHeight * 0.8;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'sticky top-0 z-40 backdrop-blur-md transition-colors duration-500',
        isScrolled
          ? (isLight
              ? 'bg-white'
              : 'bg-black')
          : 'bg-transparent'
      )}
    >
      <Container className="flex h-28 md:h-32 lg:h-36 items-center justify-between px-4 md:px-6">
        {/* Left side: Language Switch on mobile, spacer on desktop */}
        <div className="flex items-center">
          <LanguageSwitch 
            current={locale} 
            onSwitch={switchLocale} 
            className="md:hidden" 
          />
          <div className="hidden md:block w-24"></div>
        </div>

        {/* Center: Logo on both mobile and desktop */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Logo size="md" className="md:hidden" />
          <Logo size="xl" className="hidden md:block" />
        </div>

        {/* Right side: Menu on mobile, Language Switch + Menu on desktop */}
        <div className="flex items-center gap-3 md:gap-4">
          <LanguageSwitch 
            current={locale} 
            onSwitch={switchLocale} 
            className="hidden md:flex" 
          />
          <HamburgerMenu 
            isOpen={isMenuOpen} 
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
            isLight={isLight}
          />
        </div>
      </Container>

      {/* Mobile Menu Overlay - Ultra Premium */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            {/* Multi-Layer Background with Particle Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-30"
              onClick={() => setIsMenuOpen(false)}
            >
              {/* Primary Backdrop */}
              <motion.div
                initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
                animate={{ backdropFilter: "blur(20px)", backgroundColor: menuOverlayColor }}
                exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0"
              />
              
              {/* Animated Particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: "50vw", y: "50vh" }}
                  animate={{ 
                    opacity: [0, 0.6, 0], 
                    scale: [0, 1, 0.8], 
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                  className="absolute w-1 h-1 bg-brand-400/40 rounded-full"
                />
              ))}
            </motion.div>
            
            {/* Menu Panel with 3D Transform */}
            <motion.div
              initial={{ 
                opacity: 0, 
                y: -100, 
                scale: 0.8,
                rotateX: -15,
                transformPerspective: 1000
              }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                rotateX: 0,
                transformPerspective: 1000
              }}
              exit={{ 
                opacity: 0, 
                y: -60, 
                scale: 0.95,
                rotateX: 5
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.05
              }}
              className={cn(
                'absolute top-full left-0 w-full bg-gradient-to-br backdrop-blur-2xl border-b-2 shadow-2xl z-40 overflow-hidden max-h-[85vh] overflow-y-auto transition-colors duration-500',
                isLight
                  ? 'from-white/95 via-white/90 to-white/95 border-brand-200/60 shadow-[0_25px_45px_-18px_rgba(var(--theme-brand-300)/0.18)]'
                  : 'from-black/98 via-gray-900/95 to-black/98 border-brand-500/30 shadow-brand-500/10'
              )}
              style={{ 
                boxShadow: '0 25px 50px -12px rgba(var(--accent-highlight-rgb) / 0.25), inset 0 1px 0 rgba(var(--accent-highlight-rgb) / 0.1)' 
              }}
            >
              {/* Animated Background Gradient */}
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(var(--accent-highlight-rgb) / 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(var(--accent-highlight-rgb) / 0.15) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(var(--accent-highlight-rgb) / 0.1) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 opacity-60"
              />
              
              <Container className="py-8 md:py-12 relative px-4 md:px-6">
                {/* Glowing Header Line */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent mb-6 md:mb-8"
                />
                
                <motion.nav 
                  className="flex flex-col gap-2 md:gap-3"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.3
                      }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {navItems.map((i, index) => (
                    <motion.div
                      key={i.id}
                      variants={{
                        hidden: { 
                          opacity: 0, 
                          x: -60,
                          rotateY: -15,
                          filter: "blur(20px)"
                        },
                        visible: { 
                          opacity: 1, 
                          x: 0,
                          rotateY: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.6,
                            ease: [0.23, 1, 0.32, 1]
                          }
                        }
                      }}
                      className="relative overflow-hidden rounded-xl group"
                      whileHover={{ scale: 1.02, z: 10 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <AnchorGlow 
                        to={i.id} 
                        className={cn(
                          'nav-card group relative flex items-center transition-all duration-500 py-4 md:py-6 px-6 md:px-8 text-lg md:text-xl font-semibold tracking-wide border bg-gradient-to-r rounded-xl backdrop-blur-sm min-h-[60px]',
                          isLight
                            ? 'text-brand-800 hover:text-brand-900 border-brand-200/60'
                            : 'text-gray-300 hover:text-white border-brand-800/20 hover:border-brand-400/50 from-transparent to-transparent hover:from-brand-500/5 hover:to-brand-600/10 hover:shadow-2xl hover:shadow-brand-500/20'
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {/* Ripple Effect */}
                        <motion.div
                          className={cn('absolute inset-0 rounded-xl', isLight ? 'nav-ripple' : 'bg-brand-400/10')}
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ 
                            scale: [1, 1.05, 1], 
                            opacity: [0, 0.5, 0],
                            transition: { duration: 0.6 }
                          }}
                        />
                        
                        {/* Glowing Text Effect */}
                        <motion.span 
                          className="relative z-10 block"
                          whileHover={{ 
                            textShadow: "0 0 20px rgba(var(--accent-highlight-rgb) / 0.5)",
                            transition: { duration: 0.3 }
                          }}
                        >
                          {t.nav[i.tKey]}
                        </motion.span>
                        
                        {/* Animated Underline */}
                        <motion.div
                          className="absolute bottom-2 left-8 h-0.5 bg-gradient-to-r from-brand-400 via-brand-300 to-brand-500 rounded-full"
                          initial={{ width: 0, opacity: 0 }}
                          whileHover={{ 
                            width: "calc(100% - 4rem)", 
                            opacity: 1,
                            boxShadow: "0 0 10px rgba(var(--accent-highlight-rgb) / 0.6)"
                          }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                        
                        {/* Floating Index */}
                        <motion.span 
                          className={cn(
                            'nav-index absolute right-6 top-1/2 transform -translate-y-1/2 text-sm font-mono px-2 py-1 rounded-md transition-colors duration-500',
                            isLight ? 'text-brand-600' : 'text-brand-400/70 bg-brand-500/10'
                          )}
                          initial={{ rotate: -5, opacity: 0.7 }}
                          whileHover={{ 
                            rotate: 0, 
                            opacity: 1,
                            scale: 1.1,
                            backgroundColor: "rgba(var(--accent-highlight-rgb) / 0.2)"
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </motion.span>
                        
                        {/* Hover Light Beam */}
                        <motion.div
                          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-brand-400/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ 
                            x: "100%",
                            transition: { duration: 0.6, ease: "easeInOut" }
                          }}
                          style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, -5% 100%)" }}
                        />
                      </AnchorGlow>
                    </motion.div>
                  ))}
                </motion.nav>
                

              </Container>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const HamburgerMenu: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  isLight: boolean;
}> = ({ isOpen, onToggle, isLight }) => {
  return (
    <motion.button
      onClick={onToggle}
      className={cn(
        'menu-toggle relative w-11 h-11 md:w-12 md:h-12 flex flex-col justify-center items-center group rounded-xl overflow-hidden touch-manipulation transition-colors duration-300 shadow-xl',
        isLight
          ? 'border menu-toggle--light'
          : 'bg-black/40 border border-brand-700/40'
      )}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Multi-Layer Glow System */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={isOpen ? {
          background: [
            "radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.2) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.4) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.2) 0%, transparent 70%)"
          ],
          scale: [1, 1.2, 1]
        } : {
          background: "radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0) 0%, transparent 70%)",
          scale: 1
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Rotating Border */}
      <motion.div
        className={cn('menu-toggle__ring absolute inset-0 rounded-xl border', isLight ? undefined : 'border-brand-400/30')}
        animate={{ rotate: isOpen ? 360 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Background Pulse */}
      <motion.div
        className={cn('absolute inset-1 rounded-lg bg-gradient-to-br', isLight ? 'menu-toggle__pulse' : 'from-brand-500/10 to-transparent')}
        animate={isOpen ? { 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1]
        } : { opacity: 0 }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* Magnetic Field Effect */}
      <motion.div
        className="absolute inset-0"
        whileHover={{
          background: "radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.1) 0%, transparent 60%)",
          scale: 1.1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Top Line - Enhanced */}
      <motion.span
        animate={isOpen ? 
          { 
            rotate: 45, 
            y: 7, 
            backgroundColor: "rgb(var(--accent-highlight-rgb))",
            boxShadow: "0 0 10px rgba(var(--accent-highlight-rgb) / 0.6)",
            width: "1.75rem"
          } : 
          { 
            rotate: 0, 
            y: 0, 
            backgroundColor: isLight ? "rgb(var(--theme-brand-600))" : "rgb(var(--theme-gray-200))",
            boxShadow: "0 0 0px rgba(var(--accent-highlight-rgb) / 0)",
            width: "1.5rem"
          }
        }
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-0.5 rounded-full origin-center transition-all duration-300"
        style={{
          background: isOpen ? 
            "linear-gradient(90deg, rgb(var(--accent-highlight-rgb)), rgb(var(--accent-primary-rgb)))" : 
            (isLight
              ? "linear-gradient(90deg, rgb(var(--theme-brand-600)), rgb(var(--theme-brand-500)))"
              : "linear-gradient(90deg, rgb(var(--theme-gray-200)), rgb(var(--theme-gray-300)))"
            )
        }}
      />
      
      {/* Middle Line - Morphing */}
      <motion.span
        animate={isOpen ? 
          { 
            opacity: 0, 
            scale: 0, 
            rotate: 180,
            filter: "blur(4px)"
          } : 
          { 
            opacity: 1, 
            scale: 1, 
            rotate: 0,
            filter: "blur(0px)"
          }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-6 h-0.5 rounded-full transition-all duration-300"
        style={{
          background: isLight
            ? "linear-gradient(90deg, rgb(var(--theme-brand-500)), rgb(var(--theme-brand-400)))"
            : "linear-gradient(90deg, rgb(var(--theme-gray-200)), rgb(var(--theme-gray-300)))",
          marginTop: "0.375rem",
          marginBottom: "0.375rem"
        }}
      />
      
      {/* Bottom Line - Enhanced */}
      <motion.span
        animate={isOpen ? 
          { 
            rotate: -45, 
            y: -7, 
            backgroundColor: "rgb(var(--accent-highlight-rgb))",
            boxShadow: "0 0 10px rgba(var(--accent-highlight-rgb) / 0.6)",
            width: "1.75rem"
          } : 
          { 
            rotate: 0, 
            y: 0, 
            backgroundColor: isLight ? "rgb(var(--theme-brand-500))" : "rgb(var(--theme-gray-200))",
            boxShadow: "0 0 0px rgba(var(--accent-highlight-rgb) / 0)",
            width: "1.5rem"
          }
        }
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-0.5 rounded-full origin-center transition-all duration-300"
        style={{
          background: isOpen ? 
            "linear-gradient(90deg, rgb(var(--accent-highlight-rgb)), rgb(var(--accent-primary-rgb)))" : 
            (isLight
              ? "linear-gradient(90deg, rgb(var(--theme-brand-500)), rgb(var(--theme-brand-400)))"
              : "linear-gradient(90deg, rgb(var(--theme-gray-200)), rgb(var(--theme-gray-300)))"
            )
        }}
      />
      
      {/* Orbital Rings quando aperto */}
      <AnimatePresence>
        {isOpen && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={{ 
                  scale: [1, 1.5 + i * 0.3, 1], 
                  opacity: [0, 0.4, 0],
                  rotate: 360
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 border border-brand-400/30 rounded-full -z-10"
                style={{ 
                  width: `${100 + i * 20}%`,
                  height: `${100 + i * 20}%`,
                  left: `${-i * 10}%`,
                  top: `${-i * 10}%`
                }}
              />
            ))}
            
            {/* Center Glow Pulse */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0.5, 1.2, 0.5], 
                opacity: [0.2, 0.6, 0.2] 
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-2 rounded-lg bg-brand-400/20 blur-sm -z-20"
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Hover Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        whileHover={{
          background: "radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.05) 0%, transparent 70%)"
        }}
      >
        {isOpen && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-400/60 rounded-full"
            animate={{
              x: [0, Math.cos(i * 60) * 20, 0],
              y: [0, Math.sin(i * 60) * 20, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />
        ))}
      </motion.div>
    </motion.button>
  );
};

const LanguageSwitch: React.FC<{ current: 'it' | 'en'; onSwitch: (l: 'it' | 'en') => void; className?: string }> = ({ current, onSwitch, className }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className={cn("flex items-center gap-1 text-[10px] md:text-[11px] font-semibold tracking-wide", className)}>
      {(['it','en'] as const).map(code => (
        <AnchorGlow
          as="button"
          key={code}
          onClick={() => onSwitch(code)}
          className={cn(
            'language-pill px-2 py-1 md:px-3 md:py-2 rounded-md transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center backdrop-blur-sm border border-transparent',
            current === code
              ? (isLight
                ? 'language-pill--active'
                : 'bg-brand-500/20 text-brand-200 shadow-glow-green')
              : (isLight
                ? 'language-pill--idle'
                : 'text-gray-400 hover:text-brand-200')
          )}
          aria-pressed={current === code}
        >
          {code.toUpperCase()}
        </AnchorGlow>
      ))}
    </div>
  );
};
