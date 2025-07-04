import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { boxofficeMovies, upcomingMovies } from "../../Data/MoviesData.js";
import "../../componentcss/moviepagecomponentcss/Movies.css";

const Movies = () => {
  const [activeTab, setActiveTab] = useState("boxoffice");
  const navigate = useNavigate();

  const handleReservationClick = (movie) => {
    // 영화 정보를 세션 스토리지에 저장
    try {
      sessionStorage.setItem("selectedMovie", JSON.stringify(movie));
      console.log("🎬 예매하기 버튼 클릭 - 영화:", movie.title);
    } catch (error) {
      console.error("영화 정보 저장 중 오류:", error);
    }
    // 영화 정보를 state로 전달하여 ReservationPlacePage로 이동
    navigate("/reservation/place");
  };

  return (
    <div className="mvs-section">
      <div className="mvs-tabs">
        <button
          className={`mvs-tab-button ${
            activeTab === "boxoffice" ? "active" : ""
          }`}
          onClick={() => setActiveTab("boxoffice")}
        >
          박스오피스
        </button>
        <button
          className={`mvs-tab-button ${
            activeTab === "upcoming" ? "active" : ""
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          상영예정작
        </button>
      </div>
      <div className="mvs-grid">
        {activeTab === "boxoffice"
          ? boxofficeMovies.map((movie) => (
              <div className="mvs-card" key={movie.id}>
                <div className="mvs-poster">
                  <img src={movie.poster} alt={movie.title} />
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
                    {movie.rank <= 10 && (
                      <span className={`rank-number rank-${movie.rank}`}>
                        {movie.rank}
                      </span>
                    )}
                    {movie.title}
                  </h3>
                  <p className="mvs-genre">{movie.genre}</p>
                  <p className="mvs-rating">{movie.rating}</p>
                  <p className="mvs-duration">{movie.duration}</p>
                </div>
              </div>
            ))
          : upcomingMovies.map((movie) => (
              <div className="mvs-card" key={movie.id}>
                <div className="mvs-poster">
                  <img src={movie.poster} alt={movie.title} />
                  <div className="mvs-overlay">
                    <div className="mvs-buttons">
                      <button className="mvs-btn">상세정보</button>
                    </div>
                  </div>
                </div>
                <div className="mvs-info">
                  <h3 className="mvs-title">{movie.title}</h3>
                  <p className="mvs-genre">{movie.genre}</p>
                  <p className="mvs-release">
                    개봉 예정일: {movie.releaseDate}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Movies;
