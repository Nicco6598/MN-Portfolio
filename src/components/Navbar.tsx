import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-50 to-blue-50 text-gray-800 p-4 rounded-xl shadow-[5px_5px_0px_0px_rgba(0,40,58)] z-50 backdrop-filter backdrop-blur-md">
        <div className="flex items-center justify-between">
          <Link to="/" className="hidden md:inline-block px-4 text-lg font-bold uppercase hover:text-dark-cyan transition">Home</Link>
          <Link to="/projects" className="hidden md:inline-block px-4 text-lg font-bold uppercase hover:text-dark-cyan transition">Progetti</Link>
          <Link to="/contact" className="hidden md:inline-block px-4 text-lg font-bold uppercase hover:text-dark-cyan transition mr-8">Contatti</Link>
          <a 
            href="https://www.dropbox.com/scl/fi/qq0zfpybd8fh1mf8869jm/Marco_Niccolini_CV-IT.pdf?rlkey=p6ke8o7aoafw1o58prs9p1oal&st=w7vok4o5&dl=0" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden mr-4 md:inline-block bg-flax text-white px-4 py-2 rounded-xl font-bold uppercase hover:bg-flax/80 transition"
          >
            CV Italiano
          </a>
          <a 
            href="https://www.dropbox.com/scl/fi/aijt4s3d9q5qxuhb5guw7/Marco_Niccolini_CV-ENG.pdf?rlkey=0aobe9miqapzscftl2935xg1q&st=200e060b&dl=0" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden mr-4 md:inline-block bg-flax text-white px-4 py-2 rounded-xl font-bold uppercase hover:bg-flax/80 transition"
          >
            CV Inglese
          </a>
          <a 
            href="https://github.com/Nicco6598" 
            className="hidden md:inline-block bg-rich-black text-white px-4 py-2 rounded-xl font-bold uppercase hover:bg-rich-black/80 transition"
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none w-auto p-2 mx-auto justify-center md:hidden flex">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <>
          <div className="fixed  inset-0 bg-blue-50 bg-opacity-80 backdrop-blur-md z-40" onClick={closeMenu}></div>
          <div 
            className="fixed inset-0 flex justify-center items-center z-50"
            onClick={closeMenu}
          >
            <div 
              className="bg-blue-100 text-gray-800 p-8 rounded-2xl shadow-lg space-y-4 w-11/12 max-w-md mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center space-y-4">
                <Link to="/" className="block text-2xl font-bold uppercase" onClick={closeMenu}>Home</Link>
                <Link to="/projects" className="block text-2xl font-bold uppercase" onClick={closeMenu}>Progetti</Link>
                <Link to="/contact" className="block text-2xl font-bold uppercase" onClick={closeMenu}>Contatti</Link>
                <a 
                  href="https://www.dropbox.com/scl/fi/qq0zfpybd8fh1mf8869jm/Marco_Niccolini_CV-IT.pdf?rlkey=p6ke8o7aoafw1o58prs9p1oal&st=w7vok4o5&dl=0" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block bg-dark-cyan text-white px-6 py-3 rounded-xl font-bold uppercase w-full text-center"
                  onClick={closeMenu}
                >
                  Scarica CV Italiano
                </a>
                <a 
                  href="https://www.dropbox.com/scl/fi/aijt4s3d9q5qxuhb5guw7/Marco_Niccolini_CV-ENG.pdf?rlkey=0aobe9miqapzscftl2935xg1q&st=200e060b&dl=0" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block bg-dark-cyan text-white px-6 py-3 rounded-xl font-bold uppercase w-full text-center"
                  onClick={closeMenu}
                >
                  Scarica CV Inglese
                </a>
                <a 
                  href="https://github.com/Nicco6598" 
                  className="block bg-rich-black text-white px-6 py-3 rounded-xl font-bold uppercase w-full text-center"
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
