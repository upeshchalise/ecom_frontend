"use client";
import { Input } from "@/components/ui/input";
import useFileUpload from "@/hooks/useFileUpload";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CloudCog, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Signup = () => {

    // const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    const { mutate,data } = useFileUpload();

    // isLoading && console.log(isLoading, "isLoading");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file) {
                console.log(e.target.files, "e.target.files", file);
                mutate(file, {
                    onSuccess: (data) => {
                        setUrl(data?.url);
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
                <div className="flex flex-col gap-4 w-[320px]">
                    <div className="flex justify-center items-center w-full gap-1">
                        <div className={`block border-dashed border-2 text-center cursor-pointer min-w-20 h-20 rounded-full  ${url ? "p-0" : "p-6"}`}>
                            { url ? <Image src={url} alt="profile" width={100} height={100} style={{
                                objectFit: "cover",
                                height: "100%",
                                width: "100%",
                                borderRadius: "50%",
                            }} /> : <Upload className="mx-auto text-gray-500" />} 
                        </div>
                        <Input type="file" className="" name="photo" onChange={handleChange}/>
                    </div>
                    <Input type="text" placeholder="First Name" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    <Input type="text" placeholder="Last Name" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    <Input type="email" placeholder="Email" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    <Input type="password" placeholder="Password" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    <Input type="string" placeholder="Contact" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    <Input type="text" placeholder="Address" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    {/* <div className="rounded-full w-10 h-10">
                        <Input type="file" placeholder="Image" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    </div> */}

                    <button className="w-full p-2.5 bg-[#8b6e4b] text-white border-none rounded-xl font-bold cursor-pointer hover:bg-[#6e5435]">Sign Up</button>

                    <p className="text-center text-[#6e5435]">Already have an account? <Link href="/signin" className="font-semibold cursor-pointer">Log in</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Signup;