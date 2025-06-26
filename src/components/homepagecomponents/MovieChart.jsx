import { useState, useRef, useEffect } from "react";
import { movieData } from "../../Data/mockData";
import "../../componentcss/homepagecomponentcss/MovieChart.css";

export default function MovieChart() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const cardWidth = 284; // 256px width + 28px gap
  const visibleCards = 5;
  const maxIndex = movieData.length - visibleCards;

  // Touch/drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateSlider = () => {
    if (sliderRef.current) {
      const translateX = -(currentIndex * cardWidth);
      sliderRef.current.style.transform = `translateX(${translateX}px)`;
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
    <section className="mct-boxoffice-section">
      <div className="mct-boxoffice-container">
        <div className="mct-boxoffice-header">
          <h2 className="mct-boxoffice-title">박스오피스 TOP 10</h2>
          <p className="mct-boxoffice-subtitle">
            현재 가장 인기 있는 영화들을 만나보세요
          </p>
        </div>

        <div className="mct-boxoffice-slider-wrapper">
          {/* Movie Slider Container */}
          <div className="mct-boxoffice-slider-container">
            <div
              ref={sliderRef}
              className="mct-boxoffice-slider"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {movieData.map((movie, index) => (
                <div key={index} className="mct-movie-card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="mct-movie-poster"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4=";
                    }}
                  />
                  <div className="mct-movie-info">
                    <h3 className="mct-movie-title">{movie.title}</h3>
                    <p className="mct-movie-genre">{movie.genre}</p>
                    <div className="mct-movie-meta">
                      <div className="mct-movie-rating">
                        <span>⭐</span>
                        <span className="mct-movie-rating-text">
                          {movie.rating}
                        </span>
                      </div>
                      <span className="mct-movie-rank">{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="mct-slider-nav-arrow mct-slider-nav-prev"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className="mct-slider-nav-arrow mct-slider-nav-next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}