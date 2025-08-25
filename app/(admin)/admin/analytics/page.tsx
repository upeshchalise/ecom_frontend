'use client'
import AnalyticsCard from "@/components/common/AnalyticsCard"
import SelectAnalyticsTimeDropdown from "@/components/common/SelectAnalyticsTimeDropdown"
import { salesAnalytics } from "@/lib/api/api"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

const AdminSalesAnalytics = () => {
const [timeRange, setTimeRange] = useState('7days') 

    const { data: analyticsData, isLoading } = useQuery({
        queryKey: ['salesAnalytics', timeRange],
        queryFn: () => salesAnalytics(timeRange),
        enabled: !!timeRange
    })

    if(isLoading) {
        return <div>Loading...</div>
    }
    if(!analyticsData) {
        return <div>No data found</div>
    }
    return <section id="thrift-analytics" className="p-2">
        {/* analytics content */}
        <div className="flex flex-col gap-5 mb-10">
            <div className="flex items-center justify-between">

                <h1 className="text-4xl">📊 Analytics Dashboard</h1>
                <SelectAnalyticsTimeDropdown value={timeRange} onChange={setTimeRange} />
            </div>
            <div className="flex gap-5 mb-30">
                <AnalyticsCard title="Total Sales (Rs.)" amount={analyticsData?.data.total_sales} />
                <AnalyticsCard title="Total Orders (Rs.)" amount={analyticsData?.data.count} />
                <AnalyticsCard title="Total Customers" amount={analyticsData?.data.users} />
                <AnalyticsCard title="Avg Order Value (Rs.)" amount={Number((analyticsData?.data?.total_sales / analyticsData?.data?.count).toFixed(2))||0} />
            </div>
        </div>
        {/* sales overview */}

        {/* top categories */}
    </section>
}

export default AdminSalesAnalytics