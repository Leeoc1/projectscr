import { useState, useEffect, useCallback } from "react";
import {
  getReservationInfo,
  getSelectedMovie,
  setReservationInfo,
} from "../utils/reservationStorage";
import { generateFilteredData } from "../utils/scheduleUtils";
import {
  validateReservationInfo,
  validateScheduleData,
} from "../utils/validationUtils";

// 초기 예매 상태
const initialReservationState = {
  selectedDate: new Date(),
  selectedRegion: null,
  selectedBranch: null,
  selectedTime: null,
  selectedMovie: null,
  isLoading: false,
  error: null,
};

export const useReservation = () => {
  const [reservationState, setReservationState] = useState(
    initialReservationState
  );
  const [schedules, setSchedules] = useState([]);
  const [filteredData, setFilteredData] = useState({
    regions: [],
    branches: [],
    screenTimes: [],
  });

  // 선택한 영화 정보 가져오기
  useEffect(() => {
    const selectedMovie = getSelectedMovie();
    const savedInfo = getReservationInfo();

    // 영화가 실제로 선택되었는지 확인 (기본값이 아닌 경우)
    const isMovieActuallySelected =
      selectedMovie &&
      selectedMovie.title !== "영화를 선택해주세요" &&
      selectedMovie.id;

    setReservationState((prev) => ({
      ...prev,
      selectedMovie: isMovieActuallySelected ? selectedMovie : null,
      selectedDate: savedInfo.selectedDate
        ? new Date(savedInfo.selectedDate)
        : new Date(),
      selectedRegion: savedInfo.selectedRegion || null,
      selectedBranch: savedInfo.selectedBranch || null,
      selectedTime: savedInfo.selectedTime || null,
    }));
  }, []);

  // 스케줄 데이터 불러오기
  const loadSchedules = useCallback(async () => {
    try {
      setReservationState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      const { getSchedules } = await import("../api/api");
      const data = await getSchedules();

      // 스케줄 데이터 유효성 검사
      const validation = validateScheduleData(data);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      setSchedules(data);
      setReservationState((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error("스케줄 데이터 로딩 실패:", error);
      setReservationState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "상영 정보를 불러오는데 실패했습니다.",
      }));
    }
  }, []);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  // 스케줄 필터링 및 데이터 처리
  useEffect(() => {
    if (!schedules.length || !reservationState.selectedMovie) {
      setFilteredData({ regions: [], branches: [], screenTimes: [] });
      return;
    }

    try {
      const filtered = generateFilteredData(
        schedules,
        reservationState.selectedMovie.title,
        reservationState.selectedDate,
        reservationState.selectedRegion,
        reservationState.selectedBranch
      );

      setFilteredData(filtered);
    } catch (error) {
      console.error("데이터 필터링 실패:", error);
      setReservationState((prev) => ({
        ...prev,
        error: "데이터 처리 중 오류가 발생했습니다.",
      }));
    }
  }, [
    schedules,
    reservationState.selectedMovie,
    reservationState.selectedDate,
    reservationState.selectedRegion,
    reservationState.selectedBranch,
  ]);

  // 상태 업데이트 함수
  const updateReservationState = useCallback((updates) => {
    setReservationState((prev) => {
      const newState = { ...prev, ...updates };

      // 세션 스토리지에 저장
      const info = {
        selectedDate: newState.selectedDate,
        selectedRegion: newState.selectedRegion,
        selectedBranch: newState.selectedBranch,
        selectedTime: newState.selectedTime,
        selectedMovie: newState.selectedMovie,
      };
      setReservationInfo(info);

      return newState;
    });
  }, []);

  // 이벤트 핸들러들
  const handleDateSelect = useCallback(
    (date) => {
      updateReservationState({
        selectedDate: date,
        selectedRegion: null,
        selectedBranch: null,
        selectedTime: null,
      });
    },
    [updateReservationState]
  );

  const handleRegionSelect = useCallback(
    (region) => {
      updateReservationState({
        selectedRegion: region,
        selectedBranch: null,
        selectedTime: null,
      });
    },
    [updateReservationState]
  );

  const handleBranchSelect = useCallback(
    (branch) => {
      updateReservationState({
        selectedBranch: branch,
        selectedTime: null,
      });
    },
    [updateReservationState]
  );

  const handleTimeSelect = useCallback(
    (time) => {
      updateReservationState({ selectedTime: time });
    },
    [updateReservationState]
  );

  // 선택 완료 여부 체크 (계산된 값으로 변경)
  const isReadyToSeat = validateReservationInfo(reservationState).isValid;

  // 에러 초기화
  const clearError = useCallback(() => {
    setReservationState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    // 상태
    reservationState,
    filteredData,
    isLoading: reservationState.isLoading,
    error: reservationState.error,

    // 계산된 값들
    isReadyToSeat,

    // 이벤트 핸들러들
    handleDateSelect,
    handleRegionSelect,
    handleBranchSelect,
    handleTimeSelect,

    // 유틸리티 함수들
    clearError,
  };
};
