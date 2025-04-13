// src/pages/Projects.tsx
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projectData';
import { FaExternalLinkAlt, FaGithub, FaSearch, FaTimes, FaFilter, FaArrowRight } from 'react-icons/fa';
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

  // Animazioni per i componenti
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 pt-24 pb-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-10"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">I MIEI PROGETTI</h1>
          <div className="accent-bar mx-auto"></div>
          <p className="section-subtitle max-w-2xl mx-auto">
            Esplora la mia collezione di progetti nel campo dello sviluppo blockchain e web.
          </p>
        </motion.div>
        
        {/* Search and Filter - Desktop */}
        <motion.div 
          className="hidden md:flex glassmorphism p-6 mb-8 rounded-xl items-center gap-4"
          variants={itemVariants}
        >
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaSearch className="text-secondary" />
            </div>
            <input
              type="text"
              placeholder="Cerca progetti..."
              className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-subtle"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <FaTimes className="text-secondary hover:text-accent transition-colors" />
              </button>
            )}
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-subtle min-w-[180px]"
            >
              <option value="">Tutti i tipi</option>
              {projectTypes.slice(1).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-subtle min-w-[180px]"
            >
              <option value="">Tutti i linguaggi</option>
              {allLanguages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            
            {(selectedType || selectedLanguage || searchTerm) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-accent text-white font-medium hover:bg-accent-secondary transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </motion.div>
        
        {/* Search and Filter - Mobile */}
        <motion.div 
          className="md:hidden mb-8 space-y-3"
          variants={itemVariants}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaSearch className="text-secondary" />
            </div>
            <input
              type="text"
              placeholder="Cerca progetti..."
              className="w-full pl-10 pr-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-subtle glassmorphism"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm ? (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <FaTimes className="text-secondary" />
              </button>
            ) : (
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                  <FaFilter size={14} />
                </div>
              </button>
            )}
          </div>
          
          {isFilterOpen && (
            <motion.div 
              className="glassmorphism p-5 rounded-xl space-y-4 filter-container w-full left-0 right-0"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-sm font-medium mb-2 text-secondary">FILTRI</h4>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-subtle"
              >
                <option value="">Tutti i tipi</option>
                {projectTypes.slice(1).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-subtle"
              >
                <option value="">Tutti i linguaggi</option>
                {allLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              
              {(selectedType || selectedLanguage || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-secondary transition-colors flex items-center justify-center gap-2"
                >
                  Reset filtri
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
        
        {/* Active Filters */}
        {(selectedType || selectedLanguage) && (
          <motion.div 
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {selectedType && (
              <div className="flex items-center px-4 py-2 bg-gradient-to-r from-accent/10 to-violet-500/10 text-accent rounded-full text-sm">
                <span>Tipo: {selectedType}</span>
                <button 
                  onClick={() => setSelectedType('')} 
                  className="ml-2 w-5 h-5 rounded-full bg-subtle flex items-center justify-center"
                >
                  <FaTimes size={10} />
                </button>
              </div>
            )}
            
            {selectedLanguage && (
              <div className="flex items-center px-4 py-2 bg-gradient-to-r from-accent/10 to-violet-500/10 text-accent rounded-full text-sm">
                <span>Linguaggio: {selectedLanguage}</span>
                <button 
                  onClick={() => setSelectedLanguage('')} 
                  className="ml-2 w-5 h-5 rounded-full bg-subtle flex items-center justify-center"
                >
                  <FaTimes size={10} />
                </button>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Projects count */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <p className="text-secondary font-medium">{filteredProjects.length} progetti trovati</p>
        </motion.div>
        
        {filteredProjects.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                className="glassmorphism overflow-hidden rounded-2xl flex flex-col h-full group"
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  {/* Background gradient blur for image */}
                  <div 
                    className="absolute inset-0 z-0 blur-xl opacity-30"
                    style={{ 
                      backgroundColor: index % 3 === 0 ? '#6366F1' : index % 3 === 1 ? '#8B5CF6' : '#10B981',
                      transform: 'scale(1.5)',
                    }}
                  />
                  
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-contain relative z-10 p-4" 
                  />
                  
                  {/* Project type badge */}
                  <div className="absolute top-3 left-3 badge badge-primary z-20">
                    {project.type}
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm text-secondary">
                      {project.year}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  
                  <p className="text-secondary mb-4 flex-grow line-clamp-3">{project.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.languages.slice(0, 3).map((lang, index) => (
                      <span 
                        key={index} 
                        className="text-xs py-1 px-2 bg-subtle rounded-md font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                    {project.languages.length > 3 && (
                      <span className="text-xs py-1 px-2 bg-subtle rounded-md font-medium">
                        +{project.languages.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      <span>Scopri di più</span>
                      <FaArrowRight size={12} />
                    </Link>
                    
                    <div className="flex gap-3">
                      {project.githubLink !== '#' && (
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-primary text-accent flex items-center justify-center border border-accent"
                          aria-label="GitHub Repository"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <FaGithub size={16} />
                        </motion.a>
                      )}
                      
                      {project.vercelLink !== '#' && (
                        <motion.a
                          href={project.vercelLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-subtle flex items-center justify-center"
                          aria-label="Live Demo"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <FaExternalLinkAlt size={12} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="glassmorphism p-10 text-center rounded-2xl"
            variants={itemVariants}
          >
            <p className="text-xl mb-6">Nessun progetto trovato con i criteri di ricerca specificati.</p>
            <button 
              onClick={resetFilters}
              className="btn btn-primary px-6 py-2 inline-flex items-center justify-center gap-2"
            >
              <span>Mostra tutti i progetti</span>
              <FaArrowRight size={12} />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;