import axiosInstance from "@/lib/axios";
import { UserSignin, UserSignup } from "../types/user";
import { AuthUser } from "../types/response";


export const signup = async (data : UserSignup): Promise<void> => {
     await axiosInstance.post("/user", data);
}

export const signin = async (data: UserSignin): Promise<AuthUser> => {
    const response = await axiosInstance.post("/user/login", data);
    return response.data;
}