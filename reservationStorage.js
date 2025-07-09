// 예매 정보 세션스토리지 관리 유틸

// 선택한 영화 정보 가져오기
export const getSelectedMovie = () => {
  try {
    const storedMovie = sessionStorage.getItem("selectedMovieName");
    const storedMovieCode = sessionStorage.getItem("selectedMovieCode");
    
    if (storedMovie) {
      // 문자열로 저장된 영화 제목과 코드를 객체 형태로 변환
      return {
        movienm: storedMovie,
        moviecd: storedMovieCode || null,
      };
    }
  } catch (error) {
    console.error("세션 스토리지에서 영화 정보를 가져오는 중 오류:", error);
  }
  return {
    movienm: "영화를 선택해주세요",
    moviecd: null,
  };
};

// 개별 예매 정보 가져오기 함수들
export const getSelectedDate = () => {
  try {
    const date = sessionStorage.getItem("selectedFullDate");
    return date ? new Date(date) : null;
  } catch (error) {
    console.error("세션 스토리지에서 날짜를 가져오는 중 오류:", error);
    return null;
  }
};

export const getSelectedRegion = () => {
  return sessionStorage.getItem("selectedRegion") || null;
};

export const getSelectedBranch = () => {
  return sessionStorage.getItem("selectedBranch") || null;
};

export const getSelectedTime = () => {
  return sessionStorage.getItem("selectedTime") || null;
};

export const getGuestCount = () => {
  try {
    const guestCount = sessionStorage.getItem("guestCount");
    return guestCount ? JSON.parse(guestCount) : null;
  } catch (error) {
    console.error("세션 스토리지에서 인원 정보를 가져오는 중 오류:", error);
    return null;
  }
};

export const getSelectedSeats = () => {
  try {
    const seats = sessionStorage.getItem("selectedSeats");
    return seats ? JSON.parse(seats) : [];
  } catch (error) {
    console.error("세션 스토리지에서 좌석 정보를 가져오는 중 오류:", error);
    return [];
  }
};

export const getTotalPrice = () => {
  try {
    const price = sessionStorage.getItem("totalPrice");
    return price ? parseInt(price) : 0;
  } catch (error) {
    console.error("세션 스토리지에서 가격 정보를 가져오는 중 오류:", error);
    return 0;
  }
};

// 모든 예매 관련 세션 스토리지 클리어
export const clearAllReservationData = () => {
  sessionStorage.removeItem("selectedMovieName");
  sessionStorage.removeItem("selectedMovieCode");
  sessionStorage.removeItem("selectedFullDate");
  sessionStorage.removeItem("selectedRegion");
  sessionStorage.removeItem("selectedBranch");
  sessionStorage.removeItem("selectedTime");
  sessionStorage.removeItem("guestCount");
  sessionStorage.removeItem("selectedSeats");
  sessionStorage.removeItem("totalPrice");
};
