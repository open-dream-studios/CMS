import React from 'react'

interface PageProps {
  navigateToHome: () => void;
}

const About: React.FC<PageProps> = ({ navigateToHome }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "lightcoral",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1>About Page</h1>
    <p>This is the about page!</p>
    <button onClick={navigateToHome}>Go to Home</button>
  </div>
);

export default About