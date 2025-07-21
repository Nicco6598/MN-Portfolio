// src/components/Navbar.tsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { 
  FaFileDownload, 
  FaGithub, 
  FaSun, 
  FaMoon, 
  FaTimes, 
  FaBars, 
  FaHome, 
  FaLaptopCode, 
  FaEnvelope,
  FaEllipsisV
} from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Gestione dell'effetto di scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Chiusura menu alla navigazione
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  // Disabilita lo scroll quando il menu è aperto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Chiudi dropdown quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDropdownOpen && !target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Animazioni
  const navItemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      y: -3,
      transition: { duration: 0.2 }
    }
  };

  // Items della navigazione
  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Progetti", path: "/projects", icon: <FaLaptopCode /> },
    { name: "Contatti", path: "/contact", icon: <FaEnvelope /> }
  ];

  // CV links
  const cvLinks = [
    { 
      name: "CV (IT)", 
      url: "/assets/cv/CV_Marco_Niccolini(IT).pdf" 
    },
    { 
      name: "RESUME", 
      url: "/assets/cv/CV_Marco_Niccolini(EN).pdf" 
    }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 w-full px-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-6xl mx-auto py-4">
        <motion.nav 
          className={`
            glassmorphism rounded-2xl flex justify-between items-center px-5 py-3
            ${theme === 'dark' ? 'border border-gray-800' : 'border border-gray-200'}
            ${isScrolled ? 'py-2 shadow-lg' : 'py-3'}
          `}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            variants={navItemVariants}
          >
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <motion.div 
                  className="absolute inset-0 bg-accent opacity-20 rounded-full"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <img src={logo} alt="Marco Niccolini" className="w-10 h-10 rounded-full relative z-10" />
              </div>
              <span className="text-lg font-bold hidden sm:block">Marco Niccolini</span>
            </Link>
          </motion.div>

          {/* Links Navigazione Desktop */}
          <div className="hidden md:flex items-center justify-center">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  variants={navItemVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <Link 
                    to={item.path} 
                    className={`
                      px-4 py-2 rounded-xl mx-1 transition-colors
                      ${location.pathname === item.path || 
                        (item.path === '/projects' && location.pathname.includes('/projects/')) 
                          ? 'text-accent font-medium'
                          : 'hover:text-accent'
                      }
                    `}
                  >
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Controls Desktop */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button 
              onClick={toggleTheme} 
              className={`
                w-10 h-10 flex items-center justify-center rounded-full
                ${theme === 'dark' 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
                } 
                transition-colors
              `}
              aria-label={theme === 'light' ? 'Passa al tema scuro' : 'Passa al tema chiaro'}
              variants={navItemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'light' 
                ? <FaMoon className="text-gray-700" size={18} /> 
                : <FaSun className="text-accent" size={18} />
              }
            </motion.button>

            {/* Dropdown Menu per CV e GitHub */}
            <div className="hidden md:block dropdown-container relative">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`
                  w-10 h-10 flex items-center justify-center rounded-full
                  ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
                  ${isDropdownOpen ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100') : ''}
                  transition-colors
                `}
                aria-label="Opzioni"
                variants={navItemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEllipsisV size={16} />
              </motion.button>
              
              {/* Dropdown Content */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    className={`absolute right-0 mt-4 w-48 rounded-xl overflow-hidden shadow-lg z-50 glassmorphism ${theme === 'dark' ? 'border border-gray-800' : 'border border-gray-200'}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-1">
                      {/* CV Links */}
                      <div className="px-3 py-2 text-xs font-semibold text-secondary">Curriculum</div>
                      {cvLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={link.name === "CV (IT)" ? "Marco_Niccolini_CV_IT.pdf" : "Marco_Niccolini_CV_ENG.pdf"}
                          className={`block px-4 py-2 text-sm transition-colors flex items-center gap-2 ${theme === 'dark' ? 'hover:bg-accent hover:text-white' : 'hover:bg-accent hover:text-white text-gray-700'}`}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FaFileDownload size={14} />
                          <span>{link.name}</span>
                        </a>
                      ))}
                      
                      {/* Divider */}
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      
                      {/* GitHub Link */}
                      <a
                        href="https://github.com/Nicco6598"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block px-4 py-2 text-sm transition-colors flex items-center gap-2 ${theme === 'dark' ? 'hover:bg-accent hover:text-white' : 'hover:bg-accent hover:text-white text-gray-700'}`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaGithub size={14} />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button 
              onClick={() => setIsMenuOpen(true)} 
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-accent text-white"
              aria-label="Apri menu"
              variants={navItemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBars size={18} />
            </motion.button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu con AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-50 md:hidden overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Overlay Background con blur più sottile e gradiente */}
            <motion.div 
              className="fixed inset-0 backdrop-blur-md"
              style={{
                background: theme === 'dark' 
                  ? 'radial-gradient(circle at center, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                  : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.95) 100%)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div 
              className="relative min-h-full flex flex-col overflow-y-auto pb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Container bento-style */}
              <div className="min-h-full p-6 flex flex-col">
                {/* Header con design bento */}
                <motion.div 
                  className="glassmorphism mb-6 rounded-2xl p-4 flex items-center justify-between sticky top-0 z-10"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
                    <div className="relative w-12 h-12 overflow-hidden rounded-full">
                      <motion.div 
                        className="absolute inset-0 bg-accent opacity-20 rounded-full"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.3, 0.2]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                      <img src={logo} alt="Logo" className="w-12 h-12 rounded-full relative z-10" />
                    </div>
                    <div>
                      <span className="text-xl font-bold block">Marco Niccolini</span>
                      <span className="text-xs text-secondary">Web & Blockchain Developer</span>
                    </div>
                  </Link>
                  <motion.button 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-subtle text-accent"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Chiudi menu"
                  >
                    <FaTimes size={20} />
                  </motion.button>
                </motion.div>
                
                {/* Navigation grid in stile bento */}
                <motion.div 
                  className="glassmorphism rounded-2xl p-5 mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-sm font-medium mb-4 text-secondary">NAVIGAZIONE</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {navItems.map((item, index) => (
                      <motion.div 
                        key={item.path}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ 
                          x: 0, 
                          opacity: 1,
                          transition: { delay: index * 0.1 + 0.3 }
                        }}
                      >
                        <Link
                          to={item.path}
                          className={`
                            block p-4 rounded-xl flex items-center gap-4 transition-all
                            ${location.pathname === item.path || 
                              (item.path === '/projects' && location.pathname.includes('/projects/')) 
                                ? 'bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-accent font-medium'
                                : `hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-violet-500/10`
                            }
                          `}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center 
                            ${location.pathname === item.path ? 'bg-accent text-white' : 'bg-subtle text-accent'}
                          `}>
                            {item.icon}
                          </div>
                          <span className="text-lg">{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Resources & Links in stile bento */}
                <motion.div 
                  className="glassmorphism rounded-2xl p-5 mb-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-sm font-medium mb-4 text-secondary">RISORSE</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {/* Download CV section */}
                    <div>
                      <h4 className="text-xs font-medium mb-3 text-secondary px-1">CURRICULUM</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {cvLinks.map((link, index) => (
                          <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={link.name === "CV (IT)" ? "Marco_Niccolini_CV_IT.pdf" : "Marco_Niccolini_CV_ENG.pdf"}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-subtle hover:bg-accent hover:text-white transition-all group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              transition: { delay: 0.5 + index * 0.1 } 
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:bg-white">
                              <FaFileDownload className="text-accent" />
                            </div>
                            <span className="text-sm font-medium">{link.name}</span>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* GitHub link section */}
                    <div>
                      <h4 className="text-xs font-medium mb-3 text-secondary px-1">SOCIAL</h4>
                      <motion.a
                        href="https://github.com/Nicco6598"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-subtle hover:bg-accent hover:text-white transition-all group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: 0.7 } 
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:bg-white">
                          <FaGithub className="text-accent" size={20} />
                        </div>
                        <div>
                          <span className="text-sm font-medium block">GitHub</span>
                          <span className="text-xs text-secondary group-hover:text-white">Visita il profilo</span>
                        </div>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
                
                {/* Theme Toggle */}
                <motion.button
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="glassmorphism py-4 w-full rounded-2xl mt-6 mb-10 flex items-center justify-center gap-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: { delay: 0.8 } 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {theme === 'light' 
                    ? <FaMoon className="text-accent" size={18} /> 
                    : <FaSun className="text-accent" size={18} />
                  }
                  <span className="font-medium">
                    {theme === 'light' ? 'Attiva Dark Mode' : 'Attiva Light Mode'}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;