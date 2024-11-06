import useLoginStore from "@/stores/LoginStore";
import logo from "@/assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import CustomInput from "@/components/Custom/CustomInput";
import PasswordInput from "@/Pages/Login/PasswordInput";
import DrawerButton from "@/components/DrawerButton";
import styles from "./SignupForm.module.scss";

function SignupForm({ className }) {
	const navigate = useNavigate();
	const { usernameEmail, password, updateUsernameEmail, updatePassword } =
		useLoginStore();
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			Signup(e);
		}
	}
	function Signup(e) {
		e.preventDefault();
		console.log(usernameEmail, password);
		// axios({
		// 	method: "post",
		// 	url: "http://127.0.0.1:8000/auth/register/",
		// 	data: {
		// 		username: usernameEmail,
		// 		password: password,
		// 	},
		// });
	}
	return (
		<form className={styles.form_style} onSubmit={(e) => Signup(e)}>
			<img className="mix-blend-darken h-0" src={logo} alt="logo" />
			<div className="text-black m-4 text-xl">خوش آمدید</div>
			<div className="text-black text-xs text-center">
				برای ثبت نام اطلاعات خود را وارد کنید
			</div>
			<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
				ایمیل یا نام کاربری
			</Label>
			<CustomInput
				placeholder="Email or Username"
				autofocus="true"
				onKey={(e) => handleKeyDown(e)}
			/>
			<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
				رمز عبور
			</Label>
			<PasswordInput handleKeyDown={handleKeyDown} />
			<div
				onClick={() => navigate("/login")}
				className="text-xs text-bombgray cursor-pointer hover:text-black"
			>
				قبلا ثبت نام کرده‌اید؟
			</div>
			<DrawerButton onClick={Signup}>ثبت نام</DrawerButton>
		</form>
	);
}

export default SignupForm;
