"use client";
import { Input } from "@/components/ui/input";
import { signin } from "@/lib/api/api";
import { UserRole } from "@/lib/enums";
import { SigninSchema } from "@/lib/schema/user";
import { useUserStore } from "@/lib/store/user";
import { AuthenticatedUser } from "@/lib/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Signin = () => {

    const router = useRouter();

    const { setUser } = useUserStore();

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof SigninSchema>>({
        resolver: zodResolver(SigninSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const signinMutation = useMutation({
        mutationFn: signin,
        onSuccess: (data: AuthenticatedUser) => {
            toast.success("User logged in successfully");
            setUser({
                token: {
                    access_token: data.token.access_token,
                    refresh_token: data.token.refresh_token
                },
                user: {
                    id: data.user.id,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    email: data.user.email,
                    image: data.user.image,
                    address: data.user.address,
                    phone: data.user.phone,
                    role: data.user.role
                }
            })
            if(data.user.role === UserRole.ADMIN) {
                router.push("/admin/dashboard");
            }else {

                router.push("/");
            }
        },
        onError: (error) => {
            toast.error("Error logging in user");
            console.error("Error logging in user:", error);
        }
    })

    const onSubmit = async (data: z.infer<typeof SigninSchema>) => {
        await signinMutation.mutateAsync(data)
    }
    return (
        <section className="flex justify-center items-center max-h-screen">
            <div className="flex justify-center items-center flex-col gap-4 bg-[#fffaf3] p-8 rounded-2xl border border-[#d6c7b0] shadow-lg">
                <h1 className="text-3xl text-center">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[320px]">

                    <Input type="email" placeholder="Email" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" {...register("email")} />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    <Input type="password" placeholder="Password" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" {...register("password")} />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                    <button className="w-full p-2.5 bg-[#8b6e4b] text-white border-none rounded-xl font-bold cursor-pointer hover:bg-[#6e5435]">Login</button>

                    <p className="text-center text-[#6e5435]">Dont have an account? <Link href="/signup" className="font-semibold cursor-pointer">Signup</Link></p>
                </form>
            </div>
        </section>
    )
}

export default Signin;