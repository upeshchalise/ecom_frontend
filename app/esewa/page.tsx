"use client"


import { useEffect } from "react";

interface EsewaConfig {
  tax_amount: number;
  total_amount: number;
  transaction_uuid: string;
  product_code: string;
  product_service_charge: number;
  product_delivery_charge: number;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;
}

interface PaymentResponse {
  amount: string;
  esewaConfig: EsewaConfig;
}



export default function Esewa() {

useEffect(()=> {
    
})

const handlePayment = async() => {


try {
    const response = await fetch("http://localhost:4000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: "esewa",
          amount: 100,
          productName: "name",
          transactionId: `${Date.now()}`,
        }),
      });

      const data = await response.json();
      console.log(data);



const esewaConfig: EsewaConfig = {
        tax_amount: 0,
        total_amount: 100,
        transaction_uuid: "1234567890",
        product_code: "product_code_example",
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: "http://localhost:3000/success",
        failure_url: "http://localhost:3000/failure",
        signed_field_names: "amount,txAmt,productCode,txRefId",
        signature: "example_signature"
    };

    const paymentResponse: PaymentResponse = {
        amount: "100.00",
        esewaConfig
    };

    console.log(paymentResponse);

} catch (error) {
    console.log(error);
    
}
}


    return (
        <>
        <div>esewa</div>
        <button onClick={handlePayment}>pay</button>
        </>
    )
}