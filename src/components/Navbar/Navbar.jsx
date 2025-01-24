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
import HamburgerSearch from "../HamburgerSearch/HamburgerSearch";
import inboxstyles from '../Inbox/Inbox.module.scss';

function Navbar() {
  const { userType } = useProfileStore();
  const Navigate = useNavigate();
  const { accessToken } = useTokenStore();
  const [isOpen, setOpen] = useState(false);
  const [results, setResults] = useState({
    users: [],
    startups: [],
    projects: [],
  });
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { avatar, setAvatar } = useProfileStore();
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false); // اضافه کردن state برای کنترل پنل اعلان

  useEffect(() => {
    getData(`/auth/view_own_baseuser_profile/`).then((data) => {
      console.log("navbar: ", data);
      setAvatar(`http://localhost:8000${data.base_profile.profile_picture}`);
    });
  }, []);

  const handleNotificationClick = () => {
    setIsNotificationPanelOpen((prev) => !prev); // تغییر وضعیت پنل اعلان
  };

  return (
    <>
      <nav className={`flex flex-col justify-around top-0 fixed right-0 z-40 w-screen`}>
        <div
          className={`flex flex-row ${isOpen ? "bg-black" : "bg-bomborange"} w-full justify-between items-center px-6 transition-all duration-300`}
          style={{ height: window.innerWidth <= 768 ? '78px' : '60px' }}
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
                mode="desktop"
              />
              <div
                className={`absolute top-14 w-[32.7vw] z-50 rounded-b-full shadow-lg ${!isFocused || input === "" ? "hidden" : ""}`}
              >
                <SearchResultsList results={results} />
              </div>
            </div>

            <div className={`${styles.mobile} flex gap-[1vw]`}>
              <PushyButton onClick={() => Navigate("/starboard")}>
                استارت‌آپ‌ها
              </PushyButton>

              <div className={`${inboxstyles['notification-icons']}`}>
                {accessToken && (
                  <>
                    {userType === "startup" && (
                      <>
                        <div
                          className={`${inboxstyles['notification-icon']} ${inboxstyles.right}`}
                          onClick={handleNotificationClick}
                            style={{ cursor: 'pointer' }} // تغییر حالت موس به حالت کلیک
// مدیریت کلیک برای باز و بسته کردن پنل اعلان
                        >
                          <i className="material-icons dp48">notifications</i>
                          <span className={inboxstyles['num-count']}>13</span>
                        </div>
                        <div className={`${inboxstyles['notification-icon']} ${inboxstyles.right}`}>
                          <i className="material-icons dp48">email</i>
                          <span className={inboxstyles['num-count']}>2</span>
                        </div>
                      </>
                    )}
                    {userType !== "startup" && (
                      <div className={`${inboxstyles['notification-icon']} ${inboxstyles.right}`}>
                        <i className="material-icons dp48">notifications</i>
                        <span className={inboxstyles['num-count']}>13</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {accessToken ? (
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
              token={accessToken}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />
          </div>
        </div>

        {/* پنل اعلان */}
        <div
          className={`h-12 bg-bomborange w-screen z-[-20] place-items-center ${styles.dropdown}`}
          style={{ transform: isNotificationPanelOpen ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.3s ease-in-out' }} // انیمیشن پنل
        >
          <NavbarDropDownSCN />
        </div>
        <HamburgerSearch
          isSliderVisible={isVisible}
          setIsSliderVisible={setIsVisible}
        />
      </nav>

      {/* پنل اعلان‌ها */}
      {isNotificationPanelOpen && (
        <div className={inboxstyles["notification-container"]}>
          <h3>
            Notifications
            <i className="material-icons dp48 right">settings</i>
          </h3>

          <input className={inboxstyles["checkbox"]} type="checkbox" id="size_1" value="small" checked />
          <label className={inboxstyles["notification"] + " " + inboxstyles["new"]} htmlFor="size_1">
            <em>1</em> new <a href="">guest account(s)</a> have been created.
            <i className="material-icons dp48 right">clear</i>
          </label>

          <input className={inboxstyles["checkbox"]} type="checkbox" id="size_2" value="small" checked />
          <label className={inboxstyles["notification"] + " " + inboxstyles["new"]} htmlFor="size_2">
            <em>3</em> new <a href="">lead(s)</a> are available in the system.
            <i className="material-icons dp48 right">clear</i>
          </label>

          <input className={inboxstyles["checkbox"]} type="checkbox" id="size_3" value="small" checked />
          <label className={inboxstyles["notification"]} htmlFor="size_3">
            <em>5</em> new <a href="">task(s)</a>.
            <i className="material-icons dp48 right">clear</i>
          </label>

          <input className={inboxstyles["checkbox"]} type="checkbox" id="size_4" value="small" checked />
          <label className={inboxstyles["notification"]} htmlFor="size_4">
            <em>9</em> new <a href="">calendar event(s)</a> are scheduled for today.
            <i className="material-icons dp48 right">clear</i>
          </label>

          <input className={inboxstyles["checkbox"]} type="checkbox" id="size_5" value="small" checked />
          <label className={inboxstyles["notification"]} htmlFor="size_5">
            <em>1</em> blog post <a href="">comment(s)</a> need approval.
            <i className="material-icons dp48 right">clear</i>
          </label>
        </div>
      )}
    </>
  );
}

export default Navbar;
