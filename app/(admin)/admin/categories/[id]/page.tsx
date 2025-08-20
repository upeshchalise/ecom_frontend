'use client'

import { ProductCard } from "@/components/common/ProductCard";
import { getProductsByCategory } from "@/lib/api/api";
import { Product } from "@/lib/types/response";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation"

export default function ProductsByCategory() {
    const { id } = useParams<{ id: string }>();

    const {data, isLoading} = useQuery({
        queryKey: ["productsByCategory", id],
        queryFn: () => getProductsByCategory(id),
        enabled: !!id
    })

    if (isLoading) return <div>Loading...</div>

    return (
   <div className="w-full md:w-[98%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {isLoading && <p>Loading...</p>}
        {data?.data?.map((product: Product) => (
          <Link href={`/admin/products/${product.id}`} key={product.id}>
            <ProductCard data={product} />
          </Link>
        ))}
      </div>
)
}