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
export const getMovieList = () =>
  api
    .get("/movies/list")
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


// 영화 정보 불러오기 
export const getMovieInfo = () =>
  api
    .get("/movies/info")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching movie info:", error);
      return [];
    });

export default api;
