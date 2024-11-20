import { Label } from "@radix-ui/react-label";
import styles from "./ForgetPassword.module.scss";
import CustomInput from "@/components/Custom/CustomInput";
import ReturnButton from "@/components/Custom/ReturnButton/ReturnButton";
import DrawerButton from "@/components/Custom/DrawerButton";

function ForgetPassword() {
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			onSubmit();
		}
	}
	function onSubmit(e) {
		e.preventDefault();
	}
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
			/>
			<DrawerButton classNames="mt-0" onClick={(e) => onSubmit(e)}>
				ارسال ایمیل
			</DrawerButton>
			{/* <CustomButton>Nigga</CustomButton> */}
		</form>
	);
}

export default ForgetPassword;
