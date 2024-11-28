// import React, { useState } from "react";
// import appData from "../../../app-details.json";

// const OliveDisplay = () => {
//   let initialImages = appData.pages.home.covers[0].images;
//   console.log(initialImages)
//   const [images, setImages] = useState([
//     initialImages[0],
//     initialImages[1],
//     initialImages[2],
//     initialImages[3],
//     initialImages[4],
//   ]);
//   const [displayImage, setDisplayImage] = useState(initialImages);

//   const handleMouseEnter = (item: number) => {
//     setDisplayImage(images[item]);
//   };

//   const handleMouseLeave = (item: number) => {
//     setDisplayImage(images[0]);
//   };

//   return (
//     <div
//       className="flex justify-center items-center w-[100vw]"
//       style={{
//         backgroundColor: "#B8BD98",
//       }}
//     >
//       <div
//         className="aspect-[1/1] flex flex-row gap-[28px] justify-center p-[40px]"
//         style={{
//           width: "100%",
//           maxWidth: "calc(100vh - 70px)",
//         }}
//       >
//         <div
//           className="h-[calc(100%-80px)] aspect-[0.74/1] flex justify-center items-center p-[8vw]"
//           style={{ backgroundColor: "#FAF7F5", position: "relative" }}
//         >
//           <div
//             className="w-[100%] aspect-[0.74/1] flex justify-center items-center"
//             style={{ position: "relative" }}
//           >
//             <img
//               style={{ position: "absolute", zIndex: 202 }}
//               src={"/assets/home/image-frame1.png"}
//               alt="cover"
//               width={1000}
//               height={1000}
//               // priority
//             />
//             <img
//               src={displayImage[0]}
//               alt="cover 2"
//               style={{
//                 position: "absolute",
//                 zIndex: 201,
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//               // layout="fill"
//               // objectFit="cover"
//               // priority
//             />
//           </div>
//         </div>

//         <div className="h-[calc(100%-80px)] aspect-[0.17/1] flex items-center pt-[3%] pb-[3%]">
//           <div
//             className="h-[100%] w-[100%] flex flex-col gap-[10px] justify-center items-center p-[12px]"
//             style={{ backgroundColor: "#FAF7F5" }}
//           >
//             <div
//               onMouseEnter={() => handleMouseEnter(1)}
//               onMouseLeave={() => handleMouseLeave(1)}
//               className="dim-dark h-[calc((100%-30px)*0.25)] w-[100%] relative"
//             >
//               <img
//                 src={images[1]}
//                 alt="side 1"
//                 style={{
//                   cursor: "pointer",
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//                 // priority
//               />
//             </div>
//             <div
//               onMouseEnter={() => handleMouseEnter(2)}
//               onMouseLeave={() => handleMouseLeave(2)}
//               className="dim-dark h-[calc((100%-30px)*0.25)] w-[100%] relative"
//             >
//               <img
//                 style={{
//                   cursor: "pointer",
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//                 src={images[2]}
//                 alt="side 2"
//                 // priority
//               />
//             </div>
//             <div
//               onMouseEnter={() => handleMouseEnter(3)}
//               onMouseLeave={() => handleMouseLeave(3)}
//               className="dim-dark h-[calc((100%-30px)*0.25)] w-[100%] relative"
//             >
//               <img
//                 style={{
//                   cursor: "pointer",
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//                 src={images[3]}
//                 alt="side  3"
//               />
//             </div>
//             <div
//               onMouseEnter={() => handleMouseEnter(4)}
//               onMouseLeave={() => handleMouseLeave(4)}
//               className="dim-dark h-[calc((100%-30px)*0.25)] w-[100%] relative"
//             >
//               <img
//                 style={{
//                   cursor: "pointer",
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//                 src={images[4]}
//                 alt="side 4"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OliveDisplay;
import React from 'react'

const OliveDisplay = () => {
  return (
    <div>OliveDisplay</div>
  )
}

export default OliveDisplay
