"use client"

import { ProductCard } from "@/components/common/ProductCard";
import { getAllProducts } from "@/lib/api/api";
import { Product } from "@/lib/types/response";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AdminProductList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = Number(params.get('page')) || 1;
    const searchParam = params.get('search') ?? '';
    const pageSizeParam = Number(params.get('pagesize')) || 20;
    const categoriesParam = params.get("categories")?.split(",").filter(Boolean) || [];

    setPage(pageParam);
    setSearch(searchParam);
    setPageSize(pageSizeParam);
    setCategories(categoriesParam);
  }, [useSearchParams()]);



  const { data, isLoading } = useQuery({
    queryKey: ['products', page, pageSize, search, categories],
    queryFn: () => getAllProducts({ paginationData: { page, pageSize, search, categories } }),
  })

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('search', search);
    params.set('pagesize', String(pageSize));
    if (categories?.length > 0) {
      params.set("categories", categories.join(","));
    } else {
      params.delete("categories");
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [page, search, pageSize, categories])


  return (
    <div className="w-full md:w-[98%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
      {isLoading && <p>Loading...</p>}
      {data?.data?.data?.map((product: Product) => (
        <Link href={`/admin/products/${product.id}`} key={product.id}>
          <ProductCard data={product} />
        </Link>
      ))}
    </div>)
}
export default AdminProductList