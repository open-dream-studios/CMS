import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App2';
import netlifyIdentity from 'netlify-identity-widget';

// Initialize Netlify Identity
netlifyIdentity.init();

// Add a manual trigger for testing (optional)
netlifyIdentity.on('init', (user) => {
  console.log('Netlify Identity initialized:', user);
  if (!user) {
    // Automatically show the login modal for testing
    netlifyIdentity.open();
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);