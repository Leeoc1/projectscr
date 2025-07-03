// 예매 정보 세션스토리지 관리 유틸
export const getReservationInfo = () => {
  try {
    const saved = sessionStorage.getItem("reservationInfo");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("세션 스토리지에서 예매 정보를 불러오는 중 오류:", e);
  }
  return {};
};

export const setReservationInfo = (data) => {
  try {
    sessionStorage.setItem("reservationInfo", JSON.stringify(data));
  } catch (error) {
    console.error("세션 스토리지에 예매 정보를 저장하는 중 오류:", error);
  }
};

export const clearReservationInfo = () => {
  sessionStorage.removeItem("reservationInfo");
  sessionStorage.removeItem("selectedMovie");
};

// 선택한 영화 정보 가져오기
export const getSelectedMovie = () => {
  try {
    const storedMovie = sessionStorage.getItem("selectedMovie");
    if (storedMovie) {
      return JSON.parse(storedMovie);
    }
  } catch (error) {
    console.error("세션 스토리지에서 영화 정보를 가져오는 중 오류:", error);
  }
  return {
    title: "영화를 선택해주세요",
    genre: "장르",
    poster: "/images/movie.jpg",
    moviecd: null,
  };
};

// 예매 정보를 세션 스토리지에 저장 (기존 setReservationInfo와 동일)
export const saveReservationInfo = (info) => {
  try {
    sessionStorage.setItem("reservationInfo", JSON.stringify(info));
  } catch (error) {
    console.error("세션 스토리지에 예매 정보를 저장하는 중 오류:", error);
  }
}; 