import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../ui/icons/Icon';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    toggleTheme();
    
    // Reset pressed state after animation
    setTimeout(() => setIsPressed(false), 200);
  };

  const isLight = theme === 'light';

  return (
    <div className={`relative group ${className}`}>
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-black/90 backdrop-blur-sm text-white text-xs rounded-lg border border-brand-500/30 whitespace-nowrap pointer-events-none z-50"
      >
        <span className="font-medium">
          {isLight ? 'Spegni la luce' : 'Accendi la luce'}
        </span>
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl overflow-hidden touch-manipulation group/btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isLight ? 'Attiva tema scuro' : 'Attiva tema chiaro'}
      >
        {/* Background layers */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            background: isLight 
              ? 'radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.2) 0%, transparent 70%)'
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-xl border"
          animate={{
            borderColor: isLight ? 'rgba(var(--accent-highlight-rgb) / 0.4)' : 'rgba(var(--accent-highlight-rgb) / 0.3)',
            rotate: isPressed ? 360 : 0
          }}
          transition={{ 
            borderColor: { duration: 0.3 },
            rotate: { duration: 0.6, ease: 'easeInOut' }
          }}
        />

        {/* Pulsing glow when active */}
        <motion.div
          className="absolute inset-1 rounded-lg"
          animate={isLight ? {
            background: [
              'radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.1) 0%, transparent 60%)',
              'radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.3) 0%, transparent 60%)',
              'radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.1) 0%, transparent 60%)'
            ],
            scale: [1, 1.05, 1]
          } : {
            background: 'radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0) 0%, transparent 60%)',
            scale: 1
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10"
          animate={{
            rotate: isPressed ? [0, -10, 10, -5, 5, 0] : 0,
            scale: isPressed ? [1, 1.1, 1] : 1
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <Icon 
            name="bulb" 
            size={20} 
            className={`transition-colors duration-300 ${
              isLight ? 'text-brand-400' : 'text-gray-400 group-hover/btn:text-brand-400'
            }`} 
          />
        </motion.div>

        {/* Light rays when active */}
        {isLight && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-4 bg-brand-400/60 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '50% 100%',
                  transform: `rotate(${i * 60}deg) translateX(-50%) translateY(-24px)`
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  height: ['12px', '16px', '12px']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Click ripple effect */}
        {isPressed && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: isLight 
                ? 'radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.3) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.3) 0%, transparent 70%)'
            }}
          />
        )}
      </motion.button>
    </div>
  );
};