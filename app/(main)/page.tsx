'use client';
import { CreateProductModal } from "@/components/common/CreateProduct";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/api/api";
import { useUserStore } from "@/lib/store/user";
import { Product } from "@/lib/types/response";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { useSearchParams } from 'next/navigation';

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(20);
// const [initialized, setInitialized] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const user = useUserStore((state) => state.user.user);
    const isLoggedIn = !!user.id;



// useEffect(() => {
//   const params = new URLSearchParams(window.location.search);
//   const pageParam = Number(params.get('page')) || 1;
//   const searchParam = params.get('search') ?? '';
//   const pageSizeParam = Number(params.get('pagesize')) || 20;

//   setPage(pageParam);
//   setSearch(searchParam);
//   setPageSize(pageSizeParam);
// console.log("console.log,effect1", pageParam, params, window.location.pathname)
//   setInitialized(true);
// }, []); 



useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const pageParam = Number(params.get('page')) || 1;
  const searchParam = params.get('search') ?? '';
  const pageSizeParam = Number(params.get('pagesize')) || 20;

  setPage(pageParam);
  setSearch(searchParam);
  setPageSize(pageSizeParam);
}, [useSearchParams()]);



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

//   useEffect(() => {
//   if (!initialized) return;
//   const params = new URLSearchParams();
//   params.set('page', String(page));
//   params.set('search', search);
//   params.set('pagesize', String(pageSize));
//   console.log("console.log,effect2", params)
//   console.log("effect 2 url", window.location.pathname, window.location.href, window.location)

//   window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
// }, [page, search, pageSize, initialized]);


  return (
    <>
   
    <div className="w-full  md:w-[98%] mx-auto h-[400px] relative rounded-md overflow-y-auto">
    <Image fill src={"/banner.png"} alt={"thrift store banner"}  style={{objectFit: "cover"}} className="rounded-md"/>
    </div>
{isLoggedIn && (
        <Button
          onClick={() => setOpenModal(true)}
          className="bg-[#8b6f47] hover:bg-[#6b4c2e] text-white rounded px-6 py-2 mb-4"
        >
          + Add Product
        </Button>
      )}
      <CreateProductModal open={openModal} onClose={() => setOpenModal(false)} />


    <div className="w-full md:w-[98%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
     {isLoading && <p>Loading...</p>}
      {data?.data?.data?.map((product:Product) => (
       <Link href={`/product/${product.id}`} key={product.id}>
         <ProductCard data={product}/>
       </Link>
      ))}
    </div>
    </>
  );
}
