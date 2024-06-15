// LoadingContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface LoadingContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  destination: string;
  setDestination: (destination: string) => void;
}

export const LoadingContext = createContext<LoadingContextProps>({
  loading: false,
  setLoading: () => {},
  destination: '',
  setDestination: () => {}
});

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState('');

  return (
    <LoadingContext.Provider value={{ loading, setLoading, destination, setDestination }}>
      {children}
    </LoadingContext.Provider>
  );
};
