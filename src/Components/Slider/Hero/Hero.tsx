import React, { useState, useEffect } from "react";
import "./hero.css";
import appData from "../../../app-details.json"

const Hero = () => {
  const images = [
    "home1.jpeg",
    "home2.jpeg",
    "home3.jpeg",
    "home4.jpeg",
    "home5.jpeg",
    "home6.jpeg",
  ]

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Image slider logic
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);

  }, [images]);

  return (
    <div className="image-slider">
      {images.map((image, index) => (
        <img
          style={{
            objectFit: "cover",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          key={index}
          src={"/assets/" + image}
          alt={`Slide ${index + 1}`}
          className={`slider-image ${currentIndex === index ? "active" : ""}`}
          // priority={currentIndex === index} // Load the current image with priority
        />
      ))}
    </div>
  );
};

export default Hero;