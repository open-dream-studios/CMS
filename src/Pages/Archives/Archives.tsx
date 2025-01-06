import React, { useEffect, useRef, useState } from "react";
import { Page } from "../../App";
import Slider from "../../Components/Slider/Slider";
// import ArchivesDisplay from "../../Components/ArchivesDisplay/ArchivesDisplay";
import "./Archives.css";
import Hero from "../../Components/Slider/Hero/Hero";
import useCurrentNavColorState from "../../store/useCurrentNavColorStore";
import { IoPlayCircleOutline } from "react-icons/io5";
import useSelectedArchiveGroupStore from "../../store/useSelectedArchiveGroupStore";
import usePreloadedImagesStore from "../../store/usePreloadedImagesStore";
import useProjectAssetsStore from "../../store/useProjectAssetsStore";
import { isColor } from "../Admin/Admin";

type ArchivesPageProps = {
  navigate: (page: Page) => void;
  slideUpComponent: boolean;
};

export type ArchivesEntryImage = {
  title: string;
  index: number;
  url: string;
};

export type ArchivesEntry = {
  bg_color: string;
  id: string;
  index: number;
  title: string;
  images: ArchivesEntryImage[];
};

const Archives: React.FC<ArchivesPageProps> = ({
  navigate,
  slideUpComponent,
}) => {
  const [isRevealing1, setIsRevealing1] = useState(true);
  const [dropdown1Display, setDropdown1Display] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [borderRadius, setBorderRadius] = useState("50%");
  const [slideOpen, setSlideOpen] = useState(true);
  const { currentNavColor, setCurrentNavColor } = useCurrentNavColorState();
  const { selectedArchiveGroup, setSelectedArchiveGroup } =
    useSelectedArchiveGroupStore();
  const [imageDisplayOpen, setImageDisplayOpen] = useState<boolean>(false);
  const [currentDisplayBG, setCurrentDisplayBG] = useState<string>("white");
  const closeIconRef = useRef<HTMLDivElement>(null);
  const playIconRef = useRef<HTMLDivElement>(null);
  const { projectAssets, setProjectAssets } = useProjectAssetsStore();
  const { preloadedImages, setPreloadedImages } = usePreloadedImagesStore();
  const archivesRef = useRef<ArchivesEntry[] | null>(null);

  const [bgColors, setbgColors] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const displayContainerRef = useRef<HTMLDivElement>(null);
  const bgColorRef = useRef("white");
  const [arrowSRC, setArrowSRC] = useState<string>("");

  useEffect(() => {
    const project = projectAssets as any;
    if (
      project !== null &&
      project["archives"] &&
      Array.isArray(project["archives"]) &&
      project["archives"].length > 0
    ) {
      const archivesOutput = project["archives"] as ArchivesEntry[];
      archivesRef.current = archivesOutput;
      const newbgColors = archivesOutput.map((item) =>
        validateColor(item.bg_color)
      );
      setbgColors(newbgColors);
      bgColorRef.current = validateColor(newbgColors[0]);
      if (containerRef.current) {
        containerRef.current.style.backgroundColor = validateColor(
          newbgColors[0]
        );
      }

      setArrowSRC(
        `https://raw.githubusercontent.com/JosephGoff/js-portfolio/refs/heads/master/public/assets/icons/arrow1.png`
      );
    }
  }, [projectAssets]);

  useEffect(() => {
    setTimeout(() => {
      if (!slideUpComponent) {
        setSlideOpen(false);
      }
    }, 1000);

    setIsRevealing1(true);
    setIsVisible(true);
    setDropdown1Display(true);

    // document.body.style.overflow = "hidden";
    // return () => {
    //   document.body.style.overflow = "auto";
    // };
  }, []);

  const duration = 1200;

  const customScroll = (container: HTMLElement, targetY: number) => {
    const startY = container.scrollTop;
    const distance = targetY - startY;
    const startTime = performance.now();

    const scroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1); // Ensure it doesn't exceed 1
      const ease = easeInOutCubic(progress); // Apply easing

      container.scrollTop = startY + distance * ease; // Scroll to the appropriate Y position

      if (progress < 1) {
        requestAnimationFrame(scroll); // Continue scrolling until done
      }
    };

    requestAnimationFrame(scroll);
  };

  // Easing function for smooth acceleration and deceleration
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // // Custom scroll function for any target position
  // const duration = 1200;
  // const customScroll = (targetY: any) => {
  //   const startY = window.pageYOffset;
  //   const distance = targetY - startY;
  //   const startTime = performance.now();

  //   const scroll = (currentTime: any) => {
  //     const timeElapsed = currentTime - startTime;
  //     const progress = Math.min(timeElapsed / duration, 1); // Ensure it doesn't exceed 1
  //     const ease = easeInOutCubic(progress); // Apply easing

  //     window.scrollTo(0, startY + distance * ease); // Scroll to the appropriate Y position

  //     if (progress < 1) {
  //       requestAnimationFrame(scroll); // Continue scrolling until done
  //     }
  //   };

  //   requestAnimationFrame(scroll);
  // };

  // // Easing function for smooth acceleration and deceleration
  // const easeInOutCubic = (t: any) => {
  //   return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  // };

  // Scroll Down function (1.2 seconds long)
  // const scrollDown = () => {
  //   customScroll(window.innerHeight); // Scroll down to the viewport height
  // };

  const handleArchiveGroupClick = (item: number) => {
    setSelectedArchiveGroup(item);
    setImageDisplayOpen(true);
    setTimeout(() => {
      if (closeIconRef.current && playIconRef.current) {
        closeIconRef.current.style.opacity = "1";
        playIconRef.current.style.opacity = "1";
      }
    }, 300);
  };

  const handleCloseArchiveGroup = () => {
    setImageDisplayOpen(false);

    setTimeout(() => {
      setSelectedArchiveGroup(null);
      if (closeIconRef.current && playIconRef.current) {
        closeIconRef.current.style.opacity = "0";
        playIconRef.current.style.opacity = "0";
      }
    }, 1000);
  };

  function validateColor(input: string) {
    const isColorName = (color: string) => {
      const testElement = document.createElement("div");
      testElement.style.color = color;
      return testElement.style.color !== "";
    };
    const isHexCode = (color: string) =>
      /^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(color);
    if (isColorName(input)) {
      return input;
    }
    if (isHexCode(input)) {
      return input.startsWith("#") ? input : `#${input}`;
    }
    return "white";
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const screenHeight = window.innerHeight;
      const gapHeight = screenHeight * 0.2; // 20vh gap

      // Effective height of each "page" including the gap
      const totalPageHeight = screenHeight + gapHeight;

      // Get the index of the page currently in view
      const currentPage = Math.floor(scrollTop / totalPageHeight);
      const nextPage = currentPage + 1;

      const progress =
        (scrollTop - currentPage * totalPageHeight) / screenHeight;

      // Calculate interpolated color between the current and the next page
      const currentColor =
        bgColors[currentPage] || bgColors[bgColors.length - 1];
      const nextColor = bgColors[nextPage] || bgColors[bgColors.length - 1];
      const interpolatedColor = interpolateColor(
        currentColor,
        nextColor,
        Math.max(0, Math.min(1, progress)) // Clamp progress between 0 and 1
      );

      // Apply the background color
      bgColorRef.current = interpolatedColor;
      containerRef.current.style.backgroundColor = interpolatedColor;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [bgColors]);

  const interpolateColor = (color1: string, color2: string, factor: number) => {
    const [r1, g1, b1] = parseColor(color1);
    const [r2, g2, b2] = parseColor(color2);

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const parseColor = (color: string): [number, number, number] => {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) throw new Error("Failed to create canvas context");

    ctx.fillStyle = color; // Set the color
    const computedColor = ctx.fillStyle; // Get the computed color (browser-standardized)

    // Convert to `rgb(r, g, b)` format if it's in hex
    if (computedColor.startsWith("#")) {
      const bigint = parseInt(computedColor.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    }

    // Match RGB components from `rgb()` format
    const rgb = computedColor.match(/\d+/g);
    if (!rgb || rgb.length < 3) {
      throw new Error(`Invalid color format: ${computedColor}`);
    }

    return [parseInt(rgb[0], 10), parseInt(rgb[1], 10), parseInt(rgb[2], 10)];
  };

  const extractImgColor = (imgName: string) => {
    if (imgName.split("--").length > 1) {
      const color = imgName.split("--").pop() || "white";
      if (isColor(color)) {
        return validateColor(color);
      }
    }
    return "#FFFFFF";
  };

  return (
    <div className="w-[100%] h-[100vh]">
      <div
        className={`absolute z-[300] flex w-[100vw] h-[100vh] items-center justify-center pl-[20px]`}
        style={{
          backgroundColor: "white",
          transition: "transform 1.6s cubic-bezier(0.5, 0, 0.1, 1)",
          transform: slideOpen ? "translateY(0%)" : "translateY(-100%)",
        }}
      >
        {!slideUpComponent && (
          <div
            className="w-[100%] flex"
            style={{ backgroundColor: "transparent" }}
          >
            <div
              className={`text-reveal-wrapper
              ${dropdown1Display ? "flex" : "hidden"}
              ${isVisible ? "visible" : ""}`}
            >
              <div
                className={`klivora ${
                  isRevealing1 ? "text-reveal" : "text-conceal"
                } text-[42px] tracking-[1px] leading-[29px] dimmer`}
              >
                ARCHIVES
              </div>
            </div>
          </div>
        )}
      </div>

      <div ref={containerRef}>
        {archivesRef.current !== null &&
          archivesRef.current.map((item, index) => (
            <div
              key={index}
              style={{ marginBottom: "20vh" }}
              className="relative w-[100%] h-[100vh] flex items-center justify-center"
            >
              <div
                style={{ border: "1px solid white" }}
                className="cursor-pointer absolute left-0 top-[0] w-[calc(100vw-(51vw+120px))] md:w-[calc(100vw-(27vw+320px))] lg:w-[calc(100vw-(36vw+90px))] h-[100vh] z-[106]"
                onClick={() => {
                  handleArchiveGroupClick(index);
                }}
              >
                <div className="w-[100%] h-[100%] relative select-none pl-[calc(30px+3vw)] flex lg:items-center mt-[] lg:mt-0">
                  <div
                    className="relative flex justify-center w-[100%] h-[calc(120px+16vw)] md:h-[calc(120px+16vw)] flex-col"
                    style={{
                      border: "1px solid white",
                      color: "white",
                      fontWeight: "700",
                    }}
                  >
                    <div className="absolute kayonest text-[calc(20px+10vw)]">
                      {item.title}
                    </div>

                    <div className="absolute bottom-0 text-[calc(8px+0.3vw)] leading-[calc(10px+0.6vw)] ">
                      <p>BEHANDLET EGETRAE</p>
                      <p className="ml-[100px]">
                        MUNDVANDSDRIVENDE KAFFERISTNING
                      </p>
                      <p>MINIMALISTISK INERIOR</p>
                    </div>
                  </div>

                  <div
                    onMouseEnter={() => setBorderRadius("30px")}
                    onMouseLeave={() => setBorderRadius("50%")}
                    className="absolute right-0 top-[75vh] mr-[-22px] w-[calc(70px+5vw)] h-[calc(70px+5vw)] flex items-center justify-center"
                  >
                    <div
                      className="w-[100%] flex items-center justify-center cursor-pointer"
                      style={{
                        border: "1px solid white",
                        borderRadius: borderRadius,
                        height:
                          borderRadius === "50%" ? "calc(70px + 5vw)" : "50px",
                        transition:
                          "border-radius 0.2s cubic-bezier(0.15, 0.55, 0.2, 1), height 0.2s cubic-bezier(0.15, 0.55, 0.2, 1)",
                      }}
                    >
                      <img
                        className="w-[45%] select-none"
                        src={arrowSRC}
                        alt="arrow"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute select-none right-[calc(20px+1vw)] md:right-[calc(20px+2vw)] lg:right-[calc(10px+7vw)] w-[calc(100px+50vw)] md:w-[calc(300px+25vw)] lg:w-[calc(80px+29vw)] top-[50%] aspect-[1/1.4] z-[105]"
                style={{ transform: "translateY(-50%)" }}
              >
                <Hero
                  images={
                    archivesRef.current === null
                      ? []
                      : archivesRef.current[index].images
                  }
                />
              </div>
            </div>
          ))}
      </div>

      <div
        ref={displayContainerRef}
        className={`fixed z-[998] h-[100vh] top-0 left-0 w-[100vw] overflow-auto`}
        style={{
          transition: "transform 0.7s cubic-bezier(0.5, 0, 0.1, 1)",
          transform: imageDisplayOpen ? "translateY(0)" : "translateY(100%)",
          overscrollBehavior: "none",
        }}
      >
        <div className="w-[100vw] min-h-[100vh] flex flex-col overflow-hidden">
          {archivesRef.current !== null &&
            selectedArchiveGroup !== null &&
            archivesRef.current[selectedArchiveGroup].images.map(
              (image: any, index) => {
                return (
                  <div
                    key={index}
                    className="w-[100vw] h-[100vh] flex justify-center items-center sticky top-0"
                    style={{
                      opacity: 1,
                      backgroundColor: extractImgColor(
                        image.title.split(".")[0]
                      ),
                    }}
                    onClick={() => {
                      if (displayContainerRef.current) {
                        customScroll(
                          displayContainerRef.current,
                          (index + 1) * window.innerHeight
                        );
                      }
                    }}
                  >
                    <div className="w-[80%] h-[80%] flex items-center justify-center">
                      <img
                        alt=""
                        style={{ objectFit: "contain" }}
                        className="h-[100%] w-[100%]"
                        src={image.url}
                      />
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </div>

      <div
        className="z-[999] fixed w-[100%] h-[100vh] top-0 left-0 pointer-events-none"
        style={{
          transition: "transform 0.7s cubic-bezier(0.5, 0, 0.1, 1)",
          transform: imageDisplayOpen ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div
          className="absolute top-[25px] right-[27px] cursor-pointer hover-dim5 pointer-events-auto"
          onClick={() => {
            handleCloseArchiveGroup();
          }}
          style={{ transition: "opacity 1s ease-in-out", opacity: 0 }}
          ref={closeIconRef}
        >
          <div className="relative h-[34px] w-[35px] flex hover-dim5 pointer-events-auto">
            <div
              className="nav-transition h-[3px] w-[42px] select-none absolute top-[16px] left-0"
              style={{
                backgroundColor: "black",
                transform: "rotate(45deg)",
                borderRadius: 5,
              }}
            ></div>
            <div
              className="nav-transition h-[3px] w-[42px] select-none absolute top-[16px] left-0"
              style={{
                backgroundColor: "black",
                transform: "rotate(-45deg)",
                borderRadius: 5,
              }}
            ></div>
          </div>
        </div>

        <div
          ref={playIconRef}
          style={{ transition: "opacity 1s ease-in-out", opacity: 0 }}
          className="absolute bottom-[22px] right-[18px] w-[55px] cursor-pointer"
        >
          <IoPlayCircleOutline
            color={currentDisplayBG === "white" ? "black" : "white"}
            size={`100%`}
            className="hover-dim5"
          />
        </div>
      </div>
    </div>
  );
};

export default Archives;
