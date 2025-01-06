import React from "react";
import useProjectsLayoutOrderState from "../../store/useProjectsLayoutOrderState";
import useProjectCoversState from "../../store/useProjectCoversState";
import { ProjectEntry } from "./Projects";

const ProjectCover = ({ projectIndex, coversReady }: { projectIndex: number, coversReady: ProjectEntry[] | null }) => {
  const { projectsLayoutOrder } = useProjectsLayoutOrderState();
  const { projectCovers } = useProjectCoversState();

  return (
    <div
      className="h-[100%] w-[100%] relative"
      style={{ backgroundColor: "transparent", overflow: "hidden" }}
    >
      {projectCovers[projectsLayoutOrder[projectIndex]].map((item: any, index: number) => {
        return (
          <div
            key={`layout-${index}`}
            className="absolute"
            style={{
              zIndex: item.z,
              aspectRatio: `1/${item.h}`,
              width: `calc(70px + ${0.6*item.w}%)`,
              left: `${item.x}%`,
              top: item.top ? `${item.y}%` : "none",
              bottom: item.top ? "none" : `${item.y}%`,
            }}
          >
            {coversReady !== null && coversReady[projectIndex].images.length > index && <img
              alt=""
              className="image w-[100%] h-[100%]"
              style={{ objectFit: "cover" }}
              src={coversReady !== null ? coversReady[projectIndex].images[index].url : ""}
            />}
          </div>
        );
      })}
    </div>
  );
};

export default ProjectCover;
