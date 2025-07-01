import React, { useState } from "react";
import { boxofficeMovies } from "../../../Data/MoviesData";

const MovieSelector = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="rptm-movie-list">
      {boxofficeMovies.map((movie) => (
        <button
          key={movie.id}
          className={`rptm-movie-btn${
            selectedMovie === movie.title ? " rptm-active" : ""
          }`}
          onClick={() => setSelectedMovie(movie.title)}
        >
          {movie.title}
        </button>
      ))}
    </div>
  );
};

export default MovieSelector;
