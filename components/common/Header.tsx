"use client"
import Image from "next/image"
import React from "react"
import Link from "next/link"
import { CategoryDropdown } from "./CategoryDropdown"
import { Search } from "./Search"
import { Cart } from "./Cart"
import { ProfileDropdown } from "./ProfileDropdown"
import { useIsAuthenticated } from "@/hooks/useIsAuthenticated"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { useUserStore } from "@/lib/store/user"
import { UserRole } from "@/lib/enums"


export const Header = () => {
    const isAuthenticated = useIsAuthenticated();
    const user = useUserStore((state) => state.user.user);
    const router = useRouter();
    return (
        <div className="flex justify-between items-center py-4 px-2">
            <Link href={user.role === UserRole.ADMIN ? "/admin/dashboard" : "/"}>
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
                    {
                        isAuthenticated ?
                        <ProfileDropdown /> :
                        <Button onClick={()=> router.push("/signin")} className=" bg-[#8b6e4b] hover:bg-[#6e5435] cursor-pointer">Login</Button>
                    }
                    <Cart />
                </div>
            </div>
        </div>
    )
}
