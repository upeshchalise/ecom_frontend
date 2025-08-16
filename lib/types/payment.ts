import { PaymentService } from "../enums";
import { Checkout } from "./checkout";

export interface PaymentInitiation {
    amount: number;
    paymentMethod: PaymentService;
    productName: string;
    transactionId: string;
    items: Checkout['items'];
    destination: string;
}


export interface PaymentPayload {
  amount: number;
  tax_amount: number;
  product_service_charge: number;
  product_delivery_charge: number;
  total_amount: number;
  transaction_uuid: string;
  product_code: string;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;
}


export interface PaymentResponse {
    esewaUrl: string;
    payload: PaymentPayload
}