import React from 'react';
import profilePic from '../assets/profile.jpg';
import ProjectCarousel from '../components/ProjectCarousel';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white mt-12">
      <div className="flex flex-col lg:flex-row items-center mb-8">
        <img src={profilePic} alt="Profile" className="w-auto h-72 md:w-64 md:h-64 rounded-xl shadow-lg mb-6 lg:mb-0 lg:mr-12" />
        <div className="text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-bold italic text-rich-black">MARCO NICCOLINI</h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 font-modern">Sono Marco, uno sviluppatore informatico con una forte passione per
          la tecnologia blockchain. Ho conseguito un master in sviluppo
          blockchain presso l'Università Start2Impact, acquisendo una solida base
          nella progettazione e nello sviluppo di software. Sono proattivo,
          orientato ai risultati e dotato di capacità di problem-solving, pronto a
          portare innovazione nei progetti che affronteremo insieme.
          </p>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-2xl mb-6 font-bold rounded-2xl text-rich-black">SKILLS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-alice-blue rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4">
            <h3 className="text-xl font-semibold text-rich-black">Solidity</h3>
            <div className="w-full bg-gray-200 rounded-xl h-8 my-4 relative">
              <div className="bg-dark-cyan h-8 rounded-xl flex items-center justify-center" style={{ width: '90%' }}>
                <span className="text-white text-sm">90%</span>
              </div>
            </div>
          </div>
          <div className="bg-alice-blue rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4">
            <h3 className="text-xl font-semibold text-rich-black">React</h3>
            <div className="w-full bg-gray-200 rounded-xl h-8 my-4 relative">
              <div className="bg-dark-cyan h-8 rounded-xl flex items-center justify-center" style={{ width: '85%' }}>
                <span className="text-white text-sm">85%</span>
              </div>
            </div>
          </div>
          <div className="bg-alice-blue rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4">
            <h3 className="text-xl font-semibold text-rich-black">TypeScript</h3>
            <div className="w-full bg-gray-200 rounded-xl h-8 my-4 relative">
              <div className="bg-dark-cyan h-8 rounded-xl flex items-center justify-center" style={{ width: '80%' }}>
                <span className="text-white text-sm">80%</span>
              </div>
            </div>
          </div>
          <div className="bg-alice-blue rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4">
            <h3 className="text-xl font-semibold text-rich-black">JavaScript</h3>
            <div className="w-full bg-gray-200 rounded-xl h-8 my-4 relative">
              <div className="bg-dark-cyan h-8 rounded-xl flex items-center justify-center" style={{ width: '75%' }}>
                <span className="text-white text-sm">75%</span>
              </div>
            </div>
          </div>
          <div className="bg-alice-blue rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4">
            <h3 className="text-xl font-semibold text-rich-black">Python</h3>
            <div className="w-full bg-gray-200 rounded-xl h-8 my-4 relative">
              <div className="bg-dark-cyan h-8 rounded-xl flex items-center justify-center" style={{ width: '70%' }}>
                <span className="text-white text-sm">70%</span>
              </div>
            </div>
          </div>
          {/* Ripeti per altre competenze */}
        </div>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-2xl mb-6 font-bold rounded-2xl text-rich-black">PROGETTI</h2>
        <ProjectCarousel />
      </div>
    </div>
  );
};

export default Home;
