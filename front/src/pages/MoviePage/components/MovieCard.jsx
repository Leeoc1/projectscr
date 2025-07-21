import React from "react";
import "../styles/Movies.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, isBoxOffice }) => {
  const navigate = useNavigate();
  const getRating = (isadult) => {
    if (isadult === "N") return "rating-all";
    if (isadult === "Y") return "rating-19";
    return "";
  };

  const goSelectPlace = () => {
    // 홈페이지와 동일한 방식으로 영화 정보를 세션 스토리지에 저장
    sessionStorage.setItem("moviecd", movie.moviecd);
    sessionStorage.setItem("movienm", movie.movienm);

    // 예매 페이지와 동일한 방식으로 전체 영화 객체도 저장
    const movieData = {
      moviecd: movie.moviecd,
      movienm: movie.movienm,
      posterurl: movie.posterurl,
      genre: movie.genre,
      runningtime: movie.runningtime,
      isadult: movie.isadult,
    };
    sessionStorage.setItem("selectedMovie", JSON.stringify(movieData));

    console.log(
      "🎬 영화 페이지 예매하기 버튼 클릭 - 영화:",
      movie.movienm,
      "moviecd:",
      movie.moviecd
    );
    navigate("/reservation/place");
  };

  return (
    <div className="mvs-card">
      <div className="mvs-poster">
        <img src={movie.posterurl} alt={movie.movienm} />
        <div className="mvs-overlay">
          <div className="mvs-buttons">
            <button className="mvs-btn">상세정보</button>
            {isBoxOffice && (
              <button className="mvs-btn" onClick={goSelectPlace}>
                예매하기
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mvs-info">
        <h3 className="mvs-title">
          {isBoxOffice && movie.rank <= 10 && (
            <span className={`rank-number rank-${movie.rank}`}>
              {movie.rank}
            </span>
          )}
          {movie.movienm}
        </h3>
        <p className="mvs-genre">{movie.genre}</p>
        {isBoxOffice ? (
          <>
            <p className={`mvs-rating ${getRating(movie.isadult)}`}>
              {movie.isadult === "Y" ? "청소년 관람불가" : "전체 관람가"}
            </p>
            <p className="mvs-duration">{movie.runningtime}분</p>
          </>
        ) : (
          <p className="mvs-release">개봉 예정일: {movie.releaseDate}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
