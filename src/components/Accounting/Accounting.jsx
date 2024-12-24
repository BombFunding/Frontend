import { useNavigate } from "react-router-dom";
import Accouting from "../../assets/wallet.png";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
function Accounting({ className }) {
	const Navigate = useNavigate();
	const { balance } = useProfileStore();
	return (
		<section
			className={`border-solid h-full border-2 rounded-lg border-bomborange p-[1vw] flex flex-col items-center justify-evenly ${className}`}
		>
			<h1 className="flex gap-[1vw] p-[2vw] self-center">
				<img src={Accouting} className="h-[2.75vw] place-self-center" />
				<div className="h-[3vw] place-content-center text-[2vw]">حسابداری</div>
			</h1>
			<div className="rtl">{balance} تومان</div>
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
