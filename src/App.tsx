import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Projects from "./Pages/Projects/Projects";
import Navbar from "./Components/Navbar/Navbar";
import Archives from "./Pages/Archives/Archives";
import "./App.css";
import ProjectsPage from "./Pages/Projects/ProjectsPage/ProjectsPage";
import appData from "./app-details.json";
import useProjectColorsState from "./store/useProjectColorsStore";
import useProjectColorsNextState from "./store/useProjectColorsNextStore";
import useProjectColorsPrevState from "./store/useProjectColorsPrevStore";
import useCurrentPageState from "./store/useCurrentPageStore";

export interface SlideUpPageProps {
  children: React.ReactNode;
  isVisible: boolean;
  full: boolean;
  zIdx: number;
  nextColor: string;
}

export interface SlideUpProjectPageProps {
  isVisible: boolean;
  zIdx: number;
}

// export type Page = "home" | "about" | "projects" | "archives";
// export type IncomingPage = "home" | "about" | "projects" | "archives" | "projects" | null;
export type Page = string;
export type IncomingPage = string | null;
export interface PageProps {
  navigate: (page: Page) => void;
}

const SlideUpPage: React.FC<SlideUpPageProps> = ({
  children,
  isVisible,
  full,
  zIdx,
  nextColor,
}) => {
  return (
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
        background: full ? nextColor : "transparent",
        zIndex: isVisible ? zIdx : 0,
      }}
    >
      {children}
    </motion.div>
  );
};

const SlideUpProjectPage: React.FC<SlideUpProjectPageProps> = ({
  isVisible,
  zIdx,
}) => {
  const { projectColors, setProjectColors } = useProjectColorsState();
  const { projectColorsNext, setProjectColorsNext } =
    useProjectColorsNextState();

  return (
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
        background: projectColorsNext[0],
        // background: full ? "white" : "transparent",
        // zIndex: isVisible ? zIdx : 0, // Ensure the incoming page overlays the current one
        zIndex: 100,
      }}
    ></motion.div>
  );
};

