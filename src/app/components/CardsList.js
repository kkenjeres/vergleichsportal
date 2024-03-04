"use client";
import React from "react";
import useSWR from "swr";
import Card from "./Card";
import SearchBar from "./SearchBar";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CardList() {
  const { data, error } = useSWR("/api/sheets/", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="m-auto text-center mt-20 w-[90%] md:w-[80%]">
      <SearchBar />
      <h2 className="my-10">Current promotions</h2>
      <div className="m-auto grid grid-cols-2 md:grid-cols-4 gap-2">
        {data.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    </div>
  );
}
