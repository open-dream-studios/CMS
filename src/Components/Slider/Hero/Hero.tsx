import React, { useState, useEffect } from "react";
import "./hero.css";

const Hero = ({images}: {images: string[]}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Image slider logic
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2100);
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
          src={image}
          alt={`Slide ${index + 1}`}
          className={`slider-image ${currentIndex === index ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

export default Hero;