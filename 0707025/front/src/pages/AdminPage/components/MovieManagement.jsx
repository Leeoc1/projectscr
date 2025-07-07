import React, { useState, useEffect } from "react";
import { getMoviesForAdmin } from "../../../api/api";
import "../styles/MovieManagement.css";
import "../styles/AdminPage.css";

const MovieManagement = () => {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [activeTab, setActiveTab] = useState("current");

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMoviesForAdmin();
      setCurrentMovies(data.currentMovies || []);
      setUpcomingMovies(data.upcomingMovies || []);
    };
    fetchMovies();
  }, []);

  const getRatingText = (isAdult) => {
    return isAdult === "Y" ? "청소년 관람불가" : "전체 관람가";
  };

  const displayMovies =
    activeTab === "current" ? currentMovies : upcomingMovies;

  return (
    <div className="adp-content">
      <div className="adp-header">
        <h2>영화 관리</h2>
      </div>
      <div className="mvm-movie-management-tabs">
        <div className="mvm-tab-nav">
          <button
            className={`mvm-tab-btn ${
              activeTab === "current" ? "mvm-active" : ""
            }`}
            onClick={() => setActiveTab("current")}
          >
            현재 상영작 ({currentMovies.length})
          </button>
          <button
            className={`mvm-tab-btn ${
              activeTab === "upcoming" ? "mvm-active" : ""
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            상영 예정작 ({upcomingMovies.length})
          </button>
        </div>
        <div className="mvm-movie-list">
          <span>총 영화 : {displayMovies.length}개</span>
          {displayMovies.map((movie) => (
            <div className="mvm-movie-item" key={movie.moviecd}>
              <img
                src={
                  movie.posterUrl
                    ? `http://localhost:3000${movie.posterUrl}`
                    : "/images/movie.jpg"
                }
                alt={`${movie.movienm} 포스터`}
                style={{ width: "100px", height: "150px", objectFit: "cover" }}
              />
              <div className="mvm-movie-details">
                <h3>{movie.movienm}</h3>
                <p>
                  장르: {movie.genre} | 등급: {getRatingText(movie.isadult)}
                </p>
                <p>
                  상영시간: {movie.runningtime}분 | 개봉일: {movie.releasedate}
                </p>
                <p>감독: {movie.director}</p>
                <p>배우: {movie.actors}</p>
                <p>설명: {movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieManagement;
