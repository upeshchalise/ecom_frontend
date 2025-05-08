import { Input } from "@/components/ui/input";
import Link from "next/link";

const Signin = () => {
    return (
        <section className="flex justify-center items-center max-h-screen">
            <div className="flex justify-center items-center flex-col gap-4 bg-[#fffaf3] p-8 rounded-2xl border border-[#d6c7b0] shadow-lg">
                <h1 className="text-3xl text-center">Login</h1>
                <div className="flex flex-col gap-4 w-[320px]">
                    
                    <Input type="email" placeholder="Email" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    <Input type="password" placeholder="Password" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    

                    <button className="w-full p-2.5 bg-[#8b6e4b] text-white border-none rounded-xl font-bold cursor-pointer hover:bg-[#6e5435]">Login</button>

                    <p className="text-center text-[#6e5435]">Don't have an account? <Link href="/signup" className="font-semibold cursor-pointer">Signup</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Signin;