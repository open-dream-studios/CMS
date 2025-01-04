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
import axios from "axios";
import { DotLoader } from "react-spinners";

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

const unSanitizeTitle = (title: string, subTitle: boolean) => {
  if (subTitle) {
    title = title.toUpperCase();
  } else {
    title = title
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("_");
  }
  const newTitle = title.replaceAll("_", " ").trim();
  return newTitle;
};

const sanitizeTitle = (title: string) => {
  return title.trim().replaceAll(" ", "_").toLowerCase();
};

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
  title: string;
  desc: string;
  onRename: (newTitle: string, newDesc: string) => void;
  popupTrigger: number;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  desc,
  onRename,
  popupTrigger,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDesc] = useState(desc);

  useEffect(() => {
    setNewTitle(title);
    setNewDesc(desc);
  }, [title, desc, popupTrigger]);

  const handleRename = () => {
    onRename(sanitizeTitle(newTitle), sanitizeTitle(newDesc));
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
        className="flex flex-col p-[20px] w-[300px]"
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <p className="font-[500] text-[14px] mb-[1px]">
          {desc === "" ? "Image Name" : "Title"}
        </p>
        <textarea
          className="py-1 px-2"
          style={{
            width: "100%",
            height: "60px",
            resize: "none",
            overflowY: "auto",
            border: "1px solid #CCC",
            borderRadius: "3px",
          }}
          value={newTitle}
          onChange={(e) => {
            if (
              e.target.value
                .split("")
                .every((item) => isValidFileNameChar(item))
            ) {
              setNewTitle(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRename();
            }
          }}
        />
        {desc !== "" && (
          <>
            <p className="font-[500] text-[14px] mb-[1px] mt-[10px]">
              Description
            </p>
            <textarea
              className="py-1 px-2"
              style={{
                width: "100%",
                height: "90px",
                resize: "none",
                overflowY: "auto",
                border: "1px solid #CCC",
                borderRadius: "3px",
              }}
              value={newDesc}
              onChange={(e) => {
                if (
                  e.target.value
                    .split("")
                    .every((item) => isValidFileNameChar(item))
                ) {
                  setNewDesc(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRename();
                }
              }}
            />
          </>
        )}
        <div className="flex flex-row mt-[13px]">
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
  const [loading, setLoading] = useState(false);

  // const { projectAssets, setProjectAssets } = useProjectAssetsStore();
  const [fullProject, setFullProject] = useState<FolderStructure | null>(null);
  const owner = "JosephGoff";
  const repo = "js-portfolio";
  const branch = "master";
  const token = process.env.REACT_APP_GIT_PAT;

  // APP.JSON
  const [appFile, setAppFile] = useState<any>({});

  const fetchAppFileContents = async (blobUrl: string) => {
    try {
      const response = await fetch(blobUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch blob: ${blobUrl}`);
      }

      const data = await response.json();
      const fileContent = atob(data.content);

      if (fileContent) {
        try {
          const parsedContent = JSON.parse(fileContent);
          setAppFile(parsedContent);
        } catch (error) {
          console.error("Error parsing JSON content:", error);
        }
      }

      return fileContent;
    } catch (error) {
      console.error("Error fetching file contents:", error);
    }
  };

  async function updateAppFile() {
    const filePath = "src/app.json";
    try {
      const fileInfoUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
      const headers = { Authorization: `Bearer ${token}` };
      const { data: fileInfo } = await axios.get(fileInfoUrl, { headers });
      const fileSha = fileInfo.sha;
      const updatedContent = btoa(
        typeof appFile === "string" ? appFile : JSON.stringify(appFile)
      );
      const updateFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
      const commitMessage = "Update app.json with new content";
      await axios.put(
        updateFileUrl,
        {
          message: commitMessage,
          content: updatedContent,
          sha: fileSha,
          branch,
        },
        { headers }
      );
      console.log("File updated successfully");
    } catch (error) {
      console.error("Error updating the file:", error);
    }
  }

  const getFolderItem = (key: string) => {
    const pageName =
      currentPath[0] === "archives"
        ? "archives"
        : currentPath[0] === "projects"
        ? "projects"
        : null;
    if (pageName === null) return null;
    if (Object.keys(appFile).length === 0) return null;
    const pages = appFile["pages"];
    if (!pages || Object.keys(pages).length === 0) return null;
    const page = pages[pageName];
    if (!page || page.length === 0) return null;
    const projectItem = page.find((item: any) => item.id === key);
    if (!projectItem) return null;
    return projectItem;
  };

  const updateAppData = async () => {
    await updateAppFile();
    await getRepoTree();
  };

  // FULL REPOSITORY
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
    if (fullRepo["src"]["app.json"]) {
      const appFileURL = fullRepo["src"]["app.json"];
      await fetchAppFileContents(appFileURL);
    }
  };

  useEffect(() => {
    getRepoTree();
  }, []);

  const [currentPath, setCurrentPath] = useState<string[]>([]);

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
  const [popupKey, setPopupKey] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [popupDesc, setPopupDesc] = useState("");
  const [popupTrigger, setPopupTrigger] = useState(0);
  const [popupExtention, setPopupExtention] = useState("");
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const openPopup = (name: string, path: any) => {
    if (name.includes(".")) {
      const extention = name.split(".").pop() || "";
      const imgName = name.slice(0, name.lastIndexOf("."));
      setPopupExtention(extention);
      setPopupTitle(imgName);
      setPopupKey(imgName);
      setPopupDesc("");
    } else {
      const projectItem = getFolderItem(name);
      if (projectItem === null) return;
      setPopupExtention("");
      setPopupKey(name);
      setPopupTitle(unSanitizeTitle(projectItem.title, false));
      setPopupDesc(unSanitizeTitle(projectItem.description, true));
    }
    setPopupTrigger((prev) => prev + 1);
    setSelectedPath(path);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleDeleteItem = async (path: any) => {
    setLoading(true);
    try {
      let pageName = null;
      let index = null;
      if (!path.split("/").pop().includes(".")) {
        pageName =
          currentPath[0] === "archives"
            ? "archives"
            : currentPath[0] === "projects"
            ? "projects"
            : null;
        if (pageName === null) return null;
        if (Object.keys(appFile).length === 0) return null;
        const pages = appFile["pages"];
        if (!pages || Object.keys(pages).length === 0) return null;
        const page = pages[pageName];
        if (!page || page.length === 0) return null;
        index = page.findIndex((item: any) => item.id === path.split("/")[1]);
        if (index === null) return null;
      }

      await deleteItem(
        "public/assets/" + path,
        path.split("/").pop().includes(".")
      );

      if (
        !path.split("/").pop().includes(".") &&
        pageName !== null &&
        index !== null
      ) {
        const appFileCopy = appFile;
        appFileCopy["pages"][pageName].splice(index, 1);
        setAppFile(appFileCopy);
        updateAppData();
      }

      await getRepoTree();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyFolderOnGithub = async (
    sourcePath: string,
    destinationPath: string
  ) => {
    try {
      const baseURL = `https://api.github.com/repos/${owner}/${repo}/contents`;
      const headers = {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      };

      const fetchFolderContents = async (path: string) => {
        const response = await axios.get(`${baseURL}/${path}?ref=${branch}`, {
          headers,
        });
        if (response.status !== 200)
          throw new Error(`Failed to fetch folder: ${path}`);
        return response.data;
      };

      const fetchFileContent = async (path: string) => {
        const response = await axios.get(`${baseURL}/${path}?ref=${branch}`, {
          headers,
        });
        if (response.status !== 200)
          throw new Error(`Failed to fetch file: ${path}`);
        return response.data.content; // This is base64 encoded.
      };

      const uploadFile = async (path: string, content: any) => {
        const data = {
          message: `Copying file to ${path}`,
          content, // base64 encoded
          branch,
        };
        const response = await axios.put(`${baseURL}/${path}`, data, {
          headers,
        });
        if (response.status !== 201)
          throw new Error(`Failed to upload file: ${path}`);
      };

      const processFolder = async (source: any, destination: any) => {
        const folderContents = await fetchFolderContents(source);
        for (const item of folderContents) {
          if (item.type === "dir") {
            // Recurse into subfolders.
            await processFolder(
              `${source}/${item.name}`,
              `${destination}/${item.name}`
            );
          } else if (item.type === "file") {
            // Fetch and upload the file.
            const fileContent = await fetchFileContent(
              `${source}/${item.name}`
            );
            await uploadFile(`${destination}/${item.name}`, fileContent);
          }
        }
      };

      console.log(`Starting to copy from ${sourcePath} to ${destinationPath}`);
      await processFolder(sourcePath, destinationPath);
      console.log("Folder copy completed successfully!");
    } catch (error) {
      console.error("An error occurred during the folder copy:", error);
      if (error) {
        console.error("Response data:", error);
      }
    }
  };

  const copyImageOnGithub = async (
    sourcePath: string,
    destinationPath: string
  ) => {
    try {
      const baseURL = `https://api.github.com/repos/${owner}/${repo}/contents`;
      const headers = {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      };

      const fetchFileContent = async (path: string) => {
        const response = await axios.get(`${baseURL}/${path}?ref=${branch}`, {
          headers,
        });
        if (response.status !== 200)
          throw new Error(`Failed to fetch file: ${path}`);
        return response.data.content; // This is base64 encoded.
      };

      const uploadFile = async (path: string, content: any) => {
        const data = {
          message: `Copying file to ${path}`,
          content,
          branch,
        };
        const response = await axios.put(`${baseURL}/${path}`, data, {
          headers,
        });
        if (response.status !== 201)
          throw new Error(`Failed to upload file: ${path}`);
      };

      console.log(
        `Starting to copy image from ${sourcePath} to ${destinationPath}`
      );
      const fileContent = await fetchFileContent(sourcePath); // Fetch the image content.
      await uploadFile(destinationPath, fileContent); // Upload it to the new location.
      console.log("Image file copy completed successfully!");
    } catch (error) {
      console.error("An error occurred during the image copy:", error);
      if (error) {
        console.error("Response data:", error);
      }
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
        throw new Error(`Failed to fetch folder contents for path: ${path}`);
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
        console.log(`Successfully deleted image file: ${path}`);
      } else {
        console.log(`Deleting folder and its contents: ${path}`);
        for (const file of files) {
          await deleteItem(file.path, file.type === "file");
        }
        console.log(`Successfully deleted all contents of folder: ${path}`);
      }
    } catch (error) {
      console.error(`Error while deleting item at path: ${path}`, error);
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

  const handleRename = async (newTitle: string, newDesc: string) => {
    if (popupExtention === "") {
      const projectItem = getFolderItem(popupKey);
      const pageName =
        currentPath[0] === "archives"
          ? "archives"
          : currentPath[0] === "projects"
          ? "projects"
          : null;
      if (pageName === null || projectItem === null) return;
      const index = appFile["pages"][pageName].findIndex(
        (item: any) => item === projectItem
      );
      const folderContents = collectFolderNames();
      const folderNames = folderContents.map(
        (item, index) => appFile["pages"][pageName][index].title
      );
      if (folderNames.includes(newTitle)) {
        alert("That name is already being used in this folder");
        return;
      }
      const appFileCopy = appFile;
      appFileCopy["pages"][pageName][index].title = newTitle;
      appFileCopy["pages"][pageName][index].description = newDesc;
      setAppFile(appFileCopy);
      await updateAppData();
    } else {
      const folderContents = collectImgNames();
      const originalName = popupKey + "." + popupExtention;
      const imageName = newTitle + "." + popupExtention;
      if (popupTitle !== newTitle && folderContents.length > 0) {
        if (folderContents.includes(imageName)) {
          alert("That name is already being used in this folder");
          return;
        }
        const originalPath = "public/assets/" + selectedPath + originalName;
        const newPath = "public/assets/" + selectedPath + imageName;
        await copyImageOnGithub(originalPath, newPath);
        await deleteItem(originalPath, true);
      }
      await getRepoTree();
    }
  };

  const handleStarChange = async (key: string) => {
    const projectItem = getFolderItem(key);
    if (projectItem === null) return;
    const appFileCopy = appFile;
    const index = appFileCopy["pages"]["projects"].findIndex(
      (item: any) => item === projectItem
    );
    appFileCopy["pages"]["projects"][index].home_page = !projectItem.home_page;
    await updateAppData();
  };

  const handleProjectColorsChange = async (key: string) => {
    if (
      colorToChange.length === 2 &&
      (colorToChange[0] !== null || colorToChange[1] !== null)
    ) {
      const projectItem = getFolderItem(key);
      if (projectItem === null) return;
      const appFileCopy = appFile;
      const index = appFileCopy["pages"]["projects"].findIndex(
        (item: any) => item === projectItem
      );
      if (colorToChange[0] !== null) {
        appFileCopy["pages"]["projects"][index].bg_color = colorToChange[0];
      }
      if (colorToChange[1] !== null) {
        appFileCopy["pages"]["projects"][index].text_color = colorToChange[1];
      }
      await updateAppData();
    }
    setChangedColorItems({});
    setColorToChange([null, null]);
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
        className={`z-[990] flex flex-wrap gap-6 mt-6 ${
          currentPath[0] === "about" ||
          (currentPath[0] === "projects" && currentPath.length > 1) ||
          (currentPath[0] === "archives" && currentPath.length > 1)
            ? "pb-[35px] top-0 left-0 "
            : ""
        } min-h-[40px] justify-center absolute px-[22px]`}
        // style={{ backgroundColor: "red" }}
      >
        {Object.keys(currentFolder).map((key, index) => {
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

          let projectFound = true;
          const projectItem = getFolderItem(key);
          if (projectItem === null) {
            projectFound = false;
          }

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
                            if (window.confirm(`Delete item?`)) {
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

                        {isProjectFolder && projectFound && (
                          <button
                            className="absolute bottom-[-10px] left-[-10px] w-[25px] h-[25px] bg-white border border-black rounded-full flex items-center justify-center cursor-pointer"
                            onClick={async (e) => {
                              e.stopPropagation();
                              await handleStarChange(key);
                              await getRepoTree();
                            }}
                          >
                            {projectItem.home_page ? (
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
                        {!projectFound ? (
                          <>{key}</>
                        ) : (
                          <div
                            className="flex flex-col"
                            style={{
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            <p>{unSanitizeTitle(projectItem.title, false)}</p>
                            <p>
                              {unSanitizeTitle(projectItem.description, true)}
                            </p>
                            <div className="flex flex-row gap-2 mt-[7px]">
                              <div
                                onClick={(e: any) => e.stopPropagation()}
                                className="w-[25px] h-[25px] relative"
                              >
                                <ColorPicker
                                  initialColor={projectItem.bg_color}
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
                                  initialColor={projectItem.text_color}
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
                        {!projectFound ? (
                          <>{key}</>
                        ) : (
                          <div>
                            <p>{projectItem.title}</p>
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
          title={popupTitle}
          desc={popupDesc}
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
        await getRepoTree();
      });
    } else {
      alert("Only image files are allowed!");
    }
  };

  const handleAddFolder = async (folderName: string) => {
    // await uploadBlankImageToGitHub(folderName);
    // setTimeout(async () => {
    //   await getRepoTree();
    // }, 1000);
  };

  if (!fullProject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[100vw] h-[100vh] z-[998]">
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
        {loading && (
          <div className="absolute top-4 right-[107px] simple-spinner"></div>
        )}
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
