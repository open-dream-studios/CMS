import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {
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
      console.log(`Folder copied from ${path} to ${newPath} successfully!`);
    } catch (error) {
      console.error("Error copying folder:", error);
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

      console.log("Folder successfully deleted!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          deleteItem("test.png", true);
        }}
      >
        delete
      </div>
      <div
        onClick={() => {
          copyItem("test.png", "test2.png", true);
        }}
      >
        copy
      </div>
    </>
  );
};

export default Admin;
