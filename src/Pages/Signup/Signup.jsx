import styles from "./Signup.module.scss";

import loginimage from "../../assets/loginpage.png";
import SignupForm from "@/components/Forms/SignupForm/SignupForm";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function Signup() {
	const Navigate = useNavigate();
	return (
		<>
			<div className={styles.signup_container}>
				<SignupForm />
				<img className={styles.bg_img} src={loginimage} alt="login" />
			</div>
			<button onClick={()=>Navigate("/")} className="font-vazirmatn text-black rounded-full bg-bomborange place-content-center place-items-center place-self-center text-center absolute w-[4vw] h-[4vw] z-[50] translate-x-[5vw] translate-y-[-12vh]" >
				<HomeIcon />
			</button>
		</>
	);
}

export default Signup;
