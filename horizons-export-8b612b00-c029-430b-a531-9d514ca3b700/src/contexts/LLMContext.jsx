
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const LLMContext = createContext();

export const useLLM = () => useContext(LLMContext);

const defaultIntegrations = [
    { id: 'openrouter', name: 'OpenRouter', description: 'Access a variety of models through a single API.', isConnected: false, apiKey: null, model: 'openai/gpt-3.5-turbo' },
    { id: 'gemini', name: 'Gemini', description: "Connect to Google's powerful generative AI models.", isConnected: false, apiKey: null, model: 'google/gemini-pro' },
    { id: 'chatgpt', name: 'ChatGPT', description: "Integrate with OpenAI's state-of-the-art language models.", isConnected: false, apiKey: null, model: 'openai/gpt-4' },
    { id: 'claude', name: 'Claude', description: "Leverage Anthropic's safety-focused AI assistant.", isConnected: false, apiKey: null, model: 'anthropic/claude-3-opus' },
];

export const LLMProvider = ({ children }) => {
  const [integrations, setIntegrations] = useState(() => {
    try {
      const savedIntegrations = localStorage.getItem('llmIntegrations');
      return savedIntegrations ? JSON.parse(savedIntegrations) : defaultIntegrations;
    } catch (error) {
      console.error("Error reading LLM integrations from localStorage", error);
      return defaultIntegrations;
    }
  });
  const [activeLLM, setActiveLLM] = useState(() => {
    try {
      const savedActiveLLM = localStorage.getItem('activeLLM');
      return savedActiveLLM ? JSON.parse(savedActiveLLM) : null;
    } catch (error) {
      console.error("Error reading active LLM from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('llmIntegrations', JSON.stringify(integrations));
    } catch (error) {
      console.error("Error saving LLM integrations to localStorage", error);
    }
  }, [integrations]);

  useEffect(() => {
    try {
      localStorage.setItem('activeLLM', JSON.stringify(activeLLM));
    } catch (error) {
      console.error("Error saving active LLM to localStorage", error);
    }
  }, [activeLLM]);

  const addIntegration = (integration) => {
    setIntegrations(prev => [...prev, { ...integration, id: Date.now().toString() }]);
    toast({
        title: 'Integration Added',
        description: `${integration.name} has been added to your integrations list.`,
    });
  };

  const connectLLM = (id, apiKey) => {
    setIntegrations(prev =>
      prev.map(int => (int.id === id ? { ...int, isConnected: true, apiKey } : int))
    );
    if (!activeLLM) {
      setActiveLLM(id);
    }
    toast({
      title: 'LLM Connected',
      description: `Successfully connected to ${integrations.find(i=>i.id===id).name}.`,
    });
  };

  const disconnectLLM = (id) => {
    setIntegrations(prev =>
      prev.map(int => (int.id === id ? { ...int, isConnected: false, apiKey: null } : int))
    );
    if (activeLLM === id) {
      const nextActive = integrations.find(int => int.isConnected && int.id !== id);
      setActiveLLM(nextActive ? nextActive.id : null);
    }
    toast({
      title: 'LLM Disconnected',
      description: `Disconnected from ${integrations.find(i=>i.id===id).name}.`,
    });
  };
  
  const llmConfig = integrations.find(int => int.id === activeLLM);

  const value = {
    integrations,
    activeLLM,
    llmConfig,
    connectLLM,
    disconnectLLM,
    setActiveLLM,
    addIntegration,
  };

  return <LLMContext.Provider value={value}>{children}</LLMContext.Provider>;
};
