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
          <div className="bg-alice-blue rounded-xl shadow-[0_8px_12px_rgb(0,0,0,0.12)] p-4 text-center">
            <img src={project.imageUrl} alt={project.title} className="mx-auto w-48 h-48 object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-semibold text-rich-black">{project.title}</h3>
            <p className="text-gray-600">{project.shortDescription}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ProjectCarousel;
