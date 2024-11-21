import React from 'react'

interface PageProps {
  navigateToAbout: () => void;
}

const Home: React.FC<PageProps> = ({ navigateToAbout }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "lightblue",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
    <button onClick={navigateToAbout}>Go to About</button>
  </div>
);

export default Home