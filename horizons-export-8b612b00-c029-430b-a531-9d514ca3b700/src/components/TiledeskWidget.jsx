import React, { useEffect } from 'react';

const TiledeskWidget = () => {
  useEffect(() => {
    // --- IMPORTANT ---
    // 1. Replace "YOUR_PROJECT_ID" with your actual Tiledesk project ID.
    const tiledeskProjectId = "YOUR_PROJECT_ID"; 

    // 2. Replace "https://your-vps-domain.com" with the actual URL of your self-hosted Tiledesk server.
    const tiledeskBaseUrl = "https://your-vps-domain.com";

    window.tiledeskSettings = {
      projectid: tiledeskProjectId,
      // If your self-hosted instance requires specifying the API URL, uncomment the line below
      // apiUrl: `${tiledeskBaseUrl}/api/`, 
    };

    const script = document.createElement('script');
    script.id = 'tiledesk-jssdk';
    script.src = `${tiledeskBaseUrl}/widget/v6/launch.js`;
    script.async = true;

    // Check if the script is already added to avoid duplicates
    if (!document.getElementById('tiledesk-jssdk')) {
      document.body.appendChild(script);
    }

    // Cleanup function to remove the script and widget when the component unmounts
    return () => {
      const existingScript = document.getElementById('tiledesk-jssdk');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      // Tiledesk might create other elements, this is a basic cleanup
      const tiledeskContainer = document.getElementById('tiledesk-container');
      if (tiledeskContainer) {
        tiledeskContainer.parentNode.removeChild(tiledeskContainer);
      }
      delete window.tiledeskSettings;
      if (window.tiledesk) {
          delete window.tiledesk;
      }
    };
  }, []);

  return null; // This component doesn't render any visible UI itself
};

export default TiledeskWidget;