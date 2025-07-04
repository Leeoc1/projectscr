import React, { useEffect, useState } from "react";
import Header from "../../pubcomponent/Header";
import { getCurrentMovies } from "../../api/api";
import "../../pagecss/reservation/ReservationPlacePage.css";
import DateSelectorMovie from "../../components/reservation/placepagecomponents/DateSelectorMovie";
import TheaterSelector from "../../components/reservation/placepagecomponents/TheaterSelector";

const ReservationPlacePage = () => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const storedMovieCd = sessionStorage.getItem("moviecd");
    if (storedMovieCd) {
      fetchMovieDetails(storedMovieCd);
    }
  }, []);

  const fetchMovieDetails = async (moviecd) => {
    const allMovies = await getCurrentMovies();
    const movieData = allMovies.find(movie => movie.moviecd === moviecd);
    setMovieDetails(movieData);
    
    // 영화명도 세션에 저장
    if (movieData) {
      sessionStorage.setItem("movienm", movieData.movienm);
    }
  };

  return (
    <div className="reservation-page">
      <Header isOtherPage={true} isScrolled={true} />
              
        {/* 진행 바 */}
        <div className="reservation-progress-bar">
          <div className="progress-steps">
            <div className="progress-step completed">
              <div className="step-number">1</div>
              <div className="step-title">영화 선택</div>
            </div>
            <div className="progress-step active">
              <div className="step-number">2</div>
              <div className="step-title">극장/날짜/시간</div>
            </div>
            <div className="progress-step">
              <div className="step-number">3</div>
              <div className="step-title">좌석 선택</div>
            </div>
            <div className="progress-step">
              <div className="step-number">4</div>
              <div className="step-title">결제</div>
            </div>
          </div>
        </div>
      <div className="reservation-content">
        {movieDetails && (
          <div className="selected-movie-section">
            <h2 className="selected-movie-section-title">선택한 영화</h2>
            <div className="selected-movie-content">
              {movieDetails.posterurl &&
                <img 
                  src={movieDetails.posterurl} 
                  alt={movieDetails.movienm} 
                  className="selected-movie-poster"
                />
              }
              <div className="selected-movie-info">
                <h3 className="selected-movie-title">{movieDetails.movienm}</h3>
                <p className="selected-movie-genre">상영시간: {movieDetails.runningtime}분</p>
                <p className="selected-movie-genre">관람등급: {movieDetails.isadult === "Y" ? "청소년 관람불가" : "전체 관람가"}</p>
              </div>
            </div>
          </div>
        )}

      </div>
      <DateSelectorMovie />
      <TheaterSelector />
    </div>
  );
};

export default ReservationPlacePage;
