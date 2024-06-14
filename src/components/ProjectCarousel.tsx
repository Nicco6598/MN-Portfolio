import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-[0_0px_15px_rgba(0,0,0,0.12)] p-6 text-center transform transition duration-500 hover:scale-95">
            <img src={project.imageUrl} alt={project.title} className="mx-auto w-48 h-48 object-cover rounded-xl mb-4 shadow-lg" />
            <h3 className="text-2xl font-extrabold text-gray-800 mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.shortDescription}</p>
            <div className="flex flex-col items-center">
              <p className="text-gray-600"><strong>Anno:</strong> {project.year}</p>
              <p className="text-gray-600"><strong>Linguaggi:</strong> {project.languages.join(', ')}</p>
              <p className="text-gray-600"><strong>Tipologia:</strong> {project.type}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ProjectCarousel;
