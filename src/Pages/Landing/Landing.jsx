import InfiniteCarousel from "@/components/InfiniteCarousel/InfiniteCarousel";
import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import logo4 from "../../assets/logo4.png";
import logo5 from "../../assets/logo5.png";
import logo6 from "../../assets/logo6.png";
import logo7 from "../../assets/logo7.png";
import logo8 from "../../assets/logo8.png";
import logo9 from "../../assets/logo9.png";
import logo10 from "../../assets/logo10.png";
import shakinghands from "../../assets/shakinghands.png";
import teamwork1 from "../../assets/teamwork1.png";
import { Label } from "@radix-ui/react-label";
import styles from "./Landing.module.scss";
const Landing = () => {
	return (
		<>
			<div className="flex px-10">
				<img
					src={teamwork1}
					className="w-5/12 place-self-center object-contain"
				/>
				<div className="place-items-center place-content-center">
					<div className="text-black font-vazirmatn text-6xl p-10 text-center align-middle place-self-center">
						جایی که ایده‌ها زنده می‌شوند
					</div>
					<div className="text-black font-vazirmatn text-3xl p-5 text-center align-middle place-self-center">
						به جامعه‌ای از نوآوران، سرمایه‌گذاران و حمایت‌کنندگان
						بپیوندید تا دنیای بهتری بسازید
					</div>
					<div className="place-self-center flex gap-5">
						<button className="btn font-vazirmatn text-black bg-bomborange hover:text-white">
							ایجاد موقعیت جدید
						</button>
						<button className="btn font-vazirmatn text-black bg-bomborange hover:text-white">
							کشف پروژه‌ها
						</button>
					</div>
				</div>
			</div>
			<div className="flex px-10">
				<div className="place-items-center place-content-center">
					<div
						className={`text-black font-vazirmatn text-6xl p-20 text-center align-middle place-self-center ${styles.bigtext}`}
					>
						با ما دسترسی به سرمایه آسان‌تر از همیشه است
					</div>
				</div>
				<img
					src={shakinghands}
					className="w-1/2 place-self-center object-contain"
				/>
			</div>
			<div>
				<Label className="text-black font-vazirmatn text-2xl pr-20 top-10">
					پربازدیدترینها
				</Label>
				<InfiniteCarousel />
				<Label className="text-black font-vazirmatn text-2xl pr-20 mt-10">
					محبوب‌ترینها
				</Label>
				<InfiniteCarousel />
				<Label className="text-black font-vazirmatn text-2xl pr-20 mt-10">
					جدیدترینها
				</Label>
				<InfiniteCarousel />
			</div>
		</>
	);
};

export default Landing;
