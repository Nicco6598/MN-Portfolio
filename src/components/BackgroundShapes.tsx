// src/components/BackgroundShapes.tsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const BackgroundShapes: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Top-left blob */}
      <div 
        className="bg-shape bg-shape-1 absolute top-[10%] left-[15%] animate-float"
        style={{ animationDelay: '0s' }}
      />
      
      {/* Top-right blob */}
      <div 
        className="bg-shape bg-shape-2 absolute top-[15%] right-[20%] animate-float"
        style={{ animationDelay: '-1.5s' }}
      />
      
      {/* Center blob */}
      <div 
        className="bg-shape absolute top-[40%] left-[35%] w-[400px] h-[400px] rounded-full opacity-30 animate-float"
        style={{ 
          background: 'var(--color-accent)',
          animationDelay: '-3s',
          filter: 'blur(100px)'
        }}
      />
      
      {/* Bottom-left blob */}
      <div 
        className="bg-shape bg-shape-2 absolute bottom-[20%] left-[25%] animate-float"
        style={{ animationDelay: '-4.5s' }}
      />
      
      {/* Bottom-right blob */}
      <div 
        className="bg-shape bg-shape-1 absolute bottom-[10%] right-[10%] animate-float"
        style={{ animationDelay: '-2.5s' }}
      />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at center, rgba(37, 33, 33, 0) 0%, rgba(37, 33, 33, 0.8) 70%)' 
            : 'radial-gradient(circle at center, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 70%)'
        }}
      />
    </div>
  );
};

export default BackgroundShapes;