// 예매 정보 유효성 검사 - 개별 세션 스토리지 키 사용
export const validateReservationData = () => {
  const selectedDate = sessionStorage.getItem("selectedFullDate");
  const selectedRegion = sessionStorage.getItem("selectedRegion");
  const selectedBranch = sessionStorage.getItem("selectedBranch");
  const selectedTime = sessionStorage.getItem("selectedTime");
  
  if (!selectedDate) {
    return { isValid: false, error: "날짜를 선택해주세요." };
  }
  
  if (!selectedRegion) {
    return { isValid: false, error: "지역을 선택해주세요." };
  }
  
  if (!selectedBranch) {
    return { isValid: false, error: "극장을 선택해주세요." };
  }
  
  if (!selectedTime) {
    return { isValid: false, error: "상영시간을 선택해주세요." };
  }
  
  return { isValid: true, error: null };
};

// 스케줄 데이터 유효성 검사
export const validateScheduleData = (data) => {
  if (!Array.isArray(data)) {
    return { isValid: false, error: "스케줄 데이터가 올바르지 않습니다." };
  }
  
  if (data.length === 0) {
    return { isValid: false, error: "상영 정보가 없습니다." };
  }
  
  // 필수 필드 검사
  const requiredFields = ['movienm', 'startdate', 'starttime', 'regionnm', 'cinemanm'];
  const hasRequiredFields = data.every(item => 
    requiredFields.every(field => item[field] !== undefined && item[field] !== null)
  );
  
  if (!hasRequiredFields) {
    return { isValid: false, error: "스케줄 데이터에 필수 정보가 누락되었습니다." };
  }
  
  return { isValid: true, error: null };
};

// 좌석 선택 유효성 검사
export const validateSeatSelection = ({ totalGuests, selectedSeats }) => {
  if (totalGuests === 0) {
    return { isValid: false, error: "인원을 선택해주세요." };
  }
  
  if (selectedSeats.length === 0) {
    return { isValid: false, error: "좌석을 선택해주세요." };
  }
  
  if (selectedSeats.length !== totalGuests) {
    return { isValid: false, error: `인원 수(${totalGuests}명)만큼 좌석을 선택해주세요.` };
  }
  
  return { isValid: true, error: null };
};

// 날짜 유효성 검사
export const validateDate = (date) => {
  if (!date) {
    return { isValid: false, error: "날짜가 선택되지 않았습니다." };
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return { isValid: false, error: "과거 날짜는 선택할 수 없습니다." };
  }
  
  return { isValid: true, error: null };
};

// 영화 정보 유효성 검사
export const validateMovieInfo = (movie) => {
  if (!movie) {
    return { isValid: false, error: "영화 정보가 없습니다." };
  }
  
  if (!movie.title) {
    return { isValid: false, error: "영화 제목이 없습니다." };
  }
  
  return { isValid: true, error: null };
};

// 필터링된 데이터 유효성 검사
export const validateFilteredData = (filteredData) => {
  const { regions, branches, screenTimes } = filteredData;

  if (!regions || regions.length === 0) {
    return { isValid: false, error: "해당 날짜에 상영하는 지역이 없습니다." };
  }

  return { isValid: true, error: null };
}; 