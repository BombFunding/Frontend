import { Label } from "@radix-ui/react-label";
import styles from "./ChangePassword.module.scss";
import { useState } from "react";
import DrawerButton from "@/components/Custom/DrawerButton/DrawerButton";
import { postData } from "@/Services/ApiClient/Services";
import { useNavigate, useParams } from "react-router-dom";
import PasswordInput from "@/components/Custom/PasswordInput/PasswordInput";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

function ChangePassword() {
	const Navigate = useNavigate();
	const { uid, token } = useParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			onSubmit();
		}
	}
	const onSubmit = async (e) => {
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		let bodyData;
		if (password === "") {
			toast.error(
				<CustomToast
					Header="رمز عبور جدید"
					Message="رمز عبور جدید خود را وارد کنید"
				/>
			);
			return;
		}
		if (confirmPassword === "") {
			toast.error(
				<CustomToast
					Header="تایید رمز عبور جدید"
					Message="تایید رمز عبور جدید خود را وارد کنید"
				/>
			);
			return;
		}
		if (!passwordRegex.test(password)) {
			console.log("Invalid password");
			toast.error(
				<CustomToast
					Header="رمز عبور جدید"
					Message="رمز عبور باید حداقل شامل یک حرف بزرگ، عدد و علامت باشد"
				/>
			);
			return;
		}
		if (password !== confirmPassword) {
			console.log("Invalid confirm password");
			toast.error(
				<CustomToast
					Header="تایید رمز عبور جدید"
					Message="مقادیر رمز عبور جدید و تایید رمز عبور جدید یکسان نیستند"
				/>
			);
			return;
		}
		bodyData = {
			password: password,
			uid: uid,
			token: token,
		};
		await postData("/auth/resetpassword/", bodyData)
			.then((res) => {
				console.log("Data posted successfully:", res);
				toast.success(
					<CustomToast Header="رمز عبور شما با موفقیت تغییر داده شد" />
				);
				setTimeout(() => Navigate("/login"), 3000);
			})
			.catch((err) => {
				console.log("Data posting FAILED:", err);
				if (err?.response?.data) {
					const data = err?.response?.data;
					if (data?.non_field_errors) {
						toast.error(
							<CustomToast Header="لینک تغییر رمز عبور شما منقضی شده" />
						);
						setTimeout(() => Navigate("/forgetpassword"), 3000);
					}
				}
			});
	};
	return (
		<form
			className={styles.changepassword_container}
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(e);
			}}
		>
			<Label className="font-vazirmatn font-extrabold text-[48px] text-bombblack">
				تغییر رمز عبور
			</Label>
			<Label className="font-vazirmatn text-[20px] text-bombblack">
				رمز عبور جدید خود را وارد کنید
			</Label>
			<PasswordInput
				handleKeyDown={handleKeyDown}
				placeholder="رمز عبور جدید"
				name="password"
				onChange={setPassword}
				hasEye={true}
				showPassword={showPassword}
				togglePasswordVisibility={togglePasswordVisibility}
			/>
			<PasswordInput
				handleKeyDown={handleKeyDown}
				placeholder="تایید رمز عبور جدید"
				name="confirmPassword"
				onChange={setConfirmPassword}
				hasEye={true}
				showPassword={showConfirmPassword}
				togglePasswordVisibility={toggleConfirmPasswordVisibility}
			/>
			<DrawerButton>تغییر رمز عبور</DrawerButton>
		</form>
	);
}

export default ChangePassword;
