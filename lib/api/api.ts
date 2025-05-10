import axiosInstance from "@/lib/axios";


export const uploadImage = async () => {
    return await axiosInstance.post("/api/upload")
}