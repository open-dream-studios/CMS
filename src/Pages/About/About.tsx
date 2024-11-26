import React from 'react'
import { PageProps } from '../../App';

const About: React.FC<PageProps> = ({ navigate }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "lightgreen",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1 onClick={()=>{navigate("projects/provence")}}>GO TO PROVENCE</h1>
  </div>
);

export default About