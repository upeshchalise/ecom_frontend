"use client"
import { Database, LogOut, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/user";

export const ProfileDropdown = () => {
    const router = useRouter();
    const logout = useUserStore((state) => state.clearUser);

    const handleLogout = () => {
        logout();
        router.push("/signin");
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 mt-2">
                <DropdownMenuItem
                    onClick={() => router.push("/profile")}
                    className="cursor-pointer"
                >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => router.push("/my-products")}
                    className="cursor-pointer"
                >
                    <Database className="w-4 h-4 mr-2" />
                    My Products
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}