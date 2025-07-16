import axios from "axios";

// API 설정 및 기본 설정
const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========== 영화 관련 API (movie 테이블) ==========
// 영화 상세 정보 조회
export const getMovieDetail = async (moviecd) => {
  try {
    const response = await api.post("/movies/detail", { movieno: moviecd });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 관리자용 KOBIS 영화 데이터 가져오기 (movie 테이블에 저장)
export const fetchMoviesFromKobis = () =>
  api
    .post("/movies/fetch-movies")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching movies from KOBIS:", error);
      throw error;
    });

// 현재상영작과 상영예정작 목록 조회 (movie 테이블)
export const getMoviesForAdmin = () =>
  api
    .get("/movies/admin")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching movies for admin:", error);
      return { currentMovies: [], upcomingMovies: [] };
    });

// 영화 정보 수정 (movie 테이블)
export const updateMovie = (moviecd, movieData) =>
  api
    .put(`/movies/${moviecd}`, movieData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating movie:", error);
      throw error;
    });

// 영화 삭제 (movie 테이블)
export const deleteMovie = (moviecd) =>
  api
    .delete(`/movies/${moviecd}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting movie:", error);
      throw error;
    });

// 영화 상영 상태 변경 (movie 테이블)
export const updateScreeningStatus = (moviecd) =>
  api
    .put(`/movies/${moviecd}/screening-status`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating screening status:", error);
      throw error;
    });

// 영화 상영 종료 (논리적 삭제) (movie 테이블)
export const archiveMovie = (moviecd) =>
  api
    .put(`/movies/${moviecd}/archive`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error archiving movie:", error);
      throw error;
    });

// 현재 상영중 영화 목록 조회 (movie 테이블)
export const getCurrentMovies = () =>
  api
    .get("/movies/current")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching movies:", error);
      return [];
    });

// 상영예정 영화 목록 조회 (movie 테이블)
export const getUpcomingMovies = () =>
  api
    .get("/movies/upcoming")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching movies:", error);
      return [];
    });

// ========== 극장 관련 API (Cinema, screen 테이블) ==========

// 극장 목록 조회 (Cinema 테이블)
export const getCinemas = () =>
  api
    .get("/cinemas")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching cinema:", error);
      return [];
    });

// 상영관 조회 (screen 테이블)
export const getScreens = () =>
  api
    .get("/screens")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching screens:", error);
      return [];
    });

// 상영관 뷰 조회 (screen_view)
export const getScreenView = async () => {
  try {
    const response = await api.get("/screens/view");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 상영관 상태 업데이트 (screen 테이블)
export const updateScreenStatus = async (screenData) => {
  try {
    const response = await api.put("/screens/statusupdate", {
      screencd: screenData.screencd,
      screenstatus: screenData.screenstatus,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 지역 목록 조회 (region 테이블)
export const getRegions = () =>
  api
    .get("/regions")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching regions:", error);
      return [];
    });

// ========== 스케줄 관련 API (schedule, schedule_view) ==========

// 스케줄 뷰 조회 (schedule_view)
export const getSchedules = (cinemaCd, date) =>
  api
    .get("/schedules", { params: { cinemaCd, date } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching schedules:", error);
      return [];
    });

// ========== 예약 관련 API (reservation, reservation_view 테이블) ==========

// 예약 저장 (reservation 테이블)
export const saveReservation = (reservationData) =>
  api
    .post("/reservation", reservationData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error saving reservation:", error);
      throw error;
    });

// 예약 정보 조회 (reservation_view)
export const getReservation = () =>
  api
    .get("view/reservation/success")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching reservation:", error);
      return [];
    });

// 예약 좌석 정보 조회 (reservation, seat 테이블 관련)
export const getReservationSeat = () =>
  api
    .get("/reservation/seat")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching reservation seat:", error);
      return [];
    });

// ========== 결제 관련 API (payment 테이블) ==========

// 결제 정보 저장 (payment 테이블)
export const savePayment = (paymentData) =>
  api
    .post("/payment/save", paymentData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error saving payment:", error);
      throw error;
    });

// 주간 총 매출 조회 (payment 테이블 집계)
export const getTotalVolume = () =>
  api
    .get("/reservation/week/sum")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching total volume:", error);
      return [];
    });

// 극장별 매출 조회 (payment, reservation, Cinema 테이블 조인 집계)
export const getCinemaVolume = () =>
  api
    .get("/reservation/cinema/amount")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching cinema volume:", error);
      return [];
    });

// ========== 사용자 관리 API (users 테이블) ==========

// 전체 사용자 목록 조회 (users 테이블)
export const getAllUsers = () =>
  api
    .get("/users/list")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching users:", error);
      return [];
    });

// 사용자 ID 중복 확인 (users 테이블)
export const isAvailableUserId = async (userid) => {
  try {
    const response = await api.post("/users/idcheck", { userid: userid });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 사용자 회원가입 (users 테이블)
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ========== 직원 관리 API (staff 테이블) ==========

// 직원 목록 조회 (staff 테이블)
export const getStaffs = () =>
  api
    .get("/staff")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching staffs:", error);
      return [];
    });

// 직원 정보 수정 (staff 테이블)
export const updateStaff = async (staffData) => {
  try {
    const response = await api.put("/staff/update", staffData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 직원 정보 추가 (staff 테이블)
export const addStaff = async (staffData) => {
  try {
    const response = await api.post("/staff/add", staffData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ========== 공지사항 및 FAQ API (notice, faq 테이블) ==========

// 공지사항 전체 조회 (notice 테이블)
export const fetchAllNotices = () =>
  api
    .get("/api/notice/notice")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching notices:", error);
      return [];
    });

// FAQ 전체 조회 (faq 테이블)
export const fetchAllFaqs = () =>
  api
    .get("/api/faq/faq")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching faqs:", error);
      return [];
    });

// ========== 외부 API 키 조회 ==========

// 카카오 API 키 조회 (서버 설정값)
export const getKakaoApiKey = async () => {
  try {
    const response = await api.get("/api/kakao");
    return response.data.key;
  } catch (error) {
    throw error;
  }
};

// ========== 외부 소셜 로그인 API ==========

// Google OAuth 클라이언트 ID 조회 (서버 설정값)
export const getGoogleClientId = async () => {
  try {
    const response = await api.get("/google/client-id");
    return response.data.clientId;
  } catch (error) {
    console.error("Error fetching Google client ID:", error);
    throw error;
  }
};

// Google 사용자 정보 조회 (외부 Google API)
export const getGoogleUserInfo = async (accessToken) => {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return response.json();
};

// Google People API 데이터 조회 (외부 Google API)
export const getGooglePeopleData = async (accessToken) => {
  const response = await fetch(
    "https://people.googleapis.com/v1/people/me?personFields=birthdays,phoneNumbers,names,emailAddresses",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch people data");
  }

  return response.json();
};

// Google 사용자 정보를 백엔드에 저장 (users 테이블)
export const saveGoogleUserToBackend = async (userInfo) => {
  const response = await fetch("http://localhost:8080/google/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    throw new Error("Failed to save user to backend");
  }

  return response.json();
};

// 카카오 로그인 (외부 카카오 API)
export const kakaoLogin = async (params) => {
  const response = await axios.post("/login/kakao", null, { params });
  return response.data;
};

// 카카오 로그인 콜백 처리 (외부 카카오 API)
export const kakaoCallback = async (code) => {
  const response = await axios.get("/login/oauth2/code/kakao", {
    params: { code },
  });
  return response.data;
};

// 네이버 로그인 URL 가져오기 (외부 네이버 API)
export const naverLogin = async () => {
  try {
    const response = await api.post("/login/naver");
    return response.data;
  } catch (error) {
    console.error("네이버 로그인 URL 가져오기 실패:", error);
    throw error;
  }
};

// 네이버 로그인 콜백 처리 (외부 네이버 API, users 테이블에 저장)
export const naverLoginCallback = async (code, state) => {
  try {
    const response = await api.post(
      `/login/naver/callback?code=${code}&state=${state}`
    );

    // console.log("Naver callback response:", response.data);
    return response.data;
  } catch (error) {
    console.error("네이버 로그인 콜백 처리 실패:", error);
    console.error("에러 상세:", error.response?.data);
    throw error;
  }
};

// 리뷰 작성
export const createReview = (reviewData) => {
  console.log("API 호출 - 리뷰 데이터:", reviewData);
  return api
    .post("/api/review/review", reviewData)
    .then((response) => {
      console.log("API 응답 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("API 호출 실패:", error);
      if (error.response) {
        console.error("응답 에러 데이터:", error.response.data);
        console.error("응답 상태 코드:", error.response.status);
        console.error("응답 헤더:", error.response.headers);
      } else if (error.request) {
        console.error("요청 에러:", error.request);
      } else {
        console.error("기타 에러:", error.message);
      }
      throw error;
    });
};

export default api;
