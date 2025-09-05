'use client';
import { CreateProductModal } from "@/components/common/CreateProduct";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { getAllProducts, getProductByUserId, recommendedProducts, updateUserInteractions } from "@/lib/api/api";
import { useUserStore } from "@/lib/store/user";
import { Product } from "@/lib/types/response";
import { InteractionData } from "@/lib/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useSearchParams } from 'next/navigation';

export default function RecommendedProducts() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(20);
    const [categories, setCategories] = useState<string[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const searchParams = useSearchParams();
  const router = useRouter()

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


    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", newPage.toString())
        params.set("pagesize", pageSize.toString())
        if (search.trim()) {
            params.set("search", search)
        }
            router.push(`?${params.toString()}`)

    }
    const totalItems = data?.data?.meta.total_records || 0
    const totalPages = Math.ceil(totalItems / pageSize)

    return (
        <>
            {/* {isLoggedIn && (
                <div className="w-full md:w-[98%] mx-auto flex justify-end">
                    <Button
                        onClick={() => setOpenModal(true)}
                        className="bg-[#8b6f47] hover:bg-[#6b4c2e] text-white rounded px-6 py-2 mb-4 items-end"
                    >
                        + Add Product
                    </Button>
                </div>
            )} */}
            {/* <CreateProductModal mode='create' open={openModal} onClose={() => setOpenModal(false)} /> */}


            <div className="w-full md:w-[98%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {isLoading && <p>Loading...</p>}
                {data?.data?.data?.map((product: Product) => (
                    <Link href={`/product/${product.id}`} key={product.id} onClick={() => handleMutation(product.id)}>
                        <ProductCard data={product} />
                    </Link>
                ))}
                
                   
            </div>
             <div className="flex justify-center gap-4 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>

                        <span className="text-sm flex items-center">
                            Page {page} of {totalPages || 1}
                        </span>

                        <Button
                            variant="outline"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= totalPages}
                        >
                            Next
                        </Button>
                    </div>
                
        </>
    );
}
