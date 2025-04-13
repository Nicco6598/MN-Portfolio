// src/pages/ProjectDetail.tsx
import React, { useContext, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/projectData';
import { ThemeContext } from '../context/ThemeContext';
import { FaExternalLinkAlt, FaGithub, FaCalendar, FaCode, FaTag, FaChevronLeft, FaChevronRight, FaChevronDown, FaLink, FaInfo, FaClock, FaLayerGroup } from 'react-icons/fa';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = id ? parseInt(id, 10) : undefined;
  const project = projects.find((proj) => proj.id === projectId);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  
  // Riferimento alla sezione per il trigger dell'animazione
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Assegna un colore al progetto in base all'ID
  const projectColors = ["#6366F1", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"];
  const projectColor = projectColors[projectId ? (projectId % projectColors.length) : 0];
  
  // Scroll to top when navigating between projects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Animation variants
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
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      } 
    },
    hover: { 
      y: -5,
      transition: { duration: 0.2 }
    }
  };
  
  // Optimized animations for mobile
  const isMobile = window.innerWidth < 768;
  const activeVariants = isMobile ? {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  } : itemVariants;
  
  if (!project) {
    return (
      <motion.div 
        className="container mx-auto px-4 pt-24 pb-16 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        ref={sectionRef}
      >
        <motion.div className="glassmorphism p-10 text-center max-w-2xl mx-auto" variants={activeVariants}>
          <h2 className="text-2xl mb-4">Progetto non trovato</h2>
          <p className="mb-6 text-secondary">Il progetto che stai cercando potrebbe essere stato rimosso o non esiste.</p>
          <Link to="/projects" className="btn btn-primary">
            Torna ai progetti
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  const currentIndex = projects.findIndex((proj) => proj.id === project.id);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <motion.div 
      className="container mx-auto px-4 pt-24 pb-16 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      ref={sectionRef}
    >
      {/* Breadcrumb Navigation */}
      <motion.div className="max-w-6xl mx-auto mb-6" variants={activeVariants}>
        <div className="flex items-center text-sm text-tertiary">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/projects" className="hover:text-accent transition-colors">Progetti</Link>
          <span className="mx-2">/</span>
          <span style={{ color: projectColor }}>{project.title}</span>
        </div>
      </motion.div>
      
      {/* Project Content in Bento Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Project Header */}
        <motion.div 
          className="md:col-span-12"
          variants={activeVariants}
        >
          <div className="glassmorphism p-6 md:p-8 rounded-xl relative overflow-hidden">
            {/* Background decoration */}
            <div 
              className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full opacity-15 blur-2xl z-0" 
              style={{ backgroundColor: projectColor }}
            />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-3 rounded-full text-white"
                    style={{ backgroundColor: projectColor }}
                  >
                    <FaLayerGroup />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
                </div>
                
                <div className="flex gap-3 items-center flex-wrap">
                  <span 
                    className="px-3 py-1 rounded-full text-white font-medium"
                    style={{ backgroundColor: projectColor }}
                  >
                    {project.type}
                  </span>
                  <span className="flex items-center gap-1 text-tertiary whitespace-nowrap">
                    <FaCalendar style={{ color: projectColor }} size={14} />
                    {project.month} {project.year}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Project Image with Demo Links */}
        <motion.div 
          className="md:col-span-5 lg:col-span-4"
          variants={activeVariants}
          whileHover="hover"
        >
          <div className="glassmorphism p-5 rounded-xl relative overflow-hidden h-full flex flex-col">
            {/* Background glow effect */}
            <div 
              className="absolute -left-20 -top-20 w-40 h-40 rounded-full opacity-20 blur-2xl z-0" 
              style={{ backgroundColor: projectColor }}
            />
            
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="p-3 rounded-full text-white"
                style={{ backgroundColor: projectColor }}
              >
                <FaLayerGroup />
              </div>
              <h3 className="text-xl font-bold">Progetto</h3>
            </div>
            
            <div className="flex-grow relative">
              <motion.div 
                className="relative z-10 rounded-lg overflow-hidden mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full aspect-square object-contain rounded-lg" 
                />
              </motion.div>
              
              {/* Project links */}
              <div className="flex flex-wrap gap-3 justify-center">
                {project.vercelLink !== '#' && (
                  <motion.a
                    href={project.vercelLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all"
                    style={{ 
                      backgroundColor: projectColor,
                      color: 'white' 
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaExternalLinkAlt size={14} />
                    <span>Demo Live</span>
                  </motion.a>
                )}
                
                {project.githubLink !== '#' && (
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-medium border-2 transition-all"
                    style={{ 
                      borderColor: projectColor,
                      color: projectColor
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub size={16} />
                    <span>Codice</span>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Project Details & Technologies Combined */}
        <motion.div 
          className="md:col-span-7 lg:col-span-8"
          variants={activeVariants}
          whileHover="hover"
        >
          <div className="glassmorphism p-6 rounded-xl h-full relative overflow-hidden">
            {/* Background decoration */}
            <div 
              className="absolute -right-10 -bottom-10 w-20 h-20 rounded-full opacity-15 blur-xl z-0" 
              style={{ backgroundColor: projectColor }}
            />
            
            <div className="relative z-10">
              {/* Header with metadata */}
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="p-3 rounded-full text-white"
                  style={{ backgroundColor: projectColor }}
                >
                  <FaInfo />
                </div>
                <h3 className="text-xl font-bold">Dettagli Progetto</h3>
              </div>
              
              {/* Info grid with period, category, etc */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-2">
                  <FaClock className="mt-1" style={{ color: projectColor }} />
                  <div>
                    <h4 className="font-semibold text-tertiary mb-1">Periodo</h4>
                    <p>{project.month} {project.year}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <FaLayerGroup className="mt-1" style={{ color: projectColor }} />
                  <div>
                    <h4 className="font-semibold text-tertiary mb-1">Categoria</h4>
                    <p>{project.type}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <FaLink className="mt-1" style={{ color: projectColor }} />
                  <div>
                    <h4 className="font-semibold text-tertiary mb-1">Ruolo</h4>
                    <p>Sviluppatore</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <FaCode className="mt-1" style={{ color: projectColor }} />
                  <div>
                    <h4 className="font-semibold text-tertiary mb-1">Linguaggi</h4>
                    <p>{project.languages.slice(0, 2).join(", ")}{project.languages.length > 2 ? "..." : ""}</p>
                  </div>
                </div>
              </div>
              
              {/* Technologies section */}
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-3">
                  <FaCode style={{ color: projectColor }} />
                  <h4 className="font-bold">Tecnologie utilizzate</h4>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-auto">
                  {project.languages.map((lang, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm font-medium relative overflow-hidden border-2 bg-primary bg-opacity-50 inline-flex items-center justify-center"
                      style={{ 
                        borderColor: projectColor,
                        color: projectColor
                      }}
                      whileHover={{ 
                        y: -3,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {/* Sfondo sfumato */}
                      <div 
                        className="absolute inset-0 rounded-full opacity-10 blur-sm" 
                        style={{ background: `radial-gradient(circle at center, ${projectColor} 0%, transparent 70%)` }}
                      />
                      <span className="relative z-10">{lang}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Project Description */}
        <motion.div 
          className="md:col-span-12"
          variants={activeVariants}
        >
          <div className="glassmorphism p-6 rounded-xl relative overflow-hidden">
            {/* Background decoration */}
            <div 
              className="absolute -left-20 -bottom-20 w-40 h-40 rounded-full opacity-15 blur-2xl z-0" 
              style={{ backgroundColor: projectColor }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="p-3 rounded-full text-white"
                  style={{ backgroundColor: projectColor }}
                >
                  <FaTag />
                </div>
                <h3 className="text-xl font-bold">Descrizione del progetto</h3>
              </div>
              
              <div className="prose prose-lg max-w-none text-current">
                <p className="whitespace-pre-line text-secondary">
                  {project.fullDescription}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Project Navigation */}
      <motion.div 
        className="max-w-6xl mx-auto mt-8"
        variants={activeVariants}
      >
        <div className="glassmorphism p-6 rounded-xl flex items-center justify-between">
          {/* Previous Project */}
          <div className="w-1/3 flex justify-start">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="flex items-center gap-3 group"
              >
                <motion.div 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: 'var(--color-subtle)',
                    color: projectColor 
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: projectColor,
                    color: 'white',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronLeft />
                </motion.div>
                <div className="hidden sm:block truncate max-w-[150px]">
                  <div className="text-sm text-tertiary">Precedente</div>
                  <div className="text-xs truncate">{prevProject.title}</div>
                </div>
              </Link>
            ) : (
              <div className="w-10"></div>
            )}
          </div>
          
          {/* Dropdown centrale */}
          <div className="w-1/3 flex justify-center">
            <div className="relative w-full max-w-[220px]">
              <select
                value={project.id}
                onChange={(e) => navigate(`/projects/${e.target.value}`)}
                className="w-full bg-transparent border rounded-lg py-2 pl-4 pr-10 focus:outline-none appearance-none truncate transition-colors"
                style={{ 
                  borderColor: 'var(--color-tertiary)',
                  color: 'var(--color-text)'
                }}
              >
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-tertiary">
                <FaChevronDown />
              </div>
            </div>
          </div>
          
          {/* Next Project */}
          <div className="w-1/3 flex justify-end">
            {nextProject ? (
              <Link
                to={`/projects/${nextProject.id}`}
                className="flex items-center gap-3 group"
              >
                <div className="hidden sm:block truncate max-w-[150px] text-right">
                  <div className="text-sm text-tertiary">Successivo</div>
                  <div className="text-xs truncate">{nextProject.title}</div>
                </div>
                <motion.div 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: 'var(--color-subtle)',
                    color: projectColor 
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: projectColor,
                    color: 'white',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronRight />
                </motion.div>
              </Link>
            ) : (
              <div className="w-10"></div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;