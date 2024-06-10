import React from 'react';
import { Link } from 'react-router-dom';

const Projects: React.FC = () => {
  const projects = [
    { id: 1, title: 'Project 1', description: 'Description 1', imageUrl: 'path/to/image1.jpg' },
    { id: 2, title: 'Project 2', description: 'Description 2', imageUrl: 'path/to/image2.jpg' },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl mb-6">Progetti</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="rounded-xl shadow-lg bg-glass backdrop-blur-xs p-4">
            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover rounded-xl mb-4" />
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p className="mt-2 text-gray-700">{project.description}</p>
            <Link to={`/projects/${project.id}`} className="text-secondary mt-4 inline-block hover:text-secondary/80 transition">Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
