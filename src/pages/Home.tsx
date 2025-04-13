// src/pages/Home.tsx
import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import SkillsSection from '../components/home/SkillsSection';
import FeaturedProjects from '../components/home/FeaturedProjects';

const Home: React.FC = () => {
  // Page transition animation
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { opacity: 0 }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 pt-16 pb-16"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <HeroSection />
      
      {/* Skills Section */}
      <SkillsSection />
      
      {/* Featured Projects Section */}
      <FeaturedProjects />
    </motion.div>
  );
};

export default Home;