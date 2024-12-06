import { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const items = [
  {
    id: 0,
    name: "Cobol",
  },
  {
    id: 1,
    name: "JavaScript",
  },
  {
    id: 2,
    name: "Basic",
  },
  {
    id: 3,
    name: "PHP",
  },
  {
    id: 4,
    name: "Java",
  },
];

function SearchBar({ className }) {
  const [searchFocused, setSearchFocused] = useState(false);
  function handleSearchFocus() {
    setSearchFocused(!searchFocused);
  }
  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  const formatResult = (item) => {
    console.log(item);
    return (
      <div className="result-wrapper">
        <span className="result-span">id: {item.id}</span>
        <span className="result-span">name: {item.name}</span>
      </div>
    );
  };
  return (
    <div className={`relative ${className}`}>
      <svg
        className={`size-4 absolute top-2 left-3 ${
          searchFocused ? "text-bomborange" : "text-gray-500"
        }`}
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      {/* <input
				placeholder="...جست و جو"
				className="input font-vazirmatn h-8 w-56 text-[18px] focus:w-72 shadow-lg focus:border-solid focus:border-[3px] focus:outline-none focus:border-white px-5 py-3 rounded-xl transition-all outline-none"
				name="search"
				onFocus={handleSearchFocus}
				onBlur={handleSearchFocus}
			/> */}
      {/* <ReactSearchAutocomplete /> */}
      <div className="w-[400px] z-50">
        <ReactSearchAutocomplete
          items={items}
          maxResults={15}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          onClear={handleOnClear}
          // fuseOptions={{ keys: ["name", "description"] }} // Search in the description text as well
          styling={{ zIndex: 500 }} // To display it on top of the search box below
        />
      </div>
    </div>
  );
}
export default SearchBar;
