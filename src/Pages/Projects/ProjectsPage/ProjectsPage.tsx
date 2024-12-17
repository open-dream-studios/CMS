import React, { useEffect, useRef, useState } from "react";
import { IncomingPage, Page, ProjectOutputItem } from "../../../App";
import useProjectColorsState from "../../../store/useProjectColorsStore";
import useSelectedProjectState from "../../../store/useSelectedProjectStore";
import useSelectedProjectNameState from "../../../store/useSelectedProjectNameStore";
import useIncomingImageDimensionsState from "../../../store/useIncomingImageDimensionsState";
import useIncomingImageStylesStore from "../../../store/useIncomingImageStylesStore";
import useIncomingImageSpeedState from "../../../store/useIncomingImageSpeedState";
import useCanSelectProjectState from "../../../store/useCanSelectProjectState";
import { debounce } from "lodash";
import useProjectAssetsStore from "../../../store/useProjectAssetsStore";

export interface ProjectsPageProps {
  navigate: (page: Page) => void;
  page: Page | IncomingPage;
  slideUpComponent: boolean;
}

interface ImageDimension {
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
  const projectPageRef = useRef<HTMLDivElement>(null);
  const [incomingProject, setIncomingProject] = useState<number | null>(null);
  const navigatingCurrently = useRef<boolean>(false);
  const [canScroll, setCanScroll] = useState(true);

  const [projectsList, setProjectsList] = useState<string[]>([]);
  const { projectAssets, setProjectAssets } = useProjectAssetsStore();
  const coversRef = useRef<ProjectOutputItem[] | null>(null);

  useEffect(() => {
  if (
    projectAssets !== null &&
    projectAssets["projects"] &&
    Array.isArray(projectAssets["projects"]) &&
    projectAssets["projects"].length > 0
  ) { 
      const coversList = projectAssets["projects"] as ProjectOutputItem[]
      const newProjectsList = coversList.map(item => item.title.replace("_", ""))
      setProjectsList(newProjectsList)
      coversRef.current = coversList
    }
  }, [projectAssets]);

  useEffect(() => {
    if (slideUpComponent) {
      setIncomingProject(selectedProjectName[2]);
    }
  }, []);

  useEffect(() => {
    if (coversRef.current !== null) {
      if (
        imageDimensions.length === 0 &&
        imageStyles.length === 0 &&
        incomingImageDimensions.length !== 0 &&
        incomingImageStyles.length !== 0
      ) {
        setImageDimensions(incomingImageDimensions);
        setImageStyles(incomingImageStyles);
      }

      if (selectedProjectName[1] !== null) {
        const projectColorsCopy = projectColors;
        projectColorsCopy[1] = [
          coversRef.current[selectedProjectName[1]].bg_color,
          coversRef.current[selectedProjectName[1]].text_color,
        ];
        setProjectColors(projectColorsCopy);
      }
    }
  }, [incomingImageDimensions, incomingImageStyles, coversRef.current]);

