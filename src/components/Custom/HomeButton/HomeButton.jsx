import staticSvg from "./home.svg";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const HomeButton = ({ loggedIn }) => {
	const Navigate = useNavigate();
	return (
		// <button
		// 	// className="place-self-center bg-white border-solid border-4 p-1 rounded-full"
		// 	className="place-self-center bg-white p-1.5 rounded-l-md"
		// 	onClick={()=>Navigate("/")}
		// >
		// 	<img src={staticSvg} alt="Avatar" className="h-5" />
		// </button>
		<button
			className={`overflow-hidden place-items-center h-8 w-20 bg-bomborange align-middle text-bombblack border-none rounded-l-md text-sm font-bold cursor-pointer group ${
				loggedIn ? "left-[28px]" : "left-2"
			}`}
			onClick={() => Navigate("/")}
		>
			<HomeIcon className="h-5 text-black place-self-start absolute top-[7px] left-6" />
			{/* <img
				src={staticSvg}
				alt="Avatar"
				className="h-5 place-self-center"
			/> */}
			<span className="absolute w-36 h-32 -top-8 -left-2 bg-bombblack     rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right" />
			<span className="absolute w-36 h-32 -top-8 -left-2 bg-bombgray  rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700  origin-right" />
			<span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right" />
			<span
				className={`left-[40px] group-hover:opacity-100 group-hover:duration-1000 align-middle duration-100 opacity-0 text-white absolute z-10 place-self-center top-1 text-sm ${
					loggedIn ? "left-[49px]" : "left-[48px]"
				}`}
			>
				<HomeIcon className="h-5 place-self-center text-black" />
				{/* <img
					src={staticSvg}
					alt="Avatar"
					className="h-5 place-self-center"
				/> */}
			</span>
		</button>
	);
};

export default HomeButton;
