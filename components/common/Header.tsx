"use client"
import Image from "next/image"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { CategoryDropdown } from "./CategoryDropdown"
import { Search } from "./Search"
import { useCartStore } from "@/lib/store/cart"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export const Header = () => {

    const cart = useCartStore((state) => state.cart);


    return (
        <div className="flex justify-between items-center py-4 px-2">

            {/* logo */}
            {/* <div className="w-[100px] h-[100px] relative">
                <Image fill src={"/thrift-logo.svg"} alt={"Thrift Store"} style={{ objectFit: "contain" }} className="rounded-full h-full" />
            </div> */}
            <Link href="/">
                <Image height={100} width={100} src={"/thrift-logo.svg"} alt={"Thrift Store"} style={{ objectFit: "fill" }} className="rounded-full h-full" />
            </Link>
            <div className="flex gap-4 items-center">

                {/* category */}
                <CategoryDropdown />

                {/* search */}
                <Search />
                {/* cart and profile */}
                {/* <h1>cart and profile</h1> */}
                <div className="flex gap-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
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
                                                            <Image src={item.image ? item.image: "/thrift-logo.svg"} alt={item.name} width={50} height={50} className="w-[200px] max-w-[200px] max-h-[200px] h-full object-contain" />
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
                                            </tfoot>
                                        </table>
                                    }
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
