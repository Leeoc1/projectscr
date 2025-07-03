import React, { useState } from "react";
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

  // 날짜 상태
  const today = new Date();
  const [selectedDateObj] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  // 선택 완료 여부 체크
  const isReadyToSeat = selectedDateObj && selectedRegion && selectedBranch;

  // 좌석 선택 버튼 클릭 시 이동
  const handleGoToSeat = () => {
    navigate("/reservation/seat", {
      state: {
        selectedDate: selectedDateObj,
        selectedRegion,
        selectedBranch,
        selectedMovie: location.state?.selectedMovie || null,
      },
    });
  };

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