  useEffect(() => {
    const updateParallax = () => {
      parallaxRefs.current.forEach((img, index) => {
        if (
          !slideUpComponent &&
          index !== 1 &&
          img !== null &&
          window.innerHeight + scrollRef.current >= img.offsetTop
        ) {
          if (img) {
            const speed = incomingSpeed[index];
            if (window.innerHeight > img.offsetTop) {
              img.style.transform = `translateY(-${
                scrollRef.current * speed
              }px)`;
              img.style.willChange = "transform";
            } else {
              const amount =
                window.innerHeight + scrollRef.current - img.offsetTop;
              img.style.transform = `translateY(-${amount * speed}px)`;
              img.style.willChange = "transform";
            }
          }
        } else {
          if (img !== null && img.style.transform !== "none") {
            img.style.transform = "none";
          }
        }
      });
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      requestAnimationFrame(updateParallax);
    };

    const debouncedHandleScroll = debounce(() => {
      if (
        coversRef.current !== null &&
        projectPageRef.current &&
        scrollRef.current + window.innerHeight >=
          projectPageRef.current.clientHeight - 5
      ) {
        if (canSelectProject && !navigatingCurrently.current) {
          const nextProject =
            selectedProjectName[1] === null ||
            selectedProjectName[1] === coversRef.current.length - 1
              ? 0
              : selectedProjectName[1] + 1;
          navigatingCurrently.current = true;
          handleProjectClick(nextProject, coversRef.current[nextProject]);
        }
      }
    }, 10);

    const combinedScrollHandler = () => {
      handleScroll();
      debouncedHandleScroll();
    };

    window.addEventListener("scroll", combinedScrollHandler);

    return () => {
      window.removeEventListener("scroll", combinedScrollHandler);
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
    const preventScroll = (e: Event) => e.preventDefault();
    if (!canScroll) {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("scroll", preventScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("scroll", preventScroll);
    }

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("scroll", preventScroll);
    };
  }, [canScroll]);

  const loadImageDimensions = async () => {
    if (coversRef.current !== null) {
      let dimensions: ImageDimension[] = [];

      if (slideUpComponent && selectedProjectName[2] !== null) {
        console.log(
          coversRef.current,
          selectedProjectName[2],
          coversRef.current[selectedProjectName[2]],
          coversRef.current[selectedProjectName[2]].images
        );
        dimensions = await Promise.all(
          coversRef.current[selectedProjectName[2]].images.map((item) => {
            return new Promise<ImageDimension>((resolve) => {
              const img = new Image();
              img.onload = () =>
                resolve({
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  src: item,
                });
              img.src = item;
            });
          })
        );
        setImageDimensions(dimensions);
        setIncomingImageDimensions(dimensions);
      }
      if (
        selectedProjectName[1] !== null &&
        incomingImageDimensions.length === 0 &&
        imageDimensions.length === 0
      ) {
        dimensions = await Promise.all(
          coversRef.current[selectedProjectName[1]].images.map((item) => {
            return new Promise<ImageDimension>((resolve) => {
              const img = new Image();
              img.onload = () =>
                resolve({
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  src: item,
                });
              img.src = item;
            });
          })
        );
        setImageDimensions(dimensions);
        setIncomingImageDimensions(dimensions);
      }

      const newSpeeds = [0];
      if (dimensions.length > 0) {
        const styles = dimensions.map((img, index) => {
          const isHorizontal = img.width > img.height;
          const dynamicBaseWidth = isHorizontal ? 70 : 45;
          const dynamicWidth = dynamicBaseWidth + Math.random() * 25;
          const dynamicMarginLeft = Math.random() * (100 - dynamicWidth);
          const currentSeparation =
            index === 2 ? -25 + Math.random() * 50 : -25 + Math.random() * 100;
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
        setIncomingSpeed(newSpeeds);
      }
    }
  };

  useEffect(() => {
    if (slideUpComponent) {
      loadImageDimensions();
    }
  }, [slideUpComponent]);

  useEffect(() => {
    if (
      incomingImageDimensions.length === 0 &&
      imageDimensions.length === 0 &&
      coversRef.current !== null &&
      selectedProjectName[1] !== null
    ) {
      loadImageDimensions();
    }
  }, [coversRef.current, selectedProjectName]);

  if (selectedProject === null) {
    return <></>;
  }

  function handleProjectClick(index: number, item: any) {
    if (canSelectProject && coversRef.current !== null) {
      setCanSelectProject(false);
      setCanScroll(false);
      const currentProj = selectedProjectName[1];
      const projects = coversRef.current;
      setSelectedProject(index);
      setSelectedProjectName([null, currentProj, index]);
      navigate("projects/" + projects[index].title.replace("_", ""));
      const projectColorsCopy = projectColors;
      projectColorsCopy[2] = [item.background_color, item.text_color];
      projectColorsCopy[0] = [
        projects[currentProj ? currentProj : 0].bg_color,
        projects[currentProj ? currentProj : 0].text_color,
      ];
      setProjectColors(projectColorsCopy);
      setTimeout(() => {
        projectColorsCopy[1] = [item.background_color, item.text_color];
        setProjectColors(projectColorsCopy);
        setCanSelectProject(true);
        setSelectedProjectName([null, index, null]);
        navigatingCurrently.current = false;
        window.scrollTo(0, 0);
        scrollRef.current = 0;
      }, 1000);
      setTimeout(() => {
        setCanScroll(true);
      }, 1500);
    }
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
        <div className="w-[100%] pl-[5px]">
          <img
            alt=""
            src={
              selectedProjectName[1] !== null && coversRef.current !== null
                ? slideUpComponent && selectedProjectName[2] !== null
                  ? coversRef.current[selectedProjectName[2]].images[0]
                  : coversRef.current[selectedProjectName[1]].images[0]
                : ""
            }
            className="w-[100%] aspect-[1.55/1] max-h-[50vh]"
            style={{ objectFit: "cover", backgroundColor: "pink" }}
          />

          <div
            className="w-[100%] py-[4px] aspect-[6/1] flex justify-center klivora text-[7vw]"
            style={{ backgroundColor: "transparent" }}
          >
            {slideUpComponent ? (
              <>
                {incomingProject !== null && coversRef.current !== null ? (
                  <>
                    {coversRef.current[incomingProject].title
                      .split("_")
                      .map(
                        (item) => item.charAt(0).toUpperCase() + item.slice(1)
                      )
                      .join(" ")}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {selectedProjectName[1] !== null &&
                  coversRef.current !== null &&
                  coversRef.current[selectedProjectName[1]].title
                    .split("_")
                    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
                    .join(" ")}
              </>
            )}
          </div>
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
