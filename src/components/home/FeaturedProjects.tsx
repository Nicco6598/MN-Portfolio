import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import { projects } from '../../data/projectData';

const FeaturedProjects: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const featuredProjects = projects.slice(0, 3); // Show only the first 3 projects

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: i * 0.1,
        type: "spring",
        stiffness: 100
      } 
    }),
    hover: { 
      y: -8, 
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.section 
      className="max-w-6xl mx-auto mb-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <motion.div 
        className="text-center mb-8"
        variants={titleVariants}
      >
        <h2 className="section-title">PROGETTI IN EVIDENZA</h2>
        <div className="accent-bar mx-auto"></div>
        <p className="section-subtitle">
          Una selezione dei miei progetti più recenti nel campo dello sviluppo blockchain e web.
        </p>
      </motion.div>
      
      {/* Bento-style grid for featured projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="glassmorphism overflow-hidden flex flex-col h-full"
            variants={cardVariants}
            custom={index}
            whileHover="hover"
          >
            {/* Project Image with overlay */}
            <div className="relative h-48 overflow-hidden">
              {/* Background gradient blur for image */}
              <div 
                className="absolute inset-0 z-0 blur-xl opacity-30"
                style={{ 
                  backgroundColor: index === 0 ? '#6366F1' : index === 1 ? '#8B5CF6' : '#10B981',
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
            
            {/* Project Details */}
            <div className="p-6 flex-grow flex flex-col">
              <div className="mb-auto">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className="badge badge-secondary">
                    {project.year}
                  </span>
                </div>
                
                <p className="text-secondary mb-4 line-clamp-3">
                  {project.shortDescription}
                </p>
                
                {/* Languages used */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.languages.slice(0, 3).map(language => (
                    <span 
                      key={language} 
                      className="text-xs py-1 px-2 bg-subtle rounded-md font-medium"
                    >
                      {language}
                    </span>
                  ))}
                  {project.languages.length > 3 && (
                    <span className="text-xs py-1 px-2 bg-subtle rounded-md font-medium">
                      +{project.languages.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-between items-center mt-4">
                <motion.div
                  initial={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={`/projects/${project.id}`} 
                    className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                  >
                    <span>Scopri di più</span>
                    <FaArrowRight size={12} />
                  </Link>
                </motion.div>
                
                <div className="flex gap-3">
                  {project.githubLink !== '#' && (
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-primary text-accent flex items-center justify-center border border-accent"
                      aria-label="GitHub Repository"
                      initial={{ opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
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
      </div>
      
      {/* View All Projects Button */}
      <motion.div 
        initial={{ opacity: 1 }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="mt-8 text-center"
      >
        <Link 
          to="/projects" 
          className="btn btn-primary flex items-center justify-center gap-2"
        >
          <span>Visualizza tutti i progetti</span>
          <FaArrowRight />
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default FeaturedProjects; 