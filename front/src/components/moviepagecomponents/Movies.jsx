import React, { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { boxofficeMovies, upcomingMovies } from "../../Data/MoviesData.js";
=======
import { boxofficeMovies, upcomingMovies } from "../../Data/MoviesData.js";
import MovieCard from "./MovieCard";
>>>>>>> ee44428e6f70464f49fbb3cad2d41128779cd105
import "../../componentcss/moviepagecomponentcss/Movies.css";

const Movies = () => {
  const [activeTab, setActiveTab] = useState("boxoffice");
<<<<<<< HEAD
  const navigate = useNavigate();

  const handleReservationClick = (movie) => {
    // 영화 정보를 state로 전달하여 ReservationPlacePage로 이동
    navigate("/reservation/place", {
      state: {
        selectedMovie: movie,
      },
    });
  };
=======
>>>>>>> ee44428e6f70464f49fbb3cad2d41128779cd105

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
<<<<<<< HEAD
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
=======
              <MovieCard key={movie.id} movie={movie} isBoxOffice={true} />
            ))
          : upcomingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} isBoxOffice={false} />
>>>>>>> ee44428e6f70464f49fbb3cad2d41128779cd105
            ))}
      </div>
    </div>
  );
};

export default Movies;
