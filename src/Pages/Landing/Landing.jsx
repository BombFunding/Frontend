import InfiniteCarousel from "@/components/InfiniteCarousel/InfiniteCarousel";
import LandingIntroduce from "@/components/LandingIntroduce/LandingIntroduce";
import landing5 from "../../assets/landing5.png"
import landing6 from "../../assets/landing6.png"
import landing7 from "../../assets/landing7.png"
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
import { Label } from "@radix-ui/react-label";
import styles from "./Landing.module.scss";
import CardComponent from "@/components/LandingIntroduce/Dunat";

const Landing = () => {
	return (
		<>
			<div>
        <LandingIntroduce />
      </div>
			<div className="flex justify-evenly place-items-center place-content-center rtl">
				<section>
					<div className="text-black font-vazirmatn text-[2vw] p-[3vw] text-center align-middle place-self-center">
					چطور یک استارتاپ موفق را شروع کنیم؟
					</div>
					<div className="text-black font-vazirmatn text-[1.5vw] px-[6vw] text-center align-middle place-self-center">
						پلتفرم ما برای کمک به استارتاپ‌ها، هنرمندان، و
						کارآفرینان طراحی شده است تا از طریق جذب سرمایه جمعی،
						رویاهایشان را محقق کنند. چه ایده بزرگی داشته باشی، چه
						علاقه به سرمایه‌گذاری در پروژه‌های نوآورانه، اینجا جایی
						برای توست
					</div>
				</section>
				<img
					src={landing6}
					className="w-5/12 place-self-center object-contain"
				/>
			</div>
			
			
			<div className="flex place-items-center place-content-center p-[1vw] justify-evenly">
				<section>
					<h2 className="text-white font-vazirmatn text-[0.75vw] p-[1vw] text-center">
					بببولسبللللللللللللللللللللللللللللللللفففففففففففبببولسبللللللللللللللللللللللللللللللللفففففففففففبببولسبللللللللللللللللللللللللللللللللفففففففففففبببولسبللللللللللللللللللللللللللللللللففففففففففف
					</h2>

					<h2 className="text-black font-vazirmatn text-[2vw] p-[1vw] text-center">
					چطور یک سرمایه گذاری موفق را شروع کنیم؟
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
					src={landing5}
					className="w-5/12 place-self-center object-contain"
				/>
			</div>

			<div className="py-20">
				<div className="rtl flex justify-between px-5">
					<Label className="text-black font-vazirmatn text-2xl pr-10 top-10 place-content-center">
						پربازدیدترین استارت‌آپ‌ها
					</Label>
					<button className="text-black font-vazirmatn place-content-center text-[1.1vw]"
					onClick={()=>{}}>
						دیدن بیشتر...
					</button>
				</div>
				<InfiniteCarousel>
				<div>{[logo1, logo2, logo4, logo7, logo10, logo3, logo9, logo6, logo5, logo8]}</div>
				</InfiniteCarousel>
				<div className="rtl flex justify-between px-5">
					<Label className="text-black font-vazirmatn text-2xl pr-10 top-10 place-content-center">
					محبوب‌ترین استارت‌آپ‌ها
					</Label>
					<button className="text-black font-vazirmatn place-content-center text-[1.1vw]"
					onClick={()=>{}}>
						دیدن بیشتر...
					</button>
				</div>
				<InfiniteCarousel>
				<div>{[logo1, logo2, logo4, logo7, logo10, logo3, logo9, logo6, logo5, logo8]}</div>
				</InfiniteCarousel>
				<div className="rtl flex justify-between px-5">
					<Label className="text-black font-vazirmatn text-2xl pr-10 top-10 place-content-center">
						پردرآمدترین استارت‌آپ‌ها
					</Label>
					<button className="text-black font-vazirmatn place-content-center text-[1.1vw]"
					onClick={()=>{}}>
						دیدن بیشتر...
					</button>
				</div>
				<InfiniteCarousel>
					<div>{[logo1, logo2, logo4, logo7, logo10, logo3, logo9, logo6, logo5, logo8]}</div>
				</InfiniteCarousel>
			</div>

			<div style={{ width: '100vw', height: 'auto', overflow: 'hidden' }}>
			<img src={landing7} alt="Landing Image" style={{ width: '100%', height: 'auto' }} />
			</div>
						
		</>

		
	);
};

export default Landing;
