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
import useProjectColorsState from "../../store/useProjectColorsStore";
import useProjectColorsNextState from "../../store/useProjectColorsNextStore";
import useProjectColorsPrevState from "../../store/useProjectColorsPrevStore";
import useSelectedProjectState from "../../store/useSelectedProjectStore";

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
  const { selectedProject, setSelectedProject } = useSelectedProjectState();
  const { projectColors, setProjectColors } = useProjectColorsState();
  const { projectColorsNext, setProjectColorsNext } =
    useProjectColorsNextState();
  const { projectColorsPrev, setProjectColorsPrev } =
    useProjectColorsPrevState();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [coversVisible, setCoversVisible] = useState(false);
  const [titleAnimation, setTitleAnimation] = useState(true);
  const [titlesVisible, setTitlesVisible] = useState(currentPage);
  const [animateWave, setAnimateWave] = useState(false);
  const [animateWaveTrigger, setAnimateWaveTrigger] = useState(false);
  const [canSelectProject, setCanSelectProject] = useState(true);

  useEffect(() => {
    if (animate === true) {
      setAnimateWave(true);
      setTimeout(()=>{
        setAnimateWaveTrigger(true)
      },200)
    }

    if (currentPage) {
      if (page !== null) {
        const targetPage = page.split("/")[1];
        if (projectsList.includes(targetPage)) {
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
  }, [
    animate,
    currentPage,
    page,
    projectsList,
    selectedProject,
    setSelectedProject,
  ]);

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
      <div className="py-[75px] h-[100vh] min-h-[600px] md:min-h-[700px] lg:min-h-[800px] w-[auto] pl-[calc(10px+2vw)]">
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
                  style={{ transition: "opacity 0.5s ease-in-out" }}
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
                    if (canSelectProject) {
                      setCanSelectProject(false)
                    const currentProj = selectedProject;
                    setSelectedProject(index);
                    navigate("projects/" + projects[index].link);

                    setProjectColorsNext([
                      item.background_color,
                      item.text_color,
                    ]);
                    setProjectColorsPrev([
                      projects[currentProj ? currentProj : 0].background_color,
                      projects[currentProj ? currentProj : 0].text_color,
                    ]);
                    setTimeout(() => {
                      setProjectColors([
                        item.background_color,
                        item.text_color,
                      ]);
                      setCanSelectProject(true)
                    }, 1000);
                    }
                  }}
                >
                  <div className={` ${titlesVisible ? "visible" : "hidden"}`}>
                    <div className="project-container">
                      <div
                        key={index}
                        className={`${
                          selectedProject === null ? "white-dim" : "select-dark"
                        } project-letter  ${
                          titlesVisible && animate ? "project-reveal" : ""
                        }`}
                        style={{
                          animationDelay: animateWave? `${Math.pow(index, 0.75) * 0.045}s` : "none",
                          color: animate
                            ? "black"
                            : selectedProject === index
                            ? "black"
                            : "#747474",
                          transform: animate
                            ? "translateY(%100)"
                            : "translateY(0)",
                        }}
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
