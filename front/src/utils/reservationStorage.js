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
    title: "영화를 선택해주세요",
    genre: "장르",
    poster: "/images/movie.jpg",
    id: null,
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
