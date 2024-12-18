import React, { useEffect, useRef, useState } from "react";
import "./ArchivesDisplay.css";

const ArchivesDisplay = () => {
  const beginUpdateRef = useRef(false);
  const duration = 1200;

  const customScroll = (targetY: number, useScrollY: boolean) => {
    // const container = document.querySelector(
    //   ".archives-container"
    // ) as HTMLElement;

    // if (!container) {
    //   console.error("No scrollable container found.");
    //   return;
    // }

    // let startY = container.scrollTop;
    // if (useScrollY) {
    const startY = window.scrollY;
    // }
    const distance = targetY - startY;
    const startTime = performance.now();
    const scroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  const customScrollContainer = (targetY: number, useScrollY: boolean) => {
    const container = document.querySelector(
      ".archives-container"
    ) as HTMLElement;

    if (!container) {
      console.error("No scrollable container found.");
      return;
    }

    const startY = container.scrollTop;
    const distance = targetY - startY;
    const startTime = performance.now();
    const scroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      container.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  useEffect(() => {
    window.scrollTo(0, window.innerHeight);
    // const handleScroll = (e: any) => {
    //   const container = document.querySelector(".archives-container");
    //   if (container) {
    //     const maxScrollTop = container.scrollHeight - container.clientHeight;

    //     if (container.scrollTop <= 0 && e.deltaY < 0) {
    //       e.preventDefault();
    //       container.scrollTop = 0;
    //     }

    //     if (container.scrollTop >= maxScrollTop && e.deltaY > 0) {
    //       e.preventDefault();
    //       container.scrollTop = maxScrollTop;
    //     }
    //   }
    // };

    // const container = document.querySelector(".archives-container");
    // if (container) {
    //   container.addEventListener("wheel", handleScroll, { passive: false });

    //   return () => container.removeEventListener("wheel", handleScroll);
    // }

    let isScrolling: NodeJS.Timeout;

    const handleScroll = (e: any) => {
      // clearTimeout(isScrolling);
      // isScrolling = setTimeout(() => {
      //   console.log("Scroll finished!");
      //   scrollFinished();
      // }, 150);

      // const scrollFinished = () => {
        if (window.scrollY < window.innerHeight) {
          // console.log("scrollY", window.scrollY);
          if (beginUpdateRef && !beginUpdateRef.current) {
            if (window.scrollY < 0.8 * window.innerHeight) {
              beginUpdateRef.current = true;
              customScroll(0, true);
              setTimeout(() => {
                handleNext(true);
                if (beginUpdateRef) {
                  beginUpdateRef.current = false;
                }
              }, 1200);
            } else {
              beginUpdateRef.current = true;
              customScroll(window.innerHeight, true);
              setTimeout(() => {
                if (beginUpdateRef) {
                  beginUpdateRef.current = false;
                }
              }, 1200);
            }
          }
        } 
        // else {
        //   const container = document.querySelector(".archives-container");
        //   if (beginUpdateRef && !beginUpdateRef.current && container) {
        //       console.log("container", container.scrollTop);
        //     if (container.scrollTop < 0.2 * window.innerHeight) {
        //       console.log("was above 2");
        //       beginUpdateRef.current = true;
        //       customScrollContainer(0, true);
        //       setTimeout(() => {
        //         if (beginUpdateRef) {
        //           beginUpdateRef.current = false;
        //         }
        //       }, 1200);
        //     } else {
        //       console.log("was below 2");
        //       beginUpdateRef.current = true;
        //       customScrollContainer(window.innerHeight, true);
        //       setTimeout(() => {
        //         handleNext(false);
        //         if (beginUpdateRef) {
        //           beginUpdateRef.current = false;
        //         }
        //       }, 1200);
        //     }
        //   }
        // }
      // };



      // const container = document.querySelector(".archives-container");
      // if (container) {
      //   const maxScrollTop = container.scrollHeight - container.clientHeight;

      //   if (container.scrollTop <= 0 && e.deltaY < 0) {
      //     e.preventDefault();
      //     container.scrollTop = 0;
      //   }

      //   if (container.scrollTop >= maxScrollTop && e.deltaY > 0) {
      //     e.preventDefault();
      //     container.scrollTop = maxScrollTop;
      //   }
      // }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  const disableScroll = () => {
    window.addEventListener("scroll", preventScroll);
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
  };

  const enableScroll = () => {
    window.removeEventListener("scroll", preventScroll);
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
  };

  const preventScroll = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const allColors = ["green", "blue", "red", "yellow", "purple"];
  const [centerIdx, setCenterIdx] = useState(1);

  const handleNext = (scrolledUp: boolean) => {
    // show overlay
    const container = document.querySelector(".archives-container");

    if (scrolledUp) {
      if (container) {
        container.scrollTo(0, container.clientHeight);
      }
      if (centerIdx === 0) {
        setCenterIdx(allColors.length - 1);
      } else {
        setCenterIdx((prev) => prev - 1);
      }
    } else {
      window.scrollTo(0,0)
      if (centerIdx === allColors.length - 1) {
        setCenterIdx(0);
      } else {
        setCenterIdx((prev) => prev + 1);
      }
    }
  };

  const easeInOutCubic = (t: any) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  return (
    <div className="wrapper">
      <div className="archives-container">
        {[-1, 0, 1].map((diff, index) => (
          <div
            key={index}
            className="archive-page"
            style={{
              backgroundColor:
                allColors[
                  centerIdx + diff > allColors.length - 1
                    ? 0
                    : centerIdx + diff < 0
                    ? allColors.length - 1
                    : centerIdx + diff
                ],
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ArchivesDisplay;
