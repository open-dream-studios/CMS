import React, { useEffect, useRef, useState } from "react";
import { PageProps } from "../../App";
import useProjectColorsState from "../../store/useProjectColorsStore";
import useSelectedProjectState from "../../store/useSelectedProjectStore";
import useSelectedProjectNameState from "../../store/useSelectedProjectNameStore";
import usePreloadedImagesStore from "../../store/usePreloadedImagesStore";
import useProjectAssetsStore from "../../store/useProjectAssetsStore";
import { CoverEntry } from "../Home/Home";
const About: React.FC<PageProps> = ({ navigate }) => {
  const { projectColors, setProjectColors } = useProjectColorsState();
  const { selectedProject, setSelectedProject } = useSelectedProjectState();
  const { selectedProjectName, setSelectedProjectName } =
    useSelectedProjectNameState();
  const { projectAssets, setProjectAssets } = useProjectAssetsStore();
  const { preloadedImages, setPreloadedImages } = usePreloadedImagesStore();

  const coversRef = useRef<CoverEntry[] | null>(null);
  const [coversReady, setCoversReady] = useState<CoverEntry[] | null>(null);

  useEffect(() => {
    const project = projectAssets as any;
    if (
      project !== null &&
      project["home"] &&
      Array.isArray(project["home"]) &&
      project["home"].length > 0
    ) {
      coversRef.current = project["home"] as CoverEntry[];
      setCoversReady(project["home"] as CoverEntry[]);
    }
  }, [projectAssets]);

  function setUpdatedProject(newProject: number) {
    const currentProj = selectedProject;
    setSelectedProject(newProject);
    setSelectedProjectName([null, newProject, null]);
    // navigate("projects/" + projects[newProject].link);

    // let projectColorsCopy = projectColors;
    // projectColorsCopy[0] = [
    //   projects[currentProj ? currentProj : 0].bg_color,
    //   projects[currentProj ? currentProj : 0].text_color,
    // ];
    // projectColorsCopy[2] = [
    //   projects[newProject].bg_color,
    //   projects[newProject].text_color,
    // ];

    // setProjectColors(projectColorsCopy);
    // setTimeout(() => {
    //   projectColorsCopy[1] = [
    //     projects[newProject].bg_color,
    //     projects[newProject].text_color,
    //   ];
    //   setProjectColors(projectColorsCopy);
    // }, 1000);

    //     onClick={() => {
    //   setUpdatedProject(2);
    //   navigate("projects/provence");
    // }}
  }

  return (
    <div className="w-[100%] mt-[57px] lg:mt-[78px]">
      <div
        className="relative w-[100%] h-[calc(100vh-57px)] lg:h-[calc(100vh-78px)]"
        style={{ borderTop: "1px solid black" }}
      >
        <img
          alt=""
          src="assets/about/about-flower1.png"
          className="w-[calc(150px+10vw)] absolute top-[0] left-[0]"
        />
        <p className="manrope text-[#323232] absolute bottom-[15px] text-[calc(7vw+50px)] tracking-[-0.5vw] leading-[calc(6vw+45px)] left-[27px]">
          JESS <br /> SHULMAN
        </p>
        <p className="manrope text-[#323232] absolute bottom-[calc(7vw+80px)] md:bottom-[15px] text-[calc(10px+0.5vw)] tracking-[-0.05vw] leading-[calc(12px+0.6vw)]  right-[27px] text-right">
          CREATIVE DESIGNER / <br className="hidden md:block" />
          PHOTOGRAPHER
          <br />
          BASED IN NEW JERSEY
        </p>

        <div className="absolute top-0 left-0 w-[100%] h-[100%] flex flex-col items-center justify-center">
          <div className="w-[calc((12px+0.4vw)*25)] text-center flex bg-white">
            <p className="manrope-md text-[#323232] text-[calc(12px+0.4vw)] leading-[calc(16px+0.6vw)]">
              I FEEL YOUR ENERGY AND TRANSFER IT TO THE MOST EXPENSIVE CANVAS IN
              THE WORLD –
            </p>
          </div>
          <p className="baskara mt-[calc(-2px-1vw)] text-[#323232] text-[calc((12px+0.4vw)*5)] leading-[calc((12px+0.4vw)*5)]">
            your body
          </p>
          <div
            style={{ border: "0.1px solid #A9524F", color: "#A9524F" }}
            className="cursor-pointer manrope-md text-[calc((12px+0.4vw)*0.7)] py-[calc((12px+0.4vw)*0.3)] px-[calc((12px+0.4vw)*0.6)]"
          >
            SEND REQUEST
          </div>
        </div>
      </div>

      <div className="w-[100%] mt-[110px] flex flex-col items-center justify-center px-[calc(20px+2vw)]">
        <div
          className="w-[100%] flex relative justify-center"
          style={{ borderTop: "0.5px solid #bbbbbb" }}
        >
          <p className="manrope-md absolute left-0 top-[15px] text-[calc((12px+0.4vw)*0.64)]">
            ABOUT ME
          </p>

          <img
            alt=""
            src="assets/about/about-img1.png"
            className="h-[calc(30vw+90px)] lg:h-[calc(10vw+150px)] aspect-[1/1.34] object-cover mt-[17px]"
          />
        </div>

        <div
          style={{ borderBottom: "0.5px solid #bbbbbb" }}
          className="w-[100%] text-center mt-[calc(1.5vw+20px)] pb-[110px] flex flex-col relative justify-center"
        >
          <p className="baskara text-[#323232] text-[calc((12px+0.4vw)*4.2)] leading-[calc((12px+0.4vw)*3)] sm:text-[calc((12px+0.4vw)*4.8)] sm:leading-[calc((12px+0.4vw)*4)] lg:text-[calc((12px+0.4vw)*3.7)] lg:leading-[calc((12px+0.4vw)*2.8)] tracking-[-0.1vw]">
            Hey, I'm Jess!
          </p>
          <p className="baskara text-[#A9524F] mr-[calc((12px+0.4vw)*10)] text-[calc((12px+0.4vw)*4.2)] leading-[calc((12px+0.4vw)*3)] sm:text-[calc((12px+0.4vw)*4.8)] sm:leading-[calc((12px+0.4vw)*3.5)] lg:text-[calc((12px+0.4vw)*3.7)] lg:leading-[calc((12px+0.4vw)*2.5)] tracking-[-0.1vw]">
            And my main inspiration is you.
          </p>

          <div
            className="manrope-md flex:1 lg:mt-[27px] mt-[35px] ml-[calc(50%-(((30vw+90px)/1.34))*0.5)] lg:ml-[calc(50%-(((10vw+150px)/1.34))*0.5)] flex flex-col lg:flex-row gap-[calc(1vw+18px)] lg:gap-0 text-[calc((12px+0.4vw)*0.1.2)] leading-[calc((12px+0.4vw)*1.55)] lg:text-[calc((12px+0.4vw)*0.81)] lg:leading-[calc((12px+0.4vw)*1.26)]"
          >
            <div className="w-[80%] lg:w-[42%] mr-[5%] text-left">
              I like to work with people and create something from zero what is
              going to stay forever on the human body. I do freehand and
              freestyle tattoos - it's about freedom and feeling.
            </div>
            <div className="w-[80%] lg:w-[50%] text-left">
              Everyone has their own special energy's which i read in our first
              15 min when we meet: how you smile, how you speak, how you feel
              yourself. There comes an image in my head where i already can see
              the future design for your project.
            </div>
          </div>
        </div>

        <div className="w-[100%] h-[1000px] bg-white"></div>
      </div>
    </div>
  );
};

