import Image from "next/image"

export const Header = () => {
    return (
        <div className="flex justify-between items-center p-4">
 
        {/* logo */}
        <div className="w-[100px] h-[100px] relative">
                    <Image fill src={ "/thrift-logo.svg"} alt={"Thrift Store"}  style={{objectFit: "contain"}} className="rounded-full h-full"/>
                    </div>
         {/* category */}
        <h1>category</h1>
         {/* search */}
        <h1>search</h1>
         {/* cart and profile */}
        <h1>cart and profile</h1>
         {/* login */}
        </div>
    )
}