import React from "react";

const SelectedMovie = ({ filteredMovieInfo }) => {
  // selectedMovie가 없으면 기본 화면 표시
  if (!filteredMovieInfo) {
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
          src={filteredMovieInfo.posterurl || "/images/movie.jpg"}
          alt={filteredMovieInfo.posterurl || "영화 포스터"}
          className="selected-movie-poster"
        />
        <div className="selected-movie-info">
          <h2 className="selected-movie-title">
            {filteredMovieInfo.movienm || "제목 없음"}
          </h2>
          <p className="selected-movie-genre">
            {filteredMovieInfo.genre || "장르 정보 없음"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectedMovie; 