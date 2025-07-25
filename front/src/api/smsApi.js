import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const sendVerificationCode = async (phoneNumber) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sms/send`, {
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "SMS 전송 실패");
  }
};

export const verifyCode = async (phoneNumber, certificateNum) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sms/verify`, {
      phoneNumber,
      certificateNum,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "인증 실패");
  }
};
