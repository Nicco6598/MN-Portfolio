// src/pages/Home.tsx
import React, { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import profilePic from '../assets/profile.jpg';
import CustomCarousel from '../components/CustomCarousel';
import { 
  FaArrowRight, 
  FaEnvelope, 
  FaCode, 
  FaServer, 
  FaCubes, 
  FaTools,
  FaUsers
} from 'react-icons/fa';

const Home: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  // Animation effect when skills section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.skill-card');
            elements.forEach((el, index) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, index * 150);
            });
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 mt-20 pb-16">
      {/* Hero Section */}
      <section className="glassmorphism mb-20 p-8 md:p-12 max-w-5xl mx-auto overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-accent opacity-10 blur-xl"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-accent opacity-10 blur-xl"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/3 flex justify-center">
            <div className="relative">
              {/* Profile image with glowing border effect */}
              <div className="absolute inset-0 rounded-full bg-accent blur-md opacity-30 transform scale-110 animate-pulse"></div>
              <div className="relative p-1 rounded-full bg-gradient-to-br from-accent-primary to-accent-tertiary">
                <img 
                  src={profilePic} 
                  alt="Marco Niccolini" 
                  className="w-64 h-64 rounded-full object-cover relative z-10"
                />
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 text-center md:text-left">
            <div className="inline-block text-sm font-semibold px-4 py-1 rounded-full bg-subtle mb-4">
              Web & Blockchain Developer
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-gradient text-shadow-lg">MARCO NICCOLINI</span>
            </h1>
            
            <div className="h-1 w-20 bg-accent mb-6 mx-auto md:mx-0"></div>
            
            <p className="text-lg md:text-xl mb-8 text-secondary">
              Sono Marco, uno sviluppatore informatico con una forte passione per
              la tecnologia blockchain. Ho conseguito un master in sviluppo
              blockchain presso l'Università Start2Impact, acquisendo una solida base
              nella progettazione e nello sviluppo di software.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/projects" className="btn btn-primary shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1">
                <span>Esplora Progetti</span>
                <FaArrowRight />
              </Link>
              
              <Link to="/contact" className="btn btn-secondary transform transition-all duration-300 hover:-translate-y-1">
                <FaEnvelope />
                <span>Contattami</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Redesigned */}
      <section className="max-w-5xl mx-auto mb-16" ref={skillsRef}>
        <div className="text-center mb-10">
          <h2 className="section-title">LE MIE COMPETENZE</h2>
          <div className="accent-bar"></div>
          <p className="section-subtitle">
            Le tecnologie che utilizzo per creare soluzioni innovative
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blockchain Category */}
          <div className="glassmorphism p-6 skill-category relative overflow-hidden">
            {/* Blob di sfondo nella categoria */}
            <div className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full opacity-10 blur-xl z-0"
                 style={{ backgroundColor: "#e6aa00" }}/>
            
            {/* Intestazione categoria */}
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 rounded-full text-white"
                   style={{ backgroundColor: "#e6aa00" }}>
                <FaCubes />
              </div>
              <h3 className="text-xl font-bold">Blockchain</h3>
            </div>
            
            {/* Lista skills ordinate per percentuale */}
            <div className="space-y-6 relative z-10">
              {[
                { name: "Solidity", level: 90 },
                { name: "Smart Contracts", level: 88 },
                { name: "Web3.js/Ethers.js", level: 85 },
                { name: "Hardhat/Truffle", level: 75 }
              ].sort((a, b) => b.level - a.level).map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm font-bold px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: "#e6aa00" }}>
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-subtle rounded-full h-2.5 overflow-hidden">
                    <div className="h-full rounded-full skill-progress-bar"
                         style={{ 
                           width: `${skill.level}%`, 
                           backgroundColor: "#e6aa00"
                         }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Frontend Category */}
          <div className="glassmorphism p-6 skill-category relative overflow-hidden">
            {/* Blob di sfondo nella categoria */}
            <div className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full opacity-10 blur-xl z-0"
                 style={{ backgroundColor: "#3498db" }}/>
            
            {/* Intestazione categoria */}
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 rounded-full text-white"
                   style={{ backgroundColor: "#3498db" }}>
                <FaCode />
              </div>
              <h3 className="text-xl font-bold">Frontend</h3>
            </div>
            
            {/* Lista skills ordinate per percentuale */}
            <div className="space-y-6 relative z-10">
              {[
                { name: "HTML/CSS", level: 90 },
                { name: "React", level: 85 },
                { name: "TypeScript", level: 80 },
                { name: "JavaScript", level: 75 }
              ].sort((a, b) => b.level - a.level).map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm font-bold px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: "#3498db" }}>
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-subtle rounded-full h-2.5 overflow-hidden">
                    <div className="h-full rounded-full skill-progress-bar"
                         style={{ 
                           width: `${skill.level}%`, 
                           backgroundColor: "#3498db"
                         }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Backend Category */}
          <div className="glassmorphism p-6 skill-category relative overflow-hidden">
            {/* Blob di sfondo nella categoria */}
            <div className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full opacity-10 blur-xl z-0"
                 style={{ backgroundColor: "#2ecc71" }}/>
            
            {/* Intestazione categoria */}
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 rounded-full text-white"
                   style={{ backgroundColor: "#2ecc71" }}>
                <FaServer />
              </div>
              <h3 className="text-xl font-bold">Backend</h3>
            </div>
            
            {/* Lista skills ordinate per percentuale */}
            <div className="space-y-6 relative z-10">
              {[
                { name: "RESTful API", level: 80 },
                { name: "Python", level: 70 },
                { name: "Node.js", level: 65 }
              ].sort((a, b) => b.level - a.level).map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm font-bold px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: "#2ecc71" }}>
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-subtle rounded-full h-2.5 overflow-hidden">
                    <div className="h-full rounded-full skill-progress-bar"
                         style={{ 
                           width: `${skill.level}%`, 
                           backgroundColor: "#2ecc71"
                         }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Soft Skills Category */}
          <div className="glassmorphism p-6 skill-category relative overflow-hidden">
            {/* Blob di sfondo nella categoria */}
            <div className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full opacity-10 blur-xl z-0"
                 style={{ backgroundColor: "#e74c3c" }}/>
            
            {/* Intestazione categoria */}
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 rounded-full text-white"
                   style={{ backgroundColor: "#e74c3c" }}>
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold">Soft Skills</h3>
            </div>
            
            {/* Lista skills ordinate per percentuale */}
            <div className="space-y-6 relative z-10">
              {[
                { name: "Problem Solving", level: 95 },
                { name: "Teamwork", level: 90 },
                { name: "Comunicazione", level: 85 },
                { name: "Adattabilità", level: 85 }
              ].sort((a, b) => b.level - a.level).map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm font-bold px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: "#e74c3c" }}>
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-subtle rounded-full h-2.5 overflow-hidden">
                    <div className="h-full rounded-full skill-progress-bar"
                         style={{ 
                           width: `${skill.level}%`, 
                           backgroundColor: "#e74c3c"
                         }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tools Category */}
          <div className="glassmorphism p-6 skill-category relative overflow-hidden col-span-1 md:col-span-2">
            {/* Blob di sfondo nella categoria */}
            <div className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full opacity-10 blur-xl z-0"
                 style={{ backgroundColor: "#9b59b6" }}/>
            
            {/* Intestazione categoria */}
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 rounded-full text-white"
                   style={{ backgroundColor: "#9b59b6" }}>
                <FaTools />
              </div>
              <h3 className="text-xl font-bold">Tools</h3>
            </div>
            
            {/* Lista skills ordinate per percentuale */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {[
                { name: "VS Code", level: 95 },
                { name: "TailwindCSS", level: 90 },
                { name: "Git", level: 75 },
                { name: "Docker", level: 70 }
              ].sort((a, b) => b.level - a.level).map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm font-bold px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: "#9b59b6" }}>
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-subtle rounded-full h-2.5 overflow-hidden">
                    <div className="h-full rounded-full skill-progress-bar"
                         style={{ 
                           width: `${skill.level}%`, 
                           backgroundColor: "#9b59b6"
                         }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Frameworks & Tools Cloud - Reduced top margin */}
        <div className="glassmorphism p-6 text-center skill-frameworks">
          <h3 className="text-xl font-bold mb-4">Frameworks & Strumenti</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Next.js", color: "#3498db" },         // Blu
              { name: "Remix IDE", color: "#9b59b6" },       // Viola
              { name: "MetaMask", color: "#e6aa00" },        // Sunglow
              { name: "Ganache", color: "#e74c3c" },         // Rosso
              { name: "OpenZeppelin", color: "#1abc9c" },    // Verde acqua
              { name: "IPFS", color: "#2ecc71" },            // Verde
              { name: "VS Code", color: "#34495e" },         // Blu scuro
              { name: "GitHub", color: "#7f8c8d" },          // Grigio
              { name: "Docker", color: "#3498db" }           // Blu
            ].map((tool, index) => (
              <span key={tool.name} 
                    className="px-4 py-2 rounded-full text-white transition-transform hover:scale-110 framework-tag font-medium"
                    style={{ backgroundColor: tool.color }}>
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">PROGETTI IN EVIDENZA</h2>
          <div className="accent-bar"></div>
          <p className="section-subtitle">
            Una selezione dei miei progetti più recenti nel campo dello sviluppo blockchain e web.
          </p>
        </div>
        
        <div className="glassmorphism p-8 md:p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent opacity-5 rotate-45 transform translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent opacity-5 rotate-45 transform -translate-x-20 translate-y-20"></div>
          
          <CustomCarousel />
          
          <div className="mt-12 text-center">
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 text-lg font-medium px-6 py-2 rounded-full bg-subtle hover:bg-accent hover:text-primary transition-all"
            >
              <span>Visualizza tutti i progetti</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Le animazioni sono definite nel CSS globale */}
    </div>
  );
};

export default Home;