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
  minDisplayTime = 400 
}) => {
  const { theme } = useContext(ThemeContext);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Rilevamento dispositivo mobile
  useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  // Simulazione di caricamento con progresso automatico
  useEffect(() => {
    const startTime = Date.now();
    let timeoutId: NodeJS.Timeout | null = null;

    // Funzione per aumentare gradualmente il progresso
    const incrementProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const timeProgress = Math.min(99, (elapsedTime / minDisplayTime) * 100 * 1.8);
      
      // Calcolo del prossimo incremento basato sul progresso attuale
      // All'inizio aumenta più velocemente, poi rallenta verso la fine
      const nextProgress = () => {
        if (progress < 60) return progress + 6;
        if (progress < 80) return progress + 3;
        if (progress < 95) return progress + 1.5;
        return progress + 0.8;
      };
      
      // Prendi il massimo tra progresso basato sul tempo e prossimo incremento
      const newProgress = Math.min(Math.max(timeProgress, nextProgress()), 99);
      
      setProgress(newProgress);

      // Continua ad incrementare finché non raggiungiamo 99%
      if (newProgress < 99) {
        // Calcola il ritardo in base al progresso (ancora più veloce)
        let delay = 10;
        if (newProgress > 80) delay = 20;
        if (newProgress > 90) delay = 30;
        
        timeoutId = setTimeout(incrementProgress, delay);
      }
    };

    // Avvia l'incremento
    timeoutId = setTimeout(incrementProgress, 10);

    // Gestione del completamento
    const completeTimeout = setTimeout(() => {
      if (timeoutId) clearTimeout(timeoutId);
      
      // Simula il caricamento completo
      setProgress(100);
      
      // Piccolo ritardo per mostrare 100% prima di completare
      setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete();
        
        // Aspetta ancora un po' prima di chiudere per mostrare 100%
        setTimeout(() => setIsComplete(true), 100);
      }, 50);
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

  // Animation variants (semplificati per mobile)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren", 
        staggerChildren: isMobile ? 0.05 : 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: isMobile ? 0.03 : 0.1,
        staggerDirection: -1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: isMobile ? 0.3 : 0.4 }
    },
    exit: {
      opacity: 0,
      y: isMobile ? -10 : -20,
      transition: { duration: isMobile ? 0.2 : 0.3 }
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

  // Se il caricamento è completo, non renderizzare nulla
  if (isComplete) return null;
  
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-80"
      style={{ backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="flex flex-col items-center justify-center max-w-lg px-6 py-8 text-center">
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-block"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center" 
              style={{ backgroundColor: colors.primary, opacity: 0.9 }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="w-12 h-12 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-bold mb-2"
          style={{ color: colors.text }}
          variants={itemVariants}
        >
          {destination}
        </motion.h2>
        
        <motion.div 
          className="w-full max-w-md h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3"
          variants={itemVariants}
        >
          <motion.div 
            className="h-full rounded-full"
            style={{ backgroundColor: colors.primary, width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        <motion.p 
          className="text-sm font-medium"
          style={{ color: colors.text }}
          variants={itemVariants}
        >
          {Math.round(progress)}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default PortfolioLoader;