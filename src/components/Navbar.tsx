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
      <nav className="bg-murrey text-white sticky top-4 left-4 mx-auto max-w-fit sm:max-w-4xl rounded-xl shadow-lg z-50 overflow-hidden">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="text-lg hidden md:flex">
            <Link to="/" className="px-2 sm:px-4 hover:text-dark-cyan transition font-bold uppercase">Home</Link>
            <Link to="/projects" className="px-2 sm:px-4 hover:text-dark-cyan transition font-bold uppercase">Progetti</Link>
            <Link to="/contact" className="px-2 sm:px-4 hover:text-dark-cyan transition font-bold uppercase">Contatti</Link>
          </div>
          <div className="flex items-center">
            <a 
              href="https://www.dropbox.com/scl/fi/qq0zfpybd8fh1mf8869jm/Marco_Niccolini_CV-IT.pdf?rlkey=p6ke8o7aoafw1o58prs9p1oal&st=w7vok4o5&dl=0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-dark-cyan text-white px-4 py-2 mx-2 rounded-xl hover:bg-dark-cyan/80 transition hidden md:block"
            >
              CV Italiano
            </a>
            <a 
              href="https://www.dropbox.com/scl/fi/aijt4s3d9q5qxuhb5guw7/Marco_Niccolini_CV-ENG.pdf?rlkey=0aobe9miqapzscftl2935xg1q&st=200e060b&dl=0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-dark-cyan text-white px-4 py-2 mx-2 rounded-xl hover:bg-dark-cyan/80 transition hidden md:block"
            >
              CV Inglese
            </a>
            <a href="https://github.com/Nicco6598" className="bg-rich-black text-white px-4 py-2 rounded-xl hover:bg-rich-black/80 transition hidden md:block">GitHub</a>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none w-fit bg-murrey p-2 rounded-md">
              {isMenuOpen ? <FaTimes size={24} className="text-white" /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-white z-50 flex justify-center items-center p-4"
          onClick={closeMenu}
        >
          <div 
            className="w-full max-w-md mx-auto rounded-xl shadow-lg p-8 text-center" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8">
              <Link to="/" className="block text-2xl text-murrey hover:text-dark-cyan transition font-bold uppercase mb-4" onClick={closeMenu}>Home</Link>
              <Link to="/projects" className="block text-2xl text-murrey hover:text-dark-cyan transition font-bold uppercase mb-4" onClick={closeMenu}>Progetti</Link>
              <Link to="/contact" className="block text-2xl text-murrey hover:text-dark-cyan transition font-bold uppercase mb-4" onClick={closeMenu}>Contatti</Link>
            </div>
            <div className="mb-8">
              <a 
                href="https://www.dropbox.com/scl/fi/qq0zfpybd8fh1mf8869jm/Marco_Niccolini_CV-IT.pdf?rlkey=p6ke8o7aoafw1o58prs9p1oal&st=w7vok4o5&dl=0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block bg-dark-cyan text-white px-6 py-3 rounded-xl mb-4 hover:bg-dark-cyan/80 transition font-bold uppercase"
                onClick={closeMenu}
              >
                Scarica CV Italiano
              </a>
              <a 
                href="https://www.dropbox.com/scl/fi/aijt4s3d9q5qxuhb5guw7/Marco_Niccolini_CV-ENG.pdf?rlkey=0aobe9miqapzscftl2935xg1q&st=200e060b&dl=0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block bg-dark-cyan text-white px-6 py-3 rounded-xl hover:bg-dark-cyan/80 transition font-bold uppercase"
                onClick={closeMenu}
              >
                Scarica CV Inglese
              </a>
            </div>
            <a 
              href="https://github.com/Nicco6598" 
              className="block bg-rich-black text-white px-6 py-3 rounded-xl hover:bg-rich-black/80 transition font-bold uppercase"
              target="_blank" 
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
