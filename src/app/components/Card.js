import Image from "next/image";
import Link from "next/link";
export default function Card({ data }) {
  return (
    <Link
      href={`/products/${data.id}`}
      key={data.name}
      className="rounded-xl bg-white flex flex-col justify-between hover:shadow-xl p-2 hover:scale-[1.01]  transition-all  duration-300"
    >
      <Image
        src={
          data.image.includes("/15_15/")
            ? `https:${data.image.replace(/\/15_15\//, "/860_860/")}`
            : data.image.startsWith("//")
            ? `https:${data.image}`
            : data.image
        }
        width={600}
        height={600}
        className="w-full max-h-[300px]"
        alt={data.name}
        unoptimized={true}
      />
      <div className="mt-10 flex flex-col gap-2">
        <p>{data.name}</p>
        <p>originalPrice: {data.originalPrice}</p>
        <p>discountPrice: {data.discountPrice}</p>
        <p>{data.updateDate}</p>
      </div>
    </Link>
  );
}
