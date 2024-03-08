import Image from "next/image";
import Link from "next/link";

export default function Card({ data }) {
  const productNameEncoded = encodeURIComponent(data.name);
  const imageUrls = data.image.split(",").map((url) => url.trim());
  const firstImageUrl = imageUrls[0];

  let highQualityImageURL = firstImageUrl
    .replace("/15_15/", "/860_860/")
    .replace("/15_21/", "/860_860/")
    .replace("/v-w-480-h-360", "/v-w-860-h-860");
  return (
    <Link
      href={`/products/${data.id}/?name=${productNameEncoded}`}
      className="rounded-xl p-4 hover:scale-[1.01] bg-white shadow-md hover:shadow-lg flex flex-col h-full transition-all duration-300 overflow-hidden"
    >
      <div className="relative w-full h-56">
        <Image
          src={highQualityImageURL}
          layout="fill"
          objectFit="cover"
          alt={data.name}
          unoptimized={true}
        />
      </div>
      <div className="flex flex-col justify-between flex-1 mt-4">
        <p className="text-lg font-semibold text-gray-900">{data.name}</p>
        <div>
          <p className="text-sm text-gray-500 line-through">
            {data.originalPrice}
          </p>
          <p className="text-xl font-semibold text-green-600">
            {data.discountPrice}
          </p>
          <p className="text-sm text-gray-500">{data.store}</p>
          <p className="text-xs text-gray-400">
            {new Date(data.updateDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
