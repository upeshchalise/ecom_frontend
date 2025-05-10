import axiosInstance from "@/lib/axios";
import { UserSignup } from "../types/user";


export const signup = async (data : UserSignup): Promise<void> => {
     await axiosInstance.post("/user", data);
}