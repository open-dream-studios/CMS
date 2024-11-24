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
  const location = useLocation();

  const [canSelectPage, setCanSelectPage] = useState(true);

  const [isVisible, setIsVisible] = useState(false);
  const [isRevealing1, setIsRevealing1] = useState(true);
  const [isRevealing2, setIsRevealing2] = useState(true);
  const [isRevealing3, setIsRevealing3] = useState(true);
  const [dropdown1Display, setDropdown1Display] = useState(false);
  const [dropdown2Display, setDropdown2Display] = useState(false);
  const [dropdown3Display, setDropdown3Display] = useState(false);

  function showText() {
    setTimeout(() => {
      setIsRevealing1(true);
      setIsRevealing2(true);
      setIsRevealing3(true);
      setIsVisible(true);
      setDropdown1Display(true);
    }, 200);

    setTimeout(() => {
      setDropdown2Display(true);
    }, 350);

    setTimeout(() => {
      setDropdown3Display(true);
    }, 500);
  }

  function hideText() {
    setIsRevealing3(false);
    setTimeout(() => {
      setIsRevealing2(false);
    }, 150);
    setTimeout(() => {
      setIsRevealing1(false);
    }, 300);

    setTimeout(() => {
      setIsVisible(false);
      setDropdown1Display(false);
      setDropdown2Display(false);
      setDropdown3Display(false);
    }, 900);
  }

  useEffect(() => {
    const handleNavResize = () => {
      if (window.innerWidth >= 768 && isOpenRef && isOpenRef.current) {
        isOpenRef.current = false;
        setNavOpen(false);
        setNavOnScreen(false);
        hideText();
        document.body.style.overflow = "";
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
      document.body.style.overflow = "";
    }
  }

  function selectedPage() {
    setCanSelectPage(false) 
    setTimeout(()=>{
      setCanSelectPage(true)
    },700)
  }

  function clickedDropdownPage(newPage: string) {
    const currentPage = location.pathname.replace("/", "") || "home";
    if (
      ["home", "about", "projects", "archives"].includes(currentPage) &&
      newPage === currentPage
    ) {
      toggleNav();
      return;
    }

    hideText();

    if (navOverlayBG && navOverlayBG.current !== null) {
      navOverlayBG.current.style.transition = "none";
    }

    setTimeout(() => {
      closeNavQuick();
    }, 990);

    setTimeout(() => {
      if (navOverlayBG && navOverlayBG.current !== null) {
        navOverlayBG.current.style.transition =
          "transform 0.7s cubic-bezier(0.5, 0, 0.1, 1)";
      }
    }, 1200);
  }

  const [isAnimatingNav, setIsAnimatingNav] = useState<boolean>(false);
  function toggleNav() {
    if (isOpenRef) {
      const newVal = !isOpenRef.current;
      if (isOpenRef.current) {
        // Close Nav
        document.body.style.overflow = "";
        hideText();
        setIsAnimatingNav(true);
        setTimeout(() => {
          setNavOpen(newVal);
          setTimeout(() => {
            setNavOnScreen(false);
            setIsAnimatingNav(false);
          }, 700);
        }, 700);
      } else {
        // Open Nav
        document.body.style.overflow = "hidden";
        setNavOpen(newVal);
        showText();
        setNavOnScreen(true);
        setIsAnimatingNav(true);
        setTimeout(() => {
          setIsAnimatingNav(false);
        }, 700);
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
            if (canSelectPage) {
              if (navOpen) {
                clickedDropdownPage("home");
              } 
              selectedPage()
              navigate("home");
            }
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
              if (canSelectPage) {
                selectedPage()
                navigate("projects");
              }
            }}
          >
            INDEX
          </div>
          <div
            className="cursor-pointer nav-item mx-[calc(3px+0.3vw)]"
            onClick={() => {
              if (canSelectPage) {
                selectedPage()
                navigate("about");
              }
            }}
          >
            INFOS
          </div>
          <div
            className="cursor-pointer nav-item mx-[calc(3px+0.3vw)]"
            onClick={() => {
              if (canSelectPage) {
                selectedPage()
                navigate("archives");
              }
            }}
          >
            ARCHIVES
          </div>
        </div>

        <div
          className="relative mt-[12px] h-[34px] w-[35px] md:hidden flex cursor-pointer"
          onClick={() => {
            if (!isAnimatingNav) {
              toggleNav();
            }
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
        className={`fixed z-[102] min-h-[500px] top-0 left-0 md:hidden flex w-[100vw] h-[100vh] items-start justify-center flex-col pl-[20px]`}
        style={{
          backgroundColor: "white",
          transition: "transform 0.7s cubic-bezier(0.5, 0, 0.1, 1)",
          transform: navOpen ? "translateY(0)" : "translateY(-100%)",
        }}
      ></div>

      <div
        className={`fixed z-[102] min-h-[500px] top-0 left-0 md:hidden 
          ${navOnScreen ? "flex" : "hidden"}
          w-[100vw] h-[calc(100vh-20px)] mt-[20px] items-center justify-center pl-[20px]`}
        style={{ backgroundColor: "transparent" }}
      >
        <div
          className="h-[160px] w-[100%] flex flex-col gap-[26px]"
          style={{ backgroundColor: "transparent" }}
        >
          <div
            className={`text-reveal-wrapper 
            ${dropdown1Display ? "flex" : "hidden"}
            ${isVisible ? "visible" : ""}`}
          >
            <div
              onClick={() => {
                clickedDropdownPage("projects");
                navigate("projects");
              }}
              className={`klivora ${
                isRevealing1 ? "text-reveal" : "text-conceal"
              } 
      hover-dim5 text-[42px] tracking-[1px] leading-[29px] dimmer cursor-pointer`}
            >
              INDEX
            </div>
          </div>
          <div
            className={`text-reveal-wrapper
            ${dropdown2Display ? "flex" : "hidden"}
             ${isVisible ? "visible" : ""}`}
          >
            <div
              onClick={() => {
                clickedDropdownPage("about");
                navigate("about");
              }}
              className={`klivora ${
                isRevealing2 ? "text-reveal" : "text-conceal"
              } 
      hover-dim5 text-[42px] tracking-[1px] leading-[29px] dimmer cursor-pointer`}
            >
              INFOS
            </div>
          </div>
          <div
            className={`text-reveal-wrapper
            ${dropdown3Display ? "flex" : "hidden"}
             ${isVisible ? "visible" : ""}`}
          >
            <div
              onClick={() => {
                clickedDropdownPage("archives");
                navigate("archives");
              }}
              className={`klivora ${
                isRevealing3 ? "text-reveal" : "text-conceal"
              } 
      hover-dim5 text-[42px] tracking-[1px] leading-[29px] dimmer cursor-pointer`}
            >
              ARCHIVES
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
