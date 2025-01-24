import styles from "./Signup.module.scss";

import loginimage from "../../assets/loginpage.png";
import SignupForm from "@/components/Forms/SignupForm/SignupForm";
import HomeButton from "@/components/HomeButton/HomeButton";

function Signup() {
	return (
		<>
			<HomeButton className="translate-x-[-83vw] translate-y-[5vh]" />
			<div className={styles.signup_container}>
				<SignupForm />
				<img className={styles.bg_img} src={loginimage} alt="login" />
			</div>
		</>
	);
}

export default Signup;
