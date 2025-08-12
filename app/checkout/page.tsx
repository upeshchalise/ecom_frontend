'use client'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCheckoutStore } from "@/lib/store/checkout";

const Checkout = () => {
    const checkoutItems = useCheckoutStore((state) => state.item.items);
    const totalPrice = checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0);
    console.log("Checkout Items:", checkoutItems);
    console.log("Total Price:", totalPrice);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                <p className="mb-4">Please review your products before proceeding to payment.</p>
                <div className="flex items-center justify-between mb-4">
                    {/* <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> */}
                    <div>
                        <p className="font-semibold">John Doe</p>
                        <p className="text-sm text-gray-500">123 Main Street, Anytown, USA</p>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <p className="font-semibold">Subtotal:</p>
                </div>
            </div>
        </div>
    )
}

export default Checkout