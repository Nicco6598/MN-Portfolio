import React, { useState } from 'react';
import { projects } from '../data/projectData'; // Importa i dati dei progetti
import logo from '../assets/logo.png'; // Ensure the logo is in the assets folder
import '../styles/animations.css';

const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
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
      // Invio del modulo alla tua email
      const formData = {
        email: email,
        message: message,
        selectedProject: selectedProject
      };
      console.log('Form Data:', formData);

      // Resetta lo stato del modulo dopo l'invio
      setEmail('');
      setMessage('');
      setSelectedProject(null);
      setErrors({});
    }
  };

  const selectedProjectData = projects.find(project => project.id === selectedProject);

  return (
    <div className="relative">
      <a href="/" className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-20">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-36 h-36 object-cover transform transition duration-500 hover:scale-105 mb-12" 
        />
      </a>
      <div className="max-w-6xl mx-auto p-12 mt-60 bg-gradient-to-r from-blue-50 to-indigo-50 bg-opacity-80 backdrop-blur-lg rounded-xl shadow-[inset_0px_0px_30px_0px_#00000024] fade-in-up">
        <h1 className="text-5xl font-extrabold text-center mb-16 text-gray-800 tracking-tight">CONTATTI</h1>
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-dark-cyan`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Descrizione</label>
            <textarea
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-dark-cyan`}
              rows={5}
            />
            {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Progetto Specifico (Opzionale)</label>
            <select
              value={selectedProject || ''}
              onChange={e => setSelectedProject(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 border-gray-300 focus:border-dark-cyan"
            >
              <option value="">Seleziona un progetto</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>{project.title}</option>
              ))}
            </select>
            {selectedProjectData && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-red-100 rounded-2xl shadow-lg transform transition duration-500">
                <div className="flex flex-col items-center lg:flex-row lg:items-start">
                  <img src={selectedProjectData.imageUrl} alt={selectedProjectData.title} className="w-32 h-32 object-cover mt-4 rounded-xl mb-4 lg:mb-0 lg:mr-4" />
                  <div>
                    <h2 className="text-xl font-semibold text-center text-red-800 mb-2 lg:text-left">{selectedProjectData.title}</h2>
                    <p className="text-black text-center lg:text-left mb-2">{selectedProjectData.shortDescription}</p>
                    <p className="text-blue-600 text-center lg:text-left mb-2"><strong>Anno:</strong> {selectedProjectData.year}</p>
                    <p className="text-blue-600 text-center lg:text-left mb-2"><strong>Linguaggi:</strong> {selectedProjectData.languages.join(', ')}</p>
                    <p className="text-blue-600 text-center lg:text-left"><strong>Tipologia:</strong> {selectedProjectData.type}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="bg-dark-cyan text-white w-full py-3 rounded-xl shadow-md hover:bg-dark-cyan/80 transition transform hover:scale-105">
            Invia
          </button>
        </form>
        <div className="mt-12">
          <iframe 
            src="https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=en&amp;q=pioltello&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
            width="100%" 
            height="450" 
            frameBorder="0" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            aria-hidden="false" 
            tabIndex={0}
            className="rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
