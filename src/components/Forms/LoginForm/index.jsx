import logo from "@/assets/logo.png";
import useLoginStore from "@/stores/LoginStore";
import { Label } from "@radix-ui/react-label";
import CustomInput from "@/components/Custom/CustomInput";
import PasswordInput from "@/Pages/Login/PasswordInput";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import DrawerButton from "@/components/DrawerButton";

function LoginForm({ className }) {
	const navigate = useNavigate();
	const { usernameEmail, password, updateUsernameEmail, updatePassword } =
		useLoginStore();
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			Login(e);
		}
	}
	function Login(e) {
		e.preventDefault();
		console.log(usernameEmail, password);
	}
	return (
		<form className={styles.form_style} onSubmit={(e) => Login(e)}>
			<img className="mix-blend-darken h-0" src={logo} alt="logo" />
			<div className="text-black text-xl">خوش آمدید</div>
			<div className="text-black m-4 text-xs text-center">
				برای ورود اطلاعات خود را وارد کنید
			</div>
			<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
				ایمیل یا نام کاربری
			</Label>
			<CustomInput
				value={usernameEmail}
				update={(e) => updateUsernameEmail(e.target.value)}
				placeholder="Email or Username"
				autofocus={true}
				onKey={(e) => handleKeyDown(e)}
			/>
			<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
				رمز عبور
			</Label>
			<PasswordInput
				value={password}
				update={(e) => updatePassword(e.target.value)}
				handleKeyDown={handleKeyDown}
			/>
			<div
				onClick={() => navigate("/signup")}
				className="text-xs text-bombgray cursor-pointer hover:text-black"
			>
				حساب کاربری ندارید؟
			</div>
			<DrawerButton onClick={Login}>ورود</DrawerButton>
		</form>
	);
}

export default LoginForm;
