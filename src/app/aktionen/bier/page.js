"use client";
import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Head from "next/head";

export default function BeerCardList() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sheets/");
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const rawData = await response.json();
        const beerData = rawData.filter(
          (item) => item.name && item.name.toLowerCase().includes("bier")
        );
        setData(beerData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Общее количество товаров
  const totalItems = data.length;

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const stores = [...new Set(data.map((item) => item.store))].join(", ");

  if (error) return <div>Failed to load</div>;

  return (
    <>
      <Head>
        <title>Aktuelle Bieraktionen - Angebote von {stores}</title>
        <meta
          name="description"
          content={`Entdecken Sie die besten Bieraktionen und Angebote. Finden Sie Aktionen von ${stores} und genießen Sie Ihr Lieblingsbier zu günstigen Preisen.`}
        />
        <meta property="og:title" content="Aktuelle Bieraktionen - Angebote" />
        <meta
          property="og:description"
          content={`Entdecken Sie die besten Bieraktionen und Angebote. Finden Sie Aktionen von ${stores} und genießen Sie Ihr Lieblingsbier zu günstigen Preisen.`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className="m-auto text-center mt-20 w-[90%] md:w-[80%]">
        <p>Alle aktuellen Bier-Aktionen von {stores}. Insgesamt {totalItems} Angebote.</p>
        <div className="m-auto grid grid-cols-2 md:grid-cols-4 gap-2 mt-10">
          {isLoading ? (
            Array.from({ length: itemsPerPage }, (_, index) => (
              <div key={index} className="p-4">
                <Skeleton height={200} />
                <Skeleton count={3} />
              </div>
            ))
          ) : (
            data
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((item, index) => <Card key={index} data={item} />)
          )}
        </div>
        <div className="flex justify-center my-20">
          <button
            onClick={() => handleChangePage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {"< Prev"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handleChangePage(page)}
              className={`mx-1 px-3 py-1 rounded focus:outline-none ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handleChangePage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {"Next >"}
          </button>
        </div>
      </div>
    </>
  );
}
