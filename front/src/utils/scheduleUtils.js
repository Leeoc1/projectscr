import { formatDate } from "./DateUtils";

// 스케줄 필터링 함수
export const filterSchedulesByMovieAndDate = (
  schedules,
  movieTitle,
  selectedDate
) => {
  if (!schedules.length || !movieTitle || !selectedDate) {
    return [];
  }

  const selectedDateStr = formatDate(selectedDate);

  return schedules.filter(
    (item) =>
      item.movienm === movieTitle &&
      item.startdate &&
      item.startdate.startsWith(selectedDateStr)
  );
};

// 지역 리스트 추출
export const extractRegions = (schedules) => {
  return [...new Set(schedules.map((item) => item.regionnm))];
};

// 지점 리스트 추출
export const extractBranches = (schedules, selectedRegion) => {
  if (!selectedRegion) return [];

  return [
    ...new Set(
      schedules
        .filter((item) => item.regionnm === selectedRegion)
        .map((item) => item.cinemanm)
    ),
  ];
};

// 상영시간 리스트 추출
export const extractScreenTimes = (
  schedules,
  selectedRegion,
  selectedBranch
) => {
  if (!selectedRegion || !selectedBranch) return [];

  return schedules
    .filter(
      (item) =>
        item.regionnm === selectedRegion && item.cinemanm === selectedBranch
    )
    .map((item) => ({
      time: item.starttime,
      screen: item.screenname,
      screentype: item.screentype,
      allseat: item.allseat,
      raservationseat: item.raservationseat,
    }));
};

// 전체 필터링된 데이터 생성
export const generateFilteredData = (
  schedules,
  movieTitle,
  selectedDate,
  selectedRegion,
  selectedBranch
) => {
  const filteredSchedules = filterSchedulesByMovieAndDate(
    schedules,
    movieTitle,
    selectedDate
  );

  return {
    regions: extractRegions(filteredSchedules),
    branches: extractBranches(filteredSchedules, selectedRegion),
    screenTimes: extractScreenTimes(
      filteredSchedules,
      selectedRegion,
      selectedBranch
    ),
  };
};
