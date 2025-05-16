'use client';
import { ProductCard } from "@/components/common/ProductCard";
import { getAllProducts } from "@/lib/api/api";
import { Product } from "@/lib/types/response";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const pageParam = Number(queryParams.get('page')) || 1;
      const searchParam = queryParams.get('search') ?? '';
      const pageSizeParam = Number(queryParams.get('pagesize')) || 20;

      setPage(pageParam);
      setSearch(searchParam);
      setPageSize(pageSizeParam);
    }
  }, []);


  const {data,isLoading} = useQuery({
    queryKey: ['products',page,pageSize,search],
    queryFn: () => getAllProducts({paginationData: {page,pageSize,search}}),
  })
  
  useEffect(()=> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('search', search);
    params.set('pagesize', String(pageSize));
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  },[page,search,pageSize])

  return (
    <>
   
    <div className="w-full  md:w-[98%] mx-auto h-[400px] relative rounded-md">
    <Image fill src={"/banner.png"} alt={"thrift store banner"}  style={{objectFit: "cover"}} className="rounded-md"/>
    </div>
    <div className="w-full md:w-[98%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
     {isLoading && <p>Loading...</p>}
      {data?.data?.data?.map((product:Product) => (
       <Link href={`/product/${product.id}`} key={product.id}>
         <ProductCard data={product} key={product.id}/>
       </Link>
      ))}
      

    </div>
    </>
  );
}
