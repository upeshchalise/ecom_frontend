"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { AxiosError } from "axios";
import { createCategory } from "@/lib/api/api";

const CategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

type CategoryInput = z.infer<typeof CategorySchema>;

const AddCategoryModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const categoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created");
      reset();
    },
    onError: (error: AxiosError) => {
      toast.error(error.response?.data as string);
    },
  });

  const onSubmit = (data: CategoryInput) => {
    categoryMutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#7a6244] text-white px-4 py-2 rounded hover:bg-[#5b3e1d] transition">
          + Add Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-[#fffaf3]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Category Name"
              className="bg-[#fdfaf5] border-[#b8a98d]"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-[#8b6e4b] hover:bg-[#6e5435] text-white">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
