import React from 'react';
import profilePic from '../assets/profile.jpg';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white mt-8">
      <div className="flex items-center mb-8">
        <img src={profilePic} alt="Profile" className="w-48 h-48 rounded-xl shadow-lg mr-8" />
        <div>
          <h1 className="text-4xl text-rich-black">Your Name</h1>
          <p className="mt-4 text-lg text-gray-600 font-modern">Sono uno sviluppatore blockchain con una forte passione per le tecnologie innovative. Amo risolvere problemi complessi e creare soluzioni sicure ed efficienti.</p>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-2xl mb-6 font-bold rounded-2xl text-rich-black">SKILLS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-alice-blue rounded-xl shadow-lg p-4">
            <h3 className="text-xl font-semibold text-rich-black">JavaScript</h3>
            <div className="w-full bg-gray-200 rounded-full h-8 my-4 relative">
              <div className="bg-dark-cyan h-8 rounded-full flex items-center justify-center" style={{ width: '80%' }}>
                <span className="text-white text-sm">75%</span>
              </div>
            </div>
          </div>
          <div className="bg-alice-blue rounded-xl shadow-lg p-4">
            <h3 className="text-xl font-semibold text-rich-black">TypeScript</h3>
            <div className="w-full bg-gray-200 rounded-full h-8 my-4 relative">
              <div className="bg-dark-cyan h-8 rounded-full flex items-center justify-center" style={{ width: '70%' }}>
                <span className="text-white text-sm">80%</span>
              </div>
            </div>
          </div>
          <div className="bg-alice-blue rounded-xl shadow-lg p-4">
            <h3 className="text-xl font-semibold text-rich-black">React</h3>
            <div className="w-full bg-gray-200 rounded-full h-8 my-4 relative">
              <div className="bg-dark-cyan h-8 rounded-full flex items-center justify-center" style={{ width: '85%' }}>
                <span className="text-white text-sm">85%</span>
              </div>
            </div>
          </div>
          <div className="bg-alice-blue rounded-xl shadow-lg p-4">
            <h3 className="text-xl font-semibold text-rich-black">Solidity</h3>
            <div className="w-full bg-gray-200 rounded-full h-8 my-4 relative">
              <div className="bg-dark-cyan h-8 rounded-full flex items-center justify-center" style={{ width: '85%' }}>
                <span className="text-white text-sm">90%</span>
              </div>
            </div>
          </div>
          {/* Ripeti per altre competenze */}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl mb-6 text-rich-black">Progetti</h2>
        <div className="carousel">
          {/* Aggiungi il carosello qui */}
        </div>
      </div>
    </div>
  );
};

export default Home;
