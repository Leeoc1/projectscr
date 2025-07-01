import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { movieAPI } from "../../api/api";
import "../../componentcss/moviepagecomponentcss/Movies.css";

const Movies = () => {
  const [activeTab, setActiveTab] = useState("boxoffice");
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await movieAPI.getMoviesForUser();
        setCurrentMovies(data.currentMovies || []);
        setUpcomingMovies(data.upcomingMovies || []);
      } catch (error) {
        console.error("영화 데이터를 가져오는 중 오류 발생:", error);
        setCurrentMovies([]);
        setUpcomingMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleReservationClick = (movie) => {
    // 영화 정보를 state로 전달하여 ReservationPlacePage로 이동
    navigate("/reservation/place", {
      state: {
        selectedMovie: {
          id: movie.moviecd,
          title: movie.movienm,
          genre: movie.genre,
          rating: movie.isadult === "Y" ? "청소년 관람불가" : "전체 관람가",
          duration: `${movie.runningtime}분`,
          poster: movie.posterUrl ? `http://localhost:3000${movie.posterUrl}` : "/images/movie.jpg"
        },
      },
    });
  };

  const getRatingText = (isAdult) => {
    return isAdult === "Y" ? "청소년 관람불가" : "전체 관람가";
  };

  if (loading) {
    return (
      <div className="mvs-section">
        <div style={{ textAlign: "center", padding: "50px" }}>
          영화 정보를 불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <div className="mvs-section">
      <div className="mvs-tabs">
        <button
          className={`mvs-tab-button ${
            activeTab === "boxoffice" ? "active" : ""
          }`}
          onClick={() => setActiveTab("boxoffice")}
        >
          박스오피스 ({currentMovies.length})
        </button>
        <button
          className={`mvs-tab-button ${
            activeTab === "upcoming" ? "active" : ""
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          상영예정작 ({upcomingMovies.length})
        </button>
      </div>
      <div className="mvs-grid">
        {activeTab === "boxoffice"
          ? currentMovies.map((movie, index) => (
              <div className="mvs-card" key={movie.moviecd}>
                <div className="mvs-poster">
                  <img 
                    src={movie.posterUrl ? `http://localhost:3000${movie.posterUrl}` : "/images/movie.jpg"} 
                    alt={movie.movienm} 
                  />
                  <div className="mvs-overlay">
                    <div className="mvs-buttons">
                      <button className="mvs-btn">상세정보</button>
                      <button
                        className="mvs-btn"
                        onClick={() => handleReservationClick(movie)}
                      >
                        예매하기
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mvs-info">
                  <h3 className="mvs-title">
                    {index < 10 && (
                      <span className={`rank-number rank-${index + 1}`}>
                        {index + 1}
                      </span>
                    )}
                    {movie.movienm}
                  </h3>
                  <p className="mvs-genre">{movie.genre}</p>
                  <p className="mvs-rating">{getRatingText(movie.isadult)}</p>
                  <p className="mvs-duration">{movie.runningtime}분</p>
                </div>
              </div>
            ))
          : upcomingMovies.map((movie) => (
              <div className="mvs-card" key={movie.moviecd}>
                <div className="mvs-poster">
                  <img 
                    src={movie.posterUrl ? `http://localhost:3000${movie.posterUrl}` : "/images/movie.jpg"} 
                    alt={movie.movienm} 
                  />
                  <div className="mvs-overlay">
                    <div className="mvs-buttons">
                      <button className="mvs-btn">상세정보</button>
                    </div>
                  </div>
                </div>
                <div className="mvs-info">
                  <h3 className="mvs-title">{movie.movienm}</h3>
                  <p className="mvs-genre">{movie.genre}</p>
                  <p className="mvs-release">
                    개봉 예정일: {movie.releasedate}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Movies;
