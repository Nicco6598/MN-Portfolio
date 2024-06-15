import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { projects } from '../data/projectData'; // Importa i dati dei progetti

const ProjectCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
  };

  return (
    <Slider {...settings}>
      {projects.slice(0, 3).map((project) => (
        <div key={project.id} className="p-4">
          <Link 
            to={`/projects/${project.id}`} 
            className="group bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-[0_0px_15px_rgba(0,0,0,0.12)] transition transform hover:scale-95 duration-300 flex flex-col items-center p-6 no-underline"
          >
            <div className="w-full h-52 mb-4 overflow-hidden rounded-xl">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="mx-auto w-48 h-48 object-cover rounded-xl mb-4" 
              />
            </div>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{project.title}</h2>
            <p className="text-gray-600 mb-6 text-center">{project.shortDescription}</p>
            <div className="flex flex-col items-center text-gray-600">
              <p><strong>Anno:</strong> {project.year}</p>
              <p><strong>Linguaggi:</strong> {project.languages.join(', ')}</p>
              <p><strong>Tipologia:</strong> {project.type}</p>
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default ProjectCarousel;
