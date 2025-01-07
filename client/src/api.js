import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Backend URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);

            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/token/refresh/`, {
                    refresh: refreshToken,
                });

                localStorage.setItem(ACCESS_TOKEN, data.access);
                originalRequest.headers.Authorization = `Bearer ${data.access}`;

                return api(originalRequest); // Retry the failed request
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                window.location.href = '/login'; // Redirect to login
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
