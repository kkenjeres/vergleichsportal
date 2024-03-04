import React from "react";

const SearchBar = ({ onSearch, filterText }) => {
  return (
    <div className="search-bar w-full max-w-xs mx-auto">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        value={filterText}
        className="w-full p-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all ease-in-out duration-300 shadow-sm placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;
