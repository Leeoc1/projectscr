import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080", // 실제 API 서버 주소로 변경
});

export const getStaffs = () => api.get("/staff");