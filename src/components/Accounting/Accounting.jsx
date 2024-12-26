import { useNavigate } from "react-router-dom";
import Accouting from "../../assets/wallet.png";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import styles from "./Accounting.module.scss";
function Accounting({ className }) {
	const Navigate = useNavigate();
	const { balance } = useProfileStore();
	return (
		<section className={`${styles.container} ${className}`}>
			<h1 className={styles.text_section}>
				<img src={Accouting} className={styles.logo} />
				<div className={styles.accounting}>حسابداری</div>
			</h1>
			<div className={styles.balance}>{balance} تومان</div>
			<button
				className="btn bg-bomborange text-black hover:text-white m-[2vw]"
				onClick={() => Navigate("/ChargeAccount")}
			>
				افزایش موجودی
			</button>
		</section>
	);
}

export default Accounting;
