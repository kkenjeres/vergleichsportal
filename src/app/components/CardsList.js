"use client";
import React, { useState, useMemo } from "react";
import useSWR from "swr";
import Card from "./Card";
import SearchBar from "./SearchBar";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CardList() {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, error } = useSWR("/api/sheets/", fetcher);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [data, filterText]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleSearch = (text) => {
    setFilterText(text);
    setCurrentPage(1);
  };

  const setPage = (page) => {
    setCurrentPage(page);
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Вычисляем диапазон кнопок для пагинации
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Определяем начальную и конечную страницы диапазона
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(currentPage + 1, totalPages);

  // Если текущая страница близка к краям, корректируем диапазон
  if (currentPage === 1) {
    endPage = Math.min(3, totalPages);
  } else if (currentPage === totalPages) {
    startPage = Math.max(totalPages - 2, 1);
  }

  return (
    <div className="m-auto text-center mt-20 w-[90%] md:w-[80%]">
      <SearchBar onSearch={handleSearch} filterText={filterText} />
      <h2 className="my-10">
        Current promotions{filterText ? `: ${filterText}` : ""}
      </h2>
      <div className="m-auto grid grid-cols-2 md:grid-cols-4 gap-2">
        {paginatedData.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
      <div className="flex justify-center my-20">
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {"<"}
        </button>
        {range(startPage, endPage).map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`mx-1 px-3 py-1 rounded focus:outline-none ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
