import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const AnimatedBackground: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  // Verifica se il dispositivo è mobile e/o a basse prestazioni
  useEffect(() => {
    // Controlla se siamo su un dispositivo mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      
      // Se è mobile, esegui anche un test di performance
      if (isMobileDevice) {
        // Test semplice: se ci sono pochi core CPU, consideriamo il dispositivo a basse prestazioni
        if (window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4) {
          setIsLowPerformance(true);
        }
      }
    };
    
    checkMobile();
    
    // Aggiungi listener per gestire cambiamenti di orientamento
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Create blobs with different colors based on mode
  const blobColors = {
    light: ['#7C3AED', '#4F46E5', '#10B981', '#F59E0B', '#EC4899'],
    dark: ['#8B5CF6', '#6366F1', '#34D399', '#FBBF24', '#F472B6']
  };
  
  // Riduci il numero di blob per dispositivi mobili
  const blobCount = isLowPerformance ? 2 : (isMobile ? 3 : 5);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Large colorful blobs with motion - ridotti per dispositivi mobili */}
      {[...Array(blobCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${isMobile ? 'blur-[50px]' : 'blur-[100px]'}`}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: isLowPerformance ? 0.3 : 0.5,
            scale: isLowPerformance ? 1 : [1, 1.05, 0.95, 1],
          }}
          transition={{ 
            opacity: { delay: i * 0.2, duration: 1.5 },
            scale: { 
              duration: isLowPerformance ? 0 : 8, 
              repeat: isLowPerformance ? 0 : Infinity,
              repeatType: "reverse" as const
            } 
          }}
          style={{
            background: theme === 'dark' 
              ? blobColors.dark[i % blobColors.dark.length]
              : blobColors.light[i % blobColors.light.length],
            width: `${Math.random() * (isMobile ? 200 : 300) + (isMobile ? 100 : 200)}px`,
            height: `${Math.random() * (isMobile ? 200 : 300) + (isMobile ? 100 : 200)}px`,
            left: `${Math.random() * 70 + 5}%`,
            top: `${Math.random() * 70 + 5}%`,
            transform: `translate(-50%, -50%)`,
            mixBlendMode: theme === 'dark' ? 'lighten' : 'multiply',
          }}
        />
      ))}
      
      {/* Grid overlay con pattern ridotto su mobile */}
      {!isLowPerformance && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${theme === 'dark' ? '#ffffff' : '#000000'} 2px, transparent 0)`,
            backgroundSize: isMobile ? '50px 50px' : '30px 30px'
          }}
        />
      )}
      
      {/* Radial gradient overlay for contrast */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at center, rgba(15, 15, 15, 0) 0%, rgba(15, 15, 15, 0.8) 70%)' 
            : 'radial-gradient(circle at center, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.85) 75%)'
        }}
      />
    </div>
  );
};

export default AnimatedBackground; 