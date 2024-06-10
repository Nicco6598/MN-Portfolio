import React from 'react';
import { FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-murrey text-white mt-12 p-4 mx-auto max-w-full sm:max-w-4xl rounded-t-xl shadow-lg p-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center p-4">
        <div className="mb-4 sm:mb-0 text-center sm:text-left flex items-center">
          <FaMapMarkerAlt className="mr-2" size={24} />
          <p className="text-lg">Pioltello (MI), Italia</p>
        </div>
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <a 
            href="https://github.com/Nicco6598" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-dark-cyan transition"
          >
            <FaGithub size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/marco-niccolini98/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-dark-cyan transition"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-sm">© 2024 Marco Niccolini. All rights reserved.</p>
          <p className="text-sm">
            Built with <span className="text-dark-cyan">❤</span> and React.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
