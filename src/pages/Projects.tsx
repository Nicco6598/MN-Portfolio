import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projectData'; // Importa i dati dei progetti

const Projects: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12 mt-12 text-rich-black">PROGETTI</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-alice-blue rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 transition-shadow duration-300 flex flex-col items-center">
            <img src={project.imageUrl} alt={project.title} className="w-52 h-52 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold text-center text-rich-black mb-4">{project.title}</h2>
            <p className="text-gray-600 mb-6 text-center">{project.shortDescription}</p>
            <Link to={`/projects/${project.id}`} className="bg-dark-cyan text-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mt-auto">
              Vedi Progetto
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
