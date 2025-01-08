import React from "react";

interface Section_HProps {
  image1: string;
}

const Section_H: React.FC<Section_HProps> = ({ image1 }) => {
  return (
    <div className="project-slide-up-text w-[calc(100%-90px)] md:w-[calc(100%-12vw)] lg:w-[calc(100%-6vw)] md:ml-[6vw] ml-[45px] h-[calc((100vw-90px)*0.55)] md:h-[calc((100vw-12vw)*0.55)] lg:h-[calc((95vw-220px-12vw)*0.55)]">
      <img
        src={image1}
        alt="project"
        className="w-[100%] h-[100%]"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default Section_H;
