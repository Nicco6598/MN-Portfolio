// src/pages/Contact.tsx
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projectData';
import { ThemeContext } from '../context/ThemeContext';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaCheckCircle, FaPaperPlane, FaFileDownload } from 'react-icons/fa';

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
      // Simulazione invio del modulo
      console.log('Form Data:', {
        email,
        message,
        selectedProject
      });

      // Mostra messaggio di successo
      setIsSubmitted(true);
      
      // Resetta lo stato del modulo dopo l'invio
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

  // Animazioni
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
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 pt-24 pb-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CONTATTAMI</h1>
          <div className="accent-bar mx-auto"></div>
          <p className="section-subtitle max-w-2xl mx-auto">
            Hai un progetto in mente o vuoi saperne di più sul mio lavoro? Contattami!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <div className="glassmorphism p-8 h-full rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Informazioni di contatto</h2>
              
              <div className="space-y-8">
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-white">
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Posizione</h3>
                    <p className="text-secondary">Pioltello (MI), Italia</p>
                  </div>
                </motion.div>
                
                <div className="space-y-4 pt-6">
                  <h3 className="text-lg font-medium">Social</h3>
                  <div className="flex space-x-4">
                    <motion.a 
                      href="https://github.com/Nicco6598" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub size={22} className="text-accent" />
                    </motion.a>
                    <motion.a 
                      href="https://www.linkedin.com/in/marconiccolini-/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaLinkedin size={22} className="text-accent" />
                    </motion.a>
                  </div>
                </div>
                
                {/* Sezione Download CV */}
                <div className="space-y-4 pt-6">
                  <h3 className="text-lg font-medium">Curriculum</h3>
                  <div className="flex flex-col space-y-3">
                    <motion.a
                      href="/assets/cv/Marco_Niccolini_CV(IT).pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      download="Marco_Niccolini_CV_IT.pdf"
                      className="glassmorphism py-3 px-4 rounded-xl flex items-center justify-between group hover:bg-accent dark:hover:text-white hover:text-gray-900 transition-all"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <FaFileDownload className="mr-3 text-accent group-hover:text-white dark:group-hover:text-white group-hover:text-gray-900" />
                        <span>Curriculum Vitae (IT)</span>
                      </div>
                      <span className="text-xs bg-subtle px-2 py-1 rounded group-hover:bg-white group-hover:text-accent">IT</span>
                    </motion.a>
                    
                    <motion.a
                      href="/assets/cv/Marco_Niccolini_CV(ENG).pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      download="Marco_Niccolini_CV_ENG.pdf"
                      className="glassmorphism py-3 px-4 rounded-xl flex items-center justify-between group hover:bg-accent dark:hover:text-white hover:text-gray-900 transition-all"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <FaFileDownload className="mr-3 text-accent group-hover:text-white dark:group-hover:text-white group-hover:text-gray-900" />
                        <span>Resume (ENG)</span>
                      </div>
                      <span className="text-xs bg-subtle px-2 py-1 rounded group-hover:bg-white group-hover:text-accent">EN</span>
                    </motion.a>
                  </div>
                </div>
                
                {/* Aggiungiamo un elemento decorativo */}
                <div className="mt-12 relative">
                  <div className="bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10 blur-xl" 
                      style={{ backgroundColor: '#6366F1' }}
                    />
                    <p className="text-sm italic text-secondary mb-4">
                      "Sono sempre interessato a nuovi progetti e collaborazioni. Non esitare a contattarmi per discutere della tua idea."
                    </p>
                    <p className="text-accent font-medium">Marco Niccolini</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <div className="glassmorphism p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Inviami un messaggio</h2>
              
              {isSubmitted ? (
                <motion.div 
                  className="p-8 rounded-xl flex items-center"
                  style={{ 
                    background: "linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)" 
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-6">
                    <FaCheckCircle className="text-green-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Messaggio inviato!</h3>
                    <p className="text-secondary">Grazie per avermi contattato. Ti risponderò al più presto.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    variants={itemVariants}
                  >
                    <label className="block mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={`w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-subtle ${errors.email ? 'border border-red-500' : ''}`}
                      placeholder="Il tuo indirizzo email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </motion.div>
                  
                  <motion.div
                    variants={itemVariants}
                  >
                    <label className="block mb-2 font-medium">Messaggio</label>
                    <textarea
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className={`w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-subtle ${errors.message ? 'border border-red-500' : ''}`}
                      rows={5}
                      placeholder="Descrivi il tuo progetto o la tua richiesta"
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </motion.div>
                  
                  <motion.div
                    variants={itemVariants}
                  >
                    <label className="block mb-2 font-medium">Progetto Specifico (Opzionale)</label>
                    <select
                      value={selectedProject || ''}
                      onChange={e => setSelectedProject(e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-subtle"
                    >
                      <option value="">Seleziona un progetto</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.title}</option>
                      ))}
                    </select>
                    
                    {selectedProjectData && (
                      <motion.div 
                        className="mt-4 glassmorphism p-4 rounded-xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                            <div className="absolute inset-0 blur-md opacity-20"
                              style={{ backgroundColor: '#6366F1' }}
                            />
                            <img 
                              src={selectedProjectData.imageUrl} 
                              alt={selectedProjectData.title} 
                              className="w-20 h-20 object-contain relative z-10 rounded-lg mx-auto sm:mx-0" 
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium mb-1">{selectedProjectData.title}</h3>
                            <p className="text-sm text-secondary mb-2">{selectedProjectData.shortDescription}</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedProjectData.languages.slice(0, 3).map((lang, index) => (
                                <span 
                                  key={index} 
                                  className="text-xs py-1 px-2 bg-subtle rounded-md font-medium"
                                >
                                  {lang}
                                </span>
                              ))}
                              {selectedProjectData.languages.length > 3 && (
                                <span className="text-xs py-1 px-2 bg-subtle rounded-md font-medium">
                                  +{selectedProjectData.languages.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.button 
                    type="submit" 
                    className="btn btn-primary w-full py-3 flex items-center justify-center gap-2"
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Invia Messaggio</span>
                    <FaPaperPlane size={14} />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Google Maps */}
        <motion.div 
          className="mt-16"
          variants={itemVariants}
        >
          <div className="glassmorphism p-4 rounded-2xl overflow-hidden">
            <iframe 
              src="https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=en&amp;q=pioltello&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
              width="100%" 
              height="450" 
              frameBorder="0" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              aria-hidden={false} 
              tabIndex={0}
              className="rounded-lg"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;