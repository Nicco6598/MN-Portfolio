// src/pages/ProjectDetail.tsx
import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projectData';
import { ThemeContext } from '../context/ThemeContext';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaGithub, FaCalendar, FaCode, FaTag, FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
console.log('Raw ID from params:', id);

// Converte l'ID in modo più sicuro
const projectId = id ? parseInt(id, 10) : undefined;
console.log('Parsed Project ID:', projectId);

const project = projects.find((proj) => proj.id === projectId);
console.log('Found Project:', project);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  
  if (!project) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="glassmorphism p-10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl mb-4">Progetto non trovato</h2>
          <p className="mb-6">Il progetto che stai cercando potrebbe essere stato rimosso o non esiste.</p>
          <Link to="/projects" className="bg-sunglow text-raisin-black px-6 py-3 rounded-full font-semibold inline-block">
            Torna ai progetti
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((proj) => proj.id === project.id);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center text-sm text-battle-gray">
          <Link to="/" className="hover:text-sunglow transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/projects" className="hover:text-sunglow transition-colors">Progetti</Link>
          <span className="mx-2">/</span>
          <span className="text-sunglow">{project.title}</span>
        </div>
      </div>
      
      {/* Project Header */}
      <div className="glassmorphism p-8 md:p-10 max-w-6xl mx-auto mb-8 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">{project.title}</h1>
          
          <div className="flex gap-3 items-center flex-wrap">
            <span className="px-3 py-1 rounded-full bg-sunglow text-raisin-black font-medium">
              {project.type}
            </span>
            <span className="flex items-center gap-1 text-battle-gray whitespace-nowrap">
              <FaCalendar className="text-sunglow" size={14} />
              {project.month} {project.year}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Project Image Column */}
          <div className="lg:col-span-2">
            <div className="relative group">
              {/* Background glow */}
              <div 
                className="absolute inset-0 rounded-2xl blur-2xl opacity-40"
                style={{ backgroundColor: theme === 'dark' ? '#ffd13e' : '#ffd13e' }}
              ></div>
              
              {/* Project image */}
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="relative z-10 w-full aspect-square object-contain bg-battle-gray bg-opacity-10 rounded-2xl shadow-xl border-2 border-sunglow p-4" 
              />
              
              {/* Project links */}
              <div className="flex justify-center gap-4 mt-6">
                {project.vercelLink !== '#' && (
                  <a
                    href={project.vercelLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-sunglow text-raisin-black px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
                  >
                    <span>Demo Live</span>
                    <FaExternalLinkAlt size={14} />
                  </a>
                )}
                
                {project.githubLink !== '#' && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-raisin-black text-white px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
                  >
                    <FaGithub size={18} />
                    <span>Codice</span>
                  </a>
                )}
              </div>
            </div>
            
            {/* Project Technologies */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaCode className="text-sunglow" />
                Tecnologie utilizzate
              </h3>
              <div className="glassmorphism-card p-5 rounded-xl">
                <div className="flex flex-wrap gap-2">
                  {project.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-sunglow text-raisin-black font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Project Info Column */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Project Description */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaTag className="text-sunglow" />
                  Descrizione del progetto
                </h2>
                <div className="glassmorphism-card p-6 rounded-xl">
                  <div className="prose prose-lg max-w-none text-current font-medium">
                    <p className="whitespace-pre-line">
                      {project.fullDescription}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Project Metadata */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Dettagli</h2>
                <div className="glassmorphism-card p-6 rounded-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-battle-gray mb-1">Anno</h3>
                      <p>{project.year}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-battle-gray mb-1">Periodo</h3>
                      <p>{project.month}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-battle-gray mb-1">Categoria</h3>
                      <p>{project.type}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-battle-gray mb-1">Ruolo</h3>
                      <p>Sviluppatore</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Navigation */}
      <div className="max-w-6xl mx-auto">
        <div className="glassmorphism p-4 lg:p-6 rounded-xl flex items-center justify-between space-x-4">
          {/* Colonna Precedente */}
          <div className="w-1/3 flex justify-start">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-battle-gray bg-opacity-10 flex items-center justify-center group-hover:bg-sunglow group-hover:text-raisin-black transition-colors">
                  <FaChevronLeft />
                </div>
                <div className="hidden sm:block truncate max-w-[150px]">
                  <div className="text-sm text-current opacity-70">Precedente</div>
                  <div className="text-xs truncate">{prevProject.title}</div>
                </div>
              </Link>
            ) : (
              <div className="w-10"></div>
            )}
          </div>
          
          {/* Dropdown centrale */}
          <div className="w-1/3 flex justify-center">
            <div className="relative w-full max-w-[220px]">
              <select
                value={project.id}
                onChange={(e) => navigate(`/projects/${e.target.value}`)}
                className="w-full bg-transparent border border-battle-gray border-opacity-20 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:border-sunglow appearance-none truncate"
              >
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-battle-gray">
                <FaChevronDown />
              </div>
            </div>
          </div>
          
          {/* Colonna Successivo */}
          <div className="w-1/3 flex justify-end">
            {nextProject ? (
              <Link
                to={`/projects/${nextProject.id}`}
                className="flex items-center gap-3 group"
              >
                <div className="hidden sm:block truncate max-w-[150px] text-right">
                  <div className="text-sm text-current opacity-70">Successivo</div>
                  <div className="text-xs truncate">{nextProject.title}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-battle-gray bg-opacity-10 flex items-center justify-center group-hover:bg-sunglow group-hover:text-raisin-black transition-colors">
                  <FaChevronRight />
                </div>
              </Link>
            ) : (
              <div className="w-10"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;