import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import CustomInput from "@/components/Custom/CustomInput";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import DrawerButton from "@/components/Custom/DrawerButton";
import styles from "./SignupForm.module.scss";
import { useState } from "react";
import { useSignupFormStore } from "@/stores/FormStore";
import { postData } from "@/Servises/ApiClient/index.js";
import { RadioInput, RadioInputOption } from "@/components/Custom/RadioInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "@/components/CustomToast/CustomToast";

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
	const Navigate = useNavigate();
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
	// const formState = useSignupFormStore((state) => state);
	// const formData = { username, email, password, confirmPassword, user_type };

	function onChangeRole(e) {
		updateUser_type(e.target.value);
	}
	function togglePasswordVisibility() {
		setShowPassword(!showPassword);
	}
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			onSubmit(e);
		}
	}
	const onSubmit = async () => {
		try {
			console.log(username, password, email, confirmPassword, user_type);
			// await schema.validate(formData, { abortEarly: false });
			if (username === "") {
				toast.error(
					<CustomToast
						Header="نام کاربری"
						Message="نام کاربری خود را وارد کنید"
					/>
				);
				return;
			}
			if (username.length < 3) {
				toast.error(
					<CustomToast
						Header="نام کاربری"
						Message="نام کاربری حداقل باید 3 حرف باشد"
					/>
				);
				return;
			}
			if (password === "") {
				toast.error(
					<CustomToast
						Header="رمز عبور"
						Message="رمز عبور خود را وارد کنید"
					/>
				);
				return;
			}
			if (password.length < 8) {
				toast.error(
					<CustomToast
						Header="رمز عبور"
						Message="رمز عبور حداقل باید دارای 8 کاراکتر باشد"
					/>
				);
				return;
			}
			if (password.length > 50) {
				toast.error(
					<CustomToast
						Header="رمز عبور"
						Message="رمز عبور طولانی است"
					/>
				);
				return;
			}
			if (
				!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
					password
				)
			) {
				toast.error(
					<CustomToast
						Header="رمز عبور"
						Message="رمز عبور باید حداقل شامل یک حرف بزرگ، عدد و علامت باشد"
					/>
				);
				return;
			}
			if (email === "") {
				toast.error(
					<CustomToast
						Header="ایمیل"
						Message="ایمیل خود را وارد کنید"
					/>
				);
				return;
			}
			if (
				!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
			) {
				toast.error(
					<CustomToast
						Header="ایمیل"
						Message="فرمت ایمیل درست نمی‌باشد"
					/>
				);
				return;
			}
			if (confirmPassword === "") {
				toast.error(
					<CustomToast
						Header="تایید رمز عبور"
						Message="تکرار رمز عبور خود را وارد کنید"
					/>
				);
				return;
			}
			if (confirmPassword !== password) {
				toast.error(
					<CustomToast
						Header="تایید رمز عبور"
						Message="مقدار رمز عبور و تایید رمز عبور باید یکسان باشد"
					/>
				);
				return;
			}

			console.log("hi");
			const bodyData = {
				username,
				email,
				password,
				user_type,
			};
			// console.log(bodyData);
			await postData("/auth/register", bodyData).then((response) => {
				console.log("Data posted successfully:", response);
			});
		} catch (error) {
			console.log("wtf");
			const Fields = {
				username: "نام کاربری",
				password: "رمز عبور",
				email: "ایمیل",
				confirmPassword: "تایید رمز عبور",
			};
			console.log("in:", error);
			if (error?.inner) {
				// console.log("in:", error.inner[0].message);
				toast.error(
					<CustomToast
						Header={Fields[error.inner[0].path]}
						Message={error.inner[0].message}
					/>
				);
			}
		} finally {
			const Fields = {
				username: "نام کاربری",
				password: "رمز عبور",
				email: "ایمیل",
				confirmPassword: "تایید رمز عبور",
			};
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
							onChange={e=>updateUsername(e)}
							value={username}
							showErrors={true}
						/>
						<CustomInput
							placeholder="ایمیل"
							autofocus={true}
							onKey={(e) => handleKeyDown(e)}
							name="email"
							onChange={(e) => updateEmail(e)}
							value={email}
							showErrors={true}
						/>
					</div>
					<div className={styles.input_row}>
						<PasswordInput
							handleKeyDown={handleKeyDown}
							placeholder="تایید رمز عبور"
							name="confirmPassword"
							onChange={(e) => updateConfirmPassword(e)}
							showPassword={showPassword}
							togglePasswordVisibility={togglePasswordVisibility}
						/>
						<PasswordInput
							handleKeyDown={handleKeyDown}
							placeholder="رمز عبور"
							name="password"
							hasEye={true}
							onChange={(e) => updatePassword(e)}
							showPassword={showPassword}
							togglePasswordVisibility={togglePasswordVisibility}
						/>
					</div>
				</div>
				<div className="pt-5">
					<RadioInput>
						<RadioInputOption
							value={"basic"}
							id="tab-1"
							checked={user_type === "basic"}
							onChange={updateUser_type}
						>
							هیچکدام
						</RadioInputOption>
						<RadioInputOption
							value={"startup"}
							id="tab-2"
							checked={user_type === "startup"}
							onChange={updateUser_type}
						>
							استارت‌آپ
						</RadioInputOption>
						<RadioInputOption
							value={"investor"}
							id="tab-3"
							checked={user_type === "investor"}
							onChange={updateUser_type}
						>
							سرمایه‌گذار
						</RadioInputOption>
					</RadioInput>
				</div>
				<div
					onClick={() => {
						Navigate("/login");
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
				<DrawerButton classNames="font-vazirmatn">ثبت نام</DrawerButton>
			</form>

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
