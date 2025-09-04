import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PopoverPortal } from "@radix-ui/react-popover";

interface Props {
    selected: string[];
    onChange: (newSelected: string[]) => void;
    options: { id: string; name: string }[];
}

export const MultiSelectCategories = ({ selected, onChange, options }: Props) => {
    const toggleCategory = (id: string) => {
        if (selected.includes(id)) {
            onChange(selected.filter((cat) => cat !== id));
        } else {
            onChange([...selected, id]);
        }
    };

    return (
        <Popover >
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className="w-full justify-between flex items-center px-3 py-2 rounded border border-[#e5d9c6] bg-[#fefaf5] text-left"
                >
                    {selected.length > 0
                        ? `${selected.length} selected`
                        : "Select categories"}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </button>
            </PopoverTrigger>
            <PopoverPortal>
                <PopoverContent className="w-full p-0 bg-[#fefaf5] border border-[#e5d9c6] z-[1000]">
                    <Command>
                        <CommandGroup>
                            {options.map((opt) => (
                                <CommandItem
                                    key={opt.id}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        toggleCategory(opt.id);
                                    }}
                                    className="cursor-pointer"
                                >
                                    <div
                                        className={cn(
                                            "mr-2 h-4 w-4 border border-[#b8a98d] rounded-sm flex items-center justify-center",
                                            {
                                                "bg-[#8b6f47] text-white": selected.includes(opt.id),
                                            }
                                        )}
                                    >
                                        {selected.includes(opt.id) && <Check className="w-3 h-3" />}
                                    </div>
                                    {opt.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </PopoverPortal>
        </Popover>
    );
};
