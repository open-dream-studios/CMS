import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Admin from "./Admin/Admin";

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
