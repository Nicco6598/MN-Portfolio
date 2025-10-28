import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import profilePic from '../../assets/profile.jpg';

const HeroSection: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Enhanced container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.8
      }
    }
  };

  // Enhanced item variants with spring physics
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
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

  // Profile card variants with 3D effects
  const profileCardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      rotateY: 15,
      rotateX: 15
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15,
        duration: 1,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.02,
      rotateY: -5,
      rotateX: -5,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Enhanced social variants with micro-interactions
  const socialVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }
    }
  };

  // Enhanced blob animations
  const blobVariants = {
    animate: {
      scale: [1, 1.1, 0.9, 1.05, 1],
      opacity: [0.2, 0.4, 0.3, 0.5, 0.2],
      rotate: [0, 90, 180, 270, 360],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Floating particles animation
  const particleVariants = {
    animate: {
      y: [0, -30, 0],
      x: [0, 20, -10, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2
      }
    }
  };

  // Stats counter animation
  const counterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8 + i * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      y: -3,
      transition: { duration: 0.2 }
    }
  };

  // Text reveal animation
  const textRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 80
      }
    })
  };

  const stats = [
    { numero: "1.5+", testo: "Anni di esperienza", colore: "from-indigo-500/20 via-violet-500/20 to-purple-500/20", delay: 0.1 },
    { numero: "5+", testo: "Progetti completati", colore: "from-violet-500/20 via-purple-500/20 to-pink-500/20", delay: 0.2 },
    { numero: "7+", testo: "Smart Contract", colore: "from-purple-500/20 via-pink-500/20 to-indigo-500/20", delay: 0.3 },
    { numero: "100%", testo: "Soddisfazione clienti", colore: "from-pink-500/20 via-indigo-500/20 to-violet-500/20", delay: 0.4 }
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="py-20 mb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
    >
      {/* Background floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${
              i % 3 === 0 ? 'from-indigo-500 to-purple-500' :
              i % 3 === 1 ? 'from-purple-500 to-pink-500' :
              'from-pink-500 to-indigo-500'
            } opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={particleVariants}
            animate="animate"
            custom={i}
          />
        ))}
      </div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Colonna sinistra - Card Profilo con effetti 3D */}
        <motion.div 
          className="lg:col-span-5 flex justify-center"
          variants={itemVariants}
        >
          <div className="relative">
            {/* Enhanced blob animations */}
            <motion.div 
              className="absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-20 bg-gradient-to-br from-indigo-500 to-purple-500 blur-3xl -z-10"
              variants={blobVariants}
              animate="animate"
            />
            <motion.div 
              className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full opacity-20 bg-gradient-to-br from-purple-500 to-pink-500 blur-3xl -z-10"
              variants={blobVariants}
              animate="animate"
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full opacity-10 bg-gradient-to-br from-pink-500 to-indigo-500 blur-2xl -z-10"
              style={{ transform: 'translate(-50%, -50%)' }}
              variants={blobVariants}
              animate="animate"
            />

            {/* Enhanced profile card with glassmorphism */}
            <motion.div
              className={`relative overflow-hidden rounded-3xl backdrop-blur-xl border transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-gray-800/40 border-gray-700/50' 
                  : 'bg-white/40 border-gray-300/50'
              } shadow-2xl`}
              style={{ 
                maxWidth: '400px',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
              variants={profileCardVariants}
              whileHover="hover"
            >
              {/* Profile image with overlay */}
              <div className="relative overflow-hidden">
                <motion.img 
                  src={profilePic} 
                  alt="Marco Niccolini" 
                  className="w-full h-80 object-cover"
                  style={{ objectFit: 'cover' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Gradient overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t ${
                    theme === 'dark' 
                      ? 'from-gray-900/60 via-transparent to-transparent' 
                      : 'from-white/60 via-transparent to-transparent'
                  }`}
                />
                
                {/* Floating badge */}
                <motion.div
                  className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  Available
                </motion.div>
              </div>
              
              {/* Social bar with glassmorphism */}
              <div className={`px-4 py-4 flex items-center justify-between ${
                theme === 'dark' 
                  ? 'bg-gray-900/30 backdrop-blur-sm' 
                  : 'bg-white/30 backdrop-blur-sm'
              }`}>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    @marconiccolini
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <motion.a
                    href="https://github.com/Nicco6598"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'text-gray-200 hover:bg-indigo-500 hover:text-white hover:shadow-lg' 
                        : 'text-gray-700 hover:bg-indigo-500 hover:text-white hover:shadow-lg'
                    }`}
                    variants={socialVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub size={20} />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/marco-niccolini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'text-gray-200 hover:bg-indigo-500 hover:text-white hover:shadow-lg' 
                        : 'text-gray-700 hover:bg-indigo-500 hover:text-white hover:shadow-lg'
                    }`}
                    variants={socialVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Colonna destra - Contenuto testuale con animazioni avanzate */}
        <motion.div 
          className="lg:col-span-7 text-center lg:text-left"
          variants={itemVariants}
        >
          {/* Badge professionale */}
          <motion.div
            className="inline-block px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Web & Blockchain Developer
            </span>
          </motion.div>
          
          {/* Titolo principale con animazione testuale */}
          <motion.div variants={itemVariants}>
            <motion.h1 
              className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 tracking-tight"
              custom={0}
              variants={textRevealVariants}
            >
              <span className="inline-block mb-2">Ciao, sono</span>
            </motion.h1>
            <motion.h1 
              className="text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 tracking-tight"
              custom={1}
              variants={textRevealVariants}
            >
              <span className="text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                MARCO NICCOLINI
              </span>
            </motion.h1>
          </motion.div>
          
          {/* Descrizione con animazione */}
          <motion.p 
            className={`text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
            custom={2}
            variants={textRevealVariants}
          >
            Sono uno sviluppatore informatico con una forte passione per
            la tecnologia blockchain. Ho conseguito un master in sviluppo
            blockchain presso l'Università Start2Impact, acquisendo una solida base
            nella progettazione e nello sviluppo di software innovativi.
          </motion.p>
          
          {/* CTA Buttons - Modern & Clean */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            variants={itemVariants}
          >
            {/* Primary Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/projects"
                className="btn btn-primary btn-lg"
              >
                <span>Esplora Progetti</span>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Secondary Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/contact"
                className="btn btn-secondary btn-lg"
              >
                <FaEnvelope className="w-4 h-4" />
                <span>Contattami</span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Stats con animazioni contatore */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl bg-gradient-to-br ${stat.colore} backdrop-blur-sm border ${
                  theme === 'dark' 
                    ? 'border-gray-700/50' 
                    : 'border-gray-200/50'
                }`}
                custom={index}
                variants={counterVariants}
                whileHover="hover"
              >
                <motion.h3 
                  className="text-accent text-3xl font-bold"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ 
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {stat.numero}
                </motion.h3>
                <p className={`text-sm mt-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {stat.testo}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;