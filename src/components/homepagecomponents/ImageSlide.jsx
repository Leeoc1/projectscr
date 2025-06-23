import React, { useEffect, useRef, useState } from "react";
import "../../componentcss/homepagecomponentcss/ImageSlide.css";

const ImageSlide = () => {
  const images = [
    { src: "/images/cloud.jpg", alt: "Cloud" },
    { src: "/images/movie.jpg", alt: "Movie" },
    { src: "/images/tank.jpg", alt: "Tank" },
  ];
  const [moveImages, setMoveImages] = useState(0);
  const scrollContain = useRef(null);

  const scrollImage = (index) => {
    if (scrollContain.current) {
      const imageWidth = scrollContain.current.clientWidth;
      const scrollPosition = index * imageWidth;
      scrollContain.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setMoveImages(index);
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(moveImages - 1, 0);
    scrollImage(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(moveImages + 1, images.length - 1);
    scrollImage(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newIndex = (moveImages + 1) % images.length;
      scrollImage(newIndex);
    }, 3000);
    return () => clearInterval(timer);
  }, [moveImages, images.length]);

  return (
    <div className="mainImageSection">
      <button className="leftArrow" onClick={handlePrev}>
        <img src="/images/leftarrow.png" alt="Previous" className="left" />
      </button>
      <div className="imageContainer" ref={scrollContain}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="mainSlideImage"
          />
        ))}
      </div>
      <button className="rightArrow" onClick={handleNext}>
        <img src="/images/rightarrow.png" alt="Next" />
      </button>
    </div>
  );
};

export default ImageSlide;
