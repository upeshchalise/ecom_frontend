"use client";
import { getProductById } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation"

export default function GetProductDetails() {
    const { id } = useParams<{ id: string }>();
    
    const { data, isLoading } = useQuery({
        queryKey: ['products', id],
        queryFn: () => getProductById(id),
        enabled: !!id

    })


    if (isLoading) return <p>Loading...</p>;


    if(!data?.data) return <p>Product not found</p>;

    return (
        <div className="mx-auto max-w-[700px] p-8 bg-[#fffaf3] border border-[#d6c7b0] rounded-xl">
            <div>
                <Image src={data?.data?.image ?? "/banner.png"} alt={"thrift store banner"} width={40} height={40} className="w-[40px] h-[40px] object-cover border border-[#b8a98d] rounded-full" />
                <span>Added by: {`${data?.data?.user?.firstName} ${data?.data?.user?.lastName}`}</span>
            </div>
            <Image src={data?.data?.image ?? "/banner.png"} alt={"thrift store banner"} width={500} height={500} className="w-full max-h-[400px] object-contain border border-[#b8a98d] rounded-lg" />
            <h1 className="text-3xl font-bold">{data?.data?.name}</h1>
            <p className="text-lg">{data?.data?.description}</p>
            <p className="text-xl font-bold">Rs. {data?.data?.price}</p>
        </div>
    )
}