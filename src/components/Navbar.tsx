import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaProjectDiagram, FaEnvelope, FaFileDownload, FaGithub } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    closeMenu();
  }, [location]);

  return (
    <>
      <nav className="fixed top-1/2 right-16 transform -translate-y-1/2 flex-col items-center bg-gradient-to-r from-red-200/50 to-blue-200/50 text-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 z-50 backdrop-filter backdrop-blur-md transition-transform duration-300 hidden md:flex">
        <div className="flex flex-col items-center space-y-4 w-24">
          <Link to="/" className="flex flex-col items-center text-lg font-bold uppercase hover:text-dark-cyan transition">
            <FaHome size={24} />
            <span className="text-sm mt-1">Home</span>
          </Link>
          <Link to="/projects" className="flex flex-col items-center text-lg font-bold uppercase hover:text-dark-cyan transition">
            <FaProjectDiagram size={24} />
            <span className="text-sm mt-1">Progetti</span>
          </Link>
          <Link to="/contact" className="flex flex-col items-center text-lg font-bold uppercase hover:text-dark-cyan transition">
            <FaEnvelope size={24} />
            <span className="text-sm mt-1">Contatti</span>
          </Link>
          <a
            href="https://www.dropbox.com/scl/fi/j6fmtjtc4pz5tg0ym2ft5/Marco_Niccolini-CV-IT.pdf?rlkey=usg26nik24hays92zwodzum9v&st=qgjrzhgx&dl=0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-flax text-white px-4 py-2 rounded-xl font-bold uppercase hover:bg-flax/80 transition w-full"
          >
            <FaFileDownload size={24} />
            <span className="text-sm mt-1">CV (IT)</span>
          </a>
          <a
            href="https://www.dropbox.com/scl/fi/fl5mqi4fxaqrk76b9m4rq/Marco_Niccolini_CV-ENG.pdf?rlkey=4irakujhbx7x7lhk98cel3raz&st=g363iikd&dl=0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-flax text-white px-4 py-2 rounded-xl font-bold uppercase hover:bg-flax/80 transition w-full"
          >
            <FaFileDownload size={24} />
            <span className="text-sm mt-1">CV (EN)</span>
          </a>
          <a
            href="https://github.com/Nicco6598"
            className="flex flex-col items-center bg-rich-black text-white px-4 py-2 rounded-xl font-bold uppercase hover:bg-rich-black/80 transition w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} />
            <span className="text-sm mt-1">GitHub</span>
          </a>
        </div>
      </nav>
      <div className="fixed top-4 right-4 md:hidden z-50">
        <button onClick={toggleMenu} className="text-gray-800 bg-gradient-to-r from-red-100 to-blue-100 rounded-xl border border-gray-200 p-4 focus:outline-none w-auto p-2 mx-auto justify-center flex">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-blue-50 bg-opacity-80 backdrop-blur-md z-40" onClick={closeMenu}></div>
          <div className="fixed inset-0 flex justify-center items-center z-50" onClick={closeMenu}>
            <div className="bg-gradient-to-r from-red-200/50 to-blue-200/50 border border-gray-200 text-gray-800 p-8 rounded-2xl shadow-lg space-y-4 w-11/12 max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col items-center space-y-4">
                <Link to="/" className="flex flex-col items-center text-lg font-bold uppercase hover:text-dark-cyan transition">
                  <FaHome size={24} />
                  <span className="text-sm mt-1">Home</span>
                </Link>
                <Link to="/projects" className="flex flex-col items-center text-lg font-bold uppercase hover:text-dark-cyan transition">
                  <FaProjectDiagram size={24} />
                  <span className="text-sm mt-1">Progetti</span>
                </Link>
                <Link to="/contact" className="flex flex-col items-center text-lg font-bold uppercase hover:text-dark-cyan transition">
                  <FaEnvelope size={24} />
                  <span className="text-sm mt-1">Contatti</span>
                </Link>
                <a
                  href="https://www.dropbox.com/scl/fi/qq0zfpybd8fh1mf8869jm/Marco_Niccolini_CV-IT.pdf?rlkey=p6ke8o7aoafw1o58prs9p1oal&st=w7vok4o5&dl=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center bg-flax text-white px-4 py-2 rounded-xl font-bold uppercase hover:bg-flax/80 transition w-full"
                >
                  <FaFileDownload size={24} />
                  <span className="text-sm mt-1">CV (IT)</span>
                </a>
                <a
                  href="https://www.dropbox.com/scl/fi/aijt4s3d9q5qxuhb5guw7/Marco_Niccolini_CV-ENG.pdf?rlkey=0aobe9miqapzscftl2935xg1q&st=200e060b&dl=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center bg-flax text-white px-4 py-2 rounded-xl font-bold uppercase hover:bg-flax/80 transition w-full"
                >
                  <FaFileDownload size={24} />
                  <span className="text-sm mt-1">CV (EN)</span>
                </a>
                <a
                  href="https://github.com/Nicco6598"
                  className="flex flex-col items-center bg-rich-black text-white px-4 py-2 rounded-xl font-bold uppercase hover:bg-rich-black/80 transition w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={24} />
                  <span className="text-sm mt-1">GitHub</span>
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
