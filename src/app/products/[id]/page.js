"use client";
import React from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import BackButton from "@/app/ui/BackButton";
import Head from "next/head";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductPage = () => {
  const { id } = useParams();
  const { data: product, error } = useSWR(`/api/sheets/?id=${id}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <section>
       <Head>
        <title>{product ? `${product.name} - Special Offers` : "Loading..."}</title>
        <meta name="description" content={product ? `Check out the amazing deals for ${product.name}. Find the best prices and more details.` : "Product details loading..."} />
        {/* Добавьте другие мета-теги для SEO здесь */}
        <meta property="og:title" content={product ? `${product.name} - Special Offers` : "Loading..."} />
        <meta property="og:description" content={product ? `Discover great deals for ${product.name} with us.` : "Product details loading..."} />
        <meta property="og:image" content={product ? product.image : ""} />
        <meta property="og:type" content="product" />
      </Head>
      <BackButton />

      <div className="rounded-xl border shadow-xl p-2 m-auto flex flex-col">
        {product.image && (
          <Image
            src={
              product.image.includes("/15_15/")
                ? `https:${product.image.replace(/\/15_15\//, "/860_860/")}`
                : `https:${product.image}`
            }
            width={500}
            height={500}
            alt={product.name}
            unoptimized={true}
          />
        )}
        <h1>{product.name}</h1>
        <p>originalPrice: {product.originalPrice}</p>
        <p>discountPrice: {product.discountPrice}</p>
        <p>{product.updateDate}</p>
      </div>
    </section>
  );
};

export default ProductPage;
