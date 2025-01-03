import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {
    const deleteFolder = async () => {
    const owner = 'JosephGoff';  
    const repo = 'js-photography';  
    const folderPath = 'test'; 
    const branch = 'master';

    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${folderPath}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GIT_PAT}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch folder contents');
      }

      const files = await response.json();

      // Iterate over each file in the folder and delete it
      for (const file of files) {
        const deleteResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GIT_PAT}`,
              Accept: 'application/vnd.github.v3+json',
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

      console.log('Folder successfully deleted!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div onClick={deleteFolder}>button</div>
  );
};

export default Admin;
