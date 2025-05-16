"use client";
import { getProductById } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

const GetProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useQuery({
        queryKey: ['products', id],
        queryFn: () => getProductById(id),
        enabled: !!id

    })

    if (isLoading) return <p>Loading...</p>;


    return (
        <div>
            <h1>{data?.data?.name}</h1>
        </div>
    )
}

export default GetProductDetails