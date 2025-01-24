import { useNavigate } from "react-router-dom";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import styles from "./LoginForm.module.scss";
import DrawerButton from "@/components/Custom/DrawerButton/DrawerButton";
import { useState } from "react";
import { useLoginFormStore } from "@/stores/FormStore";
import { getData, postData } from "@/Services/ApiClient/Services.js";
import useTokenStore from "@/stores/TokenStore";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";

function LoginForm() {
	const Navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const { usernameEmail, password, updateUsernameEmail, updatePassword } =
		useLoginFormStore((state) => state);
	const { updateAccessToken, updateRefreshToken, updateUserType } =
		useTokenStore((state) => state);
	const {
		setBio,
		setEmail,
		setFullname,
		setUsername,
		setPhone,
		setAvatar,
		setHeader,
		setBalance,
		setUserType
	} = useProfileStore();
	const profileManager = useProfileStore((state) => state);
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
				updateAccessToken(response.access_token);
				updateUserType(response.user_type);
				updateRefreshToken(response.refresh_token);
				getData("/auth/view_own_baseuser_profile/").then((data) => {
					console.log("data", data);
					setBio(data.base_profile.bio);
					setEmail(data.base_profile.email);
					setFullname(
						data.base_profile.first_name +
							" " +
							data.base_profile.last_name
					);
					setUsername(data.base_profile.name);
					setUserType(data.base_profile.user_type);
					setPhone(data.base_profile.phone);
					setAvatar(
						`http://localhost:8000${data.base_profile.profile_picture}`
					);
					setHeader(
						`http://localhost:8000${data.base_profile.header_picture}`
					);
					getData(`/balance/balance/`).then((data1) => {
						setBalance(data1.balance);
						toast.success(
							<CustomToast
								Header={`با موفقیت وارد سایت شدید ${
									data.base_profile.first_name
										? `${data.base_profile.first_name} جان`
										: ""
								}`}
							/>
						);
						setTimeout(() => {
							Navigate("/");
						}, 3000);
					});
				});
				// toast.success(
				// 	<CustomToast Header="با موفقیت وارد سایت شدید" />
				// );
				getData(
					`startup/get_startup_profile/${response.username}/`
				).then((res) => {
					console.log("res:", res);
					profileManager.setProfileId(res.profile.id);
				});
			});
		} catch (error) {
			console.log("login error: ", error);
			if (
				error.response?.data?.error[0] ===
				"Invalid username or password."
			) {
				toast.error(
					<CustomToast Header="نام کاربری یا رمز عبور اشتباه است" />
				);
			} else {
				toast.error(
					<CustomToast Header="لطفا ایمیل خود را تایید کنید" />
				);
			}
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
					برای ورود اطلاعات خود را وارد کنید
				</div>
				<CustomInput
					placeholder="ایمیل یا نام کاربری"
					autofocus={true}
					name="usernameEmail"
					value={formData.usernameEmail}
					onChange={formState.updateUsernameEmail}
				/>
				<PasswordInput
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
