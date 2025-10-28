// src/components/Footer.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowUp, FaFileDownload } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const Footer: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 20,
        delay: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const socialIconHover = {
    y: -3,
    scale: 1.1,
    transition: { type: "spring", stiffness: 300 }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Progetti", path: "/projects" },
    { name: "Contatti", path: "/contact" }
  ];

  const cvLinks = [
    { name: "CV (IT)", url: "/assets/cv/CV_Marco_Niccolini(IT).pdf", download: "CV_Marco_Niccolini(IT).pdf" },
    { name: "Resume (EN)", url: "/assets/cv/CV_Marco_Niccolini(EN).pdf", download: "CV_Marco_Niccolini(EN).pdf" }
  ];

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub size={22} />, url: "https://github.com/Nicco6598" },
    { name: "LinkedIn", icon: <FaLinkedin size={22} />, url: "https://www.linkedin.com/in/marco-niccolini-web-developer/" }
  ];

  return (
    <motion.footer 
      className="relative mt-24"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`
            glassmorphism rounded-t-2xl rounded-b-none p-8 sm:p-10
            ${theme === 'dark' ? 'border-t border-l border-r border-gray-800' : 'border-t border-l border-r border-gray-200'}
          `}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Logo and Name */}
            <motion.div 
              className="flex flex-col items-center sm:items-start text-center sm:text-left"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={logo} alt="Marco Niccolini Logo" className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="text-lg font-bold">Marco Niccolini</h3>
                  <p className="text-sm text-secondary">Web & Blockchain Developer</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div variants={itemVariants} className="text-center sm:text-left">
              <h4 className="font-semibold mb-4 text-secondary uppercase tracking-wider text-sm">Navigazione</h4>
              <ul className="space-y-2">
                {navLinks.map(link => (
                  <motion.li 
                    key={link.path}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link 
                      to={link.path} 
                      className="hover:text-accent transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div variants={itemVariants} className="text-center sm:text-left">
              <h4 className="font-semibold mb-4 text-secondary uppercase tracking-wider text-sm">Risorse</h4>
              <ul className="space-y-2">
                {cvLinks.map(link => (
                  <li key={link.name}>
                    <motion.a 
                      href={link.url} 
                      download={link.download}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-accent transition-colors duration-300"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <FaFileDownload />
                      <span>{link.name}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="text-center sm:text-left">
              <h4 className="font-semibold mb-4 text-secondary uppercase tracking-wider text-sm">Connettiti</h4>
              <div className="flex justify-center sm:justify-start items-center gap-4">
                {socialLinks.map(social => (
                  <motion.a 
                    key={social.name}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:text-accent transition-colors"
                    aria-label={`Visita il mio profilo ${social.name}`}
                    whileHover={socialIconHover}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider and Copyright */}
          <motion.div 
            className="mt-10 pt-6 border-t"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.8 } }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-secondary">
              <p className="mb-4 sm:mb-0">&copy; {new Date().getFullYear()} Marco Niccolini. Tutti i diritti riservati.</p>
              <button 
                onClick={scrollToTop}
                className="flex items-center gap-2 hover:text-accent transition-colors group"
                aria-label="Torna in cima alla pagina"
              >
                Torna su
                <motion.span whileHover={{ y: -3 }}>
                  <FaArrowUp />
                </motion.span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
