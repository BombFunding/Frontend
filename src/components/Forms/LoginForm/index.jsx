import { useNavigate } from "react-router-dom";

import logo from "@/assets/logo.png";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Label } from "@radix-ui/react-label";
import useLoginStore from "@/stores/LoginStore";
import CustomInput from "@/components/Custom/CustomInput";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import styles from "./LoginForm.module.scss";
import DrawerButton from "@/components/DrawerButton";

const schema = yup.object().shape({
	usernameEmail: yup.string().required("این مورد اجباری است"),
	password: yup
		.string()
		.required("این مورد اجباری است")
		.min(8, "رمز عبور باید حداقل 8 حرف باشد")
		.max(50, "رمز عبور طولانی است"),
});

function LoginForm() {
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
		console.log(errors);
	}
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ resolver: yupResolver(schema) });
	return (
		<form className={styles.form_style} onSubmit={handleSubmit(Login)}>
			<img className={styles.logo} src={logo} alt="logo" />
			<div className={styles.welcome}>خوش آمدید</div>
			<div className={styles.text}>
				برای ورود اطلاعات خود را وارد کنید
			</div>
			<Label className={styles.Label}>ایمیل یا نام کاربری</Label>
			<CustomInput
				value={usernameEmail}
				update={(e) => updateUsernameEmail(e.target.value)}
				placeholder="Email or Username"
				autofocus={true}
				onKey={(e) => handleKeyDown(e)}
				key={"login"}
				{...register("usernameEmail")}
				errors={errors}
				// register={register}
				// registerName="usernameEmail"
			/>
			<Label className={styles.Label}>رمز عبور</Label>
			<PasswordInput
				value={password}
				update={(e) => updatePassword(e.target.value)}
				handleKeyDown={handleKeyDown}
				register={register}
				errors={errors}
				// registerName="password"
			/>
			<div
				onClick={() => navigate("/signup")}
				className={styles.no_account}
			>
				حساب کاربری ندارید؟
			</div>
			<DrawerButton onClick={Login}>ورود</DrawerButton>
		</form>
	);
}

export default LoginForm;
