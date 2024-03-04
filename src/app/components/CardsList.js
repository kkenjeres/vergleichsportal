"use client";
import React, { useState, useMemo } from "react";
import useSWR from "swr";
import Card from "./Card";
import SearchBar from "./SearchBar";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CardList() {
  const [filterText, setFilterText] = useState("");
  const { data, error } = useSWR("/api/sheets/", fetcher);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data
      .filter((item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
      )
      .slice(0, 10);
  }, [data, filterText]);

  const handleSearch = (text) => {
    setFilterText(text);
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="m-auto  text-center mt-20 w-[90%] md:w-[80%]">
      <SearchBar onSearch={handleSearch} filterText={filterText} />
      <h2 className="my-10">
        Current promotions for{" "}
        <span className="underline">{filterText || ""}</span>
      </h2>
      <div className=" m-auto grid grid-cols-2 md:grid-cols-4 gap-2">
        {filteredData.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    </div>
  );
}
