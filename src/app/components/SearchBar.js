import React from "react";

const SearchBar = ({ onSearch, filterText }) => {
  return (
    <div className="search-bar w-full max-w-xs mx-auto">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        value={filterText}
        className="..."
      />
    </div>
  );
};

export default SearchBar;
