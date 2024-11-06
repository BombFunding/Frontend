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

	const hasUppercase = /[A-Z]/.test(password); // Checks for uppercase letters
	const hasLowercase = /[a-z]/.test(password); // Checks for lowercase letters
	const hasNumber = /\d/.test(password); // Checks for digits
	const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Checks for special characters

	// const validate = () => usernameEmailValidation() && passwordValidation();

	// function usernameEmailValidation() {
	// 	const emailValid =
	// 		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
	// 			usernameEmail
	// 		);

	// 	if (isEmail()) {
	// 		return emailValid;
	// 	} else {
	// 		return /^[a-zA-Z0-9._]{3,15}$/.test(usernameEmail);
	// 	}
	// }
	// useEffect(() => {
	// 	if (!hasUppercase) {
	// 		console.log("no uppercase letters");
	// 		setErrors([
	// 			...errors,
	// 			"رمز عبور باید حداقل شامل یک حرف بزرگ انگلیسی باشد",
	// 		]);
	// 	}
	// 	if (!hasLowercase) {
	// 		console.log("no lowercase letters");
	// 		setErrors([
	// 			...errors,
	// 			"رمز عبور باید حداقل شامل یک حرف کوچک انگلیسی باشد",
	// 		]);
	// 	}
	// 	if (!hasNumber) {
	// 		console.log("no numbers");
	// 		setErrors([
	// 			...errors,
	// 			"رمز عبور باید حداقل شامل یک عدد انگلیسی باشد",
	// 		]);
	// 	}
	// 	if (!hasSpecialChar) {
	// 		console.log("no special characters");
	// 		setErrors([...errors, "رمز عبور باید حداقل شامل یک علامت باشد"]);
	// 	}
	// }, [password]);
	// function passwordValidation() {
	// 	return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
	// }

	// function isEmail() {
	// 	return usernameEmail.includes("@") && usernameEmail.includes(".");
	// }

	function handleKeyDown(e) {
		if (e.key === "Enter") {
			Login(e);
		}
	}
	const onSubmit = (data) => {
		console.log("Form Data:", errors, data);
		console.log("Form Data:", errors.password);
	};
	function Login(e) {
		e.preventDefault();
		console.log(usernameEmail, password, errors.password);
		// if (validate()) {
		// 	console.log("send reqqqqqqqqqqqqqqqqqqqq");
		// } else {
		// 	console.log("erorrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
		// }
		// console.log(errors);
	}

	return (
		<form className={styles.form_style} onSubmit={handleSubmit(onSubmit)}>
			{/* <form className={styles.form_style}> */}
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
			/>
			<Label className={styles.Label}>رمز عبور</Label>
			<PasswordInput
				value={password}
				update={(e) => updatePassword(e.target.value)}
				handleKeyDown={handleKeyDown}
				errors={errors}
				register={register}
			/>
			<div
				onClick={() => navigate("/signup")}
				className={styles.no_account}
			>
				حساب کاربری ندارید؟
			</div>
			<DrawerButton onClick={(e) => Login(e)}>ورود</DrawerButton>
			{/* <DrawerButton >ورود</DrawerButton> */}
			{/* <button type="submit">kill yourself</button> */}
		</form>
	);
}

export default LoginForm;
