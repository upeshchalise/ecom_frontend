"use client";
import { getProductById, updateUserInteractions } from "@/lib/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"
import { useCartStore } from "@/lib/store/cart";
import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";
import { toast } from "sonner";
import { InteractionData } from "@/lib/types/user";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/lib/store/user";

export default function GetProductDetails() {
    const { id } = useParams<{ id: string }>();
    const { id: userId } = useUserStore(store => store.user.user)
    const addItem = useCartStore((state) => state.addItem);

    const isLoggedIn = useIsAuthenticated();
    const router = useRouter();
    
    const { data, isLoading } = useQuery({
        queryKey: ['products', id],
        queryFn: () => getProductById(id),
        enabled: !!id
        
    })
    console.log("userId", userId, "from product data",data?.data.userId)

    const { mutate } = useMutation({
        mutationFn: (interactionData: InteractionData) => updateUserInteractions(interactionData),
        mutationKey: ['update-interactions']
    })

    function handleMutation() {
        const interactionData: InteractionData = {
            interactionType: "CART",
            productIds: [id]
        }
        mutate(interactionData);
    }


    if (isLoading) return <p>Loading...</p>;


    function handleAddToCart() {

        if (!isLoggedIn) {
            router.push("/signin");
            toast.error("You need to be logged in to add items to the cart.");
            return;
        }
        if (!data?.data) return;

        const product = data.data;

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image ?? '',
        });
        handleMutation();
    }

    function handleDelete() {
        console.log("Delete product");
    }

    function handleUpdate() {
        console.log("Update product");
    }
    if (!data?.data) return <p>Product not found</p>;

    return (
        // <section className=" items-center w-full md:w-1/2 md:mx-auto bg-[#fffaf3] border border-[#d6c7b0] rounded-xl"
        // style={{
        //     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
        // }}
        // >

        <div className="mx-auto max-w-[700px] p-8 bg-[#fffaf3] border border-[#d6c7b0] rounded-xl">
            <div>
                <Image src={data?.data?.image ?? "/banner.png"} alt={"thrift store banner"} width={40} height={40} className="w-[40px] h-[40px] object-cover border border-[#b8a98d] rounded-full" />
                <span>Added by: {`${data?.data?.user?.firstName} ${data?.data?.user?.lastName}`}</span>
            </div>
            <Image src={data?.data?.image ?? "/banner.png"} alt={"thrift store banner"} width={500} height={500} className="w-full max-h-[400px] object-contain border border-[#b8a98d] rounded-lg" />
            <h1 className="text-3xl font-bold">{data?.data?.name}</h1>
            <p className="text-lg">{data?.data?.description}</p>
            <p className="text-xl font-bold">Rs. {data?.data?.price}</p>
            <div className="flex justify-between flex-col md:flex-row gap-4">
                {
                    data?.data?.userId === userId ? (
                        <div className="flex gap-4">

                            <Button className="bg-[#479850] text-white py-3 px-6 rounded-[6px] text-base cursor-pointer hover:bg-[#185b1c] h-16" onClick={handleUpdate}>
                                Update Product
                            </Button>

                            <Button className="bg-[#b8513c] text-white py-3 px-6 rounded-[6px] text-base cursor-pointer hover:bg-[#822c0d] h-16" onClick={handleDelete}>
                                Delete Product
                            </Button>
                        </div>
                    ) :
                        <Button className="bg-[#8b6e4b] text-white py-3 px-6 rounded-[6px] text-base cursor-pointer hover:bg-[#6e5435] h-16" onClick={handleAddToCart} disabled={data?.data?.quantity < 1} >
                            Add to Cart
                        </Button>
                }

                <span className={cn(`bg-green-300 text-green-900 h-fit py-3 px-2 rounded-sm text-lg font-medium w-fit`, { "bg-red-300 text-red-900": data?.data?.quantity < 1 })} >
                    {data?.data?.quantity < 1 ? "Out of Stock" : `${data?.data?.quantity} in stock`}
                </span>
            </div>
        </div>
        // </section>
    )
}