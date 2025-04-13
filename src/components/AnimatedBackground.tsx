import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const AnimatedBackground: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  
  // Create blobs with different colors based on mode
  const blobColors = {
    light: ['#7C3AED', '#4F46E5', '#10B981', '#F59E0B', '#EC4899'],
    dark: ['#8B5CF6', '#6366F1', '#34D399', '#FBBF24', '#F472B6']
  };
  
  // Animation variants
  const floatAnimation = {
    initial: { scale: 1, opacity: 0.6 },
    animate: { 
      scale: [1, 1.05, 0.95, 1],
      opacity: [0.6, 0.7, 0.5, 0.6], 
      transition: { 
        duration: 8, 
        repeat: Infinity,
        repeatType: "reverse" as const
      } 
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Large colorful blobs with motion */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[100px]"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: 0.5,
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ 
            opacity: { delay: i * 0.2, duration: 1.5 },
            scale: { 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" as const
            } 
          }}
          style={{
            background: theme === 'dark' 
              ? blobColors.dark[i % blobColors.dark.length]
              : blobColors.light[i % blobColors.light.length],
            width: `${Math.random() * 300 + 200}px`,
            height: `${Math.random() * 300 + 200}px`,
            left: `${Math.random() * 70 + 5}%`,
            top: `${Math.random() * 70 + 5}%`,
            transform: `translate(-50%, -50%)`,
            mixBlendMode: theme === 'dark' ? 'lighten' : 'multiply',
          }}
        />
      ))}
      
      {/* Grid overlay with subtle pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${theme === 'dark' ? '#ffffff' : '#000000'} 2px, transparent 0)`,
          backgroundSize: '30px 30px'
        }}
      />
      
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