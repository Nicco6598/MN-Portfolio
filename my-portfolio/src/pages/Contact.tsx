import React, { useState } from 'react';
import { projects } from '../data/projectData'; // Importa i dati dei progetti

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

  return (
    <div className="container mx-auto p-8 max-w-4xl"> {/* Aggiunta della classe max-w-4xl */}
      <h1 className="text-4xl font-bold text-center mb-12 mt-12 text-rich-black">CONTATTI</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] space-y-6">
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
          {selectedProject && (
            <div className="mt-4">
              <img src={projects.find(project => project.id === selectedProject)?.imageUrl} alt="Selected Project" className="w-20 mx-auto h-20 object-cover rounded-xl" />
            </div>
          )}
        </div>
        <button type="submit" className="bg-dark-cyan text-white w-full py-3 rounded-xl shadow hover:bg-dark-cyan/80 transition">
          Invia
        </button>
      </form>
    </div>
  );
};

export default Contact;
