import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../Custom/LogoutButton/LogoutButton";
import HomeButton from "../Custom/HomeButton/HomeButton";
import NavbarLogin from "../Custom/NavbarLogin/NavbarLogin";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import { useState } from "react";
function Navbar() {
	const Navigate = useNavigate();
	const [loggedIn, setLoggedIn] = useState(true);
	return (
		<nav className="flex justify-around bg-bomborange w-screen h-14 top-0 fixed right-0">
			<div className="container px-4 py-6 flex justify-between items-center">
				<div
					className="flex text-white hover:cursor-pointer"
					onClick={() => Navigate("/")}
				>
					<img
						src={Logo}
						alt="Bomb Funding"
						className="rounded-full w-10 h-10 place-self-center"
					/>
					<a className="font-extrabold text-sm text-left px-2 place-self-center w-10 text-bombblack">
						Bomb Funding
					</a>
				</div>
				<SearchBar />
				<div className="flex h-full gap-2">
					<HomeButton />
					{/* <LogoutButton /> */}
					{loggedIn ? <ProfileDropDown /> : <NavbarLogin />}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
