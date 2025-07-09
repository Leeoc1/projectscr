import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import { isSameDay, getDateLabel } from "../../utils/DateUtils";
import { getSchedules } from "../../api/api";
import { 
  getSelectedMovie,
  getSelectedDate,
  getSelectedRegion,
  getSelectedBranch,
  getSelectedTime
} from "../../utils/reservationStorage";
import { validateReservationData } from "../../utils/validationUtils";
import SelectedMovie from "../../components/reservation/placepagecomponents/SelectedMovie";
import ProgressBar from "../../components/reservation/placepagecomponents/ProgressBar";
import TheaterSelector from "../../components/reservation/placepagecomponents/TheaterSelector";
import "../../pagecss/reservation/ReservationPlacePage.css";
import DateSelectorMovie from "../../components/reservation/placepagecomponents/DateSelectorMovie";

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

  // 예매 상태 관리
  const [reservationState, setReservationState] = useState({
    selectedDate: new Date(),
    selectedRegion: null,
    selectedBranch: null,
    selectedTime: null,
    selectedMovie: null,
  });

  // 선택한 영화 정보 가져오기
  useEffect(() => {
    const selectedMovie = getSelectedMovie();
    const selectedDate = getSelectedDate();
    const selectedRegion = getSelectedRegion();
    const selectedBranch = getSelectedBranch();
    const selectedTime = getSelectedTime();

    // 영화가 실제로 선택되었는지 확인 (기본값이 아닌 경우)
    const isMovieActuallySelected =
      selectedMovie &&
      selectedMovie.movienm !== "영화를 선택해주세요" &&
      selectedMovie.moviecd;

    setReservationState({
      selectedMovie: isMovieActuallySelected ? selectedMovie : null,
      selectedDate: selectedDate || new Date(),
      selectedRegion: selectedRegion || null,
      selectedBranch: selectedBranch || null,
      selectedTime: selectedTime || null,
    });
  }, []);

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
      const selectedDateStr = reservationState.selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD 형식

      // 날짜 범위를 확장하여 더 많은 데이터를 포함
      const currentDate = new Date(selectedDateStr);
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 1); // 하루 전
      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + 7); // 일주일 후

      const filteredSchedules = schedules.filter((schedule) => {
        const movieMatch =
          schedule.movienm === reservationState.selectedMovie.movienm;

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
                // 화면 표시용 정보
                time: schedule.starttime,
                allseat: schedule.allseat,
                reservationseat: schedule.reservationseat,
                screen: schedule.screenname,
                screentype: schedule.screentype,
                // 세션스토리지 저장용 5개 필드
                runningtime: schedule.runningtime,
                schedulecd: schedule.schedulecd,
                screenname: schedule.screenname,
                starttime: schedule.starttime,
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
    reservationState.selectedDate,
    reservationState.selectedRegion,
    reservationState.selectedBranch,
  ]);

  // 상태 업데이트 함수
  const updateReservationState = (updates) => {
    setReservationState((prev) => {
      const newState = { ...prev, ...updates };

      return newState;
    });
  };

  // 이벤트 핸들러들
  const handleDateSelect = (date) => {
    updateReservationState({
      selectedDate: date,
      selectedRegion: null,
      selectedBranch: null,
      selectedTime: null,
    });
  };

  const handleRegionSelect = (region) => {
    updateReservationState({
      selectedRegion: region,
      selectedBranch: null,
      selectedTime: null,
    });
  };

  const handleBranchSelect = (branch) => {
    updateReservationState({
      selectedBranch: branch,
      selectedTime: null,
    });
  };

  const handleTimeSelect = (item) => {
    // 5개 필드만 추출해서 세션스토리지에 저장
    const movieTimeData = {
      reservationseat: item.reservationseat,
      runningtime: item.runningtime,
      schedulecd: item.schedulecd,
      screenname: item.screenname,
      starttime: item.starttime,
    };
    sessionStorage.setItem("selectedMovieTime", JSON.stringify(movieTimeData));
    updateReservationState({ selectedTime: item.starttime });
  };

  // 선택 완료 여부 체크
  const isReadyToSeat = validateReservationData().isValid;

  // 페이지 로드 시 선택된 영화 정보 출력
  useEffect(() => {
    if (reservationState.selectedMovie) {
      console.log("🎬 선택된 영화:", reservationState.selectedMovie.movienm);
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

    // 콘솔에 예매 정보 출력
    console.log("🎫 좌석 선택 버튼 클릭");
    console.log("영화:", reservationState.selectedMovie.movienm);
    console.log(
      "날짜:",
      reservationState.selectedDate.toLocaleDateString("ko-KR")
    );
    console.log(
      "극장:",
      `${reservationState.selectedRegion} ${reservationState.selectedBranch}`
    );
    console.log("상영시간:", reservationState.selectedTime);

    console.log("📍 /reservation/seat로 이동 시도");
    navigate("/reservation/seat");
    console.log("✅ navigate 함수 호출 완료");
  };

  return (
    <div className="reservation-page">
      <Header isOtherPage={true} isScrolled={true} />
      <div className="reservation-content">
        {/* 선택한 영화 섹션 */}
        <SelectedMovie selectedMovie={reservationState.selectedMovie} />

        <div className="reservation-container">
          {/* 진행바 */}
          <ProgressBar currentStep={0} />

          <DateSelectorMovie />

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