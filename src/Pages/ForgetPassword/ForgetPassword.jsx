import { Label } from "@radix-ui/react-label";
import styles from "./ForgetPassword.module.scss";
import CustomInput from "@/components/Custom/CustomInput";
import ReturnButton from "@/components/Custom/ReturnButton/ReturnButton";
import DrawerButton from "@/components/Custom/DrawerButton";
import { postData } from "@/Servises/ApiClient";
import { useState } from "react";

function ForgetPassword() {
	const [email, setEmail] = useState("");
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			onSubmit();
		}
	}
	const onSubmit = async (e) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		let bodyData;
		if (emailRegex.test(email)) {
			bodyData = {
				email: email,
			};
		} else {
			console.log("Invalid email");
			return;
		}
		await postData("/auth/forgetpassword/", bodyData)
			.then((res) => {
				console.log("Data posted successfully:", res);
			})
			.catch((err) => {
				console.log("Data posting FAILED:", err);
				if (err?.response?.data) {
					const data = err?.response?.data;
					if (data?.non_field_errors) {
                        true;
					}
				}
			});
	};
	return (
		<form
			className={styles.forgetpassword_container}
			onSubmit={(e) => e.preventDefault()}
		>
			<ReturnButton />
			<Label className="font-vazirmatn font-extrabold text-[48px] text-bombblack">
				فراموشی رمز عبور
			</Label>
			<Label className="font-vazirmatn text-[20px] text-bombblack">
				آدرس ایمیل خود را وارد کنید
			</Label>
			<CustomInput
				placeholder="Email address"
				autofocus={true}
				onKey={(e) => handleKeyDown(e)}
				name="email"
				value={email}
				onChange={setEmail}
			/>
			<DrawerButton classNames="mt-0" onClick={(e) => onSubmit(e)}>
				ارسال ایمیل
			</DrawerButton>
			{/* <CustomButton>Nigga</CustomButton> */}
		</form>
	);
}

export default ForgetPassword;
