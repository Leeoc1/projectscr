import React, { useState } from "react";
import { boxofficeMovies, upcomingMovies } from "../../Data/MoviesData.js";
import MovieCard from "./MovieCard";
import "../../componentcss/moviepagecomponentcss/Movies.css";

const Movies = () => {
  const [activeTab, setActiveTab] = useState("boxoffice");

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
