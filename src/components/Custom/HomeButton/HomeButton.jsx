
import staticSvg from "./home.svg";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
	const Navigate = useNavigate();
	return (
		<button
			className="place-self-center bg-white border-solid border-4 p-1 rounded-full"
			onClick={()=>Navigate("/")}
		>
			<img src={staticSvg} alt="Avatar" className="h-5" />
		</button>
	);
};

export default HomeButton;
