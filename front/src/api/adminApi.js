import { api } from "./apiUtils";

// 암호화된 userid 디코딩
export const decodeUserid = async (tokenizedUserid) => {
  try {

    const response = await api.post("/api/auth/decode-userid", {
      tokenizedUserid: tokenizedUserid,
    });

    return response.data.userid;
  } catch (error) {
    console.error("userid 디코딩 실패:", error);
    throw error;
  }
};

// 관리자 토큰 발급
export const getAdminToken = async (userid) => {
  try {

    const response = await api.get(`/admin/token?userid=${userid}`);

    return response.data.token;
  } catch (error) {
    console.error("관리자 토큰 발급 실패:", error);
    console.error("에러 상세:", error.response?.data);
    throw error;
  }
};
