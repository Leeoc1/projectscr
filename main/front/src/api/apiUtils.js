import axios from "axios";

// API 설정 및 기본 설정
export const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 공통 API 호출 래퍼 함수
export const apiRequest = async (method, url, data = null, config = {}) => {
  try {
    const response = await api[method](url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Promise 체이닝 방식 API 호출 래퍼
export const apiRequestPromise = (method, url, data = null, config = {}) => {
  return api[method](url, data, config)
    .then((response) => response.data);
};

// 공통 에러 처리 함수
export const handleApiError = (error, defaultReturn = []) => {
  console.error("API Error:", error);
  return defaultReturn;
};

// 에러 처리가 포함된 Promise 체이닝 래퍼
export const apiRequestWithErrorHandling = (method, url, data = null, config = {}, errorMessage = "API 요청 실패", defaultReturn = []) => {
  return api[method](url, data, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error(errorMessage, error);
      if (defaultReturn !== null) {
        return defaultReturn;
      }
      throw error;
    });
};
