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
import Upload from "./Upload";

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

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, name, onRename, popupTrigger }) => {
  const [newName, setNewName] = useState(name);

  useEffect(() => {
    setNewName(name);
    console.log("name changed")
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
      console.log(name)
    }
    setPopupTrigger(prev => prev + 1)
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

  const owner = "JosephGoff";
  const repo = "js-portfolio";
  const branch = "master";
  const token = process.env.REACT_APP_GIT_PAT;

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
      const fileContentResponse = await fetch(
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

      // Create file in the new location
      const createResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${destinationPath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            message: `Copying file from ${sourcePath} to ${destinationPath}`,
            content: fileContent.content,
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
      if (isImage) {
        const fileContent = await fetchFolderContents(currentPath);
        await copyFile(currentPath, newBasePath, fileContent.sha);
        return;
      }

      const contents = await fetchFolderContents(currentPath);

      for (const item of contents) {
        const newPath = `${newBasePath}/${item.name}`;

        if (item.type === "file") {
          await copyFile(item.path, newPath, item.sha);
        } else if (item.type === "dir") {
          await copyFolderContents(item.path, newPath);
        }
      }
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
          const deleteResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github.v3+json",
              },
              body: JSON.stringify({
                message: `Deleting file ${file.path}`,
                sha: file.sha,
                branch,
              }),
            }
          );

          if (!deleteResponse.ok) {
            throw new Error(`Failed to delete file: ${file.path}`);
          }
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
      originalName = popupName
      finalName = newName
      folderContents = collectFolderNames();
    }
    console.log(folderContents);

    if (originalName !== finalName && folderContents.includes(finalName)) {
      alert("Name is already used in this folder");
      return;
    }
    if (folderContents.length > 0 && originalName !== finalName) {
      const originalPath = "public/assets/" + selectedPath + originalName;
      const newPath = "public/assets/" + selectedPath + finalName;
      const isImage = originalPath.split("/").pop()?.includes(".") || false;
      await copyItem(originalPath, newPath, isImage);
      await deleteItem(originalPath, isImage);
      getRepoTree();
    }
  };

  const renderContent = () => {
    const currentFolder = getCurrentFolder();

    const githubBaseUrl =
      "https://raw.githubusercontent.com/JosephGoff/js-portfolio/master/public/assets/";

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
          <>
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
                e.stopPropagation();
                const basePath = `${currentPath.join("/")}/`;
                openPopup(currentFolder, basePath);
              }}
            >
              <BiSolidPencil className="ml-[-1px]" color={"black"} size={13} />
            </button>

            <button
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                width: "20px",
                height: "20px",
                backgroundColor: "#fff",
                border: "1px solid #000",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              className="flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                const fullPath = `${currentPath.join("/")}/${currentFolder}`;
                if (window.confirm(`Delete ${currentFolder}?`)) {
                  handleDeleteItem(fullPath);
                }
              }}
            >
              <FaTrash className="ml-[-1px]" color={"black"} size={13} />
            </button>

            <img
              src={`${githubBaseUrl}${currentPath.join("/")}/${currentFolder}`}
              alt="File"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <Popup
              isOpen={popupOpen}
              onClose={closePopup}
              name={popupName}
              onRename={handleRename}
              popupTrigger={popupTrigger}
            />
          </>
        </div>
      );
    }

    // Render folders or multiple items, including images
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
            {key !== "about" && key !== "archives" && key !== "projects" && (
              <>
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
                    e.stopPropagation();
                    const basePath = `${currentPath.join("/")}/`;
                    openPopup(key, basePath);
                  }}
                >
                  <BiSolidPencil
                    className="ml-[-1px]"
                    color={"black"}
                    size={13}
                  />
                </button>

                <button
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#fff",
                    border: "1px solid #000",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  className="flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Delete ${key}?`)) {
                      const fullPath = `${currentPath.join("/")}/${key}`;
                      handleDeleteItem(fullPath);
                    }
                  }}
                >
                  <FaTrash className="ml-[-1px]" color={"black"} size={13} />
                </button>
              </>
            )}
            {typeof currentFolder[key] === "string" && (
              <img
                src={`${githubBaseUrl}${currentPath.join("/")}/${key}`}
                alt={key}
                style={{ width: "100px", height: "auto", marginBottom: "5px" }}
              />
            )}
            <span>{key}</span>
          </div>
        ))}
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

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      const readerPromises = imageFiles.map((file) => {
        return new Promise<{ name: string; src: string }>((resolve) => {
          const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");

          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({ name: sanitizedFileName, src: event.target?.result as string });
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
              className="w-[70%] aspect-[1.5/1]"
              style={{
                userSelect: "none",
                backgroundColor: "white",
                borderRadius: "30px",
                border: "3px solid black",
              }}
            >
              <Upload handleFiles={handleFiles} />
            </div>
          </div>
        </>
      )}
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

        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
