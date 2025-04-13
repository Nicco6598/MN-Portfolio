import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PortfolioLoader from './PortfolioLoader';
import HeroSection from './home/HeroSection';
import SkillsSection from './home/SkillsSection';
import FeaturedProjects from './home/FeaturedProjects';
import AnimatedBackground from './AnimatedBackground';
import '../styles/home-animations.css';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <PortfolioLoader key="loader" destination="Home" />
      ) : (
        <motion.div
          className="relative overflow-x-hidden"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <AnimatedBackground />
          
          {/* Contenitore principale con larghezza consistente per tutte le sezioni */}
          <div className="mx-auto px-4 sm:px-6 relative z-10">
            {/* Wrapper per ogni sezione per garantire la stessa larghezza */}
            <section className="pt-28 pb-8">
              <HeroSection />
            </section>
            
            <section className="py-16">
              <SkillsSection />
            </section>
            
            <section className="py-16">
              <FeaturedProjects />
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Home; 