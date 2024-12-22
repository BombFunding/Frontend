import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import useTokenStore from "@/stores/TokenStore";
import styles from "./Navbar.module.scss";
import PushyButton from "../Custom/PushyButton/PushyButton";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import NavbarDropDown from "../NavbarDropdown/NavbarDropDown";
import { useState } from "react";
import SearchResultsList from "../SearchBar/SearchResultsList/SearchResultsList.jsx";
function Navbar() {
  const Navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");
  const TOKEN = useTokenStore((state) => state.accessToken);
  return (
    <nav
      className={`flex flex-col justify-around bg-bomborange h-24 top-0 fixed right-0 z-40 w-[100vw] gap-1`}
    >
      <div className="flex flex-row bg-bomborange w-full h-12 justify-between items-center px-6">
        <div className="px-4 py-6 flex justify-between items-center w-full">
          <div
            className="flex text-white hover:cursor-pointer"
            onClick={() => Navigate("/")}
          >
            {!isOpen && (
              <>
                <img
                  src={Logo}
                  alt="Bomb Funding"
                  className="rounded-full w-[2.5vw] h-[2.5vw] place-self-center mix-blend-multiply mx-[0.5vw]"
                />
                <a className="font-extrabold text-[1.5vw] text-left px-0 place-self-center text-bombblack">
                  Bomb Funding
                </a>
              </>
            )}
          </div>
          <div>
            <SearchBar
              setResults={setResults}
              setIsFocused={setIsFocused}
              setInput={setInput}
            />
            {/* <SearchResultsList results={results} className={"z-50 hidden"} /> */}
            <div
              className={`absolute top-14 w-[32.7vw] z-50 rounded-b-full shadow-lg ${
                !isFocused || input == "" ? "hidden" : ""
              }`}
            >
              <SearchResultsList results={results} />
            </div>
          </div>

          <div className={`${styles.mobile} flex`}>
            {TOKEN ? (
              <ProfileDropDown />
            ) : (
              <PushyButton onClick={() => Navigate("/login")}>
                Login
              </PushyButton>
            )}
          </div>
          <HamburgerMenu
            isOpen={isOpen}
            setOpen={setOpen}
            mode={"sm:hidden font-vazirmatn"}
          />
        </div>
      </div>
      <div className="mt-[5vh] h-[2vh] w-[100vw] z-[-20]">
        <NavbarDropDown />
      </div>
    </nav>
  );
}

export default Navbar;

{
  /* <>
  <div class="relative">
    <div class="flex justify-between items-center">
      <div class="flex-1 BaseLayoutSearch_BaseLayoutSearch__QHPTB">
        <div
          data-cro-id="searchbox-click"
          class="flex items-center SearchInput_SearchInput__HB9qi SearchInput_SearchInput__searchInput__CEpaj ellipsis bg-neutral-100 grow rounded px-0 lg:px-4 text-body-2"
        >
          <div class="w-full rounded-full">
            <div class="flex items-center justify-between grow min-w-0 h-9">
              <div class="flex cursor-pointer">
                <svg style="width: 24px; height: 24px; fill: var(--color-icon-low-emphasis);">
                  <use xlink:href="#searchSearch"></use>
                </svg>
              </div>
              <span
                data-cro-id="searchbox-type"
                class="grow px-2 lg:px-4 ellipsis"
              >
                <div class="lg:text-body-2 text-button-1 flex items-center h-full text-body-2 text-neutral-500">
                  جستجو
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>; */
}
