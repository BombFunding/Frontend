import { useNavigate } from "react-router-dom";
import styles from "./HomeButton.module.scss";
function HomeButton({ className }) {
	const Navigate = useNavigate();
	return (
		<button
			onClick={() => {
				window.scrollTo(0, 0);
				Navigate("/");
			}}
			className={`${styles.home} ${className}`}
		>
			<svg
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="size-4 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
				/>
			</svg>
		</button>
	);
}

export default HomeButton;
