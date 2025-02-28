// src/components/Footer.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaMapMarkerAlt, FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const Footer: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <footer className="glassmorphism mt-20 mx-auto max-w-6xl rounded-t-xl p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
              <span className="text-xl font-bold">Marco Niccolini</span>
            </Link>
            <p className="text-battle-gray">
              Sviluppatore Web e Blockchain specializzato in soluzioni moderne e innovative.
            </p>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-sunglow" />
              <span>Pioltello (MI), Italia</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Utili</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-sunglow transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-sunglow transition-colors">Progetti</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sunglow transition-colors">Contatti</Link>
              </li>
              <li>
                <a 
                  href="https://github.com/Nicco6598" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-sunglow transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/marco-niccolini98/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sunglow transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          
          {/* CV and Other */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Download CV</h3>
            <div className="space-y-2">
              <a
                href="https://www.dropbox.com/scl/fi/j6fmtjtc4pz5tg0ym2ft5/Marco_Niccolini-CV-IT.pdf?rlkey=usg26nik24hays92zwodzum9v&st=qgjrzhgx&dl=0"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-sunglow transition-colors"
              >
                CV in Italiano
              </a>
              <a
                href="https://www.dropbox.com/scl/fi/fl5mqi4fxaqrk76b9m4rq/Marco_Niccolini_CV-ENG.pdf?rlkey=4irakujhbx7x7lhk98cel3raz&st=g363iikd&dl=0"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-sunglow transition-colors"
              >
                CV in Inglese
              </a>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Tema</h3>
              <button 
                onClick={toggleTheme}
                className="flex items-center space-x-2 hover:text-sunglow transition-colors"
              >
                {theme === 'dark' ? (
                  <>
                    <FaSun />
                    <span>Cambia a tema chiaro</span>
                  </>
                ) : (
                  <>
                    <FaMoon />
                    <span>Cambia a tema scuro</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-battle-gray border-opacity-20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Marco Niccolini. All rights reserved.</p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a 
              href="https://github.com/Nicco6598" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-sunglow transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/marco-niccolini98/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-sunglow transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;