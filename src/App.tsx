import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Projects from "./Pages/Projects/Projects";
import Navbar from "./Components/Navbar/Navbar";
import Archives from "./Pages/Archives/Archives";
import "./App.css";

export interface SlideUpPageProps {
  children: React.ReactNode;
  isVisible: boolean;
}

export type Page = "home" | "about" | "projects" | "archives";
export type IncomingPage = "home" | "about" | "projects" | "archives" | null;
export interface PageProps {
  navigate: (page: Page) => void;
}

const SlideUpPage: React.FC<SlideUpPageProps> = ({ children, isVisible }) => (
  <motion.div
    initial={{ y: "100%" }}
    animate={isVisible ? { y: "0%" } : {}}
    exit={{}}
    transition={{ duration: 1, ease: [0.95, 0, 0.4, 1] }}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "white",
      zIndex: isVisible ? 103 : 0, // Ensure the incoming page overlays the current one
    }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [incomingPage, setIncomingPage] = useState<IncomingPage>(null);
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace("/", "") || "home";
    if (["home", "about", "projects", "archives"].includes(path)) {
      setCurrentPage(path as Page);
    }
  }, [location]);

const [disableTransition, setDisableTransition] = useState(false);
  const navigate = (page: Page) => {
    if (page === currentPage) return;
    setIncomingPage(page); // Set the incoming page to trigger animation
    setTimeout(() => {
      setCurrentPage(page); // Once animation is done, switch to the new page
      setIncomingPage(null); // Reset incoming page
      navigateTo(`/${page}`);
      window.scrollTo(0, 0); 
      setDisableTransition(true);
      setTimeout(() => {
      setDisableTransition(false);
    }, 10);

    }, 1000); // Match this timeout to the animation duration
  };

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Navbar navigate={navigate} />
        <motion.div
          initial={{ y: 0 }}
          animate={incomingPage ? { y: "-15%" } : { y: 0 }}
                 transition={
          disableTransition
            ? { duration: 0 } // Disable transition
            : { duration: 1, ease: [0.95, 0, 0.4, 1] } // Enable animation
        }
          // transition={{ duration: 1, ease: [0.95, 0, 0.4, 1] }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 101,
          }}
        >
          {currentPage === "home" && <Home navigate={navigate} />}
          {currentPage === "about" && <About navigate={navigate} />}
          {currentPage === "projects" && <Projects navigate={navigate} />}
          {currentPage === "archives" && <Archives navigate={navigate} />}
        </motion.div>

        {/* Animate the incoming page */}
        {incomingPage === "home" && (
          <SlideUpPage isVisible>
            <Home navigate={navigate} />
          </SlideUpPage>
        )}
        {incomingPage === "about" && (
          <SlideUpPage isVisible>
            <About navigate={navigate} />
          </SlideUpPage>
        )}
        {incomingPage === "projects" && (
          <SlideUpPage isVisible>
            <Projects navigate={navigate} />
          </SlideUpPage>
        )}
        {incomingPage === "archives" && (
          <SlideUpPage isVisible>
            <Archives navigate={navigate} />
          </SlideUpPage>
        )}
      </div>
    </>
  );
};

const Root = () => (
  <>
    <Router>
      <App />
    </Router>
  </>
);

export default Root;