//  <div className="w-[100%] h-[100%] px-[calc(3vw+15px)] py-[calc(1vh+30px)] flex justify-center">
//         <img
//           alt=""
//           className="w-[100%] h-[100%]"
//           style={{ objectFit: "cover" }}
//           src={coversRef.current === null ? "" : coversRef.current[0].images[0].url}
//         />
//         <div
//           className="w-[70%] lg:w-[50%] aspect-[1/1] md:aspect-[1.75/1] absolute"
//           style={{
//             backgroundColor: "white",
//             marginTop: "50px",
//             transform: "translateY(-50%}",
//           }}
//         ></div>
//       </div>

//       <div className="w-[100%] h-[auto] px-[calc(3vw+15px)] py-[calc(1vh+30px)] flex flex-col md:flex-row gap-[20px] md:gap-0">
//         <div
//           className="w-[100%] md:w-[50%] klivora text-[calc(5vw+30px)] leading-[calc(5vw+30px)]"
//           style={{ backgroundColor: "green" }}
//         >
//           Overview
//         </div>
//         <div
//           className="w-[100%] md:w-[50%] flex flex-col gap-[20px]"
//           style={{ backgroundColor: "green" }}
//         >
//           <p>
//             Situated in the heart of the rice fields of Minamioguni, the "Take
//             no Kuma" cafe looks as if it is floating atop the paddy water. The
//             cafe opened in 2023 in an area blessed with pristine water springing
//             from Mt. Aso and renowned for hot springs. Oguni cedar milled by
//             Anai Wood Factory is used throughout the cafe, from the columns and
//             beams to the roof tiles, allowing you to appreciate the beauty of
//             wooden constructions. Furthermore, the tableware and dishes also
//             incorporate our wood products.
//           </p>

//           <p style={{ textDecoration: "underline" }}>Visit site</p>
//         </div>
//       </div>

//       <div className="relative w-[100%] px-[calc(3vw+15px)] py-[calc(1vh+30px)] flex flex-col md:flex-row gap-[20px] md:gap-0">
//         <div
//           className="absolute w-[100%] md:w-[calc(50%-(3vw+15px))] md:mr-[5%] aspect-[1/1.3]"
//            style={{backgroundColor: "green"}}
//         >
//           {/* <img
//             alt=""
//             className="w-[100%] h-[100%]"
//             style={{ objectFit: "contain" }}
//             src={
//               coversRef.current === null ? "" : coversRef.current[0].images[0]
//             }
//           /> */}
//         </div>
//         <div
//           className="absolute md:ml-[100%] w-[50%] aspect-[1/1.3]"
//           style={{backgroundColor: "green"}}
//         >
//           {/* <img
//             alt=""
//             className="w-[100%] h-[100%]"
//             style={{ objectFit: "cover" }}
//             src={
//               coversRef.current === null ? "" : coversRef.current[0].images[0]
//             }
//           /> */}
//         </div>
//       </div>

export default About;
