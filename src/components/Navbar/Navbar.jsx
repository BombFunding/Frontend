import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import useTokenStore from "@/stores/TokenStore";
import styles from "./Navbar.module.scss";
import PushyButton from "../Custom/PushyButton/PushyButton";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import { useState } from "react";
function Navbar() {
  const Navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const TOKEN = useTokenStore((state) => state.accessToken);
  return (
    <nav
      className={`bg-${
        !isOpen ? "bomborange" : "neutral-950"
      } flex justify-around w-screen h-12 top-0 fixed right-0 z-50`}
    >
      <div className="container px-4 py-6 flex justify-between items-center">
        <div
          className="flex text-white hover:cursor-pointer"
          onClick={() => Navigate("/")}
        >
          {!isOpen && (
            <>
              <img
                src={Logo}
                alt="Bomb Funding"
                className="rounded-full w-10 h-10 place-self-center mix-blend-multiply"
              />
              <a className="font-extrabold text-xs text-left px-0 place-self-center w-10 text-bombblack">
                Bomb Funding
              </a>
            </>
          )}
        </div>
        <SearchBar className={`${styles.SearchBar}`} />
        <div className={`${styles.mobile} flex`}>
          {TOKEN ? (
            <ProfileDropDown />
          ) : (
            <PushyButton onClick={() => Navigate("/login")}>Login</PushyButton>
          )}
        </div>
        <HamburgerMenu isOpen={isOpen} setOpen={setOpen} mode={"sm:hidden"} />
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
