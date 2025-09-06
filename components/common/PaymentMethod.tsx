"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { CartItem } from "@/lib/types/cart";
import { useCheckoutStore } from "@/lib/store/checkout";


interface Props {
    cart: CartItem[];
    setIsCartOpen: (open: boolean) => void;
}


export const PaymentMethod = ({ cart, setIsCartOpen }: Props) => {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("esewa");

    const setCheckout = useCheckoutStore((state) => state.addItem);
    const clearCheckout = useCheckoutStore((state) => state.clearCheckoutItem);

const handleCheckout = () => {
    clearCheckout();
    cart?.forEach((item) => setCheckout(item));
    setIsCartOpen(false);
    router.push(`/checkout/${paymentMethod}`)
};

return (
    <Dialog>
        <DialogTrigger className=" h-8 w-8">
            <Button className="">
                Checkout
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm rounded-xl">
            <DialogHeader>
                <DialogTitle>Choose Payment Method</DialogTitle>
                <DialogDescription>
                    Select your preferred payment option
                </DialogDescription>
            </DialogHeader>

            <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
            >
                <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer">
                    <RadioGroupItem value="esewa" id="esewa" />
                    <Label htmlFor="esewa" className="flex items-center space-x-2 cursor-pointer w-full">
                        <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                        <span>eSewa</span>
                    </Label>
                </div>

                {/* <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer">
                    <RadioGroupItem value="khalti" id="khalti" className="" />
                    <Label htmlFor="khalti" className="flex items-center space-x-2 cursor-pointer w-full">
                        <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
                        <span>Khalti</span>
                    </Label>
                </div> */}
            </RadioGroup>
            <DialogPrimitive.Close asChild>

                <Button className="w-full mt-4" onClick={handleCheckout}>
                    Pay with "esewa"
                </Button>
            </DialogPrimitive.Close>
        </DialogContent>
    </Dialog>
);
}
