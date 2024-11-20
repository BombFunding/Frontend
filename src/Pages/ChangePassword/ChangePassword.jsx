import { Label } from "@radix-ui/react-label";
import styles from "./ChangePassword.module.scss";
import CustomInput from "@/components/Custom/CustomInput";
import { useState } from "react";
import DrawerButton from "@/components/Custom/DrawerButton";

function ChangePassword() {
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			onSubmit();
		}
	}
	const onSubmit = async (e) => {};
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
				placeholder="Email address"
				autofocus={true}
				onKey={(e) => handleKeyDown(e)}
				name="email"
				value={email}
				onChange={setEmail}
			/>
            <Label className={styles.Label}>تایید رمز عبور جدید</Label>
			<CustomInput
				placeholder="Confirm email address"
				autofocus={true}
				onKey={(e) => handleKeyDown(e)}
				name="confirmEmail"
				value={confirmEmail}
				onChange={setConfirmEmail}
			/>
			<DrawerButton classNames="mt-0" onClick={(e) => onSubmit(e)}>
				تغییر رمز عبور
			</DrawerButton>
			{/* <CustomButton>Nigga</CustomButton> */}
		</form>
	);
}

export default ChangePassword;
