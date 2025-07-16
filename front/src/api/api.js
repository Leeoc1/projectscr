import axios from "axios";

// API 설정 및 기본 설정
const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Google OAuth API 함수들
export const getGoogleClientId = async () => {
  try {
    const response = await api.get("/google/client-id");
    return response.data.clientId;
  } catch (error) {
    console.error("Error fetching Google client ID:", error);
    throw error;
  }
};

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

// 관리자용 KOBIS 영화 데이터 가져오기
export const fetchMoviesFromKobis = () =>
  api
    .post("/movies/fetch-movies")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching movies from KOBIS:", error);
      throw error;
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

// 영화 정보 수정
export const updateMovie = (moviecd, movieData) =>
  api
    .put(`/movies/${moviecd}`, movieData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating movie:", error);
      throw error;
    });

// 영화 삭제
export const deleteMovie = (moviecd) =>
  api
    .delete(`/movies/${moviecd}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting movie:", error);
      throw error;
    });

// 영화 상영 상태 변경
export const updateScreeningStatus = (moviecd) =>
  api
    .put(`/movies/${moviecd}/screening-status`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating screening status:", error);
      throw error;
    });

// 영화 상영 종료 (논리적 삭제)
export const archiveMovie = (moviecd) =>
  api
    .put(`/movies/${moviecd}/archive`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error archiving movie:", error);
      throw error;
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

// 상영관 조회
export const getScreens = () =>
  api
    .get("/screens")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching screens:", error);
      return [];
    });

// screenview 조회
export const getScreenView = async () => {
  try {
    const response = await api.get("/screens/view");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 상영관 상태 관리
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
};

// 직원 정보 추가
export const addStaff = async (staffData) => {
  try {
    const response = await api.post("/staff/add", staffData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

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

export const getTotalVolume = () =>
  api
    .get("/reservation/week/sum")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching total volume:", error);
      return [];
    });

export const getCinemaVolume = () =>
  api
    .get("/reservation/cinema/amount")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching cinema volume:", error);
      return [];
    });

// 결제 정보 저장
export const savePayment = (paymentData) =>
  api
    .post("/payment/save", paymentData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error saving payment:", error);
      throw error;
    });
export const getKakaoApiKey = async () => {
  try {
    const response = await api.get("/api/kakao");
    return response.data.key;
  } catch (error) {
    throw error;
  }
};

export const isAvailableUserId = async (userid) => {
  try {
    const response = await api.post("/users/idcheck", { userid: userid });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const kakaoLogin = async (params) => {
  const response = await axios.post("/login/kakao", null, { params });
  return response.data;
};

export const kakaoCallback = async (code) => {
  const response = await axios.get("/login/oauth2/code/kakao", {
    params: { code },
  });
  return response.data;
};

// 네이버 로그인
export const naverLogin = async () => {
  try {
    const response = await api.post("/login/naver");
    return response.data;
  } catch (error) {
    console.error("네이버 로그인 URL 가져오기 실패:", error);
    throw error;
  }
};

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

export default api;
