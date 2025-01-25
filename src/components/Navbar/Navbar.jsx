// Navbar.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import SearchResultsList from "../SearchBar/SearchResultsList/SearchResultsList.jsx";
import Logo from "../../assets/logo2.png";
import PushyButton from "../Custom/PushyButton/PushyButton";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import HamburgerSearch from "../HamburgerSearch/HamburgerSearch";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import NavbarDropDownSCN from "../NavbarDropDownSCN/NavbarDropDownSCN";
import useTokenStore from "@/stores/TokenStore";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { getData } from "@/Services/ApiClient/Services";
import Inbox from "../Inbox/Inbox";
import styles from "./Navbar.module.scss";
import inboxstyles from "../Inbox/Inbox.module.scss";
import { Opacity } from "@mui/icons-material";

function Navbar() {
  const { userType } = useProfileStore();
  const { accessToken } = useTokenStore();
  const Navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [results, setResults] = useState({
    users: [],
    startups: [],
    projects: [],
  });
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // Store notification count
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const panelRef = useRef(null); // Ref for the notification panel
  const { avatar, setAvatar } = useProfileStore();

  useEffect(() => {
    getData(`/auth/view_own_baseuser_profile/`).then((data) => {
      setAvatar(`http://localhost:8000${data.base_profile.profile_picture}`);
      // console.log("Aman Man");
    });
  }, []);

  const handleNotificationClick = () => {
    setIsNotificationPanelOpen(() => !isNotificationPanelOpen);
  };

  const handleNotificationCountChange = (count) => {
    setNotificationCount(count);
  };

  const handleOutsideClick = (event) => {
    if (
      panelRef.current &&
      !panelRef.current.contains(event.target) &&
      isNotificationPanelOpen
    ) {
      setIsNotificationPanelOpen(false); // Close panel if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick); // Listen for outside clicks
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Cleanup
    };
  }, [isNotificationPanelOpen]);

  return (
    <>
      <nav
        className={`flex flex-col justify-around top-0 fixed right-0 z-40 w-screen`}
      >
        <div
          className={`flex flex-row ${
            isOpen ? "bg-black" : "bg-bomborange"
          } w-full justify-between items-center px-6 transition-all duration-300`}
          style={{ height: window.innerWidth <= 768 ? "78px" : "60px" }}
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
                className={`absolute top-14 w-[32.7vw] z-50 rounded-b-full shadow-lg ${
                  !isFocused || input === "" ? "hidden" : ""
                }`}
              >
                <SearchResultsList results={results} />
              </div>
            </div>

            <div className={`${styles.mobile} flex gap-[1vw]`}>
              <PushyButton onClick={() => Navigate("/starboard")}>
                استارت‌آپ‌ها
              </PushyButton>

              {accessToken && (
                <div
                  className={`${inboxstyles["notification-icon"]} ${inboxstyles.right}`}
                  onClick={handleNotificationClick}
                  style={{ cursor: "pointer" }}
                >
                  <i className="material-icons dp48">notifications</i>
                  {notificationCount > 0 && (
                    <span className={inboxstyles["num-count"]}>
                      {notificationCount}
                    </span>
                  )}
                </div>
              )}
              {accessToken ? (
                <div className="place-items-center">
                  <ProfileDropDown />
                </div>
              ) : (
                <PushyButton onClick={() => Navigate("/login")}>
                  ورود
                </PushyButton>
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

        <div
          className={`h-12 bg-bomborange w-screen z-[20] place-items-center ${styles.inboxdropdown}`}
          style={{
            transform: Opacity ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <NavbarDropDownSCN />
        </div>
        <HamburgerSearch
          isSliderVisible={isVisible}
          setIsSliderVisible={setIsVisible}
        />
      </nav>

      {/* Render the Inbox component for its side effect of setting notification count */}
      <div className={`${isNotificationPanelOpen ? "visible" : `hidden`}`}>
        <Inbox
          onNotificationCountChange={handleNotificationCountChange}
          onClick={() => setIsNotificationPanelOpen(false)}
        />
      </div>

      {/* {isNotificationPanelOpen && (
        <div ref={panelRef}>
          <Inbox onNotificationCountChange={handleNotificationCountChange} />
        </div>
      )} */}
    </>
  );
}

export default Navbar;
