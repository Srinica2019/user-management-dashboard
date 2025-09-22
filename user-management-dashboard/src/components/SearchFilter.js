import React from "react";

function SearchFilter({ setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search by name or email"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchFilter;
