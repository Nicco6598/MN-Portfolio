import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projectData'; // Importa i dati dei progetti
import logo from '../assets/logo.png'; // Ensure the logo is in the assets folder
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((proj) => proj.id === parseInt(id!));
  const navigate = useNavigate();
  
  if (!project) {
    return <div>Project not found</div>;
  }

  const currentIndex = projects.findIndex((proj) => proj.id === project.id);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/projects/${event.target.value}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="absolute top-0 w-full flex justify-center mt-12">
        <a href="/" className="z-20">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-36 h-36 object-cover transform transition duration-500 hover:scale-105" 
          />
        </a>
      </div>
      <div className="max-w-6xl mx-auto p-12 bg-gradient-to-r from-blue-50 to-indigo-50 bg-opacity-80 backdrop-blur-lg rounded-xl shadow-[inset_0px_0px_30px_0px_#00000024] mt-60">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex justify-center">
            <img src={project.imageUrl} alt={project.title} className="w-96 h-96 object-cover lg:max-w-lg rounded-xl transform transition duration-500 hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-6">{project.title}</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">{project.fullDescription}</p>
            <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <ul className="space-y-4 text-lg">
                <li>
                  <strong className="text-dark-cyan">Anno:</strong> {project.year}
                </li>
                <li>
                  <strong className="text-dark-cyan">Mese:</strong> {project.month}
                </li>
                <li>
                  <strong className="text-dark-cyan">Linguaggi:</strong> {project.languages.join(', ')}
                </li>
                <li>
                  <strong className="text-dark-cyan">Tipologia:</strong> {project.type}
                </li>
              </ul>
            </div>
            <div className="mt-8 flex flex-col items-center lg:flex-row lg:justify-center space-y-4 lg:space-y-0 lg:space-x-4">
              {project.vercelLink && (
                <a
                  href={project.vercelLink}
                  className="inline-block bg-flax text-white px-6 py-3 rounded-lg text-center w-fit shadow-md hover:bg-flax/80 transition duration-300 transform hover:scale-105 flex items-center"
                >
                  <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                  Vercel Link
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  className="inline-block bg-rich-black text-white px-6 py-3 text-center w-fit rounded-lg shadow-md hover:bg-rich-black/80 transition duration-300 transform hover:scale-105 flex items-center"
                >
                  <FontAwesomeIcon icon={faGithub} className="mr-2" />
                  GitHub Link
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col max-w-4xl lg:flex-row lg:justify-center items-center space-y-4 lg:space-y-0 lg:space-x-4 rounded-lg p-4 bg-opacity-90">
        {prevProject && (
          <Link
            to={`/projects/${prevProject.id}`}
            className="inline-block bg-green-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-green-300 transition duration-300 transform hover:scale-105"
          >
            ← Progetto Precedente
          </Link>
        )}
        <select
          value={project.id}
          onChange={handleProjectChange}
          className="bg-white border border-flax rounded-lg shadow-md px-4 py-2 transition duration-300 transform hover:scale-95"
        >
          {projects.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.title}
            </option>
          ))}
        </select>
        {nextProject && (
          <Link
            to={`/projects/${nextProject.id}`}
            className="inline-block bg-blue-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-blue-300 transition duration-300 transform hover:scale-105"
          >
            Prossimo Progetto →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
