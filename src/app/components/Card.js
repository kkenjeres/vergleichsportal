import Image from "next/image";
export default function Card({ data }) {
  return (
    <div key={data.name} className="rounded-xl border shadow-xl  p-2">
      <Image
        src={
          data.image.includes("/15_15/")
            ? `https:${data.image.replace(/\/15_15\//, "/860_860/")}`
            : data.image.startsWith("//")
            ? `https:${data.image}`
            : data.image
        }
        width={500}
        height={500}
        className="w-full"
        alt={data.name}
        unoptimized={true}
      />
      <div className="mt-10 flex flex-col gap-2">
        <p>{data.name}</p>
        <p>originalPrice: {data.originalPrice}</p>
        <p>discountPrice: {data.discountPrice}</p>
        <p>{data.updateDate}</p>
      </div>
    </div>
  );
}
