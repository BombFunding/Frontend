import { useNavigate } from "react-router-dom";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import DrawerButton from "@/components/Custom/DrawerButton/DrawerButton";
import styles from "./SignupForm.module.scss";
import { useState } from "react";
import { useSignupFormStore } from "@/stores/FormStore";
import { postData } from "@/Services/ApiClient/Services.js";
import {
	RadioInput,
	RadioInputOption,
} from "@/components/Custom/RadioInput/RadioInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

// const schema = yup.object().shape({
// 	username: yup
// 		.string()
// 		.required("این مورد اجباری است")
// 		.min(3, "نام کاربری باید حداقل 3 کاراکتر باشد"),
// 	password: yup
// 		.string()
// 		.required("این مورد اجباری است")
// 		.min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
// 		.max(50, "رمز عبور طولانی است")
// 		.matches(
// 			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
// 			"رمز عبور باید حداقل شامل یک حرف بزرگ، عدد و علامت باشد"
// 		),
// 	email: yup
// 		.string()
// 		.required("این مورد اجباری است")
// 		.matches(
// 			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
// 			"فرمت ایمیل اشتباه است"
// 		),
// 	confirmPassword: yup
// 		.string()
// 		.required("این مورد اجباری است")
// 		.oneOf(
// 			[yup.ref("password")],
// 			"مقادیر رمز عبور و تایید رمز عبور یکسان نیستند"
// 		),
// });

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
	// const [role, setRole] = useState("basic");
	// const formState = useSignupFormStore((state) => state);
	// const formData = { username, email, password, confirmPassword, user_type };
	// const [errors, setErrors] = useState([]);

	function onChangeRole(e) {
		updateUser_type(e.target.value);
	}
	function togglePasswordVisibility() {
		setShowPassword(!showPassword);
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
			await postData("/auth/register/", bodyData).then((response) => {
				console.log("Data posted successfully:", response);
				Navigate("/emailverification");
			});
			// .catch((error) => {
			// 	if (error?.response?.data) {
			// 		const data = error?.response?.data;
			// 		if (data?.username) {
			// 			const err = {
			// 				message: "نام کاربری تکراری است",
			// 				path: "username",
			// 			};
			// 			const temp = errors;
			// 			temp[0].push(err);
			// 			setErrors(() => [temp]);
			// 		} else if (data?.email) {
			// 			const err = {
			// 				message: "ایمیل تکراری است",
			// 				path: "email",
			// 			};
			// 			const temp = errors;
			// 			temp[0].push(err);
			// 			setErrors(() => [temp]);
			// 		}
			// 	}
			// });
		} catch (error) {
			// const Fields = {
			// 	username: "نام کاربری",
			// 	password: "رمز عبور",
			// 	email: "ایمیل",
			// 	confirmPassword: "تایید رمز عبور",
			// };
			console.log("error:", error);
			if (error.response?.data?.email) {
				toast.error(
					<CustomToast Header="ایمیل" Message="ایمیل تکراری است" />
				);
			}
			if (error.response?.data?.username) {
				toast.error(
					<CustomToast
						Header="نام کاربری"
						Message="نام کاربری تکراری است"
					/>
				);
			}
			// if (error.response.data) {
			// 	toast.error(
			// 		<CustomToast
			// 			Header={Fields[error.inner[0].path]}
			// 			Message={error.inner[0].message}
			// 		/>
			// 	);
			// }
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
							placeholder="ایمیل"
							inputClassName={""}
							autofocus={true}
							name="email"
							onChange={(e) => updateEmail(e)}
							value={email}
							style={{"direction": "ltr"}}
						/>
						<CustomInput
							placeholder="نام کاربری"
							autofocus={false}
							name="username"
							onChange={(e) => updateUsername(e)}
							value={username}
							style={{"direction": "ltr"}}
						/>
					</div>
					<div className={styles.input_row}>
						<PasswordInput
							placeholder="رمز عبور"
							name="password"
							hasEye={true}
							onChange={(e) => updatePassword(e)}
							showPassword={showPassword}
							togglePasswordVisibility={togglePasswordVisibility}
							style={{"direction": "ltr"}}
						/>
						<PasswordInput
							placeholder="تایید رمز عبور"
							name="confirmPassword"
							onChange={(e) => updateConfirmPassword(e)}
							showPassword={showPassword}
							togglePasswordVisibility={togglePasswordVisibility}
							style={{"direction": "ltr"}}
						/>
					</div>
				</div>
				<div className="pt-2">
					<RadioInput>
						{/* <RadioInputOption
							value={"basic"}
							id="tab-1"
							checked={user_type === "basic"}
							onChange={updateUser_type}
						>
							هیچکدام
						</RadioInputOption> */}
						<RadioInputOption
							value={"startup"}
							id="tab-1"
							checked={user_type === "startup"}
							onChange={updateUser_type}
						>
							استارت‌آپ
						</RadioInputOption>
						<RadioInputOption
							value={"basic"}
							id="tab-2"
							checked={user_type === "basic"}
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
		</>
	);
}

export default SignupForm;
