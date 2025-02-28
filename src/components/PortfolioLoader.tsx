// src/components/PortfolioLoader.tsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface PortfolioLoaderProps {
  destination: string;
}

const PortfolioLoader: React.FC<PortfolioLoaderProps> = ({ destination }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="loader-container">
      <div className="portfolio-loader">
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
      </div>
      <p className="loading-text">
        Caricamento {destination}...
      </p>
    </div>
  );
};

export default PortfolioLoader;