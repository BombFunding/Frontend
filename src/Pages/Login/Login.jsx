import styles from "./Login.module.scss";
import loginimage from "../../assets/loginpage.png";
import LoginForm from "@/components/Forms/LoginForm/LoginForm";
import HomeButton from "@/components/HomeButton/HomeButton";

function Login() {
	return (
		<>
			<div className={styles.login_container}>
				<img className={styles.bg_img} src={loginimage} alt="login" />
				<LoginForm />
			</div>
			<HomeButton className="translate-x-[5vw] translate-y-[-12vh]" />
		</>
	);
}

export default Login;
