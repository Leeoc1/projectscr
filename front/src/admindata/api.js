import axios from "axios";

// const API_BASE_URL = 'http://localhost:8080';

// export const userAPI = {
//   getAllUsers: async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/users/api/list`);
//     //   const response = await axios.get(`/users/api/list`);
//       return response.data;
//     } catch (error) {
//       throw new Error('사용자 데이터를 가져오는데 실패했습니다.');
//     }
//   },
//   // 추후 createUser, updateUser, deleteUser 등 추가 가능
// };

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const userAPI = {
    getAllUsers: async () => {
        const response = await api.get('/users/list');
        return response.data;
    }
}