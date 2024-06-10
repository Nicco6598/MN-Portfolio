import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-murrey text-white sticky top-4 mx-auto max-w-full sm:max-w-4xl rounded-2xl shadow-lg z-50 overflow-hidden">
      <div className="container mx-auto p-4 flex flex-wrap justify-between items-center">
        <div className="text-lg flex flex-wrap">
          <Link to="/" className="px-2 sm:px-4 hover:text-dark-cyan transition">Home</Link>
          <Link to="/projects" className="px-2 sm:px-4 hover:text-dark-cyan transition">Progetti</Link>
          <Link to="/contact" className="px-2 sm:px-4 hover:text-dark-cyan transition">Contatti</Link>
        </div>
        <div className="relative inline-block text-left mt-2 sm:mt-0">
          <button 
            className="bg-dark-cyan text-white px-4 py-2 mx-2 rounded-xl hover:bg-dark-cyan/80 transition"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Scarica CV
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a href="https://www.dropbox.com/scl/fi/qq0zfpybd8fh1mf8869jm/Marco_Niccolini_CV-IT.pdf?rlkey=p6ke8o7aoafw1o58prs9p1oal&st=w7vok4o5&dl=0" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" target="_blank" rel="noopener noreferrer">Italiano</a>
                <a href="https://www.dropbox.com/scl/fi/aijt4s3d9q5qxuhb5guw7/Marco_Niccolini_CV-ENG.pdf?rlkey=0aobe9miqapzscftl2935xg1q&st=200e060b&dl=0" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" target="_blank" rel="noopener noreferrer">Inglese</a>
              </div>
            </div>
          )}
          <a href="https://github.com/Nicco6598" className="bg-rich-black text-white px-4 py-2 rounded-xl hover:bg-rich-black/80 transition mt-2 sm:mt-0">GitHub</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
