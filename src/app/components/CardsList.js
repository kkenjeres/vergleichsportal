"use client";
import React, { useState, useMemo } from "react";
import useSWR from "swr";
import Card from "./Card";
import SearchBar from "./SearchBar"; // Ensure the correct path to SearchBar component

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CardList() {
  const [filterText, setFilterText] = useState("");
  const { data, error } = useSWR("/api/sheets/", fetcher);

  // useMemo to re-calculate the filtered data only when `data` or `filterText` changes

  const handleSearch = (text) => {
    setFilterText(text);
  };
  console.log(data);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="m-auto w-full text-center mt-20">
      <SearchBar onSearch={handleSearch} filterText={filterText} />
      <h2>Current promotions for “{filterText || ""}”</h2>
      <div className="w-[80%] m-auto grid grid-cols-2 md:grid-cols-4 gap-2">
        {data.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    </div>
  );
}
