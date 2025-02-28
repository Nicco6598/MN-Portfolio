// src/components/CustomCarousel.tsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { projects } from '../data/projectData';

const CustomCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { theme } = useContext(ThemeContext);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const featuredProjects = projects.slice(0, 3); // Show only the first 3 projects
  
  // Navigation functions
  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => 
      prev === 0 ? featuredProjects.length - 1 : prev - 1
    );
  };
  
  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => 
      prev === featuredProjects.length - 1 ? 0 : prev + 1
    );
  };
  
  const goToIndex = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };
  
  // Reset transition state after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match this with the CSS transition duration
    
    return () => clearTimeout(timer);
  }, [currentIndex]);
  
  // Auto-advancement
  useEffect(() => {
    const startAutoplay = () => {
      autoplayTimerRef.current = setInterval(() => {
        goToNext();
      }, 5000);
    };
    
    const stopAutoplay = () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay when user interacts with the carousel
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
      carousel.addEventListener('touchstart', stopAutoplay, { passive: true });
      carousel.addEventListener('touchend', startAutoplay);
    }
    
    return () => {
      stopAutoplay();
      if (carousel) {
        carousel.removeEventListener('mouseenter', stopAutoplay);
        carousel.removeEventListener('mouseleave', startAutoplay);
        carousel.removeEventListener('touchstart', stopAutoplay);
        carousel.removeEventListener('touchend', startAutoplay);
      }
    };
  }, []);
  
  // Current project to display
  const project = featuredProjects[currentIndex];
  
  return (
    <div className="custom-carousel relative" ref={carouselRef}>
      {/* Main Carousel */}
      <div className="glassmorphism-card rounded-2xl overflow-hidden transition-all duration-500">
        <div className="flex flex-col lg:flex-row">
          {/* Project Image */}
          <div className="lg:w-1/2 relative overflow-hidden h-64 lg:h-[360px]">
            {/* Background blur effect */}
            <div 
              className="absolute inset-0 z-0 blur-xl opacity-50"
              style={{ backgroundColor: theme === 'light' ? '#222222' : '#ffd13e' }}
            ></div>
            
            <div className="relative z-10 w-full h-full">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-contain p-4 transition-all duration-700"
              />
              
              {/* Project type badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-sunglow text-raisin-black">
                {project.type}
              </div>
            </div>
          </div>
          
          {/* Project Info */}
          <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between min-h-[360px]">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <span className="text-sm px-2 py-1 rounded-full bg-battle-gray bg-opacity-20">
                  {project.year}
                </span>
              </div>
              
              <p className="text-current font-medium mb-6">{project.shortDescription}</p>
              
              <div className="flex flex-col sm:flex-row gap-2 mb-4 text-current font-medium">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Anno:</span>
                  <span>{project.year}</span>
                </div>
                <div className="hidden sm:block text-current">•</div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Tipo:</span>
                  <span>{project.type}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-auto">
              <Link
                to={`/projects/${project.id}`}
                className="bg-sunglow text-raisin-black px-4 py-2 rounded-full font-medium flex items-center gap-2 transform transition hover:translate-y-[-2px]"
              >
                <span>Scopri di più</span>
                <FaArrowRight size={14} />
              </Link>
              
              <div className="flex gap-3">
                {project.githubLink !== '#' && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-raisin-black text-white flex items-center justify-center transform transition hover:scale-110"
                    aria-label="GitHub Repository"
                  >
                    <FaGithub size={18} />
                  </a>
                )}
                
                {project.vercelLink !== '#' && (
                  <a
                    href={project.vercelLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-battle-gray bg-opacity-20 flex items-center justify-center transform transition hover:scale-110"
                    aria-label="Live Demo"
                  >
                    <FaExternalLinkAlt size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={goToPrevious}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-battle-gray bg-opacity-20 hover:bg-sunglow hover:text-raisin-black transition-colors"
          aria-label="Previous project"
        >
          <FaChevronLeft />
        </button>
        
        <div className="flex gap-2 items-center">
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index 
                  ? 'bg-sunglow w-6' 
                  : 'bg-battle-gray bg-opacity-30 hover:bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={goToNext}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-battle-gray bg-opacity-20 hover:bg-sunglow hover:text-raisin-black transition-colors"
          aria-label="Next project"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CustomCarousel;