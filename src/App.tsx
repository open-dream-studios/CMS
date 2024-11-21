import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./Pages/Home/Home"
import About from "./Pages/About/About"

interface SlideUpPageProps {
  children: React.ReactNode; 
  isVisible: boolean;  
}     

type Page = "home" | "about";
type IncomingPage = "home" | "about" | null;

const SlideUpPage: React.FC<SlideUpPageProps> = ({ children, isVisible }) => (
  <motion.div
    initial={{ y: "100%" }}
    animate={isVisible ? { y: "0%" } : {}}
    exit={{}}
    transition={{ duration: 1, ease: "easeInOut" }}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "white",
      zIndex: isVisible ? 1 : 0, // Ensure the incoming page overlays the current one
    }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [incomingPage, setIncomingPage] = useState<IncomingPage>(null);

  const navigate = (page: Page) => {
    setIncomingPage(page); // Set the incoming page to trigger animation
    setTimeout(() => {
      setCurrentPage(page); // Once animation is done, switch to the new page
      setIncomingPage(null); // Reset incoming page
    }, 1000); // Match this timeout to the animation duration
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {currentPage === "home" && <Home navigateToAbout={() => navigate("about")} />}
      {currentPage === "about" && <About navigateToHome={() => navigate("home")} />}

      {/* Animate the incoming page */}
      {incomingPage === "about" && (
        <SlideUpPage isVisible>
          <About navigateToHome={() => navigate("home")} />
        </SlideUpPage>
      )}
      {incomingPage === "home" && (
        <SlideUpPage isVisible>
          <Home navigateToAbout={() => navigate("about")} />
        </SlideUpPage>
      )}
    </div>
  );
};

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;