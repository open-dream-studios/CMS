import React from "react";
import { PageProps } from "../../App";
import useProjectColorsState from "../../store/useProjectColorsStore";
import useSelectedProjectState from "../../store/useSelectedProjectStore";
import useSelectedProjectNameState from "../../store/useSelectedProjectNameStore";
const About: React.FC<PageProps> = ({ navigate }) => {
  const { projectColors, setProjectColors } = useProjectColorsState();
  const { selectedProject, setSelectedProject } = useSelectedProjectState();
  const { selectedProjectName, setSelectedProjectName } = useSelectedProjectNameState();

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
          setUpdatedProject(2);
          navigate("projects/provence");
        }}
      >
        GO TO PROVENCE
      </h1>
      {/* <BoardDisplay /> */}
    </div>
  );
};

export default About;
