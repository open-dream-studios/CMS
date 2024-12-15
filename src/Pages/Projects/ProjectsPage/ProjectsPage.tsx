import React, { useEffect, useRef, useState } from "react";
import { IncomingPage, Page } from "../../../App";
import useProjectColorsState from "../../../store/useProjectColorsStore";
import useSelectedProjectState from "../../../store/useSelectedProjectStore";
import appData from "../../../app-details.json";
import useSelectedProjectNameState from "../../../store/useSelectedProjectNameStore";
import useIncomingImageDimensionsState from "../../../store/useIncomingImageDimensionsState";
import useIncomingImageStylesStore from "../../../store/useIncomingImageStylesStore";

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
  const { selectedProject, setSelectedProject } = useSelectedProjectState();
  const { selectedProjectName, setSelectedProjectName } =
    useSelectedProjectNameState();
  const { incomingImageDimensions, setIncomingImageDimensions } = useIncomingImageDimensionsState();
  const { incomingImageStyles, setIncomingImageStyles } = useIncomingImageStylesStore();

  const [imageDimensions, setImageDimensions] = useState<ImageDimension[]>([]);
  const scrollRef = useRef(0);
  const parallaxRefs = useRef<HTMLImageElement[]>([]);
  const parallaxSpeeds = useRef<number[]>([]);

  useEffect(() => {
    parallaxSpeeds.current = imageDimensions.map(
      () => Math.random() * 0.2 + 0.05
    );
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      requestAnimationFrame(updateParallax);
    };

    const updateParallax = () => {
      parallaxRefs.current.forEach((img, index) => {
        if (
          index !== 1 &&
          window.innerHeight + scrollRef.current >= img.offsetTop
        ) {
          if (img) {
            const speed = parallaxSpeeds.current[index];
            const amount =
              window.innerHeight + scrollRef.current - img.offsetTop;
            img.style.transform = `translateY(-${amount * speed}px)`;
            img.style.willChange = "transform";
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [imageDimensions]);

  const [imageStyles, setImageStyles] = useState<
    { width: string; marginLeft: string; marginTop: string }[]
  >([]);

  // useEffect(() => {
  //   if (imageDimensions.length > 0) {
  //     const styles = imageDimensions.map((img, index) => {
  //       const isHorizontal = img.width > img.height;
  //       const dynamicBaseWidth = isHorizontal ? 70 : 45;
  //       const dynamicWidth = dynamicBaseWidth + Math.random() * 25;
  //       const dynamicMarginLeft = Math.random() * (100 - dynamicWidth);
  //       const currentSeparation = -25 + Math.random() * 100;

  //       return {
  //         width: `${dynamicWidth}%`,
  //         marginLeft: `${dynamicMarginLeft}%`,
  //         marginTop: index === 1 ? "0" : `${currentSeparation}px`,
  //       };
  //     });
  //     setImageStyles(styles);
  //   }
  // }, [imageDimensions]);

  useEffect(() => {
    const loadImageDimensions = async () => {
      if (incomingImageDimensions.length === 0) {
        setImageDimensions([]);
      } 
      
      else {
      
      if (!slideUpComponent && selectedProjectName[1] !== null) {
        window.scrollTo(0, 0);
        scrollRef.current = 0;

        // const dimensions = await Promise.all(
        //   appData.pages.projects[
        //     selectedProjectName[1]
        //   ].images.project_images.map((item) => {
        //     const imgSrc = `${appData.baseURL}${item[0]}`;
        //     return new Promise<ImageDimension>((resolve) => {
        //       const img = new Image();
        //       img.onload = () =>
        //         resolve({
        //           width: img.naturalWidth,
        //           height: img.naturalHeight,
        //           src: imgSrc,
        //         });
        //       img.src = imgSrc;
        //     });
        //   })
        // );
        // setImageDimensions(dimensions);
        setImageDimensions(incomingImageDimensions);
        setImageStyles(incomingImageStyles)
      }


      }
    };

    loadImageDimensions();
  }, [selectedProjectName[1], slideUpComponent]);

  useEffect(() => {
    const loadImageDimensions = async () => {
      if (slideUpComponent && selectedProjectName[2] !== null) {
        window.scrollTo(0, 0);
        scrollRef.current = 0;

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






    if (dimensions.length > 0) {
      const styles = dimensions.map((img, index) => {
        const isHorizontal = img.width > img.height;
        const dynamicBaseWidth = isHorizontal ? 70 : 45;
        const dynamicWidth = dynamicBaseWidth + Math.random() * 25;
        const dynamicMarginLeft = Math.random() * (100 - dynamicWidth);
        const currentSeparation = -25 + Math.random() * 100;

        return {
          width: `${dynamicWidth}%`,
          marginLeft: `${dynamicMarginLeft}%`,
          marginTop: index === 1 ? "0" : `${currentSeparation}px`,
        };
      });
      setImageStyles(styles);
      setIncomingImageStyles(styles);
    }



      }
    };

    loadImageDimensions();
  }, [selectedProjectName[2], slideUpComponent]);

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
        className={`absolute right-0 top-0 w-[100vw] sm:w-[calc(98vw-220px)] min-h-[100vh] md:w-[calc(98vw-250px)]  h-[auto] flex flex-col pl-[calc(30px+3vw)] pr-[calc(30px+3vw)] sm:pl-0 lg:pl-[calc(30px+3vw)] pt-[90px]`}
        style={{
          pointerEvents: "all",
          backgroundColor: slideUpComponent
            ? projectColors[2][0]
            : projectColors[1][0],
          opacity: 1,
        }}
      >
        <div
          className="w-[100%] aspect-[1.55/1] max-h-[50vh]"
          style={{ backgroundColor: "white" }}
        >
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
            className="w-[100%] h-[100%]"
            style={{ objectFit: "cover" }}
          />
          <div className="w-[100%] flex justify-center py-[4px] klivora text-[7vw]">
            {slideUpComponent ? (
              <>
                {selectedProjectName[2] !== null ? (
                  <>{appData.pages.projects[selectedProjectName[2]].title}</>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {selectedProjectName[2] !== null &&
                selectedProjectName[1] !== null ? (
                  <>{appData.pages.projects[selectedProjectName[1]].title}</>
                ) : (
                  <>{appData.pages.projects[selectedProject].title}</>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-[100%] flex justify-center mt-[60px]">
          <div
            className="w-[100%] flex flex-col h-[auto] my-[65px]"
            style={{ backgroundColor: "red", maxWidth: "900px" }}
          >
            {imageDimensions.map((img, index) => {
              // const isHorizontal = img.width > img.height;
              // const dynamicBaseWidth = isHorizontal ? 70 : 45;
              // const dynamicWidth = dynamicBaseWidth + Math.random() * 25;
              // const dynamicMarginLeft = Math.random() * (100 - dynamicWidth);
              // const currentSeparation = -25 + Math.random() * 100;

              return (
                <div key={index}>
                  {index !== 0 && (
                    <img
                      ref={(el) => (parallaxRefs.current[index] = el!)}
                      alt=""
                      src={img.src}
                      style={{
                        objectFit: "cover",
                        // width: `${dynamicWidth}%`,
                        // marginTop: index !== 1 ? currentSeparation : 0,
                        // marginLeft: `${dynamicMarginLeft}%`,
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
