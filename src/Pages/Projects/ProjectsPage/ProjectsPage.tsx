import React from "react";
import { IncomingPage, Page } from "../../../App";
import useProjectColorsState from "../../../store/useProjectColorsStore";
import useSelectedProjectState from "../../../store/useSelectedProjectStore";
import appData from "../../../app-details.json";
import useSelectedProjectNameState from "../../../store/useSelectedProjectNameStore";

export interface ProjectsPageProps {
  navigate: (page: Page) => void;
  page: Page | IncomingPage;
  slideUpComponent: boolean;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({
  navigate,
  page,
  slideUpComponent,
}) => {
  const { projectColors, setProjectColors } = useProjectColorsState();
  const { selectedProject, setSelectedProject } = useSelectedProjectState();
  const { selectedProjectName, setSelectedProjectName } =
    useSelectedProjectNameState();

  if (selectedProject === null) {
    return <></>;
  }
  const currentProject = appData.pages.projects[selectedProject];
  const prevProject = appData.pages.projects[selectedProject];

  return (
    <div
      className={`right-0 top-0 w-[100vw] min-h-[100vh] flex px-[calc(30px+3vw)] pt-[100px]`}
      style={{
        pointerEvents: "none",
        backgroundColor: "transparent",
        opacity: 1,
      }}
    >
      <div
        className={`absolute right-0 top-0 w-[100vw] sm:w-[calc(98vw-220px)] md:w-[calc(98vw-250px)] min-h-[100vh] flex flex-col px-[calc(30px+3vw)] pt-[90px]`}
        style={{
          pointerEvents: "all",
          backgroundColor: slideUpComponent
            ? projectColors[2][0]
            : projectColors[1][0],
          opacity: 1,
        }}
      >
        <img
          alt=""
          src={`${appData.baseURL}${currentProject.images.project_images[0]}`}
          className="w-[100%] h-[auto] max-h-[50vh]"
          style={{ objectFit: "cover" }}
        />
        <div className="w-[100%] flex justify-center py-[4px] klivora text-[7vw]">
          {slideUpComponent ? (
            <>
              {selectedProjectName[2] !== null ? (
                <>{appData.pages.projects[selectedProjectName[2]].title}</>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {selectedProjectName[2] !== null && selectedProjectName[1] !== null ? (
                <>{appData.pages.projects[selectedProjectName[1]].title}</>
              ) : (
                <>{appData.pages.projects[selectedProject].title}</>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
