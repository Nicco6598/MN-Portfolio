import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDownload = (url: string, filename: string) => {
    // Crea un'elemento anchor temporaneo
    const link = document.createElement('a');
    link.href = url;
    link.download = filename; // Imposta il nome del file per il download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className="bg-murrey text-white sticky top-4 mx-auto max-w-4xl rounded-2xl shadow-lg z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-lg">
          <Link to="/" className="px-4 hover:text-dark-cyan transition">Home</Link>
          <Link to="/projects" className="px-4 hover:text-dark-cyan transition">Progetti</Link>
          <Link to="/contact" className="px-4 hover:text-dark-cyan transition">Contatti</Link>
        </div>
        <div className="relative inline-block text-left">
          <button 
            className="bg-dark-cyan text-white px-4 py-2 mx-2 rounded-xl hover:bg-dark-cyan/80 transition"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Scarica CV
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleDownload("../assets/Marco_Niccolini_CV(IT).pdf", "Italiano CV.pdf")}>Italiano</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleDownload("../assets/Marco_Niccolini_CV(ENG).pdf", "English CV.pdf")}>Inglese</a>
              </div>
            </div>
          )}
          <a href="https://github.com/yourusername" className="bg-rich-black text-white px-4 py-2 rounded-xl hover:bg-rich-black/80 transition">GitHub</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
