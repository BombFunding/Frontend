import staticSvg from "./home.svg";
import { useNavigate } from "react-router-dom";

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
			className={`overflow-hidden relative h-8 left-3 w-20 bg-bomborange text-bombblack border-none rounded-l-md text-sm font-bold cursor-pointer z-1 group ${
				loggedIn ? "left-4 w-20" : "left-2 w-20"
			}`}
			onClick={()=>Navigate("/")}
		>
			<img
				src={staticSvg}
				alt="Avatar"
				className="h-5 place-self-center"
			/>
			<span className="absolute w-36 h-32 -top-8 -left-2 bg-bombblack     rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right" />
			<span className="absolute w-36 h-32 -top-8 -left-2 bg-bombgray  rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700  origin-right" />
			<span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right" />
			<span
				className={`left-[49px] group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 text-white absolute z-10 place-self-center top-1.5 text-sm ${
					loggedIn ? "left-[49px]" : "left-[48px]"
				}`}
			>
				<img
					src={staticSvg}
					alt="Avatar"
					className="h-5 place-self-center"
				/>
			</span>
		</button>
	);
};

export default HomeButton;
