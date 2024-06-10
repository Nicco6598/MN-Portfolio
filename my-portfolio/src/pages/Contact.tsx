import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gestisci l'invio del modulo
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl mb-6">Contatti</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Descrizione</label>
          <textarea
            required
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>
        <button type="submit" className="bg-secondary text-white px-4 py-2 rounded-xl hover:bg-secondary/80 transition">Invia</button>
      </form>
    </div>
  );
};

export default Contact;
