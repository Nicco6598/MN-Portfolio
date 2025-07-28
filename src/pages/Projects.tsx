// src/pages/Projects.tsx
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projectData';
import { FaExternalLinkAlt, FaGithub, FaSearch, FaTimes, FaFilter, FaArrowRight, FaCode, FaCalendar, FaTag } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const Projects: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Extract unique project types and languages
  const projectTypes = useMemo(() => ['', ...Array.from(new Set(projects.map(project => project.type)))], []);
  const allLanguages = useMemo(() => Array.from(new Set(projects.flatMap(project => project.languages))), []);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedLanguage('');
  };

  // Filter projects based on search term and selected filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.languages.some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = selectedType === '' || project.type === selectedType;
      const matchesLanguage = selectedLanguage === '' || 
        project.languages.some(lang => lang.toLowerCase() === selectedLanguage.toLowerCase());
      
      return matchesSearch && matchesType && matchesLanguage;
    });
  }, [searchTerm, selectedType, selectedLanguage]);

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

  // Enhanced animation variants matching FeaturedProjects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 120,
        damping: 20,
        duration: 0.8
      } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.85, rotateX: 15 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: i * 0.1,
        duration: 0.8
      } 
    }),
    hover: { 
      y: -12,
      scale: 1.02,
      rotateX: -5,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.7, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    },
    hover: { 
      scale: 1.08,
      y: -2,
      transition: { 
        duration: 0.2,
        type: "spring"
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: [0.32, 0.72, 0, 1]
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 pt-24 pb-16 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Enhanced section header matching FeaturedProjects */}
        <motion.div 
          className="text-center mb-16"
          variants={titleVariants}
        >
          <motion.div
            className="inline-block px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
            variants={titleVariants}
          >
            <span className="text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              I MIEI PROGETTI
            </span>
          </motion.h1>
          
          <motion.div 
            className={`w-32 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
            variants={titleVariants}
          />
          
          <motion.p 
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
            variants={titleVariants}
          >
            Esplora la mia collezione di progetti nel campo dello sviluppo blockchain e web, 
            dove l'innovazione incontra la creatività per creare esperienze digitali uniche.
          </motion.p>
        </motion.div>

        {/* Enhanced Search and Filter Section */}
        <motion.div 
          className="mb-12"
          variants={titleVariants}
        >
          {/* Desktop Filter Bar */}
          <motion.div 
            className="hidden md:flex glassmorphism backdrop-blur-xl p-6 rounded-2xl border border-white/20 dark:border-white/10 items-center gap-4 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            {/* Search Input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaSearch className="text-indigo-500" size={18} />
              </div>
              <input
                type="text"
                placeholder="Cerca progetti..."
                className={`w-full pl-12 pr-12 py-4 rounded-xl backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-lg placeholder-gray-500 dark:placeholder-gray-400 transition-all ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700/50 text-white' 
                    : 'bg-white/70 border-gray-300/50 text-gray-900'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <motion.button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-4 flex items-center text-indigo-500 hover:text-purple-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes size={16} />
                </motion.button>
              )}
            </div>

            {/* Filter Selects */}
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={`p-4 rounded-xl backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 min-w-[180px] text-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700/50 text-white' 
                    : 'bg-white/70 border-gray-300/50 text-gray-900'
                }`}
              >
                <option value="" className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Tutti i tipi</option>
                {projectTypes.slice(1).map((type) => (
                  <option key={type} value={type} className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{type}</option>
                ))}
              </select>
              
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`p-4 rounded-xl backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 min-w-[180px] text-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700/50 text-white' 
                    : 'bg-white/70 border-gray-300/50 text-gray-900'
                }`}
              >
                <option value="" className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Tutti i linguaggi</option>
                {allLanguages.map((lang) => (
                  <option key={lang} value={lang} className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{lang}</option>
                ))}
              </select>
              
              {(selectedType || selectedLanguage || searchTerm) && (
                <motion.button
                  onClick={resetFilters}
                  className="px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Mobile Filter Bar */}
          <motion.div 
            className="md:hidden space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaSearch className="text-indigo-500" size={18} />
              </div>
              <input
                type="text"
                placeholder="Cerca progetti..."
                className={`w-full pl-12 pr-16 py-4 rounded-2xl backdrop-blur-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-lg placeholder-gray-500 dark:placeholder-gray-400 ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700/50 text-white' 
                    : 'bg-white/70 border-gray-300/50 text-gray-900'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm ? (
                <motion.button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-12 flex items-center text-indigo-500 hover:text-purple-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes size={16} />
                </motion.button>
              ) : (
                <motion.button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="absolute inset-y-0 right-3 flex items-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFilter size={14} />
                </motion.button>
              )}
            </div>
            
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  className={`backdrop-blur-xl p-6 rounded-2xl border space-y-4 filter-container ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border-gray-700/50' 
                      : 'bg-white/70 border-gray-300/50'
                  }`}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={filterVariants}
                  style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)'
                  }}
                >
                  <h4 className="text-sm font-semibold text-indigo-500 mb-3">FILTRI</h4>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className={`w-full p-4 rounded-xl backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      theme === 'dark' 
                        ? 'bg-gray-800/50 border-gray-700/50 text-white' 
                        : 'bg-white/70 border-gray-300/50 text-gray-900'
                    }`}
                  >
                    <option value="" className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Tutti i tipi</option>
                    {projectTypes.slice(1).map((type) => (
                      <option key={type} value={type} className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{type}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className={`w-full p-4 rounded-xl backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      theme === 'dark' 
                        ? 'bg-gray-800/50 border-gray-700/50 text-white' 
                        : 'bg-white/70 border-gray-300/50 text-gray-900'
                    }`}
                  >
                    <option value="" className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Tutti i linguaggi</option>
                    {allLanguages.map((lang) => (
                      <option key={lang} value={lang} className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{lang}</option>
                    ))}
                  </select>
                  
                  {(selectedType || selectedLanguage || searchTerm) && (
                    <motion.button
                      onClick={resetFilters}
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Reset filtri
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Active Filters Display */}
        {(selectedType || selectedLanguage) && (
          <motion.div 
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {selectedType && (
              <motion.div 
                className={`flex items-center px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md border transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' 
                    : 'bg-indigo-500/20 text-indigo-700 border-indigo-500/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTag className="mr-2" size={12} />
                <span>{selectedType}</span>
                <motion.button 
                  onClick={() => setSelectedType('')} 
                  className="ml-2 w-5 h-5 rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <FaTimes size={10} />
                </motion.button>
              </motion.div>
            )}
            
            {selectedLanguage && (
              <motion.div 
                className={`flex items-center px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md border transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                    : 'bg-purple-500/20 text-purple-700 border-purple-500/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCode className="mr-2" size={12} />
                <span>{selectedLanguage}</span>
                <motion.button 
                  onClick={() => setSelectedLanguage('')} 
                  className="ml-2 w-5 h-5 rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <FaTimes size={10} />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Projects Count */}
        <motion.div 
          className="mb-8"
          variants={titleVariants}
        >
          <motion.p 
            className={`text-lg font-bold ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {filteredProjects.length} {filteredProjects.length === 1 ? 'progetto trovato' : 'progetti trovati'}
          </motion.p>
        </motion.div>

        {/* Enhanced Projects Grid with Premium Cards */}
        {filteredProjects.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-800/30 border-gray-700/40 hover:border-indigo-500/50' 
                    : 'bg-white/30 border-gray-300/40 hover:border-indigo-500/50'
                } shadow-2xl hover:shadow-3xl hover:shadow-indigo-500/20`}
                variants={cardVariants}
                custom={index}
                whileHover="hover"
                onHoverStart={() => setHoveredProject(project.id)}
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
              >
                {/* Enhanced project image with gradient glow */}
                <div className="relative h-56 overflow-hidden">
                  {/* Background gradient glow */}
                  <motion.div
                    className="absolute inset-0 z-0 blur-3xl opacity-20"
                    style={{
                      backgroundColor: project.id % 3 === 0 ? '#6366F1' : project.id % 3 === 1 ? '#8B5CF6' : '#10B981',
                      transform: 'scale(1.5)',
                    }}
                    animate={{ 
                      opacity: [0.1, 0.3, 0.1],
                      scale: [1.5, 1.6, 1.5] 
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                  
                  {/* Project image */}
                  <motion.img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-contain relative z-10 p-6 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Gradient overlay */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-t ${
                      theme === 'dark' 
                        ? 'from-gray-900/60 via-transparent to-transparent' 
                        : 'from-white/60 via-transparent to-transparent'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  
                  {/* Premium project type badge */}
                  <motion.div
                    className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-gray-900/60 border-indigo-500/50 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-white/60 border-indigo-500/50 text-gray-900 shadow-lg shadow-indigo-500/20'
                    }`}
                    variants={badgeVariants}
                  >
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {project.type}
                    </span>
                  </motion.div>
                  
                  {/* Premium year badge */}
                  <motion.div
                    className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-gray-900/60 border-purple-500/50 text-white shadow-lg shadow-purple-500/20'
                        : 'bg-white/60 border-purple-500/50 text-gray-900 shadow-lg shadow-purple-500/20'
                    }`}
                    variants={badgeVariants}
                  >
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {project.year}
                    </span>
                  </motion.div>
                </div>
                
                {/* Enhanced project details */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-auto">
                    <motion.h3 
                      className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300"
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p 
                      className={`text-secondary mb-4 line-clamp-3 leading-relaxed ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {project.shortDescription}
                    </motion.p>
                    
                    {/* Modern tech stack tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.languages.slice(0, 4).map((language, langIndex) => (
                        <motion.span 
                          key={language}
                          className={`text-xs py-1.5 px-3 rounded-full font-medium backdrop-blur-sm transition-all duration-300 ${
                            theme === 'dark' 
                              ? 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-indigo-500/50' 
                              : 'bg-gray-100/50 text-gray-700 border border-gray-200/50 hover:border-indigo-500/50'
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + langIndex * 0.05 }}
                          whileHover={{ 
                            scale: 1.1, 
                            y: -2,
                            boxShadow: theme === 'dark' 
                              ? '0 4px 20px rgba(99, 102, 241, 0.3)' 
                              : '0 4px 20px rgba(99, 102, 241, 0.2)'
                          }}
                        >
                          {language}
                        </motion.span>
                      ))}
                      {project.languages.length > 4 && (
                        <motion.span 
                          className={`text-xs py-1.5 px-3 rounded-full font-medium backdrop-blur-sm ${
                            theme === 'dark' 
                              ? 'bg-gray-800/50 text-gray-300 border border-gray-700/50' 
                              : 'bg-gray-100/50 text-gray-700 border border-gray-200/50'
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          +{project.languages.length - 4}
                        </motion.span>
                      )}
                    </div>
                  </div>
                  
                  {/* Enhanced action buttons */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t ${
                    theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
                  }">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to={`/projects/${project.id}`} 
                        className="group inline-flex items-center gap-2 font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                      >
                        <span>Scopri di più</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaArrowRight size={14} />
                        </motion.div>
                      </Link>
                    </motion.div>
                    
                    <div className="flex gap-3">
                      {project.githubLink !== '#' && (
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                            theme === 'dark' 
                              ? 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30' 
                              : 'bg-gray-100/50 text-gray-700 border border-gray-200/50 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30'
                          }`}
                          aria-label="GitHub Repository"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaGithub size={18} />
                        </motion.a>
                      )}
                      
                      {project.vercelLink !== '#' && (
                        <motion.a
                          href={project.vercelLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                            theme === 'dark' 
                              ? 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30' 
                              : 'bg-gray-100/50 text-gray-700 border border-gray-200/50 hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30'
                          }`}
                          aria-label="Live Demo"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaExternalLinkAlt size={14} />
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
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔍
            </motion.div>
            <h3 className="text-2xl font-bold mb-2 text-gray-400">Nessun progetto trovato</h3>
            <p className="text-gray-500 mb-4">Prova a modificare i filtri o la ricerca</p>
            <motion.button
              onClick={resetFilters}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resetta tutto
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;