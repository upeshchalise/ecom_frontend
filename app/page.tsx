import { ProductCard } from "@/components/common/ProductCard";
import Image from "next/image";

export default function Home() {
  return (
    <>
    {/* <div>
      <Image src={"/banner.png"} alt="thrift store banner" width={1920} height={0} className="w-full h-[400px]"/>
    </div> */}
    <div className="w-full  md:w-[98%] mx-auto h-[400px] relative rounded-md">
    <Image fill src={"/banner.png"} alt={"thrift store banner"}  style={{objectFit: "cover"}} className="rounded-md"/>
    </div>
    <div className="w-full md:w-[98%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />

    </div>
    </>
  );
}
