import React from "react";
import { IncomingPage, Page } from "../../../App";

export interface ProjectsPageProps {
  navigate: (page: Page) => void;
  page: Page | IncomingPage;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ navigate, page }) => {
  return (
    <div
      className={`absolute right-0 top-0 w-[calc(98vw-190px)] sm:w-[calc(98vw-220px)] md:w-[calc(98vw-250px)] min-h-[100vh] sm:flex hidden px-[calc(30px+3vw)] pt-[100px]`}
      style={{ 
            pointerEvents: "all",
        backgroundColor: "lightblue", opacity: 1 }}
    >
      Hi
    </div>
  );
};

export default ProjectsPage;
