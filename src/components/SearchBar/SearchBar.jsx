import { useState } from "react";

function SearchBar() {
	const [searchFocused, setSearchFocused] = useState(false);
	function handleSearchFocus() {
		setSearchFocused(!searchFocused);
	}
	return (
		<div className="relative">
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
			<input
				placeholder="...جست و جو"
				className="input font-vazirmatn h-8 w-56 text-[18px] focus:w-72 shadow-lg focus:border-solid focus:border-[3px] focus:outline-none focus:border-white px-5 py-3 rounded-xl transition-all outline-none"
				name="search"
				onFocus={handleSearchFocus}
				onBlur={handleSearchFocus}
			/>
		</div>
	);
}
export default SearchBar;
