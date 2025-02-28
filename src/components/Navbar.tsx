// src/components/Navbar.tsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { FaFileDownload, FaGithub, FaSun, FaMoon, FaTimes, FaBars } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <header className="fixed top-0 w-full z-50 transition-all duration-300 py-4">
      <nav className="glassmorphism mx-4 my-8 md:mx-auto max-w-7xl flex justify-between items-center px-6 py-3 sm:px-6 sm:mx-6 lg:mx-auto transition-all duration-300">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-accent animate-pulse opacity-25 rounded-full"></div>
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full relative z-10" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:block">Marco Niccolini</span>
          </Link>
        </div>

        {/* Navigation Links - CENTER aligned for desktop */}
        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link transition-colors ${location.pathname === '/' ? 'text-accent font-semibold' : 'hover:text-accent'}`}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={`nav-link transition-colors ${location.pathname === '/projects' || location.pathname.includes('/projects/') ? 'text-accent font-semibold' : 'hover:text-accent'}`}
            >
              Progetti
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link transition-colors ${location.pathname === '/contact' ? 'text-accent font-semibold' : 'hover:text-accent'}`}
            >
              Contatti
            </Link>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-subtle transition-colors"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <FaMoon className="text-primary" size={18} /> : <FaSun className="text-accent" size={18} />}
          </button>

          {/* Desktop Download Links */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://www.dropbox.com/scl/fi/8s8vlg5i47u9v99k78u4m/Marco_Niccolini-CV-IT-2.pdf?rlkey=aotn6uq6rab75ml8e6fhou4sl&st=ucr4z9lh&dl=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-sm py-2"
            >
              CV (IT)
            </a>
            <a
              href="https://www.dropbox.com/scl/fi/683lfqrtxnu59rk7a4lll/Marco_Niccolini-CV-EN-1.pdf?rlkey=4xupp70mjwurxpnmh2zmxe3jh&st=9gbpevxy&dl=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-sm py-2"
            >
              RESUME
            </a>
            <a
              href="https://github.com/Nicco6598"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-subtle hover:bg-opacity-20 transition-colors"
            >
              <FaGithub size={18} />
            </a>
          </div>

          {/* Mobile Menu Toggle Button - ONLY VISIBLE ON MOBILE */}
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-accent text-primary"
            aria-label="Open menu"
          >
            <FaBars size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay Background */}
          <div className={`absolute inset-0 backdrop-blur-md ${theme === 'light' ? 'bg-white bg-opacity-95' : 'bg-black bg-opacity-90'}`}></div>
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col overflow-y-auto">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
                <span className="text-xl font-bold text-primary">Marco Niccolini</span>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-subtle transition-colors"
                aria-label="Close menu"
              >
                <FaTimes size={22} className="text-primary" />
              </button>
            </div>
            
            {/* Main Navigation */}
            <div className="flex-grow px-6 py-8">
              <div className="grid grid-cols-1 gap-2">
                <Link
                  to="/"
                  className={`block p-4 rounded-xl text-center text-lg font-medium transition-colors ${
                    location.pathname === '/'
                      ? 'bg-accent text-primary'
                      : 'hover:bg-subtle'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className={`block p-4 rounded-xl text-center text-lg font-medium transition-colors ${
                    location.pathname === '/projects' || location.pathname.includes('/projects/')
                      ? 'bg-accent text-primary'
                      : 'hover:bg-subtle'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Progetti
                </Link>
                <Link
                  to="/contact"
                  className={`block p-4 rounded-xl text-center text-lg font-medium transition-colors ${
                    location.pathname === '/contact'
                      ? 'bg-accent text-primary'
                      : 'hover:bg-subtle'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contatti
                </Link>
              </div>
            </div>
            
            {/* Additional Links */}
            <div className="px-6 py-8 space-y-4">
              <h3 className="text-accent text-center font-medium mb-4">Download e Collegamenti</h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://www.dropbox.com/scl/fi/8s8vlg5i47u9v99k78u4m/Marco_Niccolini-CV-IT-2.pdf?rlkey=aotn6uq6rab75ml8e6fhou4sl&st=ucr4z9lh&dl=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl transition-colors bg-subtle hover:bg-opacity-20"
                >
                  <FaFileDownload />
                  <span>CV (IT)</span>
                </a>
                <a
                  href="https://www.dropbox.com/scl/fi/683lfqrtxnu59rk7a4lll/Marco_Niccolini-CV-EN-1.pdf?rlkey=4xupp70mjwurxpnmh2zmxe3jh&st=9gbpevxy&dl=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl transition-colors bg-subtle hover:bg-opacity-20"
                >
                  <FaFileDownload />
                  <span>RESUME</span>
                </a>
                <a
                  href="https://github.com/Nicco6598"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl transition-colors col-span-2 bg-subtle hover:bg-opacity-20"
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
                className="flex items-center justify-center gap-2 p-3 w-full rounded-xl transition-colors mt-6 bg-subtle hover:bg-opacity-20"
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