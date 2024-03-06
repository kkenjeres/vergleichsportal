"use client";
import React from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import BackButton from "../../ui/BackButton";
import Head from "next/head";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RiArrowRightUpLine } from "react-icons/ri";

import Link from "next/link";
const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductPage = () => {
  const { id } = useParams();
  const { data: product, error } = useSWR(`/api/sheets/?id=${id}`, fetcher);

  if (error) return <div>Failed to load</div>;
  // Проверяем, загружен ли продукт и имеет ли поле image
  if (!product || !product.image) {
    return <Skeleton height={300} />;
  }

  // Обрабатываем поле image, чтобы учесть возможность множественных URL
  const imageUrls = product.image.split(",").map((url) => url.trim());
  const firstImageUrl = imageUrls[0];

  // Применяем преобразования URL для высокого качества изображения
  const highQualityImageURL = firstImageUrl
    .replace("/15_15/", "/860_860/")
    .replace("/15_21/", "/860_860/")
    .replace("/v-w-480-h-360", "/v-w-860-h-860");

  return (
    <section className="h-full bg-gray-100">
      <Head>{/* Meta tags as before */}</Head>
      <div className=" mx-auto px-4 py-6">
        <BackButton />
        <div className="w-full max-w-4xl mx-auto">
          {product ? (
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="relative h-56 md:h-96">
                <Image
                  src={highQualityImageURL}
                  layout="fill"
                  objectFit="contain"
                  alt={product.name}
                  unoptimized={true}
                />
              </div>
              <div className="p-4 md:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {product.name}
                </h1>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-4">
                  <span className="text-lg md:text-xl font-semibold text-green-600">
                    {product.discountPrice}€
                  </span>
                  <span className="text-md text-gray-500 line-through mt-2 md:mt-0">
                    {product.originalPrice}€
                  </span>
                </div>
                <p className="text-gray-600">{product.store}</p>
                <Link href={product.url} target="_blank">
                  <small className="flex items-center underline my-3">
                    Zum Shop gehen
                    <RiArrowRightUpLine />
                  </small>
                </Link>
                <p className="text-sm text-gray-400 mt-2">
                  Updated on:{" "}
                  {new Date(product.updateDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-xl rounded-lg overflow-hidden p-4 md:p-6">
              <Skeleton height={300} />
              <div className="space-y-4 mt-4">
                <Skeleton count={1} height={30} />
                <Skeleton count={1} height={20} />
                <Skeleton count={1} height={20} width={`80%`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
