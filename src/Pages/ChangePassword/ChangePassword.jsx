import { Label } from "@radix-ui/react-label";
import styles from "./ChangePassword.module.scss";
import CustomInput from "@/components/Custom/CustomInput";
import { useState } from "react";
import DrawerButton from "@/components/Custom/DrawerButton";
import { postData } from "@/Servises/ApiClient";
import { useParams } from "react-router-dom";

function ChangePassword() {
	const { Uid, token } = useParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			onSubmit();
		}
	}
	const onSubmit = async (e) => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		let bodyData;
		if (passwordRegex.test(password) && password === confirmPassword) {
			bodyData = {
				password: password,
				Uid: Uid,
				token: token
			};
		} else {
			console.log("Invalid email");
			return;
		}
		await postData("/auth/resetpassword/", bodyData)
			.then((res) => {
				console.log("Data posted successfully:", res);
			})
			.catch((err) => {
				console.log("Data posting FAILED:", err);
				if (err?.response?.data) {
					const data = err?.response?.data;
					if (data?.non_field_errors) {
						// send notification password changed and redirect to landing page or dashboard
						true;
					}
				}
			});
	};
	return (
		<form
			className={styles.changepassword_container}
			onSubmit={(e) => e.preventDefault()}
		>
			<Label className="font-vazirmatn font-extrabold text-[48px] text-bombblack">
				تغییر رمز عبور
			</Label>
			<Label className="font-vazirmatn text-[20px] text-bombblack">
				رمز عبور جدید خود را وارد کنید
			</Label>
			<Label className={styles.Label}>رمز عبور جدید</Label>
			<CustomInput
				placeholder="Password"
				autofocus={true}
				onKey={(e) => handleKeyDown(e)}
				name="password"
				value={password}
				onChange={setPassword}
			/>
			<Label className={styles.Label}>تایید رمز عبور جدید</Label>
			<CustomInput
				placeholder="Confirm Password"
				autofocus={true}
				onKey={(e) => handleKeyDown(e)}
				name="confirmEmail"
				value={confirmPassword}
				onChange={setConfirmPassword}
			/>
			<DrawerButton classNames="mt-0" onClick={(e) => onSubmit(e)}>
				تغییر رمز عبور
			</DrawerButton>
			{/* <CustomButton>Nigga</CustomButton> */}
		</form>
	);
}

export default ChangePassword;
