import React, { useEffect, useState } from "react";
import { IncomingPage, Page, PageProps } from "../../App";
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
import ProjectsPage from "./ProjectsPage/ProjectsPage";

export interface ProjectsPageProps {
  navigate: (page: Page) => void;
  page: Page | IncomingPage;
  currentPage: boolean;
  animate: boolean;
}

const Projects: React.FC<ProjectsPageProps> = ({
  navigate,
  page,
  currentPage,
  animate,
}) => {
  const projects = appData.pages.projects;
  const projectsList = projects.map((item) => item.link);
  const projects_count = appData.pages.projects.length;
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [coversVisible, setCoversVisible] = useState(false);
  const [titleAnimation, setTitleAnimation] = useState(true);
  const [titlesVisible, setTitlesVisible] = useState(currentPage);
  const [animateWave, setAnimateWave] = useState(false);

  useEffect(() => {
    console.log(animate)
    if (animate === true) {
      setAnimateWave (true)
    }

    if (currentPage) {
      if (page !== null) {
        const targetPage = page.split("/")[1];
        if (projectsList.includes(targetPage)) {
          setSelectedProject(
            projectsList.findIndex((item) => item === targetPage)
          );
          setHoveredIndex(null);
          setCoversVisible(false);
          setTitleAnimation(false);
        }
      } else {
        setTitleAnimation(true);
        setCoversVisible(true);
        setTitlesVisible(true);
      }
    } 
  }, [animate, currentPage, page, projectsList]);

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
    <div className="min-h-[100vh] w-[100vw] flex">
      <div
        className="mt-[75px] h-[calc(100vh-75px)] min-h-[600px] md:min-h-[700px] lg:min-h-[800px] w-[auto] pl-[calc(10px+2vw)]"
        style={{
          backgroundColor: "transparent",
        }}
      >
        <div
          className="w-[300px] sm:w-[350px] md:w-[400px] min-h-[calc(600px*0.9)] md:min-h-[calc(700px*0.9)] lg:min-h-[calc(800px*0.9)] h-[calc((100vh-88px)*0.9)] mt-[calc((100vh-88px)*0.025)] flex items-center"
          style={{
            backgroundColor: "transparent",
          }}
        >
          <div
            style={{
              transform: selectedProject === null ? "none" : "scale(0.6)",
              transition: titleAnimation 
                ? "transform 1s cubic-bezier(0.6, 0.05, 0.3, 1"
                : "none",
              transformOrigin: "left",
            }}
            className="caster cursor-pointer flex flex-col"
          >
            {projects.map((item, index) => {
              return (
                <div
                  className={`text-[30px] leading-[38px] md:text-[37px] md:leading-[46px] lg:text-[46px] lg:leading-[59px]`}
                  style={{transition: "opacity 0.5s ease-in-out"}}
                  key={index}
                  onMouseEnter={() => {
                    if (selectedProject === null) {
                      setHoveredIndex(index);
                    }
                  }}
                  onMouseLeave={() => {
                    if (selectedProject === null) {
                      setHoveredIndex(null);
                    }
                  }}
                  onClick={() => {
                    setSelectedProject(index);
                    navigate("projects/" + projects[index].link);
                  }}
                >
                  <div
                    className={` ${
                      titlesVisible ? "visible" : "hidden"
                    }`}
                  >
                    <div className="project-container">
                      <div
                        key={index}
                        className={`${selectedProject === null ? "white-dim" : "select-dark"} project-letter  ${
                          titlesVisible && animateWave ? "project-reveal" : ""
                        }`}
                        style={{
                          // animationDelay: animateWave? `${Math.pow(index, 0.75) * 0.045}s` : "none", 
                          color: animateWave? "black" : selectedProject === index ? "black" : "#747474",
                          transform: animateWave ? "translateY(%100)" :  "translateY(0)"}}
                      >
                        {item.title}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {coversVisible && (
        <div
          className="w-[calc(98vw-310px)] sm:w-[calc(98vw-360px)] md:w-[calc(98vw-410px) min-h-[100vh] sm:flex hidden px-[calc(30px+3vw)] pt-[100px]"
          style={{ backgroundColor: "lightblue" }}
        >
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
        </div>
      )}
    </div>
  );
};

export default Projects;
