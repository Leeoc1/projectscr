import axios from "axios";

// API 설정 및 기본 설정
const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 현재상영작과 상영예정작 목록 조회
export const getMoviesForAdmin = () =>
  api
    .get("/movies/admin")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching movies for admin:", error);
      return { currentMovies: [], upcomingMovies: [] };
    });

// 극장 -> 영화 (ReservationPlaceToMoviePage)
// 영화 목록 조회(moviecd, movienm만 조회)
export const getCurrentMovies = () =>
  api
    .get("/movies/current")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching movies:", error);
      return [];
    });

    export const getUpcomingMovies = () =>
      api
        .get("/movies/upcoming")
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error fetching movies:", error);
          return [];
        });

// 극장 목록 조회
export const getCinemas = () =>
  api
    .get("/cinemas")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching cinema:", error);
      return [];
    });

// 지역별 상영관 목록 조회
export const getScreens = (regionCode) =>
  api
    .get("/api/screens", { params: { regionCode } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching screens:", error);
      return [];
    });

// 직원 목록 조회
export const getStaffs = () =>
  api
    .get("/staff")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching staffs:", error);
      return [];
    });

// 수정한 직원 정보 저장
export const updateStaff = async (staffData) => {
  try {
    const response = await api.put("/staff/update", staffData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 직원 정보 추가
export const addStaff = async (staffData) => {
  try {
    const response = await api.post("/staff/add", staffData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 전체 사용자 목록 조회
export const getAllUsers = () =>
  api
    .get("/users/list")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching users:", error);
      return [];
    });

// 지역
export const getRegions = () =>
  api
    .get("/regions")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching regions:", error);
      return [];
    });

// schedule view 불러오기
export const getSchedules = (cinemaCd, date) =>
  api
    .get("/schedules", { params: { cinemaCd, date } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching schedules:", error);
      return [];
    });

// 예약 저장
export const saveReservation = (reservationData) =>
  api
    .post("/reservation", reservationData)
    .then((response) => response.data)
    .catch((error) => { 
      console.error("Error saving reservation:", error);
      throw error;
    });

export const getReservation = () =>
  api
    .get("view/reservation/success")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching reservation:", error);
      return [];
    });

export const getReservationSeat = () => 
  api
.get("/reservation/seat")
.then((response) => response.data)
.catch((error) => {
  console.error("Error fetching reservation seat:", error);
  return [];
});

// 공지사항 전체 조회
export const fetchAllNotices = () =>
  api
    .get("/api/notice/notice")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching notices:", error);
      return [];
    });

// FAQ 전체 조회
export const fetchAllFaqs = () =>
  api
    .get("/api/faq/faq")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching faqs:", error);
      return [];
    });

export default api;
