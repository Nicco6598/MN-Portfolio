// src/pages/ProjectDetail.tsx
import React, { useContext, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projectData';
import { ThemeContext } from '../context/ThemeContext';
import { FaExternalLinkAlt, FaGithub, FaCalendar, FaCode, FaTag, FaChevronLeft, FaChevronRight, FaChevronDown, FaLink, FaInfo, FaClock, FaLayerGroup, FaArrowUp, FaEye, FaDownload } from 'react-icons/fa';
import { FaReact, FaNodeJs, FaPython, FaJava, FaCss3Alt, FaHtml5, FaJs, FaDocker, FaGitAlt, FaNpm, FaYarn } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiExpress, SiDjango, SiFlask, SiGraphql, SiRedux, SiSocketdotio, SiFirebase, SiKubernetes, SiJest } from 'react-icons/si';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = id ? parseInt(id, 10) : undefined;
  const project = projects.find((proj) => proj.id === projectId);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  
  // References for scroll animations
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const scrollToTopRef = useRef<HTMLDivElement>(null);
  
  // Dynamic color palette based on project ID
  const projectColors = [
    { primary: '#6366F1', secondary: '#8B5CF6', accent: '#EC4899' },
    { primary: '#10B981', secondary: '#059669', accent: '#F59E0B' },
    { primary: '#F59E0B', secondary: '#D97706', accent: '#EF4444' },
    { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#06B6D4' },
    { primary: '#EF4444', secondary: '#DC2626', accent: '#10B981' }
  ];
  
  const colorScheme = projectColors[projectId ? (projectId % projectColors.length) : 0];
  
  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0.7, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }),
    hover: {
      scale: 1.1,
      y: -3,
      transition: { duration: 0.2 }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const getTechIcon = (tech: string) => {
    const techMap: { [key: string]: React.ElementType } = {
      'React': FaReact,
      'Next.js': SiNextdotjs,
      'TypeScript': SiTypescript,
      'JavaScript': FaJs,
      'Node.js': FaNodeJs,
      'Express': SiExpress,
      'Python': FaPython,
      'Django': SiDjango,
      'Flask': SiFlask,
      'Tailwind': SiTailwindcss,
      'CSS': FaCss3Alt,
      'HTML': FaHtml5,
      'MongoDB': SiMongodb,
      'PostgreSQL': SiPostgresql,
      'GraphQL': SiGraphql,
      'Redux': SiRedux,
      'Docker': FaDocker,
      'Git': FaGitAlt,
      'AWS': FaCode,
      'Azure': FaCode,
      'Firebase': SiFirebase,
      'Kubernetes': SiKubernetes,
      'Jest': SiJest,
      'Socket.io': SiSocketdotio,
      'npm': FaNpm,
      'Yarn': FaYarn
    };
    return techMap[tech] || FaCode;
  };

  if (!project) {
    return (
      <motion.div 
        className="container mx-auto px-4 pt-24 pb-16 min-h-screen flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        ref={sectionRef}
      >
        <motion.div 
          className={`text-center p-12 rounded-2xl backdrop-blur-xl border ${
            theme === 'dark' 
              ? 'bg-gray-800/30 border-gray-700/40' 
              : 'bg-white/30 border-gray-300/40'
          }`}
          variants={sectionVariants}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          <motion.div 
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔍
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Progetto non trovato</h2>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Il progetto che stai cercando potrebbe essere stato rimosso o non esiste.
          </p>
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium transition-all"
          >
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
      className="container mx-auto px-4 pt-24 pb-16 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      ref={sectionRef}
    >
      {/* Scroll to top button */}
      <AnimatePresence>
        {isInView && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modern project navigation header */}
       <motion.div 
         className="max-w-6xl mx-auto mb-8"
         variants={sectionVariants}
       >
         <div className={`flex items-center justify-between p-4 rounded-2xl backdrop-blur-xl border ${
           theme === 'dark' 
             ? 'bg-gray-800/20 border-gray-700/30' 
             : 'bg-white/20 border-gray-300/30'
         }`}>
           <div className="flex items-center text-sm">
             <Link 
               to="/" 
               className="hover:text-indigo-500 transition-colors"
               style={{ color: colorScheme.primary }}
             >
               Home
             </Link>
             <span className="mx-2">/</span>
             <Link 
               to="/projects" 
               className="hover:text-indigo-500 transition-colors"
               style={{ color: colorScheme.primary }}
             >
               Progetti
             </Link>
           </div>
           
           {/* Modern project selector */}
           <div className="relative">
             <select
               value={project.id}
               onChange={(e) => navigate(`/projects/${e.target.value}`)}
               className={`px-4 py-2 rounded-xl backdrop-blur-sm border text-sm font-medium appearance-none pr-10 cursor-pointer transition-all ${
                 theme === 'dark' 
                   ? 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-800/70' 
                   : 'bg-white/50 border-gray-300/50 text-gray-700 hover:bg-white/70'
               }`}
               style={{
                 borderColor: `${colorScheme.primary}40`
               }}
             >
               {projects.map((proj) => (
                 <option key={proj.id} value={proj.id}>
                   {proj.title}
                 </option>
               ))}
             </select>
             <FaChevronDown 
               className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs"
               style={{ color: colorScheme.primary }}
             />
           </div>
         </div>
       </motion.div>

      {/* Premium hero section */}
      <motion.div 
        className="max-w-6xl mx-auto mb-12"
        variants={sectionVariants}
      >
        <div 
          className={`relative rounded-2xl backdrop-blur-xl border overflow-hidden ${
            theme === 'dark' 
              ? 'bg-gray-800/30 border-gray-700/40' 
              : 'bg-white/30 border-gray-300/40'
          } shadow-2xl`}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                `radial-gradient(circle at 20% 50%, ${colorScheme.primary}40 0%, transparent 50%)`,
                `radial-gradient(circle at 80% 20%, ${colorScheme.secondary}40 0%, transparent 50%)`,
                `radial-gradient(circle at 40% 80%, ${colorScheme.accent}40 0%, transparent 50%)`
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <motion.div
                  className="inline-block px-4 py-2 mb-4 rounded-full text-sm font-bold backdrop-blur-sm border"
                  style={{
                    backgroundColor: `${colorScheme.primary}20`,
                    borderColor: `${colorScheme.primary}40`,
                    color: colorScheme.primary
                  }}
                  variants={floatingVariants}
                  initial="initial"
                  animate="animate"
                >
                  {project.type}
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span 
                    className="bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary}, ${colorScheme.accent})`
                    }}
                  >
                    {project.title}
                  </span>
                </h1>
                
                <p className={`text-xl mb-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {project.shortDescription}
                </p>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <FaCalendar style={{ color: colorScheme.primary }} />
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {project.month} {project.year}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaEye style={{ color: colorScheme.primary }} />
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Progetto completo
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                {project.vercelLink !== '#' && (
                  <motion.a
                    href={project.vercelLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg"
                    style={{
                      backgroundColor: colorScheme.primary,
                      color: 'white'
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt size={16} />
                    <span>Demo Live</span>
                  </motion.a>
                )}
                
                {project.githubLink !== '#' && (
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all border-2 shadow-lg"
                    style={{
                      borderColor: colorScheme.primary,
                      color: colorScheme.primary
                    }}
                    whileHover={{ scale: 1.05, y: -2, backgroundColor: colorScheme.primary, color: 'white' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub size={16} />
                    <span>Codice</span>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced bento grid layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Image & Gallery */}
        <motion.div 
          className="lg:col-span-2"
          variants={cardVariants}
        >
          <div 
            className={`rounded-2xl backdrop-blur-xl border overflow-hidden ${
              theme === 'dark' 
                ? 'bg-gray-800/30 border-gray-700/40' 
                : 'bg-white/30 border-gray-300/40'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="p-2 rounded-lg text-white"
                  style={{ backgroundColor: colorScheme.primary }}
                >
                  <FaLayerGroup />
                </div>
                <h3 className="text-xl font-bold">Anteprima Progetto</h3>
              </div>
              
              <motion.div 
                className="relative rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-64 md:h-96 object-contain rounded-xl"
                />
                
                {/* Hover overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2">
                      {project.vercelLink !== '#' && (
                        <a
                          href={project.vercelLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm"
                        >
                          <FaExternalLinkAlt size={12} />
                          <span>Demo</span>
                        </a>
                      )}
                      
                      {project.githubLink !== '#' && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm"
                        >
                          <FaGithub size={12} />
                          <span>Codice</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Project Info Card */}
        <motion.div 
          className="lg:col-span-1"
          variants={cardVariants}
        >
          <div 
            className={`rounded-2xl backdrop-blur-xl border p-6 h-full ${
              theme === 'dark' 
                ? 'bg-gray-800/30 border-gray-700/40' 
                : 'bg-white/30 border-gray-300/40'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="p-2 rounded-lg text-white"
                style={{ backgroundColor: colorScheme.primary }}
              >
                <FaInfo />
              </div>
              <h3 className="text-xl font-bold">Dettagli</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaCalendar 
                  className="mt-1 flex-shrink-0" 
                  style={{ color: colorScheme.primary }} 
                />
                <div>
                  <h4 className={`text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Periodo
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.month} {project.year}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FaLayerGroup 
                  className="mt-1 flex-shrink-0" 
                  style={{ color: colorScheme.primary }} 
                />
                <div>
                  <h4 className={`text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Categoria
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.type}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FaCode 
                  className="mt-1 flex-shrink-0" 
                  style={{ color: colorScheme.primary }} 
                />
                <div>
                  <h4 className={`text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Tecnologie
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.languages.length} linguaggi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Minimal Technologies Grid */}
        <motion.div 
          className="lg:col-span-3"
          variants={sectionVariants}
        >
          <div 
            className={`rounded-2xl backdrop-blur-xl border p-6 ${
              theme === 'dark' 
                ? 'bg-gray-800/20 border-gray-700/30' 
                : 'bg-white/20 border-gray-300/30'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="p-2 rounded-lg text-white"
                style={{ backgroundColor: colorScheme.primary }}
              >
                <FaCode />
              </div>
              <h3 className="text-xl font-bold">Stack Tecnologico</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {project.languages.map((lang, index) => {
                const IconComponent = getTechIcon(lang);
                return (
                  <motion.div
                    key={lang}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      backgroundColor: `${colorScheme.primary}10`,
                      border: `1px solid ${colorScheme.primary}20`
                    }}
                    custom={index}
                    variants={techVariants}
                  >
                    <IconComponent 
                      className="text-lg" 
                      style={{ color: colorScheme.primary }}
                    />
                    <span className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {lang}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div 
          className="lg:col-span-3"
          variants={sectionVariants}
        >
          <div 
            className={`rounded-2xl backdrop-blur-xl border p-8 ${
              theme === 'dark' 
                ? 'bg-gray-800/30 border-gray-700/40' 
                : 'bg-white/30 border-gray-300/40'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="p-2 rounded-lg text-white"
                style={{ backgroundColor: colorScheme.primary }}
              >
                <FaTag />
              </div>
              <h3 className="text-xl font-bold">Descrizione Completa</h3>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className={`whitespace-pre-line leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {project.fullDescription}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Minimal navigation */}
      <motion.div 
        className="max-w-6xl mx-auto mt-8"
        variants={sectionVariants}
      >
        <div className="flex items-center justify-between gap-4">
          {prevProject && (
            <Link
              to={`/projects/${prevProject.id}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm border text-sm font-medium transition-all ${
                theme === 'dark' 
                  ? 'bg-gray-800/20 border-gray-700/30 text-gray-300 hover:bg-gray-800/30' 
                  : 'bg-white/20 border-gray-300/30 text-gray-700 hover:bg-white/30'
              }`}
            >
              <FaChevronLeft size={14} />
              <span className="hidden sm:inline">{prevProject.title}</span>
            </Link>
          )}
          
          <div className="flex-1 text-center">
            <Link 
              to="/projects" 
              className={`text-sm font-medium transition-colors ${
                theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
              }`}
              style={{ color: colorScheme.primary }}
            >
              Torna ai progetti
            </Link>
          </div>
          
          {nextProject && (
            <Link
              to={`/projects/${nextProject.id}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm border text-sm font-medium transition-all ${
                theme === 'dark' 
                  ? 'bg-gray-800/20 border-gray-700/30 text-gray-300 hover:bg-gray-800/30' 
                  : 'bg-white/20 border-gray-300/30 text-gray-700 hover:bg-white/30'
              }`}
            >
              <span className="hidden sm:inline">{nextProject.title}</span>
              <FaChevronRight size={14} />
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;