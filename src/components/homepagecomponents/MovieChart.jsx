import { useState, useRef, useEffect } from "react";
import { movieData } from "../../Data/mockData";
import "../../componentcss/homepagecomponentcss/MovieChart.css";

const MovieChart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const cardWidth = 180; // 카드 1장 width(px)
  const gap = 20; // 카드 사이 gap(px)
  const visibleCards = 5;
  const totalCards = movieData.length;
  const maxIndex = Math.ceil(totalCards / visibleCards) - 1;

  // Touch/drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateSlider = () => {
    if (sliderRef.current) {
      // 전체 슬라이더 너비 - 보여지는 영역(980px)
      const totalWidth = totalCards * cardWidth + (totalCards - 1) * gap;
      const maxTranslateX = Math.max(0, totalWidth - 980);
      // 이동할 거리: currentIndex * (카드+gap) * visibleCards
      let translateX = currentIndex * visibleCards * (cardWidth + gap);
      // 최대 이동 거리 초과하지 않게
      if (translateX > maxTranslateX) translateX = maxTranslateX;
      sliderRef.current.style.transform = `translateX(-${translateX}px)`;
    }
  };

  useEffect(() => {
    updateSlider();
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && currentIndex < maxIndex) {
        nextSlide();
      } else if (diffX < 0 && currentIndex > 0) {
        prevSlide();
      }
    }

    setIsDragging(false);
  };

  // Mouse handlers for desktop drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;

    const endX = e.clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && currentIndex < maxIndex) {
        nextSlide();
      } else if (diffX < 0 && currentIndex > 0) {
        prevSlide();
      }
    }

    setIsDragging(false);
  };

  return (
    <section className="mcs-section">
      <div className="mcs-container">
        <div className="mcs-header">
          <h2 className="mcs-title">박스오피스 TOP 10</h2>
          <p className="mcs-subtitle">
            현재 가장 인기 있는 영화들을 만나보세요
          </p>
        </div>

        <div className="mcs-slider-wrapper">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="mcs-slider-nav-arrow mcs-slider-nav-prev"
          >
            ‹
          </button>
          <div className="mcs-slider-container">
            <div
              ref={sliderRef}
              className="mcs-slider"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {movieData.map((movie, index) => (
                <div key={index} className="mcs-movie-card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="mcs-movie-poster"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4=";
                    }}
                  />
                  <div className="mcs-movie-info">
                    <h3 className="mcs-movie-title">{movie.title}</h3>
                    <p className="mcs-movie-genre">{movie.genre}</p>
                    <div className="mcs-movie-meta">
                      <div className="mcs-movie-rating">
                        <span>⭐</span>
                        <span className="mcs-movie-rating-text">
                          {movie.rating}
                        </span>
                      </div>
                      <span className="mcs-movie-rank">{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className="mcs-slider-nav-arrow mcs-slider-nav-next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default MovieChart;
