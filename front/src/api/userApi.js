import { api, apiRequest, apiRequestWithErrorHandling } from "./apiUtils";

// ========== 사용자 관리 API (users 테이블) ==========

// 전체 사용자 목록 조회 (users 테이블)
export const getAllUsers = () =>
  apiRequestWithErrorHandling(
    "get",
    "/users/list",
    null,
    {},
    "Error fetching users:",
    []
  );

// 사용자 ID 중복 확인 (users 테이블)
export const isAvailableUserId = async (userid) => {
  return await apiRequest("post", "/users/idcheck", { userid: userid });
};

// 사용자 회원가입 (users 테이블)
export const registerUser = async (userData) => {
  return await apiRequest("post", "/users/register", userData);
};

// 사용자 정보 조회 (users 테이블)
export const getUserInfo = async (userid) => {
  return await apiRequest("get", `/users/info/${userid}`);
};

// 사용자별 예약 정보 조회 (users 테이블)
export const getUserReservations = async (userid) => {
  return await apiRequest("get", `/users/${userid}/reservations`);
};

// 회원탈퇴 (users 테이블)
export const deleteUser = async (userid) => {
  console.log("회원탈퇴 API 호출 시작 - userid:", userid);
  try {
    const result = await apiRequest("delete", `/users/${userid}`);
    console.log("회원탈퇴 API 성공:", result);
    return result;
  } catch (error) {
    console.error("회원탈퇴 API 실패:", error);
    console.error("요청 URL:", `/users/${userid}`);
    console.error("에러 상세:", error.response?.data || error.message);
    throw error;
  }
};

// 로그아웃 처리 (클라이언트 사이드)
export const logoutUser = () => {
  console.log("로그아웃 처리 시작");
  try {
    // 기본 로그인 정보 제거
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");

    // 카카오 로그인 관련 데이터 제거
    localStorage.removeItem("loginType");
    sessionStorage.removeItem("loginType");

    // 토스페이먼츠 관련 데이터 제거
    localStorage.removeItem("@tosspayments/merchant-browser-id");
    localStorage.removeItem(
      "@tosspayments/payment-widget-previous-payment-method-id"
    );

    // 추가 보안을 위해 다른 사용자 관련 데이터도 제거
    localStorage.removeItem("userToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authData");

    // 세션 스토리지 전체 정리
    sessionStorage.clear();

    console.log("로그아웃 처리 완료");
    return true;
  } catch (error) {
    console.error("로그아웃 처리 중 오류:", error);
    return false;
  }
};

// ========== 직원 관리 API (staff 테이블) ==========

// 직원 목록 조회 (staff 테이블)
export const getStaffs = () =>
  apiRequestWithErrorHandling(
    "get",
    "/staff",
    null,
    {},
    "Error fetching staffs:",
    []
  );

// 직원 정보 수정 (staff 테이블)
export const updateStaff = async (staffData) => {
  return await apiRequest("put", "/staff/update", staffData);
};

// 직원 정보 추가 (staff 테이블)
export const addStaff = async (staffData) => {
  return await apiRequest("post", "/staff/add", staffData);
};

// ========== 공지사항 및 FAQ API (notice, faq 테이블) ==========

// 공지사항 전체 조회 (notice 테이블)
export const fetchAllNotices = () =>
  apiRequestWithErrorHandling(
    "get",
    "/api/notice/notice",
    null,
    {},
    "Error fetching notices:",
    []
  );

// FAQ 전체 조회 (faq 테이블)
export const fetchAllFaqs = () =>
  apiRequestWithErrorHandling(
    "get",
    "/api/faq/faq",
    null,
    {},
    "Error fetching faqs:",
    []
  );

// ========== 외부 API 키 조회 ==========

// 카카오 API 키 조회 (서버 설정값)
export const getKakaoApiKey = async () => {
  const response = await apiRequest("get", "/api/kakao");
  return response.key;
};

// ========== 외부 소셜 로그인 API ==========

// Google OAuth 클라이언트 ID 조회 (서버 설정값)
export const getGoogleClientId = async () => {
  try {
    const response = await apiRequest("get", "/google/client-id");
    return response.clientId;
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
  const response = await api.post("/login/kakao", null, { params });
  return response.data;
};

// 카카오 로그인 콜백 처리 (외부 카카오 API)
export const kakaoCallback = async (code) => {
  const response = await api.get("/login/oauth2/code/kakao", {
    params: { code },
  });
  return response.data;
};

// 네이버 로그인 URL 가져오기 (외부 네이버 API)
export const naverLogin = async () => {
  try {
    const response = await apiRequest("post", "/login/naver");
    return response;
  } catch (error) {
    console.error("네이버 로그인 URL 가져오기 실패:", error);
    throw error;
  }
};

// 네이버 로그인 콜백 처리 (외부 네이버 API, users 테이블에 저장)
export const naverLoginCallback = async (code, state) => {
  try {
    const response = await apiRequest(
      "post",
      `/login/naver/callback?code=${code}&state=${state}`
    );
    return response;
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

// 리뷰 목록 조회
export const fetchAllReviews = () => {
  return apiRequestWithErrorHandling(
    "get",
    "/api/review/review",
    null,
    {},
    "리뷰 목록 조회 실패:",
    []
  );
};
