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
    <div className="max-w-4xl mx-auto p-8 mt-12">
      <div className="flex flex-col lg:flex-row items-center lg:items-start mb-12">
        <div className="lg:w-1/2 lg:pl-8 flex justify-center lg:justify-start mb-8 lg:mb-0">
          <img src={project.imageUrl} alt={project.title} className="w-72 h-72 object-cover rounded-xl" />
        </div>
        <div className="lg:w-1/2 lg:pr-8">
          <h1 className="text-4xl font-bold mb-8 text-rich-black text-left">{project.title}</h1>
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-dark-cyan mb-4 text-left">Descrizione</h2>
            <p className="text-lg text-gray-600 text-left">{project.fullDescription}</p>
          </div>
        </div>
      </div>
      <div className="mb-12 flex justify-center">
            <div className="bg-alice-blue rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 text-left w-full lg:w-auto">
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
          <a href={project.vercelLink} className="bg-dark-cyan text-white px-6 py-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-dark-cyan/80 transition">
            Vercel Link
          </a>
        }
        {project.githubLink && 
          <a href={project.githubLink} className="bg-rich-black text-white px-6 py-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-rich-black/80 transition">
            GitHub Link
          </a>
        }
      </div>
    </div>
  );
};

export default ProjectDetail;
