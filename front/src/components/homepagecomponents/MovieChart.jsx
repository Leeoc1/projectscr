import { useState, useRef, useEffect } from "react";
import { getCurrentMovies } from "../../api/api";
import "../../componentcss/homepagecomponentcss/MovieChart.css";

const MovieChart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const sliderRef = useRef(null);
  const cardWidth = 180; // 카드 1장 width(px)
  const gap = 20; // 카드 사이 gap(px)
  const visibleCards = 5;
  const totalCards = filteredMovies.length;
  const maxIndex = Math.ceil(totalCards / visibleCards) - 1;

  // Mouse drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 영화 데이터 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getCurrentMovies();
        setFilteredMovies(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setFilteredMovies([]);
      }
    };
    fetchMovies();
  }, []);

  const updateSlider = () => {
    if (sliderRef.current) {
      const totalWidth = totalCards * cardWidth + (totalCards - 1) * gap;
      const maxTranslateX = Math.max(0, totalWidth - 980);
      let translateX = currentIndex * visibleCards * (cardWidth + gap);
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
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {filteredMovies.map((movie) => (
                <div key={movie.moviecd} className="mcs-movie-card">
                  <img
                    src={movie.posterurl}
                    alt={movie.movienm}
                    className="mcs-movie-poster"
                  />
                  <div className="mcs-movie-info">
                    <h3 className="mcs-movie-title">{movie.movienm}</h3>
                    <p className="mcs-movie-genre">{movie.genre}</p>
                    <div className="mcs-movie-meta">
                      <div className="mcs-movie-rating">
                        <span>⭐</span>
                        <span className="mcs-movie-rating-text">
                          {movie.rating || "평점 없음"}
                        </span>
                      </div>
                      <span className="mcs-movie-rank">{movie.rank || "순위 없음"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
