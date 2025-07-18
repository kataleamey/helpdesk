import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ApiHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // This component is a placeholder for a server-side function.
    // We navigate away immediately because there's nothing to render.
    // The actual logic is handled by Vite's server middleware now.
    navigate(-1); 
  }, [navigate]);

  return null;
}

export default ApiHandler;