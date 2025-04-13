// src/components/PortfolioLoader.tsx
import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

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
  const [isIOS, setIsIOS] = useState(false);

  // Rilevamento dispositivo iOS
  useEffect(() => {
    setIsIOS(/iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  // Simulazione di caricamento con progresso accelerato
  useEffect(() => {
    const startTime = Date.now();
    let timeoutId: NodeJS.Timeout | null = null;

    // Funzione per aumentare il progresso - versione super accelerata per iOS
    const incrementProgress = () => {
      const elapsedTime = Date.now() - startTime;
      // Usa un'equazione più veloce per dispositivi iOS
      const timeProgress = isIOS 
        ? Math.min(99, (elapsedTime / minDisplayTime) * 100 * 2.5)
        : Math.min(99, (elapsedTime / minDisplayTime) * 100 * 1.8);
      
      // Calcolo incremento rapido
      const nextProgress = () => {
        if (isIOS) {
          if (progress < 60) return progress + 10;
          if (progress < 90) return progress + 5;
          return progress + 1;
        } else {
          if (progress < 60) return progress + 6;
          if (progress < 80) return progress + 3;
          if (progress < 95) return progress + 1.5;
          return progress + 0.8;
        }
      };
      
      const newProgress = Math.min(Math.max(timeProgress, nextProgress()), 99);
      setProgress(newProgress);

      // Continua ad incrementare finché non raggiungiamo 99%
      if (newProgress < 99) {
        // Ritardo molto ridotto per iOS
        const delay = isIOS ? 5 : (newProgress > 90 ? 30 : 10);
        timeoutId = setTimeout(incrementProgress, delay);
      }
    };

    // Avvia l'incremento
    timeoutId = setTimeout(incrementProgress, isIOS ? 0 : 10);

    // Gestione del completamento
    const completeTimeout = setTimeout(() => {
      if (timeoutId) clearTimeout(timeoutId);
      
      // Simula il caricamento completo
      setProgress(100);
      
      // Completa immediatamente su iOS o dopo breve ritardo su altri dispositivi
      if (isIOS) {
        if (onLoadingComplete) onLoadingComplete();
        setIsComplete(true);
      } else {
        setTimeout(() => {
          if (onLoadingComplete) onLoadingComplete();
          setTimeout(() => setIsComplete(true), 100);
        }, 50);
      }
    }, minDisplayTime);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(completeTimeout);
    };
  }, [progress, minDisplayTime, onLoadingComplete, isIOS]);

  // Colors based on theme
  const colors = {
    primary: theme === 'dark' ? '#6D28D9' : '#8B5CF6',
    secondary: theme === 'dark' ? '#4F46E5' : '#6366F1',
    text: theme === 'dark' ? '#F9FAFB' : '#1F2937'
  };

  // Se il caricamento è completo, non renderizzare nulla
  if (isComplete) return null;
  
  // Versione super semplificata per iOS
  if (isIOS) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)' }}
      >
        <div className="flex flex-col items-center justify-center px-4 py-6 text-center">
          <div className="w-16 h-16 mb-4">
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{ 
                  backgroundColor: colors.primary, 
                  width: `${progress}%` 
                }}
              />
            </div>
          </div>
          <p 
            className="text-base font-medium"
            style={{ color: colors.text }}
          >
            {destination}
          </p>
        </div>
      </div>
    );
  }
  
  // Versione standard per altri dispositivi
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-80"
      style={{ backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center max-w-lg px-6 py-8 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full border-4 border-t-transparent" 
            style={{ borderColor: `${colors.primary}33`, borderTopColor: colors.primary }}
          >
            <motion.div 
              className="w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </div>
        </div>
        
        <h2 
          className="text-2xl font-bold mb-2"
          style={{ color: colors.text }}
        >
          {destination}
        </h2>
        
        <div 
          className="w-full max-w-md h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3"
        >
          <motion.div 
            className="h-full rounded-full"
            style={{ backgroundColor: colors.primary }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <p 
          className="text-sm font-medium"
          style={{ color: colors.text }}
        >
          {Math.round(progress)}%
        </p>
      </div>
    </motion.div>
  );
};

export default PortfolioLoader;