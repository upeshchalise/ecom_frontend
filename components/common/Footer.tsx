export const Footer  = () => {
    return (
        <footer>
            <div className="w-full flex  gap-1 justify-center items-center py-4 px-4 fixed bottom-0 bg-white shadow-lg">
                <strong>Thrift Store</strong>
                <p>&copy; {new Date().getFullYear()} <strong>Thrift Store</strong>. All rights reserved.</p>
            </div>
        </footer>
    )
}