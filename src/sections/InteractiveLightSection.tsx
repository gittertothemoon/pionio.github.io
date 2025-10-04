import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Container } from '../components/layout/Container';
import lampadina from '../assets/lampadina.svg';

export const InteractiveLightSection: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const constraintsRef = useRef(null);
  
  // Mouse tracking per effetti interattivi
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 10 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 10 });
  
  const rotateX = useTransform(springY, [-300, 300], [15, -15]);
  const rotateY = useTransform(springX, [-300, 300], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleClick = () => {
    setIsPressed(true);
    toggleTheme();
    
    // Vibrazione tattile se supportata
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50]);
    }
    
    // Effetto sonoro realistico di una lampadina che si accende/spegne
    try {
      if (typeof AudioContext !== 'undefined') {
        const audioContext = new AudioContext();
        const isCurrentlyLight = theme === 'light'; // Stato attuale prima del toggle
        
        if (!isCurrentlyLight) {
          // ACCENSIONE: Click + ronzio elettrico che si avvia
          
          // 1. Click dell'interruttore per accendere (più netto e secco)
          const clickBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.04, audioContext.sampleRate);
          const clickData = clickBuffer.getChannelData(0);
          for (let i = 0; i < clickData.length; i++) {
            clickData[i] = (Math.random() - 0.5) * 0.35 * Math.exp(-i / (clickData.length * 0.08));
          }
          
          const clickSource = audioContext.createBufferSource();
          const clickGain = audioContext.createGain();
          clickSource.buffer = clickBuffer;
          clickSource.connect(clickGain);
          clickGain.connect(audioContext.destination);
          
          clickGain.gain.setValueAtTime(0.45, audioContext.currentTime);
          clickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.04);
          
          clickSource.start(audioContext.currentTime);
          
          // 2. Ronzio elettrico che si avvia gradualmente
          const buzzOscillator = audioContext.createOscillator();
          const buzzGain = audioContext.createGain();
          const buzzFilter = audioContext.createBiquadFilter();
          
          buzzOscillator.type = 'sawtooth';
          buzzOscillator.frequency.setValueAtTime(50, audioContext.currentTime);
          
          buzzFilter.type = 'lowpass';
          buzzFilter.frequency.setValueAtTime(400, audioContext.currentTime);
          buzzFilter.Q.setValueAtTime(2, audioContext.currentTime);
          
          buzzOscillator.connect(buzzFilter);
          buzzFilter.connect(buzzGain);
          buzzGain.connect(audioContext.destination);
          
          buzzGain.gain.setValueAtTime(0, audioContext.currentTime + 0.05);
          buzzGain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.15);
          buzzGain.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.8);
          
          buzzOscillator.start(audioContext.currentTime + 0.05);
          buzzOscillator.stop(audioContext.currentTime + 0.8);
          
          // 3. Armonica per maggior realismo
          const harmonic = audioContext.createOscillator();
          const harmonicGain = audioContext.createGain();
          
          harmonic.type = 'sine';
          harmonic.frequency.setValueAtTime(150, audioContext.currentTime);
          
          harmonic.connect(harmonicGain);
          harmonicGain.connect(audioContext.destination);
          
          harmonicGain.gain.setValueAtTime(0, audioContext.currentTime + 0.1);
          harmonicGain.gain.exponentialRampToValueAtTime(0.03, audioContext.currentTime + 0.2);
          harmonicGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
          
          harmonic.start(audioContext.currentTime + 0.1);
          harmonic.stop(audioContext.currentTime + 0.6);
          
          // 4. Effetto "WOW" magico quando si accende! ✨
          const wowOscillator = audioContext.createOscillator();
          const wowGain = audioContext.createGain();
          const wowFilter = audioContext.createBiquadFilter();
          
          wowOscillator.type = 'sine';
          
         
          
          // Filtro per effetto magico
          wowFilter.type = 'bandpass';
          wowFilter.frequency.setValueAtTime(800, audioContext.currentTime + 0.3);
          wowFilter.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.8);
          wowFilter.Q.setValueAtTime(3, audioContext.currentTime);
          
          wowOscillator.connect(wowFilter);
          wowFilter.connect(wowGain);
          wowGain.connect(audioContext.destination);
          
          // Volume che cresce con meraviglia
          wowGain.gain.setValueAtTime(0, audioContext.currentTime + 0.3);
          wowGain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.5);
          wowGain.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.7);
          wowGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.2);
          
          wowOscillator.start(audioContext.currentTime + 0.3);
          wowOscillator.stop(audioContext.currentTime + 1.2);
          
          // 5. Campane cristalline per l'effetto magico finale
          for (let i = 0; i < 3; i++) {
            const chimeOsc = audioContext.createOscillator();
            const chimeGain = audioContext.createGain();
            const chimeFilter = audioContext.createBiquadFilter();
            
            chimeOsc.type = 'sine';
            // Note armoniche: Do5, Mi5, Sol5
            const frequencies = [523.25, 659.25, 783.99];
            chimeOsc.frequency.setValueAtTime(frequencies[i], audioContext.currentTime + 0.6 + i * 0.1);
            
            // Filtro per suono cristallino
            chimeFilter.type = 'highpass';
            chimeFilter.frequency.setValueAtTime(400, audioContext.currentTime);
            chimeFilter.Q.setValueAtTime(2, audioContext.currentTime);
            
            chimeOsc.connect(chimeFilter);
            chimeFilter.connect(chimeGain);
            chimeGain.connect(audioContext.destination);
            
            // Suono di campana che si attenua
            chimeGain.gain.setValueAtTime(0, audioContext.currentTime + 0.6 + i * 0.1);
            chimeGain.gain.exponentialRampToValueAtTime(0.08 - i * 0.02, audioContext.currentTime + 0.65 + i * 0.1);
            chimeGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5 + i * 0.2);
            
            chimeOsc.start(audioContext.currentTime + 0.6 + i * 0.1);
            chimeOsc.stop(audioContext.currentTime + 1.5 + i * 0.2);
          }
          
        } else {
          // SPEGNIMENTO: Click diverso + cessazione immediata del ronzio
          
          // 1. Click dell'interruttore per spegnere (più morbido e profondo)
          const clickBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.06, audioContext.sampleRate);
          const clickData = clickBuffer.getChannelData(0);
          for (let i = 0; i < clickData.length; i++) {
            // Click più morbido e con frequenze più basse
            clickData[i] = (Math.random() - 0.5) * 0.25 * Math.exp(-i / (clickData.length * 0.15));
          }
          
          const clickSource = audioContext.createBufferSource();
          const clickGain = audioContext.createGain();
          const clickFilter = audioContext.createBiquadFilter();
          
          clickSource.buffer = clickBuffer;
          
          // Filtro per rendere il click più cupo
          clickFilter.type = 'lowpass';
          clickFilter.frequency.setValueAtTime(300, audioContext.currentTime);
          
          clickSource.connect(clickFilter);
          clickFilter.connect(clickGain);
          clickGain.connect(audioContext.destination);
          
          clickGain.gain.setValueAtTime(0.3, audioContext.currentTime);
          clickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.06);
          
          clickSource.start(audioContext.currentTime);
          
          // 2. Cessazione rapida del ronzio elettrico
          const fadeOutBuzz = audioContext.createOscillator();
          const fadeOutGain = audioContext.createGain();
          const fadeOutFilter = audioContext.createBiquadFilter();
          
          fadeOutBuzz.type = 'sawtooth';
          fadeOutBuzz.frequency.setValueAtTime(50, audioContext.currentTime);
          
          fadeOutFilter.type = 'lowpass';
          fadeOutFilter.frequency.setValueAtTime(400, audioContext.currentTime);
          fadeOutFilter.Q.setValueAtTime(1.5, audioContext.currentTime);
          
          fadeOutBuzz.connect(fadeOutFilter);
          fadeOutFilter.connect(fadeOutGain);
          fadeOutGain.connect(audioContext.destination);
          
          // Parte dal ronzio esistente e si spegne rapidamente
          fadeOutGain.gain.setValueAtTime(0.06, audioContext.currentTime + 0.02);
          fadeOutGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
          
          fadeOutBuzz.start(audioContext.currentTime + 0.02);
          fadeOutBuzz.stop(audioContext.currentTime + 0.25);
          
          // 3. Piccolo "pop" finale dello spegnimento
          const popOscillator = audioContext.createOscillator();
          const popGain = audioContext.createGain();
          
          popOscillator.type = 'square';
          popOscillator.frequency.setValueAtTime(80, audioContext.currentTime);
          
          popOscillator.connect(popGain);
          popGain.connect(audioContext.destination);
          
          popGain.gain.setValueAtTime(0, audioContext.currentTime + 0.15);
          popGain.gain.setValueAtTime(0.02, audioContext.currentTime + 0.16);
          popGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.18);
          
          popOscillator.start(audioContext.currentTime + 0.15);
          popOscillator.stop(audioContext.currentTime + 0.18);
        }
      }
    } catch {
      // Silently fail if audio context is not supported
    }
    
    setTimeout(() => setIsPressed(false), 600);
  };

  const isLight = theme === 'light';

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center -my-16">
      {/* Dynamic Background - Espanso fino ai separatori */}
      <div className="hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isLight 
              ? 'radial-gradient(ellipse 120% 140% at 50% 50%, rgba(var(--accent-highlight-rgb) / 0.3) 0%, rgba(var(--accent-tertiary-rgb) / 0.18) 25%, rgba(var(--theme-gray-100) / 0.12) 50%, rgba(var(--theme-white) / 0.06) 75%, rgba(var(--theme-white) / 0.02) 90%, transparent 100%)'
              : 'radial-gradient(ellipse 120% 140% at 50% 50%, rgba(var(--accent-highlight-rgb) / 0.18) 0%, rgba(var(--accent-primary-rgb) / 0.12) 25%, rgba(var(--accent-forest-rgb) / 0.08) 50%, rgba(var(--accent-deep-rgb) / 0.04) 75%, rgba(var(--accent-night-rgb) / 0.02) 90%, transparent 100%)'
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        
        {/* Overlay gradient per maggior profondità */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isLight 
              ? 'linear-gradient(135deg, rgba(var(--accent-highlight-rgb) / 0.15) 0%, rgba(var(--accent-tertiary-rgb) / 0.08) 20%, transparent 35%, transparent 65%, rgba(var(--theme-gray-100) / 0.06) 80%, rgba(var(--accent-tertiary-rgb) / 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(var(--accent-highlight-rgb) / 0.1) 0%, rgba(var(--accent-primary-rgb) / 0.06) 20%, transparent 35%, transparent 65%, rgba(var(--accent-forest-rgb) / 0.04) 80%, rgba(var(--accent-primary-rgb) / 0.08) 100%)'
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Edge fade per transizione fluida */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isLight 
              ? 'linear-gradient(to bottom, rgba(var(--accent-highlight-rgb) / 0.05) 0%, transparent 15%, transparent 85%, rgba(var(--accent-highlight-rgb) / 0.05) 100%)'
              : 'linear-gradient(to bottom, rgba(var(--accent-highlight-rgb) / 0.03) 0%, transparent 15%, transparent 85%, rgba(var(--accent-highlight-rgb) / 0.03) 100%)'
          }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        
        {/* Subtle texture overlay espansa */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: isLight 
              ? 'radial-gradient(circle at 20% 20%, rgba(var(--accent-highlight-rgb) / 0.06) 0%, transparent 30%), radial-gradient(circle at 80% 20%, rgba(var(--accent-tertiary-rgb) / 0.04) 0%, transparent 30%), radial-gradient(circle at 20% 80%, rgba(var(--theme-gray-100) / 0.05) 0%, transparent 30%), radial-gradient(circle at 80% 80%, rgba(var(--accent-highlight-rgb) / 0.06) 0%, transparent 30%)'
              : 'radial-gradient(circle at 20% 20%, rgba(var(--accent-highlight-rgb) / 0.04) 0%, transparent 30%), radial-gradient(circle at 80% 20%, rgba(var(--accent-primary-rgb) / 0.03) 0%, transparent 30%), radial-gradient(circle at 20% 80%, rgba(var(--accent-forest-rgb) / 0.04) 0%, transparent 30%), radial-gradient(circle at 80% 80%, rgba(var(--accent-highlight-rgb) / 0.04) 0%, transparent 30%)'
          }}
          animate={{
            opacity: isLight ? 0.5 : 0.3
          }}
          transition={{ duration: 1 }}
        />
        
        {/* Animated particles espanse - area completa */}
        <div className="absolute inset-0 -top-16 -bottom-16 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                isLight 
                  ? `bg-brand-${300 + (i % 3) * 100}/60` 
                  : `bg-brand-${300 + (i % 3) * 100}/35`
              }`}
              style={{
                width: `${1 + (i % 4)}px`,
                height: `${1 + (i % 4)}px`,
                left: `${2 + (i * 1.9)}%`,
                top: `${5 + (i % 8) * 11}%`,
              }}
              animate={{
                y: [-50, 50, -50],
                x: [-20, 20, -20],
                opacity: [0.03, 1, 0.03],
                scale: [0.2, 2.5, 0.2],
                rotate: [0, 360, 720],
              }}
              transition={{
                duration: 6 + i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.12,
              }}
            />
          ))}
          
          {/* Edge particles per estendere fino ai bordi */}
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={`edge-${i}`}
              className={`absolute rounded-full ${
                isLight ? 'bg-brand-200/40' : 'bg-brand-200/20'
              }`}
              style={{
                width: `${1 + (i % 3)}px`,
                height: `${1 + (i % 3)}px`,
                left: i < 12 ? `${3 + (i * 8)}%` : `${5 + ((i-12) * 8)}%`,
                top: i < 12 ? '2%' : '95%',
              }}
              animate={{
                opacity: [0.05, 0.8, 0.05],
                scale: [0.3, 2.2, 0.3],
                y: i < 12 ? [-30, 30, -30] : [30, -30, 30],
                x: [-10, 10, -10],
              }}
              transition={{
                duration: 7 + i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.25,
              }}
            />
          ))}
          
          {/* Side particles per completare i lati */}
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={`side-${i}`}
              className={`absolute rounded-full ${
                isLight ? 'bg-brand-300/35' : 'bg-brand-300/18'
              }`}
              style={{
                width: `${1 + (i % 2)}px`,
                height: `${1 + (i % 2)}px`,
                left: i < 8 ? '2%' : '95%',
                top: `${10 + (i % 8) * 10}%`,
              }}
              animate={{
                opacity: [0.08, 0.7, 0.08],
                scale: [0.4, 1.9, 0.4],
                x: i < 8 ? [-15, 15, -15] : [15, -15, 15],
                y: [-25, 25, -25],
              }}
              transition={{
                duration: 5.5 + i * 0.18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.28,
              }}
            />
          ))}
          
          {/* Floating sparks rimossi per evitare lampeggiamento nel tema chiaro */}
          
          {/* Effetto bordi luminosi */}
          <motion.div
            className="absolute inset-0 border border-transparent"
            animate={{
              borderImage: isLight 
                ? 'linear-gradient(45deg, rgba(var(--accent-highlight-rgb) / 0.2), transparent, rgba(var(--accent-tertiary-rgb) / 0.2)) 1'
                : 'linear-gradient(45deg, rgba(var(--accent-highlight-rgb) / 0.1), transparent, rgba(var(--accent-primary-rgb) / 0.1)) 1'
            }}
            transition={{ duration: 2 }}
          />
        </div>
      </div>

      <Container className="relative z-10 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.h2 
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
              animate={{
                textShadow: isLight 
                  ? '0 0 20px rgba(var(--accent-highlight-rgb) / 0.5), 0 0 40px rgba(var(--accent-highlight-rgb) / 0.3)'
                  : '0 0 10px rgba(var(--accent-highlight-rgb) / 0.3)'
              }}
            >
              <motion.span 
                className="bg-gradient-to-r bg-clip-text text-transparent"
                animate={{
                  backgroundImage: isLight 
                    ? 'linear-gradient(45deg, #F59E0B, #FCD34D, #F59E0B)'
                    : 'linear-gradient(45deg, #22C55E, #4ADE80, #10B981)'
                }}
              >
                {isLight ? 'La Luce è Accesa!' : 'Accendi la Luce'}
              </motion.span>
            </motion.h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {isLight 
                ? 'Ora puoi vedere tutto chiaramente. Vuoi tornare nel buio?' 
                : 'Scopri cosa si nasconde nell\'ombra. Clicca la lampadina per illuminare l\'esperienza.'
              }
            </p>
          </motion.div>

          {/* Interactive Lightbulb */}
          <div 
            ref={constraintsRef}
            className="flex justify-center mb-12"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
          >
            <motion.div
              className="relative cursor-pointer"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              {/* Main lightbulb container */}
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
                onClick={handleClick}
                animate={{
                  scale: isPressed ? [1, 1.1, 1] : 1,
                  rotate: isPressed ? [0, -5, 5, -3, 3, 0] : 0
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                
                {/* ✨ EFFETTO WOW VISIVO - Quando si accende la lampadina (da scuro a chiaro) */}
                {isPressed && isLight && (
                  <>
                    {/* Esplosione di raggi luminosi radianti - COLORI INTENSI per sfondo bianco */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={`ray-${i}`}
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0.7, 0],
                          scale: [0, 1.8, 2.5, 0],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 4.5, 
                          delay: i * 0.15,
                          ease: "easeOut" 
                        }}
                      >
                        <div
                          className="absolute top-1/2 left-1/2 w-2 h-40 rounded-full shadow-lg"
                          style={{
                            background: 'linear-gradient(to top, transparent, #FF6B00 20%, #FFD700 50%, #FFA500 80%, transparent)',
                            transformOrigin: 'center bottom',
                            transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                            boxShadow: '0 0 20px #FFD700, 0 0 40px #FF6B00'
                          }}
                        />
                      </motion.div>
                    ))}
                    
                    {/* Onde di energia concentriche - PIÙ VISIBILI */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={`wave-${i}`}
                        className="absolute inset-0 rounded-full border-4"
                        style={{
                          borderColor: i % 2 === 0 ? '#FF6B00' : '#FFD700',
                          boxShadow: `0 0 20px ${i % 2 === 0 ? '#FF6B00' : '#FFD700'}`
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 2.5 + i * 0.5, 5 + i],
                          opacity: [0, 0.9, 0]
                        }}
                        transition={{ 
                          duration: 5, 
                          delay: i * 0.4,
                          ease: "easeOut" 
                        }}
                      />
                    ))}
                    
                    {/* Esplosione di particelle - COLORI CONTRASTANTI */}
                    {[...Array(25)].map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full shadow-lg"
                        style={{
                          background: i % 3 === 0 ? '#FF6B00' : i % 3 === 1 ? '#FFD700' : '#FF4500',
                          boxShadow: `0 0 10px ${i % 3 === 0 ? '#FF6B00' : i % 3 === 1 ? '#FFD700' : '#FF4500'}`
                        }}
                        initial={{ 
                          scale: 0, 
                          x: 0, 
                          y: 0, 
                          opacity: 0 
                        }}
                        animate={{ 
                          scale: [0, 2, 0],
                          x: Math.cos(i * 14.4 * Math.PI / 180) * (140 + Math.random() * 100),
                          y: Math.sin(i * 14.4 * Math.PI / 180) * (140 + Math.random() * 100),
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 6, 
                          delay: 0.8 + i * 0.08,
                          ease: "easeOut" 
                        }}
                      />
                    ))}
                    
                    {/* Stelline scintillanti - PIÙ GRANDI E CONTRASTANTI */}
                    {[...Array(18)].map((_, i) => (
                      <motion.div
                        key={`star-${i}`}
                        className="absolute pointer-events-none text-3xl font-bold"
                        style={{
                          left: `${15 + Math.random() * 70}%`,
                          top: `${15 + Math.random() * 70}%`,
                          color: i % 2 === 0 ? '#FF6B00' : '#FFD700',
                          textShadow: `0 0 10px ${i % 2 === 0 ? '#FF6B00' : '#FFD700'}, 0 0 20px ${i % 2 === 0 ? '#FF6B00' : '#FFD700'}`,
                          filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.8))'
                        }}
                        initial={{ scale: 0, opacity: 0, rotate: 0 }}
                        animate={{ 
                          scale: [0, 2, 1.5, 0],
                          opacity: [0, 1, 0.9, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 7, 
                          delay: 1 + i * 0.25,
                          ease: "easeInOut" 
                        }}
                      >
                        {i % 4 === 0 ? '⭐' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '🌟' : '💫'}
                      </motion.div>
                    ))}
                    
                    {/* Flash luminoso centrale - PIÙ INTENSO */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, #FFD700 0%, #FF6B00 30%, #FF4500 60%, transparent 80%)',
                        boxShadow: '0 0 60px #FFD700, 0 0 120px #FF6B00'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 4, 0],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        ease: "easeOut" 
                      }}
                    />
                    
                    {/* Aureo bagliore pulsante - MOLTO PIÙ VISIBILE */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0.4, 0],
                        scale: [1, 1.5, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 8, 
                        ease: "easeInOut" 
                      }}
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 107, 0, 0.4) 40%, rgba(255, 69, 0, 0.2) 70%, transparent 90%)',
                        filter: 'blur(15px)',
                        boxShadow: '0 0 80px #FFD700, 0 0 160px #FF6B00'
                      }}
                    />
                    
                    {/* Esplosione di scintille aggiuntive */}
                    {[...Array(30)].map((_, i) => (
                      <motion.div
                        key={`spark-${i}`}
                        className="absolute top-1/2 left-1/2 w-1 h-8"
                        style={{
                          background: 'linear-gradient(to top, transparent, #FFD700, transparent)',
                          transformOrigin: 'center bottom'
                        }}
                        initial={{ 
                          scale: 0, 
                          rotate: i * 12,
                          opacity: 0 
                        }}
                        animate={{ 
                          scale: [0, 1.5, 0],
                          rotate: i * 12,
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          delay: 0.5 + i * 0.05,
                          ease: "easeOut" 
                        }}
                      />
                    ))}
                  </>
                )}
                
                {/* Effetto WOW quando si spegne (più sottile) */}
                {isPressed && !isLight && (
                  <>
                    {/* Implosione dolce */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-gray-400/30"
                      initial={{ scale: 1.5, opacity: 0.5 }}
                      animate={{ 
                        scale: [1.5, 0.8, 0],
                        opacity: [0.5, 0.2, 0]
                      }}
                      transition={{ 
                        duration: 0.6, 
                        ease: "easeIn" 
                      }}
                    />
                    
                    {/* Particelle che svaniscono */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={`fade-particle-${i}`}
                        className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-400/60 rounded-full"
                        initial={{ 
                          scale: 1, 
                          x: Math.cos(i * 45 * Math.PI / 180) * 60,
                          y: Math.sin(i * 45 * Math.PI / 180) * 60,
                          opacity: 0.6 
                        }}
                        animate={{ 
                          scale: 0,
                          x: Math.cos(i * 45 * Math.PI / 180) * 20,
                          y: Math.sin(i * 45 * Math.PI / 180) * 20,
                          opacity: 0
                        }}
                        transition={{ 
                          duration: 0.4, 
                          delay: i * 0.03,
                          ease: "easeIn" 
                        }}
                      />
                    ))}
                  </>
                )}
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: isLight
                      ? 'radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.3) 0%, rgba(var(--accent-highlight-rgb) / 0.15) 40%, transparent 70%)'
                      : isHovered 
                      ? 'radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.3) 0%, rgba(var(--accent-highlight-rgb) / 0.1) 40%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(var(--accent-highlight-rgb) / 0.1) 0%, transparent 70%)',
                    scale: isLight ? 1 : isHovered ? 1.1 : 1
                  }}
                  transition={{ duration: 2, repeat: isLight ? 0 : Infinity }}
                />

                {/* Light rays rimossi completamente per evitare strisce arancioni in entrambi i temi */}

                {/* Lightbulb Image */}
                <motion.img
                  src={lampadina}
                  alt="Interactive Lightbulb"
                  className="w-full h-full relative z-10 object-contain"
                  animate={{
                    filter: isLight 
                      ? 'drop-shadow(0 0 30px rgba(var(--accent-highlight-rgb) / 0.8)) drop-shadow(0 0 60px rgba(var(--accent-highlight-rgb) / 0.4)) brightness(1.15) saturate(1.2)' 
                      : isHovered 
                      ? 'drop-shadow(0 0 25px rgba(var(--accent-highlight-rgb) / 0.7)) drop-shadow(0 0 50px rgba(var(--accent-highlight-rgb) / 0.3)) brightness(1.1) saturate(1.2)'
                      : 'drop-shadow(0 0 12px rgba(var(--accent-highlight-rgb) / 0.4)) brightness(0.9) saturate(0.8)',
                    scale: isLight ? 1.03 : isHovered ? 1.02 : 1
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />

                {/* Click ripple effect */}
                {isPressed && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-4"
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      borderColor: isLight ? 'rgba(var(--accent-highlight-rgb) / 0.5)' : 'rgba(var(--accent-highlight-rgb) / 0.5)'
                    }}
                  />
                )}
              </motion.div>


            </motion.div>
          </div>


        </div>
      </Container>
    </section>
  );
};
