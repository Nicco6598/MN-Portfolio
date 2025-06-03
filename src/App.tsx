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
import { projects } from './data/projectData'; // Importa i dati dei progetti


// Precaricamento pagina Home per un'esperienza più fluida
import HomeComponent from './pages/Home';
// Lazy loading delle altre pagine
const Home = () => <HomeComponent />;
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
        const projectId = pathname.split('/projects/')[1];
        const project = projects.find(p => p.id.toString() === projectId);
        if (project) {
          return `Caricamento ${project.title}`;
        }
        return 'Dettaglio Progetto'; // Fallback se il progetto non viene trovato
      }
      return 'Pagina';
  }
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { loading, setLoading, destination, setDestination } = useContext(LoadingContext);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Rilevamento dispositivo
  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                              (window.innerWidth <= 768);
      const isIOSDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      
      setIsMobile(isMobileDevice);
      setIsIOS(isIOSDevice);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Prefetch delle pagine più importanti
  useEffect(() => {
    // Precarica le pagine principali dopo il caricamento iniziale
    const prefetchImportantPages = async () => {
      try {
        if (!loading && location.pathname === '/') {
          // Precarica Projects quando sei in Home
          const projectsModule = import('./pages/Projects');
          // Non attendere il completamento per non bloccare l'UI
        }
      } catch (error) {
        console.error('Error prefetching modules:', error);
      }
    };
    
    prefetchImportantPages();
  }, [loading, location.pathname]);

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

  // Semplice componente di fallback ottimizzato
  const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="w-10 h-10 border-4 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Rendering condizionale del background animato - nessuna animazione su iOS */}
      <AnimatedBackground />
      <Navbar />
      {loading ? (
        <PortfolioLoader 
          destination={destination} 
          onLoadingComplete={handleLoadingComplete}
          minDisplayTime={isMobile ? 400 : 600} // Ridotto per tutti i dispositivi mobili uniformemente
        />
      ) : (
        <div className="page-transition pt-24">
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingFallback />}>
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