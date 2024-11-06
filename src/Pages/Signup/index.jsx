import styles from "./Signup.module.scss";

import loginimage from "../../assets/loginpage.png";
import SignupForm from "@/components/Forms/SignupForm";

function Signup() {
	return (
		<div className={styles.signup_container}>
			<div className={styles.formstyle}>
				<SignupForm  />
			</div>
			{/* <form>nig</form> */}
			<img className={styles.bg_img} src={loginimage} alt="login" />
		</div>
	);
}

export default Signup;
