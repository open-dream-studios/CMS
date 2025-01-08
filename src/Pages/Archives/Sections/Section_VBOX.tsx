import React from "react";

interface Section_VBOXProps {
  image1: string;
}

const Section_VBOX: React.FC<Section_VBOXProps> = ({ image1 }) => {
  return (
    <div className="project-slide-up-text w-[calc(100%-90px)] md:w-[calc(100%-12vw)] lg:w-[calc(100%-6vw)] md:ml-[6vw] ml-[45px] h-[calc((100vw-90px)*0.55)] md:h-[calc((100vw-12vw)*0.55)] lg:h-[calc((95vw-220px-12vw)*0.55)]">
      <div
        style={{
          
          height: "100%",
          aspectRatio: "1/1"
        }}
      >
        <img
          src={image1}
          alt="project"
          style={{
            width: "100%", 
            height: "100%",
            objectFit: "cover",
          }}
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default Section_VBOX;
