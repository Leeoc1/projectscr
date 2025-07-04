import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import "../../pagecss/reservation/ReservationPlaceToMovie.css";
import DateSelector from "../../components/reservation/reservationptmcomponents/DateSelector";
import MovieSelector from "../../components/reservation/reservationptmcomponents/MovieSelector";
import ScreenSelector from "../../components/reservation/reservationptmcomponents/ScreenSelector";

const ReservationPlaceToMoviePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 임의 데이터
  const selectedRegion = location.state?.selectedRegion || "서울";
  const selectedBranch = location.state?.selectedBranch || "가양";

  // 영화 시간 초기화
  useEffect(() => {
    sessionStorage.removeItem("selectedMovieTime");
  }, []);

  // 날짜 상태
  const today = new Date();
  const [selectedDateObj] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  // 선택 상태를 실시간으로 추적
  const [isReadyToSeat, setIsReadyToSeat] = useState(false);

  // 선택 상태 확인 함수
  const checkSelectionStatus = () => {
    const selectedDate = sessionStorage.getItem("selectedFullDate");
    const selectedMovie = sessionStorage.getItem("selectedMovieName");
    const selectedTime = sessionStorage.getItem("selectedMovieTime");

    const isReady = selectedDate && selectedMovie && selectedTime;
    setIsReadyToSeat(isReady);
  };

  // 세션 스토리지 변경 감지
  useEffect(() => {
    const handleSessionStorageChange = () => {
      checkSelectionStatus();
    };

    // 커스텀 이벤트 리스너
    window.addEventListener("sessionStorageChange", handleSessionStorageChange);
  }, []);

  // 좌석 선택 버튼 클릭 시 이동
  const handleGoToSeat = () => {
    navigate("/reservation/seat", {
      state: {
        selectedDate: selectedDateObj,
        selectedRegion: selectedRegion,
        selectedBranch: selectedBranch,
        selectedMovie: location.state?.selectedMovie || null,
      },
    });
  };

  // 페이지 언마운ㅌ
  useEffect(() => {
    return () => {
      const cinemacd = sessionStorage.getItem("cinemacd");
      const cinemanm = sessionStorage.getItem("cinemanm");
      const selectedMovieTime = sessionStorage.getItem("selectedMovieTime");

      sessionStorage.clear();

      if (cinemacd) sessionStorage.setItem("cinemacd", cinemacd);
      if (cinemanm) sessionStorage.setItem("cinemanm", cinemanm);
      if (selectedMovieTime)
        sessionStorage.setItem("selectedMovieTime", selectedMovieTime);
    };
  }, []);

  return (
    <div className="rptm-reservation-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="rptm-reservation-content">
        <div className="rptm-reservation-container">
          {/* 진행바 */}
          <div className="rptm-progress-bar">
            <div className="rptm-progress-steps">
              {["날짜/극장", "인원/좌석", "결제"].map((step, idx) => (
                <div
                  key={step}
                  className={`rptm-progress-step${
                    idx === 0 ? " rptm-active" : ""
                  }`}
                >
                  <span className="rptm-step-number">{idx + 1}</span>
                  <span className="rptm-step-title">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 현재 선택한 극장 이름 */}
          <div>
            <h1>{sessionStorage.getItem("cinemanm")}</h1>
          </div>

          {/* 날짜 선택 */}
          <DateSelector />

          {/* 영화 및 상영관 선택 */}
          <div className="rptm-movie-section">
            <div className="rptm-movie-title rptm-section-title">영화선택</div>
            <div className="rptm-time-title rptm-section-title">상영시간</div>
            <div className="rptm-movie-selector">
              <MovieSelector />
              <ScreenSelector />
            </div>
          </div>
        </div>
      </div>

      {/* 좌석 선택 버튼 */}
      {isReadyToSeat && (
        <button
          className="rptm-reservation-seat-btn-fixed"
          onClick={handleGoToSeat}
        >
          좌석 선택
        </button>
      )}
    </div>
  );
};

export default ReservationPlaceToMoviePage;
