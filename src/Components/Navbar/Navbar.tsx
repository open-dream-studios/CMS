import React, { useEffect, useRef, useState } from "react";
import { Page } from "../../App";
import "./Navbar.css";
import { useLocation } from "react-router-dom";

interface PageProps {
  navigate: (page: Page) => void;
}

const Navbar: React.FC<PageProps> = ({ navigate }) => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [navOnScreen, setNavOnScreen] = useState<boolean>(false);
  const isOpenRef = useRef<boolean>(false);
  const navOverlayBG = useRef<HTMLDivElement>(null);
  const navOverlayText = useRef<HTMLDivElement>(null);
  const location = useLocation(); 

  useEffect(() => {
    const handleNavResize = () => {
      if (window.innerWidth >= 768 && isOpenRef && isOpenRef.current) {
        isOpenRef.current = false;
        setNavOpen(false);
        setNavOnScreen(false);
      }
    };

    window.addEventListener("resize", handleNavResize);
    return () => {
      window.removeEventListener("resize", handleNavResize);
    };
  }, []);

  function closeNavQuick() {
    if (isOpenRef && isOpenRef.current) {
      isOpenRef.current = false;
      setNavOpen(false);
      setNavOnScreen(false);
    }
  }

  function clickedDropdownPage(newPage: string) {
    const currentPage = location.pathname.replace("/", "") || "home";
    if (["home", "about", "projects", "archives"].includes(currentPage) && newPage === currentPage) {
      toggleNav()
      return
    } 

    // start close text

    if (navOverlayBG && navOverlayBG.current !== null) {
      navOverlayBG.current.style.transition = "none"
    }

    setTimeout(() => {
      closeNavQuick();
    }, 990);

    setTimeout(()=>{
      if (navOverlayBG && navOverlayBG.current !== null) {
        navOverlayBG.current.style.transition =
          "transform 0.7s cubic-bezier(0.5, 0, 0.1, 1)";
      }
    },1200)
  }

  // const isClosingNav = useRef<boolean>(false);
  function toggleNav() {
    if (isOpenRef) {
      // if (isClosingNav) {isClosingNav.current = true}
      const newVal = !isOpenRef.current;
      setNavOpen(newVal);
      if (isOpenRef.current) {
        setTimeout(() => {
          setNavOnScreen(false);
          // if (isClosingNav) {isClosingNav.current = false}
        }, 700);
      } else {
        setNavOnScreen(true);
      }
      isOpenRef.current = newVal;
    }
  }

  return (
    <>
      <div
        className="w-[100vw] h-[88px] fixed z-[910] flex justify-between lg:px-[32px] px-[18px]"
        style={{ backgroundColor: "transparent" }}
      >
        <div
          className="cursor-pointer mt-[20px] md:mt-[28px] text-[16px] lg:text-[21px] leading-[16px] lg:leading-[21px] font-[400]"
          onClick={() => {
            navigate("home");
          }}
        >
          JESSICA SHULMAN
        </div>
        <div className="mt-[28px] lg:flex hidden flex-col leading-[14px] gap-[3.5px]">
          <div className="text-[14px]">PHOTOGRAPHER & DESIGNER</div>
          <div className="flex flex-row gap-[6px] text-[14px] h-[15px]">
            <a className="nav-item cursor-pointer" href="/">
              JESSSHULMAN27@GMAIL.COM
            </a>
            <p className="text-[13px] mt-[-1.3px] font-[400]">/</p>
            <a className="nav-item cursor-pointer" href="/">
              INSTAGRAM
            </a>
          </div>
        </div>
        <div className="mt-[28px] hidden md:flex flex-row h-[15px] text-[14px] leading-[14px]">
          <div
            className="cursor-pointer nav-item mx-[calc(3px+0.3vw)]"
            onClick={() => {
              navigate("projects");
            }}
          >
            INDEX
          </div>
          <div
            className="cursor-pointer nav-item mx-[calc(3px+0.3vw)]"
            onClick={() => {
              navigate("about");
            }}
          >
            INFOS
          </div>
          <div
            className="cursor-pointer nav-item mx-[calc(3px+0.3vw)]"
            onClick={() => {
              navigate("archives");
            }}
          >
            ARCHIVES
          </div>
        </div>

        <div
          className="relative mt-[11px] h-[34px] w-[35px] md:hidden flex cursor-pointer"
          onClick={() => {
            // if (isClosingNav && !isClosingNav.current) {
            toggleNav();
            // }
          }}
        >
          <div
            className="nav-transition nav-hamburger-bar select-none absolute top-[16px] left-0"
            style={{
              backgroundColor: "black",
              marginTop: navOpen ? 0 : "-4.5px",
              transform: navOpen ? "rotate(45deg)" : "none",
            }}
          ></div>
          <div
            className="nav-transition nav-hamburger-bar select-none absolute top-[16px] left-0"
            style={{
              backgroundColor: "black",
              opacity: navOpen ? 0 : 1,
            }}
          ></div>
          <div
            className="nav-transition nav-hamburger-bar select-none absolute top-[16px] left-0"
            style={{
              backgroundColor: "black",
              marginTop: navOpen ? 0 : "4.5px",
              transform: navOpen ? "rotate(-45deg)" : "none",
            }}
          ></div>
        </div>
      </div>

      <div
        ref={navOverlayBG}
        className={`absolute z-[1] min-h-[500px] top-0 left-0 md:hidden flex w-[100vw] h-[100vh] items-start justify-center flex-col pl-[20px]`}
        style={{
          backgroundColor: "white",
          transition: "transform 0.7s cubic-bezier(0.5, 0, 0.1, 1)",
          transform: navOpen ? "translateY(0)" : "translateY(-100%)",
        }}
      ></div>

      <div
        ref={navOverlayText}
        className={`fixed z-[1] min-h-[500px] top-0 left-0 md:hidden ${
          navOnScreen ? "flex" : "hidden"
        } w-[100vw] h-[100vh] items-start justify-center flex-col pl-[20px]`}
      >
        <div
          onClick={() => {
            clickedDropdownPage("projects");
            navigate("projects");
          }}
          className="klivora hover-dim5 text-[45px] tracking-[1px] dimmer cursor-pointer"
        >
          INDEX
        </div>
        <div
          onClick={() => {
            clickedDropdownPage("about");
            navigate("about");
          }}
          className="klivora hover-dim5 text-[45px] tracking-[1px] dimmer cursor-pointer"
        >
          INFOS
        </div>
        <div
          onClick={() => {
            clickedDropdownPage("archives");
            navigate("archives");
          }}
          className="klivora hover-dim5 text-[45px] tracking-[1px] dimmer cursor-pointer"
        >
          ARCHIVES
        </div>
      </div>
    </>
  );
};

export default Navbar;
