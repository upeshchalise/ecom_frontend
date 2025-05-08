import { Input } from "@/components/ui/input";
import Link from "next/link";

const Signup = () => {
    return (
        <section className="flex justify-center items-center max-h-screen">
            <div className="flex justify-center items-center flex-col gap-4 bg-[#fffaf3] p-8 rounded-2xl border border-[#d6c7b0] shadow-lg">
                <h1 className="text-3xl text-center">Signup</h1>
                <div className="flex flex-col gap-4 w-[320px]">
                    <Input type="text" placeholder="First Name" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    <Input type="text" placeholder="Last Name" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    <Input type="email" placeholder="Email" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    <Input type="password" placeholder="Password" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    <Input type="string" placeholder="Contact" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    <Input type="text" placeholder="Address" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />
                    <Input type="file" placeholder="Image" className="bg-[#fdfaf5] w-full p-2 rounded-md border border-[#b8a98d]" />

                    <button className="w-full p-2.5 bg-[#8b6e4b] text-white border-none rounded-xl font-bold cursor-pointer hover:bg-[#6e5435]">Sign Up</button>

                    <p className="text-center text-[#6e5435]">Already have an account? <Link href="/signin" className="font-semibold cursor-pointer">Log in</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Signup;