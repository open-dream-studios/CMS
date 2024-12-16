import React, { useEffect, useState } from "react";
import { IncomingPage, Page, PageProps } from "../../App";
import appData from "../../app-details.json";
import { AnimatePresence, motion } from "framer-motion";
import "./Projects.css";
import useProjectColorsState from "../../store/useProjectColorsStore";
import useSelectedProjectState from "../../store/useSelectedProjectStore";
import { useLocation } from "react-router-dom";
import ProjectCover from "./ProjectCover";
import useSelectedProjectNameState from "../../store/useSelectedProjectNameStore";
import useCanSelectProjectState from "../../store/useCanSelectProjectState";

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
  const { selectedProjectName, setSelectedProjectName } =
    useSelectedProjectNameState();
  const { projectColors, setProjectColors } = useProjectColorsState();
  const { canSelectProject, setCanSelectProject } = useCanSelectProjectState();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [coversVisible, setCoversVisible] = useState(false);
  const [titleAnimation, setTitleAnimation] = useState(true);
  const [titlesVisible, setTitlesVisible] = useState(currentPage);
  const [animateWave, setAnimateWave] = useState(false);
  const [animateWaveTrigger, setAnimateWaveTrigger] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (
      path.startsWith("/projects/") &&
      projectsList.includes(path.split("/")[2]) &&
      path.split("/").length === 3
    ) {
      const newIndex = projectsList.findIndex(
        (project) => project === path.split("/")[2]
      );
      // setSelectedProject(newIndex);
    }
  }, [location]);

  useEffect(() => {
    if (animate === true) {
      setAnimateWave(true);
      setTimeout(() => {
        setAnimateWaveTrigger(true);
      }, 200);
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
  }, [animate, currentPage, page, projectsList, selectedProject]);

  function handleProjectClick(index: number, item: any) {
    if (canSelectProject) {
      setCanSelectProject(false);
      const currentProj = selectedProject;
      setSelectedProject(index);
      setSelectedProjectName([null, currentProj, index]);
      navigate("projects/" + projects[index].link);
      const projectColorsCopy = projectColors;
      projectColorsCopy[2] = [item.background_color, item.text_color];
      projectColorsCopy[0] = [
        projects[currentProj ? currentProj : 0].background_color,
        projects[currentProj ? currentProj : 0].text_color,
      ];
      setProjectColors(projectColorsCopy);
      setTimeout(() => {
        projectColorsCopy[1] = [item.background_color, item.text_color];
        setProjectColors(projectColorsCopy);
        setCanSelectProject(true);
        setSelectedProjectName([null, index, null]);
      }, 1000);
    }
  }

  return (
    <div className="absolute h-[100vh] w-[100vw] top-0 left-0">
      <div className="fixed top-0 left-0 h-[100%] w-[100%]">
        <div
          style={{ backgroundColor: "red" }}
          className=" py-[75px] h-[100vh] min-h-[600px] md:min-h-[700px] lg:min-h-[800px] w-[auto] pl-[calc(10px+2vw)]"
        >
          <div
            className="w-[300px] sm:w-[270px] md:w-[330px] lg:w-[400px] min-h-[calc(600px*0.9)] md:min-h-[calc(700px*0.9)] lg:min-h-[calc(800px*0.9)] h-[calc((100vh-88px)*0.9)] mt-[calc((100vh-88px)*0.025)] flex items-center"
            style={{
              backgroundColor: "green",
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
                      handleProjectClick(index, item);
                    }}
                  >
                    <div className={` ${titlesVisible ? "visible" : "hidden"}`}>
                      <div className="project-container">
                        <div
                          key={index}
                          className={`${
                            selectedProject === null
                              ? "white-dim"
                              : "select-dark"
                          } project-letter  ${
                            titlesVisible && animate ? "project-reveal" : ""
                          }`}
                          style={{
                            animationDelay: animateWave
                              ? `${Math.pow(index, 0.75) * 0.045}s`
                              : "none",
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
            className="w-[calc(98vw-310px)] sm:w-[calc(98vw-280px)] md:w-[calc(98vw-340px)] lg:w-[calc(98vw-410px)] min-h-[100vh] sm:flex hidden pr-[calc(3px+3vw)] pl-[30px] pt-[100px]"
            style={{
              backgroundColor: "transparent",
              transition: "transform 2s ease-in-out",
              transform:
                selectedProject === null
                  ? "translateY(0)"
                  : "translateY(calc(-30vh))",
            }}
          >
            <div
              className="w-[100%] h-[auto] relative"
              style={{ backgroundColor: "transparent" }}
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
                    <ProjectCover projectIndex={hoveredIndex} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
