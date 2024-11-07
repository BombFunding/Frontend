import logo from "@/assets/logo.png";

import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import CustomInput from "@/components/Custom/CustomInput";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import DrawerButton from "@/components/DrawerButton";
import styles from "./SignupForm.module.scss";
import { useState } from "react";
import { useSignupFormStore } from "@/stores/FormStore";
import { postData } from "@/Servises/ApiClient/index.js";

const schema = yup.object().shape({
	username: yup.string().required("اجباری").min(3, "حداقل 3 کاراکتر"),
	password: yup
		.string()
		.required("اجباری")
		.min(8, "حداقل 8 کاراکتر")
		.matches(/[A-Z]/, "شامل حروف بزرگ")
		.matches(/[a-z]/, "شامل حروف کوچک")
		.matches(/\d/, "شامل اعداد")
		.matches(/[@$!%*?&#]/, "شامل علامت"),
	email: yup
		.string()
		.required("اجباری")
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"فرمت درست ایمیل"
		),
	// confirmEmail: yup
	//   .string()
	//   .required("اجباری")
	//   .oneOf()
});

function SignupForm() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			onSubmit(e);
		}
	}

	const { username, email, password, confirmPassword, user_type } =
		useSignupFormStore((state) => state);
	const formData = { username, email, password, confirmPassword, user_type };
	const formState = useSignupFormStore((state) => state);
	const [errors, setErrors] = useState(null);

	const onSubmit = async (e) => {
		e?.preventDefault();
		console.log("Form Submitted", e);
		try {
			await schema.validate(formData, { abortEarly: false });
			console.log("Form Data:", formData);
			const bodyData = {
				username: username,
				email: email,
				password: password,
				user_type: "basic",
			};
			postData("/auth/register/", bodyData)
				.then((response) => {
					console.log("Data posted successfully:", response);
				})
				.catch((error) => {
					console.log("Data posting FAILED:", error);
				});
		} catch (error) {
			console.log("Form Validation Errors:", error.inner);
			setErrors(error.inner);
		}
	};

	return (
		// <form className={styles.form_style} onSubmit={(e) => Signup(e)}>
		// <form className={styles.form_style} onSubmit={handleSubmit(onSubmit)}>
		<form className={styles.form_style} onSubmit={onSubmit}>
			<img className="mix-blend-darken h-0" src={logo} alt="logo" />
			<div className="text-black m-4 text-xl">خوش آمدید</div>
			<div className="text-black text-xs text-center">
				برای ثبت نام اطلاعات خود را وارد کنید
			</div>
			<div className="flex justify-evenly justify-items-end w-full">
				<div className="place-items-center">
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						ایمیل
					</Label>
					<CustomInput
						placeholder="Email"
						autofocus={true}
						onKey={(e) => handleKeyDown(e)}
						name="email"
						onChange={formState.updateEmail}
						value={email}
						errors={errors}
						showErrors={true}
					/>

					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						تایید رمز عبور
					</Label>
					<PasswordInput
						handleKeyDown={handleKeyDown}
						placeholder="Confirm Password"
						errors={errors}
						name="confirmPassword"
						onChange={formState.updateConfirmPassword}
						value={confirmPassword}
						showPassword={showPassword}
						togglePasswordVisibility={togglePasswordVisibility}
						showErrors={true}
					/>
				</div>
				<div className="place-self-center">
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						نام کاربری
					</Label>
					<CustomInput
						placeholder="Username"
						autofocus={true}
						onKey={(e) => handleKeyDown(e)}
						name="username"
						errors={errors}
						onChange={formState.updateUsername}
						value={username}
						showErrors={true}
					/>
					{/* <InputError errors={errors} name="username" /> */}

					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						رمز عبور
					</Label>
					<div>
						<PasswordInput
							handleKeyDown={handleKeyDown}
							placeholder="Password"
							errors={errors}
							name="password"
							hasEye={true}
							onChange={formState.updatePassword}
							value={password}
							showPassword={showPassword}
							togglePasswordVisibility={togglePasswordVisibility}
							showErrors={true}
						/>
					</div>
					{/* <InputError errors={errors} name="username" /> */}
					{/* </div> */}
				</div>
			</div>
			<div
				onClick={() => navigate("/login")}
				className="text-xs text-bombgray cursor-pointer hover:text-black mt-1"
			>
				قبلا ثبت نام کرده‌اید؟
			</div>
			<DrawerButton onClick={onSubmit}>ثبت نام</DrawerButton>
		</form>
	);
}

export default SignupForm;
