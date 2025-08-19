import axiosInstance from "@/lib/axios";
import { UserSignin, UserSignup } from "../types/user";
import { AuthUser, Category, CategoryRequest, PaginationMeta, Product, ProductPaginationRequest, User } from "../types/response";
import { AxiosResponse } from "axios";


export const signup = async (data : UserSignup): Promise<void> => {
     await axiosInstance.post("/user", data);
}

export const signin = async (data: UserSignin): Promise<AuthUser> => {
    const response = await axiosInstance.post("/user/login", data);
    return response.data;
}

export const getAllProducts = async ({paginationData}:{paginationData: ProductPaginationRequest}): Promise<AxiosResponse<{data: Product[], meta: PaginationMeta}>> => {
      const { categories, ...rest } = paginationData

    const response = await axiosInstance.get("/products", {params: {...rest, categories: categories.join(",")}});
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

export const getProfile = async () : Promise<User> => {
    const response = await axiosInstance.get("/user/profile");
    return response.data
}

export const createCategory = async(data: CategoryRequest): Promise<AxiosResponse<Category>> => {
    return await axiosInstance.post("/admin/category", data)
}