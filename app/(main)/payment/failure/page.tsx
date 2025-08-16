import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FailurePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e4c49c] text-brown-900 font-serif p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold">❌ Payment Failed</h1>
        <p className="text-lg">Oops! Something went wrong with your payment.</p>
        <p className="text-md">Please try again or contact support if the issue persists.</p>
        <Link href="/">
          <Button className="bg-brown-700 hover:bg-brown-800 text-white">Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}
