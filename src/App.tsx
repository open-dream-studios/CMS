import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';

function App() {
  const handleLogin = () => {
    netlifyIdentity.open();
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      <button onClick={handleLogin}>Login / Sign Up</button>
    </div>
  );
}

export default App;