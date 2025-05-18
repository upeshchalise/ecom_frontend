import Image from "next/image"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { CategoryDropdown } from "./CategoryDropdown"
import { Search } from "./Search"

export const Header = () => {

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
                    <ShoppingCart />
                </div>
                {/* login */}
            </div>

        </div>
    )
}
