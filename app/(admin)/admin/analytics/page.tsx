import AnalyticsCard from "@/components/common/AnalyticsCard"

const AdminSalesAnalytics = () => {
    return <section id="thrift-analytics">
        {/* analytics content */}
        <div>
            <h1 className="text-4xl">📊 Analytics Dashboard</h1>
            <div className="flex gap-5 mb-30">
                <AnalyticsCard title="Total Sales" amount={12430} />
                <AnalyticsCard title="Total Orders" amount={1234} />
                <AnalyticsCard title="Total Customers" amount={567} />
                <AnalyticsCard title="Avg Order Value" amount={45.2} />
            </div>
        </div>
        {/* sales overview */}

        {/* top categories */}
    </section>
}

export default AdminSalesAnalytics