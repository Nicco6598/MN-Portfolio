// src/components/Navbar.tsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { FaHome, FaProjectDiagram, FaEnvelope, FaFileDownload, FaGithub, FaSun, FaMoon, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Close menu on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location]);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Main Navbar */}
      <nav className="glassmorphism mx-4 my-4 md:mx-auto max-w-7xl flex justify-between items-center px-4 py-3 sm:px-6 sm:mx-6 lg:mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold hidden sm:block">Marco Niccolini</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'text-sunglow font-semibold' : 'hover:text-sunglow transition-colors'}`}
          >
            Home
          </Link>
          <Link 
            to="/projects" 
            className={`nav-link ${location.pathname === '/projects' || location.pathname.includes('/projects/') ? 'text-sunglow font-semibold' : 'hover:text-sunglow transition-colors'}`}
          >
            Progetti
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'text-sunglow font-semibold' : 'hover:text-sunglow transition-colors'}`}
          >
            Contatti
          </Link>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>

          {/* Desktop Download Links */}
          <div className="hidden md:flex items-center space-x-2">
            <a
              href="https://www.dropbox.com/scl/fi/8s8vlg5i47u9v99k78u4m/Marco_Niccolini-CV-IT-2.pdf?rlkey=aotn6uq6rab75ml8e6fhou4sl&st=ucr4z9lh&dl=0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-sunglow text-raisin-black font-medium text-sm hover:bg-opacity-90 transition-colors"
            >
              CV (IT)
            </a>
            <a
              href="https://www.dropbox.com/scl/fi/683lfqrtxnu59rk7a4lll/Marco_Niccolini-CV-EN-1.pdf?rlkey=4xupp70mjwurxpnmh2zmxe3jh&st=9gbpevxy&dl=0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-white bg-opacity-10 text-sm hover:bg-opacity-20 transition-colors"
            >
              RESUME
            </a>
            <a
              href="https://github.com/Nicco6598"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
            >
              <FaGithub size={18} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="md:hidden flex items-center gap-2 px-3 py-1 rounded-full bg-sunglow text-raisin-black font-medium text-sm"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay Background */}
          <div className={`absolute inset-0 backdrop-blur-md ${theme === 'light' ? 'bg-white bg-opacity-95' : 'bg-black bg-opacity-90'}`}></div>
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
                <span className={`text-xl font-bold ${theme === 'light' ? 'text-raisin-black' : 'text-white'}`}>Marco Niccolini</span>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className={`p-2 rounded-full hover:bg-opacity-10 transition-colors ${theme === 'light' ? 'text-raisin-black hover:bg-black' : 'text-white hover:bg-white'}`}
                aria-label="Close menu"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            {/* Main Navigation */}
            <div className="flex-grow px-6 py-8">
              <div className="grid grid-cols-1 gap-2">
                <Link
                  to="/"
                  className={`block p-4 rounded-xl text-center text-lg font-medium transition-colors ${
                    location.pathname === '/'
                      ? 'bg-sunglow text-raisin-black'
                      : theme === 'light'
                        ? 'hover:bg-black hover:bg-opacity-10 text-raisin-black'
                        : 'hover:bg-white hover:bg-opacity-10 text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className={`block p-4 rounded-xl text-center text-lg font-medium transition-colors ${
                    location.pathname === '/projects' || location.pathname.includes('/projects/')
                      ? 'bg-sunglow text-raisin-black'
                      : theme === 'light'
                        ? 'hover:bg-black hover:bg-opacity-10 text-raisin-black'
                        : 'hover:bg-white hover:bg-opacity-10 text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Progetti
                </Link>
                <Link
                  to="/contact"
                  className={`block p-4 rounded-xl text-center text-lg font-medium transition-colors ${
                    location.pathname === '/contact'
                      ? 'bg-sunglow text-raisin-black'
                      : theme === 'light'
                        ? 'hover:bg-black hover:bg-opacity-10 text-raisin-black'
                        : 'hover:bg-white hover:bg-opacity-10 text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contatti
                </Link>
              </div>
            </div>
            
            {/* Additional Links */}
            <div className="px-6 py-8 space-y-4">
              <h3 className="text-sunglow text-center font-medium mb-4">Download e Collegamenti</h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://www.dropbox.com/scl/fi/8s8vlg5i47u9v99k78u4m/Marco_Niccolini-CV-IT-2.pdf?rlkey=aotn6uq6rab75ml8e6fhou4sl&st=ucr4z9lh&dl=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-colors ${
                    theme === 'light'
                      ? 'bg-black bg-opacity-10 hover:bg-opacity-20 text-raisin-black'
                      : 'bg-white bg-opacity-10 hover:bg-opacity-20 text-white'
                  }`}
                >
                  <FaFileDownload />
                  <span>CV (IT)</span>
                </a>
                <a
                  href="https://www.dropbox.com/scl/fi/683lfqrtxnu59rk7a4lll/Marco_Niccolini-CV-EN-1.pdf?rlkey=4xupp70mjwurxpnmh2zmxe3jh&st=9gbpevxy&dl=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-colors ${
                    theme === 'light'
                      ? 'bg-black bg-opacity-10 hover:bg-opacity-20 text-raisin-black'
                      : 'bg-white bg-opacity-10 hover:bg-opacity-20 text-white'
                  }`}
                >
                  <FaFileDownload />
                  <span>RESUME</span>
                </a>
                <a
                  href="https://github.com/Nicco6598"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-colors col-span-2 ${
                    theme === 'light'
                      ? 'bg-black bg-opacity-10 hover:bg-opacity-20 text-raisin-black'
                      : 'bg-white bg-opacity-10 hover:bg-opacity-20 text-white'
                  }`}
                >
                  <FaGithub size={20} />
                  <span>GitHub</span>
                </a>
              </div>
              
              {/* Theme Toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className={`flex items-center justify-center gap-2 p-3 w-full rounded-xl transition-colors mt-6 ${
                  theme === 'light'
                    ? 'bg-black bg-opacity-10 hover:bg-opacity-20 text-raisin-black'
                    : 'bg-white bg-opacity-10 hover:bg-opacity-20 text-white'
                }`}
              >
                {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
                <span>Cambia tema</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;