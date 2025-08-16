"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentSearch = searchParams.get("search") ?? "";
    setSearch(currentSearch);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
    
        params.set("search", search);
      
      params.set("page", "1"); 
      params.set("pagesize", "20")
      router.push(`?${params.toString()}`);
      
      if(search.trim() === "") {
        params.delete("search")
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="hidden md:block w-[400px]">
      <Input
        type="text"
        placeholder="Search products"
        className="bg-[#fdfaf5]"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};
