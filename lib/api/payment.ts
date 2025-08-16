import axiosInstance from "../axios"
import { PaymentInitiation, PaymentResponse } from "../types/payment";

export const initiatePayment = async (data:PaymentInitiation, userId: string): Promise<PaymentResponse> => {
    const response = await axiosInstance.post(`/payment/initiate/${userId}`, data);
    return response.data;
}