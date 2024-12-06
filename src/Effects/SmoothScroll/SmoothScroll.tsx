import React, { useEffect, useRef } from "react";
// import { usePathname } from "next/navigation";
import "./SmoothScroll.css";
import useWindowSize from "../../Hooks/useWindowSize";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const windowSize = useWindowSize();
  // const router = usePathname();
  const scrollingContainerRef = useRef<HTMLDivElement>(null);
  const data = {
    ease: 0.06,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  useEffect(() => {
    const handleResizeOrRouteChange = () => {
      setBodyHeight();
      data.current = window.scrollY;
      data.previous = window.scrollY;
    };

    handleResizeOrRouteChange();
    window.addEventListener("resize", handleResizeOrRouteChange);

    return () => {
      window.removeEventListener("resize", handleResizeOrRouteChange);
    };
  }, [windowSize.height]);

  const setBodyHeight = () => {
    if (scrollingContainerRef.current) {
      const contentHeight =
        scrollingContainerRef.current.getBoundingClientRect().height;
      document.body.style.height = `${contentHeight}px`;
    }
  };

  useEffect(() => {
    const smoothScrollingHandler = () => {
      data.current = window.scrollY;
      data.previous += (data.current - data.previous) * data.ease;
      data.rounded = Math.round(data.previous * 100) / 100;

      // Smooth scroll effect
      if (scrollingContainerRef.current) {
        scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`;
      }

      requestAnimationFrame(smoothScrollingHandler);
    };

    requestAnimationFrame(smoothScrollingHandler);
  }, []);

  return (
    <div className="parent">
      <div ref={scrollingContainerRef}>{children}</div>
    </div>
  );
};

export default SmoothScroll;
