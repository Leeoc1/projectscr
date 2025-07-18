import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentMovies } from "../../../api/movieApi";
import LoginRequiredModal from "../../LoginPage/components2/LoginRequiredModal";
import "../styles/MovieChart.css";

const MovieChart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const sliderRef = useRef(null);
  const cardWidth = 180; // 카드 1장 width(px)
  const gap = 20; // 카드 사이 gap(px)
  const visibleCards = 5;

  // API에서 영화 데이터 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      const currentMovies = await getCurrentMovies();
      // 상위 10개 영화만 필터링 (rank 정보가 없으므로 처음 10개)
      const top10Movies = currentMovies.slice(0, 10).map((movie, index) => ({
        ...movie,
        rank: index + 1,
      }));
      setMovies(top10Movies);
    };

    fetchMovies();
  }, []);

  const totalCards = movies.length;
  const maxIndex = Math.ceil(totalCards / visibleCards) - 1;

  // Mouse drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const navigate = useNavigate();

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

  const handleMovieCardClick = (movie) => {
    // 로그인 상태 체크
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      // 로그인되지 않은 경우 모달 표시
      setShowLoginModal(true);
      return;
    }

    // 로그인된 경우 기존 로직 실행
    // 예매 페이지와 동일한 방식으로 영화 정보를 세션 스토리지에 저장
    sessionStorage.setItem("moviecd", movie.moviecd);
    sessionStorage.setItem("movienm", movie.movienm);

    // 예매 페이지와 동일한 방식으로 전체 영화 객체도 저장
    const movieData = {
      moviecd: movie.moviecd,
      movienm: movie.movienm,
      posterurl: movie.posterurl,
      genre: movie.genre,
      runningtime: movie.runningtime,
      isadult: movie.isadult,
    };
    sessionStorage.setItem("selectedMovie", JSON.stringify(movieData));

    navigate("/reservation/place");
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
              {movies.map((movie) => (
                <div
                  key={movie.moviecd}
                  className="mcs-movie-card"
                  onClick={() => handleMovieCardClick(movie)}
                >
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
                          {movie.isadult === "Y"
                            ? "청소년 관람불가"
                            : "전체 관람가"}
                        </span>
                      </div>
                      <span className="mcs-movie-rank">{movie.rank}</span>
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
      
      {/* 로그인 필요 모달 */}
      <LoginRequiredModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </section>
  );
};

export default MovieChart;
