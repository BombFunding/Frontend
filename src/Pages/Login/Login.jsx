import styles from "./Login.module.scss";
import loginimage from "../../assets/loginpage.png";
import LoginForm from "@/components/Forms/LoginForm/LoginForm";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function Login() {
	const Navigate = useNavigate();
	return (
		<>
			<div className={styles.login_container}>
				<img className={styles.bg_img} src={loginimage} alt="login" />
				<LoginForm />
			</div>
			<button
				onClick={() => Navigate("/")}
				className="font-vazirmatn text-black rounded-full bg-bomborange place-content-center place-items-center place-self-center text-center absolute w-[4vw] h-[4vw] z-[50] translate-x-[5vw] translate-y-[-12vh]"
			>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="size-6 w-[2vw] h-[2vw]"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
					/>
				</svg>
			</button>
		</>
	);
}

export default Login;
