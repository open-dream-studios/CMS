import Hero from "./Hero/Hero";
import { useEffect, useRef, useState } from "react";
import { RxChevronUp } from "react-icons/rx";
import { PiArrowUpThin } from "react-icons/pi";

const Slider = () => {
  const [scrollDirection, setScrollDirection] = useState(0);
  const duration = 1200;
  const homeOverlayRef = useRef<HTMLDivElement>(null);
  const portfolioButtonRef = useRef<HTMLButtonElement>(null);
  const porfolioArrowButtonRef = useRef<HTMLButtonElement>(null);

  // On page load, fade in
  useEffect(() => {
    setTimeout(() => {
      if (portfolioButtonRef.current) {
        portfolioButtonRef.current.style.opacity = "1";
        setTimeout(() => {
          if (porfolioArrowButtonRef.current) {
            porfolioArrowButtonRef.current.style.opacity = "1";
          }
        }, 700);
      }
    }, 300);
  }, []);

  // Custom scroll function for any target position
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

  // Scroll Up function (1.2 seconds long)
  const scrollUp = () => {
    customScroll(0); // Scroll up to the top of the page
  };

  const finalLineWidth = useRef<number>(300);
  const toggleSpacing = useRef<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY >= windowHeight && scrollDirection !== 1) {
        setScrollDirection(1); // Scrolled beyond 1x the window height
      } else if (scrollY < windowHeight && scrollDirection !== 0) {
        setScrollDirection(0); // Scrolled back to less than 1x the window height
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDirection]);


  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          zIndex: 101,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
          position: "absolute",
          flexDirection: "column",
          top: 0,
        }}
      >
        {/* <button
          ref={portfolioButtonRef}
          onClick={scrollDown}
          style={{
            pointerEvents: "all",
            opacity: 0,
            transition: "opacity 1.8s ease",
          }}
        >
          <p
            style={{ color: "white", fontSize: "calc(30px + 5vw)" }}
            className="raleway-text"
          >
            PORTFOLIO
          </p>
        </button> */}

        <button
          ref={porfolioArrowButtonRef}
          onClick={scrollDown}
          style={{
            pointerEvents: "all",
            position: "absolute",
            bottom: 20,
            opacity: 0,
            transition: "opacity 1.8s ease",
          }}
        >
          <PiArrowUpThin color="white" size={46} />
        </button>
      </div>

      {scrollDirection === 1 && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            zIndex: 101,
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: 20,
            paddingBottom: 15,
            alignItems: "flex-end",
            pointerEvents: "none",
            position: "fixed",
            top: 0,
          }}
        >
          <button style={{ pointerEvents: "all" }} onClick={scrollUp}>
            <RxChevronUp color="white" size={35} />
          </button>
        </div>
      )}

      <Hero setCurrentHeroImgUrl={()=>{}} images={[]} haltSlider={false}/>
    </>
  );
}

export default Slider