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
import { BiSolidPencil } from "react-icons/bi";

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

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, name }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <textarea
          className="py-1 px-2"
          style={{
            width: "100%",
            height: "100px",
            resize: "none",
            overflowY: "auto",
            border: "1px solid #CCC",
            borderRadius: "3px",
          }}
          defaultValue={name}
        />
        <div className="flex flex-row mt-[9px]">
          <button
            className="w-[48.5%] mr-[3%] p-[10px] cursor-pointer"
            style={{
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-[48.5%] p-[10px] cursor-pointer"

            style={{
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
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

interface FolderStructure {
  [key: string]: FolderStructure | string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  // const { projectAssets, setProjectAssets } = useProjectAssetsStore();
  const [fullProject, setFullProject] = useState<FolderStructure | null>(null);

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
      if (fullRepo && fullRepo["public"]?.["assets"]) {
        const { icons, ...filteredProject } = fullRepo["public"]["assets"];
        setFullProject(filteredProject);
        console.log(filteredProject);
      }
    };

    getRepoTree();
  }, []);

  const [currentPath, setCurrentPath] = useState<string[]>([]);

  // Helper function to get the current folder contents
  const getCurrentFolder = (): FolderStructure | string => {
    if (!fullProject) return {};
    return currentPath.reduce(
      (acc: FolderStructure, key) => acc[key] as FolderStructure,
      fullProject
    );
  };

  const handleFolderClick = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
  };

  const handleBackClick = () => {
    setCurrentPath(currentPath.slice(0, -1));
  };
  const renderContent = () => {
    const currentFolder = getCurrentFolder();

    if (typeof currentFolder === "string") {
      // Render an individual image
      return (
        <div
          style={{
            position: "relative",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "-10px",
              left: "-10px",
              width: "20px",
              height: "20px",
              backgroundColor: "#fff",
              border: "1px solid #000",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            className="flex items-center justify-center"
            onClick={(e) => {
              console.log(2);
              e.stopPropagation();
              openPopup(currentFolder);
            }}
          >
            <BiSolidPencil className="ml-[-1px]" color={"black"} size={13} />
          </button>
          <img
            src={currentFolder}
            alt="File"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <Popup isOpen={popupOpen} onClose={closePopup} name={popupName} />
        </div>
      );
    }

    // Render folder or multiple items
    return (
      <div className="flex flex-row gap-5 mt-10">
        {Object.keys(currentFolder).map((key) => (
          <div
            key={key}
            style={{
              position: "relative",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
            }}
            onClick={() => handleFolderClick(key)}
          >
            {key !== "about" && key !== "archives" && key !== "projects" && <button
              style={{
                position: "absolute",
                top: "-10px",
                left: "-10px",
                width: "20px",
                height: "20px",
                backgroundColor: "#fff",
                border: "1px solid #000",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              className="flex items-center justify-center"
              onClick={(e) => {
                console.log(1);
                e.stopPropagation();
                openPopup(key);
              }}
            >
              <BiSolidPencil className="ml-[-1px]" color={"black"} size={13} />
            </button>}
            <span>{key}</span>
          </div>
        ))}
        <Popup isOpen={popupOpen} onClose={closePopup} name={popupName} />
      </div>
    );
  };

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupName, setPopupName] = useState<string>("");

  const openPopup = (name: string) => {
    setPopupName(name);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  if (!fullProject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[100vw] h-[100vh]">
      <div
        className="w-[100%] h-[63px] flex absolute top-0 left-0"
        style={{ borderBottom: "1px solid #ccc" }}
      >
        <div className="h-[100%] flex items-center ml-[30px] font-[500] text-[20px]">
          <div>Project Dashboard</div>
        </div>
        <button onClick={onLogout} className="button absolute top-3 right-3">
          Logout
        </button>
      </div>

      <div className="w-[100%] h-[calc(100%-63px)] absolute left-0 top-[63px] px-[30px] flex items-center justify-center">
        {currentPath.length > 0 && (
          <button
            onClick={handleBackClick}
            className="button absolute top-3 left-3"
          >
            Back
          </button>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
