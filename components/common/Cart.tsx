"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/store/cart"

import { useCheckoutStore } from "@/lib/store/checkout"
import Image from "next/image"
import Link from "next/link"

export const Cart = () => {
    const cart = useCartStore((state) => state.cart);
    // const checkout = useCheckoutStore((state) => state.item);
    const setCheckout = useCheckoutStore((state) => state.addItem);
    const clearCheckout = useCheckoutStore((state) => state.clearCheckoutItem);

    const handleCheckout = () => {
        clearCheckout();
        cart?.items.forEach((item) => setCheckout(item));
    };
    return (
        <Dialog>
            <DialogTrigger className="relative h-8 w-8">
                {/* <button className="relative h-8 w-8"> */}
                <ShoppingCart className="h-full w-full" />
                <span className="bg-yellow-500 rounded-full text-center absolute -top-1 -right-1 h-5 w-5 min-w-fit min-h-fit">{Number(cart?.items?.length)}</span>
                {/* </button> */}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Your Cart</DialogTitle>
                    <DialogDescription asChild>
                        {!cart?.items?.length ? "Your cart is empty" :
                            <table className="w-full text-left">
                                <thead className="text-lg text-gray-600">
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.items.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <Image src={item.image ? item.image : "/thrift-logo.svg"} alt={item.name} width={50} height={50} className="w-[200px] max-w-[200px] max-h-[200px] h-full object-contain" />
                                                <span>
                                                    {item.name}
                                                </span>
                                            </td>
                                            <td><button className="p-1 border" onClick={() => useCartStore.getState().removeItem(item.id)}>-</button> {item.quantity} <button className="p-1 border " onClick={() => useCartStore.getState().addItem(item)}>+</button></td>
                                            <td>${item.price.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={2}>Total:</td>
                                        <td>${cart.totalPrice.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} className="text-right">
                                            <DialogPrimitive.Close asChild>
                                                <Link href="/checkout" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCheckout}>Checkout</Link>
                                            </DialogPrimitive.Close>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}