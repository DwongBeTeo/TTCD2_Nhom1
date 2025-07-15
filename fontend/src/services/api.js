import axios from 'axios';

const API_URL = 'http://localhost:8082/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor để thêm token vào header
//Interceptor tự động thêm Authorization: Bearer <token>
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const isPublic = config.url.includes('/valorant-accounts') && config.method === 'GET';
        if (token && !isPublic) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;