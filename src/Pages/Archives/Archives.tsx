import React from 'react'
import { PageProps } from '../../App';
import BoardDisplay from '../../Components/BoardDisplay/BoardDisplay';
import OliveDisplay from '../../Components/OliveDisplay/OliveDisplay';

const Archives: React.FC<PageProps> = ({ navigate }) => (
  <div
    className="w-[100%] min-h-[100vh]"
    style={{
      width: "100%",
      // backgroundColor: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1>
      {/* <BoardDisplay /> */}
      <OliveDisplay />
    </h1>
  </div>
);

export default Archives