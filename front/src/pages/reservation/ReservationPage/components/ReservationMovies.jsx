import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentMovies } from "../../../../api/movieApi";
import "../style/ReservationMovie.css";

const ReservationMovies = () => {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(16); // 4줄(16개)만 보여줌
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const currentData = await getCurrentMovies();
        const sortedCurrent = currentData
          .slice()
          .sort((a, b) => new Date(b.releasedate) - new Date(a.releasedate));
        setCurrentMovies(sortedCurrent);
      } catch (error) {}
    };
    fetchMovies();
  }, []);

  const handleReservationClick = (movie) => {
    sessionStorage.setItem("moviecd", movie.moviecd);
    sessionStorage.setItem("movienm", movie.movienm);
    sessionStorage.setItem(
      "selectedMovie",
      JSON.stringify({
        moviecd: movie.moviecd,
        movienm: movie.movienm,
        posterurl: movie.posterurl,
        genre: movie.genre,
        runningtime: movie.runningtime,
        isadult: movie.isadult,
      })
    );
    navigate("/reservation/place");
  };

  const handleShowMore = () => {
    setVisibleCount(currentMovies.length);
  };

  return (
    <div className="rmp-section">
      <div className="rmp-grid">
        {currentMovies.slice(0, visibleCount).map((movie) => (
          <div
            className="rmp-card"
            key={movie.moviecd}
            onClick={() => handleReservationClick(movie)}
          >
            <div className="rmp-poster">
              <img src={movie.posterurl} alt={movie.movienm} />
            </div>
            <div className="rmp-info">
              <h3 className="rmp-title">{movie.movienm}</h3>
              <p className="rmp-genre">{movie.genre}</p>
              <p
                className={`rmp-rating ${
                  movie.isadult === "Y" ? "rmp-rating-19" : "rmp-rating-all"
                }`}
              >
                {movie.isadult === "Y" ? "청소년 관람불가" : "전체 관람가"}
              </p>
              <p className="rmp-duration">{movie.runningtime}분</p>
            </div>
          </div>
        ))}
      </div>
      {currentMovies.length > visibleCount && (
        <div style={{ textAlign: "center", margin: "2rem 0" }}>
          <button className="rmp-showmore-btn" onClick={handleShowMore}>
            더보기
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationMovies;
