import axios from "axios";

// axios 인스턴스 생성 (baseURL 설정)
const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 영화 관련 API 함수들
export const movieAPI = {
  // 관리자용: 현재상영작/상영예정작만 가져오기
  getMoviesForAdmin: async () => {
    try {
      const response = await api.get("/movies/admin");
      return response.data;
    } catch (error) {
      return { currentMovies: [], upcomingMovies: [] };
    }
  },
};

export default api;
