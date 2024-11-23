import { Label } from "@radix-ui/react-label";
import styles from "./ForgetPassword.module.scss";
import CustomInput from "@/components/Custom/CustomInput";
import ReturnButton from "@/components/Custom/ReturnButton/ReturnButton";
import DrawerButton from "@/components/Custom/DrawerButton";
import { postData } from "@/Services/ApiClient";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomToast from "@/components/CustomToast/CustomToast";
import { useNavigate } from "react-router";

function ForgetPassword() {
	const [email, setEmail] = useState("");
	const Navigate = useNavigate();
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			onSubmit();
		}
	}
	const onSubmit = async (e) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		let bodyData;
		if (email === "") {
			toast.error(
				<CustomToast Header="ایمیل" Message="ایمیل خود را وارد کنید" />
			);
			return;
		}
		if (!emailRegex.test(email)) {
			toast.error(
				<CustomToast Header="ایمیل" Message="فرمت ایمیل نادرست است" />
			);
			return;
		}

		bodyData = {
			email: email,
		};
		await postData("/auth/forgetpassword/", bodyData)
			.then((res) => {
				console.log("Data posted successfully:", res);
				toast.success(
					<CustomToast Header="لطفا ایمیل خود را بررسی کنید" />
				);
				setTimeout(() => Navigate("/"), 3000);
			})
			.catch((err) => {
				console.log("Data posting FAILED:", err);
				if (err?.response?.data) {
					const data = err?.response?.data;
					if (data?.non_field_errors) {
						if (
							data?.non_field_errors[0] === "Email does not exist."
						) {
							toast.error(
								<CustomToast Header="حساب کاربری با این ایمیل پیدا نشد" />
							);
						}
						else {
							toast.error(
								<CustomToast Header="مشکلی در ارسال ایمیل به وجود آمد" />
							);
						}
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
				placeholder="ایمیل"
				autofocus={true}
				onKey={(e) => handleKeyDown(e)}
				name="email"
				onChange={(e) => {
					setEmail(e.target.value);
					console.log(email);
				}}
			/>
			<DrawerButton classNames="mt-0" onClick={(e) => onSubmit(e)}>
				ارسال ایمیل
			</DrawerButton>
		</form>
	);
}

export default ForgetPassword;
