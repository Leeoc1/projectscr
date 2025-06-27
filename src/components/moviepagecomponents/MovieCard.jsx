import React from "react";
import "../../componentcss/moviepagecomponentcss/Movies.css";

const MovieCard = ({ movie, isBoxOffice }) => (
  <div className="mvs-card">
    <div className="mvs-poster">
      <img src={movie.poster} alt={movie.title} />
      <div className="mvs-overlay">
        <div className="mvs-buttons">
          <button className="mvs-btn">상세정보</button>
          {isBoxOffice && <button className="mvs-btn">예매하기</button>}
        </div>
      </div>
    </div>
    <div className="mvs-info">
      <h3 className="mvs-title">
        {isBoxOffice && movie.rank <= 10 && (
          <span className={`rank-number rank-${movie.rank}`}>{movie.rank}</span>
        )}
        {movie.title}
      </h3>
      <p className="mvs-genre">{movie.genre}</p>
      {isBoxOffice ? (
        <>
          <p className="mvs-rating">{movie.rating}</p>
          <p className="mvs-duration">{movie.duration}</p>
        </>
      ) : (
        <p className="mvs-release">개봉 예정일: {movie.releaseDate}</p>
      )}
    </div>
  </div>
);

export default MovieCard;
