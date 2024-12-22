import "./SearchResultsList.css";
import SearchResult from "../SearchResults/SearchResults.jsx";

function SearchResultsList({ results }) {
  console.log(`results: ${results}`);
  return (
    <div
      className={`results-list bg-[#ddd] overflow-hidden overflow-y-scroll hide-scrollbar`}
    >
      {results.map((result, id) => {
        return <SearchResult result={result.name} key={id} />;
      })}
    </div>
  );
}

export default SearchResultsList;
