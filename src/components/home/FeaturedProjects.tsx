import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import { projects } from '../../data/projectData';

const FeaturedProjects: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const featuredProjects = projects.slice(0, 3);

  // Enhanced animation variants with spring physics
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.8
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

  // Enhanced card variants with 3D effects
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
        delay: i * 0.15,
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

  // Premium badge variants with glassmorphism
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

  // Floating particles for background
  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 15, -5, 0],
      opacity: [0.2, 0.6, 0.2],
      scale: [0.9, 1.1, 0.9],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2
      }
    }
  };

  return (
    <motion.section 
      className="max-w-7xl mx-auto mb-24 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Background floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${
              i % 3 === 0 ? 'from-indigo-500 to-purple-500' :
              i % 3 === 1 ? 'from-purple-500 to-pink-500' :
              'from-pink-500 to-indigo-500'
            } opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            variants={particleVariants}
            animate="animate"
            custom={i}
          />
        ))}
      </div>

      {/* Enhanced section header */}
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
        
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight"
          variants={titleVariants}
        >
          <span className="text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            PROGETTI IN EVIDENZA
          </span>
        </motion.h2>
        
        <motion.div 
          className={`w-24 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
          variants={titleVariants}
        />
        
        <motion.p 
          className={`text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
          variants={titleVariants}
        >
          Una selezione dei miei progetti più recenti nel campo dello sviluppo blockchain e web, 
          dove innovazione e creatività si incontrano per creare esperienze digitali uniche.
        </motion.p>
      </motion.div>
      
      {/* Enhanced bento-style grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredProjects.map((project, index) => (
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
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            {/* Enhanced project image */}
            <div className="relative h-56 overflow-hidden">
              {/* Background gradient glow */}
              <motion.div
                className="absolute inset-0 z-0 blur-3xl opacity-20"
                style={{
                  backgroundColor: index === 0 ? '#6366F1' : index === 1 ? '#8B5CF6' : '#10B981',
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
                    className="group inline-flex items-center gap-2 font-semibold text-accent hover:text-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:bg-clip-text transition-all duration-300"
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
      </div>
      
      {/* Enhanced view all projects button */}
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/projects" 
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25"
          >
            <span>Visualizza tutti i progetti</span>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <FaArrowRight />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default FeaturedProjects;