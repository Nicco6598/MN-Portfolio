// src/pages/Contact.tsx
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projectData';
import { ThemeContext } from '../context/ThemeContext';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaCheckCircle, FaPaperPlane, FaFileDownload, FaPhone, FaGlobe } from 'react-icons/fa';

const Contact: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validationErrors: { email?: string; message?: string } = {};

    if (!validateEmail(email)) {
      validationErrors.email = 'Inserisci una email valida.';
    }

    if (message.length < 10) {
      validationErrors.message = 'La descrizione deve contenere almeno 10 caratteri.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Form Data:', {
        email,
        message,
        selectedProject
      });

      setIsSubmitted(true);
      
      setTimeout(() => {
        setEmail('');
        setMessage('');
        setSelectedProject(null);
        setErrors({});
        setIsSubmitted(false);
      }, 5000);
    }
  };

  const selectedProjectData = projects.find(project => project.id === selectedProject);

  // Modern color scheme
  const colorScheme = {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    accent: '#06B6D4'
  };

  // Advanced animations
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
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
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary}, ${colorScheme.accent})`
            }}
          >
            CONTATTI
          </motion.h1>
          <motion.p 
            className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}
            variants={itemVariants}
          >
            Hai un progetto in mente o vuoi saperne di più sul mio lavoro? 
            <br />Sono sempre aperto a nuove collaborazioni e sfide interessanti.
          </motion.p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Card */}
          <motion.div 
            className="lg:col-span-1"
            variants={cardVariants}
          >
            <div 
              className={`rounded-2xl backdrop-blur-xl border p-8 h-full ${
                theme === 'dark' 
                  ? 'bg-gray-800/30 border-gray-700/40' 
                  : 'bg-white/30 border-gray-300/40'
              }`}
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
            >
              <motion.div 
                className="mb-8"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold mb-2">Informazioni</h2>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Mettiti in contatto con me
                </p>
              </motion.div>

              <div className="space-y-6">
                {[
                  { icon: FaMapMarkerAlt, label: 'Posizione', value: 'Pioltello (MI), Italia' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: colorScheme.primary }}
                    >
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.label}</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div 
                className="mt-8 pt-8 border-t"
                variants={itemVariants}
                style={{
                  borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
                }}
              >
                <h3 className="font-semibold mb-4">Social</h3>
                <div className="flex space-x-3">
                  {[
                    { icon: FaGithub, href: 'https://github.com/Nicco6598', label: 'GitHub' },
                    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/marconiccolini-/', label: 'LinkedIn' }
                  ].map((social, index) => (
                    <motion.a 
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        theme === 'dark' 
                          ? 'bg-gray-700/50 hover:bg-gray-600/50' 
                          : 'bg-gray-100/50 hover:bg-gray-200/50'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon size={20} style={{ color: colorScheme.primary }} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* CV Downloads */}
              <motion.div 
                className="mt-8 pt-8 border-t"
                variants={itemVariants}
                style={{
                  borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
                }}
              >
                <h3 className="font-semibold mb-4">Curriculum</h3>
                <div className="space-y-3">
                  {[
                    { label: 'CV Italiano', file: 'CV_Marco_Niccolini(IT).pdf' },
                    { label: 'Resume English', file: 'CV_Marco_Niccolini(EN).pdf' }
                  ].map((cv, index) => (
                    <motion.a
                      key={index}
                      href={`/assets/cv/${cv.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={cv.file}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        theme === 'dark' 
                          ? 'bg-gray-700/50 hover:bg-gray-600/50' 
                          : 'bg-gray-100/50 hover:bg-gray-200/50'
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <FaFileDownload size={16} className="mr-3" style={{ color: colorScheme.primary }} />
                        <span className="text-sm font-medium">{cv.label}</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-indigo-500/20 text-indigo-400">
                        {index === 0 ? 'IT' : 'EN'}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            variants={cardVariants}
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
              <motion.div 
                className="mb-8"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold mb-2">Invia un messaggio</h2>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Raccontami del tuo progetto
                </p>
              </motion.div>

              {isSubmitted ? (
                <motion.div 
                  className="p-8 rounded-xl text-center"
                  style={{
                    background: `linear-gradient(135deg, ${colorScheme.primary}20, ${colorScheme.secondary}20)`
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: colorScheme.primary }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1 }}
                  >
                    <FaCheckCircle className="text-white" size={24} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Grazie per il tuo messaggio!</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Ti risponderò il prima possibile.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2">Nome</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all focus:outline-none focus:ring-2 ${
                          theme === 'dark' 
                            ? 'bg-gray-700/50 border-gray-600/50 focus:border-indigo-500 focus:ring-indigo-500/50' 
                            : 'bg-white/50 border-gray-300/50 focus:border-indigo-500 focus:ring-indigo-500/50'
                        }`}
                        placeholder="Il tuo nome"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all focus:outline-none focus:ring-2 ${
                          errors.email 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
                            : theme === 'dark' 
                              ? 'bg-gray-700/50 border-gray-600/50 focus:border-indigo-500 focus:ring-indigo-500/50' 
                              : 'bg-white/50 border-gray-300/50 focus:border-indigo-500 focus:ring-indigo-500/50'
                        }`}
                        placeholder="tua.email@esempio.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium mb-2">Oggetto</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all focus:outline-none focus:ring-2 ${
                        theme === 'dark' 
                          ? 'bg-gray-700/50 border-gray-600/50 focus:border-indigo-500 focus:ring-indigo-500/50' 
                          : 'bg-white/50 border-gray-300/50 focus:border-indigo-500 focus:ring-indigo-500/50'
                      }`}
                      placeholder="Oggetto del messaggio"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium mb-2">Progetto di interesse (opzionale)</label>
                    <select
                      value={selectedProject || ''}
                      onChange={e => setSelectedProject(e.target.value ? parseInt(e.target.value) : null)}
                      className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all focus:outline-none focus:ring-2 ${
                        theme === 'dark' 
                          ? 'bg-gray-700/50 border-gray-600/50 focus:border-indigo-500 focus:ring-indigo-500/50' 
                          : 'bg-white/50 border-gray-300/50 focus:border-indigo-500 focus:ring-indigo-500/50'
                      }`}
                    >
                      <option value="">Seleziona un progetto</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.title}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {selectedProjectData && (
                    <motion.div 
                      variants={itemVariants}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border ${
                        theme === 'dark' 
                          ? 'bg-gray-700/30 border-gray-600/30' 
                          : 'bg-gray-100/30 border-gray-300/30'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <img 
                          src={selectedProjectData.imageUrl} 
                          alt={selectedProjectData.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{selectedProjectData.title}</h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {selectedProjectData.shortDescription}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium mb-2">Messaggio *</label>
                    <textarea
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all focus:outline-none focus:ring-2 resize-none ${
                        errors.message 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
                          : theme === 'dark' 
                            ? 'bg-gray-700/50 border-gray-600/50 focus:border-indigo-500 focus:ring-indigo-500/50' 
                            : 'bg-white/50 border-gray-300/50 focus:border-indigo-500 focus:ring-indigo-500/50'
                      }`}
                      rows={5}
                      placeholder="Descrivi il tuo progetto o la tua richiesta..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </motion.div>

                  <motion.button 
                    type="submit" 
                    className="w-full py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
                      color: 'white'
                    }}
                    whileHover={{ scale: 1.02, boxShadow: `0 10px 25px -5px ${colorScheme.primary}40` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Invia Messaggio</span>
                    <FaPaperPlane size={16} />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          className="mt-16"
          variants={itemVariants}
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
            <div className="p-8">
              <motion.h3 
                className="text-2xl font-bold mb-4"
                variants={itemVariants}
              >
                Dove mi trovo
              </motion.h3>
              <div className="rounded-xl overflow-hidden">
                <iframe 
                  src="https://maps.google.com/maps?width=100%&height=450&hl=en&q=Pioltello%20(MI),%20Italia&z=14&ie=UTF8&iwloc=B&output=embed"
                  width="100%" 
                  height="400" 
                  frameBorder="0" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  aria-hidden={false} 
                  tabIndex={0}
                  title="Mappa posizione Pioltello (MI), Italia"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;