import useLoginStore from "@/stores/LoginStore";
import logo from "@/assets/logo.png";

import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import CustomInput from "@/components/Custom/CustomInput";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import DrawerButton from "@/components/DrawerButton";
import styles from "./SignupForm.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSignupFormStore } from "@/stores/FormStore";

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
		e.preventDefault();
		console.log("Form Submitted", e);
		try {
			await schema.validate(formData, { abortEarly: false });
			console.log("Form Data:", formData);
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
			<div className="flex justify-evenly w-full">
				<div className="grid place-self-center">
					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						ایمیل
					</Label>
					<CustomInput
						placeholder="Email"
						autofocus={true}
						onKey={(e) => handleKeyDown(e)}
						// register={register}
						name="email"
						onChange={formState.updateEmail}
						value={email}
						errors={errors}
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
					/>
				</div>
				<div className="grid place-items-center">
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
					/>

					<Label className="text-black m-1.5 place-self-end pe-1 mb-2">
						رمز عبور
					</Label>
					<div>
						<PasswordInput
							handleKeyDown={handleKeyDown}
							placeholder="Password"
							errors={errors}
							name="password"
							className=""
							hasEye={true}
							onChange={formState.updatePassword}
							value={password}
							showPassword={showPassword}
							togglePasswordVisibility={togglePasswordVisibility}
						/>
					</div>
					{/* </div> */}
				</div>
			</div>
			<div
				onClick={() => navigate("/login")}
				className="text-xs text-bombgray cursor-pointer hover:text-black mt-1"
			>
				قبلا ثبت نام کرده‌اید؟
			</div>
			{/* <DrawerButton onClick={handleSubmit(onSubmit)}> */}
			<DrawerButton onClick={onSubmit}>ثبت نام</DrawerButton>
		</form>
	);
}

export default SignupForm;
