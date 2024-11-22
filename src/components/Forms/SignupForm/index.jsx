import logo from "@/assets/logo.png";

import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import CustomInput from "@/components/Custom/CustomInput";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import DrawerButton from "@/components/Custom/DrawerButton";
import styles from "./SignupForm.module.scss";
import { useEffect, useRef, useState } from "react";
import { useSignupFormStore } from "@/stores/FormStore";
import { postData } from "@/Servises/ApiClient/index.js";
import { RadioInput, RadioInputOption } from "@/components/Custom/RadioInput";
import { Notification } from "@/components/NotificationCenter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastifyT from "@/components/NotificationCenter/index2";

const schema = yup.object().shape({
	username: yup
		.string()
		.required("این مورد اجباری است")
		.min(3, "نام کاربری باید حداقل 3 کاراکتر باشد"),
	password: yup
		.string()
		.required("این مورد اجباری است")
		.min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
		.max(50, "رمز عبور طولانی است")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			"رمز عبور باید حداقل شامل یک حرف بزرگ، عدد و علامت باشد"
		),
	email: yup
		.string()
		.required("این مورد اجباری است")
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"فرمت ایمیل اشتباه است"
		),
	confirmPassword: yup
		.string()
		.required("این مورد اجباری است")
		.oneOf(
			[yup.ref("password")],
			"مقادیر رمز عبور و تایید رمز عبور یکسان نیستند"
		),
});

