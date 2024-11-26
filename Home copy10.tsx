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
//   const text = "Dreamlike flowers";

//   const splitText = text.replace(" ", "_").split("")

//   return (
//     <div
//       className="fixed w-[100vw] h-[100vh]"
//       style={{ backgroundColor: "lightblue" }}
//       onClick={() => {
//         if (isVisible) {
//           setIsRevealing(false)
//           setTimeout(()=>{
//             setIsVisible(false)
//           },1500)
//         } else {
//           setIsRevealing(true)
//           setIsVisible(true)
//         }
//       }}
//     >
//       <div
//         className="h-[160px] w-[100%] flex flex-col gap-[26px] mt-[500px]"
//         style={{ backgroundColor: "transparent" }}
//       >
//         <div
//           className={`home-text-reveal-wrapper ${
//             isVisible ? "visible" : "hidden"
//           }`}
//           style={{ visibility: isVisible ? "visible" : "hidden" }}
//         >
//           <div className="klivora wave-container text-[42px] tracking-[1px] leading-[42px]">
//             {splitText.map((letter, index) => (
//               <span
//                 key={index}
//                 className={`wave-letter ${
//                   isRevealing ? "wave-reveal" : "wave-conceal"
//                 }`}
//                 style={{
//                   animationDelay: `${Math.pow(index, 0.7) * 0.03}s`,
//                   opacity: letter === "_"? 0 : 1
//                 }}
//               >
//                 {letter}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
