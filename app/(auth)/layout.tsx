import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen items-center justify-center bg-[#f4efe6] text-[#4b3e2a] font-serif">
        <div className="flex justify-start p-4">
        <Link href="/">
                <Image height={100} width={100} src={"/thrift-logo.svg"} alt={"Thrift Store"} style={{ objectFit: "fill" }} className="rounded-full h-full" />
            </Link>
        </div>
      {children}
    </div>
  );
}
