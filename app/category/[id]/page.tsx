"use client"

import { useParams } from "next/navigation";

const CategoryDetails = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <h1>Category Details : {id}</h1>
        </div>
    )
}

export default CategoryDetails