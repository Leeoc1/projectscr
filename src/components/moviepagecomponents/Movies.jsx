import React, { useState } from "react";
import { boxofficeMovies, upcomingMovies } from "../../Data/MoviesData.js";
import MovieCard from "./MovieCard";
import "../../componentcss/moviepagecomponentcss/Movies.css";
import Header from "../../pubcomponent/Header.jsx";
import { boxofficeMovies, upcomingMovies } from "../../Data/MoviesData.js";

const Movies = () => {
  const [activeTab, setActiveTab] = useState("boxoffice");

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
              <MovieCard key={movie.id} movie={movie} isBoxOffice={true} />
            ))
          : upcomingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} isBoxOffice={false} />
            ))}
      </div>
    </div>
  );
};

export default Movies;
