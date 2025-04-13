import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const AnimatedBackground: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  
  // Verifica se il dispositivo è mobile e/o iOS
  useEffect(() => {
    // Controlla se siamo su un dispositivo mobile e se è iOS
    const checkDevice = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isIOSDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      
      setIsMobile(isMobileDevice);
      setIsIOS(isIOSDevice);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  // Create blobs with different colors based on mode
  const blobColors = {
    light: ['#7C3AED', '#4F46E5', '#10B981', '#F59E0B', '#EC4899'],
    dark: ['#8B5CF6', '#6366F1', '#34D399', '#FBBF24', '#F472B6']
  };
  
  // Riduzione: più blob per desktop, meno per mobile
  const blobCount = isMobile ? 2 : 4;

  // Per iOS, versione semplificata ma più elegante
  if (isIOS) {
    return (
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0" 
          style={{
            background: theme === 'dark' 
              ? 'linear-gradient(135deg, #1f1f1f 0%, #111827 100%)' 
              : 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)'
          }}
        />
        
        {/* Blobs statici ma sfocati per iOS - versione elegante */}
        <div 
          className="absolute rounded-full blur-[70px]"
          style={{
            background: theme === 'dark' ? '#6366F1' : '#4F46E5',
            width: '500px',
            height: '500px',
            left: '50%',
            top: '30%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.4
          }}
        />
        
        <div 
          className="absolute rounded-full blur-[60px]"
          style={{
            background: theme === 'dark' ? '#8B5CF6' : '#7C3AED',
            width: '300px',
            height: '300px',
            left: '25%',
            top: '60%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.3
          }}
        />
        
        <div 
          className="absolute rounded-full blur-[80px]"
          style={{
            background: theme === 'dark' ? '#34D399' : '#10B981',
            width: '350px',
            height: '350px',
            left: '75%',
            top: '40%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.25
          }}
        />
        
        {/* Radial gradient overlay */}
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
  }

  // Versione animata per altri dispositivi
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Large colorful blobs with motion - versione ottimizzata */}
      {[...Array(blobCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${isMobile ? 'blur-[40px]' : 'blur-[50px]'}`}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: 0.4,
            scale: isMobile ? 1 : [1, 1.02, 0.98, 1],
          }}
          transition={{ 
            opacity: { delay: i * 0.2, duration: 1 },
            scale: { 
              duration: 6, 
              repeat: Infinity,
              repeatType: "reverse" as const
            } 
          }}
          style={{
            background: theme === 'dark' 
              ? blobColors.dark[i % blobColors.dark.length]
              : blobColors.light[i % blobColors.light.length],
            width: `${200 + i * 50}px`,
            height: `${200 + i * 50}px`,
            left: `${25 + i * 20}%`,
            top: `${20 + i * 15}%`,
            transform: 'translate(-50%, -50%)',
            mixBlendMode: theme === 'dark' ? 'lighten' : 'multiply',
          }}
        />
      ))}
      
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