import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getScreens = (regionCode) =>
  api.get("/api/screens", { params: { regionCode } });

export const userAPI = {
  getAllUsers: async () => {
    const response = await api.get("/users/list");
    return response.data;
  },
};

export const getStaffs = () => api.get("/staff");
