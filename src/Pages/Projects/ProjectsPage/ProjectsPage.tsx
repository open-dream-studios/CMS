import React, { useEffect, useRef, useState } from "react";
import { IncomingPage, Page } from "../../../App";
import useProjectColorsState from "../../../store/useProjectColorsStore";
import useSelectedProjectState from "../../../store/useSelectedProjectStore";
import appData from "../../../app-details.json";
import useSelectedProjectNameState from "../../../store/useSelectedProjectNameStore";
import useIncomingImageDimensionsState from "../../../store/useIncomingImageDimensionsState";
import useIncomingImageStylesStore from "../../../store/useIncomingImageStylesStore";
import useIncomingImageSpeedState from "../../../store/useIncomingImageSpeedState";
import useCanSelectProjectState from "../../../store/useCanSelectProjectState";

export interface ProjectsPageProps {
  navigate: (page: Page) => void;
  page: Page | IncomingPage;
  slideUpComponent: boolean;
}

export interface ImageDimension {
  width: number;
  height: number;
  src: string;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({
  navigate,
  page,
  slideUpComponent,
}) => {
  const { projectColors, setProjectColors } = useProjectColorsState();
  const { incomingSpeed, setIncomingSpeed } = useIncomingImageSpeedState();
  const { selectedProject, setSelectedProject } = useSelectedProjectState();
  const { selectedProjectName, setSelectedProjectName } =
    useSelectedProjectNameState();
  const { incomingImageDimensions, setIncomingImageDimensions } =
    useIncomingImageDimensionsState();
  const { incomingImageStyles, setIncomingImageStyles } =
    useIncomingImageStylesStore();
  const { canSelectProject, setCanSelectProject } = useCanSelectProjectState();

  const [imageDimensions, setImageDimensions] = useState<ImageDimension[]>([]);
  const scrollRef = useRef(0);
  const parallaxRefs = useRef<HTMLImageElement[]>([]);
  const projectPageRef = useRef<HTMLDivElement>(null)
  const [incomingProject, setIncomingProject] = useState<number | null>(null);
  const navigatingCurrently = useRef<boolean>(false) 

  useEffect(() => {
    if (slideUpComponent) {
      setIncomingProject(selectedProjectName[2]);
    }
  }, []);

  useEffect(() => {
    if (!slideUpComponent) {
      // window.scrollTo(0, 0);
      // scrollRef.current = 0;
    }
  }, [selectedProjectName[1]]);

  useEffect(() => {
    const updateParallax = () => {
      parallaxRefs.current.forEach((img, index) => {
        if (
          !slideUpComponent &&
          index !== 1 &&
          window.innerHeight + scrollRef.current >= img.offsetTop
        ) {
          if (img) {
            const speed = incomingSpeed[index];
            if (window.innerHeight > img.offsetTop) {
              img.style.transform = `translateY(-${scrollRef.current * speed}px)`;
              img.style.willChange = "transform";
            } else {
              const amount =
                window.innerHeight + scrollRef.current - img.offsetTop;
              img.style.transform = `translateY(-${amount * speed}px)`;
              img.style.willChange = "transform";
            }
          }
        } else {
          if (img.style.transform !== "none") {
            img.style.transform = "none";
          }
        }
      });
    };

    const handleScroll = () => {
      if (projectPageRef.current) {
        console.log(scrollRef.current, window.innerHeight, scrollRef.current + window.innerHeight, projectPageRef.current.clientHeight)
        if (scrollRef.current + window.innerHeight >= projectPageRef.current.clientHeight - 5) {
          if (!navigatingCurrently.current) {
            navigatingCurrently.current = true
            goToNextProject()
          }
        }
      }
      scrollRef.current = window.scrollY;
      requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [imageDimensions, slideUpComponent]);

  const [imageStyles, setImageStyles] = useState<
    { width: string; marginLeft: string; marginTop: string }[]
  >([]);

  useEffect(() => {
    const loadImageDimensions = async () => {
      if (incomingImageDimensions.length === 0) {
        setImageDimensions([]);
      } else {
        if (!slideUpComponent && selectedProjectName[1] !== null) {
          // window.scrollTo(0, 0);
          // scrollRef.current = 0;
          setImageDimensions(incomingImageDimensions);
          setImageStyles(incomingImageStyles);
        }
      }
    };

    loadImageDimensions();
  }, [selectedProjectName[1], slideUpComponent]);

  useEffect(() => {
    if (!slideUpComponent && selectedProjectName[2] === null) {
      // window.scrollTo(0, 0);
      // scrollRef.current = 0;
    }
  }, [selectedProjectName, slideUpComponent]);

  useEffect(() => {
    const loadImageDimensions = async () => {
      if (slideUpComponent && selectedProjectName[2] !== null) {
        const dimensions = await Promise.all(
          appData.pages.projects[
            selectedProjectName[2]
          ].images.project_images.map((item) => {
            const imgSrc = `${appData.baseURL}${item[0]}`;
            return new Promise<ImageDimension>((resolve) => {
              const img = new Image();
              img.onload = () =>
                resolve({
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  src: imgSrc,
                });
              img.src = imgSrc;
            });
          })
        );
        setImageDimensions(dimensions);
        setIncomingImageDimensions(dimensions);

        const newSpeeds = [0];
        if (dimensions.length > 0) {
          const styles = dimensions.map((img, index) => {
            const isHorizontal = img.width > img.height;
            const dynamicBaseWidth = isHorizontal ? 70 : 45;
            const dynamicWidth = dynamicBaseWidth + Math.random() * 25;
            const dynamicMarginLeft = Math.random() * (100 - dynamicWidth);
            const currentSeparation = 
              index === 2 ? -25 + Math.random() * 50 : -25 + Math.random() * 100
            if (index !== 0) {
              newSpeeds.push(Math.random() * 0.1 + 0.05);
            }

            return {
              width: `${dynamicWidth}%`,
              marginLeft: `${dynamicMarginLeft}%`,
              marginTop: index === 1 ? "0" : `${currentSeparation}px`,
            };
          });
          setImageStyles(styles);
          setIncomingImageStyles(styles);
          console.log("settingSpeed", newSpeeds);
          setIncomingSpeed(newSpeeds);
        }
      }
    };

    loadImageDimensions();
  }, [selectedProjectName[2], slideUpComponent]);

  function goToNextProject() {
    // console.log("going")
    // if (canSelectProject && selectedProjectName[1] !== null) {
    //   setCanSelectProject(false);
    //   const currentProj = selectedProject;
    //   const projects = appData.pages.projects
    //   const nextProj = selectedProjectName[1] === projects.length? 0 : selectedProjectName[1] + 1
    //   setSelectedProject(nextProj);
    //   setSelectedProjectName([null, currentProj, nextProj]);
    //   navigate("projects/" + projects[nextProj].link);
    //   const item = projects[nextProj]
    //   const projectColorsCopy = projectColors;
    //   projectColorsCopy[2] = [item.background_color, item.text_color];
    //   projectColorsCopy[0] = [
    //     projects[currentProj ? currentProj : 0].background_color,
    //     projects[currentProj ? currentProj : 0].text_color,
    //   ];
    //   setProjectColors(projectColorsCopy);
    //   setTimeout(() => {
    //     projectColorsCopy[1] = [item.background_color, item.text_color];
    //     setProjectColors(projectColorsCopy);
    //     setCanSelectProject(true);
    //     setSelectedProjectName([null, nextProj, null]);
    //     navigatingCurrently.current = false
    //   }, 1000);
    // }
  }

  if (selectedProject === null) {
    return <></>;
  }

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
        ref={projectPageRef}
        className={`absolute right-0 top-0 w-[100vw] sm:w-[calc(98vw-220px)] min-h-[100vh] md:w-[calc(98vw-250px)]  h-[auto] flex flex-col pl-[calc(30px+3vw)] pr-[calc(30px+3vw)] sm:pl-0 lg:pl-[calc(30px+3vw)] pt-[90px]`}
        style={{
          pointerEvents: "all",
          backgroundColor: slideUpComponent
            ? projectColors[2][0]
            : projectColors[1][0],
          opacity: 1,
        }}
      >
        <div className="w-[100%]">
          <img
            alt=""
            src={
              selectedProjectName[1] === null
                ? ""
                : slideUpComponent && selectedProjectName[2] !== null
                ? `${appData.baseURL}${
                    appData.pages.projects[selectedProjectName[2]].images
                      .project_images[0][0]
                  }`
                : `${appData.baseURL}${
                    appData.pages.projects[selectedProjectName[1]].images
                      .project_images[0][0]
                  }`
            }
            className="w-[100%] aspect-[1.55/1] max-h-[50vh]"
            style={{ objectFit: "cover", backgroundColor: "white" }}
          />
          {selectedProjectName[1] !== null && (
            <div className="w-[100%] flex justify-center py-[4px] klivora text-[7vw]">
              {slideUpComponent ? (
                <>
                  {incomingProject === null ? (
                    <></>
                  ) : (
                    <>{appData.pages.projects[incomingProject].title}</>
                  )}
                </>
              ) : (
                <>{appData.pages.projects[selectedProjectName[1]].title}</>
              )}
            </div>
          )}
        </div>
        <div className="w-[100%] flex justify-center">
          <div
            className="w-[100%] flex flex-col h-[auto] mb-[65px]"
            style={{ backgroundColor: "transparent", maxWidth: "900px" }}
          >
            {imageDimensions.map((img, index) => {
              return (
                <div key={index}>
                  {index !== 0 && (
                    <img
                      ref={(el) => (parallaxRefs.current[index] = el!)}
                      alt=""
                      src={img.src}
                      style={{
                        objectFit: "cover",
                        zIndex: 105 + index,
                        ...imageStyles[index],
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
