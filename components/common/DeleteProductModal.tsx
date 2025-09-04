"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

type DeleteModalProps = {
  onConfirm: () => void;
  trigger: React.ReactNode;
};

export default function DeleteConfirmationModal({
  onConfirm,
  trigger,
}: DeleteModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className={cn(
          "sm:max-w-[500px] border border-[#d6c7b0] bg-[#f9f6f1] shadow-md rounded-xl"
        )}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#4d3c2c] text-2xl">
            <Trash2 className="w-5 h-5 text-[#b8513c]" />
            Delete Product
          </DialogTitle>
          <DialogDescription className="text-[#6c5f4d] text-base">
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            className="border border-[#b8a98d] text-[#4d3c2c] bg-transparent hover:bg-[#ede8df] h-14 max-w-[150px] w-28"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            className="bg-[#b8513c] text-white hover:bg-[#822c0d] h-14 max-w-[150px] w-28"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
