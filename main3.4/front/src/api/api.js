import axios from "axios";

// API 설정 및 기본 설정
const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 현재상영작 조회
export const getCurrentMovies = async () => {
  try {
    const response = await api.get("/movies/current");
    return response.data;
  } catch (error) {
    console.error("Error fetching current movies:", error);
    return [];
  }
};

// 상영예정작 조회
export const getUpcomingMovies = async () => {
  try {
    const response = await api.get("/movies/upcoming");
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
};

// 현재상영작과 상영예정작 목록 조회
export const getMoviesForAdmin = () =>
  api
    .get("/movies/admin")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching movies for admin:", error);
      return { currentMovies: [], upcomingMovies: [] };
    });

// 지역별 상영관 목록 조회
export const getScreens = (regionCode) =>
  api
    .get("/screens", { params: { regionCode } })
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

    export const getSchedules = () =>
      api
        .get("/schedules")
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error fetching users:", error);
          return [];
        });

export default api;
