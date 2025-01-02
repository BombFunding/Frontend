import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import useTokenStore from "@/stores/TokenStore";
import styles from "./Navbar.module.scss";
import PushyButton from "../Custom/PushyButton/PushyButton";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import NavbarDropDown from "../NavbarDropdown/NavbarDropDown";
import { useEffect, useState } from "react";
import SearchResultsList from "../SearchBar/SearchResultsList/SearchResultsList.jsx";
import { getData } from "@/Services/ApiClient/Services";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import NavbarDropDownSCN from "../NavbarDropDownSCN/NavbarDropDownSCN";
function Navbar() {
  const Navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");
  const { avatar, setAvatar } = useProfileStore();
  const TOKEN = useTokenStore((state) => state.accessToken);
  useEffect(() => {
    getData(`/auth/view_own_baseuser_profile/`).then((data) => {
      console.log("navbar: ", data.base_profile.profile_picture);
      setAvatar(`http://104.168.46.4:8000${data.base_profile.profile_picture}`);
      console.log(avatar);
    });
  }, []);
  return (
    <nav
      className={`flex flex-col justify-around h-12 top-0 fixed right-0 z-40 w-screen`}
    >
      <div
        className={`flex flex-row ${
          isOpen ? "bg-black" : "bg-bomborange"
        } w-full h-12 justify-between items-center px-6`}
      >
        <div className="px-4 flex justify-between items-center w-full">
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
          <div className={`${styles.searchbar}`}>
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

          <div className={`${styles.mobile} flex gap-[1vw]`}>
            <PushyButton onClick={() => Navigate("/invesboard")}>
              سرمایه گذاران
            </PushyButton>
            <PushyButton onClick={() => Navigate("/starboard")}>
              استارت‌آپ‌ها
            </PushyButton>
            {TOKEN ? (
              <div className="place-items-center">
                <ProfileDropDown />
              </div>
            ) : (
              <PushyButton onClick={() => Navigate("/login")}>ورود</PushyButton>
            )}
          </div>
          <HamburgerMenu
            isOpen={isOpen}
            setOpen={setOpen}
            mode={"sm:hidden font-vazirmatn"}
            token={TOKEN}
          />
        </div>
      </div>
      <div
        className={`h-12 bg-bomborange w-screen z-[-20] place-items-center ${styles.dropdown}`}
      >
        {/* <NavbarDropDown /> */}
        <NavbarDropDownSCN />
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
