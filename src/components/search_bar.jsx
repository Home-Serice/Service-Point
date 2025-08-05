import React from 'react';

const SearchBar = ({ placeholder = "Search for services", onSearch }) => {

    const handleSearch = (e) => {
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

  return (
    <div className="relative w-full mb-6 mt-7">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg 
          className="w-5 h-5 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        className="w-full pl-10 py-3 bg-gray-100 rounded-full border border-black-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;