"use client";
import { Input } from "@/components/ui/input";
import useFileUpload from "@/hooks/useFileUpload";
import { Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignupSchema } from "@/lib/schema/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/api/api";
import { toast, Toaster } from "sonner";
import { Messages } from "@/lib/messages";
import { AxiosError } from "axios";


const Signup = () => {

    const [url, setUrl] = useState<string>("");

    const router = useRouter();
    const { mutate } = useFileUpload();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            image: ""
        }
    })

    const createUserMutation = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            toast.success("User created successfully");
            router.push("/signin");
        },
        onError: (error: AxiosError) => {
            console.log("error ===>>", error)
            toast.error(Messages[error.response?.data as string]);
            console.error("Error creating user:", error);
        }
    })


    const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
        await createUserMutation.mutateAsync(data)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file) {
                console.log(e.target.files, "e.target.files", file);
                mutate(file, {
                    onSuccess: (data) => {
                        setUrl(data?.url);
                        setValue("image", data?.url);
                    },
                    onError: (error) => {
                        console.error("Error uploading file:", error);
                    },
                });
            }
        }
    };



    return (
        <section className="flex justify-center items-center max-h-screen">
            <div className="flex justify-center items-center flex-col gap-4 bg-[#fffaf3] p-8 rounded-2xl border border-[#d6c7b0] shadow-lg">
                <h1 className="text-3xl text-center">Signup</h1>
                <form className="flex flex-col gap-4 w-[320px]" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center items-center w-full gap-1">
                        <div className={`block border-dashed border-2 text-center cursor-pointer min-w-20 h-20 rounded-full  ${url ? "p-0" : "p-6"}`}>
                            {url ? <Image src={url} alt="profile" width={100} height={100} style={{
                                objectFit: "cover",
                                height: "100%",
                                width: "100%",
                                borderRadius: "50%",
                            }} /> : <Upload className="mx-auto text-gray-500" />}
                        </div>
                        <Input type="file" name="image" onChange={handleChange} accept="image/*" />
                    </div>
                    <Input type="text" placeholder="First Name" className={`bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d] ${errors.first_name && "border border-red-500"}`} {...register("first_name")} />
                    {errors.first_name && <span className="text-red-500">{errors.first_name.message}</span>}
                    <Input type="text" placeholder="Last Name" className={`bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d] ${errors.first_name && "border border-red-500"}`} {...register("last_name")} />
                    {errors.last_name && <span className="text-red-500">{errors.last_name.message}</span>}
                    <Input type="email" placeholder="Email" className={`bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d] ${errors.first_name && "border border-red-500"}`} {...register("email")} />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    <Input type="password" placeholder="Password" className={`bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d] ${errors.first_name && "border border-red-500"}`} {...register("password")} />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    <Input type="string" placeholder="phone" className={`bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d] ${errors.first_name && "border border-red-500"}`} {...register("phone")} />
                    {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                    <Input type="text" placeholder="Address" className={`bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d] ${errors.first_name && "border border-red-500"}`} {...register("address")} />
                    {errors.address && <span className="text-red-500">{errors.address.message}</span>}

                    <button className="w-full p-2.5 bg-[#8b6e4b] text-white border-none rounded-xl font-bold cursor-pointer hover:bg-[#6e5435]" type="submit">Sign Up</button>

                    <p className="text-center text-[#6e5435]">Already have an account? <Link href="/signin" className="font-semibold cursor-pointer">Log in</Link></p>
                </form>
            </div>
        </section>
    )
}

export default Signup;