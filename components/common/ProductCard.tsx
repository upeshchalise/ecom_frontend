import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

export const ProductCard = () => {
    return (
        
        <Card className="!px-0">
  {/* <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader> */}
  <CardContent>
    <div className="w-full h-[200px] relative rounded-md">
        <Image fill src={"/banner.png"} alt={"thrift store banner"}  style={{objectFit: "cover"}} className="rounded-md"/>
        </div>
  </CardContent>
  <CardFooter className="flex flex-col gap-2 bg-white items-start w-full">
    {/* <p>Card Footer</p> */}
    <div className="flex justify-between w-full gap-2 font-semibold text-lg">
        <p>Product name</p>
        <p>$100</p>
    </div>
    <div>
        product description
    </div>
  </CardFooter>
</Card>

    )
}