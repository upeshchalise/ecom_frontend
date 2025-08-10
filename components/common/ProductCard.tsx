import Image from "next/image"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Product } from "@/lib/types/response"

export const ProductCard = ({ data }: { data: Product }) => {
  return (

    <Card className="!px-0 h-full">
      <CardContent>
        <div className="w-full h-[200px] relative rounded-md">
          <Image fill src={data?.image ?? "/banner.png"} alt={"thrift store banner"} style={{ objectFit: "cover" }} className="rounded-md" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 bg-white items-start w-full">
        {/* <p>Card Footer</p> */}
        <div className="flex justify-between w-full gap-2 font-semibold text-lg">
          <p>{data?.name}</p>
          <p>Rs. {data?.price}</p>
        </div>
        <div>
          {data?.description}
        </div>
      </CardFooter>
    </Card>

  )
}