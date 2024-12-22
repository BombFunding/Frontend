import "./SearchResultsList.css";
import SearchResult from "../SearchResults/SearchResults.jsx";

function SearchResultsList({ results }) {
  // console.log(`results: ${results}`);
  return (
    <div
      className={`results-list bg-[#ddd] rounded-[10px] overflow-hidden overflow-y-scroll hide-scrollbar`}
    >
      {results.map((result, id) => {
        console.log(result);
        return <SearchResult result={result} key={id} />;
      })}
    </div>
  );
}

export default SearchResultsList;
