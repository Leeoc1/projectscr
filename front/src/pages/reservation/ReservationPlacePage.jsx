import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import { useReservation } from "../../hooks/useReservation";
import { useDateNavigation } from "../../hooks/useDateNavigation";
import { isSameDay, getDateLabel } from "../../utils/DateUtils";
import { getSchedules } from "../../api/api";
import SelectedMovie from "../../components/reservation/placepagecomponents/SelectedMovie";
import ProgressBar from "../../components/reservation/placepagecomponents/ProgressBar";
import TheaterSelector from "../../components/reservation/placepagecomponents/TheaterSelector";
import "../../pagecss/reservation/ReservationPlacePage.css";

const ReservationPlacePage = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [filteredData, setFilteredData] = useState({
    regions: [],
    branches: [],
    screenTimes: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 커스텀 훅 사용
  const {
    reservationState,
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

  // DB에서 스케줄 데이터 가져오기
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getSchedules();
        setSchedules(data);
        setIsLoading(false);
      } catch (error) {
        console.error("스케줄 데이터 로딩 실패:", error);
        setError("상영 정보를 불러오는데 실패했습니다.");
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  // 스케줄 데이터 필터링
  useEffect(() => {
    if (!schedules.length || !reservationState.selectedMovie) {
      setFilteredData({ regions: [], branches: [], screenTimes: [] });
      return;
    }

    try {
      // 선택된 영화와 날짜로 필터링
      const selectedDateStr = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD 형식

      // 날짜 범위를 확장하여 더 많은 데이터를 포함
      const currentDate = new Date(selectedDateStr);
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 1); // 하루 전
      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + 7); // 일주일 후

      const filteredSchedules = schedules.filter((schedule) => {
        const movieMatch =
          schedule.movienm === reservationState.selectedMovie.title;

        // 날짜 범위 체크
        const scheduleDate = new Date(schedule.startdate);
        const dateMatch = scheduleDate >= startDate && scheduleDate <= endDate;

        return movieMatch && dateMatch;
      });

      // 지역 추출
      const regions = [
        ...new Set(filteredSchedules.map((schedule) => schedule.regionnm)),
      ];

      // 선택된 지역의 지점 추출
      const branches = reservationState.selectedRegion
        ? [
            ...new Set(
              filteredSchedules
                .filter(
                  (schedule) =>
                    schedule.regionnm === reservationState.selectedRegion
                )
                .map((schedule) => schedule.cinemanm)
            ),
          ]
        : [];

      // 선택된 지역과 지점의 상영시간 추출
      const screenTimes =
        reservationState.selectedRegion && reservationState.selectedBranch
          ? filteredSchedules
              .filter(
                (schedule) =>
                  schedule.regionnm === reservationState.selectedRegion &&
                  schedule.cinemanm === reservationState.selectedBranch
              )
              .map((schedule) => ({
                time: schedule.starttime,
                screen: schedule.screenname,
                screentype: schedule.screentype,
                allseat: schedule.allseat,
                raservationseat: schedule.reservationseat,
                schedulecd: schedule.schedulecd,
              }))
          : [];

      setFilteredData({
        regions,
        branches,
        screenTimes,
      });
    } catch (error) {
      console.error("데이터 필터링 실패:", error);
      setError("데이터 처리 중 오류가 발생했습니다.");
    }
  }, [
    schedules,
    reservationState.selectedMovie,
    selectedDate,
    reservationState.selectedRegion,
    reservationState.selectedBranch,
  ]);

  // 페이지 로드 시 선택된 영화 정보 출력
  useEffect(() => {
    if (reservationState.selectedMovie) {
      console.log("🎬 선택된 영화:", reservationState.selectedMovie.title);
    }
  }, [reservationState.selectedMovie]);

  // 예매 상태 디버깅
  useEffect(() => {
    console.log("🔍 예매 상태:", {
      selectedDate: reservationState.selectedDate,
      selectedRegion: reservationState.selectedRegion,
      selectedBranch: reservationState.selectedBranch,
      selectedTime: reservationState.selectedTime,
      isReadyToSeat: isReadyToSeat,
    });
  }, [
    reservationState.selectedDate,
    reservationState.selectedRegion,
    reservationState.selectedBranch,
    reservationState.selectedTime,
    isReadyToSeat,
  ]);

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
    console.log("🚀 handleGoToSeat 함수 호출됨");

    // 예매 정보를 세션스토리지에 저장 (useReservation 훅과 호환되는 형식)
    const reservationInfo = {
      selectedMovie: reservationState.selectedMovie,
      selectedDate: reservationState.selectedDate,
      selectedRegion: reservationState.selectedRegion,
      selectedBranch: reservationState.selectedBranch,
      selectedTime: reservationState.selectedTime,
    };

    try {
      sessionStorage.setItem(
        "reservationInfo",
        JSON.stringify(reservationInfo)
      );

      // 콘솔에 예매 정보 출력
      console.log("🎫 좌석 선택 버튼 클릭");
      console.log("영화:", reservationState.selectedMovie.title);
      console.log(
        "날짜:",
        reservationState.selectedDate.toLocaleDateString("ko-KR")
      );
      console.log(
        "극장:",
        `${reservationState.selectedRegion} ${reservationState.selectedBranch}`
      );
      console.log("상영시간:", reservationState.selectedTime);
    } catch (error) {
      console.error("예매 정보 저장 중 오류:", error);
    }

    console.log("📍 /reservation/seat로 이동 시도");
    navigate("/reservation/seat");
    console.log("✅ navigate 함수 호출 완료");
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
            <button onClick={() => setError(null)} className="retry-button">
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
      <button className="reservation-seat-btn-fixed" onClick={handleGoToSeat}>
        좌석 선택
      </button>
    </div>
  );
};

export default ReservationPlacePage;
