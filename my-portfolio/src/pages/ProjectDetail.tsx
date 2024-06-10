import React from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/projectData'; // Importa i dati dei progetti

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((project) => project.id === parseInt(id!));

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="relative w-full h-auto mb-12">
        <img src={project.imageUrl} alt={project.title} className="w-72 mx-auto h-72 object-cover rounded-xl" />
      </div>
      
      <h1 className="text-4xl font-bold text-center mb-8 text-rich-black">{project.title}</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-dark-cyan mb-4">DESCRIZIONE</h2>
        <p className="text-lg text-gray-600">{project.fullDescription}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold text-dark-cyan mb-4">DETTAGLI</h2>
          <ul className="text-lg text-gray-600 space-y-2">
            <li><strong>Anno:</strong> {project.year}</li>
            <li><strong>Mese:</strong> {project.month}</li>
            <li><strong>Linguaggi:</strong> {project.languages.join(', ')}</li>
            <li><strong>Tipologia:</strong> {project.type}</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        {project.vercelLink && 
          <a href={project.vercelLink} className="bg-dark-cyan text-white px-6 py-3 rounded-xl shadow-lg hover:bg-dark-cyan/80 transition">
            Vercel Link
          </a>
        }
        {project.githubLink && 
          <a href={project.githubLink} className="bg-rich-black text-white px-6 py-3 rounded-xl shadow-lg hover:bg-rich-black/80 transition">
            GitHub Link
          </a>
        }
      </div>
    </div>
  );
};

export default ProjectDetail;
