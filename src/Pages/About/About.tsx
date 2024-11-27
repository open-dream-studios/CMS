import React from "react";
import { PageProps } from "../../App";
import useProjectColorsState from "../../store/useProjectColorsStore";
import useProjectColorsNextState from "../../store/useProjectColorsNextStore";
import useProjectColorsPrevState from "../../store/useProjectColorsPrevStore";
import useSelectedProjectState from "../../store/useSelectedProjectStore";
import appData from "../../app-details.json";
const About: React.FC<PageProps> = ({ navigate }) => {
  // const projects = appData.pages.projects;
  // const { projectColors, setProjectColors } = useProjectColorsState();
  // const { projectColorsNext, setProjectColorsNext } =
  //   useProjectColorsNextState();
  // const { projectColorsPrev, setProjectColorsPrev } =
  //   useProjectColorsPrevState();
  // const { selectedProject, setSelectedProject } = useSelectedProjectState();

  function setUpdatedProject(newProject: number) {
    // const currentProj = selectedProject;
    // setSelectedProject(newProject);
    // navigate("projects/" + projects[newProject].link);

    // setProjectColorsNext([
    //   projects[newProject].background_color,
    //   projects[newProject].text_color,
    // ]);
    // setProjectColorsPrev([
    //   projects[currentProj ? currentProj : 0].background_color,
    //   projects[currentProj ? currentProj : 0].text_color,
    // ]);
    // setTimeout(() => {
    //   setProjectColors([
    //     projects[newProject].background_color,
    //     projects[newProject].text_color,
    //   ]);
    // }, 1000);
  }

  return (
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
      <h1
        onClick={() => {
          // setUpdatedProject(2);
          navigate("projects/provence");
        }}
      >
        GO TO PROVENCE
      </h1>
    </div>
  );
};

export default About;
