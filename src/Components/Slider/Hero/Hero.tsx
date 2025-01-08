import React, { useState, useEffect } from "react";
import "./hero.css";
import { ArchivesEntryImage } from "../../../Pages/Archives/Archives";

type HeroProps = {
  images: ArchivesEntryImage[];
  setCurrentHeroImgUrl: (url: number) => void;
  haltSlider: boolean;
};

const Hero: React.FC<HeroProps> = ({
  images,
  setCurrentHeroImgUrl,
  haltSlider,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!haltSlider) {
      interval = setInterval(() => {
        setCurrentHeroImgUrl((currentIndex + 1) % images.length);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [images, currentIndex, haltSlider, setCurrentHeroImgUrl]);

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
          src={image.url}
          alt={`Slide ${index + 1}`}
          className={`slider-image ${currentIndex === index ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

export default Hero;
