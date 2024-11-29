import React, { useState } from "react";
import appData from "../../app-details.json";

const BoardDisplay = () => {
  let initialImages = appData.pages.home.boardDisplay;
  const [images, setImages] = useState([
    initialImages.image2,
    initialImages.image2,
    initialImages.image3,
    initialImages.image4,
    initialImages.image5,
    initialImages.image6,
    initialImages.image7,
  ]);

  return (
    <div className="flex relative w-[100vw] h-[100vh]">
      <div
        className="z-[101] absolute w-[100vw] h-[100vh]"
        style={{ backgroundColor: "red" }}
      >
        <img
          className="h-[100vh] w-[100vw]"
          style={{ objectFit: "cover" }}
          src={appData.pages.home.boardDisplay.background}
          alt="board 1"
        />
      </div>

      <div
        className="z-[101] absolute w-[100vw] h-[100vh]"
        style={{ backgroundColor: "red" }}
      >
        <img
          className="h-[100vh] w-[100vw]"
          style={{ objectFit: "cover" }}
          src={appData.pages.home.boardDisplay.background}
          alt="board 1"
        />
      </div>

      <div
        className="z-[102] flex justify-center items-center w-[100vw]"
        style={{
          backgroundImage: `url(${appData.pages.home.covers[0].images[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // backgroundColor: "red"
        }}
      >
        <div
          className="relative max-h-[100vw] aspect-[1/1] h-[calc(96vh-40px)] mt-[20px]"
          style={
            {
              // backgroundColor: "green"
            }
          }
        >
          <div
            className="h-[31%] aspect-[1.06/1] top-[9.2%] left-[16.4%]"
            style={{ position: "absolute" }}
          >
            <img
              className="w-[100%] h-[100%]"
              style={{ objectFit: "cover" }}
              src={images[0]}
              alt="board 1"
            />
          </div>

          <div
            className="h-[29%] aspect-[1/1.31] top-[25.5%] left-[46%]"
            style={{ position: "absolute" }}
          >
            <img
              className="w-[100%] h-[100%]"
              style={{ objectFit: "cover" }}
              src={images[2]}
              alt="board 1"
            />
          </div>

          <div
            className="h-[20%] aspect-[1.05/1] top-[31.5%] left-[10%]"
            style={{ position: "absolute" }}
          >
            <img
              className="w-[100%] h-[100%]"
              style={{ objectFit: "cover" }}
              src={images[1]}
              alt="board 1"
            />
          </div>

          <div
            className="h-[18%] aspect-[1.05/1] top-[18%] left-[70.8%]"
            style={{ position: "absolute", transform: "rotate(-2deg)" }}
          >
            <img
              className="w-[100%] h-[100%]"
              style={{ objectFit: "cover" }}
              src={images[3]}
              alt="board 1"
            />
          </div>

          <div
            className="h-[24%] aspect-[1.1/1] top-[57.5%] left-[12%]"
            style={{ position: "absolute", transform: "rotate(1.4deg)" }}
          >
            <img
              className="w-[100%] h-[100%]"
              style={{ objectFit: "cover" }}
              src={images[4]}
              alt="board 1"
            />
          </div>

          <div
            className="h-[26.5%] aspect-[1/1.3] top-[61%] left-[45%]"
            style={{ position: "absolute" }}
          >
            <img
              className="w-[100%] h-[100%]"
              style={{ objectFit: "cover" }}
              src={images[5]}
              alt="board 1"
            />
          </div>

          <div
            className="h-[21%] aspect-[1.2/1] top-[50.5%] left-[64.5%]"
            style={{ position: "absolute", transform: "rotate(-0.3deg)" }}
          >
            <img
              className="w-[100%] h-[100%]"
              style={{ objectFit: "cover" }}
              src={images[6]}
              alt="board 1"
            />
          </div>

          <div
            className="h-[6%] aspect-[2/1] top-[14.7%] left-[74%]"
            style={{
              position: "absolute",
              transform: "scaleX(-1) rotate(-0.6deg)",
              opacity: 0.8,
            }}
          >
            <img
              className="w-[100%] h-[100%]"
              style={{ objectFit: "cover" }}
              src={appData.pages.home.boardDisplay.tape1}
              alt="board 1"
            />
          </div>

          <div
            className="h-[6.5%] aspect-[2/1] top-[28.6%] left-[14%]"
            style={{
              position: "absolute",
              transform: "rotate(-2deg)",
              opacity: 0.8,
            }}
          >
            <img
              className="w-[100%] h-[100%]"
              style={{ objectFit: "cover" }}
              src={appData.pages.home.boardDisplay.tape1}
              alt="board 1"
            />
          </div>

          <div
            className="h-[5%] aspect-[1/1] top-[49.3%] left-[76.5%]"
            style={{ position: "absolute", transform: "rotate(-0.3deg)" }}
          >
            <img
              className="w-[100%] h-[100%]"
              style={{ objectFit: "cover" }}
              src={appData.pages.home.boardDisplay.pin}
              alt="board 1"
            />
          </div>

          <div className="absolute top-[94%] w-[100%] max-h-[7px] h-[calc(3px+0.5vw)] flex items-center justify-center pl-[10px] pr-[10px]">
            <div className="w-[100%] max-w-[83vw] h-[100%] flex items-center justify-center">
              <div
                className="w-[20%] h-[100%]"
                style={{ backgroundColor: "#8D7623" }}
              ></div>
              <div
                className="w-[20%] h-[100%]"
                style={{ backgroundColor: "#B3B29F" }}
              ></div>
              <div
                className="w-[20%] h-[100%]"
                style={{ backgroundColor: "#E6E0DA" }}
              ></div>
              <div
                className="w-[20%] h-[100%]"
                style={{ backgroundColor: "#C4BCB4" }}
              ></div>
              <div
                className="w-[20%] h-[100%]"
                style={{ backgroundColor: "#2C251E" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDisplay;
