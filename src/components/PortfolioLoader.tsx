// src/components/PortfolioLoader.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface PortfolioLoaderProps {
  destination: string;
}

const PortfolioLoader: React.FC<PortfolioLoaderProps> = ({ destination }) => {
  // Animation variants for loader squares
  const containerVariants = {
    start: {},
    end: {
      transition: {
        staggerChildren: 0.1,
        repeat: Infinity
      }
    }
  };

  const squareVariants = {
    start: { 
      scaleY: 1
    },
    end: { 
      scaleY: [1, 2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  // Text animation
  const textVariants = {
    start: { 
      opacity: 0.7
    },
    end: { 
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  return (
    <div className="loader-container">
      <motion.div 
        className="portfolio-loader"
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        <motion.div 
          className="loader-square"
          variants={squareVariants}
          style={{ backgroundColor: 'var(--color-accent-primary)' }}
        />
        <motion.div 
          className="loader-square"
          variants={squareVariants}
          style={{ backgroundColor: 'var(--color-violet)' }}
        />
        <motion.div 
          className="loader-square"
          variants={squareVariants}
          style={{ backgroundColor: 'var(--color-pink)' }}
        />
        <motion.div 
          className="loader-square"
          variants={squareVariants}
          style={{ backgroundColor: 'var(--color-emerald)' }}
        />
      </motion.div>
      
      <motion.div 
        className="loading-text"
        variants={textVariants}
        initial="start"
        animate="end"
      >
        Caricamento {destination}...
      </motion.div>
    </div>
  );
};

export default PortfolioLoader;