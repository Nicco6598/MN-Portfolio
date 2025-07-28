// src/components/PortfolioLoader.tsx
import React, { useEffect, useState, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import logo from '../assets/logo.png';

interface PortfolioLoaderProps {
  destination: string;
  onLoadingComplete?: () => void;
  minDisplayTime?: number;
}

const PortfolioLoader: React.FC<PortfolioLoaderProps> = ({ 
  destination, 
  onLoadingComplete,
  minDisplayTime = 1200 
}) => {
  const { theme } = useContext(ThemeContext);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  // iOS and mobile detection
  useEffect(() => {
    setIsIOS(/iPhone|iPad|iPod/i.test(navigator.userAgent));
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // Real progress tracking with smooth animation
  useEffect(() => {
    const startTime = startTimeRef.current;
    let frameId: number;
    
    const animateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const timeProgress = Math.min(100, (elapsedTime / minDisplayTime) * 100);
      
      // Smooth easing function for natural progression
      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      const easedProgress = easeInOutCubic(timeProgress / 100) * 100;
      setProgress(easedProgress);
      
      if (easedProgress < 100) {
        frameId = requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => {
          if (onLoadingComplete) onLoadingComplete();
          setTimeout(() => setIsComplete(true), 300);
        }, 200);
      }
    };
    
    frameId = requestAnimationFrame(animateProgress);
    
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [minDisplayTime, onLoadingComplete]);

  // Dynamic theme colors
  const colors = {
    primary: theme === 'dark' ? '#8B5CF6' : '#6366F1',
    secondary: theme === 'dark' ? '#06B6D4' : '#0EA5E9',
    accent: theme === 'dark' ? '#F472B6' : '#EC4899',
    background: theme === 'dark' 
      ? (isMobile ? 'rgba(15, 23, 42, 0.92)' : 'rgba(15, 23, 42, 0.85)')
      : (isMobile ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.85)'),
    text: theme === 'dark' ? '#F1F5F9' : '#1E293B',
    muted: theme === 'dark' ? '#64748B' : '#475569'
  };

  // Modern animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: [0.32, 0.72, 0, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.98,
      transition: { 
        duration: 0.3,
        ease: [0.32, 0.72, 0, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const progressVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({
      pathLength: custom / 100,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1]
      }
    })
  };

  // Modern mobile version
  if (isMobile || isIOS) {
    return (
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <div 
              className="absolute inset-0"
              style={{ backgroundColor: colors.background }}
            />
            
            <motion.div 
              className="flex flex-col items-center justify-center p-6 text-center"
              variants={cardVariants}
            >
              {/* Logo */}
              <motion.div
                className="relative mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 dark:from-violet-400/20 dark:to-cyan-400/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 dark:border-white/10">
                  <img src={logo} alt="Logo" className="w-14 h-14 rounded-xl" />
                </div>
              </motion.div>
              
              {/* Text */}
              <motion.div className="space-y-2" variants={cardVariants}>
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>
                  Caricamento
                </h2>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {destination}
                </h3>
              </motion.div>
              
              {/* Modern progress ring */}
              <motion.div 
                className="relative mt-8"
                variants={cardVariants}
              >
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    variants={progressVariants}
                    custom={progress}
                    initial="hidden"
                    animate="visible"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={colors.primary} />
                      <stop offset="100%" stopColor={colors.secondary} />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Percentage in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span 
                    className="text-2xl font-bold"
                    style={{ color: colors.text }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Modern desktop version
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          {/* Enhanced background */}
          <motion.div 
            className="absolute inset-0" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundColor: colors.background,
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 via-transparent to-cyan-500/15" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)]" />
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: i % 2 === 0 ? colors.primary : colors.secondary,
                  left: `${15 + i * 10}%`,
                  top: `${25 + (i % 4) * 15}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Main loader card */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center p-10 max-w-md w-full mx-6"
            variants={cardVariants}
          >
            {/* Logo */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="absolute inset-0 rounded-3xl opacity-20 blur-2xl bg-gradient-to-br from-violet-500 to-cyan-500 animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 dark:from-gray-800/20 dark:to-gray-800/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/30 dark:border-white/20 shadow-2xl">
                <img src={logo} alt="Logo" className="w-16 h-16 rounded-2xl" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div className="space-y-2 mb-8" variants={cardVariants}>
              <h2 className="text-3xl font-bold text-center" style={{ color: colors.text }}>
                Caricamento
              </h2>
              <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {destination}
              </h3>
            </motion.div>

            {/* Modern circular progress */}
            <motion.div 
              className="relative"
              variants={cardVariants}
            >
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-gray-200/30 dark:text-gray-700/30"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#desktopGradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress / 100)}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - progress / 100) }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                />
                <defs>
                  <linearGradient id="desktopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors.primary} />
                    <stop offset="50%" stopColor={colors.secondary} />
                    <stop offset="100%" stopColor={colors.accent} />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Percentage in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.span 
                    className="text-4xl font-bold"
                    style={{ color: colors.text }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
                  <motion.div 
                    className="text-xs opacity-60"
                    style={{ color: colors.text }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    completato
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Status indicator */}
            <motion.div 
              className="mt-6 flex items-center space-x-2"
              variants={cardVariants}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.primary }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-sm opacity-70" style={{ color: colors.text }}>
                {progress < 30 ? "Inizializzando..." : 
                 progress < 60 ? "Caricando risorse..." : 
                 progress < 90 ? "Quasi pronto..." : 
                 "Completato!"}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioLoader;