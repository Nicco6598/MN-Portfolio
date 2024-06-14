import React from 'react';
import profilePic from '../assets/profile.jpg';
import ProjectCarousel from '../components/ProjectCarousel';
import logo from '../assets/logo.png'; // Ensure the logo is in the assets folder
import '../styles/animations.css'; // Ensure you create an animations.css file for animations

const Home: React.FC = () => {
  return (
    <div className="relative">
      <a href="/" className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-20">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-36 h-36 object-cover transform transition duration-500 hover:scale-105 mb-12" 
        />
      </a>
      <div className="max-w-6xl mx-auto p-12 bg-gradient-to-r from-blue-50 to-indigo-50 bg-opacity-80 backdrop-blur-lg mt-60 rounded-xl shadow-[inset_0px_0px_30px_0px_#00000024]">
        <div className="flex flex-col lg:flex-row items-center mb-16 fade-in-up">
          <img 
            src={profilePic} 
            alt="Profile" 
            className="w-auto h-72 md:w-64 md:h-64 rounded-xl shadow-lg mb-6 lg:mb-0 lg:mr-12 transform transition duration-500 hover:scale-105" 
          />
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold italic text-gray-800 tracking-tight font-sans">MARCO NICCOLINI</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 font-modern">
              Sono Marco, uno sviluppatore informatico con una forte passione per
              la tecnologia blockchain. Ho conseguito un master in sviluppo
              blockchain presso l'Università Start2Impact, acquisendo una solida base
              nella progettazione e nello sviluppo di software. Sono proattivo,
              orientato ai risultati e dotato di capacità di problem-solving, pronto a
              portare innovazione nei progetti che affronteremo insieme.
            </p>
          </div>
        </div>
        <div className="mt-16 text-center fade-in-up">
          <h2 className="text-4xl mb-8 font-extrabold text-gray-800 tracking-tight">SKILLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { skill: 'Solidity', level: '90%' },
              { skill: 'React', level: '85%' },
              { skill: 'TypeScript', level: '80%' },
              { skill: 'JavaScript', level: '75%' },
              { skill: 'Python', level: '70%' },
            ].map((item) => (
              <div key={item.skill} className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6 transform transition duration-500 hover:scale-105">
                <h3 className="text-2xl font-semibold text-gray-800">{item.skill}</h3>
                <div className="w-full bg-gray-200 rounded-xl h-8 my-4 relative">
                  <div 
                    className="bg-dark-cyan h-8 rounded-xl flex items-center justify-center transition-all duration-500" 
                    style={{ width: item.level }}
                  >
                    <span className="text-white text-sm">{item.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 text-center fade-in-up">
          <h2 className="text-4xl mb-8 font-extrabold text-gray-800 tracking-tight">PROGETTI</h2>
          <ProjectCarousel />
        </div>
      </div>
    </div>
  );
};

export default Home;
