// import { Button } from "@/components/ui/button";
import styles from "./PushyButton.module.scss";
import { Button } from "@/components/ui/button";
const PushyButton = ({ onClick, children }) => {
	return (
		<Button
			className={styles.login_button}
			onClick={onClick}
		>
			{children}
		</Button>
		// <button
		// 	className="pr-0 overflow-hidden relative w-16 h-8 bg-white text-bombblack border-none rounded-md text-sm font-bold cursor-pointer z-10 group place-self-center text-center content-center"
		// 	onClick={() => Navigate("/login")}
		// >
		// 	Login
		// 	<span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left" />
		// 	<span className="absolute w-36 h-32 -top-8 -left-2 bg-bombgray rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left" />
		// 	<span className="absolute w-36 h-32 -top-8 -left-2 bg-bombblack rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left" />
		// 	<span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 text-white absolute z-10 place-self-center left-3.5 top-1.5 text-sm">
		// 		Login
		// 	</span>
		// </button>
	);
};

export default PushyButton;
