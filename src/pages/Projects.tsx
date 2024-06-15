import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projectData'; // Importa i dati dei progetti
import logo from '../assets/logo.png'; // Ensure the logo is in the assets folder
import '../styles/animations.css';

const Projects: React.FC = () => {
  return (
    <div className="relative">
      <a href="/" className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-20">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-36 h-36 object-cover transform transition duration-500 hover:scale-105 mb-12" 
        />
      </a>
      <div className="max-w-6xl mx-auto p-12 mt-60 fade-in-up bg-gradient-to-r from-blue-50 to-indigo-50 bg-opacity-80 backdrop-blur-lg shadow-[inset_0px_0px_30px_0px_#00000024] rounded-xl">
        <h1 className="text-5xl font-extrabold text-center mb-16 text-gray-800 tracking-tight">PROGETTI</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link 
              to={`/projects/${project.id}`} 
              key={project.id} 
              className="group bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition transform hover:scale-105 duration-300 flex flex-col items-center p-6 no-underline"
            >
              <div className="w-52 h-52 mb-4 overflow-hidden rounded-xl">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300" 
                />
              </div>
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{project.title}</h2>
              <p className="text-gray-600 mb-6 text-center">{project.shortDescription}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
