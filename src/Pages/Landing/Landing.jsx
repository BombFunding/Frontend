import InfiniteCarousel from "@/components/InfiniteCarousel/InfiniteCarousel";
import shakinghands from "../../assets/shakinghands.png";
import handshaking from "../../assets/handshaking.png";
import teamwork1 from "../../assets/teamwork1.png";
import howtouse from "../../assets/howtouse.png";
import { Label } from "@radix-ui/react-label";
import styles from "./Landing.module.scss";
import { useEffect, useState } from "react";
import { getData } from "@/Services/ApiClient/Services";
const Landing = () => {
	const [topFunded, setTopFunded] = useState([]);
	const [topVisited, setTopVisited] = useState([]);
	const [topLiked, setTopLiked] = useState([]);
	useEffect(() => {
		getData("/landing/get_statistics/").then((data) => {
			console.log(data);
		});
		// getData("/landing/top_funded_startups/").then((data) => {
		// 	console.log("topFunded: +++++++++++++++++++++++++++++", data);
		// 	setTopFunded(data);
		// });
		getData("/landing/top_visited_startups/").then((data) => {
			console.log("topVisited: ", data);
			setTopVisited(data);
		});
		getData("/landing/top_liked_startups/").then((data) => {
			console.log("topLiked: ", data);
			setTopLiked(data);
		});
	}, []);
	return (
		<>
			<div className="flex p-10">
				<img
					src={teamwork1}
					className="w-5/12 place-self-center object-contain"
				/>
				<section className="place-items-center place-content-center">
					<div className="text-black font-vazirmatn text-[3vw] p-[3vw] text-center align-middle place-self-center">
						جایی که ایده‌ها زنده می‌شوند
					</div>
					<div className="text-black font-vazirmatn text-[1.8vw] p-[3vw] text-center align-middle place-self-center">
						به جامعه‌ای از نوآوران، سرمایه‌گذاران و حمایت‌کنندگان
						بپیوندید تا دنیای بهتری بسازید
					</div>
					<div className="place-self-center flex gap-5">
						<button className="btn font-vazirmatn text-black bg-bomborange hover:text-white text-[0.9vw] w-[10vw] h-[2vw]">
							ایجاد موقعیت جدید
						</button>
						<button className="btn font-vazirmatn text-black bg-bomborange hover:text-white text-[0.9vw] w-[8vw] h-[3vw]">
							کشف پروژه‌ها
						</button>
					</div>
				</section>
			</div>
			<div className="flex px-10">
				<section className="place-items-center place-content-center">
					<div
						className={`text-black font-vazirmatn text-[3vw] p-[5vw] text-center align-middle place-self-center ${styles.bigtext}`}
					>
						با ما دسترسی به سرمایه آسان‌تر از همیشه است
					</div>
				</section>
				<img
					src={shakinghands}
					className="w-1/2 place-self-center object-contain"
				/>
			</div>
			<div className="flex justify-evenly place-items-center place-content-center rtl">
				<section>
					<div className="text-black font-vazirmatn text-[4vw] p-[3vw] text-center align-middle place-self-center">
						ما چه کار می‌کنیم؟
					</div>
					<div className="text-black font-vazirmatn text-[1.5vw] px-[6vw] text-center align-middle place-self-center">
						پلتفرم ما برای کمک به استارتاپ‌ها، هنرمندان، و
						کارآفرینان طراحی شده است تا از طریق جذب سرمایه جمعی،
						رویاهایشان را محقق کنند. چه یک ایده بزرگ داشته باشید، چه
						علاقه به سرمایه‌گذاری در پروژه‌های نوآورانه، اینجا جایی
						برای شماست.
					</div>
				</section>
				<img
					src={handshaking}
					className="w-5/12 place-self-center object-contain"
				/>
			</div>
			<div className="flex place-items-center place-content-center p-[1vw] justify-evenly">
				<section>
					<h2 className="text-black font-vazirmatn text-[3vw] p-[1vw] text-center">
						چطور از پلتفرم ما استفاده کنید؟
					</h2>
					<p className="text-black font-vazirmatn text-[1.5vw] p-[1vw] text-center align-middle place-self-center rtl">
						فقط با سه مرحله ساده می‌توانید از پلتفرم ما استفاده
						کنید:
					</p>
					<ol
						className={`text-black font-vazirmatn text-[1vw] align-middle place-self-center rtl ${styles.steps}`}
					>
						<li className={styles.step}>
							<div className={styles.step_icon}>1️⃣</div>
							ثبت‌ نام کنید: به‌راحتی حساب کاربری خود را بسازید
						</li>
						<li className={styles.step}>
							<div className={styles.step_icon}>2️⃣</div>
							استارت‌آپ راه‌اندازی کنید یا پروژه‌ها را جستجو کنید
						</li>
						<li className={styles.step}>
							<div className={styles.step_icon}>3️⃣</div>
							از ایده‌ها حمایت کنید یا سرمایه جذب کنید
						</li>
					</ol>
				</section>
				<img
					src={howtouse}
					className="w-5/12 place-self-center object-contain"
				/>
			</div>
			<div className="py-20">
				<div className="rtl flex justify-between px-5">
					<Label className="text-black font-vazirmatn text-2xl pr-10 top-10 place-content-center">
						پربازدیدترین استارت‌آپ‌ها
					</Label>
					<button
						className="text-blue-700 font-vazirmatn place-content-center text-[1.1vw]"
						onClick={() => {}}
					>
						دیدن بیشتر...
					</button>
				</div>
				<InfiniteCarousel items={topVisited} />

				{/* <div className="rtl flex justify-between px-5">
					<Label className="text-black font-vazirmatn text-2xl pr-10 top-10 place-content-center">
						جذاب‌ترین استارت‌آپ‌ها
					</Label>
					<button
						className="text-blue-700 font-vazirmatn place-content-center text-[1.1vw]"
						onClick={() => {}}
					>
						دیدن بیشتر...
					</button>
				</div>
				<InfiniteCarousel items={topFunded} /> */}

				<div className="rtl flex justify-between px-5">
					<Label className="text-black font-vazirmatn text-2xl pr-10 top-10 place-content-center">
						محبوب‌ترین استارت‌آپ‌ها
					</Label>
					<button
						className="text-blue-700 font-vazirmatn place-content-center text-[1.1vw]"
						onClick={() => {}}
					>
						دیدن بیشتر...
					</button>
				</div>
				<InfiniteCarousel items={topLiked} />
			</div>
		</>
	);
};

export default Landing;
