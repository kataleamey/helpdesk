import React, { createContext, useContext, useEffect, useState } from 'react';
import tiledeskService from '@/services/TiledeskService';
import { useAuth } from './AuthContext';

const TiledeskContext = createContext(null);

export const useTiledesk = () => useContext(TiledeskContext);

export const TiledeskProvider = ({ children }) => {
  const { user } = useAuth();
  const [isTiledeskReady, setIsTiledeskReady] = useState(false);

  useEffect(() => {
    const initializeTiledesk = async () => {
      if (user && user.tiledeskToken) {
        try {
          // IMPORTANT: Replace with your Tiledesk Project ID
          const projectId = "YOUR_PROJECT_ID"; 
          
          // IMPORTANT: If self-hosting, replace with your Tiledesk API URL
          const apiUrl = "https://api.tiledesk.com/v3/"; 

          await tiledeskService.initialize({
            projectId: projectId,
            token: user.tiledeskToken,
            apiUrl: apiUrl,
            log: true
          });
          setIsTiledeskReady(true);
        } catch (error) {
          console.error("Failed to initialize Tiledesk:", error);
          setIsTiledeskReady(false);
        }
      } else {
        setIsTiledeskReady(false);
        tiledeskService.close();
      }
    };

    initializeTiledesk();

    return () => {
      tiledeskService.close();
      setIsTiledeskReady(false);
    };
  }, [user]);

  const value = {
    isTiledeskReady,
    tiledeskService,
  };

  return (
    <TiledeskContext.Provider value={value}>
      {children}
    </TiledeskContext.Provider>
  );
};