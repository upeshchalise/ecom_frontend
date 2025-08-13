'use client'
// import { EsewaPayment } from "@/components/common/EsewaPayment";
// import { KhaltiPayment } from "@/components/common/KhaltiPayment";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCheckoutStore } from "@/lib/store/checkout";
import { useRouter } from "next/navigation";

const Checkout = () => {
    const checkoutItems = useCheckoutStore((state) => state.item.items);
    const totalPrice = checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                <p className="mb-4">Please review your products before proceeding to payment.</p>
                <Table>
                    {/* <TableCaption>A list of your products you are going to buy.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {checkoutItems.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell className="font-medium max-w-[400px] text-ellipsis truncate" title={`${invoice.name}`}>{invoice.name}</TableCell>
                                <TableCell>{invoice.price}</TableCell>
                                <TableCell>{invoice.quantity}</TableCell>
                                <TableCell className="text-right">{invoice.price * invoice.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">${totalPrice}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

                <div className="mt-6 flex flex-col items-center">
                    <div>Proceed via:</div>
                    <div>
                        <button onClick={() => {
router.push("/esewa");
                        }}>
                            esewa
                        </button>
                        {/* <EsewaPayment />
                        {" "}
                        <KhaltiPayment /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout