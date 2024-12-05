import { useNavigate } from "react-router-dom";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import styles from "./LoginForm.module.scss";
import DrawerButton from "@/components/Custom/DrawerButton/DrawerButton";
import { useState } from "react";
import { useLoginFormStore } from "@/stores/FormStore";
import { postData } from "@/Services/ApiClient/Services.js";
import useTokenStore from "@/stores/TokenStore";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

function LoginForm() {
	const Navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			onSubmit();
		}
	}
	const { usernameEmail, password, updateUsernameEmail, updatePassword } =
		useLoginFormStore((state) => state);
	const TokenManager = useTokenStore((state) => state);
	const formData = { usernameEmail, password };
	const formState = useLoginFormStore((state) => state);
	const onSubmit = async (e) => {
		console.log("Form Submitted", e);
		try {
			if (usernameEmail === "") {
				toast.error(
					<CustomToast Header="لطفا نام کاربری یا ایمیل خود را وارد کنید" />
				);
				return;
			}
			const emailRegex =
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			let Method = emailRegex.test(usernameEmail) ? "email" : "username";
			const bodyData =
				Method === "email"
					? { email: usernameEmail, password: password }
					: { username: usernameEmail, password: password };
			await postData("/auth/login/", bodyData).then((response) => {
				TokenManager.updateAccessToken(response.access_token);
				TokenManager.updateRefreshToken(response.refresh_token);
				toast.success(
					<CustomToast Header="با موفقیت وارد سایت شدید" />
				);
				setTimeout(() => {
					Navigate("/");
				}, 3000);
			});
			// .catch((error) => {
			// 	console.log("Data posting FAILED:", error);
			// 	if (error?.response?.data) {
			// 		const data = error?.response?.data;
			// 		if (data?.non_field_errors) {
			// 			const message = inputState
			// 				? "نام کاربری یا رمز ورود اشتباه است"
			// 				: "ایمیل یا رمز ورود اشتباه است";
			// 			const err = {
			// 				message: message,
			// 				path: "usernameEmail",
			// 			};
			// 			const temp = errors;
			// 			temp[0].push(err);
			// 			setErrors((pre) => [temp]);
			// 		}
			// 	}
			// });
		} catch (error) {
			// setErrors((pre) => [...pre, error.inner]);
			console.log("er:", error.response?.data?.non_field_errors[0]);
			if (
				error.response?.data?.non_field_errors[0] ===
				"Email is not confirmed."
			) {
				toast.error(
					<CustomToast Header="لطفا ایمیل خود را تایید کنید" />
				);
			} else {
				toast.error(
					<CustomToast Header="نام کاربری یا رمز عبور اشتباه است" />
				);
			}
		}
		//  finally {
		// 	const Fields = {
		// 		usernameEmail: "نام کاربری یا ایمیل",
		// 		password: "رمز عبور",
		// 	};
		// 	if (errors[0]?.length > 0) {
		// 		// console.log(errors[0][0].message, Fields[errors[0][0].path]);
		// 		toast.error(
		// 			<CustomToast
		// 				Header={Fields[errors[0][0].path]}
		// 				Message={errors[0][0].message}
		// 			/>
		// 		);
		// 	}
		// }
	};

	return (
		<>
			<form
				className={styles.form_style}
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(e);
				}}
			>
				<div className={styles.welcome}>خوش آمدید</div>
				<div className={styles.text}>
					برای ورود اطلاعات خود را وارد کنید
				</div>
				<CustomInput
					placeholder="ایمیل یا نام کاربری"
					autofocus={true}
					onKey={(e) => handleKeyDown(e)}
					name="usernameEmail"
					value={formData.usernameEmail}
					onChange={formState.updateUsernameEmail}
				/>
				<PasswordInput
					handleKeyDown={handleKeyDown}
					placeholder="رمز عبور"
					name="password"
					onChange={formState.updatePassword}
					value={formData.password}
					hasEye={true}
					showPassword={showPassword}
					togglePasswordVisibility={togglePasswordVisibility}
				/>

				<div
					onClick={() => {
						updateUsernameEmail("");
						updatePassword("");
						Navigate("/forgetpassword");
					}}
					className={styles.forget_password}
				>
					رمز عبور خود را فراموش کرده‌اید؟
				</div>

				<div
					onClick={() => {
						updateUsernameEmail("");
						updatePassword("");
						Navigate("/signup");
					}}
					className={styles.no_account}
				>
					حساب کاربری ندارید؟
				</div>
				<DrawerButton>ورود</DrawerButton>
			</form>
		</>
	);
}

export default LoginForm;
