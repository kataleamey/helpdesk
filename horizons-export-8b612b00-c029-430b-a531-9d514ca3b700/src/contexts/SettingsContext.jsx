import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [emailConfig, setEmailConfig] = useState({ from: '', apiKey: '' });

  useEffect(() => {
    const storedConfig = localStorage.getItem('emailConfig');
    if (storedConfig) {
      setEmailConfig(JSON.parse(storedConfig));
    }
  }, []);

  const saveEmailConfig = (config) => {
    localStorage.setItem('emailConfig', JSON.stringify(config));
    setEmailConfig(config);
  };

  const value = {
    emailConfig,
    saveEmailConfig,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};