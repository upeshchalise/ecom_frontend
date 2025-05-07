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
    </>
  );
}
