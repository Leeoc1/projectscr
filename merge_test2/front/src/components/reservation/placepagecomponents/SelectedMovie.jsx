import React from "react";

const SelectedMovie = ({ movieInfo }) => {
  // selectedMovie가 없으면 기본 화면 표시
  if (!movieInfo) {
    return (
      <div className="selected-movie-section">
        <h1 className="selected-movie-section-title">선택한 영화</h1>
        <div className="selected-movie-content">
          <div className="no-movie-selected">
            <p>영화를 선택해주세요</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="selected-movie-section">
      <h1 className="selected-movie-section-title">선택한 영화</h1>
      <div className="selected-movie-content">
        <img
          src={movieInfo.posterurl || "/images/movie.jpg"}
          alt={movieInfo.posterurl || "영화 포스터"}
          className="selected-movie-poster"
        />
        <div className="selected-movie-info">
          <h2 className="selected-movie-title">{movieInfo.movienm || "제목 없음"}</h2>
          <p className="selected-movie-genre">{movieInfo.genre || "장르 정보 없음"}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectedMovie; 