import React, { useEffect, useState } from "react";
import "./Admin.css";
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useNavigate, useLocation } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import About from "./Pages/About/About";
// import Projects from "./Pages/Projects/Projects";
// import Navbar from "./Components/Navbar/Navbar";
// import Archives from "./Pages/Archives/Archives";
// import "./App.css";
// import ProjectsPage from "./Pages/Projects/ProjectsPage/ProjectsPage";
// import useProjectColorsState from "./store/useProjectColorsStore";
// import useCurrentPageState from "./store/useCurrentPageStore";
// import useCurrentNavColorState from "./store/useCurrentNavColorStore";
// import useSelectedProjectNameState from "./store/useSelectedProjectNameStore";
// import useSelectedProjectState from "./store/useSelectedProjectStore";
// import useIncomingImageDimensionsState from "./store/useIncomingImageDimensionsState";
// import useIncomingImageStylesStore from "./store/useIncomingImageStylesStore";
// import useIncomingImageSpeedState from "./store/useIncomingImageSpeedState";
import useProjectAssetsStore from "../../store/useProjectAssetsStore";
import { useLocation } from "react-router-dom";
import useSelectedArchiveGroupStore from "../../store/useSelectedArchiveGroupStore";
import usePreloadedImagesStore from "../../store/usePreloadedImagesStore";
// import usePreloadedImagesStore from "./store/usePreloadedImagesStore";
// import useSelectedArchiveGroupStore from "./store/useSelectedArchiveGroupStore";

export type FileTree = {
  [key: string]: string | FileTree | FileTree[] | string[];
};

export type CoverInputObject = {
  [key: string]: { [key: string]: string };
};

export type CoverOutputItem = {
  title: string;
  subTitle: string;
  images: string[];
};

export type ProjectOutputItem = {
  title: string;
  bg_color: string;
  text_color: string;
  images: string[];
  covers: string[];
};

export type ProjectInputObject = {
  [key: string]: {
    covers?: { [key: string]: string };
    [key: string]: any;
  };
};

export type ArchivesInputObject = {
  [key: string]: { [key: string]: string };
};

export type ArchivesOutputItem = {
  title: string;
  bg_color: string;
  images: string[];
};

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <div className="loginBox">
          <h2 className="heading">Admin</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="input"
            />
            <button type="submit" className="button">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { projectAssets, setProjectAssets } = useProjectAssetsStore();

  useEffect(() => {
    const fetchFullRepoTree = async (
      owner: string,
      repo: string,
      branch = "master"
    ) => {
      const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
      const token = process.env.REACT_APP_GIT_PAT;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error(
            "Failed to fetch repository tree:",
            response.statusText
          );
          return null;
        }
        const data = await response.json();
        const tree = data.tree.reduce((acc: any, item: any) => {
          const parts = item.path.split("/");
          let current = acc;

          for (const part of parts) {
            if (!current[part]) {
              current[part] = item.type === "tree" ? {} : item.url;
            }
            current = current[part];
          }
          return acc;
        }, {});

        return tree;
      } catch (error) {
        console.error("Error fetching repository tree:", error);
        return null;
      }
    };

    const getRepoTree = async () => {
      const fullRepo = await fetchFullRepoTree("JosephGoff", "js-portfolio");
      console.log(fullRepo)
      if (fullRepo && Object.keys(fullRepo).length > 0 && fullRepo["public"]) {
        console.log("yes")
        if (
          Object.keys(fullRepo["public"]).length > 0 &&
          fullRepo["public"]["assets"]
        ) {
          console.log("yes2")

          const fullProject = fullRepo["public"]["assets"];
          // setProjectAssets(fullProject);
          console.log(fullProject)
        }
      }
    };

    getRepoTree();
  }, []);

  // const processAndSortProjectsObject = (
  //   input: ProjectInputObject
  // ): ProjectOutputItem[] => {
  //   const entries = Object.entries(input);
  //   const mappedEntries = entries.map(([key, value]) => {
  //     const [number, title, bg_color, text_color] = key.split("--");
  //     return {
  //       title,
  //       bg_color,
  //       text_color,
  //       covers:
  //         Object.keys(value).length > 0 &&
  //         value["covers"] &&
  //         Object.keys(value["covers"]).length > 0
  //           ? Object.keys(value["covers"]).map(
  //               (item) =>
  //                 `https://raw.githubusercontent.com/JosephGoff/js-portfolio/refs/heads/master/public/assets/projects/${key}/covers/` +
  //                 item
  //             )
  //           : [],
  //       images:
  //         Object.keys(value).length > 1
  //           ? [
  //               `https://raw.githubusercontent.com/JosephGoff/js-portfolio/refs/heads/master/public/assets/projects/${key}/` +
  //                 Object.keys(value).filter(
  //                   (item) => item.split(".")[0] === "cover"
  //                 ),
  //               ...Object.keys(value)
  //                 .filter(
  //                   (item) =>
  //                     item !== "covers" && item.split(".")[0] !== "cover"
  //                 ) // Filter out "cover" and non-numeric keys
  //                 .sort((a, b) => {
  //                   const aNum = a.split(".")[0]; // Extract numeric part of the filename
  //                   const bNum = b.split(".")[0];
  //                   return parseInt(aNum, 10) - parseInt(bNum, 10); // Sort numerically
  //                 })
  //                 .map(
  //                   (item) =>
  //                     `https://raw.githubusercontent.com/JosephGoff/js-portfolio/refs/heads/master/public/assets/projects/${key}/` +
  //                     item
  //                 ),
  //             ]
  //           : [],
  //       number: parseInt(number, 10),
  //     };
  //   });

  //   const sortedEntries = mappedEntries.sort((a, b) => a.number - b.number);
  //   return sortedEntries.map(({ number, ...rest }) => rest);
  // };

  // const processAndSortHomeCoversObject = (
  //   input: CoverInputObject
  // ): CoverOutputItem[] => {
  //   const entries = Object.entries(input);
  //   const mappedEntries = entries.map(([key, value]) => {
  //     const [number, title, subTitle] = key.split("--");
  //     return {
  //       title,
  //       subTitle,
  //       images: Object.keys(value).map(
  //         (item) =>
  //           `https://raw.githubusercontent.com/JosephGoff/js-portfolio/refs/heads/master/public/assets/home/${key}/` +
  //           item
  //       ),
  //       number: parseInt(number, 10), // Parse the number to use for sorting
  //     };
  //   });

  //   const sortedEntries = mappedEntries.sort((a, b) => a.number - b.number);
  //   return sortedEntries.map(({ number, ...rest }) => rest);
  // };

  // const processAndSortArchivesObject = (
  //   input: ArchivesInputObject
  // ): ArchivesOutputItem[] => {
  //   const entries = Object.entries(input);
  //   const mappedEntries = entries.map(([key, value]) => {
  //     const [number, title, bg_color] = key.split("--");
  //     return {
  //       title,
  //       bg_color,
  //       images: Object.keys(value).map(
  //         (item) =>
  //           `https://raw.githubusercontent.com/JosephGoff/js-portfolio/refs/heads/master/public/assets/archives/${key}/` +
  //           item
  //       ),
  //       number: parseInt(number, 10),
  //     };
  //   });

  //   const sortedEntries = mappedEntries.sort((a, b) => a.number - b.number);
  //   return sortedEntries.map(({ number, ...rest }) => rest);
  // };

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <button onClick={onLogout} className="button">
        Logout
      </button>
    </div>
  );
};

export default Admin;
