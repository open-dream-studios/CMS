import React, { useEffect, useRef, useState } from "react";
import "./Admin.css";
import { BiPlus, BiSolidPencil } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import Upload from "./Upload";
import ColorPicker from "./ColorPicker";
import axios from "axios";
import { FaCheck } from "react-icons/fa6";
import { GrPowerCycle } from "react-icons/gr";
import { GoChevronRight } from "react-icons/go";
import { GIT_KEYS } from "../config";
import { renameImageFile } from "../utils/gitFunctions";
import {
  extractAfterIndex,
  extractBeforeIndex,
  isColor,
  sanitizeTitle,
  unSanitizeTitle,
} from "../utils/helperFunctions";
import _ from "lodash";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  desc: string;
  desc2: string;
  desc3: string;
  popupExtention: string;
  onRename: (
    newTitle: string,
    newDesc: string,
    newDesc2: string,
    newDesc3: string
  ) => void;
  popupTrigger: number;
  currentPath: string[];
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  desc,
  desc2,
  desc3,
  popupExtention,
  onRename,
  popupTrigger,
  currentPath,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDesc] = useState(desc);
  const [newDesc2, setNewDesc2] = useState(desc2);
  const [newDesc3, setNewDesc3] = useState(desc3);

  useEffect(() => {
    setNewTitle(title);
    setNewDesc(desc);
    setNewDesc2(desc2);
    setNewDesc3(desc3);
  }, [title, desc, desc2, desc3, popupTrigger]);

  const handleRename = () => {
    if (newTitle.trim() !== "") {
      onRename(
        sanitizeTitle(newTitle),
        sanitizeTitle(
          currentPath[0] === "archives" && currentPath.length === 1
            ? newDesc.toUpperCase()
            : newDesc
        ),
        sanitizeTitle(newDesc2.toUpperCase()),
        sanitizeTitle(newDesc3.toUpperCase())
      );
      onClose();
    }
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
        zIndex: 12,
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
          {desc === "" && popupExtention !== "" ? "Image Name" : "Title"}
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
        {((currentPath[0] === "archives" && currentPath.length === 1) ||
          (currentPath[0] === "projects" && currentPath.length === 1)) && (
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
        {((currentPath[0] === "archives" && currentPath.length === 1) ||
          currentPath[0] === "project") && (
          <>
            <p className="font-[500] text-[14px] mb-[1px] mt-[10px]">
              Description Line 2
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
              value={newDesc2}
              onChange={(e) => {
                if (
                  e.target.value
                    .split("")
                    .every((item) => isValidFileNameChar(item))
                ) {
                  setNewDesc2(e.target.value);
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
        {((currentPath[0] === "archives" && currentPath.length === 1) ||
          currentPath[0] === "project") && (
          <>
            <p className="font-[500] text-[14px] mb-[1px] mt-[10px]">
              Description Line 3
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
              value={newDesc3}
              onChange={(e) => {
                if (
                  e.target.value
                    .split("")
                    .every((item) => isValidFileNameChar(item))
                ) {
                  setNewDesc3(e.target.value);
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

interface AboutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  appFile: string;
  onAppFileChange: (newAppFile: string) => void;
}

const AboutPopup: React.FC<AboutPopupProps> = ({
  isOpen,
  onClose,
  appFile,
  onAppFileChange,
}) => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const appFileCopy = appFile as any;
    if (Object.keys(appFileCopy).length !== 0) {
      const pages = appFileCopy["pages"];
      if (pages && Object.keys(pages).length !== 0) {
        const page = pages["about"];
        if (page && page.length !== 0) {
          setPage(page);
        }
      }
    }
  }, [appFile]);

  const handleAppFileChange = () => {
    const appFileCopy = appFile as any;
    appFileCopy["pages"]["about"] = page;
    onAppFileChange(appFileCopy);
    onClose();
  };

  const isValidFileNameChar = (char: any) => {
    const invalidChars = ["\\", '"'];
    return !invalidChars.includes(char) && char !== "\n";
  };

  if (!isOpen) return null;
  if (page === null) return <></>;

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
        paddingTop: "100px",
        paddingBottom: "20px",
      }}
    >
      <div
        className="flex flex-col p-[20px] w-[800px] relative pb-[55px]"
        style={{
          overflow: "scroll",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <p className="font-[500] text-[20px] mb-[1px] text-[bold] text-center">
          About Page Text
        </p>
        {Object.keys(page["sections"]).length > 0 &&
          Object.keys(page["sections"]).map((item, index) => {
            const sectionGroup = page["sections"][item];
            return (
              <div
                key={index}
                className="my-[3px] w-[100%] px-[10px]"
                style={{ borderRadius: "6px", border: "1px solid #999999" }}
              >
                <div className="py-[2px]">{"Section " + (index + 1)}</div>
                <>
                  {Object.keys(sectionGroup).length > 0 &&
                    Object.keys(sectionGroup).map((section, sectionIndex) => {
                      return (
                        <div key={sectionIndex}>
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
                            value={sectionGroup[section]}
                            onChange={(e) => {
                              if (
                                e.target.value
                                  .split("")
                                  .every((item) => isValidFileNameChar(item))
                              ) {
                                let pageCopy = page as any;
                                const updatedPage = {
                                  ...pageCopy,
                                  sections: {
                                    ...pageCopy["sections"],
                                    [item]: {
                                      ...pageCopy["sections"][item],
                                      [section]: e.target.value,
                                    },
                                  },
                                };
                                setPage(updatedPage);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleAppFileChange();
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                </>
              </div>
            );
          })}

        <div
          style={{
            borderBottomRightRadius: "8px",
            borderBottomLeftRadius: "8px",
            borderTop: "1px solid #BBBBBB",
          }}
          className="bg-white flex flex-row pt-[1px] h-[60px] fixed bottom-[20px] w-[760px] items-center"
        >
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
            onClick={handleAppFileChange}
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
    <div className="flex justify-center items-center absolute left-0 top-0 h-[100vh] w-[100vw]">
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <div className="loginBox pb-[10vh]">
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
  const { owner, repo, branch, token } = GIT_KEYS;

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("Loading...");
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [projectFile, setProjectFile] = useState<any>({});

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProject();
      if (project === null) {
        setLoadingText("Something went wrong");
      }
    };

    fetchProject();
  }, []);

  const getProject = async () => {
    const returnedProject: any[] = [null, null];
    const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1&t=${new Date().getTime()}`;

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

      if (
        Object.keys(tree).length > 0 &&
        Object.keys(tree).includes("images") &&
        Object.keys(tree).includes("project.json")
      ) {
        setProjectImages(Object.keys(tree["images"]));
        returnedProject[0] = Object.keys(tree["images"]);
        const projectJSONLink = tree["project.json"];

        try {
          const response = await fetch(projectJSONLink, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          });

          if (!response.ok) {
            return null;
          }

          const data = await response.json();

          // Correctly decode Base64 content into UTF-8
          const base64Content = data.content;
          const decodedContent = new TextDecoder("utf-8").decode(
            Uint8Array.from(atob(base64Content), (char) => char.charCodeAt(0))
          );

          if (decodedContent) {
            try {
              const parsedContent = JSON.parse(decodedContent);
              setProjectFile(parsedContent);
              returnedProject[1] = parsedContent;
              if (returnedProject[0] === null || returnedProject[1] === null) {
                return null;
              } else {
                return returnedProject;
              }
            } catch (error) {
              console.error("Error parsing JSON content:", error);
            }
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error fetching file contents:", error);
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching repository tree:", error);
      return null;
    }
  };

  const updateProjectFile = async (newProjectFile: any) => {
    setLoading(true);
    const filePath = "project.json";
    try {
      const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      };
      const { data: fileInfo } = await axios.get(fileUrl, { headers });
      const fileSha = fileInfo.sha;

      // Convert the JSON to a UTF-8 encoded Base64 string
      const updatedContent = btoa(
        unescape(
          encodeURIComponent(
            typeof newProjectFile === "string"
              ? newProjectFile
              : JSON.stringify(newProjectFile)
          )
        )
      );
      const commitMessage = "Update project.json with new content";
      await axios.put(
        fileUrl,
        {
          message: commitMessage,
          content: updatedContent,
          sha: fileSha,
          branch,
        },
        { headers }
      );

      console.log("Project file updated successfully");
      setProjectFile(newProjectFile);
      return true;
    } catch (error) {
      console.error("Error updating project file:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editDetailsMode, setEditDetailsMode] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleSideBarToggle = () => {
    setSideBarOpen((prev) => !prev);
    if (sidebarRef.current) {
      sidebarRef.current.style.transition = "padding-left 0.25s ease-in-out";
      setTimeout(() => {
        if (sidebarRef.current) {
          sidebarRef.current.style.transition = "none";
        }
      }, 500);
    }
  };

  const handlePageClick = async (pageName: string) => {
    setCurrentPath([pageName]);
  };

  const handleAddPage = async (pageName: string) => {
    setLoading(true);
    const project = await getProject();
    if (project === undefined || project === null) return;
    const projectFileObject = structuredClone(project[1]);
    const projectFileContents = projectFileObject.children;
    if (!Object.keys(projectFileContents).includes(pageName)) {
      let highestIndex = 0;
      for (let i = 0; i < Object.keys(projectFileContents).length; i++) {
        if (
          projectFileContents[Object.keys(projectFileContents)[i]].index >
          highestIndex
        ) {
          highestIndex =
            projectFileContents[Object.keys(projectFileContents)[i]].index;
        }
      }
      const newIndex = highestIndex + 1;
      projectFileContents[pageName] = {
        type: "folder",
        index: newIndex,
        children: {},
      };
      projectFileObject.children = projectFileContents;
      const success = await updateProjectFile(projectFileObject);
      if (success) {
        setProjectFile(projectFileObject);
      }
    } else {
      alert("That page name is already being used");
      return;
    }
    setLoading(false);
  };

  const getCurrentFolder = () => {
    if (!projectFile) return null;

    let currentFolder = projectFile;

    if (currentPath.length === 0) {
      return currentFolder;
    }
    for (let i = 0; i < currentPath.length; i++) {
      currentFolder = currentFolder.children[currentPath[i]];
    }
    return currentFolder;
  };

  const handleFolderClick = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
  };

  const handleAddFolder = async (folderName: string) => {
    setLoading(true);
    const currentFolder = getCurrentFolder();

    if (
      currentFolder !== null &&
      typeof currentFolder === "object" &&
      "children" in currentFolder
    ) {
      if (Object.keys(currentFolder.children).includes(folderName)) {
        alert("That page name is already being used");
        return;
      } else {
        const project = await getProject();
        if (project === undefined || project === null) return;
        const projectFileObject = structuredClone(project[1]);
        const children = currentFolder.children;
        let highestIndex = 0;
        let newIndex = 0;
        for (const key in children) {
          if (children[key].index >= highestIndex) {
            highestIndex = children[key].index;
            newIndex = highestIndex + 1;
          }
        }

        const newEntryData = {
          type: "folder",
          index: newIndex,
          children: {},
          details: {
            colors: [],
            text: [],
          },
        };
        const getTargetObject = (obj: any, path: string[]) => {
          return path.reduce((acc, key) => acc?.children?.[key], obj);
        };
        const targetObject = getTargetObject(projectFileObject, currentPath);
        if (targetObject && targetObject.children) {
          targetObject.children[folderName] = newEntryData;
        } else {
          return;
        }

        await updateProjectFile(projectFileObject);
      }
    }
    setLoading(false);
  };

  const handleDeleteItem = async (folderName: string) => {
    setLoading(true);
    const currentFolder = getCurrentFolder();
    if (
      currentFolder !== null &&
      typeof currentFolder === "object" &&
      "children" in currentFolder
    ) {
      if (Object.keys(currentFolder.children).includes(folderName)) {
        const project = await getProject();
        if (project === undefined || project === null) return;
        const projectFileObject = structuredClone(project[1]);
        const getTargetObject = (obj: any, path: string[]) => {
          return path.reduce((acc, key) => acc?.children?.[key], obj);
        };
        const targetObject = getTargetObject(projectFileObject, currentPath);
        if (targetObject && targetObject.children) {
          delete targetObject.children[folderName];
        }
        await updateProjectFile(projectFileObject);
      }
    }
    setLoading(false);
  };

  const handleDeleteFolderDetail = async (
    objectType: string,
    index: number
  ) => {
    setLoading(true);
    const currentFolder = getCurrentFolder();
    if (
      currentFolder !== null &&
      typeof currentFolder === "object" &&
      Object.keys(currentFolder).includes("details") &&
      Object.keys(currentFolder["details"]).includes(objectType) &&
      currentFolder["details"][objectType].findIndex(
        (item: any) => item.index === index
      ) !== -1
    ) {
      const project = await getProject();
      if (project === undefined || project === null) return;
      const projectFileObject = structuredClone(project[1]);
      const getTargetObject = (obj: any, path: string[]) => {
        return path.reduce((acc, key) => acc?.children?.[key], obj);
      };
      const targetObject = getTargetObject(projectFileObject, currentPath);
      if (
        targetObject &&
        Object.keys(targetObject).includes("details") &&
        Object.keys(targetObject["details"]).includes(objectType) &&
        targetObject["details"][objectType].findIndex(
          (item: any) => item.index === index
        ) !== -1
      ) {
        const foundIndex = targetObject["details"][objectType].findIndex(
          (item: any) => item.index === index
        );
        targetObject["details"][objectType] = targetObject["details"][
          objectType
        ].filter((item: any, index: number) => index !== foundIndex);
      }
      await updateProjectFile(projectFileObject);
    }
    setLoading(false);
  };

  const handleAddFolderDetail = async (objectType: string) => {
    setLoading(true);
    const currentFolder = getCurrentFolder();
    if (
      currentFolder !== null &&
      typeof currentFolder === "object" &&
      Object.keys(currentFolder).includes("details") &&
      Object.keys(currentFolder["details"]).includes(objectType)
    ) {
      const project = await getProject();
      if (project === undefined || project === null) return;
      const projectFileObject = structuredClone(project[1]);
      const getTargetObject = (obj: any, path: string[]) => {
        return path.reduce((acc, key) => acc?.children?.[key], obj);
      };
      const targetObject = getTargetObject(projectFileObject, currentPath);
      if (
        targetObject &&
        Object.keys(targetObject).includes("details") &&
        Object.keys(targetObject["details"]).includes(objectType)
      ) {
        let highestIndex = 0;
        let newIndex = 0;
        for (let i = 0; i < targetObject["details"][objectType].length; i++) {
          if (targetObject["details"][objectType][i].index >= highestIndex) {
            highestIndex = targetObject["details"][objectType][i].index;
            newIndex = highestIndex + 1;
          }
        }

        const newEntry =
          objectType === "colors"
            ? {
                name: "Color " + newIndex,
                value: "#999999",
                index: newIndex,
              }
            : {
                name: "Text " + newIndex,
                value: "New Text",
                index: newIndex,
              };

        console.log(newEntry);

        targetObject["details"][objectType].push(newEntry);
      }
      console.log(targetObject);
      await updateProjectFile(projectFileObject);
    }
    setLoading(false);
  };

  const [fullProject, setFullProject] = useState<FolderStructure | null>(null);
  const [appFile, setAppFile] = useState<any>({});
  const [reducedAppFile, setReducedAppFile] = useState<any>({});

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
    if (
      currentPath.length === 2 &&
      currentPath[0] &&
      currentPath[0] === "projects"
    ) {
      const foundIdx = appFile["pages"]["projects"].findIndex(
        (item: any) => item.id === currentPath[1]
      );
      const currentProject = appFile["pages"]["projects"][foundIdx].images;
      const currentImage = currentProject.filter(
        (item: any) => item.name === key
      );
      if (currentImage.length > 0) {
        return currentImage[0];
      }
    } else {
      const projectItem = page.find((item: any) => item.id === key);
      if (!projectItem) return null;
      return projectItem;
    }
  };

  // POPUP
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupKey, setPopupKey] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [popupDesc, setPopupDesc] = useState("");
  const [popupDesc2, setPopupDesc2] = useState("");
  const [popupDesc3, setPopupDesc3] = useState("");
  const [popupTrigger, setPopupTrigger] = useState(0);
  const [popupExtention, setPopupExtention] = useState("");
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const openPopup = (name: string, path: any) => {
    if (currentPath.length === 0) {
      return;
    }
    if (name.includes(".")) {
      const extension = name.split(".").pop() || "";
      let imgName = name.slice(0, name.lastIndexOf("."));
      setPopupExtention(extension);
      setPopupTitle(imgName);
      setPopupKey(imgName);
      setPopupDesc("");
      setPopupDesc2("");
      setPopupDesc3("");
    } else {
      const projectItem = getFolderItem(name);
      if (projectItem === null) return;
      setPopupExtention("");
      setPopupKey(name);
      setPopupTitle(unSanitizeTitle(projectItem.title, false));
      if (currentPath[0] === "projects") {
        setPopupDesc(unSanitizeTitle(projectItem.description, true));
      } else if (currentPath[0] === "archives" && currentPath.length === 1) {
        setPopupDesc(
          unSanitizeTitle(projectItem.description.toUpperCase(), true)
        );
        setPopupDesc2(
          unSanitizeTitle(projectItem.description2.toUpperCase(), true)
        );
        setPopupDesc3(
          unSanitizeTitle(projectItem.description3.toUpperCase(), true)
        );
      } else {
        setPopupDesc("");
      }
    }
    setPopupTrigger((prev) => prev + 1);
    setSelectedPath(path);
    setPopupOpen(true);
  };

  // const handleDeleteItem = async (path: any) => {
  //   setLoading(true);
  //   try {
  //     let pageName = currentPath[0];
  //     let folderIndex = null;
  //     if (Object.keys(appFile).length === 0) return null;
  //     const pages = appFile["pages"];
  //     if (Object.keys(pages).length === 0) return null;

  //     if (currentPath[0] !== "about") {
  //       const page = pages[currentPath[0]];
  //       if (!page || page.length === 0) return null;
  //       folderIndex = page.findIndex(
  //         (item: any) => item.id === path.split("/")[1]
  //       );
  //       if (folderIndex === -1) return null;
  //     }

  //     const appFileCopy = JSON.parse(JSON.stringify(appFile));

  //     if (!path.split("/").pop().includes(".")) {
  //       appFileCopy["pages"][pageName].splice(folderIndex, 1);
  //     } else {
  //       if (pageName === "about") {
  //         const imageIndex = appFileCopy["pages"][pageName].images.findIndex(
  //           (img: any) => img.name === path.split("/").pop()
  //         );
  //         if (imageIndex === -1) return;
  //         appFileCopy["pages"][pageName].images.splice(imageIndex, 1);
  //       } else {
  //         const imageIndex = appFileCopy["pages"][pageName][
  //           folderIndex
  //         ].images.findIndex((img: any) => img.name === path.split("/").pop());
  //         if (imageIndex === -1) return;
  //         appFileCopy["pages"][pageName][folderIndex].images.splice(
  //           imageIndex,
  //           1
  //         );
  //       }
  //     }
  //     // setAppFile(appFileCopy);
  //     await deleteItem(
  //       "public/assets/" + path,
  //       path.split("/").pop().includes(".")
  //     );
  //     console.log(appFileCopy);
  //     updateProjectFile(appFileCopy);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const deleteItem = async (path: string, isImage: boolean) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: "application/vnd.github.v3+json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch folder contents for path: ${path}`);
  //     }

  //     const files = await response.json();

  //     if (isImage) {
  //       const deleteResponse = await fetch(
  //         `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
  //         {
  //           method: "DELETE",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             Accept: "application/vnd.github.v3+json",
  //           },
  //           body: JSON.stringify({
  //             message: `Deleting file ${path}`,
  //             sha: files.sha,
  //             branch,
  //           }),
  //         }
  //       );

  //       if (!deleteResponse.ok) {
  //         throw new Error(`Failed to delete file: ${path}`);
  //       }
  //       console.log(`Successfully deleted image file: ${path}`);
  //     } else {
  //       console.log(`Deleting folder and its contents: ${path}`);
  //       for (const file of files) {
  //         await deleteItem(file.path, file.type === "file");
  //       }
  //       console.log(`Successfully deleted all contents of folder: ${path}`);
  //     }
  //   } catch (error) {
  //     console.error(`Error while deleting item at path: ${path}`, error);
  //   }
  // };

  const collectImgNames = () => {
    let namesList: string[] = [];
    if (
      currentPath &&
      currentPath.length > 0 &&
      fullProject &&
      fullProject[currentPath[0]]
    ) {
      const page = fullProject[currentPath[0]] as any;
      if (currentPath[0] === "about") {
        delete page["blank.png"];
        namesList = Object.keys(page);
        return namesList;
      }

      if (currentPath.length > 1 && page[currentPath[1]]) {
        const contents = page[currentPath[1]];
        if (currentPath[0] === "archives") {
          delete contents["blank.png"];
          namesList = Object.keys(contents);
          return namesList;
        }

        if (currentPath[0] === "projects" && currentPath.length === 2) {
          delete contents["blank.png"];
          namesList = Object.keys(contents);
          return namesList;
        }

        if (currentPath.length > 2 && contents["covers"]) {
          delete contents["covers"]["blank.png"];
          namesList = Object.keys(contents["covers"]);
          return namesList;
        }
      }
    }
    return namesList;
  };

  const collectFolderNames = () => {
    let namesList: string[] = [];
    if (
      currentPath &&
      currentPath.length === 1 &&
      fullProject &&
      fullProject[currentPath[0]]
    ) {
      const page = fullProject[currentPath[0]] as any;
      if (currentPath[0] === "projects" || currentPath[0] === "archives") {
        delete page["blank.png"];
        namesList = Object.keys(page);
        return namesList;
      }
    }
    return namesList;
  };

  const handleRename = async (
    newTitle: string,
    newDesc: string,
    newDesc2: string,
    newDesc3: string
  ) => {
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

      if (
        folderNames.includes(newTitle) &&
        newTitle !== appFile["pages"][pageName][index].title
      ) {
        alert("That name is already being used in this folder");
        return;
      }
      const appFileCopy = appFile;
      appFileCopy["pages"][pageName][index].title = newTitle;
      if (pageName === "projects") {
        appFileCopy["pages"][pageName][index].description = newDesc;
      }
      if (pageName === "archives") {
        appFileCopy["pages"][pageName][index].description = newDesc;
        appFileCopy["pages"][pageName][index].description2 = newDesc2;
        appFileCopy["pages"][pageName][index].description3 = newDesc3;
      }
      // setAppFile(appFileCopy);
      await updateProjectFile(appFileCopy);
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
        await renameImageFile(originalPath, newPath);

        const appFileCopy = appFile;
        if (currentPath[0] === "about") {
          const indexFound = appFileCopy["pages"]["about"]["images"].findIndex(
            (item: any) => item.name === originalName
          );
          if (indexFound !== -1) {
            appFileCopy["pages"]["about"]["images"][indexFound].name =
              imageName;
          }
        } else if (currentPath[0] === "projects" && currentPath.length === 2) {
          const projectIndex = appFileCopy["pages"]["projects"].findIndex(
            (item: any) => item.id === currentPath[1]
          );
          const indexFound = appFileCopy["pages"]["projects"][projectIndex][
            "images"
          ].findIndex((item: any) => item.name === originalName);
          if (indexFound !== -1) {
            appFileCopy["pages"]["projects"][projectIndex]["images"][
              indexFound
            ].name = imageName;
          }
        } else if (currentPath[0] === "archives" && currentPath.length === 2) {
          const archivesIndex = appFileCopy["pages"]["archives"].findIndex(
            (item: any) => item.id === currentPath[1]
          );
          console.log(archivesIndex, originalName);
          console.log(appFileCopy["pages"]["archives"][archivesIndex]);
          const indexFound = appFileCopy["pages"]["archives"][archivesIndex][
            "images"
          ].findIndex((item: any) => item.name === originalName);
          console.log(indexFound);
          if (indexFound !== -1) {
            console.log(
              appFileCopy["pages"]["archives"][archivesIndex]["images"][
                indexFound
              ].name
            );
            appFileCopy["pages"]["archives"][archivesIndex]["images"][
              indexFound
            ].name = imageName;
          }
        } else {
          return;
        }
        console.log(appFileCopy);
        // setAppFile(appFileCopy);
        await updateProjectFile(appFileCopy);
      }
    }
  };

  const handleStarChange = async (key: string) => {
    const appFileCopy = appFile;
    if (currentPath.length === 1) {
      let projectItem = appFileCopy["pages"]["projects"].findIndex(
        (item: any) => item.id === key
      );
      if (projectItem === null || projectItem === -1) return;
      appFileCopy["pages"]["projects"][projectItem].home_page =
        !appFileCopy["pages"]["projects"][projectItem].home_page;
    } else if (currentPath.length === 2) {
      let projectItem = appFileCopy["pages"]["projects"].findIndex(
        (item: any) => item.id === currentPath[1]
      );

      if (projectItem === null || projectItem === -1) return;
      const foundIdx = appFileCopy["pages"]["projects"][
        projectItem
      ].images.findIndex((img: any) => img.name === key);
      if (foundIdx === -1) return;
      appFileCopy["pages"]["projects"][projectItem].images[
        foundIdx
      ].projectCover =
        !appFileCopy["pages"]["projects"][projectItem].images[foundIdx]
          .projectCover;
    }

    // setAppFile(appFileCopy);
    await updateProjectFile(appFileCopy);
  };

  const handleProjectColorsChange = async (key: string) => {
    if (currentPath.length === 0) return;
    const pageName =
      currentPath[0] === "archives"
        ? "archives"
        : currentPath[0] === "projects"
        ? "projects"
        : null;
    if (pageName === null) return;
    if (
      colorToChange.length === 2 &&
      (colorToChange[0] !== null || colorToChange[1] !== null)
    ) {
      const projectItem = getFolderItem(key);
      if (projectItem === null) return;
      const appFileCopy = appFile;
      const index = appFileCopy["pages"][pageName].findIndex(
        (item: any) => item === projectItem
      );
      if (colorToChange[0] !== null) {
        appFileCopy["pages"][pageName][index].bg_color = colorToChange[0];
      }
      if (colorToChange[1] !== null && pageName === "projects") {
        appFileCopy["pages"][pageName][index].text_color = colorToChange[1];
      }
      await updateProjectFile(appFileCopy);
    }
    setChangedColorItems({});
    setColorToChange([null, null]);
  };

  const [changedColorItems, setChangedColorItems] = useState<any>({});
  const [colorToChange, setColorToChange] = useState<any>([null, null]);
  const handleColorChange = (
    key: string,
    primary: boolean,
    newValue: string
  ) => {
    const index = primary ? 0 : 1;
    const colorToChangeCopy = colorToChange;
    colorToChangeCopy[index] = newValue;
    setColorToChange(colorToChangeCopy);
    if (Object.keys(changedColorItems).length >= 1 && !changedColorItems[key]) {
      setChangedColorItems({});
    }
    setChangedColorItems((prev: any) => ({ ...prev, [key]: true }));
  };

  const handleArchiveImageColorChange = async (key: string) => {
    if (currentPath.length === 0) return;
    console.log(key, archiveImageColorToChange);
    setChangedArchiveImageColorItems({});
    setArchiveImageColorToChange(null);

    let newKey = key.split(".")[0];
    const lastText = newKey.split("--").pop();
    if (
      lastText &&
      newKey.split("--").length >= 2 &&
      isColor(lastText) !== null
    ) {
      newKey =
        newKey.slice(0, newKey.lastIndexOf("--")) +
        "--" +
        archiveImageColorToChange.replaceAll("#", "") +
        "." +
        key.split(".")[1];
      console.log(newKey);
    } else {
      newKey =
        newKey +
        "--" +
        archiveImageColorToChange.replaceAll("#", "") +
        "." +
        key.split(".")[1];
      console.log(newKey);
    }

    const originalPath = "public/assets/" + currentPath.join("/") + "/" + key;
    const newPath = "public/assets/" + currentPath.join("/") + "/" + newKey;
    console.log(originalPath, newPath);
    await renameImageFile(originalPath, newPath);
  };

  const [changedArchiveImageColorItems, setChangedArchiveImageColorItems] =
    useState<any>({});
  const [archiveImageColorToChange, setArchiveImageColorToChange] =
    useState<any>(null);

  const handleImageColorChange = (key: string, newValue: string) => {
    console.log(key, newValue);
    setArchiveImageColorToChange(newValue);
    if (
      Object.keys(changedArchiveImageColorItems).length >= 1 &&
      !changedArchiveImageColorItems[key]
    ) {
      setChangedArchiveImageColorItems({});
    }
    setChangedArchiveImageColorItems((prev: any) => ({ ...prev, [key]: true }));
  };

  useEffect(() => {
    setChangedColorItems({});
    setColorToChange([null, null]);

    setChangedArchiveImageColorItems({});
    setArchiveImageColorToChange(null);

    setSwapActive(false);
    setSwapItems([null, null]);

    setFolderSwapActive(false);
    setFolderSwapItems([null, null]);
  }, [currentPath]);

  const [swapActive, setSwapActive] = useState(false);
  type swapItemType = string | null;
  const [swapItems, setSwapItems] = useState<swapItemType[]>([null, null]);

  const handleSwapItems = async () => {
    const currentFolderContents = collectImgNames();
    if (
      swapItems[0] !== null &&
      swapItems[1] !== null &&
      swapItems[0] !== swapItems[1] &&
      currentFolderContents.includes(swapItems[0]) &&
      currentFolderContents.includes(swapItems[1])
    ) {
      setLoading(true);
      const basePath = "public/assets/" + currentPath.join("/") + "/";
      const path1 = basePath + swapItems[0];
      const path2 = basePath + swapItems[1];
      await handleSwap(path1, path2);
    }
    setSwapActive(false);
    setSwapItems([null, null]);
    setLoading(false);
  };

  const handleSwap = async (path1: string, path2: string) => {
    const lastPart1 = path1.split("/").pop();
    const lastPart2 = path2.split("/").pop();
    if (
      lastPart1 &&
      extractBeforeIndex(lastPart1) !== null &&
      lastPart2 &&
      extractBeforeIndex(lastPart2) !== null
    ) {
      const firstIndex = extractBeforeIndex(lastPart1);
      const secondIndex = extractBeforeIndex(lastPart2);

      const firstAfterIndex = extractAfterIndex(lastPart1);
      const secondAfterIndex = extractAfterIndex(lastPart2);
      const fillerIndex = 99999;

      let path1Filler =
        path1.split("/").slice(0, -1).join("/") +
        "/" +
        fillerIndex +
        "--" +
        firstAfterIndex;
      let newPath1 =
        path1.split("/").slice(0, -1).join("/") +
        "/" +
        secondIndex +
        "--" +
        firstAfterIndex;
      let newPath2 =
        path2.split("/").slice(0, -1).join("/") +
        "/" +
        firstIndex +
        "--" +
        secondAfterIndex;

      console.log(path1Filler, newPath1, newPath2);

      // Rename the first image
      await renameImageFile(path1, path1Filler);

      // Rename the second image
      await renameImageFile(path2, newPath2);

      // Rename the first image again
      await renameImageFile(path1Filler, newPath1);
    }
  };

  const [folderSwapActive, setFolderSwapActive] = useState(false);
  const [folderSwapItems, setFolderSwapItems] = useState<swapItemType[]>([
    null,
    null,
  ]);
  const handleFolderSwapItems = async () => {
    const currentFolders = collectFolderNames();
    if (
      folderSwapItems[0] !== null &&
      folderSwapItems[1] !== null &&
      folderSwapItems[0] !== folderSwapItems[1] &&
      currentFolders.includes(folderSwapItems[0]) &&
      currentFolders.includes(folderSwapItems[1])
    ) {
      const appFileCopy = appFile;
      const index1 = appFileCopy["pages"][currentPath[0]].findIndex(
        (item: any) => item.id === folderSwapItems[0]
      );
      const index2 = appFileCopy["pages"][currentPath[0]].findIndex(
        (item: any) => item.id === folderSwapItems[1]
      );
      if (index1 === -1 || index2 === -1) return;

      const storedIndex1 = appFileCopy["pages"][currentPath[0]][index1].index;
      const storedIndex2 = appFileCopy["pages"][currentPath[0]][index2].index;

      appFileCopy["pages"][currentPath[0]][index1].index = storedIndex2;
      appFileCopy["pages"][currentPath[0]][index2].index = storedIndex1;

      // setAppFile(appFileCopy);
      await updateProjectFile(appFileCopy);
    }
    setFolderSwapActive(false);
    setFolderSwapItems([null, null]);
  };

  const [currentImageSwapIndex, setCurrentImageSwapIndex] = useState(-1);
  const handleMoveImageItem = async (
    key: string,
    moveToIndex: number,
    side: number
  ) => {
    if (swapItems[0] === null) return;
    const pageName = currentPath[0];
    const appFileCopy = JSON.parse(JSON.stringify(appFile));

    if (currentPath.length === 1 && currentPath[0] === "about") {
      const originalImageIndex = appFileCopy["pages"][
        pageName
      ].images.findIndex((item: any) => item.name === swapItems[0]);
      if (originalImageIndex === -1) return;
      const originalIndex =
        appFileCopy["pages"][pageName].images[originalImageIndex].index;

      const finalImageIndex = appFileCopy["pages"][pageName].images.findIndex(
        (item: any) => item.name === key
      );
      if (finalImageIndex === -1) return;
      const finalIndex =
        appFileCopy["pages"][pageName].images[finalImageIndex].index;

      let highestIndex = -1;
      for (let i = 0; i < appFileCopy["pages"][pageName].images.length; i++) {
        if (appFileCopy["pages"][pageName].images[i].index > highestIndex) {
          highestIndex = appFileCopy["pages"][pageName].images[i].index;
        }
      }
      if (highestIndex === -1) return;

      appFileCopy["pages"][pageName].images = appFileCopy["pages"][
        pageName
      ].images.map((item: any) => {
        let newIndex = null;

        if (finalIndex > originalIndex) {
          if (item.index > originalIndex && item.index < finalIndex) {
            newIndex = item.index - 1;
          }

          if (item.index === highestIndex && side === 1) {
            newIndex = item.index - 1;
          }

          if (item.index === originalIndex) {
            item.index = finalIndex - 1 + side;
          }
        } else if (finalIndex < originalIndex) {
          if (item.index < originalIndex && item.index >= finalIndex) {
            newIndex = item.index + 1;
          }

          if (item.index === originalIndex) {
            item.index = finalIndex;
          }
        }

        return {
          ...item,
          index: newIndex === null ? item.index : newIndex,
        };
      });
    } else if (currentPath.length === 2) {
      const folderIndex = appFileCopy["pages"][pageName].findIndex(
        (item: any) => item.id === currentPath[1]
      );
      if (folderIndex === -1) return;

      const originalImageIndex = appFileCopy["pages"][pageName][
        folderIndex
      ].images.findIndex((item: any) => item.name === swapItems[0]);
      if (originalImageIndex === -1) return;
      const originalIndex =
        appFileCopy["pages"][pageName][folderIndex].images[originalImageIndex]
          .index;

      const finalImageIndex = appFileCopy["pages"][pageName][
        folderIndex
      ].images.findIndex((item: any) => item.name === key);
      if (finalImageIndex === -1) return;
      const finalIndex =
        appFileCopy["pages"][pageName][folderIndex].images[finalImageIndex]
          .index;

      let highestIndex = -1;
      for (
        let i = 0;
        i < appFileCopy["pages"][pageName][folderIndex].images.length;
        i++
      ) {
        if (
          appFileCopy["pages"][pageName][folderIndex].images[i].index >
          highestIndex
        ) {
          highestIndex =
            appFileCopy["pages"][pageName][folderIndex].images[i].index;
        }
      }
      if (highestIndex === -1) return;

      appFileCopy["pages"][pageName][folderIndex].images = appFileCopy["pages"][
        pageName
      ][folderIndex].images.map((item: any) => {
        let newIndex = null;

        if (finalIndex > originalIndex) {
          if (item.index > originalIndex && item.index < finalIndex) {
            newIndex = item.index - 1;
          }

          if (item.index === highestIndex && side === 1) {
            newIndex = item.index - 1;
          }

          if (item.index === originalIndex) {
            item.index = finalIndex - 1 + side;
          }
        } else if (finalIndex < originalIndex) {
          if (item.index < originalIndex && item.index >= finalIndex) {
            newIndex = item.index + 1;
          }

          if (item.index === originalIndex) {
            item.index = finalIndex;
          }
        }

        return {
          ...item,
          index: newIndex === null ? item.index : newIndex,
        };
      });
    }

    await updateProjectFile(appFileCopy);
    setCurrentImageSwapIndex(-1);
    setSwapItems([null, null]);
    setSwapActive(false);
  };

  // const renderContent = () => {
  //   const currentFolder = getCurrentFolder();
  //   const githubBaseUrl =
  //     "https://raw.githubusercontent.com/JosephGoff/js-portfolio/refs/heads/master/public/assets/";
  //   if (typeof currentFolder === "string") {
  //     return <></>;
  //   }

  //   // Render folders or multiple items, including images
  //   return (
  //     <div
  //       className={`flex ${
  //         currentPath.length <= 1 &&
  //         !(currentPath.length === 1 && currentPath[0] === "about")
  //           ? "justify-left flex-col"
  //           : "justify-center flex-wrap"
  //       } gap-6 mt-6 ${
  //         currentPath[0] === "about" ||
  //         (currentPath[0] === "projects" && currentPath.length > 1) ||
  //         (currentPath[0] === "archives" && currentPath.length > 1)
  //           ? "pb-[95px] top-0 left-0 "
  //           : ""
  //       } absolute px-[22px]`}
  //       // style={{ backgroundColor: "red" }}
  //     >
  //       {Object.keys(currentFolder)
  //         .sort((a, b) => {
  //           let indexMap: any = {};
  //           if (appFile["pages"] !== undefined) {
  //             indexMap = Object.values(appFile["pages"])
  //               .flat()
  //               .reduce((map: any, item: any) => {
  //                 map[item.id] = item.index;
  //                 return map;
  //               }, {});
  //           }

  //           // // First sort (your existing logic)
  //           // const indexA = extractBeforeIndex(a);
  //           // const indexB = extractBeforeIndex(b);
  //           // const numA = indexA !== null ? Number(indexA) : Infinity;
  //           // const numB = indexB !== null ? Number(indexB) : Infinity;

  //           // const primarySort = numA - numB;

  //           // if (primarySort !== 0) {
  //           //   return primarySort;
  //           // }

  //           // Second sort (based on the index from JSON)
  //           const folderIndexA = indexMap[a] ?? Infinity;
  //           const folderIndexB = indexMap[b] ?? Infinity;
  //           return folderIndexA - folderIndexB;
  //         })
  //         .sort((a, b) => {
  //           let images: any[] = [];
  //           if (appFile !== null) {
  //             if (currentPath[0] === "about") {
  //               images = appFile["pages"]["about"]["images"];
  //             } else if (
  //               currentPath[0] === "projects" &&
  //               currentPath.length === 2
  //             ) {
  //               const projectItem = appFile["pages"]["projects"].filter(
  //                 (item: any) => item.id === currentPath[1]
  //               );
  //               if (projectItem.length > 0) {
  //                 images = projectItem[0].images;
  //               }
  //             } else if (
  //               currentPath[0] === "archives" &&
  //               currentPath.length === 2
  //             ) {
  //               const projectItem = appFile["pages"]["archives"].filter(
  //                 (item: any) => item.id === currentPath[1]
  //               );

  //               if (projectItem.length > 0) {
  //                 images = projectItem[0].images;
  //               }
  //             }
  //           }

  //           const imageA: any = images.filter((item) => item.name === a);
  //           const imageB: any = images.filter((item) => item.name === b);
  //           if (imageA.length > 0 && imageB.length > 0) {
  //             const indexA = imageA[0].index;
  //             const indexB = imageB[0].index;
  //             return indexA - indexB;
  //           }
  //           return 0;
  //         })
  //         .map((key, index) => {
  //           if (key === "blank.png" || key === "fallback.jpeg") return <></>;
  //           const isSecondaryFolder =
  //             typeof currentFolder[key] !== "string" &&
  //             ((currentPath[0] === "projects" && key !== "covers") ||
  //               currentPath[0] === "archives");

  //           const isProjectFolder =
  //             typeof currentFolder[key] !== "string" &&
  //             currentPath[0] === "projects";

  //           let projectFound = true;
  //           const projectItem = getFolderItem(key);
  //           // console.log(projectItem);
  //           if (projectItem === null) {
  //             projectFound = false;
  //           }

  //           // Archive Image Coloring Logic
  //           let defaultImgColor = "#CCCCCC";
  //           if (currentPath.length === 2 && currentPath[0] === "archives") {
  //             const imgName = key.split(".")[0];
  //             const imgColor = imgName.split("--").pop();
  //             if (
  //               imgColor &&
  //               imgName.split("--").length >= 2 &&
  //               isColor(imgColor) !== null
  //             ) {
  //               defaultImgColor = isColor(imgColor) || "#CCCCCC";
  //             }
  //           }

  //           let starTrue = false;
  //           if (currentPath.length === 1 && projectItem) {
  //             starTrue = projectItem.home_page;
  //           }
  //           if (currentPath.length === 2 && projectItem) {
  //             starTrue = projectItem.projectCover;
  //           }
  //           const pageName = currentPath[0];

  //           // if (currentPath.length > 0 && currentPath[0] !== "about")
  //           //   return <></>;
  //           let projectIndex = -1;
  //           if (currentPath.length > 0) {
  //             if (currentPath.length === 2) {
  //               projectIndex = appFile["pages"][pageName].findIndex(
  //                 (item: any) => item.id === currentPath[1]
  //               );
  //               if (projectIndex === -1) return <></>;
  //             }
  //           }

  //           let showRightSwapDiv = false;
  //           if (
  //             currentPath.length === 1 &&
  //             pageName === "about" &&
  //             index === appFile["pages"][pageName].images.length - 1
  //           ) {
  //             showRightSwapDiv = true;
  //           } else if (
  //             currentPath.length === 2 &&
  //             (pageName === "projects" || pageName === "archives") &&
  //             index ===
  //               appFile["pages"][pageName][projectIndex].images.length - 1
  //           ) {
  //             showRightSwapDiv = true;
  //           }

  //           return (
  //             <div
  //               key={key}
  //               style={{
  //                 display: key === "blank.png" ? "none" : "all",
  //                 border: swapActive ? "1px solid red" : "1px solid #bbb",
  //               }}
  //               className={`min-w-[150px] ${
  //                 currentPath.length === 1
  //                   ? currentPath[0] === "about"
  //                     ? ""
  //                     : currentPath[0] === "projects"
  //                     ? "h-[105px] pl-[17px]"
  //                     : "h-[80px] pl-[17px]"
  //                   : ""
  //               } flex ${
  //                 currentPath.length === 1 && currentPath[0] !== "about"
  //                   ? "flex-col w-[300px]"
  //                   : "items-center justify-center max-w-[33%] sm:w-[calc(18%-1rem)] sm:max-w-[20%] min-w-[150px] "
  //               } relative p-2 bg-[#f9f9f9]  rounded-lg ${
  //                 !swapActive ? "cursor-pointer" : ""
  //               }`}
  //               onClick={() =>
  //                 (currentPath.length === 2 && swapActive) ||
  //                 (currentPath.length === 1 &&
  //                   currentPath[0] === "about" &&
  //                   swapActive)
  //                   ? () => {}
  //                   : handleFolderClick(key)
  //               }
  //             >
  //               <>
  //                 {key !== "about" &&
  //                   key !== "archives" &&
  //                   key !== "projects" && (
  //                     <div className="z-[10]">
  //                       {typeof currentFolder[key] !== "string" && (
  //                         <button
  //                           className="absolute top-[-10px] left-[-10px] w-[25px] h-[25px] bg-white border border-black rounded-full flex items-center justify-center cursor-pointer"
  //                           onClick={(e) => {
  //                             e.stopPropagation();
  //                             const basePath = `${currentPath.join("/")}/`;
  //                             openPopup(key, basePath);
  //                           }}
  //                         >
  //                           <BiSolidPencil
  //                             className="ml-[-0.5px]"
  //                             color={"black"}
  //                             size={13}
  //                           />
  //                         </button>
  //                       )}

  //                       {!swapActive && (
  //                         <button
  //                           className="absolute top-[-10px] right-[-10px] w-[25px] h-[25px] bg-white border border-black rounded-full flex items-center justify-center cursor-pointer"
  //                           onClick={(e) => {
  //                             e.stopPropagation();
  //                             if (window.confirm(`Delete item?`)) {
  //                               const fullPath = `${currentPath.join(
  //                                 "/"
  //                               )}/${key}`;
  //                               handleDeleteItem(fullPath);
  //                             }
  //                           }}
  //                         >
  //                           <FaTrash
  //                             className="ml-[0px]"
  //                             color={"black"}
  //                             size={11}
  //                           />
  //                         </button>
  //                       )}

  //                       {isProjectFolder && projectFound && (
  //                         <button
  //                           className="absolute bottom-[-10px] right-[-10px] w-[25px] h-[25px] bg-white border border-black rounded-full flex items-center justify-center cursor-pointer"
  //                           onClick={async (e) => {
  //                             e.stopPropagation();
  //                             await handleStarChange(key);

  //                           }}
  //                         >
  //                           {starTrue ? (
  //                             <IoStar
  //                               className="mt-[-1px]"
  //                               color={"green"}
  //                               size={15}
  //                             />
  //                           ) : (
  //                             <IoStarOutline
  //                               className="mt-[-1px]"
  //                               color={"#888"}
  //                               size={15}
  //                             />
  //                           )}
  //                         </button>
  //                       )}
  //                     </div>
  //                   )}
  //                 {key === "about" && (
  //                   <button
  //                     className="absolute top-[-10px] left-[-10px] w-[25px] h-[25px] bg-white border border-black rounded-full flex items-center justify-center cursor-pointer"
  //                     onClick={(e) => {
  //                       e.stopPropagation();
  //                       setAboutPopupOpen(true);
  //                     }}
  //                   >
  //                     <BiSolidPencil
  //                       className="ml-[-0.5px]"
  //                       color={"black"}
  //                       size={13}
  //                     />
  //                   </button>
  //                 )}

  //                 {currentPath.length === 2 &&
  //                   currentPath[0] === "projects" && (
  //                     <button
  //                       className="z-[12] absolute bottom-[-10px] left-[-10px] w-[25px] h-[25px] bg-white border border-black rounded-full flex items-center justify-center cursor-pointer"
  //                       onClick={async (e) => {
  //                         e.stopPropagation();
  //                         await handleStarChange(key);
  //                       }}
  //                     >
  //                       {starTrue ? (
  //                         <IoStar
  //                           className="mt-[-1px]"
  //                           color={"green"}
  //                           size={15}
  //                         />
  //                       ) : (
  //                         <IoStarOutline
  //                           className="mt-[-1px]"
  //                           color={"#888"}
  //                           size={15}
  //                         />
  //                       )}
  //                     </button>
  //                   )}

  //                 {typeof currentFolder[key] === "string" &&
  //                   swapActive &&
  //                   currentImageSwapIndex !== -1 &&
  //                   index !== currentImageSwapIndex && (
  //                     <>
  //                       {index !== currentImageSwapIndex + 1 && (
  //                         <div
  //                           className={`${
  //                             swapActive ? "cursor-pointer" : ""
  //                           } z-[9] w-[25px] bg-red-400 h-[100%] absolute left-[-25px] top-0`}
  //                           style={{ borderRadius: "5px" }}
  //                           onClick={() => {
  //                             handleMoveImageItem(key, index, 0);
  //                           }}
  //                         ></div>
  //                       )}

  //                       {showRightSwapDiv && (
  //                         <div
  //                           className={`${
  //                             swapActive ? "cursor-pointer" : ""
  //                           } z-[9] w-[25px] bg-red-400 h-[100%] absolute right-[-25px] top-0`}
  //                           style={{ borderRadius: "5px" }}
  //                           onClick={() => {
  //                             handleMoveImageItem(key, index, 1);
  //                           }}
  //                         ></div>
  //                       )}
  //                     </>
  //                   )}

  //                 {typeof currentFolder[key] === "string" && (
  //                   <div className="z-[9]">
  //                     <div
  //                       className="z-[9] min-w-[100%] min-h-[200px] items-center flex"
  //                       style={{
  //                         opacity: swapActive && swapItems[0] !== key ? 0.3 : 1,
  //                       }}
  //                     >
  //                       <img
  //                         src={`${githubBaseUrl}${currentPath.join(
  //                           "/"
  //                         )}/${key}`}
  //                         alt={key}
  //                         className="w-full h-auto"
  //                       />
  //                       {/* <div className="bottom-0 left-0 absolute w-[100%] h-[30px] flex justify-center px-[3px]">
  //                         <span className="truncate overflow-hidden text-ellipsis w-[100%]text-center">
  //                           {key}
  //                         </span>
  //                       </div> */}

  //                       <button
  //                         style={{
  //                           opacity: swapActive && swapItems[0] !== key ? 0 : 1,
  //                           border: !swapActive
  //                             ? "1px solid black"
  //                             : "1px solid #00BBFC",
  //                         }}
  //                         className="rounded-full absolute top-[-10px] left-[-10px] w-[25px] h-[25px] bg-white flex items-center justify-center cursor-pointer"
  //                         onClick={async (e) => {
  //                           e.stopPropagation();
  //                           if (!swapActive) {
  //                             setSwapActive(true);
  //                             const swapItemsCopy = swapItems;
  //                             swapItemsCopy[0] = key;
  //                             setSwapItems(swapItemsCopy);
  //                             setCurrentImageSwapIndex(index);
  //                           } else {
  //                             if (key === swapItems[0]) {
  //                               setSwapItems([null, null]);
  //                               setSwapActive(false);
  //                               setCurrentImageSwapIndex(-1);
  //                               return;
  //                             }
  //                             const swapItemsCopy = swapItems;
  //                             swapItemsCopy[1] = key;
  //                             setSwapItems(swapItemsCopy);
  //                             await handleSwapItems();
  //                           }
  //                         }}
  //                       >
  //                         <GrPowerCycle
  //                           color={swapActive ? "#00BBFC" : "black"}
  //                           size={15}
  //                           className="ml-[-0.5px]"
  //                         />
  //                       </button>

  //                       {/* {currentPath.length > 1 &&
  //                       currentPath[0] === "archives" && (
  //                         <>
  //                           <button
  //                             className="absolute bottom-[-10px] left-[-10px] w-[25px] h-[25px] bg-white border border-black rounded-full flex items-center justify-center cursor-pointer"
  //                             style={{ borderRadius: "50%" }}
  //                             onClick={async (e) => {
  //                               e.stopPropagation();
  //                             }}
  //                           >
  //                             <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
  //                               <ColorPicker
  //                                 initialColor={defaultImgColor}
  //                                 primary={true}
  //                                 onColorChange={(
  //                                   primary: boolean,
  //                                   newValue: string
  //                                 ) => handleImageColorChange(key, newValue)}
  //                               />
  //                             </div>

  //                             <div
  //                               style={{
  //                                 border: "2px solid white",
  //                                 pointerEvents: "none",
  //                               }}
  //                               className="absolute top-0 left-0 w-[23px] h-[23px] rounded-full overflow-hidden"
  //                             ></div>
  //                             <div
  //                               style={{
  //                                 border: "1px solid #CCCCCC",
  //                                 pointerEvents: "none",
  //                               }}
  //                               className="absolute top-[-1px] left-[-1px] w-[25px] h-[25px] rounded-full overflow-hidden"
  //                             ></div>
  //                           </button>

  //                           {changedArchiveImageColorItems[key] && (
  //                             <button
  //                               style={{ border: "1px solid green" }}
  //                               className="rounded-full absolute bottom-[-10px] right-[-10px] w-[25px] h-[25px] bg-white flex items-center justify-center cursor-pointer"
  //                               onClick={async (e) => {
  //                                 e.stopPropagation();
  //                                 handleArchiveImageColorChange(key);
  //                               }}
  //                             >
  //                               <FaCheck
  //                                 color={"green"}
  //                                 size={15}
  //                                 className="ml-[-0.5px]"
  //                               />
  //                             </button>
  //                           )}
  //                         </>
  //                       )} */}
  //                     </div>
  //                   </div>
  //                 )}
  //                 {typeof currentFolder[key] !== "string" &&
  //                   currentPath[0] === "projects" && (
  //                     <div className="h-[200px] w-[auto]">
  //                       {!projectFound ? (
  //                         <>{key}</>
  //                       ) : (
  //                         <div
  //                           className="flex flex-col"
  //                           style={{
  //                             wordWrap: "break-word",
  //                             whiteSpace: "normal",
  //                           }}
  //                         >
  //                           <p className="truncate overflow-hidden text-ellipsis">
  //                             {unSanitizeTitle(projectItem.title, false)}
  //                           </p>

  //                           <p className="truncate overflow-hidden text-ellipsis">
  //                             {unSanitizeTitle(projectItem.description, true)}
  //                           </p>

  //                           <div className="flex flex-row gap-2 mt-[7px]">
  //                             <div
  //                               onClick={(e: any) => e.stopPropagation()}
  //                               className="w-[25px] h-[25px] relative"
  //                             >
  //                               <ColorPicker
  //                                 initialColor={projectItem.bg_color}
  //                                 primary={true}
  //                                 onColorChange={(
  //                                   primary: boolean,
  //                                   newValue: string
  //                                 ) =>
  //                                   handleColorChange(key, primary, newValue)
  //                                 }
  //                               />
  //                             </div>
  //                             <div
  //                               onClick={(e: any) => e.stopPropagation()}
  //                               className="w-[25px] h-[25px] relative"
  //                             >
  //                               <ColorPicker
  //                                 initialColor={projectItem.text_color}
  //                                 primary={false}
  //                                 onColorChange={(
  //                                   primary: boolean,
  //                                   newValue: string
  //                                 ) =>
  //                                   handleColorChange(key, primary, newValue)
  //                                 }
  //                               />
  //                             </div>

  //                             {changedColorItems[key] && (
  //                               <button
  //                                 className="hover-dim7 ml-2 px-2 py-[2px] rounded text-[13px]"
  //                                 style={{
  //                                   color: "black",
  //                                   border: "1px solid black",
  //                                 }}
  //                                 onClick={(e: any) => {
  //                                   e.stopPropagation();
  //                                   handleProjectColorsChange(key);
  //                                 }}
  //                               >
  //                                 Done
  //                               </button>
  //                             )}
  //                           </div>
  //                         </div>
  //                       )}
  //                     </div>
  //                   )}
  //                 {typeof currentFolder[key] !== "string" &&
  //                   currentPath[0] === "archives" && (
  //                     <div className="h-[200px] w-[auto]">
  //                       {!projectFound ? (
  //                         <>{key}</>
  //                       ) : (
  //                         <div>
  //                           <p>{unSanitizeTitle(projectItem.title, false)}</p>
  //                           <div className="flex flex-row mt-[7px] ">
  //                             <div
  //                               onClick={(e: any) => e.stopPropagation()}
  //                               className="w-[25px] h-[25px] relative"
  //                             >
  //                               <ColorPicker
  //                                 initialColor={projectItem.bg_color}
  //                                 primary={true}
  //                                 onColorChange={(
  //                                   primary: boolean,
  //                                   newValue: string
  //                                 ) =>
  //                                   handleColorChange(key, primary, newValue)
  //                                 }
  //                               />
  //                             </div>

  //                             {changedColorItems[key] && (
  //                               <button
  //                                 className="hover-dim7 ml-2 px-2 py-[2px] rounded text-[13px]"
  //                                 style={{
  //                                   color: "black",
  //                                   border: "1px solid black",
  //                                 }}
  //                                 onClick={(e: any) => {
  //                                   e.stopPropagation();
  //                                   handleProjectColorsChange(key);
  //                                 }}
  //                               >
  //                                 Done
  //                               </button>
  //                             )}
  //                           </div>
  //                         </div>
  //                       )}
  //                     </div>
  //                   )}
  //                 {typeof currentFolder[key] !== "string" &&
  //                   (currentPath[0] !== "projects" || key === "covers") &&
  //                   currentPath[0] !== "archives" && (
  //                     <span className="">{key}</span>
  //                   )}

  //                 {typeof currentFolder[key] !== "string" &&
  //                   currentPath.length === 1 &&
  //                   (currentPath[0] === "archives" ||
  //                     currentPath[0] === "projects") && (
  //                     <button
  //                       style={{
  //                         border:
  //                           folderSwapActive && folderSwapItems[0] !== key
  //                             ? "1px solid #00BBFC"
  //                             : "1px solid black",
  //                       }}
  //                       className="rounded-full absolute bottom-[-10px] left-[-10px] w-[25px] h-[25px] bg-white flex items-center justify-center cursor-pointer"
  //                       onClick={async (e) => {
  //                         e.stopPropagation();
  //                         if (!folderSwapActive) {
  //                           setFolderSwapActive(true);
  //                           const folderSwapItemsCopy = folderSwapItems;
  //                           folderSwapItemsCopy[0] = key;
  //                           setFolderSwapItems(folderSwapItemsCopy);
  //                         } else {
  //                           if (key === folderSwapItems[0]) {
  //                             setFolderSwapItems([null, null]);
  //                             setFolderSwapActive(false);
  //                             return;
  //                           }
  //                           const folderSwapItemsCopy = folderSwapItems;
  //                           folderSwapItemsCopy[1] = key;
  //                           setFolderSwapItems(folderSwapItemsCopy);
  //                           await handleFolderSwapItems();
  //                         }
  //                       }}
  //                     >
  //                       <GrPowerCycle
  //                         color={
  //                           folderSwapActive && folderSwapItems[0] !== key
  //                             ? "#00BBFC"
  //                             : "black"
  //                         }
  //                         size={15}
  //                         className="ml-[-0.5px]"
  //                       />
  //                     </button>
  //                   )}
  //               </>
  //             </div>
  //           );
  //         })}
  //       <Popup
  //         isOpen={popupOpen}
  //         onClose={() => {
  //           setPopupOpen(false);
  //         }}
  //         title={popupTitle}
  //         desc={popupDesc}
  //         desc2={popupDesc2}
  //         desc3={popupDesc3}
  //         popupExtention={popupExtention}
  //         onRename={handleRename}
  //         popupTrigger={popupTrigger}
  //         currentPath={currentPath}
  //       />
  //       <AboutPopup
  //         isOpen={aboutPopupOpen}
  //         onClose={() => {
  //           setAboutPopupOpen(false);
  //         }}
  //         appFile={appFile}
  //         onAppFileChange={handleAppFileChange}
  //       />
  //     </div>
  //   );
  // };

  const renderContent = () => {
    if (currentPath.length === 0) {
      return <></>;
    }
    const currentFolder = getCurrentFolder();
    if (
      currentFolder === null ||
      currentFolder === undefined ||
      typeof currentFolder === "string"
    ) {
      return <></>;
    }

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[15px] w-full h-auto p-[15px]">
        {currentFolder.type === "folder" &&
          Object.keys(currentFolder.children).length > 0 &&
          Object.keys(currentFolder.children)
            .sort(
              (a, b) =>
                currentFolder.children[a].index -
                currentFolder.children[b].index
            )
            .map((item: any, index: number) => {
              const folderChildren = currentFolder.children as any;
              return (
                <div
                  onClick={() => {
                    if (folderChildren[item].type !== "image") {
                      handleFolderClick(item);
                    }
                  }}
                  key={index}
                  className={`cursor-pointer ${
                    folderChildren[item].type === "image"
                      ? "h-[200px]"
                      : "h-[48px]"
                  } bg-[#EEEEEE] relative border border-gray-400 rounded-md justify-center flex p-[10px]`}
                >
                  {editMode && (
                    <button
                      className="absolute top-[-10px] right-[-10px] w-[23px] h-[23px] border border-[#999] bg-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm(
                            folderChildren[item].type === "image"
                              ? "Delete image?"
                              : `Delete ${item}?`
                          )
                        ) {
                          handleDeleteItem(item);
                        }
                      }}
                    >
                      <FaTrash color={"#222"} size={11} />
                    </button>
                  )}
                  {folderChildren[item].type === "image" ? (
                    <a href={folderChildren[item].link}>
                      <img
                        alt=""
                        className="w-[100%] h-[100%] object-contain"
                        src={folderChildren[item].link}
                      />
                    </a>
                  ) : (
                    <>{item[0].toUpperCase() + item.slice(1)}</>
                  )}
                </div>
              );
            })}
      </div>
    );
  };

  const [aboutPopupOpen, setAboutPopupOpen] = useState(false);

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

  type FileImage = {
    name: string;
    file: File;
  };

  const handleSend = async (files: FileImage[]) => {
    const formData = new FormData();

    files.forEach((fileImage, index) => {
      formData.append("files", fileImage.file, fileImage.name);
    });
    formData.append("currentPath", currentPath.join("/"));

    try {
      const local = false;
      let serverUrl =
        "https://image-server-production-53c2.up.railway.app/compress";
      if (local) {
        serverUrl = "http://localhost:3001/compress";
      }
      const response = await axios.post(serverUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.status === 200;
    } catch (error) {
      console.error("Upload error:", error);
      return false;
    }
  };

  const handleFiles = (files: File[]) => {
    let highestIndex = 0;
    let images: any[] = [];

    if (appFile !== null) {
      if (currentPath[0] === "about") {
        images = appFile["pages"]["about"]["images"];
      } else if (currentPath[0] === "projects" && currentPath.length === 2) {
        const projectItem = appFile["pages"]["projects"].filter(
          (item: any) => item.id === currentPath[1]
        );
        if (projectItem.length > 0) {
          images = projectItem[0].images;
        }
      } else if (currentPath[0] === "archives" && currentPath.length === 2) {
        const projectItem = appFile["pages"]["archives"].filter(
          (item: any) => item.id === currentPath[1]
        );
        if (projectItem.length > 0) {
          images = projectItem[0].images;
        }
      } else {
        return;
      }
    } else {
      return;
    }

    for (let i = 0; i < images.length; i++) {
      if (images[i].index > highestIndex) {
        highestIndex = images[i].index;
      }
    }

    let nextIndex = highestIndex + 1;

    const random8Digits = () => {
      return Math.floor(10000000 + Math.random() * 90000000);
    };
    setLoading(true);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length > 0) {
      const appFileCopy = appFile;
      const uploadedNames: string[] = [];
      const readerPromises = imageFiles.map((file) => {
        return new Promise<FileImage>(async (resolve) => {
          const extension = file.type.split("/").pop();
          if (!extension) return;

          // Remove extension
          const lastDotIndex = file.name.lastIndexOf(".");
          if (lastDotIndex === -1) return;
          const newFileName = file.name.slice(0, lastDotIndex);

          let sanitizedFileName = newFileName.replace(/[^a-zA-Z0-9]/g, "_");
          const newExtension = "webp";

          // Ensure img has extension
          sanitizedFileName = `${sanitizedFileName}-${random8Digits()}.${newExtension}`;
          uploadedNames.push(sanitizedFileName);

          if (currentPath[0] === "about") {
            appFileCopy["pages"]["about"]["images"].push({
              index: nextIndex,
              name: sanitizedFileName,
            });
          } else if (
            currentPath[0] === "projects" &&
            currentPath.length === 2
          ) {
            const projectItem = appFile["pages"]["projects"].filter(
              (item: any) => item.id === currentPath[1]
            );
            if (projectItem.length > 0) {
              const foundIndex = appFileCopy["pages"]["projects"].findIndex(
                (item: any) => item.id === currentPath[1]
              );
              appFileCopy["pages"]["projects"][foundIndex]["images"].push({
                index: nextIndex,
                name: sanitizedFileName,
                projectCover: false,
              });
            }
          } else if (
            currentPath[0] === "archives" &&
            currentPath.length === 2
          ) {
            const projectItem = appFile["pages"]["archives"].filter(
              (item: any) => item.id === currentPath[1]
            );

            if (projectItem.length > 0) {
              const foundIndex = appFileCopy["pages"]["archives"].findIndex(
                (item: any) => item.id === currentPath[1]
              );
              appFileCopy["pages"]["archives"][foundIndex]["images"].push({
                index: nextIndex,
                name: sanitizedFileName,
              });
            }
          }

          setAppFile(appFileCopy);
          nextIndex += 1;
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              name: sanitizedFileName,
              file: file,
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises)
        .then(async (images) => {
          setUploadPopup(false);
          await handleSend(images);
        })
        .then(() => {
          setLoading(false);
          updateProjectFile(appFileCopy);
        });
    } else {
      alert("Only image files are allowed!");
    }
  };

  if (projectImages.length === 0 && Object.keys(projectFile).length === 0) {
    return <div>{loadingText}</div>;
  }

  return (
    <div
      className="w-[100vw] h-[100vh] fixed"
      style={{ pointerEvents: loading ? "none" : "all" }}
    >
      {uploadPopup && (
        <div className="z-[999] fixed top-0 left-0">
          <div
            className="absolute top-0 w-[100vw] h-[100vh]"
            style={{ backgroundColor: "black", opacity: 0.4 }}
          ></div>
          <div className="absolute top-0 w-[100vw] h-[100vh] flex items-center justify-center">
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
                className="absolute top-2 right-3"
                style={{ cursor: "pointer" }}
                color={"black"}
                size={50}
              />
            </div>
          </div>
        </div>
      )}

      <div
        className="z-[998] w-[100%] h-[63px] fixed left-0 top-0 flex flex-row"
        style={{ backgroundColor: "white", borderBottom: "1px solid #CCCCCC" }}
      >
        <div className="h-[100%] w-[50px] items-center flex justify-end">
          <button
            onClick={handleSideBarToggle}
            style={{ transform: "scale(0.8)" }}
            className="cursor-pointer absolute flex-col gap-[5px] w-[40px] h-[40px] flex items-center justify-center"
          >
            <div className="bg-black w-[30px] h-[3px]"></div>
            <div className="bg-black w-[30px] h-[3px]"></div>
            <div className="bg-black w-[30px] h-[3px]"></div>
          </button>
        </div>

        <div
          className={`h-[100%] flex items-center ml-[11px]
          font-[500] text-[20px] mt-[-1px]`}
        >
          <div
            className="cursor-pointer"
            onClick={() => {
              setCurrentPath([]);
            }}
          >
            Project Dashboard
          </div>
          <div className="ml-[25px] flex flex-row">
            {currentPath.map((item: any, index: number) => (
              <div
                className="ml-[5px] flex flex-row mt-[1px] cursor-pointer"
                onClick={() => {
                  setCurrentPath(currentPath.slice(0, index + 1));
                }}
                key={index}
              >
                <p style={{ color: "#AAAAAA" }}>{currentPath[index]}</p>
                {currentPath.length - 1 > 0 &&
                  index !== currentPath.length - 1 && (
                    <GoChevronRight
                      className="mt-[1px] mx-[1px]"
                      color={"#AAAAAA"}
                      size={29}
                    />
                  )}
              </div>
            ))}
          </div>
        </div>

        {loading && (
          <div className="absolute top-4 right-[107px] simple-spinner"></div>
        )}
        <button
          onClick={onLogout}
          className="button absolute top-3 right-[12px]"
        >
          Logout
        </button>
      </div>

      <div className="absolute w-[100%] h-[calc(100%-63px)] top-[63px] left-0 flex justify-end">
        <div
          style={{
            transform: sideBarOpen
              ? "translateX(0px)"
              : window.innerWidth > 1024
              ? "translateX(-180px)"
              : "translateX(-140px)",
            transition: "transform 0.3s ease-in-out",
            borderRight: "1px solid #BBBBBB",
          }}
          className="z-[999] bg-[white] w-[140px] lg:w-[180px] h-[100%] absolute top-0 left-0 px-[12px] pt-[6px]"
        >
          <div className="relative select-none">
            <p
              className="font-[500] text-[16px] pb-[5px] mb-[5px]"
              style={{ borderBottom: "1px solid #BBB" }}
            >
              Pages
            </p>

            <BiSolidPencil
              onClick={() => {
                setEditMode((prev) => !prev);
              }}
              color={"#222"}
              size={24}
              className={`p-[3px] right-[1px] border-[#999] ${
                editMode && "bg-[#DDDDDD]"
              }  absolute top-0 cursor-pointer`}
              style={{ borderRadius: "8px", border: "0.1px solid #999" }}
            />
          </div>
          {Object.keys(projectFile).length > 0 &&
            projectFile.children &&
            Object.keys(projectFile.children)
              .sort(
                (a, b) =>
                  projectFile.children[a].index - projectFile.children[b].index
              )
              .map((key, index) => {
                return (
                  <div
                    key={index}
                    style={{ borderRadius: "3px" }}
                    className={`cursor-pointer hover-dim pl-[6px] pt-[2px] pb-[3px] relative flex flex-row ${
                      currentPath.length > 0 &&
                      currentPath[0] === key &&
                      "bg-[#DDDDDD]"
                    }`}
                    onClick={() => {
                      handlePageClick(key);
                    }}
                  >
                    <p>{key[0].toUpperCase() + key.slice(1)}</p>
                    {editMode && (
                      <button
                        className="absolute bg-white right-[10px] w-[23px] h-[23px] border rounded-full flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete page: ${key}?`)) {
                            handleDeleteItem(key);
                          }
                        }}
                      >
                        <FaTrash color={"#222"} size={11} />
                      </button>
                    )}
                  </div>
                );
              })}
          {Object.keys(projectFile).includes("projectDetails") &&
            Object.keys(projectFile["projectDetails"]).includes("pagesLock") &&
            !projectFile.projectDetails.pagesLock && (
              <div className="w-[calc(100%-24px)] flex justify-center absolute bottom-[15px]">
                <button
                  onClick={() => {
                    const folderName = window.prompt("New Page Name:");
                    if (folderName && folderName !== "") {
                      const sanitizedFolderName = folderName
                        .trim()
                        .replaceAll(/[^a-zA-Z0-9-&]/g, "_");
                      handleAddPage(sanitizedFolderName);
                    }
                  }}
                  className="px-[10px] py-[5px] text-[13px] flex-items-center justify-center font-[500]"
                  style={{ borderRadius: "3px", border: "1px solid #999" }}
                >
                  Add Page
                </button>
              </div>
            )}
        </div>
        <div
          ref={sidebarRef}
          className={`h-[100%] w-[100vw] ${
            currentPath.length > 0 &&
            getCurrentFolder() !== null &&
            Object.keys(getCurrentFolder()).includes("details")
              ? "pr-[240px] lg:pr-[280px]"
              : "pr-0"
          } bg-white ${sideBarOpen ? "pl-[140px] lg:pl-[180px]" : "pl-0"}`}
        >
          <div className="w-full h-full">{renderContent()}</div>
        </div>

        {currentPath.length > 0 &&
          getCurrentFolder() !== null &&
          Object.keys(getCurrentFolder()).includes("details") && (
            <div
              style={{
                borderLeft: "1px solid #BBBBBB",
              }}
              className="overflow-scroll bg-[white] w-[240px] lg:w-[280px] h-[calc(100%-63px)] absolute top-0 right-[2px]"
            >
              <div
                className="fixed w-[240px] lg:w-[280px] z-[102] h-[50px] bg-white"
                style={{ borderBottom: "1px solid #BBBBBB" }}
              >
                <div className="relative w-[100%] h-[50px] flex flex-row items-center ">
                  <p className="font-[600] text-[18px] text-[#888] pb-[1px] pl-[14px] w-[calc(100%-47px)] mr-[5px]">
                    {currentPath.length > 0 &&
                      currentPath[currentPath.length - 1]}{" "}
                    Folder
                  </p>
                  <BiSolidPencil
                    onClick={() => {
                      setEditDetailsMode((prev) => !prev);
                    }}
                    color={"#222"}
                    size={24}
                    className={`p-[3px] border-[#999] ${
                      editDetailsMode && "bg-[#DDDDDD]"
                    } cursor-pointer`}
                    style={{ borderRadius: "8px", border: "0.1px solid #999" }}
                  />
                </div>
              </div>
              {Object.keys(getCurrentFolder()["details"]).includes(
                "colors"
              ) && (
                <div className="mt-[59px] w-[100%] px-[15px]">
                  {getCurrentFolder()["details"]["colors"].length > 0 && (
                    <div className="relative pb-[15px] overflow-scroll flex flex-col gap-[6px]">
                      <p className="select-none font-[500] text-[18px] text-[#888] pb-[1px]">
                        Colors
                      </p>

                      <BiPlus
                        onClick={() => {
                          handleAddFolderDetail("colors");
                        }}
                        color={"#999"}
                        size={24}
                        className={`absolute right-0 top-[1px] p-[3px] border-[#999] cursor-pointer rounded-full`}
                        style={{ border: "0.1px solid #999" }}
                      />

                      {getCurrentFolder()
                        ["details"]["colors"].sort((a: any, b: any) => {
                          if (a === null || b === null) {
                            return 0;
                          } else {
                            return a.index - b.index;
                          }
                        })
                        .map((colorObject: any, index: number) => (
                          <div
                            key={index}
                            className="flex flex-row w-full gap-[5px] items-center"
                          >
                            {colorObject !== null &&
                              Object.keys(colorObject).includes("name") &&
                              Object.keys(colorObject).includes("value") && (
                                <div className="w-[100%] h-[38px] rounded-[5px] gap-[6px] border border-[#BBBBBB] flex items-center px-[9px] text-[#888] font-[500]">
                                  <input
                                    type="text"
                                    value={colorObject["name"]}
                                    className="border-none w-[calc(100%-31px)] outline-none"
                                  />

                                  <div
                                    onClick={(e: any) => e.stopPropagation()}
                                    className="w-[25px] h-[25px] relative rounded-[5px]"
                                  >
                                    <ColorPicker
                                      initialColor={colorObject["value"]}
                                      primary={true}
                                      onColorChange={(
                                        primary: boolean,
                                        newValue: string
                                      ) =>
                                        // handleColorChange(key, primary, newValue)
                                        {}
                                      }
                                    />
                                  </div>
                                </div>
                              )}

                            {editDetailsMode && (
                              <button
                                className="w-[28px] h-[25px] border border-[#999] bg-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (
                                    window.confirm(
                                      `Delete ${colorObject["name"]}?`
                                    )
                                  ) {
                                    handleDeleteFolderDetail(
                                      "colors",
                                      colorObject.index
                                    );
                                  }
                                }}
                              >
                                <FaTrash color={"#222"} size={11} />
                              </button>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              <div className="w-ful h-[1px] mt-[3px] mb-[8px] bg-[#BBBBBB]"></div>

              {Object.keys(getCurrentFolder()["details"]).includes("text") && (
                <div className="mt-[5px] pb-[10px] w-[100%] px-[15px]">
                  {getCurrentFolder()["details"]["text"].length > 0 && (
                    <div className="relative overflow-scroll flex flex-col gap-[6px]">
                      <p className="select-none font-[500] text-[18px] text-[#888] pb-[1px]">
                        Text
                      </p>
                      <BiPlus
                        onClick={() => {
                          handleAddFolderDetail("text");
                        }}
                        color={"#999"}
                        size={24}
                        className={`absolute right-0 top-[1px] p-[3px] border-[#999] cursor-pointer rounded-full`}
                        style={{ border: "0.1px solid #999" }}
                      />
                      {getCurrentFolder()
                        ["details"]["text"].sort((a: any, b: any) => {
                          if (a === null || b === null) {
                            return 0;
                          } else {
                            return a.index - b.index;
                          }
                        })
                        .map((textObject: any, index: number) => (
                          <div
                            key={index}
                            className="flex flex-row w-full gap-[5px] items-center"
                          >
                            {textObject !== null &&
                              Object.keys(textObject).includes("name") &&
                              Object.keys(textObject).includes("value") && (
                                <div className="flex flex-col mb-[4px]">
                                  <input
                                    type="text"
                                    value={textObject["name"]}
                                    className="text-[15px] text-[#777] outline-none border-none"
                                  />{" "}
                                  <div className="flex flex-row items-center h-[auto] w-full gap-[5px]">
                                    <textarea
                                      value={textObject["value"]}
                                      className="mt-[2px] w-full border text-[#888] font-[500] border-[#BBBBBB] rounded-[5px] h-[auto] p-2 outline-none resize-none whitespace-pre-wrap break-words"
                                    ></textarea>

                                    {editDetailsMode && (
                                      <button
                                        className="w-[28px] h-[25px] border border-[#999] bg-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (
                                            window.confirm(
                                              `Delete ${textObject["name"]}?`
                                            )
                                          ) {
                                            handleDeleteFolderDetail(
                                              "text",
                                              textObject.index
                                            );
                                          }
                                        }}
                                      >
                                        <FaTrash color={"#222"} size={11} />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        {currentPath.length > 0 && (
          <div
            className="z-[998] w-[100%] h-[63px] fixed left-0 bottom-0 flex justify-end py-[12px] pr-[13px] gap-[10px]"
            style={{ backgroundColor: "white", borderTop: "1px solid #CCCCCC" }}
          >
            {currentPath.length > 0 &&
              getCurrentFolder() !== null &&
              Object.keys(getCurrentFolder()).includes("children") &&
              (Object.keys(getCurrentFolder()["children"]).length === 0 ||
                (Object.keys(getCurrentFolder()["children"]).length > 0 &&
                  getCurrentFolder()["children"][
                    Object.keys(getCurrentFolder()["children"])[0]
                  ].type !== "image")) && (
                <button
                  onClick={() => {
                    const folderName = window.prompt("Folder Name:");
                    if (folderName && folderName !== "") {
                      const sanitizedFolderName = folderName
                        .trim()
                        .replace(/[^a-zA-Z0-9-&]/g, "_");
                      handleAddFolder(sanitizedFolderName);
                    }
                  }}
                  className="px-[10px] py-[5px] text-[13px] flex-items-center justify-center font-[500]"
                  style={{ borderRadius: "3px", border: "1px solid #999" }}
                >
                  Add Folder
                </button>
              )}

            {currentPath.length > 0 &&
              getCurrentFolder() !== null &&
              Object.keys(getCurrentFolder()).includes("children") &&
              (Object.keys(getCurrentFolder()["children"]).length === 0 ||
                (Object.keys(getCurrentFolder()["children"]).length > 0 &&
                  getCurrentFolder()["children"][
                    Object.keys(getCurrentFolder()["children"])[0]
                  ].type === "image")) && (
                <button
                  onClick={() => {
                    setUploadPopup(true);
                  }}
                  className="px-[10px] py-[5px] text-[13px] flex-items-center justify-center font-[500]"
                  style={{ borderRadius: "3px", border: "1px solid #999" }}
                >
                  Upload
                </button>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
