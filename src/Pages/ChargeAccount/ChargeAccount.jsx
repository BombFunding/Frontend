import { Label } from "@radix-ui/react-label";
import styles from "./ChargeAccount.module.scss";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { useState } from "react";
import { postData } from "@/Services/ApiClient/Services";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { useNavigate } from "react-router-dom";
function ChargeAccount() {
	const Navigate = useNavigate();
	const [charge, setCharge] = useState(0);
	const onSubmit = (e) => {
		e.preventDefault();
		postData(`/balance/balance/`, { amount: charge })
			.then((data) => {
				toast.success(
					<CustomToast Header={`موجودی شما با موفقیت افزایش یافت`} />
				);
				setTimeout(() => Navigate("/dashboard"), 3000);
			})
			.catch((err) => {
				console.log(err);
				toast.error(
					<CustomToast
						Header="خطا"
						Message="مشکلی در افزایش موجودی وجود دارد"
					/>
				);
			});
	};
	return (
		<form
			className={`font-vazirmatn grid gap-[5vh] ${styles.container} `}
			onSubmit={(e) => onSubmit(e)}
		>
			<Label className="text-black text-[2.25vw]">
				چقدر میخواهید حساب خود را شارژ کنید؟
			</Label>
			<CustomInput
				placeholder="مقدار شارژ"
				onChange={setCharge}
				value={charge}
				type="number"
			/>
			<button className="btn bg-bomborange text-black hover:text-white mt-[5vh]">
				شارژ حساب
			</button>
		</form>
	);
}

export default ChargeAccount;
