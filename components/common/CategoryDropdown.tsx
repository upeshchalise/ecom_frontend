"use client"

import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllCategories } from "@/lib/api/api"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

export const CategoryDropdown = () => {
  const [categories, setCategories] = useState<string[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const paramValue = searchParams.get("categories")
    setCategories(paramValue?.split(",").filter(Boolean) || [])
  }, [searchParams])

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  })

  const updateURLParams = (updatedCategories: string[]) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    if (updatedCategories.length > 0) {
      params.set("categories", updatedCategories.join(","))
    } else {
      params.delete("categories")
    }

    router.push(`?${params.toString()}`)
  }

  const toggleCategory = (category: string) => {
    const updated = categories.includes(category)
      ? categories.filter((c) => c !== category)
      : [...categories, category]

    setCategories(updated)
    updateURLParams(updated)
  }

  const clearAll = () => {
    setCategories([])
    updateURLParams([])
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {categories.length > 0
            ? `Selected (${categories.length})`
            : "Select Categories"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2">
        {/* Header with Clear All */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Categories
          </span>
          {categories.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-blue-600 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Scrollable Category List */}
        <div className="max-h-60 overflow-y-auto pr-1 space-y-1">
          {data?.data?.map((category: { id: string; name: string }) => {
            const isSelected = categories.includes(category.name)
            return (
              <div
                key={category.id}
                className="flex items-center justify-between hover:bg-accent px-2 py-1.5 rounded-md cursor-pointer"
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleCategory(category.name)}
                  />
                  <span className="text-sm">{category.name}</span>
                </div>
                {isSelected && <Check className="h-4 w-4 text-green-600" />}
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
