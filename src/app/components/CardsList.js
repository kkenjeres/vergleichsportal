"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Новое состояние для отслеживания загрузки

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sheets/");
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false); // Указываем, что загрузка завершена
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        item.store.toLowerCase().includes(filterText.toLowerCase())
      ),
    [data, filterText]
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleSearch = useCallback((text) => {
    setFilterText(text);
    setCurrentPage(1);
  }, []);

  const setPage = (page) => {
    setCurrentPage(page);
  };

  if (error) return <div>Failed to load</div>;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(currentPage + 1, totalPages);

  if (currentPage === 1) {
    endPage = Math.min(3, totalPages);
  } else if (currentPage === totalPages) {
    startPage = Math.max(totalPages - 2, 1);
  }

  return (
    <div className="m-auto text-center mt-20 w-[90%] md:w-[80%]">
      <SearchBar onSearch={handleSearch} />
      <div className="m-auto grid grid-cols-2 md:grid-cols-4 gap-2 mt-10">
  {isLoading
    ? Array.from({ length: itemsPerPage }, (_, index) => (
        <div key={index} className="p-4">
          <Skeleton height={200} />
          <Skeleton count={3} />
        </div>
      ))
    : paginatedData.map((item, index) => <Card key={index} data={item} />)
  }
</div>
      <div className="flex justify-center my-20">
        <button
          onClick={() => setPage(Math.max(currentPage - 1, 1))}
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
          onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
