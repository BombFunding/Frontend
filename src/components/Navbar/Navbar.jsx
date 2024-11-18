import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../Custom/LogoutButton/LogoutButton";
import HomeButton from "../Custom/HomeButton/HomeButton";
import NavbarLogin from "../Custom/NavbarLogin/NavbarLogin";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
function Navbar() {
	const Navigate = useNavigate();
	return (
		<nav className="flex justify-around bg-gray-800 w-screen h-14">
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
					<a className="font-bold text-sm text-left px-2 place-self-center w-10 text-bomborange">
						Bomb Funding
					</a>
				</div>
				<SearchBar />
				<div>
					<LogoutButton />
					<HomeButton />
					{/* <NavbarLogin /> */}
					<NavbarLogin />
					<ProfileDropDown />
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
