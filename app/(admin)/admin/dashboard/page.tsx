'use client';

import AdminCard from "@/components/common/AdminCards";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {

    const router = useRouter();

    return (
        <section className="p-6 bg-[#f5f0e6] min-h-screen">
            <div className="bg-[#e3d2b9] rounded-md p-6 mb-6 flex justify-between items-center shadow-sm">
                <div>
                    <h1 className="text-3xl font-bold text-[#5b3e1d]">Admin Dashboard</h1>
                    <p className="text-[#7a6244] mt-1">See users, product, analytics and category management.</p>
                </div>
                <button className="bg-[#7a6244] text-white px-4 py-2 rounded hover:bg-[#5b3e1d] transition">
                    + Add Category
                </button>
            </div>

            {/* Admin Control Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AdminCard title="Manage Categories" description="Add, update or remove product categories." onClick={()=>
                    router.push("/admin/categories")
                } />
                <AdminCard title="User Accounts" description="View and manage all user accounts." onClick={()=> router.push("/admin/users")}/>
                {/* <AdminCard title="Orders" description="Monitor and track all product orders." /> */}
                <AdminCard title="Product Listings" description="Browse all listed products (read-only)." onClick={()=> router.push("/admin/products")}/>
                <AdminCard title="Sales Analytics" description="Visualize platform performance over time." onClick={()=> router.push("/admin/analytics")}/>
                <AdminCard title="Admin Profile" description="Edit admin info and preferences." onClick={()=> router.push("/admin/profile")}/>
            </div>
        </section>
    );
};

export default AdminDashboard;
