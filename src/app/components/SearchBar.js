import React from 'react';

const SearchBar = ({ onSearch, filterText }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Suche nach Bier..."
        onChange={(e) => onSearch(e.target.value)}
        value={filterText}
      />
    </div>
  );
};

export default SearchBar;
