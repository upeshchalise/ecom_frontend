import axios from "axios";
import { useUserStore } from "./store/user";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = useUserStore.getState().user;
        const token = user?.token?.access_token;
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    }
);

export default axiosInstance;