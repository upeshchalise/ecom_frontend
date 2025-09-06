'use client';
import { CreateProductModal } from "@/components/common/CreateProduct";
import NoData from "@/components/common/NoData";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { getAllProducts, recommendedProducts, updateUserInteractions } from "@/lib/api/api";
import { useUserStore } from "@/lib/store/user";
import { Product } from "@/lib/types/response";
import { InteractionData } from "@/lib/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { useSearchParams } from 'next/navigation';

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [categories, setCategories] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const user = useUserStore((state) => state.user.user);
  const isLoggedIn = !!user.id;


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

  const { data: recommended, isLoading: recommendedLoading } = useQuery({
          queryKey: ['recommended-products', page, pageSize, search, categories],
          queryFn: () => recommendedProducts({ paginationData: { page, pageSize, search, categories } }),
      })

  const { mutate } = useMutation({
    mutationFn: (interactionData: InteractionData) => updateUserInteractions(interactionData),
    mutationKey: ['update-interactions'],
  })

  function handleMutation(id: string) {
    const interactionData: InteractionData = {
      interactionType: "VIEW",
      productIds: [id]
    }
    if (isLoggedIn) {
      mutate(interactionData);
    }
  }

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
    <>
      <div className="w-full  md:w-[98%] mx-auto h-[400px] relative rounded-md overflow-y-auto">
        <Image fill src={"/banner.png"} alt={"thrift store banner"} style={{ objectFit: "cover" }} className="rounded-md" />
      </div>
      {isLoggedIn && (
        <div className="w-full md:w-[98%] mx-auto flex justify-end pt-2">
          <Button
            onClick={() => setOpenModal(true)}
            className="bg-[#8b6f47] hover:bg-[#6b4c2e] text-white rounded px-6 py-2 mb-4 items-end"
          >
            + Add Product
          </Button>
        </div>
      )}
      <CreateProductModal mode='create' open={openModal} onClose={() => setOpenModal(false)} />

      {/* recommended */}
      {/* <div>

</div> */}
      <div className="flex flex-col ">
        <div className="w-full md:w-[98%] mx-auto flex justify-between items-center">
          <h2 className="text-2xl">Recommended for you</h2>
          <Link href={'/product/recommended'} className="text-lg underline">View all </Link>
        </div>
          {recommendedLoading && <p>Loading...</p>}
          {!recommended?.data?.data?.length && <NoData />}
        <div className="w-full md:w-[98%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 ">
          { recommended?.data?.data?.slice(0, 4)?.map((product: Product) => (
            <Link href={`/product/${product.id}`} key={product.id} onClick={() => handleMutation(product.id)}>
              <ProductCard data={product} />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="w-full md:w-[98%] mx-auto flex justify-between items-center">
          <h2 className="text-2xl">All Products</h2>
          <Link href={'/product/all-products'} className="text-lg underline">View all </Link>
        </div>
          {isLoading && <p>Loading...</p>}
          {!data?.data?.data?.length && <NoData />}
        <div className="w-full md:w-[98%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {data?.data?.data?.slice(0, 4)?.map((product: Product) => (
            <Link href={`/product/${product.id}`} key={product.id} onClick={() => handleMutation(product.id)}>
              <ProductCard data={product} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
