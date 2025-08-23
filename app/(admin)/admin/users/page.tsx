"use client"

import { UserCard } from "@/components/common/UserCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { adminGetAllUsers } from "@/lib/api/api"
import { useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const Users = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [userSearch, setUserSearch] = useState("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    const pageParam = Number(searchParams.get("page")) || 1
    const searchParam = searchParams.get("user") ?? ""
    const pageSizeParam = Number(searchParams.get("pagesize")) || 10

    setPage(pageParam)
    setUserSearch(searchParam)
    setPageSize(pageSizeParam)
  }, [searchParams])

  
  const { data: users, isLoading } = useQuery({
      queryKey: ["adminGetAllUsers", page, pageSize, userSearch],
      queryFn: () =>
        adminGetAllUsers({
            paginationData: { page, pageSize, search: userSearch },
        }),
    })

    useEffect(() => {
      const handler = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString())
  
        if (userSearch.trim() === "") {
          params.delete("user")
        } else {
          params.set("user", userSearch)
        }
  
        params.set("page", "1")
        params.set("pagesize", pageSize.toString())
  
        router.push(`?${params.toString()}`)
      }, 500)
  
      return () => clearTimeout(handler)
    }, [userSearch])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setUserSearch(e.target.value);
};


  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    params.set("pagesize", pageSize.toString())
    if (userSearch.trim()) {
      params.set("user", userSearch)
    }
    router.push(`?${params.toString()}`)
  }

  const totalItems = users?.data?.meta.total_records || 0
  const totalPages = Math.ceil(totalItems / pageSize)

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-center">
        <Input
          type="text"
          placeholder="Search users..."
          value={userSearch}
          onChange={handleSearchChange}
          className="max-w-md bg-amber-50"
        />
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.isArray(users?.data?.data) && users.data.data.length > 0 ? (
            users.data.data.map((user) => (
              <UserCard
                key={user.id}
                name={`${user.firstName} ${user.lastName}`}
                image={user.image}
              />
            ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground">
                No users found.
              </div>
            )}
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
      )}
    </div>
  )
}

export default Users