const App = () => {
  // const [currentPage, setCurrentPage] = useState<Page>("home");
  const [incomingPage, setIncomingPage] = useState<IncomingPage>(null);
  const navigateTo = useNavigate();
  const location = useLocation();

  const { projectColors, setProjectColors } = useProjectColorsState();
  const { projectColorsNext, setProjectColorsNext } =
    useProjectColorsNextState();
  const { projectColorsPrev, setProjectColorsPrev } =
    useProjectColorsPrevState();
  const { currentPage, setCurrentPage } = useCurrentPageState();

  const projects = appData.pages.projects;
  const projectsList = projects.map((item) => item.link);

  useEffect(() => {
    const path = location.pathname.replace("/", "") || "home";
    // console.log(path)
    if (
      path !== currentPage && // Prevent redundant updates
      (["home", "about", "projects", "archives"].includes(path) ||
        (path.startsWith("projects/") &&
          projectsList.includes(path.split("/")[1]) &&
          path.split("/").length === 2))
    ) {
      setCurrentPage(path as Page);
    }
  }, [location, projectsList]);

  // useEffect(() => {
  //   const path = location.pathname.replace("/", "") || "home";
  //   if (
  //     ["home", "about", "projects", "archives"].includes(path) ||
  //     (path.startsWith("projects/") &&
  //       projectsList.includes(path.split("/")[1]) &&
  //       path.split("/").length === 2)
  //   ) {
  //     setCurrentPage(path as Page);
  //   }
  // }, [currentPage, location, projectsList]);

  const [disableTransition, setDisableTransition] = useState(false);
  const [cachedCurrent, setCachedCurrent] = useState<Page>("home");
  const [sittingProject, setSittingProject] = useState(false);

  const navigate = (page: Page) => {
    if (page === currentPage) return;

    const newVal = currentPage;
    if (
      page.startsWith("projects/") &&
      projectsList.includes(page.split("/")[1]) &&
      page.split("/").length === 2
    ) {
      setSittingProject(false);
    }
    setIncomingPage(page); // Set the incoming page to trigger animation
    setTimeout(() => {
      setCurrentPage(page); // Once animation is done, switch to the new page
      setIncomingPage(null); // Reset incoming page
      navigateTo(`/${page}`);
      window.scrollTo(0, 0);
      setDisableTransition(true);
      setTimeout(() => {
        setDisableTransition(false);
      }, 50);
      if (
        page.startsWith("projects/") &&
        projectsList.includes(page.split("/")[1]) &&
        page.split("/").length === 2
      ) {
        setSittingProject(true);
      } else {
        setSittingProject(false);
      }
      setCachedCurrent(newVal);
    }, 1000); // Match this timeout to the animation duration
  };

  // HOME PAGE COVER LAYOUT ORDER (num covers, 2 layouts available so far)
  const numberOfLayoutsCreated = 7;
  // Generate an array where each number is unique to the two next to it
const [layoutOrder, setLayoutOrder] = useState(() => {
  let previous = -1; // Start with a value that can't match the first random number
  const array = Array.from({ length: appData.pages.home.covers.length }, (_, index) => {
    let next;
    do {
      next = Math.floor(Math.random() * numberOfLayoutsCreated);
    } while (next === previous);
    previous = next;
    return next;
  });

  // Ensure the first and last elements are different
  if (array.length > 1 && array[0] === array[array.length - 1]) {
    let replacement;
    do {
      replacement = Math.floor(Math.random() * numberOfLayoutsCreated);
    } while (replacement === array[array.length - 2] || replacement === array[0]);
    array[array.length - 1] = replacement;
  }

  return array;
});

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <Navbar navigate={navigate} />
        <motion.div
          initial={{ y: 0 }}
          animate={
            incomingPage &&
            !(
              incomingPage.startsWith("projects/") &&
              projectsList.includes(incomingPage.split("/")[1]) &&
              incomingPage.split("/").length === 2 &&
              (currentPage === "projects" ||
                (currentPage.startsWith("projects/") &&
                  projectsList.includes(currentPage.split("/")[1]) &&
                  currentPage.split("/").length === 2))
            )
              ? { y: "-15%" }
              : { y: 0 }
          }
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
            zIndex: 102,
          }}
        >
          {currentPage === "home" && (
            <Home
              layoutOrder={layoutOrder}
              navigate={navigate}
              slideUpComponent={false}
            />
          )}
          {currentPage === "projects" && (
            <Projects
              navigate={navigate}
              page={null}
              currentPage={true}
              animate={true}
            />
          )}
          {currentPage === "about" && <About navigate={navigate} />}
          {currentPage === "archives" && (
            <Archives navigate={navigate} slideUpComponent={false} />
          )}
          {currentPage?.startsWith("projects/") &&
            projectsList.includes(currentPage.split("/")[1]) &&
            currentPage.split("/").length === 2 && (
              <>
                {sittingProject && (
                  <div
                    className="w-[calc(310px+2vw)] sm:w-[calc(360px+2vw)] md:w-[calc(410px+2vw)] h-[100vh] fixed left-0 top-0 "
                    style={{ backgroundColor: projectColors[0] }}
                  ></div>
                )}

                <Projects
                  navigate={navigate}
                  page={currentPage}
                  currentPage={true}
                  animate={
                    incomingPage
                      ? incomingPage.startsWith("projects/") &&
                        projectsList.includes(incomingPage.split("/")[1]) &&
                        incomingPage.split("/").length === 2 &&
                        currentPage !== "projects" &&
                        !(
                          currentPage.startsWith("projects/") &&
                          projectsList.includes(currentPage.split("/")[1]) &&
                          currentPage.split("/").length === 2
                        )
                      : !(
                          cachedCurrent.startsWith("projects/") &&
                          projectsList.includes(cachedCurrent.split("/")[1]) &&
                          cachedCurrent.split("/").length === 2
                        ) && cachedCurrent !== "projects"
                  }
                />

                <motion.div
                  initial={{ y: 0 }}
                  animate={
                    incomingPage &&
                    incomingPage.startsWith("projects/") &&
                    projectsList.includes(incomingPage.split("/")[1]) &&
                    incomingPage.split("/").length === 2 &&
                    currentPage.startsWith("projects/") &&
                    projectsList.includes(currentPage.split("/")[1]) &&
                    currentPage.split("/").length === 2
                      ? { y: "-15%" }
                      : { y: 0 }
                  }
                  transition={
                    disableTransition
                      ? { duration: 0 }
                      : { duration: 1, ease: [0.95, 0, 0.4, 1] }
                  }
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 100,
                    pointerEvents: "none",
                  }}
                >
                  <ProjectsPage
                    navigate={navigate}
                    page={currentPage}
                    slideUpComponent={false}
                  />
                </motion.div>
              </>
            )}
        </motion.div>

        {/* Animate the incoming page */}
        {incomingPage === "home" && (
          <SlideUpPage zIdx={702} isVisible full={true} nextColor={"white"}>
            <Home
              layoutOrder={layoutOrder}
              navigate={navigate}
              slideUpComponent={true}
            />
          </SlideUpPage>
        )}
        {incomingPage === "projects" && (
          <SlideUpPage zIdx={702} isVisible full={true} nextColor={"white"}>
            <Projects
              navigate={navigate}
              page={null}
              currentPage={false}
              animate={false}
            />
          </SlideUpPage>
        )}
        {incomingPage?.startsWith("projects/") &&
          projectsList.includes(incomingPage.split("/")[1]) &&
          incomingPage.split("/").length === 2 && (
            <>
              <div
                className="w-[calc(310px+2vw)] sm:w-[calc(360px+2vw)] md:w-[calc(410px+2vw)] h-[100vh] fixed left-0 top-0 "
                style={{ backgroundColor: projectColorsPrev[0] }}
              ></div>

              <Projects
                navigate={navigate}
                page={incomingPage}
                currentPage={false}
                animate={false}
              />
              <SlideUpProjectPage zIdx={100} isVisible></SlideUpProjectPage>

              <SlideUpPage
                zIdx={702}
                isVisible
                full={
                  (currentPage.startsWith("projects/") &&
                    projectsList.includes(currentPage.split("/")[1]) &&
                    currentPage.split("/").length === 2) ||
                  currentPage === "projects"
                    ? false
                    : true
                }
                nextColor={
                  (currentPage.startsWith("projects/") &&
                    projectsList.includes(currentPage.split("/")[1]) &&
                    currentPage.split("/").length === 2) ||
                  currentPage === "projects"
                    ? "white"
                    : projectColorsNext[0]
                }
              >
                <ProjectsPage
                  navigate={navigate}
                  page={incomingPage}
                  slideUpComponent={true}
                />
              </SlideUpPage>
            </>
          )}
        {incomingPage === "about" && (
          <SlideUpPage isVisible zIdx={702} full={true} nextColor={"white"}>
            <About navigate={navigate} />
          </SlideUpPage>
        )}
        {incomingPage === "archives" && (
          <SlideUpPage isVisible zIdx={702} full={true} nextColor={"white"}>
            <Archives navigate={navigate} slideUpComponent={true} />
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
