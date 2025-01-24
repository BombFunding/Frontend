import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import useTokenStore from "@/stores/TokenStore";
import styles from "./Navbar.module.scss";
import PushyButton from "../Custom/PushyButton/PushyButton";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import NavbarDropDown from "../NavbarDropdown/NavbarDropDown";
import React, { useEffect, useState } from "react";
import SearchResultsList from "../SearchBar/SearchResultsList/SearchResultsList.jsx";
import { getData } from "@/Services/ApiClient/Services";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import NavbarDropDownSCN from "../NavbarDropDownSCN/NavbarDropDownSCN";
import HamburgerSearch from "../HamburgerSearch/HamburgerSearch";
import inboxstyles from '../Inbox/Inbox.module.scss';

function Navbar() {
const [messages, setMessages] = useState([
  { id: "message_1", count: 1, text: '   یک پیام فارسی.' },
  { id: "message_2", count: 2, text: '   یک پیام فارسی.' },
  { id: "message_3", count: 3, text: '   یک پیام فارسی.' },
  { id: "message_4", count: 4, text: '   یک پیام فارسی.' },
  { id: "message_5", count: 5, text: '   یک پیام فارسی.' },
]);

const [notificationCount, setNotificationCount] = useState(messages.length); // مقدار اولیه تعداد پیام‌ها

const handleRemoveMessage = (messageId) => {
  setMessages((prevMessages) => {
    const updatedMessages = prevMessages.filter((message) => message.id !== messageId);
    setNotificationCount(updatedMessages.length); // به‌روزرسانی تعداد اعلان‌ها
    return updatedMessages;
  });
};



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
      setAvatar(`https://bombfundingbackend.liara.run${data.base_profile.profile_picture}`);
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
                      >
                        <i className="material-icons dp48">notifications</i>
                        {notificationCount > 0 && (
                          <span className={inboxstyles['num-count']}>{notificationCount}</span>
                        )}
                      </div>
                      </>
                    )}
                    {userType !== "startup" && (
                                            <div
                        className={`${inboxstyles['notification-icon']} ${inboxstyles.right}`}
                        onClick={handleNotificationClick}
                        style={{ cursor: 'pointer' }} // تغییر حالت موس به حالت کلیک
                      >
                        <i className="material-icons dp48">notifications</i>
                        {notificationCount > 0 && (
                          <span className={inboxstyles['num-count']}>{notificationCount}</span>
                        )}
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
          className={`h-12 bg-bomborange w-screen z-[-20] place-items-center ${styles.inboxdropdown}`}
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
    {notificationCount > 0 ? "اطلاعیه ها" : "هیچ اطلاعیه جدیدی نیست"}
    {/* <i className="material-icons dp48 right">settings</i> */}
  </h3>

          <input className={inboxstyles["checkbox"]} type="checkbox" id="size_1" value="small" checked />
{/* /////////////////////
/////////////////////
///////////////////// */}
{messages.map((message) => (
  <React.Fragment key={message.id}>
    <input
      className={inboxstyles["checkbox"]}
      type="checkbox"
      id={`size_${message.id}`}
      value={`message_${message.id}`}
      checked
    />
    <label
      className={inboxstyles["notification"] + " " + inboxstyles["new"]}
      htmlFor={`size_${message.id}`}
    >
      <em className={inboxstyles["number"]}>{message.count}</em>
      <span className={inboxstyles["text"]} id={`message_${message.id}`}>
        {message.text}
      </span>
      <i
        className="material-icons dp48 right"
        onClick={() => handleRemoveMessage(message.id)}
      >
        clear
      </i>
    </label>
  </React.Fragment>
))}

  {/* /////////////////////
  /////////////////////
  /////////////////////
           */}
          
        </div>
      )}
    </>
  );
}

export default Navbar;
