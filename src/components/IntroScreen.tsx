import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Sparkles } from 'lucide-react';

interface IntroScreenProps {
  onComplete?: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if user has already seen the intro during this browser session
    const hasSeenIntro = sessionStorage.getItem('paras_intro_viewed');
    
    if (hasSeenIntro) {
      // Repeat visit: Skip intro completely to ensure fast and user-friendly browsing
      if (onComplete) onComplete();
      return;
    }

    // First visit: Show the cinematic intro
    setShouldRender(true);

    // Timeline for cinematic sequence:
    // 0.0s - 0.6s: "WELCOME TO" fades in
    // 0.7s - 1.8s: "PARAS ENTERPRISES" reveals with cinematic text-reveal
    // 1.5s - 2.5s: Tagline reveals
    // 2.7s: Start smooth zoom/fade out into the homepage hero
    // 3.3s: Complete and unmount
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2700);

    const completeTimer = setTimeout(() => {
      sessionStorage.setItem('paras_intro_viewed', 'true');
      setShouldRender(false);
      if (onComplete) onComplete();
    }, 3300);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const skipIntro = () => {
    sessionStorage.setItem('paras_intro_viewed', 'true');
    setIsFadingOut(true);
    setTimeout(() => {
      setShouldRender(false);
      if (onComplete) onComplete();
    }, 400);
  };

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {!isFadingOut ? (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050912] text-white px-6 overflow-hidden select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          {/* Delicate Architectural Gridlines */}
          <div className="absolute inset-0 bg-solar-grid opacity-[0.12] pointer-events-none" />

          {/* Skip Button */}
          <button
            id="skip-intro-btn"
            onClick={skipIntro}
            aria-label="Skip Intro"
            className="absolute top-6 right-6 sm:top-8 sm:right-8 text-[11px] font-mono tracking-widest text-slate-400 hover:text-amber-400 uppercase py-1.5 px-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all duration-300 cursor-pointer flex items-center gap-1.5"
          >
            <span>Skip</span>
            <span className="text-amber-400">→</span>
          </button>

          {/* Central Cinematic Typography Reveal */}
          <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
            
            {/* Solar Icon Crest */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 flex items-center justify-center"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-[1px] shadow-lg shadow-amber-500/25">
                <div className="w-full h-full bg-[#070E1C] rounded-[11px] flex items-center justify-center">
                  <Sun className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            </motion.div>

            {/* "WELCOME TO" */}
            <div className="overflow-hidden mb-3">
              <motion.p
                initial={{ opacity: 0, y: 18, letterSpacing: '0.2em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-xs sm:text-sm font-semibold uppercase text-amber-400/90 pl-[0.35em]"
              >
                WELCOME TO
              </motion.p>
            </div>

            {/* "PARAS ENTERPRISES" with Cinematic Reveal */}
            <div className="overflow-hidden py-1 mb-4">
              <motion.h1
                initial={{ opacity: 0, y: 45, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase relative"
              >
                <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-300">
                  PARAS ENTERPRISES
                </span>
                {/* Subtle light bar accent */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2px] w-32 sm:w-48 mx-auto mt-3 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                />
              </motion.h1>
            </div>

            {/* "Solar Solutions • Government Contract Work • Professional Execution" */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide flex items-center justify-center flex-wrap gap-x-2 gap-y-1"
              >
                <span>Solar Solutions</span>
                <span className="text-amber-400 font-bold">•</span>
                <span>Government Contract Work</span>
                <span className="text-amber-400 font-bold">•</span>
                <span>Professional Execution</span>
              </motion.p>
            </div>

            {/* Subtle Progress Track */}
            <div className="w-28 sm:w-36 h-[1.5px] bg-white/10 rounded-full mt-8 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.6, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
