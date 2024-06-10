import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = {
    title: 'Project 1',
    description: 'Detailed description...',
    imageUrl: 'path/to/image1.jpg',
    year: '2023',
    month: 'June',
    languages: ['JavaScript', 'TypeScript', 'React'],
    type: 'Web Development',
    vercelLink: 'https://vercel.com',
    githubLink: 'https://github.com/yourusername/project1',
  };

  return (
    <div className="container mx-auto p-8">
      <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover rounded-xl mb-4 shadow-lg" />
      <h1 className="text-3xl mb-4">{project.title}</h1>
      <p className="mb-4 text-lg text-gray-600">{project.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <p><strong>Year:</strong> {project.year}</p>
        <p><strong>Month:</strong> {project.month}</p>
        <p><strong>Languages:</strong> {project.languages.join(', ')}</p>
        <p><strong>Type:</strong> {project.type}</p>
      </div>
      {project.vercelLink && <a href={project.vercelLink} className="text-secondary mt-4 inline-block hover:text-secondary/80 transition">Vercel Link</a>}
      {project.githubLink && <a href={project.githubLink} className="text-secondary mt-4 ml-4 inline-block hover:text-secondary/80 transition">GitHub Link</a>}
    </div>
  );
};

export default ProjectDetail;
