import React, { useState, useEffect, useRef } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Admin from "./Admin/Admin";

export const GIT_KEYS = {
  owner: "open-dream-studios",
  repo: "test-project",
  branch: "main",
  token: process.env.REACT_APP_GIT_PAT,
};

export const BASE_URL = `https://raw.githubusercontent.com/${GIT_KEYS.owner}/${GIT_KEYS.repo}/refs/heads/${GIT_KEYS.branch}/public/assets/`;

const Root = () => (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Admin />} />
      </Routes>
    </Router>
  </>
);

export default Root;
