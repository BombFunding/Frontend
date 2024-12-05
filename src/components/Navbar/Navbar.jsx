import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import useTokenStore from "@/stores/TokenStore";
import styles from "./Navbar.module.scss";
import PushyButton from "../Custom/PushyButton/PushyButton";
import NavbarDropDown from "../NavbarDropdown/NavbarDropDown";
function Navbar() {
  const Navigate = useNavigate();
  const TOKEN = useTokenStore((state) => state.accessToken);
  return (
    <nav className="flex justify-around bg-bomborange w-screen h-24 top-0 fixed right-0 z-50 gap-1">
      <div className="flex bg-bomborange w-screen h-12 fixed">
        <div className="container px-4 py-6 flex justify-between items-center">
          <div
            className="flex text-white hover:cursor-pointer"
            onClick={() => Navigate("/")}
          >
            <img
              src={Logo}
              alt="Bomb Funding"
              className="rounded-full w-10 h-10 place-self-center mix-blend-multiply"
            />
            <a className="font-extrabold text-xs text-left px-0 place-self-center w-10 text-bombblack">
              Bomb Funding
            </a>
          </div>
          <SearchBar className={styles.SearchBar} />
          <div className="flex">
            {TOKEN ? (
              <ProfileDropDown />
            ) : (
              <PushyButton onClick={() => Navigate("/login")}>
                Login
              </PushyButton>
            )}
          </div>
        </div>
      </div>
      <div className="h-12">
        <NavbarDropDown />
      </div>
    </nav>
  );
}

export default Navbar;
