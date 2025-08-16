import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e4c49c] text-[#3b240f] font-serif p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold">🎉 Payment Successful!</h1>
        <p className="text-lg">Thank you for your purchase from <strong>Thrifted Finds</strong>.</p>
        <p className="text-md">Your transaction has been completed successfully.</p>
        <Link href="/">
          <Button className="bg-[#5e3c1d] hover:bg-[#4c2f16] text-white">Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}
