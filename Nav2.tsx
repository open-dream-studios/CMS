"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { IoLeaf } from "react-icons/io5";
import appData from "../../app-data.json";
import "./navbar.css";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [count, setCount] = useState(0);
  const isOpenRef = useRef(false);
  const closeRef = useRef(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [currentRoute, setCurrentRoute] = useState("/");
  const router = usePathname();
  const navOverlayRef = useRef<HTMLDivElement>(null);
  const navWhiteOverlayRef = useRef<HTMLDivElement>(null);
  const navSMPlus = useRef<HTMLDivElement>(null);
  const [navWhite, setNavWhite] = useState(false);
  const [pageDark, setPageDark] = useState(false);

  useEffect(() => {
    if (navWhiteOverlayRef.current) {
      navWhiteOverlayRef.current.style.opacity = "0";
    }
  }, [navOverlayRef]);

  // Initialize the router
  const navContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setCurrentRoute(router);
    closeNavQuick();

    if (router === "/" || router === "/portfolio") {
      setPageDark(false);
    } else {
      setPageDark(true);
    }

    window.scrollTo(0, 0);
    if (navContainerRef.current) {
      navContainerRef.current.style.transition = "none";
      setTimeout(() => {
        if (navContainerRef.current) {
          navContainerRef.current.style.transition =
            "background-color 0.8s ease-in-out";
        }
      }, 500);
    }

    if (navSMPlus.current) {
      const paragraphs = navSMPlus.current.querySelectorAll(".nav-link-text");

      paragraphs.forEach((p) => {
        const paragraphElement = p as HTMLParagraphElement;
        paragraphElement.style.transition = "none";
      });

      const timeoutId = setTimeout(() => {
        paragraphs.forEach((p) => {
          const paragraphElement = p as HTMLParagraphElement;
          paragraphElement.style.transition = "color 1s ease-in-out";
          paragraphElement.style.transitionDelay = "0.15s";
        });
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      if (router === "/") {
        if (scrollY >= windowHeight && navWhite !== true) {
          setNavWhite(true); // Scrolled beyond 1x the window height
        } else if (scrollY < windowHeight && navWhite !== false) {
          setNavWhite(false); // Scrolled back to less than 1x the window height
        }
      } else {
        if (scrollY >= 200 && navWhite !== true) {
          setNavWhite(true); // Scrolled beyond 200px
        } else if (scrollY < 200 && navWhite !== false) {
          setNavWhite(false); // Scrolled back to less than 200px
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navWhite, router]);

  // useEffect(() => {
  //   if (navWhiteOverlayRef.current) {
  //     navWhiteOverlayRef.current.style.opacity = "0";
  //   }
  // }, [navWhiteOverlayRef]);

  // Handle window resizes
  useEffect(() => {
    const handleNavResize = () => {
      if (window.innerWidth >= 992 && isOpenRef && isOpenRef.current === true) {
        closeIsOpen(false);
        toggleNav(false);
      }
    };

    window.addEventListener("resize", handleNavResize); // Fix typo here
    return () => {
      window.removeEventListener("resize", handleNavResize);
    };
  }, []);

  // Toggle the close button and hamburger using refs
  function closeIsOpen(newVal: boolean) {
    if (newVal) {
      if (isOpenRef) {
        isOpenRef.current = true;
      }
      if (closeRef) {
        closeRef.current = true;
      }
      setCount((prevCount: number) => prevCount + 1);
    } else {
      if (closeRef) {
        closeRef.current = false;
      }
      setCount((prevCount: number) => prevCount + 1);
      setTimeout(() => {
        if (isOpenRef) {
          isOpenRef.current = false;
        }
        setCount((prevCount: number) => prevCount + 1);
      }, 400);
    }
  }

  const [navTrue, setNavTrue] = useState(false);
  // Toggle the nav overlay display
  function toggleNav(toggleOpen: boolean) {
    setNavTrue(toggleOpen);
    if (navOverlayRef.current) {
      if (toggleOpen) {
        navOverlayRef.current.style.opacity = "1";
        navOverlayRef.current.style.pointerEvents = "all";
      } else {
        navOverlayRef.current.style.opacity = "0";
        navOverlayRef.current.style.pointerEvents = "none";
      }
    }
  }

  const [isFading, setIsFading] = useState(false);

  const handleClick = (e: any) => {
    // Toggle nav quick
    if (navOverlayRef.current) {
      setNavTrue(false);
      navOverlayRef.current.style.opacity = "0";
      navOverlayRef.current.style.pointerEvents = "none";
    }

    // Close is open quick
    if (closeRef) {
      closeRef.current = false;
    }
    if (isOpenRef) {
      isOpenRef.current = false;
    }
    setCount((prevCount: number) => prevCount + 1);
  };

  const nameImage1Ref = useRef<HTMLImageElement>(null);
  const nameImage2Ref = useRef<HTMLImageElement>(null);

  function closeNavQuick() {
    // Toggle nav quick
    if (navOverlayRef.current) {
      setNavTrue(false);
      navOverlayRef.current.style.transition = "none";
      navOverlayRef.current.style.opacity = "0";
      navOverlayRef.current.style.pointerEvents = "none";
    }

    // Close is open quick
    if (closeRef) {
      closeRef.current = false;
    }
    if (isOpenRef) {
      isOpenRef.current = false;
    }
    setCount((prevCount: number) => prevCount + 1);
    if (nameImage1Ref.current && nameImage2Ref.current) {
      nameImage1Ref.current.style.transition = "none";
      nameImage2Ref.current.style.transition = "none";
    }

    setTimeout(() => {
      if (navOverlayRef.current) {
        navOverlayRef.current.style.transition = "opacity 0.5s ease-in-out";
      }
      if (nameImage1Ref.current && nameImage2Ref.current) {
        nameImage1Ref.current.style.transition = "opacity 1s ease-in-out";
        nameImage2Ref.current.style.transition = "opacity 1s ease-in-out";
      }
    }, 500);
  }

  const [currentImage, setCurrentImage] = useState("NAME-WHITE");
  useEffect(() => {
    const newImage = pageDark || navWhite || navTrue ? "NAME" : "NAME-WHITE";
    setCurrentImage(newImage);
  }, [navWhite, navTrue, pageDark]);

  return (
    <nav style={{ zIndex: 910 }} className="select-none">
      <div
        ref={navContainerRef}
        style={{
          width: "100vw",
          backgroundColor:
            navWhite || router === "/projects" ? "white" : "transparent",
          height: "70px",
          zIndex: 992,
          position: "fixed",
          transition: "background-color 0.8s ease-in-out",
        }}
      >
        {/* Hamburger Button */}
        <div
          className="absolute lg:hidden flex items-center select-none"
          style={{ height: 70, right: 23 }}
        >
          <button
            ref={openButtonRef}
            onClick={() => {
              toggleNav(true);

              closeIsOpen(true);
              if (closeButtonRef && closeButtonRef.current) {
                closeButtonRef.current.disabled = true;
                setTimeout(() => {
                  if (closeButtonRef && closeButtonRef.current)
                    closeButtonRef.current.disabled = false;
                }, 400);
              }
            }}
            style={{
              transition:
                "transform 0.4s ease-in-out, opacity 0.4s ease-in-out",
              transform:
                closeRef && closeRef.current
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              transformOrigin: "center",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                opacity: closeRef && closeRef.current ? 0 : 1,
                display: closeRef && closeRef.current ? "none" : "block",
                transition: "opacity 0.4s ease-in-out",
              }}
            >
              <div className="w-[24px] flex flex-col" id="nav-hamburger">
                <div
                  style={{
                    height: "2px",
                    width: "100%",
                    backgroundColor: navWhite || pageDark ? "black" : "white",
                    transition: "background-color 1s ease-in-out",
                  }}
                ></div>
                <div
                  style={{
                    height: "2px",
                    width: "100%",
                    backgroundColor: navWhite || pageDark ? "black" : "white",
                    transition: "background-color 1s ease-in-out",
                  }}
                ></div>
                <div
                  style={{
                    height: "2px",
                    width: "100%",
                    backgroundColor: navWhite || pageDark ? "black" : "white",
                    transition: "background-color 1s ease-in-out",
                  }}
                ></div>
              </div>
            </div>
          </button>
        </div>

        {/* Close Button */}
        <div
          className="absolute lg:hidden flex items-center select-none"
          style={{ height: 70, right: 47 }}
        >
          <button
            ref={closeButtonRef}
            onClick={(event) => {
              toggleNav(false);

              closeIsOpen(false);
              if (openButtonRef && openButtonRef.current) {
                openButtonRef.current.disabled = true;
                setTimeout(() => {
                  if (openButtonRef && openButtonRef.current)
                    openButtonRef.current.disabled = false;
                }, 400);
              }
            }}
            className="absolute flex items-center"
            style={{
              transition:
                "transform 0.4s ease-in-out, opacity 0.4s ease-in-out",
              transform:
                closeRef && closeRef.current
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              transformOrigin: "center",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                opacity: closeRef && closeRef.current ? 1 : 0,
                display: closeRef && closeRef.current ? "block" : "none",
                transition: "opacity 0.4s ease-in-out",
              }}
            >
              <TfiClose size={28} color="black" />
            </div>
          </button>
        </div>

        {/* NAME */}
        <div
          style={{
            height: "70px",
            width: "210px",
            marginLeft: 20,
          }}
        >
          <Link
            href="/"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              position: "relative",
              alignItems: "center",
            }}
          >
            {/* First Image */}
            <Image
              ref={nameImage1Ref}
              src={`${appData.S3_URL}NAME-WHITE.png`}
              className={`select-none image-transition ${
                currentImage === "NAME-WHITE" ? "image-visible" : ""
              }`}
              style={{ position: "absolute", objectFit: "cover" }}
              alt="signature"
              width={1000}
              height={123}
              draggable="false"
            />

            {/* Second Image */}
            <Image
              ref={nameImage2Ref}
              src={`${appData.S3_URL}NAME.png`}
              className={`select-none image-transition ${
                currentImage === "NAME" ? "image-visible" : ""
              }`}
              alt="signature"
              width={1000}
              height={123}
              draggable="false"
              style={{ position: "absolute", objectFit: "cover" }}
            />
          </Link>
        </div>

        {/* NAV SM+ */}
        <div
          ref={navSMPlus}
          className={`lg:flex hidden justify-center items-center absolute h-[70px]`}
          style={{
            width: "100vw",
            top: 0,
            gap: "calc(30px + 3vw)",
            pointerEvents: "none",
          }}
        >
          <Link href="/projects">
            <div className="nav-link">
              <p
                style={{
                  color: `${navWhite || pageDark ? "black" : "white"}`,
                  transition: "none",
                }}
                className="nav-link-text"
              >
                projects
              </p>
            </div>
          </Link>
          <Link href="/portfolio">
            <div className="nav-link">
              <p
                style={{
                  color: `${navWhite || pageDark ? "black" : "white"}`,
                  transition: "none",
                }}
                className="nav-link-text"
              >
                portfolio
              </p>
            </div>
          </Link>
          <Link href="/about">
            <div className="nav-link">
              <p
                style={{
                  color: `${navWhite || pageDark ? "black" : "white"}`,
                  transition: "none",
                }}
                className="nav-link-text"
              >
                about
              </p>
            </div>
          </Link>
          <Link href="/contact">
            <div className="nav-link">
              <p
                style={{
                  color: `${navWhite || pageDark ? "black" : "white"}`,
                  transition: "none",
                }}
                className="nav-link-text"
              >
                contact
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* NAV OVERLAY */}
      <div
        ref={navOverlayRef}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "white",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.5s ease-in-out",
          zIndex: 990,
        }}
      >
        {count >= 0 && isOpenRef && isOpenRef.current && (
          <ul
            style={{
              gap: 10,
              width: "100vw",
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
            className={`${isFading ? "fading-out" : ""}`}
          >
            <li className="slide-bottom-up-text overlay-link">
              {currentRoute === "/" && (
                <div className="nav-overlay-leaf">
                  <IoLeaf size={29} color="black" />
                </div>
              )}
              <Link href="/" onClick={handleClick}>
                <p
                  className={`nav-overlay-text lexend-tera ${
                    currentRoute === "/" ? "active-route" : ""
                  }`}
                >
                  HOME
                </p>
              </Link>
            </li>
            <li
              style={{ animationDelay: "0.15s" }}
              className="slide-bottom-up-text overlay-link"
            >
              {currentRoute.startsWith("/projects") && (
                <div className="nav-overlay-leaf">
                  <IoLeaf size={29} color="black" />
                </div>
              )}
              <Link href="/projects" onClick={handleClick}>
                <p
                  className={`nav-overlay-text lexend-tera ${
                    currentRoute.startsWith("/projects") ? "active-route" : ""
                  }`}
                >
                  PROJECTS
                </p>
              </Link>
            </li>
            <li
              style={{ animationDelay: "0.15s" }}
              className="slide-bottom-up-text overlay-link"
            >
              {currentRoute.startsWith("/portfolio") && (
                <div className="nav-overlay-leaf">
                  <IoLeaf size={29} color="black" />
                </div>
              )}
              <Link href="/portfolio" onClick={handleClick}>
                <p
                  className={`nav-overlay-text lexend-tera ${
                    currentRoute.startsWith("/portfolio") ? "active-route" : ""
                  }`}
                >
                  PORTFOLIO
                </p>
              </Link>
            </li>
            <li
              style={{ animationDelay: "0.075s" }}
              className="slide-bottom-up-text overlay-link"
            >
              {currentRoute === "/about" && (
                <div className="nav-overlay-leaf">
                  <IoLeaf size={29} color="black" />
                </div>
              )}
              <Link href="/about" onClick={handleClick}>
                <p
                  className={`nav-overlay-text lexend-tera  ${
                    currentRoute === "/about" ? "active-route" : ""
                  }`}
                >
                  ABOUT
                </p>
              </Link>
            </li>
            <li
              style={{ animationDelay: "0.3s" }}
              className="slide-bottom-up-text overlay-link"
            >
              {currentRoute === "/contact" && (
                <div className="nav-overlay-leaf">
                  <IoLeaf size={29} color="black" />
                </div>
              )}
              <Link href="/contact" onClick={handleClick}>
                <p
                  className={`nav-overlay-text lexend-tera  ${
                    currentRoute === "/contact" ? "active-route" : ""
                  }`}
                >
                  CONTACT
                </p>
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* UNDER OVERLAY */}
      <div
        ref={navWhiteOverlayRef}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "white",
          position: "fixed",
          top: 0,
          opacity: 1,
          pointerEvents: "none",
          transition: "opacity 0.8s ease-in-out",
          zIndex: 999,
        }}
      ></div>
    </nav>
  );
};


