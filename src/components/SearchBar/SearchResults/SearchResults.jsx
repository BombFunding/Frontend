import "./SearchResult.css";

export default function SearchResult({ result }) {
  return (
    <div
      className="search-result cursor-pointer bg-inherit"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
}

// export default SearchResult;