function SignupForm() {
	const navigate = useNavigate();
	const [notifications, setNotifications] = useState([]);
	const {
		username,
		email,
		password,
		confirmPassword,
		user_type,
		updateUsername,
		updatePassword,
		updateConfirmPassword,
		updateEmail,
		updateUser_type,
	} = useSignupFormStore((state) => state);
	const [showPassword, setShowPassword] = useState(false);
	const [role, setRole] = useState("basic");
	const formState = useSignupFormStore((state) => state);
	const formData = { username, email, password, confirmPassword, user_type };
	const [errors, setErrors] = useState([]);

	function addNotification(title, subtitles, actions, icon) {
		setNotifications((prev) => [
			...prev,
			{ id: Math.random(), title, subtitles, actions, icon },
		]);
	}
	const dismissNotification = (id) => {
		setNotifications((prev) => prev.filter((note) => note.id !== id));
	};
	function onChangeRole(e) {
		setRole(e.target.value);
	}
	function togglePasswordVisibility() {
		setShowPassword(!showPassword);
	}
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			onSubmit(e);
		}
	}
	// useEffect(() => {
	// 	const Fields = {
	// 		username: "نام کاربری",
	// 		password: "رمز عبور",
	// 		email: "ایمیل",
	// 		confirmPassword: "تایید رمز عبور",
	// 	};
	// 	const X = ["username", "password", "email", "confirmPassword"];
	// 	X.map((path) => {
	// 		// console.log(path);
	// 		const notificationErrors = [];
	// 		errors[0]
	// 			?.filter((err) => err.path === path)
	// 			.map((err) => notificationErrors.push(err.message));
	// 		errors[1]
	// 			?.filter((err) => err.path === path)
	// 			.map((err) => notificationErrors.push(err.message));
	// 		if (notificationErrors.length > 0) {
	// 			addNotification(
	// 				Fields[path],
	// 				notificationErrors,
	// 				["اوکی"]
	// 			);
	// 		}
	// 	});
	// }, [errors]);
	const onSubmit = async (e) => {
		setNotifications([]);
		setErrors([]);
		// errors[0] = [];
		// toast(<ToastifyT />);
		// toast(<ToastifyT />);
		// toast("Hi");
		// toast("nigga");
		// console.log("Form Submitted", e);
		try {
			await schema.validate(formData, { abortEarly: false });
			const bodyData = {
				username: username,
				email: email,
				password: password,
				user_type: "basic",
			};
			await postData("/auth/register/", bodyData)
				.then((response) => {
					console.log("Data posted successfully:", response);
				})
				.catch((error) => {
					if (error?.response?.data) {
						const data = error?.response?.data;
						if (data?.username) {
							const err = {
								message: "نام کاربری تکراری است",
								path: "username",
							};
							const temp = errors;
							temp[0].push(err);
							setErrors((pre) => [temp]);
						} else if (data?.email) {
							const err = {
								message: "ایمیل تکراری است",
								path: "email",
							};
							const temp = errors;
							temp[0].push(err);
							setErrors((pre) => [temp]);
						}
					}
				});
		} catch (error) {
			setErrors((pre) => [...pre, error.inner]);
		} finally {
			console.log("Eerrors: ", errors);
			// setErrors()
			// errors[0].map((err) => {
			// 	toast(
			// 		<div className="font-vazirmatn text-[10px]">
			// 			{err.message}
			// 		</div>
			// 	);
			// });

			const Fields = {
				username: "نام کاربری",
				password: "رمز عبور",
				email: "ایمیل",
				confirmPassword: "تایید رمز عبور",
			};
			Object.keys(Fields).map((path) => {
				// console.log(path);
				const notificationErrors = [];
				errors[0]
					?.filter((err) => err.path === path)
					.map((err) => notificationErrors.push(err.message));
				// errors[1]
				// 	?.filter((err) => err.path === path)
				// 	.map((err) => notificationErrors.push(err.message));
				if (notificationErrors.length > 0) {
					toast(
						<>
							<h1 className="font-vazirmatn text-[20px]">
								{Fields[path]}
							</h1>
							<div className="font-vazirmatn text-[10px]">
								{notificationErrors.map((err) => (
									<div key={err}>{err}</div>
								))}
							</div>
						</>
					);
					// addNotification(Fields[path], notificationErrors, ["اوکی"]);
				}
			});
		}
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
					برای ثبت نام اطلاعات خود را وارد کنید
				</div>
				<div className={styles.form_even_justify}>
					<div className={styles.input_row}>
							<CustomInput
								placeholder="نام کاربری"
								autofocus={true}
								onKey={(e) => handleKeyDown(e)}
								name="username"
								errors={errors}
								onChange={formState.updateUsername}
								value={username}
								showErrors={true}
							/>
							<CustomInput
								placeholder="ایمیل"
								autofocus={true}
								onKey={(e) => handleKeyDown(e)}
								name="email"
								onChange={formState.updateEmail}
								value={email}
								errors={errors}
								showErrors={true}
							/>
					</div>
					<div className={styles.input_row}>
							<PasswordInput
								handleKeyDown={handleKeyDown}
								placeholder="تایید رمز عبور"
								errors={errors}
								name="confirmPassword"
								onChange={formState.updateConfirmPassword}
								value={confirmPassword}
								showPassword={showPassword}
								togglePasswordVisibility={
									togglePasswordVisibility
								}
								showErrors={true}
							/>
							<PasswordInput
								handleKeyDown={handleKeyDown}
								placeholder="رمز عبور"
								errors={errors}
								name="password"
								hasEye={true}
								onChange={formState.updatePassword}
								value={password}
								showPassword={showPassword}
								togglePasswordVisibility={
									togglePasswordVisibility
								}
							/>
					</div>
				</div>
				<div className="pt-5">
					<RadioInput>
						<RadioInputOption
							value={"basic"}
							id="tab-1"
							checked={role === "basic"}
							onChange={onChangeRole}
						>
							هیچکدام
						</RadioInputOption>
						<RadioInputOption
							value={"startup"}
							id="tab-2"
							checked={role === "startup"}
							onChange={onChangeRole}
						>
							استارت‌آپ
						</RadioInputOption>
						<RadioInputOption
							value={"investor"}
							id="tab-3"
							checked={role === "investor"}
							onChange={onChangeRole}
						>
							سرمایه‌گذار
						</RadioInputOption>
					</RadioInput>
				</div>
				<div
					onClick={() => {
						navigate("/login");
						updateUsername("");
						updatePassword("");
						updateConfirmPassword("");
						updateEmail("");
						updateUser_type("basic");
					}}
					className={styles.has_account}
				>
					قبلا ثبت نام کرده‌اید؟
				</div>
				<DrawerButton classNames="font-vazirmatn" onClick={onSubmit}>
					ثبت نام
				</DrawerButton>
			</form>
			<ToastContainer
				toastStyle={{
					backgroundColor: "#2C2727",
					fontSize: "16px",
					borderRadius: "8px",

				}}
				position="bottom-right"
				autoClose={false}
				hideProgressBar={true}
				closeOnClick
				draggable
				theme="dark"
				newestOnTop={true}
				role="alert"
				closeButton={false}
				limit={4}
			/>
			{/* <div className={styles.notification_box}>
				<div className={styles.notification_box_flex}>
					{notifications?.map((note) => (
						<Notification
							key={note.id}
							{...note}
							onDismiss={() => dismissNotification(note.id)}
						/>
					))}
				</div>
			</div> */}
			{/* <NotificationCenter /> */}
		</>
	);
}

export default SignupForm;
