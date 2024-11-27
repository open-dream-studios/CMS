import React from "react";
import { IncomingPage, Page } from "../../../App";
import useProjectColorsState from "../../../store/useProjectColorsStore";
import useProjectColorsNextState from "../../../store/useProjectColorsNextStore";

export interface ProjectsPageProps {
  navigate: (page: Page) => void;
  page: Page | IncomingPage;
  slideUpComponent: boolean;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ navigate, page, slideUpComponent }) => {
  const { projectColors, setProjectColors } = useProjectColorsState();
  const { projectColorsNext, setProjectColorsNext } = useProjectColorsNextState();

  return (
    <div
      className={`right-0 top-0 w-[100vw] min-h-[100vh] sm:flex hidden px-[calc(30px+3vw)] pt-[100px]`}
      style={{
        pointerEvents: "none",
        backgroundColor: "transparent",
        opacity: 1,
      }}
    >
      <div
        className={`absolute right-0 top-0 w-[calc(98vw-190px)] sm:w-[calc(98vw-220px)] md:w-[calc(98vw-250px)] min-h-[100vh] sm:flex hidden px-[calc(30px+3vw)] pt-[100px]`}
        style={{
          pointerEvents: "all",
          backgroundColor: slideUpComponent ? projectColorsNext[0] : projectColors[0],
          opacity: 1,
        }}
      >
        Hi
      </div>
    </div>
  );
};

export default ProjectsPage;
