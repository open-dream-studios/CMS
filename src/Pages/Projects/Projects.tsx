import React, { useState } from "react";
import { PageProps } from "../../App";
import appData from "../../app-details.json";
import Cover1 from "./ProjectCovers/Cover1";
import Cover2 from "./ProjectCovers/Cover2";
import Cover3 from "./ProjectCovers/Cover3";
import Cover4 from "./ProjectCovers/Cover4";
import Cover6 from "./ProjectCovers/Cover6";
import Cover5 from "./ProjectCovers/Cover5";
import Cover7 from "./ProjectCovers/Cover7";
import Cover8 from "./ProjectCovers/Cover8";
import Cover9 from "./ProjectCovers/Cover9";
import Cover10 from "./ProjectCovers/Cover10";
import Cover11 from "./ProjectCovers/Cover11";
import { AnimatePresence, motion } from "framer-motion";
import "./Projects.css";

const Projects: React.FC<PageProps> = ({ navigate }) => {
  const projects = appData.pages.projects;
  const projects_count = appData.pages.projects.length;
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const covers = [
    Cover1,
    Cover2,
    Cover3,
    Cover4,
    Cover5,
    Cover6,
    Cover7,
    Cover8,
    Cover9,
    Cover10,
    Cover11,
  ];

  return (
    <div className="min-h-[100vh] w-[100vw] flex flex-row">
      <div
        className="mt-[75px] h-[calc(100vh-75px)] min-h-[600px] md:min-h-[700px] lg:min-h-[800px] w-[auto] pl-[calc(10px+2vw)]"
        style={{
          backgroundColor: "pink",
        }}
      >
        <div
          className="w-[300px] sm:w-[350px] md:w-[400px] container-query min-h-[calc(600px*0.9)] md:min-h-[calc(700px*0.9)] lg:min-h-[calc(800px*0.9)] h-[calc((100vh-88px)*0.9)] mt-[calc((100vh-88px)*0.025)] flex items-center"
          style={{
            backgroundColor: "red",
          }}
        >
          <div
            style={{
              transform: selectedProject === null ? "none" : "scale(0.5)",
              transition: "transform 1s cubic-bezier(0.6, 0.05, 0.3, 1",
              transformOrigin: "left",
            }}
            className="caster cursor-pointer"
          >
            {projects.map((item, index) => {
              return (
                <div
                  className="white-dim text-[11cqw] leading-[14cqw]"
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedProject(index)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="min-h-[100vh] sm:flex hidden px-[calc(30px+3vw)] pt-[100px]"
        style={{ backgroundColor: "darkgreen", flex: 1 }}
      >
        {selectedProject === null && (
          <div
            className="w-[100%] h-[auto] relative"
            style={{ backgroundColor: "blue" }}
          >
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  {React.createElement(covers[hoveredIndex])}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
