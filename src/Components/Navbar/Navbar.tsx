import React from "react";
import { Page } from "../../App";
import "./Navbar.css"

interface PageProps {
  navigate: (page: Page) => void;
}

const Navbar: React.FC<PageProps> = ({ navigate }) => {
  return (
    <div
      className="w-[100vw] h-[88px] flex z-[900] fixed justify-between lg:px-[32px] px-[18px]"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className="cursor-pointer mt-[28px] text-[16px] lg:text-[21px] leading-[16px] lg:leading-[21px] font-[400]"
        onClick={() => {
          navigate("home");
        }}
      >
        JESSICA SHULMAN
      </div>
      <div className="mt-[28px] lg:flex hidden flex-col leading-[14px] gap-[3.5px]">
        <div className="text-[14px]">PHOTOGRAPHER & DESIGNER</div>
        <div className="flex flex-row gap-[6px] text-[14px] h-[15px]">
          <a className="nav-item cursor-pointer" href="/">JESSSHULMAN27@GMAIL.COM</a>
          <p className="text-[13px] mt-[-1.3px] font-[400]">/</p>
          <a className="nav-item cursor-pointer" href="/">INSTAGRAM</a>
        </div>
      </div>
      <div className="mt-[28px] flex flex-row h-[15px] text-[14px] leading-[14px]">
        <div
          className="cursor-pointer nav-item mx-[calc(3px+0.3vw)]"
          onClick={() => {
            navigate("projects");
          }}
        >
          INDEX
        </div>
        <div
          className="cursor-pointer nav-item mx-[calc(3px+0.3vw)]"
          onClick={() => {
            navigate("about");
          }}
        >
          INFOS
        </div>
        <div
          className="cursor-pointer nav-item mx-[calc(3px+0.3vw)]"
          onClick={() => {
            navigate("archives");
          }}
        >
          ARCHIVES
        </div>
      </div>
    </div>
  );
};

export default Navbar;
