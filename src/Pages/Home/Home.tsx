import React from 'react'
import { PageProps } from '../../App';

const Home: React.FC<PageProps> = ({ navigate }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "lightblue",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1>Home Page</h1>
  </div>
);

export default Home