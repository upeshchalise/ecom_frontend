'use client'

import { ProductCard } from "@/components/common/ProductCard";
import { getProductsByCategory } from "@/lib/api/api";
import { Product } from "@/lib/types/response";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function ProductsByCategory() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(20);

    const { id } = useParams<{ id: string }>();

    

   useEffect(() => {
       const params = new URLSearchParams(window.location.search);
       const pageParam = Number(params.get('page')) || 1;
       const searchParam = params.get('search') ?? '';
       const pageSizeParam = Number(params.get('pagesize')) || 20;
   
       setPage(pageParam);
       setSearch(searchParam);
       setPageSize(pageSizeParam);
     }, [useSearchParams()]);


     const {data, isLoading} = useQuery({
        queryKey: ["productsByCategory", id, page, pageSize, search],
        queryFn: () => getProductsByCategory(id, { paginationData: { page, pageSize, search } }),
        enabled: !!id
    })

    useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('search', search);
    params.set('pagesize', String(pageSize));
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [page, search, pageSize, id])

    if (isLoading) return <div>Loading...</div>

    return (
   <div className="w-full md:w-[98%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {isLoading && <p>Loading...</p>}
        {data?.data?.data?.map((product: Product) => (
          <Link href={`/admin/products/${product.id}`} key={product.id}>
            <ProductCard data={product} />
          </Link>
        ))}
      </div>
)
}