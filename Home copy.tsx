// import React, { useEffect, useRef, useState } from "react";
// import appData from "../../app-details.json";
// import "./Home.css";
// import { Page } from "../../App";
// import { AnimatePresence, motion } from "framer-motion";
// import { useLocation } from "react-router-dom";

// export interface HomePageProps {
//   navigate: (page: Page) => void;
//   layoutOrder: number[];
//   slideUpComponent: boolean;
// }

// const Home: React.FC<HomePageProps> = ({
//   navigate,
//   layoutOrder,
//   slideUpComponent,
// }) => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [isRevealing, setIsRevealing] = useState(true);
//   const [textDisplay, setTextDisplay] = useState(true);

//   return (
//     <div
//       className="fixed w-[100vw] h-[100vh]"
//       style={{ backgroundColor: "lightblue" }}
//       onClick={() => {
//         if (isVisible) {
//           setIsRevealing(false)
//           setTimeout(()=>{
//             setIsVisible(false);
//             setTextDisplay(false)
//           },1000)
          
//         } else {
//           setTextDisplay(true)
//           setIsRevealing(true)
//           setIsVisible(true)
//         }
//       }}
//     >
//         <div
//           className="h-[160px] w-[100%] flex flex-col gap-[26px] mt-[500px]"
//           style={{ backgroundColor: "transparent" }}
//         >
//           <div
//             className={`home-text-reveal-wrapper 
//             ${textDisplay ? "flex" : "hidden"}
//             ${isVisible ? "visible" : ""}`}
//           >
//             <div
//               className={`klivora ${
//                 isRevealing ? "home-text-reveal" : "home-text-conceal"
//               } text-[42px] tracking-[1px] leading-[29px]`}
//             >
//               LONGTEXTWITHEFFECT
//             </div>
//           </div>
//         </div>
//     </div>
//   );
// };

// export default Home;
