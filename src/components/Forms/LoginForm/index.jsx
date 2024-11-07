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
import { useEffect, useState } from "react";

const schema = yup.object().shape({
	usernameEmail: yup.string().required("این مورد اجباری است"),
	password: yup
		.string()
		.required("این مورد اجباری است")
		.min(8, "رمز عبور باید حداقل 8 حرف باشد")
		.max(50, "رمز عبور طولانی است")
		.matches(/[A-Z]/, "رمز عبور باید حداقل شامل یک حرف بزرگ انگلیسی باشد")
		.matches(/[a-z]/, "رمز عبور باید حداقل شامل یک حرف کوچک انگلیسی باشد")
		.matches(/\d/, "رمز عبور باید حداقل شامل یک عدد باشد")
		.matches(/[@$!%*?&#]/, "رمز عبور باید حداقل شامل یک علامت باشد"),
});

function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });
	// const { errors, setErrors } = useState([]);
	const navigate = useNavigate();
	const { usernameEmail, password, updateUsernameEmail, updatePassword } =
		useLoginStore();

	function handleKeyDown(e) {
		if (e.key === "Enter") {
			handleSubmit(onSubmit);
		}
	}
	const onSubmit = (data) => {
		console.log("Form Submitted", data);
	};

	return (
		<form className={styles.form_style} onSubmit={handleSubmit(onSubmit)}>
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
				register={register}
				name="usernameEmail"
				errors={errors}
			/>
			<Label className={styles.Label}>رمز عبور</Label>
			<PasswordInput
				value={password}
				update={(e) => updatePassword(e.target.value)}
				placeholder="Password"
				handleKeyDown={handleKeyDown}
				errors={errors}
				register={register}
				name="password"
			/>
			<div
				onClick={() => navigate("/signup")}
				className={styles.no_account}
			>
				حساب کاربری ندارید؟
			</div>
			<DrawerButton onClick={handleSubmit(onSubmit)}>ورود</DrawerButton>
		</form>
	);
}

export default LoginForm;
