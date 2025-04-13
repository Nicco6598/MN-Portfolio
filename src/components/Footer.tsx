// src/components/Footer.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaMapMarkerAlt, 
  FaMoon, 
  FaSun, 
  FaEnvelope,
  FaCode,
  FaFileAlt,
  FaHome,
  FaLaptopCode
} from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const Footer: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // Animazioni
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
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
    }
  };
  
  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1
    },
    hover: { 
      scale: 1.2,
      transition: { duration: 0.2 }
    }
  };

  // Link rapidi per la navigazione
  const quickLinks = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Progetti", icon: <FaLaptopCode />, path: "/projects" },
    { name: "Contatti", icon: <FaEnvelope />, path: "/contact" }
  ];
  
  // Link risorse esterne
  const externalLinks = [
    { 
      name: "GitHub", 
      icon: <FaGithub />, 
      url: "https://github.com/Nicco6598" 
    },
    { 
      name: "LinkedIn", 
      icon: <FaLinkedin />, 
      url: "https://www.linkedin.com/in/marco-niccolini98/" 
    }
  ];
  
  // Link CV
  const cvLinks = [
    { 
      name: "CV in Italiano", 
      url: "https://www.dropbox.com/scl/fi/j6fmtjtc4pz5tg0ym2ft5/Marco_Niccolini-CV-IT.pdf?rlkey=usg26nik24hays92zwodzum9v&st=qgjrzhgx&dl=0" 
    },
    { 
      name: "CV in Inglese", 
      url: "https://www.dropbox.com/scl/fi/fl5mqi4fxaqrk76b9m4rq/Marco_Niccolini_CV-ENG.pdf?rlkey=4irakujhbx7x7lhk98cel3raz&st=g363iikd&dl=0" 
    }
  ];

  return (
    <motion.footer 
      className="mx-auto max-w-6xl px-4 pt-12 pb-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Grid di layout in stile bento */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sezione info principale */}
        <motion.div 
          className={`md:col-span-4 glassmorphism rounded-2xl p-6 ${theme === 'dark' ? 'border border-gray-800' : 'border border-gray-200'}`}
          variants={itemVariants}
        >
          <Link to="/" className="flex items-center space-x-3 mb-4">
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
                  repeatType: "reverse" as const
                }}
              />
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full relative z-10" />
            </div>
            <span className="text-xl font-bold">Marco Niccolini</span>
          </Link>
          
          <motion.p 
            className="text-secondary mb-4"
            variants={itemVariants}
          >
            Sviluppatore Web e Blockchain specializzato in soluzioni moderne e innovative.
          </motion.p>
          
          <motion.div 
            className="flex items-center space-x-2 text-secondary"
            variants={itemVariants}
          >
            <FaMapMarkerAlt className="text-accent" />
            <span>Pioltello (MI), Italia</span>
          </motion.div>
          
          {/* Social links in stile pill */}
          <motion.div 
            className="mt-6 flex flex-wrap gap-3"
            variants={itemVariants}
          >
            {externalLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-accent hover:text-white' 
                    : 'bg-gray-100 hover:bg-accent hover:text-white'
                }`}
                variants={socialIconVariants}
                whileHover="hover"
              >
                {link.icon}
                <span>{link.name}</span>
              </motion.a>
            ))}
            
            <motion.button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-800 hover:bg-accent hover:text-white' 
                  : 'bg-gray-100 hover:bg-accent hover:text-white'
              }`}
              variants={socialIconVariants}
              whileHover="hover"
              aria-label={theme === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
              <span>{theme === 'dark' ? 'Tema chiaro' : 'Tema scuro'}</span>
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Navigazione */}
        <motion.div 
          className={`md:col-span-4 glassmorphism rounded-2xl p-6 ${theme === 'dark' ? 'border border-gray-800' : 'border border-gray-200'}`}
          variants={itemVariants}
        >
          <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
            <FaCode className="text-accent" />
            <span>Link Utili</span>
          </h3>
          
          <div className="space-y-3">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link 
                  to={link.path}
                  className="flex items-center gap-3 py-2 hover:text-accent transition-colors"
                >
                  <span className="text-accent">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              </motion.div>
            ))}
            
            {/* Linea separatrice */}
            <div className="border-b border-gray-200 dark:border-gray-700 opacity-30 my-4"></div>
            
            <motion.h3 
              className="text-lg font-bold mb-4 flex items-center gap-2"
              variants={itemVariants}
            >
              <FaFileAlt className="text-accent" />
              <span>Curriculum</span>
            </motion.h3>
            
            {cvLinks.map((link, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index + quickLinks.length}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 py-2 hover:text-accent transition-colors"
                >
                  <span className="text-accent">⟨⟩</span>
                  <span>{link.name}</span>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Newsletter/Contatto */}
        <motion.div 
          className={`md:col-span-4 glassmorphism rounded-2xl p-6 ${theme === 'dark' ? 'border border-gray-800' : 'border border-gray-200'}`}
          variants={itemVariants}
        >
          <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
            <FaEnvelope className="text-accent" />
            <span>Contattami</span>
          </h3>
          
          <p className="text-secondary mb-5">
            Vuoi collaborare o hai domande sui miei progetti? Non esitare a contattarmi!
          </p>
          
          <Link 
            to="/contact"
            className="btn btn-primary w-full flex items-center justify-center gap-2 py-3"
          >
            <FaEnvelope />
            <span>Invia un messaggio</span>
          </Link>
          
          {/* Blob decorativo */}
          <div className="relative h-36 mt-6 overflow-hidden rounded-lg">
            <motion.div
              className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-accent opacity-10 blur-3xl"
              animate={{
                scale: [1, 1.1, 0.9, 1],
                x: [0, 5, -5, 0],
                y: [0, -5, 5, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
              className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-violet-500 opacity-10 blur-3xl"
              animate={{
                scale: [1, 0.9, 1.1, 1],
                x: [0, -5, 5, 0],
                y: [0, 5, -5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
            
            {/* Quote inspirazionale */}
            <div className="relative h-full flex items-center justify-center z-10 p-4 text-center">
              <p className="italic text-sm text-secondary">
                "La tecnologia blockchain rappresenta il futuro dell'economia digitale,
                e sono entusiasta di farne parte."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Copyright bar */}
      <motion.div 
        className={`mt-8 pt-4 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        } flex flex-col md:flex-row justify-between items-center text-sm text-secondary`}
        variants={itemVariants}
      >
        <p>© {new Date().getFullYear()} Marco Niccolini. Tutti i diritti riservati.</p>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {/* Versione compatta per mobile */}
          <div className="flex md:hidden space-x-4">
            {externalLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
          
          <span>Costruito con React e ❤️</span>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;