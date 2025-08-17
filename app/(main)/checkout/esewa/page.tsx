"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCheckoutStore } from "@/lib/store/checkout";
import { useUserStore } from "@/lib/store/user";
import { generateUniqueId } from "@/utils/generate-unique-id";
import { useRouter } from "next/navigation";
import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";
import { useEffect } from "react";


interface EsewaPayload {
  amount: number;
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

export default function Esewa() {
  const checkoutItems = useCheckoutStore((state) => state.item.items);
  const userId = useUserStore((state) => state.user.user.id);
  const totalPrice = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const router = useRouter();
const isLoggedIn = useIsAuthenticated();

useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const handlePayment = async () => {
    try {
        
      const transactionId = generateUniqueId();

      const response = await fetch(`http://localhost:4000/api/payment/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useUserStore.getState().user.token.access_token}`,
        },
        body: JSON.stringify({
          paymentMethod: "esewa",
          amount: Number(totalPrice.toFixed(2)),
          productName: "YourProduct",
          transactionId,
          items: checkoutItems
        }),
      });

      const data = await response.json();

      if (!data?.esewaUrl || !data?.payload) {
        throw new Error("Invalid eSewa response");
      }

      // Create and auto-submit form to eSewa
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.esewaUrl;

      Object.entries(data.payload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Something went wrong during payment.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="mb-4">Please review your products before proceeding to payment.</p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checkoutItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell
                  className="font-medium max-w-[400px] text-ellipsis truncate"
                  title={item.name}
                >
                  {item.name}
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {item.price * item.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">Rs. {totalPrice}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div className="mt-6 flex flex-col items-center">
          <Button onClick={handlePayment} className="w-full max-w-xs">
            Pay with eSewa
          </Button>
        </div>
      </div>
    </div>
  );
}
