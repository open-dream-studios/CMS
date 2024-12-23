import React, { useEffect, useRef, useState } from "react";
import { CoverOutputItem, PageProps } from "../../App";
import useProjectColorsState from "../../store/useProjectColorsStore";
import useSelectedProjectState from "../../store/useSelectedProjectStore";
import useSelectedProjectNameState from "../../store/useSelectedProjectNameStore";
import usePreloadedImagesStore from "../../store/usePreloadedImagesStore";
import useProjectAssetsStore from "../../store/useProjectAssetsStore";
const About: React.FC<PageProps> = ({ navigate }) => {
  const { projectColors, setProjectColors } = useProjectColorsState();
  const { selectedProject, setSelectedProject } = useSelectedProjectState();
  const { selectedProjectName, setSelectedProjectName } =
    useSelectedProjectNameState();
  const { projectAssets, setProjectAssets } = useProjectAssetsStore();
  const { preloadedImages, setPreloadedImages } = usePreloadedImagesStore();

  const coversRef = useRef<CoverOutputItem[] | null>(null);
  const [coversReady, setCoversReady] = useState<CoverOutputItem[] | null>(
    null
  );

  useEffect(() => {
    if (
      projectAssets !== null &&
      projectAssets["home"] &&
      Array.isArray(projectAssets["home"]) &&
      projectAssets["home"].length > 0
    ) {
      coversRef.current = projectAssets["home"] as CoverOutputItem[];
      setCoversReady(projectAssets["home"] as CoverOutputItem[]);
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
    <div
      className="w-[100%] min-h-[100%] pt-[40px]"
      style={{
        backgroundColor: "white",
      }}
    >
      <div className="w-[100%] h-[100%] px-[calc(3vw+15px)] py-[calc(1vh+30px)] flex justify-center">
        <img
          alt=""
          className="w-[100%] h-[100%]"
          style={{ objectFit: "cover" }}
          src={coversRef.current === null ? "" : coversRef.current[0].images[0]}
        />
        <div
          className="w-[70%] lg:w-[50%] aspect-[1/1] md:aspect-[1.75/1] absolute"
          style={{
            backgroundColor: "white",
            marginTop: "50px",
            transform: "translateY(-50%}",
          }}
        ></div>
      </div>

      <div className="w-[100%] h-[auto] px-[calc(3vw+15px)] py-[calc(1vh+30px)] flex flex-col md:flex-row gap-[20px] md:gap-0">
        <div
          className="w-[100%] md:w-[50%] klivora text-[calc(5vw+30px)] leading-[calc(5vw+30px)]"
          style={{ backgroundColor: "green" }}
        >
          Overview
        </div>
        <div
          className="w-[100%] md:w-[50%] flex flex-col gap-[20px]"
          style={{ backgroundColor: "green" }}
        >
          <p>
            Situated in the heart of the rice fields of Minamioguni, the "Take
            no Kuma" cafe looks as if it is floating atop the paddy water. The
            cafe opened in 2023 in an area blessed with pristine water springing
            from Mt. Aso and renowned for hot springs. Oguni cedar milled by
            Anai Wood Factory is used throughout the cafe, from the columns and
            beams to the roof tiles, allowing you to appreciate the beauty of
            wooden constructions. Furthermore, the tableware and dishes also
            incorporate our wood products.
          </p>

          <p style={{ textDecoration: "underline" }}>Visit site</p>
        </div>
      </div>

      <div className="relative w-[100%] px-[calc(3vw+15px)] py-[calc(1vh+30px)] flex flex-col md:flex-row gap-[20px] md:gap-0">
        <div
          className="absolute w-[100%] md:w-[calc(50%-(3vw+15px))] md:mr-[5%] aspect-[1/1.3]"
           style={{backgroundColor: "green"}}
        >
          {/* <img
            alt=""
            className="w-[100%] h-[100%]"
            style={{ objectFit: "contain" }}
            src={
              coversRef.current === null ? "" : coversRef.current[0].images[0]
            }
          /> */}
        </div>
        <div
          className="absolute md:ml-[100%] w-[50%] aspect-[1/1.3]"
          style={{backgroundColor: "green"}}
        >
          {/* <img
            alt=""
            className="w-[100%] h-[100%]"
            style={{ objectFit: "cover" }}
            src={
              coversRef.current === null ? "" : coversRef.current[0].images[0]
            }
          /> */}
        </div>
      </div>
    </div>
  );
};

export default About;
