"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useUserStore } from "@/lib/store/user";
import { toast } from "sonner";
import axios from "axios";
import useFileUpload from "@/hooks/useFileUpload";
import { MultiSelectCategories } from "./MultiSelectCategories";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  open: boolean;
  onClose: () => void;
  mode: "create" | "update";
  initialData?: Partial<ProductForm>;
  productId?: string;
}

interface ProductForm {
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: string;
  category_ids: string[];
}

interface Category {
  id: string;
  name: string;
}

export const CreateProductModal = ({ open, onClose, mode, initialData, productId }: Props) => {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
    image: "",
    quantity: "",
    category_ids: [],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const queryClient = useQueryClient();

  const { mutate, isPending: isUploading } = useFileUpload();


  useEffect(() => {
    if (mode === "update" && initialData) {
      setForm({
        name: initialData.name ?? "",
        description: initialData.description ?? "",
        price: String(initialData.price ?? ""),
        image: initialData.image ?? "",
        quantity: String(initialData.quantity ?? ""),
        category_ids: initialData.category_ids ?? [],
      });
    }
  }, [initialData, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setForm({ ...form, category_ids: selected });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      mutate(file, {
        onSuccess: (data) => {
          setForm((prev) => ({
            ...prev,
            image: data?.url,
          }));
          toast.success("Image uploaded!");
        },
        onError: (error) => {
          toast.error("Image upload failed");
          console.error("Image upload error:", error);
        },
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = useUserStore.getState().user.token.access_token;

    try {
      const url =
        mode === "create"
          ? "http://localhost:4000/api/admin/product"
          : `http://localhost:4000/api/product/update/${productId}`;

      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        toast.error(`Failed to ${mode === "create" ? "create" : "update"} product`);
        throw new Error("Request failed");
      }

      toast.success(`Product ${mode === "create" ? "created" : "updated"}!`);
      queryClient.invalidateQueries({ queryKey: ['products', productId] });
      onClose();
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#faf6ef] p-6 rounded-lg shadow-md border border-[#e5d9c6] max-w-md">
        <h2 className="text-2xl font-bold text-[#6b4c2e] mb-4 text-center">
          {mode === "create" ? "Add New Product" : "Update Product"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-3 rounded border border-[#e5d9c6] bg-[#fefaf5]"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="p-3 rounded border border-[#e5d9c6] bg-[#fefaf5]"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="p-3 rounded border border-[#e5d9c6] bg-[#fefaf5]"
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className="p-3 rounded border border-[#e5d9c6] bg-[#fefaf5]"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="p-3 rounded border border-[#e5d9c6] bg-[#fefaf5]"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-2 h-24 object-contain rounded border border-[#e5d9c6]"
              />
            )}
          </div>

          <select
            multiple
            value={form.category_ids}
            onChange={handleCategoryChange}
            className="p-3 rounded border border-[#e5d9c6] bg-[#fefaf5] h-32"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {/* <MultiSelectCategories
            selected={form.category_ids}
            onChange={(newIds) =>
              setForm((prev) => ({ ...prev, category_ids: newIds }))
            }
            options={categories}
          /> */}


          <button
            type="submit"
            disabled={isUploading || !form.image}
            className={`py-3 rounded transition ${isUploading || !form.image
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#8b6f47] hover:bg-[#6b4c2e] text-white"
              }`}
          >
            {mode === "create" ? "Create Product" : "Update Product"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
