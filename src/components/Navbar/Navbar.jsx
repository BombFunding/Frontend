// Navbar.jsx
import { useEffect, useState, useRef } from "react";
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
import { baseURL, getData } from "@/Services/ApiClient/Services";
import Inbox from "../Inbox/Inbox";
import styles from "./Navbar.module.scss";
import inboxstyles from "../Inbox/Inbox.module.scss";

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
	const [isNotificationPanelOpen, setIsNotificationPanelOpen] =
		useState(false);
	const panelRef = useRef(null); // Ref for the notification panel
	const { avatar, setAvatar } = useProfileStore();
	const [messages, setMessages] = useState([]);
	// const [notificationCount, setNotificationCount] = useState(0);

	// Fetch unread messages from the API
	const fetchOfflineNotifications = async () => {
		try {
			const response = await fetch(
				`${baseURL}/notifications/user-notifications/`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.ok) {
				const offlineMessages = await response.json();

				// Map messages to a standard format
				const formattedMessages = offlineMessages.map((item) => ({
					id: item.id || new Date().getTime(),
					message: item.message || item.text || "پیام آفلاین",
					count: item.count || 1,
				}));

				setMessages((prevMessages) => {
					// Filter out messages that already exist in the state
					const newMessages = formattedMessages.filter(
						(newMessage) =>
							!prevMessages.some(
								(existingMessage) =>
									existingMessage.id === newMessage.id
							)
					);

					// Combine new messages with previous ones
					const updatedMessages = [...prevMessages, ...newMessages];

					// Update the notification count
					setNotificationCount(updatedMessages.length);

					return updatedMessages;
				});
			} else {
				console.error("Failed to fetch offline notifications.");
			}
		} catch (error) {
			console.error("Error fetching offline notifications:", error);
		}
	};

	// console.log(accessToken);

	// useEffect(() => {
	//   fetchOfflineNotifications();
	// }, []);
	const pollingInterval = 500;
	useEffect(() => {
		// Start polling for real-time notifications
		const interval = setInterval(() => {
			fetchOfflineNotifications();
		}, pollingInterval);

		// Clean up the interval on component unmount
		return () => clearInterval(interval);
	}, [accessToken]);

	useEffect(() => {
		setNotificationCount(messages.length);
	}, [messages]);
	// console.log("ref");

	useEffect(() => {
		getData(`/auth/view_own_baseuser_profile/`).then((data) => {
			setAvatar(`${baseURL}${data.base_profile.profile_picture}`);
		});
	}, [accessToken]);

	const handleNotificationClick = () => {
		setIsNotificationPanelOpen((prev) => !prev);
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
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}

		// Clean up when component unmounts
		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, [isOpen]);
	return (
		<>
			<nav
				className={`flex flex-col justify-between top-0 fixed z-40 w-full`}
			>
				{/* <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16`}
          style={{ height: window.innerWidth <= 641 ? "60px" : "50px" }}
        > */}
				<div
					className={`flex flex-row py-2 pr-4 ${
						isOpen ? "bg-black" : "bg-bomborange"
					} w-full justify-between items-center pl-2 transition-all duration-300`}
					style={{
						height: window.innerWidth <= 641 ? "60px" : "50px",
					}}
				>
					<div
						className={`px-0 flex justify-between items-center w-full`}
					>
						<div
							className={`flex text-white hover:cursor-pointer`}
							onClick={() => Navigate("/")}
						>
							{!isOpen && (
								<>
									<img
										src={Logo}
										alt="Bomb Funding"
										className="rounded-full w-[35px] h-[35px] place-self-center mix-blend-multiply mx-[0.5vw]"
									/>
									<a className="font-extrabold text-[15px] text-left pl-1 pt-2 place-self-center text-bombblack">
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

						<div className={`flex gap-[1vw]`}>
							<div className={`${styles.mobile}`}>
								<PushyButton
									onClick={() => {
										window.scrollTo(0, 0);
										Navigate("/starboard");
									}}
								>
									استارت‌آپ‌ها
								</PushyButton>
							</div>
							{/* <FiInbox /> */}
							{accessToken && (
								<div
									className={`${inboxstyles["notification-icon"]} ${styles.mobile} ${styles.inbox} ${inboxstyles.right}`}
									onClick={handleNotificationClick}
									style={{
										cursor: "pointer",
										height: "32px",
										width: "32px",
										// background: "transparent",
									}}
								>
									<i className="material-icons dp48 bottom-14 translate-x-[-3px] translate-y-[-3px]">
										notifications
									</i>
									{notificationCount > 0 && (
										<span
											className={inboxstyles["num-count"]}
										>
											{notificationCount}
										</span>
									)}
								</div>
							)}
							<div className={`${styles.mobile}`}>
								{accessToken ? (
									<div className="place-items-center">
										<ProfileDropDown />
									</div>
								) : (
									<PushyButton
										onClick={() => Navigate("/login")}
									>
										ورود
									</PushyButton>
								)}
							</div>
						</div>
						<div
							className={`flex flex-row items-center sm:hidden mt-1`}
						>
							{accessToken && (
								<div
									className={`${
										inboxstyles["notification-icon"]
									} ${isOpen ? "hidden" : ""} sm:hidden ${
										styles.inbox
									} ${inboxstyles.right}`}
									onClick={handleNotificationClick}
									style={{
										cursor: "pointer",
										height: "32px",
										width: "32px",
									}}
								>
									<i className="material-icons dp48 bottom-14 translate-x-[-3px] translate-y-[-3px]">
										notifications
									</i>
									{notificationCount > 0 && (
										<span
											className={inboxstyles["num-count"]}
										>
											{notificationCount}
										</span>
									)}
								</div>
							)}
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
				</div>

				<div
					className={`h-12 bg-bomborange w-screen z-[-20] place-items-center ${styles.mobile}`}
				>
					<NavbarDropDownSCN />
				</div>
				<HamburgerSearch
					isSliderVisible={isVisible}
					setIsSliderVisible={setIsVisible}
				/>
			</nav>

			{/* Render the Inbox component for its side effect of setting notification count */}
			{/* <div style={{ display: "none" }}>
        <Inbox onNotificationCountChange={handleNotificationCountChange} />
      </div> */}

			{isNotificationPanelOpen && (
				<div ref={panelRef}>
					<Inbox
						onNotificationCountChange={
							handleNotificationCountChange
						}
						messages={messages}
						setMessages={setMessages}
						notificationCount={notificationCount}
						setNotificationCount={setNotificationCount}
						fetchOfflineNotifications={fetchOfflineNotifications}
					/>
				</div>
			)}
		</>
	);
}

export default Navbar;
