import React, { useState, useEffect } from "react";
import { getMovieList } from "../../../api/api";

const MovieSelector = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovieList();
      setMovieList(data);
    };
    fetchMovies();
  }, []);

  return (
    <div className="rptm-movie-list">
      {movieList.map((movie) => (
        <button
          key={movie.moviecd}
          className={`rptm-movie-btn${
            selectedMovie === movie.movienm ? " rptm-active" : ""
          }`}
          onClick={() => setSelectedMovie(movie.movienm)}
        >
          {movie.movienm}
        </button>
      ))}
    </div>
  );
};

export default MovieSelector;
