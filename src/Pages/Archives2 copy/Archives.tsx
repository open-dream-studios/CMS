import React, { useEffect, useState } from "react";
import { Page } from "../../App2";
import ArchivesDisplay from "../../Components/ArchivesDisplay/ArchivesDisplay";

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

  const [slideOpen, setSlideOpen] = useState(true);

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

  return (
    <div className="w-[100%] h-[100vh]">
      {/* <div
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
      </div> */}

      <div
        // className="w-[100vw] h-[100vh]"
        // className="fixed top-0 left-0 w-[100vw] h-[100vh]"
        // style={{
          // backgroundColor: "pink",
          // transition: "transform 1.5s cubic-bezier(0.5, 0, 0.1, 1)",
          // transform: slideOpen ? "translateY(20%)" : "translateY(0%)",
        // }}
      >
        <ArchivesDisplay />
      </div>
    </div>
  );
};

export default Archives;
