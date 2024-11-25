import React, { useState } from "react";
import appData from "../../app-details.json";
import "./Home.css";
import { Page } from "../../App";
import { AnimatePresence, motion } from "framer-motion";

export interface HomePageProps {
  navigate: (page: Page) => void;
  layoutOrder: number[];
}

const HomeImage = ({
  item,
  index,
  covers,
  currentCover,
}: {
  item: any;
  index: number;
  covers: any;
  currentCover: number;
}) => {
  return (
    <div
      className="image absolute"
      style={{
        aspectRatio: `1/${item.h}`,
        width: `${item.w}vw`,
        left: `${item.x}vw`,
        top: item.top ? `${item.y}vh` : "none",
        bottom: item.top ? "none" : `${item.y}vh`,
      }}
    >
      <img
        alt=""
        className="image"
        src={`/assets/${covers[currentCover].images[index]}`}
        style={{ position: "absolute" }}
      />
    </div>
  );
};

const Home: React.FC<HomePageProps> = ({ navigate, layoutOrder }) => {
  const covers = appData.pages.home.covers;
  const coverLayouts = [
    [
      { x: 0, y: 9, w: 16, h: 1.4, z: 104, top: true },
      { x: 37, y: 0, w: 22, h: 1.2, z: 103, top: true },
      { x: 72, y: 3, w: 15, h: 1.3, z: 104, top: true },
      { x: 11, y: 15, w: 24, h: 1.2, z: 104, top: false },
      { x: 37, y: 0, w: 23, h: 1.2, z: 104, top: false },
      { x: 73, y: 6, w: 18, h: 1.2, z: 104, top: false },
    ],
    [
      { x: 12, y: 5, w: 21, h: 1.3, z: 104, top: true },
      { x: 31, y: 0, w: 19, h: 1.3, z: 103, top: true },
      { x: 70, y: 0, w: 15, h: 1.3, z: 104, top: true },
      { x: 5, y: 10, w: 24, h: 1.25, z: 104, top: false },
      { x: 37, y: 0, w: 23, h: 1.2, z: 104, top: false },
      { x: 73, y: 6, w: 18, h: 1.2, z: 104, top: false },
    ],
  ];

  const [currentCover, setCurrentCover] = useState(0);
  const [currentLayout, setCurrentLayout] = useState(
    coverLayouts[layoutOrder[0]]
  );

  const [exitingCover, setExitingCover] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNextCover = (event: any) => {
    event.stopPropagation();
    if (isTransitioning) return;
    setIsTransitioning(true);

    setExitingCover(currentCover);

    setTimeout(() => {
      setCurrentCover((prev) => prev + 1);
      setExitingCover(null);
    }, 500);

    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="fixed w-[100vw] h-[100vh] py-[calc(20px+10vh)] md:py-0">
      <div
        className="cursor-pointer relative w-[100vw] h-[100%] flex items-center justify-center"
        style={{
          backgroundColor: "white",
        }}
        onClick={handleNextCover}
      >
        {currentLayout.map((item, index) => {
          return (
            <>
              <AnimatePresence>
                {exitingCover !== null && (
                  <motion.div
                    key={`exiting-${exitingCover}`}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    style={{
                      zIndex: item.z,
                    }}
                  >
                    <HomeImage
                      item={item}
                      index={index}
                      covers={covers}
                      currentCover={exitingCover}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {exitingCover === null && (
                  <motion.div
                    key={`current-${currentCover}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    style={{
                      zIndex: item.z,
                    }}
                  >
                    <HomeImage
                      item={item}
                      index={index}
                      covers={covers}
                      currentCover={currentCover}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          );
        })}

        <div className="inverted-text klivora text-[calc(20px+9vw)]">
          {covers[currentCover].title}
        </div>
        <div className="inverted-text-black klivora text-[calc(20px+9vw)]">
          {covers[currentCover].title}
        </div>

        <div className="inverted-text absolute mt-[calc(35px+10vw)] text-[calc(8px+0.75vw)]">
          {covers[currentCover].subTitle}
        </div>
        <div className="inverted-text-black absolute mt-[calc(35px+10vw)] text-[calc(8px+0.75vw)]">
          {covers[currentCover].subTitle}
        </div>
      </div>
    </div>
  );
};

export default Home;
