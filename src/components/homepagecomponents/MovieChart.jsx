import React, { useState, useRef } from "react";
import "../../componentcss/homepagecomponentcss/MovieChart.css";

const MovieChart = () => {
  const movieImages = [
    {
      src: "/images/28Years.png",
      alt: "28Years",
      title: "28년 후",
      num: 5,
      reserper: "3.3%",
    },
    {
      src: "/images/Dragon.png",
      alt: "dragon",
      title: "드래곤 길들이기",
      num: 4,
      reserper: "3.3%",
    },
    {
      src: "/images/Elio.png",
      alt: "elio",
      title: "엘리오",
      num: 6,
      reserper: "3.3%",
    },
    {
      src: "/images/F1_TheMovie.png",
      alt: "f1",
      title: "F1 더무비",
      num: 1,
      reserper: "3.3%",
    },
    {
      src: "/images/Fureru.png",
      alt: "fureru",
      title: "후레루",
      num: 8,
      reserper: "3.3%",
    },
    {
      src: "/images/Hifive.png",
      alt: "hifive",
      title: "하이파이브",
      num: 9,
      reserper: "3.3%",
    },
    {
      src: "/images/Nausicaa.png",
      alt: "nausicaa",
      title: "바람계곡의 나우시카",
      num: 3,
      reserper: "3.3%",
    },
    {
      src: "/images/Seventeen.png",
      alt: "seventeen",
      title: "세븐틴 월드 투어",
      num: 7,
      reserper: "3.3%",
    },
    {
      src: "/images/Tiger.png",
      alt: "tiger",
      title: "바다호랑이",
      num: 10,
      reserper: "3.3%",
    },
    {
      src: "/images/Noise.png",
      alt: "noise",
      title: "노이즈",
      num: 2,
      reserper: "3.3%",
    },
  ].sort((a, b) => a.num - b.num); // num 기준 오름차순 정렬

  const [startIndex, setStartIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const trackRef = useRef(null);
  const imagesPerPage = 5; // 한 페이지에 표시할 이미지 수
  const slide = 2; // 버튼 클릭 시 슬라이드 이동 단위
  const imageWidth = 196 + 7; // 각 이미지의 이동 단위 (196px)

  const handleNext = () => {
    if (startIndex + slide < movieImages.length - imagesPerPage + 1) {
      setStartIndex(startIndex + slide);
      setDragOffset(0);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - slide);
      setDragOffset(0);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    trackRef.current.style.transition = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    trackRef.current.style.transition = "transform 0.3s ease-in-out";

    const slideCount = Math.round(dragOffset / imageWidth);
    let newIndex = startIndex - slideCount;

    if (newIndex < 0) newIndex = 0;
    if (newIndex > movieImages.length - imagesPerPage)
      newIndex = movieImages.length - imagesPerPage;

    setStartIndex(newIndex);
    setDragOffset(0);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    trackRef.current.style.transition = "none";
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  return (
    <div className="MovieChartSection">
      <h2 className="MovieChartTitle">무비차트</h2>
      <div className="mainMovieImageSection">
        <button
          className="mainArrowBtn moveleft"
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          <img
            src="/images/leftarrow.png"
            alt="왼쪽 화살표"
            className="movearrow"
          />
        </button>
        <div
          className="chartImageContainer"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="chartImageTrack"
            ref={trackRef}
            style={{
              transform: `translateX(${
                -startIndex * imageWidth + dragOffset
              }px)`,
            }}
          >
            {movieImages.map((image, index) => (
              <div key={index} className="mainChartInfo">
                <div className="imageWrapper">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="mainMovieImage"
                  />
                  <div className="overlay"></div>
                  <div className="movieDetailBtns">
                    <button className="movieInfoBtn">상세정보</button>
                    <button className="movieReservationBtn">예매하기</button>
                  </div>
                </div>
                <p style={{ fontSize: "18px" }}>{image.title}</p>
                <p style={{ fontSize: "14px" }}>{image.reserper}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          className="mainArrowBtn moveright"
          onClick={handleNext}
          disabled={
            startIndex + slide >= movieImages.length - imagesPerPage + 1
          }
        >
          <img
            src="/images/rightarrow.png"
            alt="오른쪽 화살표"
            className="movearrow"
          />
        </button>
      </div>
    </div>
  );
};

export default MovieChart;
