export const Footer  = () => {
    return (
        <footer className="sticky bottom-0 w-full ">
            <div className="w-full flex  gap-1 justify-center items-center py-4 bg-[#fdfaf5] shadow-lg">
                <strong>Thrift Store</strong>
                <p>&copy; {new Date().getFullYear()} <strong>Thrift Store</strong>. All rights reserved.</p>
            </div>
        </footer>
    )
}