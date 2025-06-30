import React, { useEffect } from "react";
import Header from "../../pubcomponent/Header";
import { boxofficeMovies } from "../../Data/MoviesData.js";
import "../../pagecss/reservation/ReservationMoviePage.css";
import "../../componentcss/moviepagecomponentcss/Movies.css";

const ReservationMoviePage = () => {
  useEffect(() => {
    document.body.classList.add("no-header-padding");

    return () => {
      document.body.classList.remove("no-header-padding");
    };
  }, []);

  return (
    <div className="rmp-page">
      <Header />
      <div>
        <div className="rmp-container">
          <h1 className="rmp-title">영화 예매</h1>
          <div style={{ padding: "20px" }}>
            <div className="mvs-grid">
              {boxofficeMovies.map((movie) => (
                <div className="mvs-card" key={movie.id}>
                  <div className="mvs-poster">
                    <img src={movie.poster} alt={movie.title} />
                    <div className="mvs-overlay">
                      <div className="mvs-buttons">
                        <button className="mvs-btn">상세정보</button>
                        <button className="mvs-btn">예매하기</button>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationMoviePage;
