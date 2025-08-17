"use client"
import Image from "next/image"
import React from "react"
import Link from "next/link"
import { CategoryDropdown } from "./CategoryDropdown"
import { Search } from "./Search"
import { Cart } from "./Cart"
import { ProfileDropdown } from "./ProfileDropdown"
import { useIsAuthenticated } from "@/hooks/useIsAuthenticated"


export const Header = () => {
    const isAuthenticated = useIsAuthenticated();
    return (
        <div className="flex justify-between items-center py-4 px-2">
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
                    {
                        isAuthenticated &&
                        <ProfileDropdown />
                    }
                    <Cart />
                </div>
            </div>
        </div>
    )
}
