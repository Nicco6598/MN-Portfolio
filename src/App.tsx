import React, { useContext, useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LoadingProvider, LoadingContext } from './context/LoadingContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PortfolioLoader from './components/PortfolioLoader';
import AnimatedBackground from './components/AnimatedBackground';
import './styles/theme.css';
import './styles/home-animations.css'; // Importa le animazioni per la home

// Lazy loading delle pagine
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const getRouteName = (pathname: string) => {
  switch (pathname) {
    case '/':
      return 'Home';
    case '/projects':
      return 'Progetti';
    case '/contact':
      return 'Contatti';
    default:
      if (pathname.startsWith('/projects/')) {
        return 'Dettaglio Progetto';
      }
      return 'Pagina';
  }
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { loading, setLoading, destination, setDestination } = useContext(LoadingContext);
  const [isMobile, setIsMobile] = useState(false);

  // Rileva se il dispositivo è mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                            (window.innerWidth <= 768);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Notifica al loader la destinazione quando cambia la route
  useEffect(() => {
    if (navigationType !== 'POP') {
      setLoading(true);
      setDestination(getRouteName(location.pathname));
    }
  }, [location, navigationType, setLoading, setDestination]);

  // Funzione callback chiamata quando il loader completa il caricamento
  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      {loading ? (
        <PortfolioLoader 
          destination={destination} 
          onLoadingComplete={handleLoadingComplete}
          minDisplayTime={isMobile ? 400 : 800} // Tempo minimo ridotto per dispositivi mobili
        />
      ) : (
        // Aggiungi padding-top per compensare la navbar
        <div className="page-transition pt-24">
          <AnimatePresence mode="wait">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Caricamento...</div>}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
          <Footer />
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <Router>
          <AppContent />
        </Router>
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default App;