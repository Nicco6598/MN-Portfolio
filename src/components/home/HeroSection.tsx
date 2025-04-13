import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import profilePic from '../../assets/profile.jpg';

const HeroSection: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  // Varianti di animazione
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  // Animazione per la card principale
  const profileCardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  // Animazione per le icone social
  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.15,
      transition: { duration: 0.2 }
    }
  };

  // Animazione più fluida per i bottoni CTA
  const buttonVariants = {
    hover: { 
      y: -3,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  // Animazione per i blob decorativi
  const blobVariants = {
    animate: {
      scale: [1, 1.05, 0.95, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  // Animazione per il testo evidenziato
  const highlightTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 50,
        delay: 0.4
      }
    }
  };

  return (
    <motion.section 
      className="py-10 mb-16 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Colonna sinistra - Card Profilo (più larga) */}
        <motion.div 
          className="lg:col-span-5 flex justify-center"
          variants={itemVariants}
        >
          <div className="relative">
            {/* Blob decorativi di background */}
            <motion.div 
              className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-30 bg-indigo-500 blur-3xl -z-10"
              animate={{
                scale: [1, 1.1, 0.9, 1],
                x: [0, 5, -5, 0],
                y: [0, -5, 5, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div 
              className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full opacity-30 bg-purple-500 blur-3xl -z-10"
              animate={{
                scale: [1, 0.9, 1.1, 1],
                x: [0, -5, 5, 0],
                y: [0, 5, -5, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Card principale in stile bento */}
            <motion.div
              className={`glassmorphism overflow-hidden rounded-3xl ${theme === 'dark' ? 'border border-gray-800' : 'border border-gray-200'}`}
              style={{ maxWidth: '420px' }}
              variants={profileCardVariants}
            >
              {/* Immagine profilo */}
              <div className="relative overflow-hidden">
                <img 
                  src={profilePic} 
                  alt="Marco Niccolini" 
                  className="w-full object-cover"
                  style={{ objectFit: 'cover' }}
                />
                
                {/* Overlay gradient per migliorare il contrasto */}
                <div 
                  className={`absolute inset-0 opacity-10 ${theme === 'dark' ? 'bg-gradient-to-b from-indigo-900 to-transparent' : 'bg-gradient-to-b from-indigo-100 to-transparent'}`}
                ></div>
              </div>
              
              {/* Barra social, completamente integrata nel design bento */}
              <div className={`px-4 py-3 flex items-center justify-between ${theme === 'dark' ? 'bg-gray-900 bg-opacity-50' : 'bg-white bg-opacity-50'}`}>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    @marconiccolini
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <motion.a
                    href="https://github.com/Nicco6598"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                      theme === 'dark' 
                        ? 'text-gray-200 hover:bg-indigo-500 hover:text-white' 
                        : 'text-gray-700 hover:bg-indigo-500 hover:text-white'
                    }`}
                    variants={socialVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub size={18} />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/marco-niccolini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                      theme === 'dark' 
                        ? 'text-gray-200 hover:bg-indigo-500 hover:text-white' 
                        : 'text-gray-700 hover:bg-indigo-500 hover:text-white'
                    }`}
                    variants={socialVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin size={18} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Colonna destra - Contenuto Testuale */}
        <motion.div 
          className="lg:col-span-7 text-center lg:text-left"
          variants={itemVariants}
        >
          <motion.div
            className="inline-block px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 text-accent"
            variants={itemVariants}
          >
            <span className="font-medium text-sm">Web & Blockchain Developer</span>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 tracking-tight">
              <span className="inline-block mb-2">Ciao, sono</span>
            </h1>
            <motion.h1 
              className="text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 tracking-tight"
              variants={highlightTextVariants}
            >
              <span className="text-gradient bg-clip-text">MARCO NICCOLINI</span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 text-secondary leading-relaxed"
            variants={itemVariants}
          >
            Sono uno sviluppatore informatico con una forte passione per
            la tecnologia blockchain. Ho conseguito un master in sviluppo
            blockchain presso l'Università Start2Impact, acquisendo una solida base
            nella progettazione e nello sviluppo di software.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                to="/projects" 
                className="btn btn-primary flex items-center justify-center gap-2 px-8"
              >
                <span>Esplora Progetti</span>
                <FaArrowRight />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                to="/contact" 
                className="btn btn-secondary flex items-center justify-center gap-2 px-8"
              >
                <FaEnvelope />
                <span>Contattami</span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Statistiche in stile "bento grid" */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { numero: "5+", testo: "Anni di esperienza", colore: "from-indigo-500/10 to-violet-500/10", delay: 0.1 },
              { numero: "20+", testo: "Progetti completati", colore: "from-violet-500/10 to-purple-500/10", delay: 0.2 },
              { numero: "10+", testo: "Smart Contract", colore: "from-purple-500/10 to-pink-500/10", delay: 0.3 },
              { numero: "100%", testo: "Soddisfazione clienti", colore: "from-pink-500/10 to-indigo-500/10", delay: 0.4 }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className={`p-4 rounded-lg bg-gradient-to-r ${stat.colore}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: stat.delay,
                    duration: 0.5
                  }
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-accent text-3xl font-bold">{stat.numero}</h3>
                <p className="text-sm">{stat.testo}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection; 