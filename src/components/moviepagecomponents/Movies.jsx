import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../componentcss/moviepagecomponentcss/Movies.css";
import Header from "../../pubcomponent/Header.jsx";
import { boxofficeMovies, upcomingMovies } from "../../Data/MoviesData.js";

const ReservationMoviePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("boxoffice");

  useEffect(() => {
    document.body.classList.add("no-header-padding");
    return () => {
      document.body.classList.remove("no-header-padding");
    };
  }, []);

  const handleDetailClick = (movie) => {
    console.log("상세정보:", movie);
    // 상세정보 페이지로 이동하는 로직
  };

  const handleReserveClick = (movie) => {
    console.log("예매하기:", movie);
    navigate("/reservation/place", {
      state: {
        selectedMovie: movie,
      },
    });
  };

  const renderBoxofficeMovie = (movie) => (
    <div key={movie.id} className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
        <div className="movie-overlay">
          <div className="movie-buttons">
            <button
              className="movie-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDetailClick(movie);
              }}
            >
              상세정보
            </button>
            <button
              className="movie-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleReserveClick(movie);
              }}
            >
              예매하기
            </button>
          </div>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">
          {movie.rank <= 10 && (
            <span className={`rank-number rank-${movie.rank}`}>
              {movie.rank}
            </span>
          )}
          {movie.title}
        </h3>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-rating">{movie.rating}</p>
        <p className="movie-duration">{movie.duration}</p>
      </div>
    </div>
  );

  const renderUpcomingMovie = (movie) => (
    <div key={movie.id} className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
        <div className="movie-overlay">
          <div className="movie-buttons">
            <button
              className="movie-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDetailClick(movie);
              }}
            >
              상세정보
            </button>
          </div>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-release-date">개봉 예정일: {movie.releaseDate}</p>
      </div>
    </div>
  );

  return (
    <div className="reservation-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="reservation-content">
        <div className="reservation-container">
          <h1 className="page-title">전체 영화</h1>

          <div className="movie-tabs">
            <button
              className={`movie-tab ${
                activeTab === "boxoffice" ? "active" : ""
              }`}
              onClick={() => setActiveTab("boxoffice")}
            >
              박스오피스
            </button>
            <button
              className={`movie-tab ${
                activeTab === "upcoming" ? "active" : ""
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              상영예정작
            </button>
          </div>

          <div className="movies-grid">
            {activeTab === "boxoffice"
              ? boxofficeMovies.map(renderBoxofficeMovie)
              : upcomingMovies.map(renderUpcomingMovie)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationMoviePage;
