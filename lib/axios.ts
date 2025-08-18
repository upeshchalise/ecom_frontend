import axios from "axios";
import { useUserStore } from "./store/user";


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${useUserStore.getState().user?.token?.access_token}`
    },
    withCredentials: true
})

export default axiosInstance;