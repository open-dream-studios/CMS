import React, { useEffect, useState } from "react";
import { Page } from "../../App";
import Slider from "../../Components/Slider/Slider";
// import ArchivesDisplay from "../../Components/ArchivesDisplay/ArchivesDisplay";
import "./Archives.css";
import Hero from "../../Components/Slider/Hero/Hero";
import useCurrentNavColorState from "../../store/useCurrentNavColorStore";

type ArchivesPageProps = {
  navigate: (page: Page) => void;
  slideUpComponent: boolean;
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
  const { currentNavColor, setCurrentNavColor } = useCurrentNavColorState()

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

  // Custom scroll function for any target position
  const duration = 1200;
  const customScroll = (targetY: any) => {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    const scroll = (currentTime: any) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1); // Ensure it doesn't exceed 1
      const ease = easeInOutCubic(progress); // Apply easing

      window.scrollTo(0, startY + distance * ease); // Scroll to the appropriate Y position

      if (progress < 1) {
        requestAnimationFrame(scroll); // Continue scrolling until done
      }
    };

    requestAnimationFrame(scroll);
  };

  // Easing function for smooth acceleration and deceleration
  const easeInOutCubic = (t: any) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Scroll Down function (1.2 seconds long)
  const scrollDown = () => {
    customScroll(window.innerHeight); // Scroll down to the viewport height
  };

  const handleProjectClick = (item: number) => {
    console.log(item);
  };

  return (
    <div className="w-[100%] h-[100vh]">
      {/* <div
        // className={`absolute z-[300] flex w-[100vw] h-[100vh] items-center justify-center pl-[20px]`}
        className={`fixed z-[300] flex w-[100vw] h-[100vh] items-center justify-center`}
        style={{
          backgroundColor: slideOpen ? "white" : "transparent",
          // transition: "transform 1.6s cubic-bezier(0.5, 0, 0.1, 1)",
          transition: "background-color 1.1s cubic-bezier(0.5, 0, 0.1, 1)",
          // transform: slideOpen ? "translateY(0%)" : "translateY(-100%)",
        }}
      >
        {!slideUpComponent && (
          <div className="w-[100%]">
            <div
              className={`archives-text-reveal-wrapper 
            ${dropdown1Display ? "flex" : "hidden"}
            ${isVisible ? "visible" : ""}`}
            >
              <div
                className={`klivora wave-container flex w-[100%] items-center justify-center ${
                  isRevealing1 ? "archives-text-reveal" : ""
                } 
                text-[calc(30px+3vw)] tracking-[1px] leading-[62px] dimmer`}
                style={{
                  color: slideOpen ? "black" : "white",
                  opacity: textVisible ? 1 : 0,
                  transition:
                    "color 0.4s cubic-bezier(0.5, 0, 0.1, 1), opacity 0.9s cubic-bezier(0.5, 0, 0.1, 1)",
                }}
              >
                <div className="archives-wave-container">
                  {subTitle.map((letter, index) => (
                    <span
                      key={index}
                      className={`archives-wave-letter ${
                        textVisible
                          ? "archives-wave-reveal2"
                          : "archives-wave-conceal2"
                      }`}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div> */}

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

      <div
        className="w-[100vw] h-[100vh] fixed top-0 left-0 z-[105]"
        // className="fixed top-0 left-0 w-[100vw] h-[100vh]"
        style={{
          transition:
            "transform 1.5s cubic-bezier(0.5, 0, 0.1, 1), background-color 1.5s cubic-bezier(0.5, 0, 0.1, 1)",
          transform: slideOpen ? "translateY(20%)" : "translateY(0%)",
          backgroundColor: slideOpen ? "white" : "#013559",
        }}
      >
        <div style={{backgroundColor: "pink"}} className="absolute left-0 top-0 w-[calc(100vw-(51vw+120px))] md:w-[calc(100vw-(27vw+320px))] lg:w-[calc(100vw-(36vw+90px))] h-[100vh] z-[106]">
          <div className="w-[100%] h-[100%] relative select-none pl-[calc(30px+3vw)] flex lg:items-center mt-[] lg:mt-0">
            <div
              className="relative flex justify-center w-[100%] h-[calc(120px+16vw)] md:h-[calc(120px+16vw)] flex-col"
              style={{ backgroundColor: "green", color: "white", fontWeight: "700" }}
            >
              <div className="absolute kayonest text-[calc(20px+10vw)]">
                Lifestyle 
              </div>

              <div className="absolute bottom-0 text-[calc(8px+0.3vw)] leading-[calc(10px+0.6vw)] ">
                <p>BEHANDLET EGETRAE</p>
                <p className="ml-[100px]">MUNDVANDSDRIVENDE KAFFERISTNING</p>
                <p>MINIMALISTISK INERIOR</p>
              </div>
            </div>

            <div
              onClick={() => handleProjectClick(0)}
              onMouseEnter={() => setBorderRadius("30px")}
              onMouseLeave={() => setBorderRadius("50%")}
              className="absolute right-0 top-[75vh] mr-[-22px] w-[calc(70px+5vw)] h-[calc(70px+5vw)] flex items-center justify-center"
            >
              <div
                className="w-[100%] flex items-center justify-center cursor-pointer"
                style={{
                  border: "1px solid white",
                  borderRadius: borderRadius,
                  height: borderRadius === "50%" ? "calc(70px + 5vw)" : "50px",
                  transition:
                    "border-radius 0.2s cubic-bezier(0.15, 0.55, 0.2, 1), height 0.2s cubic-bezier(0.15, 0.55, 0.2, 1)",
                }}
              >
                <img
                  className="w-[45%] select-none"
                  src="/assets/icons/arrow1.png"
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
          <Hero />
        </div>
      </div>

      {/* {!slideOpen && (
        <div
          className="absolute top-[100vh] left-0 w-[100vw] h-[100vh] z-[106]"
          style={{ backgroundColor: "red" }}
        ></div>
      )} */}
    </div>
  );
};

export default Archives;
