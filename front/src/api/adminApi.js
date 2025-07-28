import { api } from "./apiUtils";

// 관리자 토큰 발급
export const getAdminToken = async (userid) => {
  try {
    console.log("관리자 토큰 발급 요청:", userid);
    const response = await api.get(`/admin/token?userid=${userid}`);
    console.log("토큰 발급 응답:", response.data);
    return response.data.token;
  } catch (error) {
    console.error("관리자 토큰 발급 실패:", error);
    console.error("에러 상세:", error.response?.data);
    throw error;
  }
};
