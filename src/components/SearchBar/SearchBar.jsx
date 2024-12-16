import { getData } from "@/Services/ApiClient/Services";
import { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";

let items = [
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
  const [isClear, setIsClear] = useState(true);
  const navigate = useNavigate();
  function handleSearchFocus() {
    setSearchFocused(!searchFocused);
  }
  // const handleOnSearch = (string, results) => {
  //   // console.log(string, results);
  //   getData("/search/user/").then((data) => {
  //     results = data;
  //   });

  //   console.log(results);
  // };
  const handleOnSearch = async (string, results) => {
    // if (!string) return;
    try {
      // Fetch the data from the backend
      console.log(string);
      const data = await getData(
        `/search/user?search=${encodeURIComponent(string)}`
      );

      // Update results with the fetched data
      results.splice(0, results.length, ...data); // Update `results` array in place if it's reactive or shared.
      // items = results;
      console.log(items);
      console.log(results); // Log updated results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
    navigate(`/profile/${item.username}`);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    setIsClear(true);
  };

  const formatResult = (item) => {
    // console.log(`item: ${item}`);
    return (
      <div className="flex flex-col mr-5 w-[330px] font-vazirmatn text-right">
        {/* <span className="result-span">{item.id}</span> */}
        <div className="flex flex-row place-self-end gap-48">
          <div className="">{item.username}</div>
          <label>:نام کاربری</label>
        </div>
        <div className="flex flex-row place-self-end gap-48">
          {/* {item.user_type === "startup" && (
            <div>
              <label>:نوع استارت آپ</label>
              <div>salam</div>
            </div>
          )} */}
          <div className="">{item.user_type}</div>
          <label>:نوع کاربر</label>
        </div>
        {/* <Separator className="w-[20vw] mt-5 opacity-40" /> */}

        {/* <span className="result-span">name: {item.startup_category}</span> */}
      </div>
    );
  };
  return (
    <div className={`relative ${className}`}>
      {/* <svg
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
			</svg> */}
      {/* <input
				placeholder="...جست و جو"
				className="font-vazirmatn h-8 w-56 text-[18px] focus:w-72 shadow-lg focus:border-solid focus:border-[3px] focus:outline-none focus:border-white px-5 py-3 rounded-xl transition-all outline-none"
				name="search"
				onFocus={handleSearchFocus}
				onBlur={handleSearchFocus}
			/> */}
      {/* <ReactSearchAutocomplete /> */}
      <div className="w-[400px]">
        <ReactSearchAutocomplete
          formatResult={formatResult}
          items={items}
          maxResults={15}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          onClear={handleOnClear}
          resultStringKeyName="username"
          placeholder="...جست و جو"
          // showIcon={false}
          // onChange={console.log("change")}
          // className="z-[500] absolute"
          // fuseOptions={{ keys: ["name", "description"] }} // Search in the description text as well
          styling={{
            backgroundColor: "#2C2727",
            padding: "10px",
            height: "40px",
            color: "white",
            textalign: "right",
            // padding: "5px",
            borderRadius: "15px",
            // overflow: "hidden",
          }} // To display it on top of the search box below
        />
      </div>
    </div>
  );
}
export default SearchBar;

// import { useState } from "react";
// import { FaSearch } from "react-icons/fa";

// import "./SearchBar.css";

// const SearchBar = ({ setResults }) => {
//   const [input, setInput] = useState("");

//   const fetchData = (value) => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((json) => {
//         const results = json.filter((user) => {
//           return (
//             value &&
//             user &&
//             user.name &&
//             user.name.toLowerCase().includes(value)
//           );
//         });
//         setResults(results);
//       });
//   };

//   const handleChange = (value) => {
//     setInput(value);
//     fetchData(value);
//   };

//   return (
//     <div className="input-wrapper w-[10px] text-black">
//       <FaSearch id="search-icon" />
//       <input
//         placeholder="Type to search..."
//         value={input}
//         onChange={(e) => handleChange(e.target.value)}
//       />
//     </div>
//   );
// };

// export default SearchBar;
