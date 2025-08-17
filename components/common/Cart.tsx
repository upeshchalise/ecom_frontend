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

import Image from "next/image"
import { PaymentMethod } from "./PaymentMethod"
import { useEffect, useState } from "react"
import { useUserStore } from "@/lib/store/user"
import Link from "next/link"

export const Cart = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cart = useCartStore((state) => state.cart);
    const initializeCart = useCartStore((state) => state.initializeCart);

    const user = useUserStore(state => state.user.user)

    useEffect(() => {
        if (user?.id) {
            initializeCart(user.id)
        }
    }, [user?.id, initializeCart])

    const cartContent = !cart?.items?.length ? "Your cart is empty" :
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
                        <td>${Number(item.price).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={2}>Total:</td>
                    <td>${Number(cart.totalPrice).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="text-right" colSpan={2}>
                        <DialogPrimitive.Close asChild>
                            <PaymentMethod cart={cart.items} setIsCartOpen={setIsCartOpen} />
                        </DialogPrimitive.Close>
                    </td>
                </tr>
            </tfoot>
        </table>

    return (
        <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
            <DialogTrigger className="relative h-8 w-8" onClick={() => setIsCartOpen(true)}>
                {/* <button className="relative h-8 w-8"> */}
                <ShoppingCart className="h-full w-full" />
                <span className="bg-yellow-500 rounded-full text-center absolute -top-1 -right-1 h-5 w-5 min-w-fit min-h-fit">{Number(cart?.items?.length)}</span>
                {/* </button> */}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Your Cart</DialogTitle>
                    <DialogDescription asChild>

                        {!user?.id ? <p>
                            You need to <Link href={"/signin"} className="underline text-yellow-600">sign in</Link> to view your cart
                        </p>: 
                            cartContent
                        }

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}