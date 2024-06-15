// App.tsx
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import Footer from './components/Footer';
import { LoadingProvider, LoadingContext } from './context/LoadingContext';
import { InfinitySpin } from 'react-loader-spinner';

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

      // Simulate loading time
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // Adjust the timeout duration as needed

      return () => clearTimeout(timer);
    }
  }, [location, navigationType, setLoading, setDestination]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
          <InfinitySpin 
            width='200'
            color="#00BFFF"
          />
          <p className="text-lg font-semibold text-gray-700 animate-pulse">Caricamento {destination}...</p>
        </div>
      ) : (
        <div>
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
    <LoadingProvider>
      <Router>
        <AppContent />
      </Router>
    </LoadingProvider>
  );
};

export default App;
