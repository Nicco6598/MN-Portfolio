import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import Footer from './components/Footer';
import { LoadingProvider, LoadingContext } from './context/LoadingContext';
import { ThemeProvider } from './context/ThemeContext';
import PortfolioLoader from './components/PortfolioLoader';
import './styles/theme.css';
import './styles/home-animations.css'; // Importa le animazioni per la home
import BackgroundShapes from './components/BackgroundShapes';

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

  useEffect(() => {
    if (navigationType !== 'POP') {
      setLoading(true);
      setDestination(getRouteName(location.pathname));

      // Simulate loading time with a variable duration for a more natural feel
      const loadingTime = Math.random() * 300 + 700; // Between 700ms and 1000ms
      const timer = setTimeout(() => {
        setLoading(false);
      }, loadingTime);

      return () => clearTimeout(timer);
    }
  }, [location, navigationType, setLoading, setDestination]);

  return (
    <div className="min-h-screen relative">
      <BackgroundShapes />
      <Navbar />
      {loading ? (
        <PortfolioLoader destination={destination} />
      ) : (
        // Aggiungi padding-top per compensare la navbar
        <div className="page-transition pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
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