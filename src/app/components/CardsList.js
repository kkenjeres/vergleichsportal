"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar"; // Убедитесь, что путь к компоненту SearchBar правильный

export default function CardList() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/api/sheets");
        if (!response.ok) {
          throw new Error("Сетевой ответ был не ok.");
        }
        const newData = await response.json();
        setData(newData);
        setFilteredData(newData);
      } catch (error) {
        console.error("Произошла ошибка при фетчинге:", error);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [filterText, data]);

  const handleSearch = (text) => {
    setFilterText(text);
  };

  return (
    <div className="m-auto w-full text-center mt-20">
      <SearchBar onSearch={handleSearch} filterText={filterText} />
      <h2>Aktuelle Aktionen zu “{filterText || ""}”</h2>
      <div className="w-[80%] m-auto grid grid-cols-2 md:grid-cols-4 gap-2">
        {filteredData.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    </div>
  );
}
