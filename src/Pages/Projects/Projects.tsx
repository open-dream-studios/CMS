import React from "react";
import { PageProps } from "../../App";
import appData from "../../app-details.json";

const Projects: React.FC<PageProps> = ({ navigate }) => {
  const projects = appData.pages.projects;

  return (
    <div
      className="w-[100vw] h-[100vw] min-h-[600px] ml-[15px] flex items-center"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white"
      }}
    >
      <div className="caster text-[calc(10px+3.8vw)] leading-[calc(12px+4.5vw)] gap-[10px]">
        {projects.map((item, index) => {
          return <div>{item.title}</div>;
        })}
      </div>
    </div>
  );
};

export default Projects;
