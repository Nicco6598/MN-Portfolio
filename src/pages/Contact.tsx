// src/pages/Contact.tsx
import React, { useState, useContext } from 'react';
import { projects } from '../data/projectData';
import { ThemeContext } from '../context/ThemeContext';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaCheckCircle } from 'react-icons/fa';

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

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CONTATTAMI</h1>
          <div className="h-1 w-20 bg-sunglow mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-battle-gray text-lg">
            Hai un progetto in mente o vuoi saperne di più sul mio lavoro? Contattami!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="glassmorphism p-8 h-full">
              <h2 className="text-2xl font-bold mb-6">Informazioni di contatto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-sunglow p-3 rounded-full text-raisin-black">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Posizione</h3>
                    <p className="text-battle-gray">Pioltello (MI), Italia</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-sunglow p-3 rounded-full text-raisin-black">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email</h3>
                    <a href="mailto:contact@marconiccolini.com" className="text-battle-gray hover:text-sunglow transition-colors">
                      contact@marconiccolini.com
                    </a>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6">
                  <h3 className="text-lg font-medium">Social</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/Nicco6598" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="glassmorphism-card bg-opacity-20 p-3 rounded-full hover:bg-sunglow hover:text-raisin-black transition-colors"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/marconiccolini-/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="glassmorphism-card bg-opacity-20 p-3 rounded-full hover:bg-sunglow hover:text-raisin-black transition-colors"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glassmorphism p-8">
              <h2 className="text-2xl font-bold mb-6">Inviami un messaggio</h2>
              
              {isSubmitted ? (
                <div className="bg-green-100 border border-green-200 text-green-800 p-6 rounded-xl flex items-center">
                  <FaCheckCircle className="text-green-500 mr-4" size={24} />
                  <div>
                    <h3 className="font-semibold text-lg">Messaggio inviato!</h3>
                    <p>Grazie per avermi contattato. Ti risponderò al più presto.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunglow bg-opacity-10 bg-battle-gray ${errors.email ? 'border-2 border-red-500' : ''}`}
                      placeholder="Il tuo indirizzo email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium">Messaggio</label>
                    <textarea
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunglow bg-opacity-10 bg-battle-gray ${errors.message ? 'border-2 border-red-500' : ''}`}
                      rows={5}
                      placeholder="Descrivi il tuo progetto o la tua richiesta"
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium">Progetto Specifico (Opzionale)</label>
                    <select
                      value={selectedProject || ''}
                      onChange={e => setSelectedProject(e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunglow bg-opacity-10 bg-battle-gray"
                    >
                      <option value="">Seleziona un progetto</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.title}</option>
                      ))}
                    </select>
                    
                    {selectedProjectData && (
                      <div className="mt-4 glassmorphism-card p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <img 
                            src={selectedProjectData.imageUrl} 
                            alt={selectedProjectData.title} 
                            className="w-20 h-20 object-cover rounded-lg sm:self-start mx-auto sm:mx-0" 
                          />
                          <div>
                            <h3 className="text-lg font-medium mb-1">{selectedProjectData.title}</h3>
                            <p className="text-sm text-battle-gray mb-2">{selectedProjectData.shortDescription}</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedProjectData.languages.map((lang, index) => (
                                <span 
                                  key={index} 
                                  className="text-xs bg-sunglow bg-opacity-20 px-2 py-1 rounded-full"
                                >
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-sunglow text-raisin-black w-full py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors transform hover:scale-[0.99]"
                  >
                    Invia Messaggio
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Google Maps */}
        <div className="mt-16">
          <div className="glassmorphism p-4">
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
        </div>
      </div>
    </div>
  );
};

export default Contact;