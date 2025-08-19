"use client";

import { Skeleton } from "@/components/ui/skeleton";
import AddCategoryModal from "@/components/common/AddCategoryModal";
import CategoryCard from "@/components/common/CategoryCard";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/lib/api/api";

type Category = {
  id: string;
  name: string;
};

const AdminCategories = () => {

  const router = useRouter();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  console.log("categories", categories)

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6 bg-[#e8dbc5] p-4 rounded-xl shadow">
        <div>
          <h1 className="text-3xl font-bold text-[#5c4425]">Manage Categories</h1>
          <p className="text-[#6e5435]">Add, update or remove product categories.</p>
        </div>
        <AddCategoryModal />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl bg-[#f5ede0]" />
          ))
        ) : (
          categories?.data.map((category: Category) => (
            <CategoryCard key={category.id} name={category.name} productCount={10} onClick={(()=> router.push(`/admin/categories/${category.id}`))}/>
          ))
        )}
      </div>
    </section>
  );
};

export default AdminCategories;
