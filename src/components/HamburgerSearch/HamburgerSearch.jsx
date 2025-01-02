import { motion } from "framer-motion";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResultsList from "../SearchBar/SearchResultsList/SearchResultsList";
import styles from "./HamburgerSearch.module.scss";
import Logo from "../../assets/logo2.png";
import { IoMdClose } from "react-icons/io";

const SearchSlider = ({ isVisible, onClose }) => {
  const [results, setResults] = useState({
    users: [],
    startups: [],
    projects: [],
  });
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");
  return (
    <motion.div
      initial={{ marginTop: "100vh" }}
      animate={{ marginTop: isVisible ? "0vh" : "100vh" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed left-0 right-0 top-0 bottom-0 z-50 bg-gray-100 text-black"
    >
      <div className="flex flex-col h-full">
        <header className="flex justify-between items-center p-4 border-b border-neutral-700">
          <a className="flex" href="/">
            <img
              src={Logo}
              alt="Bomb Funding"
              className="rounded-full w-[8.5vw] h-[8.5vw] mix-blend-multiply mx-[0.5vw]"
            />
          </a>
          <button
            className="text-2xl px-3 py-1 rounded-lg transition-all"
            onClick={onClose}
          >
            <IoMdClose className="text-red-700" />
          </button>
        </header>
        <div className={`${styles.searchbar} flex flex-col place-items-center`}>
          <SearchBar
            setResults={setResults}
            setIsFocused={setIsFocused}
            setInput={setInput}
          />
          {/* <SearchResultsList results={results} className={"z-50 hidden"} /> */}
          <div
            // className={`absolute top-14 w-[32.7vw] z-50 rounded-b-full shadow-lg ${
            //   true == "" ? "hidden" : ""
            // }`}
            className={`absolute top-28 w-[90vw] z-50 rounded-b-full shadow-lg ${
              styles.listContainer
            } ${!isFocused || input == "" ? "" : ""}`}
          >
            <SearchResultsList results={results} />
          </div>
        </div>
        <footer className="p-4 text-center">
          <p>Search Footer (Optional)</p>
        </footer>
      </div>
    </motion.div>
  );
};

const HamburgerSearch = ({ isSliderVisible, setIsSliderVisible }) => {
  //   const [isSliderVisible, setIsSliderVisible] = useState(false);

  const toggleSlider = () => {
    setIsSliderVisible((prev) => !prev);
  };

  return <SearchSlider isVisible={isSliderVisible} onClose={toggleSlider} />;
};

export default HamburgerSearch;
