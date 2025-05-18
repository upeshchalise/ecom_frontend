import axiosInstance from "@/lib/axios";
import { UserSignin, UserSignup } from "../types/user";
import { AuthUser, Category, PaginationMeta, PaginationRequest, Product } from "../types/response";
import { AxiosResponse } from "axios";


export const signup = async (data : UserSignup): Promise<void> => {
     await axiosInstance.post("/user", data);
}

export const signin = async (data: UserSignin): Promise<AuthUser> => {
    const response = await axiosInstance.post("/user/login", data);
    return response.data;
}

export const getAllProducts = async ({paginationData}:{paginationData: PaginationRequest}): Promise<AxiosResponse<{data: Product[], meta: PaginationMeta}>> => {
    const response = await axiosInstance.get("/products", {params: paginationData});
    return response
}

export const getProductById = async (productId: string): Promise<AxiosResponse<Product>> => {
    const response = await axiosInstance.get(`/product/${productId}`);
    return response;
}

export const getAllCategories = async (): Promise<AxiosResponse<Category[]>> => {
    const response = await axiosInstance.get("/categories");
    return response;
}