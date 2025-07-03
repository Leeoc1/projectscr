import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import { useReservation } from "../../hooks/useReservation";
import { useDateNavigation } from "../../hooks/useDateNavigation";
import { isSameDay, getDateLabel } from "../../utils/DateUtils";
import SelectedMovie from "../../components/reservation/placepagecomponents/SelectedMovie";
import ProgressBar from "../../components/reservation/placepagecomponents/ProgressBar";
import TheaterSelector from "../../components/reservation/placepagecomponents/TheaterSelector";
import "../../pagecss/reservation/ReservationPlacePage.css";

const ReservationPlacePage = () => {
  const navigate = useNavigate();
  
  // 커스텀 훅 사용
  const {
    reservationState,
    filteredData,
    isLoading,
    error,
    isReadyToSeat,
    handleDateSelect,
    handleRegionSelect,
    handleBranchSelect,
    handleTimeSelect,
    clearError,
  } = useReservation();

  const {
    selectedDate,
    dateArr,
    headerText,
    canGoPrev,
    goToPrevious,
    goToNext,
    handleDateSelect: handleDateNavigation,
  } = useDateNavigation(reservationState.selectedDate);

  // 페이지 로드 시 초기 날짜 콘솔 출력
  useEffect(() => {
    console.log("🎬 예매 페이지 접속 - 선택된 날짜:", selectedDate.toLocaleDateString());
  }, []);

  // 날짜가 변경될 때마다 콘솔 출력
  useEffect(() => {
    console.log("📅 날짜 선택됨:", selectedDate.toLocaleDateString());
  }, [selectedDate]);

  // 영화가 선택되지 않은 경우 영화 선택 페이지로 리다이렉트
  if (!reservationState.selectedMovie) {
    navigate("/reservation/movie");
    return null;
  }

  // 날짜 선택 시 예매 상태도 함께 업데이트
  const handleDateSelection = (dateItem) => {
    handleDateNavigation(dateItem);
    if (!dateItem.isDisabled) {
      const newDate = new Date(
        dateItem.date.getFullYear(),
        dateItem.date.getMonth(),
        dateItem.date.getDate()
      );
      handleDateSelect(newDate);
    }
  };

  // 좌석 선택 페이지로 이동
  const handleGoToSeat = () => {
    navigate("/reservation/seat", {
      state: {
        selectedDate: reservationState.selectedDate,
        selectedRegion: reservationState.selectedRegion,
        selectedBranch: reservationState.selectedBranch,
        selectedTime: reservationState.selectedTime,
      },
    });
  };

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="reservation-page">
        <Header isOtherPage={true} isScrolled={true} />
        <div className="reservation-content">
          <div className="loading-container">
            <div className="loading-spinner">로딩 중...</div>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태 표시
  if (error) {
    return (
      <div className="reservation-page">
        <Header isOtherPage={true} isScrolled={true} />
        <div className="reservation-content">
          <div className="error-container">
            <div className="error-message">{error}</div>
            <button onClick={clearError} className="retry-button">
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="reservation-content">
        {/* 선택한 영화 섹션 */}
        <SelectedMovie selectedMovie={reservationState.selectedMovie} />

        <div className="reservation-container">
          {/* 진행바 */}
          <ProgressBar currentStep={0} />

          {/* 날짜/요일 선택 */}
          <div className="date-selector-section">
            {/* 상단 날짜 헤더 */}
            <div className="date-header">{headerText}</div>
            {/* 하단 날짜 선택 */}
            <div className="date-selector">
              <div className="date-list">
                <button
                  className="arrow"
                  onClick={goToPrevious}
                  disabled={!canGoPrev}
                >
                  {"<"}
                </button>
                <div className="dates">
                  {dateArr.map((item, idx) => (
                    <div
                      key={idx}
                      className={
                        "date-item" +
                        (isSameDay(item.date, selectedDate)
                          ? " selected"
                          : "") +
                        (item.isSaturday ? " saturday" : "") +
                        (item.isSunday ? " sunday" : "") +
                        (item.isDisabled ? " disabled" : "")
                      }
                      onClick={() => handleDateSelection(item)}
                    >
                      <div className="date-num">{item.date.getDate()}</div>
                      <div className="date-label">
                        {getDateLabel(item.date)}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="arrow" onClick={goToNext}>
                  {">"}
                </button>
              </div>
            </div>
          </div>

          {/* 극장선택과 상영시간 선택 */}
          <TheaterSelector
            regions={filteredData.regions}
            branches={filteredData.branches}
            screenTimes={filteredData.screenTimes}
            selectedRegion={reservationState.selectedRegion}
            selectedBranch={reservationState.selectedBranch}
            selectedTime={reservationState.selectedTime}
            onRegionSelect={handleRegionSelect}
            onBranchSelect={handleBranchSelect}
            onTimeSelect={handleTimeSelect}
          />
        </div>
      </div>
      
      {/* 우측 하단 고정 좌석 선택 버튼 */}
      {isReadyToSeat && (
        <button className="reservation-seat-btn-fixed" onClick={handleGoToSeat}>
          좌석 선택
        </button>
      )}
    </div>
  );
};

export default ReservationPlacePage;
