// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../assets/profile.jpg';
import CustomCarousel from '../components/CustomCarousel';
import { FaArrowRight } from 'react-icons/fa';

const Home: React.FC = () => {
  const skills = [
    { skill: 'Solidity', level: '90%' },
    { skill: 'React', level: '85%' },
    { skill: 'TypeScript', level: '80%' },
    { skill: 'JavaScript', level: '75%' },
    { skill: 'Python', level: '70%' },
  ];

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Hero Section */}
      <section className="glassmorphism mb-20 p-8 md:p-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/3 flex justify-center">
            <div className="relative">
              {/* Image with outer glow */}
              <div className="absolute inset-0 bg-sunglow rounded-full blur-lg opacity-30 transform scale-110"></div>
              <img 
                src={profilePic} 
                alt="Marco Niccolini" 
                className="w-64 h-64 rounded-full object-cover border-4 border-sunglow relative z-10"
              />
            </div>
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-shadow">MARCO NICCOLINI</span>
            </h1>
            <div className="h-1 w-20 bg-sunglow mb-6 mx-auto md:mx-0"></div>
            <p className="text-lg md:text-xl mb-8 font-medium text-current">
              Sono Marco, uno sviluppatore informatico con una forte passione per
              la tecnologia blockchain. Ho conseguito un master in sviluppo
              blockchain presso l'Università Start2Impact, acquisendo una solida base
              nella progettazione e nello sviluppo di software. Sono proattivo,
              orientato ai risultati e dotato di capacità di problem-solving, pronto a
              portare innovazione nei progetti che affronteremo insieme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/projects" className="bg-sunglow text-raisin-black px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all transform hover:scale-105">
                Esplora Progetti
                <FaArrowRight />
              </Link>
              <Link to="/contact" className="border-2 border-battle-gray px-6 py-3 rounded-full font-semibold hover:bg-battle-gray hover:bg-opacity-10 transition-all flex items-center justify-center">
                Contattami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">LE MIE COMPETENZE</h2>
          <div className="h-1 w-20 bg-sunglow mx-auto"></div>
        </div>
        
        <div className="glassmorphism p-8 md:p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-sunglow opacity-10 blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-sunglow opacity-10 blur-2xl"></div>
          
          {/* Main skills - Top 3 with emphasis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Solidity */}
            <div className="glassmorphism-card p-6 transform transition-all duration-500 hover:translate-y-[-5px] flex flex-col items-center skill-card">
              <div className="w-16 h-16 rounded-full bg-sunglow bg-opacity-20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-sunglow">S</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Solidity</h3>
              <div className="flex items-center mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-sunglow" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-battle-gray">Avanzato</span>
              </div>
              <p className="text-center text-sm text-battle-gray">Sviluppo di smart contract e applicazioni decentralizzate con esperienza in progetti complessi.</p>
            </div>
            
            {/* React */}
            <div className="glassmorphism-card p-6 transform transition-all duration-500 hover:translate-y-[-5px] flex flex-col items-center skill-card" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 rounded-full bg-sunglow bg-opacity-20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-sunglow">R</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">React</h3>
              <div className="flex items-center mb-3">
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} className="w-5 h-5 text-sunglow" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-5 h-5 text-battle-gray text-opacity-30" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="ml-2 text-sm text-battle-gray">Intermedio-Avanzato</span>
              </div>
              <p className="text-center text-sm text-battle-gray">Creazione di interfacce utente moderne e reattive con hooks, context API e componenti riutilizzabili.</p>
            </div>
            
            {/* TypeScript */}
            <div className="glassmorphism-card p-6 transform transition-all duration-500 hover:translate-y-[-5px] flex flex-col items-center skill-card" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 rounded-full bg-sunglow bg-opacity-20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-sunglow">T</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">TypeScript</h3>
              <div className="flex items-center mb-3">
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} className="w-5 h-5 text-sunglow" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-5 h-5 text-battle-gray text-opacity-30" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="ml-2 text-sm text-battle-gray">Intermedio-Avanzato</span>
              </div>
              <p className="text-center text-sm text-battle-gray">Sviluppo di applicazioni web con tipizzazione statica per migliorare la manutenibilità e la qualità del codice.</p>
            </div>
          </div>
          
          {/* Additional skills in compact list */}
          <div className="glassmorphism-card p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Altre competenze</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-sunglow"></div>
                <span className="font-medium">JavaScript</span>
                <span className="text-sm text-battle-gray">(Avanzato)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-sunglow"></div>
                <span className="font-medium">Python</span>
                <span className="text-sm text-battle-gray">(Intermedio)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-sunglow"></div>
                <span className="font-medium">HTML/CSS</span>
                <span className="text-sm text-battle-gray">(Avanzato)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-sunglow"></div>
                <span className="font-medium">Node.js</span>
                <span className="text-sm text-battle-gray">(Intermedio)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-sunglow"></div>
                <span className="font-medium">Git</span>
                <span className="text-sm text-battle-gray">(Intermedio)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-sunglow"></div>
                <span className="font-medium">Web3.js/Ethers.js</span>
                <span className="text-sm text-battle-gray">(Avanzato)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-sunglow"></div>
                <span className="font-medium">Hardhat/Truffle</span>
                <span className="text-sm text-battle-gray">(Intermedio)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-sunglow"></div>
                <span className="font-medium">TailwindCSS</span>
                <span className="text-sm text-battle-gray">(Avanzato)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-sunglow"></div>
                <span className="font-medium">RESTful API</span>
                <span className="text-sm text-battle-gray">(Intermedio)</span>
              </div>
            </div>
          </div>
          
          {/* Framework Badges */}
          <div className="mt-10 text-center">
            <h3 className="text-lg font-medium mb-4">Framework & Strumenti</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 rounded-full bg-battle-gray bg-opacity-10 hover:bg-sunglow hover:text-raisin-black transition-colors duration-300">Next.js</span>
              <span className="px-4 py-2 rounded-full bg-battle-gray bg-opacity-10 hover:bg-sunglow hover:text-raisin-black transition-colors duration-300">Remix IDE</span>
              <span className="px-4 py-2 rounded-full bg-battle-gray bg-opacity-10 hover:bg-sunglow hover:text-raisin-black transition-colors duration-300">MetaMask</span>
              <span className="px-4 py-2 rounded-full bg-battle-gray bg-opacity-10 hover:bg-sunglow hover:text-raisin-black transition-colors duration-300">Ganache</span>
              <span className="px-4 py-2 rounded-full bg-battle-gray bg-opacity-10 hover:bg-sunglow hover:text-raisin-black transition-colors duration-300">OpenZeppelin</span>
              <span className="px-4 py-2 rounded-full bg-battle-gray bg-opacity-10 hover:bg-sunglow hover:text-raisin-black transition-colors duration-300">IPFS</span>
              <span className="px-4 py-2 rounded-full bg-battle-gray bg-opacity-10 hover:bg-sunglow hover:text-raisin-black transition-colors duration-300">VS Code</span>
              <span className="px-4 py-2 rounded-full bg-battle-gray bg-opacity-10 hover:bg-sunglow hover:text-raisin-black transition-colors duration-300">GitHub</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">PROGETTI IN EVIDENZA</h2>
          <div className="h-1 w-20 bg-sunglow mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-current text-lg font-medium">
            Una selezione dei miei progetti più recenti nel campo dello sviluppo blockchain e web.
          </p>
        </div>
        
        <div className="glassmorphism p-8 md:p-12">
          <CustomCarousel />
          
          <div className="mt-12 text-center">
            <Link to="/projects" className="inline-flex items-center gap-2 text-lg font-medium hover:text-sunglow transition-colors">
              Visualizza tutti i progetti
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CSS for animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .skill-card {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;