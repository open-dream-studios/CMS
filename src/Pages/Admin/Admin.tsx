import React, { useEffect, useRef, useState } from "react";
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
import { FaTrash } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import Upload from "./Upload";
import ColorPicker from "./ColorPicker";

export function validateColor(input: string) {
  const isColorName = (color: string) => {
    const testElement = document.createElement("div");
    testElement.style.color = color;
    return testElement.style.color !== "";
  };
  const isHexCode = (color: string) =>
    /^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(color);
  if (isColorName(input)) {
    return input;
  }
  if (isHexCode(input)) {
    return input.startsWith("#") ? input : `#${input}`;
  }
  return "white";
}

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
  onRename: (newName: string) => void;
  popupTrigger: number;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  name,
  onRename,
  popupTrigger,
}) => {
  const [newName, setNewName] = useState(name);

  useEffect(() => {
    setNewName(name);
  }, [name, popupTrigger]);

  const handleRename = () => {
    onRename(newName);
    onClose();
  };

  const isValidFileNameChar = (char: any) => {
    const invalidChars = ["\\", "/", ":", "*", "?", '"', "<", ">", "|", "."];
    return !invalidChars.includes(char) && char !== "\n";
  };

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
          value={newName}
          onChange={(e) => {
            if (
              e.target.value
                .split("")
                .every((item) => isValidFileNameChar(item))
            ) {
              setNewName(e.target.value.trim());
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRename();
            }
          }}
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
            onClick={handleRename}
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
    <div className="flex justify-center items-center absolute left-0 top-0 h-[100vh] w-[100vw] pb-[10vh]">
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
  const owner = "JosephGoff";
  const repo = "js-portfolio";
  const branch = "master";
  const token = process.env.REACT_APP_GIT_PAT;

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
        console.error("Failed to fetch repository tree:", response.statusText);
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
    }
  };

  useEffect(() => {
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
    if (folderName.includes(".")) {
      const imagePath = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/public/assets/${
        currentPath.join("/") + "/" + folderName
      }`;
      window.location.href = imagePath;
      return;
    }
    setCurrentPath([...currentPath, folderName]);
  };

  const handleBackClick = () => {
    setCurrentPath(currentPath.slice(0, -1));
  };

  // POPUP
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupName, setPopupName] = useState("");
  const [popupTrigger, setPopupTrigger] = useState(0);
  const [popupExtention, setPopupExtention] = useState("");
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const openPopup = (name: string, path: any) => {
    if (name.includes(".")) {
      const extention = name.split(".").pop() || "";
      const imgName = name.slice(0, name.lastIndexOf("."));
      setPopupExtention(extention);
      setPopupName(imgName);
    } else {
      setPopupExtention("");
      setPopupName(name);
    }
    setPopupTrigger((prev) => prev + 1);
    setSelectedPath(path);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleDeleteItem = async (path: any) => {
    await deleteItem(
      "public/assets/" + path,
      path.split("/").pop().includes(".")
    );
    getRepoTree();
  };

  const copyItem = async (path: string, newPath: string, isImage: boolean) => {
    const fetchFolderContents = async (path: string) => {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch contents of ${path}`);
      }

      return isImage ? await response.json() : response.json();
    };

    const copyFile = async (
      sourcePath: string,
      destinationPath: string,
      sha: any
    ) => {
      const fetchWithRetry = async (url: string, options: any, retries = 3) => {
        for (let i = 0; i < retries; i++) {
          const response = await fetch(url, options);

          if (response.status === 403) {
            const rateLimitReset = response.headers.get("x-ratelimit-reset");
            if (rateLimitReset) {
              const waitTime = parseInt(rateLimitReset) * 1000 - Date.now();
              console.warn(
                `Rate limit hit. Retrying after ${waitTime / 1000}s.`
              );
              await new Promise((resolve) => setTimeout(resolve, waitTime));
            }
          } else if (response.ok) {
            return response;
          } else {
            console.error(`Request failed with status ${response.status}`);
          }
        }
        throw new Error("Failed after maximum retries.");
      };

      const fileContentResponse = await fetchWithRetry(
        `https://api.github.com/repos/${owner}/${repo}/contents/${sourcePath}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!fileContentResponse.ok) {
        throw new Error(`Failed to fetch file content for ${sourcePath}`);
      }

      const fileContent = await fileContentResponse.json();

      let content = fileContent.content;

      if (!content && fileContent.download_url) {
        const downloadResponse = await fetch(fileContent.download_url);
        const buffer = await downloadResponse.arrayBuffer();
        content = btoa(
          String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer)))
        );
      }

      const createResponse = await fetchWithRetry(
        `https://api.github.com/repos/${owner}/${repo}/contents/${destinationPath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            message: `Copying file from ${sourcePath} to ${destinationPath}`,
            content: content,
            branch,
          }),
        }
      );

      if (!createResponse.ok) {
        throw new Error(`Failed to copy file: ${sourcePath}`);
      }
    };

    const copyFolderContents = async (
      currentPath: string,
      newBasePath: string
    ) => {
      const contents = await fetchFolderContents(currentPath);

      await Promise.all(
        contents.map(async (item: any) => {
          const newPath = `${newBasePath}/${item.name}`;
          console.log(`Copying ${item.type}: ${item.path} to ${newPath}`);
          if (item.type === "file") {
            await copyFile(item.path, newPath, item.sha);
          } else if (item.type === "dir") {
            await copyFolderContents(item.path, newPath);
          }
        })
      );
    };

    try {
      await copyFolderContents(path, newPath);
    } catch (error) {
      console.error("Error copying item:", error);
    }
  };

  const deleteItem = async (path: string, isImage: boolean) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch folder contents");
      }

      const files = await response.json();

      if (isImage) {
        const deleteResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
            body: JSON.stringify({
              message: `Deleting file ${path}`,
              sha: files.sha,
              branch,
            }),
          }
        );

        if (!deleteResponse.ok) {
          throw new Error(`Failed to delete file: ${path}`);
        }
      } else {
        for (const file of files) {
          await deleteItem(file.path, file.type === "file");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const collectImgNames = () => {
    const splitPath = selectedPath?.split("/");
    let namesList: string[] = [];
    if (
      splitPath &&
      splitPath.length > 0 &&
      fullProject &&
      fullProject[splitPath[0]]
    ) {
      const page = fullProject[splitPath[0]] as any;
      if (splitPath[0] === "about") {
        namesList = Object.keys(page);
        return namesList;
      }

      if (splitPath.length > 1 && page[splitPath[1]]) {
        const contents = page[splitPath[1]];
        if (splitPath[0] === "archives") {
          namesList = Object.keys(contents);
          return namesList;
        }

        if (splitPath[0] === "projects" && splitPath.length === 2) {
          namesList = Object.keys(contents);
          return namesList;
        }

        if (splitPath.length > 2 && contents["covers"]) {
          namesList = Object.keys(contents["covers"]);
          return namesList;
        }
      }
    }
    return namesList;
  };

  const collectFolderNames = () => {
    const splitPath = selectedPath?.split("/");
    let namesList: string[] = [];
    if (
      splitPath &&
      splitPath.length > 0 &&
      fullProject &&
      fullProject[splitPath[0]]
    ) {
      const page = fullProject[splitPath[0]] as any;
      if (
        (splitPath[0] === "projects" || splitPath[0] === "archives") &&
        splitPath.length === 2
      ) {
        namesList = Object.keys(page);
        return namesList;
      }
    }
    return namesList;
  };

  const handleRename = async (newName: string) => {
    let originalName = "";
    let finalName = "";
    let folderContents = [];

    if (popupExtention !== "") {
      originalName = popupName + "." + popupExtention;
      finalName = newName + "." + popupExtention;
      folderContents = collectImgNames();
    } else {
      originalName = popupName;
      finalName = newName;
      folderContents = collectFolderNames();
    }

    if (originalName !== finalName && folderContents.includes(finalName)) {
      alert("Name is already used in this folder");
      return;
    }
    if (folderContents.length > 0 && originalName !== finalName) {
      const originalPath = "public/assets/" + selectedPath + originalName;
      const newPath = "public/assets/" + selectedPath + finalName;
      const isImage = originalPath.split("/").pop()?.includes(".") || false;
      await copyItem(originalPath, newPath, isImage);
      // await deleteItem(originalPath, isImage);
      getRepoTree();
    }
  };

  const handleStarChange = async (folder: string) => {
    let details = folder.split("--");
    if (details.length !== 6) return;
    details[5] = details[5] === "false" ? "true" : "false";
    const originalPath = "public/assets/projects/" + folder;
    const newPath = "public/assets/projects/" + details.join("--");
    console.log(originalPath, newPath);
    try {
      await copyItem(originalPath, newPath, false);
    } catch (error) {
      console.log(error);
      return;
    }
    try {
      await deleteItem(originalPath, false);
    } catch (error) {
      console.log(error);
      return;
    }
    getRepoTree();
  };

  const handleProjectColorsChange = async (folder: string) => {
    if (
      colorToChange.length === 2 &&
      (colorToChange[0] !== null || colorToChange[1] !== null)
    ) {
      let details = folder.split("--");
      if (details.length !== 6) return;
      if (colorToChange[0] !== null) {
        details[3] = colorToChange[0];
      }
      if (colorToChange[1] !== null) {
        details[4] = colorToChange[1];
      }
      const originalPath = "public/assets/projects/" + folder;
      const newPath =
        "public/assets/projects/" + details.join("--").replace("#", "");
      try {
        await copyItem(originalPath, newPath, false);
      } catch (error) {
        console.log(error);
        return;
      }
      try {
        await deleteItem(originalPath, false);
      } catch (error) {
        console.log(error);
        return;
      }
      getRepoTree();

      setChangedColorItems({});
      setColorToChange([null, null]);
    }
  };

  const [changedColorItems, setChangedColorItems] = useState<any>({});
  const [colorToChange, setColorToChange] = useState<any>([null, null]);
  const handleColorChange = (key: any, primary: boolean, newValue: string) => {
    const index = primary ? 0 : 1;
    const colorToChangeCopy = colorToChange;
    colorToChangeCopy[index] = newValue;
    setColorToChange(colorToChangeCopy);
    if (Object.keys(changedColorItems).length >= 1 && !changedColorItems[key]) {
      setChangedColorItems({});
    }
    setChangedColorItems((prev: any) => ({ ...prev, [key]: true }));
  };

  useEffect(() => {
    setChangedColorItems({});
    setColorToChange([null, null]);
  }, [currentPath]);

  const renderContent = () => {
    const currentFolder = getCurrentFolder();
    const githubBaseUrl =
      "https://raw.githubusercontent.com/JosephGoff/js-portfolio/master/public/assets/";
    if (typeof currentFolder === "string") {
      return <></>;
    }

    // Render folders or multiple items, including images
    return (
      <div
        className={`z-[997] flex flex-wrap gap-6 mt-6 ${
          currentPath[0] === "about" ||
          (currentPath[0] === "projects" && currentPath.length > 1) ||
          (currentPath[0] === "archives" && currentPath.length > 1)
            ? "pb-[35px] top-0 left-0 "
            : ""
        } min-h-[40px] justify-center absolute px-[22px]`}
        style={{ backgroundColor: "red" }}
      >
        {Object.keys(currentFolder).map((key, index) => {
          const details = key.split("--");
          let badDetails = false;
          if (
            currentPath[0] === "projects" &&
            key !== "covers" &&
            details.length !== 6
          ) {
            badDetails = true;
          }
          if (currentPath[0] === "archives" && details.length !== 3) {
            badDetails = true;
          }

          const isSecondaryFolder =
            typeof currentFolder[key] !== "string" &&
            ((currentPath[0] === "projects" && key !== "covers") ||
              currentPath[0] === "archives");

          const isProjectFolder =
            typeof currentFolder[key] !== "string" &&
            currentPath[0] === "projects" &&
            key !== "covers";

          const isArchivesFolder =
            typeof currentFolder[key] !== "string" &&
            currentPath[0] === "archives";

          const isStarred =
            !badDetails && isProjectFolder ? JSON.parse(details[5]) : false;

          return (
            <div
              key={key}
              className={`flex ${key === "covers" ? "h-[40px]" : ""} ${
                isSecondaryFolder
                  ? "flex-col"
                  : "items-center justify-center w-[calc(33%-1rem)] max-w-[33%] sm:w-[calc(18%-1rem)] sm:max-w-[20%] min-w-[150px] "
              } relative p-2 bg-[#f9f9f9] border border-[#bbb] rounded-lg cursor-pointer`}
              onClick={() => handleFolderClick(key)}
            >
              {key !== "blank.png" && (
                <>
                  {key !== "about" &&
                    key !== "archives" &&
                    key !== "projects" &&
                    key !== "covers" && (
                      <>
                        <button
                          className="absolute top-[-10px] left-[-10px] w-[25px] h-[25px] bg-white border border-black rounded-full flex items-center justify-center cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            const basePath = `${currentPath.join("/")}/`;
                            openPopup(key, basePath);
                          }}
                        >
                          <BiSolidPencil
                            className="ml-[-0.5px]"
                            color={"black"}
                            size={13}
                          />
                        </button>

                        <button
                          className="absolute top-[-10px] right-[-10px] w-[25px] h-[25px] bg-white border border-black rounded-full flex items-center justify-center cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Delete ${key}?`)) {
                              const fullPath = `${currentPath.join(
                                "/"
                              )}/${key}`;
                              handleDeleteItem(fullPath);
                            }
                          }}
                        >
                          <FaTrash
                            className="ml-[0px]"
                            color={"black"}
                            size={11}
                          />
                        </button>

                        {isProjectFolder && (
                          <button
                            className="absolute bottom-[-10px] left-[-10px] w-[25px] h-[25px] bg-white border border-black rounded-full flex items-center justify-center cursor-pointer"
                            onClick={async (e) => {
                              e.stopPropagation();
                              await handleStarChange(key);
                              getRepoTree();
                            }}
                          >
                            {isStarred ? (
                              <IoStar
                                className="mt-[-1px]"
                                color={"green"}
                                size={15}
                              />
                            ) : (
                              <IoStarOutline
                                className="mt-[-1px]"
                                color={"#888"}
                                size={15}
                              />
                            )}
                          </button>
                        )}
                      </>
                    )}
                  {typeof currentFolder[key] === "string" && (
                    <>
                      <img
                        src={`${githubBaseUrl}${currentPath.join("/")}/${key}`}
                        alt={key}
                        className="w-full h-auto mb-8"
                      />
                      <span className="absolute bottom-2">{key}</span>
                    </>
                  )}
                  {typeof currentFolder[key] !== "string" &&
                    currentPath[0] === "projects" &&
                    key !== "covers" && (
                      <div className="h-[200px] w-[auto]">
                        {badDetails ? (
                          <>{key}</>
                        ) : (
                          <div
                            className="flex flex-col"
                            style={{
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            <p>{details[1]}</p>
                            <p>{details[2]}</p>
                            <div className="flex flex-row gap-2 mt-[7px]">
                              <div
                                onClick={(e: any) => e.stopPropagation()}
                                className="w-[25px] h-[25px] relative"
                              >
                                <ColorPicker
                                  initialColor={details[3]}
                                  primary={true}
                                  onColorChange={(
                                    primary: boolean,
                                    newValue: string
                                  ) =>
                                    handleColorChange(key, primary, newValue)
                                  }
                                />
                              </div>
                              <div
                                onClick={(e: any) => e.stopPropagation()}
                                className="w-[25px] h-[25px] relative"
                              >
                                <ColorPicker
                                  initialColor={details[4]}
                                  primary={false}
                                  onColorChange={(
                                    primary: boolean,
                                    newValue: string
                                  ) =>
                                    handleColorChange(key, primary, newValue)
                                  }
                                />
                              </div>

                              {changedColorItems[key] && (
                                <button
                                  className="hover-dim7 ml-2 px-2 py-[2px] rounded text-[13px]"
                                  style={{
                                    color: "black",
                                    border: "1px solid black",
                                  }}
                                  onClick={(e: any) => {
                                    e.stopPropagation();
                                    handleProjectColorsChange(key);
                                  }}
                                >
                                  Done
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  {typeof currentFolder[key] !== "string" &&
                    currentPath[0] === "archives" && (
                      <div className="h-[200px] w-[auto]">
                        {badDetails ? (
                          <>{key}</>
                        ) : (
                          <div>
                            <p>{details[1]}</p>
                          </div>
                        )}
                      </div>
                    )}
                  {typeof currentFolder[key] !== "string" &&
                    (currentPath[0] !== "projects" || key === "covers") &&
                    currentPath[0] !== "archives" && (
                      <span className="">{key}</span>
                    )}
                </>
              )}
            </div>
          );
        })}
        <Popup
          isOpen={popupOpen}
          onClose={closePopup}
          name={popupName}
          onRename={handleRename}
          popupTrigger={popupTrigger}
        />
      </div>
    );
  };

  const [uploadPopup, setUploadPopup] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setUploadPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const uploadToGitHub = async (images: { name: string; src: string }[]) => {
    const currentBase = currentPath.join("/");
    try {
      for (const image of images) {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/public/assets/${currentBase}/${image.name}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `Add ${image.name}`,
              content: image.src.split(",")[1],
              branch: branch,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to upload ${image.name}: ${response.statusText}`
          );
        }
      }
    } catch (error) {
      console.error("Error uploading to GitHub:", error);
      alert("Failed to upload images to GitHub. Check console for details.");
    }
  };

  const uploadBlankImageToGitHub = async (folderName: string) => {
    try {
      const response = await fetch(`${window.location.origin}/blank.png`);
      if (!response.ok) {
        throw new Error("Failed to fetch the image from the public folder.");
      }
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = reader.result;

        if (typeof result === "string") {
          const base64Content = result.split(",")[1];
          if (
            currentPath.length === 1 &&
            (currentPath[0] === "projects" || currentPath[0] === "archives")
          ) {
            const githubResponse = await fetch(
              `https://api.github.com/repos/${owner}/${repo}/contents/public/assets/${currentPath[0]}/${folderName}/blank.png`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  message: "Add blank.png",
                  content: base64Content,
                  branch: branch,
                }),
              }
            );

            if (!githubResponse.ok) {
              throw new Error(
                `Failed to upload blank.png: ${githubResponse.statusText}`
              );
            }
          }
          console.log("upload successful");
        } else {
          throw new Error("Failed to read the image as a base64 string.");
        }
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error uploading to GitHub:", error);
      alert("Failed to upload blank.png to GitHub. Check console for details.");
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      const readerPromises = imageFiles.map((file) => {
        return new Promise<{ name: string; src: string }>((resolve) => {
          const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");

          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              name: sanitizedFileName,
              src: event.target?.result as string,
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises).then(async (images) => {
        setUploadPopup(false);
        await uploadToGitHub(images);
        getRepoTree();
      });
    } else {
      alert("Only image files are allowed!");
    }
  };

  const handleAddFolder = async (folderName: string) => {
    await uploadBlankImageToGitHub(folderName);
    setTimeout(() => {
      getRepoTree();
    }, 1000);
  };

  if (!fullProject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[100vw] h-[100vh]">
      {uploadPopup && (
        <>
          <div
            className="z-[999] absolute top-0 w-[100vw] h-[100vh]"
            style={{ backgroundColor: "black", opacity: 0.4 }}
          ></div>
          <div className="z-[999] absolute top-0 w-[100vw] h-[100vh] flex items-center justify-center">
            <div
              ref={divRef}
              className="w-[70%] aspect-[1.5/1] relative"
              style={{
                userSelect: "none",
                backgroundColor: "white",
                borderRadius: "30px",
                border: "3px solid black",
              }}
            >
              <Upload handleFiles={handleFiles} />
              <IoCloseOutline
                onClick={() => {
                  setUploadPopup(false);
                }}
                className="absolute top-2 right-3 z-[999]"
                style={{ cursor: "pointer" }}
                color={"black"}
                size={50}
              />
            </div>
          </div>
        </>
      )}
      <div
        className="z-[998] w-[100%] h-[63px] flex fixed top-0 left-0"
        style={{ borderBottom: "1px solid #ccc", backgroundColor: "white" }}
      >
        {currentPath.length > 0 && (
          <button
            onClick={handleBackClick}
            className="button absolute top-3 left-3"
          >
            Back
          </button>
        )}

        <div
          className={`h-[100%] flex items-center ${
            currentPath.length > 0 ? "ml-[100px]" : "ml-[30px]"
          } font-[500] text-[20px]`}
        >
          <div>Project Dashboard</div>
        </div>
        <button onClick={onLogout} className="button absolute top-3 right-3">
          Logout
        </button>
      </div>

      <div className="z-[998] w-[100%] h-[calc(100vh-63px)] absolute left-0 top-[63px] flex items-center justify-center">
        {currentPath.length > 0 &&
          (currentPath[0] === "about" ||
            (currentPath[0] === "archives" && currentPath.length === 2) ||
            (currentPath[0] === "projects" &&
              (currentPath.length === 2 || currentPath.length === 3))) && (
            <button
              onClick={() => {
                setUploadPopup(true);
              }}
              className="button absolute bottom-3 right-3"
            >
              Upload
            </button>
          )}

        {currentPath.length === 1 &&
          (currentPath[0] === "archives" || currentPath[0] === "projects") && (
            <button
              onClick={() => {
                const folderName = window.prompt("Folder Name:");
                if (folderName && folderName !== "") {
                  const sanitizedFolderName = folderName
                    .trim()
                    .replace(/[^a-zA-Z0-9-]/g, "_");
                  handleAddFolder(sanitizedFolderName);
                }
              }}
              className="button absolute bottom-3 right-3"
            >
              Add Folder
            </button>
          )}

        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
