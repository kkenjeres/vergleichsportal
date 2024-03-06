"use client";
// SearchBar.js
import React from "react";
import { useQueryState } from "nuqs";

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useQueryState("name");

  React.useEffect(() => {
    onSearch(name || "");
  }, [name, onSearch]);

  const handleChange = (e) => {
    setName(e.target.value ? e.target.value : null);
  };

  return (
    <div className="search-bar md:w-[80%] mx-auto">
      <input
        type="text"
        placeholder="Suche..."
        onChange={handleChange}
        value={name || ""}
        className="w-full p-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all ease-in-out duration-300 shadow-sm placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;
