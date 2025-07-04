import React from "react";
import "../../componentcss/moviepagecomponentcss/Movies.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, isBoxOffice }) => {
  const navigate = useNavigate();
  const getRating = (isadult) => {
    if (isadult === "N") return "rating-all";
    if (isadult === "Y") return "rating-19";
    return "";
  };

  const goSelectPlace = () => {
    // 영화 정보를 세션 스토리지에 저장
    try {
      sessionStorage.setItem("selectedMovie", JSON.stringify(movie));
      console.log("🎬 예매하기 버튼 클릭 - 영화:", movie.movienm);
    } catch (error) {
      console.error("영화 정보 저장 중 오류:", error);
    }
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
