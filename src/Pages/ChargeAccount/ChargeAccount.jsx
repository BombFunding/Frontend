import { Label } from "@radix-ui/react-label";
import styles from './ChargeAccount.module.scss'
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
function ChargeAccount() {
	return (
		<div className={`font-vazirmatn grid gap-[5vh] ${styles.container} `}>
            <Label className="text-black text-[2.25vw]">چقدر میخواهید حساب خود را شارژ کنید؟</Label>
			{/* <input type="number" className={`w-[30vw] ${styles.Input}`}/> */}
            <CustomInput placeholder="مقدار شارژ" />
            <button className="btn mt-[5vh]">شارژ حساب</button>
		</div>
	);
}

export default ChargeAccount;
