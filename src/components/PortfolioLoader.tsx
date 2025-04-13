// src/components/PortfolioLoader.tsx
import React, { useEffect, useState, useContext } from 'react';
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
  minDisplayTime = 600 
}) => {
  const { theme } = useContext(ThemeContext);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Simulazione di caricamento con progresso automatico
  useEffect(() => {
    const startTime = Date.now();
    let timeoutId: NodeJS.Timeout | null = null;

    // Funzione per aumentare gradualmente il progresso
    const incrementProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const timeProgress = Math.min(99, (elapsedTime / minDisplayTime) * 100 * 1.5);
      
      // Calcolo del prossimo incremento basato sul progresso attuale
      // All'inizio aumenta più velocemente, poi rallenta verso la fine
      const nextProgress = () => {
        if (progress < 60) return progress + 4;
        if (progress < 80) return progress + 2;
        if (progress < 95) return progress + 1;
        return progress + 0.5;
      };
      
      // Prendi il massimo tra progresso basato sul tempo e prossimo incremento
      const newProgress = Math.min(Math.max(timeProgress, nextProgress()), 99);
      
      setProgress(newProgress);

      // Continua ad incrementare finché non raggiungiamo 99%
      if (newProgress < 99) {
        // Calcola il ritardo in base al progresso (più veloce)
        let delay = 20; // Da 50ms a 20ms
        if (newProgress > 80) delay = 40; // Da 100ms a 40ms
        if (newProgress > 90) delay = 50; // Da 200ms a 50ms
        
        timeoutId = setTimeout(incrementProgress, delay);
      }
    };

    // Avvia l'incremento
    timeoutId = setTimeout(incrementProgress, 20); // Da 50ms a 20ms

    // Gestione del completamento
    const completeTimeout = setTimeout(() => {
      if (timeoutId) clearTimeout(timeoutId);
      
      // Simula il caricamento completo
      setProgress(100);
      
      // Piccolo ritardo per mostrare 100% prima di completare
      setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete();
        
        // Aspetta ancora un po' prima di chiudere per mostrare 100%
        setTimeout(() => setIsComplete(true), 150); // Da 300ms a 150ms
      }, 100); // Da 200ms a 100ms
    }, minDisplayTime);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(completeTimeout);
    };
  }, [progress, minDisplayTime, onLoadingComplete]);

  // Colors based on theme
  const colors = {
    primary: theme === 'dark' ? '#6D28D9' : '#8B5CF6', // violet-700/500
    secondary: theme === 'dark' ? '#4F46E5' : '#6366F1', // indigo-700/500
    accent: theme === 'dark' ? '#EC4899' : '#F472B6', // pink-600/400
    neutral: theme === 'dark' ? '#1F2937' : '#F9FAFB', // gray-800/gray-50
    text: theme === 'dark' ? '#F9FAFB' : '#1F2937' // gray-50/gray-800
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren", 
        staggerChildren: 0.1 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.5,
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };
  
  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${Math.min(Math.round(progress), 100)}%`,
      transition: { 
        duration: 0.2, 
        ease: "easeOut" 
      }
    }
  };
  
  // Pulse animation for logo
  const pulseVariants = {
    hidden: { scale: 0.8, opacity: 0.5 },
    visible: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Background with blur and gradient */}
          <motion.div 
            className="absolute inset-0" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-indigo-500/10" />
          </motion.div>

          {/* Main content container */}
          <motion.div 
            className="relative z-10 flex flex-col items-center justify-center p-8 max-w-md w-full"
            variants={itemVariants}
          >
            {/* Logo */}
            <motion.div
              className="mb-8 p-4 rounded-full"
              variants={pulseVariants}
            >
              <div className="w-24 h-24 relative">
                <div 
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    filter: 'blur(8px)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                    <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Destination text */}
            <motion.h2 
              className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100"
              variants={itemVariants}
            >
              Caricamento <span 
                className="text-transparent bg-clip-text"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                }}
              >
                {destination}
              </span>
            </motion.h2>

            {/* Animated indicator */}
            <motion.div 
              className="flex space-x-1 mb-8"
              variants={itemVariants}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ 
                    backgroundColor: i === 0 ? colors.primary : i === 1 ? colors.secondary : colors.accent 
                  }}
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.15,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              ))}
            </motion.div>

            {/* Progress container */}
            <motion.div 
              className="w-full flex flex-col items-center"
              variants={itemVariants}
            >
              {/* Progress bar with background */}
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2 relative">
                <motion.div
                  className="h-full rounded-full"
                  style={{ 
                    background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` 
                  }}
                  variants={progressVariants}
                />
              </div>

              {/* Percentage text */}
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {Math.min(Math.round(progress), 100)}%
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioLoader;