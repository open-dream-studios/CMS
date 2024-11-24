import React from 'react'
import { PageProps } from '../../App';

const Archives: React.FC<PageProps> = ({ navigate }) => (
  <div
    style={{
      width: "100%",
      height: "2000px",
      backgroundColor: "pink",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1>Archives Page</h1>
  </div>
);

export default Archives