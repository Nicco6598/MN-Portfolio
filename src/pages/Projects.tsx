// src/pages/Projects.tsx
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projectData';
import { FaExternalLinkAlt, FaGithub, FaSearch, FaTimes } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const Projects: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Extract unique project types and languages
  const projectTypes = ['', ...Array.from(new Set(projects.map(project => project.type)))];
  const allLanguages = Array.from(new Set(projects.flatMap(project => project.languages)));
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedLanguage('');
  };
  
  // Filter projects based on search term and selected filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === '' || project.type === selectedType;
    
    const matchesLanguage = selectedLanguage === '' || 
      project.languages.some(lang => lang.toLowerCase() === selectedLanguage.toLowerCase());
    
    return matchesSearch && matchesType && matchesLanguage;
  });

  // Close filter menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isFilterOpen && !target.closest('.filter-container')) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">I MIEI PROGETTI</h1>
          <div className="h-1 w-20 bg-sunglow mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-current text-lg font-medium">
            Esplora la mia collezione di progetti nel campo dello sviluppo blockchain e web.
          </p>
        </div>
        
        {/* Search and Filter - Desktop */}
        <div className="hidden md:flex glassmorphism p-6 mb-8 rounded-xl items-center gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaSearch className="text-battle-gray" />
            </div>
            <input
              type="text"
              placeholder="Cerca progetti..."
              className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunglow bg-opacity-10 bg-battle-gray"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <FaTimes className="text-battle-gray hover:text-sunglow transition-colors" />
              </button>
            )}
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunglow bg-opacity-10 bg-battle-gray min-w-[180px]"
            >
              <option value="">Tutti i tipi</option>
              {projectTypes.slice(1).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunglow bg-opacity-10 bg-battle-gray min-w-[180px]"
            >
              <option value="">Tutti i linguaggi</option>
              {allLanguages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            
            {(selectedType || selectedLanguage || searchTerm) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-lg bg-sunglow text-raisin-black font-medium hover:bg-opacity-90 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
        
        {/* Search and Filter - Mobile */}
        <div className="md:hidden mb-8 space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaSearch className="text-battle-gray" />
            </div>
            <input
              type="text"
              placeholder="Cerca progetti..."
              className="w-full pl-10 pr-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunglow bg-opacity-10 bg-battle-gray glassmorphism"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm ? (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <FaTimes className="text-battle-gray" />
              </button>
            ) : (
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <div className="flex flex-col items-center justify-center w-6 h-6 space-y-1">
                  <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isFilterOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${isFilterOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isFilterOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            )}
          </div>
          
          {isFilterOpen && (
            <div className="glassmorphism p-4 rounded-lg space-y-3 filter-container w-full left-0 right-0">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunglow bg-opacity-10 bg-battle-gray"
              >
                <option value="">Tutti i tipi</option>
                {projectTypes.slice(1).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunglow bg-opacity-10 bg-battle-gray"
              >
                <option value="">Tutti i linguaggi</option>
                {allLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              
              {(selectedType || selectedLanguage || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-2 rounded-lg bg-sunglow text-raisin-black font-medium hover:bg-opacity-90 transition-colors"
                >
                  Reset filtri
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Active Filters */}
        {(selectedType || selectedLanguage) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedType && (
              <div className="flex items-center px-3 py-1 bg-sunglow text-raisin-black rounded-full text-sm">
                <span>Tipo: {selectedType}</span>
                <button 
                  onClick={() => setSelectedType('')} 
                  className="ml-2"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
            
            {selectedLanguage && (
              <div className="flex items-center px-3 py-1 bg-sunglow text-raisin-black rounded-full text-sm">
                <span>Linguaggio: {selectedLanguage}</span>
                <button 
                  onClick={() => setSelectedLanguage('')} 
                  className="ml-2"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Projects Grid */}
        <div className="mb-8">
          <p className="text-current font-medium mb-4">{filteredProjects.length} progetti trovati</p>
        </div>
        
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="glassmorphism-card rounded-xl overflow-hidden group transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg flex flex-col project-card"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                    style={{ 
                      backgroundColor: theme === 'dark' ? '#ffd13e' : '#ffd13e',
                      filter: 'blur(20px)',
                      transform: 'translateY(10px) scale(0.9)'
                    }}
                  ></div>
                  
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-contain object-center bg-battle-gray bg-opacity-10 relative z-10 transition-transform duration-500 group-hover:scale-110 p-2" 
                  />
                  
                  {/* Overlay with links */}
                  <div className="absolute inset-0 z-20 bg-raisin-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to={`/projects/${project.id}`}
                      className="bg-sunglow text-raisin-black px-4 py-2 rounded-full font-medium transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      Visualizza progetto
                    </Link>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="px-3 py-1 text-xs rounded-full bg-sunglow font-medium text-raisin-black">
                      {project.type}
                    </span>
                    <span className="text-sm text-battle-gray">
                      {project.year}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  
                  <p className="text-current font-medium mb-4 flex-grow">{project.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.languages.map((lang, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 text-xs rounded-full bg-sunglow bg-opacity-90 text-raisin-black font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-sunglow font-medium hover:underline flex items-center gap-1"
                    >
                      Dettagli
                      <FaExternalLinkAlt size={12} />
                    </Link>
                    
                    <div className="flex gap-2">
                      {project.githubLink !== '#' && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-raisin-black text-white flex items-center justify-center"
                          aria-label="GitHub Repository"
                        >
                          <FaGithub size={16} />
                        </a>
                      )}
                      
                      {project.vercelLink !== '#' && (
                        <a
                          href={project.vercelLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-battle-gray bg-opacity-20 flex items-center justify-center"
                          aria-label="Live Demo"
                        >
                          <FaExternalLinkAlt size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glassmorphism p-10 text-center">
            <p className="text-xl mb-4">Nessun progetto trovato con i criteri di ricerca specificati.</p>
            <button 
              onClick={resetFilters}
              className="bg-sunglow text-raisin-black px-6 py-2 rounded-full font-semibold"
            >
              Mostra tutti i progetti
            </button>
          </div>
        )}
      </div>
      
      <style>{`
        .project-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        @media (max-width: 768px) {
          .filter-container {
            position: absolute;
            z-index: 30;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;