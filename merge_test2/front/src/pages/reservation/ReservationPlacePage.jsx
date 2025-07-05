import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../pubcomponent/Header";
import { useReservation } from "../../hooks/useReservation";
import { useDateNavigation } from "../../hooks/useDateNavigation";
import { isSameDay, getDateLabel } from "../../utils/DateUtils";
import { getSchedules, getMovieInfo } from "../../api/api";
import SelectedMovie from "../../components/reservation/placepagecomponents/SelectedMovie";
import ProgressBar from "../../components/reservation/placepagecomponents/ProgressBar";
import TheaterSelector from "../../components/reservation/placepagecomponents/TheaterSelector";
import "../../pagecss/reservation/ReservationPlacePage.css";
import DateSelector from "../../components/reservation/reservationptmcomponents/DateSelector";

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

  //===================
  const [movieInfo, setMovieInfo] = useState(null);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    sessionStorage.getItem("selectedFullDate") || "날짜를 선택하세요"
  );
  const selectedMovieName = sessionStorage.getItem("selectedMovieName");

  const filteredMovieInfo = movieInfo.filter(
    (movie) => movie.movienm === selectedMovieName
  );

  //===================

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


  
  useEffect(() => {
    // DB에서 스케줄 데이터 가져오기
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

    // 영화 정보 가져오기 (전부부)
    const fetchMovieInfo = async () => {
      try {
        const data = await getMovieInfo();
        setMovieInfo(data);
      } catch (error) {
        console.error("영화 정보 로딩 실패:", error);
      }
    };

    fetchSchedules();
    fetchMovieInfo();
  }, []);

  // 스케줄 데이터 필터링
  useEffect(() => {
    if (!schedules.length || !selectedMovieName) {
      setFilteredData({ regions: [], branches: [], screenTimes: [] });
      return;
    }

    try {
      const filtered = schedules.filter((schedule) => {
        // 영화 이름 
        const movieMatch = schedule.movienm === selectedMovieName;
        // 날짜 체크, view에 endDate 없어서 일단 이렇게 함 
        const dateMatch = schedule.startdate === selectedDate;

        return movieMatch && dateMatch;
      });

      // cinemanm 기준으로 스케줄 그룹화
      const groupedMovies = filtered.reduce((acc, curr) => {
        const cinemaName = curr.cinemanm;
        if (!acc[cinemaName]) {
          acc[cinemaName] = [];
        }
        acc[cinemaName].push(curr);
        return acc;
      }, {});

      // 상영 시작 시간순으로 정렬 (선택사항)
      Object.keys(groupedMovies).forEach((cinemaName) => {
        groupedMovies[cinemaName].sort(
          (a, b) => new Date(a.starttime) - new Date(b.starttime)
        );
      });

      setFilteredSchedules(groupedMovies);
    } catch (error) {
      console.error("데이터 필터링 실패:", error);
      setError("데이터 처리 중 오류가 발생했습니다.");
    }

    // 마운트 시 sessionStorage 확인
    const savedDate = sessionStorage.getItem("selectedFullDate");
    if (savedDate && savedDate !== selectedDate) {
      setSelectedDate(savedDate);
    }
  }, [selectedDate]);

  // 페이지 로드 시 선택된 영화 정보 출력
  // console.log("🎬 선택된 영화:", reservationState.selectedMovie.title);

  // 예매 상태 디버깅
  // console.log("🔍 예매 상태:", {
  //   selectedDate: reservationState.selectedDate,
  //   selectedRegion: reservationState.selectedRegion,
  //   selectedBranch: reservationState.selectedBranch,
  //   selectedTime: reservationState.selectedTime,
  //   isReadyToSeat: isReadyToSeat,
  // });

  // 영화가 선택되지 않은 경우 영화 선택 페이지로 리다이렉트
  if (!reservationState.selectedMovie) {
    navigate("/reservation/movie");
    return null;
  }


  // 좌석 선택 페이지로 이동
  const handleGoToSeat = () => {
    // console.log("🚀 handleGoToSeat 함수 호출됨");

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
      // console.log("🎫 좌석 선택 버튼 클릭");
      // console.log("영화:", reservationState.selectedMovie.title);
      // console.log(
      //   "날짜:",
      //   reservationState.selectedDate.toLocaleDateString("ko-KR")
      // );
      // console.log(
      //   "극장:",
      //   `${reservationState.selectedRegion} ${reservationState.selectedBranch}`
      // );
      // console.log("상영시간:", reservationState.selectedTime);
    } catch (error) {
      console.error("예매 정보 저장 중 오류:", error);
    }

    // console.log("📍 /reservation/seat로 이동 시도");
    navigate("/reservation/seat");
    // console.log("✅ navigate 함수 호출 완료");
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
        <SelectedMovie filteredMovieInfo={filteredMovieInfo} />

        <div className="reservation-container">
          {/* 진행바 */}
          <ProgressBar currentStep={0} />

          <DateSelector />

          {/* 극장선택과 상영시간 선택 */}
          <TheaterSelector filteredSchedules={filteredSchedules}/>
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
