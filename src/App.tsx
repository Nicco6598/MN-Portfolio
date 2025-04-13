import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import Footer from './components/Footer';
import { LoadingProvider, LoadingContext } from './context/LoadingContext';
import { ThemeProvider } from './context/ThemeContext';
import PortfolioLoader from './components/PortfolioLoader';
import AnimatedBackground from './components/AnimatedBackground';
import './styles/theme.css';
import './styles/home-animations.css'; // Importa le animazioni per la home

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
          minDisplayTime={800} // Tempo minimo di visualizzazione
        />
      ) : (
        // Aggiungi padding-top per compensare la navbar
        <div className="page-transition pt-24">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
            </Routes>
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