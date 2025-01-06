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
      {results.startups.length > 0 && (
        <div className="pt-3">
          <label className="font-bold mr-[2vw]">استارت‌آپ‌ها</label>
          <div className={``}>
            {results.startups.map((result, id) => {
              // console.log(result);
              return <SearchResult result={result} key={id} />;
            })}
          </div>
          {/* <Separator className="w-[27vw] place-self-center bg-neutral-400" /> */}
        </div>
      )}

      {/* <Separator className="by-3" /> */}
      {results.users.length > 0 && (
        <div className="pt-3">
          <label className="font-bold mr-[2vw]">سرمایه گذاران</label>
          <div className={``}>
            {results.users.map((result, id) => {
              // console.log(result);
              return <SearchResult result={result} key={id} />;
            })}
          </div>
          {/* <Separator className="w-[50vw] place-self-center bg-neutral-400" /> */}
        </div>
      )}
      {results.projects.length > 0 && (
        <div className="pt-3">
          <label className="font-bold mr-[2vw]">پروژه ها</label>
          <div className={``}>
            {results.projects.map((result, id) => {
              // console.log(result);
              return <SearchResult result={result} key={id} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResultsList;
