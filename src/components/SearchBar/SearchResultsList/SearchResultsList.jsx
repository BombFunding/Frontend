import "./SearchResultsList.css";
import styles from "./SearchResultsList.module.scss";
import SearchResult from "../SearchResults/SearchResults.jsx";
import { Separator } from "@/components/ui/separator";

function SearchResultsList({ results }) {
  // console.log(`results: ${results}`);
  return (
    <div
      className={`results-list bg-[#ddd] overflow-hidden overflow-y-scroll hide-scrollbar rounded-[10px] ${styles.test}`}
    >
      {results.startups && (
        <div className="pt-3">
          <label className="font-bold mr-[2vw]">استارت‌آپ‌ها</label>
          <div className={``}>
            {results.startups.map((result, id) => {
              console.log(result);
              return <SearchResult result={result} key={id} />;
            })}
          </div>
        </div>
      )}
      {/* <Separator className="by-3" /> */}
      {results.users && (
        <div className="pt-3">
          <label className="font-bold mr-[2vw]">سرمایه گذاران</label>
          <div className={``}>
            {results.users.map((result, id) => {
              console.log(result);
              return <SearchResult result={result} key={id} />;
            })}
          </div>
        </div>
      )}
      {results.projects && (
        <div className="pt-3">
          <label className="font-bold mr-[2vw]">پروژه ها</label>
          <div className={``}>
            {results.projects.map((result, id) => {
              console.log(result);
              return <SearchResult result={result} key={id} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResultsList;
