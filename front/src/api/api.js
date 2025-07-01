import axios from "axios";

/**
 * ========================================
 * API 설정 및 기본 설정
 * ========================================
 */
const api = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 서버 주소
  timeout: 10000, // 요청 타임아웃 (10초)
  headers: {
    "Content-Type": "application/json", // JSON 형식으로 통신
  },
});

/**
 * ========================================
 * 영화 관련 API 함수들
 * ========================================
 */
export const movieAPI = {
  /**
   * 사용자용: 현재상영작/상영예정작 목록 조회
   * @returns {Promise<Object>} 현재상영작과 상영예정작 목록
   */
  getMoviesForUser: () => {
    return api
      .get("/movies/user")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching movies for user:", error);
        return { currentMovies: [], upcomingMovies: [] };
      });
  },

  /**
   * 관리자용: 현재상영작/상영예정작 목록 조회
   * @returns {Promise<Object>} 현재상영작과 상영예정작 목록
   */
  getMoviesForAdmin: () => {
    return api
      .get("/movies/admin")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching movies for admin:", error);
        return { currentMovies: [], upcomingMovies: [] };
      });
  },
};

/**
 * ========================================
 * 관리자 관련 API 함수들
 * ========================================
 */

/**
 * 상영관 목록 조회 (지역별 필터링 가능)
 * @param {string} regionCode - 지역 코드 (선택사항)
 * @returns {Promise<Object>} 상영관 목록
 */
export const getScreens = (regionCode) => {
  return api
    .get("/api/screens", { params: { regionCode } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching screens:", error);
      return [];
    });
};

/**
 * 직원 목록 조회
 * @returns {Promise<Object>} 직원 목록
 */
export const getStaffs = () => {
  return api
    .get("/staff")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching staffs:", error);
      return [];
    });
};

/**
 * 사용자 관련 API 함수들
 */
export const userAPI = {
  /**
   * 전체 사용자 목록 조회
   * @returns {Promise<Array>} 사용자 목록
   */
  getAllUsers: () => {
    return api
      .get("/users/list")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching users:", error);
        return [];
      });
  },
};

export default api;
