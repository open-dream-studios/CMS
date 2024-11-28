import React from 'react'
import { PageProps } from '../../App';
import OliveDisplay from '../../Components/Navbar/OliveDisplay/OliveDisplay';

const Archives: React.FC<PageProps> = ({ navigate }) => (
  <div
    className="w-[100%] min-h-[100vh]"
    style={{
      width: "100%",
      backgroundColor: "pink",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1>
      {/* <OliveDisplay /> */}
    </h1>
  </div>
);

export default Archives