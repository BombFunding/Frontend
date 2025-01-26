import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LandingIntroduce.module.scss";
import img2 from "../../assets/landing2.jpg";
import img4 from "../../assets/landing4.jpg";
import img9 from "../../assets/landing_back5.png";
// import BarChart from './BarChart';
import City3D from "@/components/City3D/City3D";

import landing6 from "../../assets/landing6.png";
import landing5 from "../../assets/landing5.png";
import FlipAnimation from "@/components/LandingIntroduce/FlipAnimation";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "@/Services/ApiClient/Services";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({
	text,
	el: Wrapper = "p",
	className,
	once,
	repeatDelay,
	animation = defaultAnimations,
}) => {
	const controls = useAnimation();
	const textArray = Array.isArray(text) ? text : [text];
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.5, once });

	useEffect(() => {
		let timeout;
		const show = () => {
			controls.start("visible");
			if (repeatDelay) {
				timeout = setTimeout(async () => {
					await controls.start("hidden");
					controls.start("visible");
				}, repeatDelay);
			}
		};

		if (isInView) {
			show();
		} else {
			controls.start("hidden");
		}

		return () => clearTimeout(timeout);
	}, [isInView]);

	const isRtl = textArray.some((line) => /[\u0600-\u06FF]/.test(line));

	return (
		<Wrapper className={className} dir={isRtl ? "rtl" : "ltr"}>
			<span className="sr-only">{textArray.join(" ")}</span>
			<motion.span
				ref={ref}
				initial="hidden"
				animate={controls}
				variants={{
					visible: { transition: { staggerChildren: 0.1 } },
					hidden: {},
				}}
				aria-hidden
			>
				{textArray.map((line, lineIndex) => (
					<span className="block" key={`${line}-${lineIndex}`}>
						{line.split(" ").map((word, wordIndex) => (
							<span
								className="inline-block"
								key={`${word}-${wordIndex}`}
							>
								{word.split("").map((char, charIndex) => (
									<motion.span
										key={`${char}-${charIndex}`}
										className="inline-block"
										variants={animation}
									>
										{char}
									</motion.span>
								))}
								<span className="inline-block">&nbsp;</span>
							</span>
						))}
					</span>
				))}
			</motion.span>
		</Wrapper>
	);
};

const defaultAnimations = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.1,
		},
	},
};

const App = () => {
	useEffect(() => {
		const lenis = new Lenis();

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		gsap.to(`.${styles.intro} .${styles["bg-img"]}`, {
			y: "80%",
			ease: "none",
			scrollTrigger: {
				trigger: `.${styles.intro}`,
				start: "top 1px",
				end: "bottom 100px",
				scrub: true,
			},
		});

		gsap.to(`.${styles.intro} .${styles["bg-img"]}`, {
			filter: "brightness(0.2t5) blur(16px)",
			ease: "none",
			scrollTrigger: {
				trigger: `.${styles.intro}`,
				start: "center top",
				scrub: true,
			},
		});

		gsap.to(`.${styles.intro} .${styles.title}`, {
			y: "45vh",
			ease: "none",
			scrollTrigger: {
				trigger: `.${styles.intro}`,
				start: "25% top",
				scrub: true,
			},
		});

		const progressTL = gsap.to(`.${styles["progress-thumb"]}`, {
			scaleX: 1,
			ease: "none",
			paused: true,
		});

		const slides = gsap.utils.toArray(`.${styles.slide}`);
		const slidesTL = gsap.timeline();

		slides.forEach((slide, i) => {
			const isFirst = i === 0;
			const tl = gsap.timeline();

			if (!isFirst) {
				tl.from(slide, { xPercent: 100 });
				tl.from(
					slide.querySelector("h2"),
					{
						duration: 0.25,
						opacity: 0,
						x: 100,
					},
					0.2
				);
			}

			tl.fromTo(
				slide.querySelector(`.${styles["bg-img"]}`),
				{
					xPercent: isFirst ? 0 : 8,
				},
				{
					xPercent: -8,
				},
				0
			);

			slidesTL.add(tl, isFirst ? undefined : "-=0.1");
		});

		ScrollTrigger.create({
			animation: slidesTL,
			trigger: `.${styles["slide-container"]}`,
			start: "top top",
			end: `+=${slides.length * 250}%`,
			scrub: 2,
			pin: true,
			anticipatePin: 1,
			onUpdate: (self) => {
				progressTL.progress(self.progress);
			},
		});

		//  ScrollTrigger.create({
		//     trigger: '.bar-chart',  // Target the BarChart component directly
		//     start: 'center bottom', // وقتی که وسط BarChart به پایین viewport رسید
		//     onEnter: () => {
		//       if (typeof window.BarChart !== 'undefined' && typeof window.BarChart.startAnimation === 'function') {
		//         setTimeout(() => {
		//           window.BarChart.startAnimation();
		//         },200);
		//       } else {
		//         console.error('BarChart.startAnimation is not defined.');
		//       }
		//     },
		//   });

		function counter(id, start, end, duration) {
			let obj = document.getElementById(id),
				current = start,
				range = end - start,
				increment = end > start ? 1 : -1,
				step = Math.abs(Math.floor(duration / range)),
				timer = setInterval(() => {
					current += increment;
					obj.innerHTML = `${current}<span class="plus-sign">+</span>`;
					if (current === end) {
						clearInterval(timer);
					}
				}, step);
		}

		const observer = new IntersectionObserver(
			async (entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					try {
						const response = await fetch(
							`${baseURL}/landing/get_statistics/`
						);
						const data = await response.json();

						const {
							total_base_profiles,
							total_startup_profiles,
							total_positions,
						} = data;

						counter("count1", 0, total_positions, 2000);
						counter("count2", 0, total_base_profiles, 2500);
						counter("count3", 0, total_startup_profiles, 3000);

						observer.disconnect();
					} catch (error) {
						console.error("Error fetching data from API:", error);
					}
				}
			},
			{ threshold: 0.5 }
		);

		const slide1 = document.getElementById("slide-1");
		if (slide1) observer.observe(slide1);

		return () => observer.disconnect();
	}, []);

	return (
		<>
			<div className={styles.intro}>
				<div className={styles.visual}>
					<City3D />
				</div>
				<div className={`${styles.content} bg-black/30 backdrop-blur-md p-11 rounded-badge`}>
					<AnimatedText
						el="h2"
						text={["BOMB FUNDING"]}
						repeatDelay={5000}
						className="text-[4vw] text-center flex justify-center font-bold text-white bg-black/20 rounded-md shadow-2xl League Gothic"
					/>

					<h1 className={`${styles.title}`}>
						<FlipAnimation />
					</h1>
					<p
						className="font-vazirmatn text-[0.6em] mt-4 text-center"
						style={{ whiteSpace: "pre-line" }}
					>
						بمب فاندینگ، پلتفرمی برای ارتباط با سرمایه گذاران ،
						کارآفرینان و حمایت کنندگان. {"\n"}
						چه ایده بزرگی داشته باشی چه کوچک، اینجا جایی برای
						توست...
					</p>

					<div className="mt-8 flex justify-center gap-4 text-right md:justify-right md:text-center">
						<Link
							to="/Starboard"
							className="btn font-vazirmatn text-[#0C0C42] bg-[#FFFFFFAD] hover:bg-[#FFBB00AD] hover:text-white text-[1rem] w-[10rem] border-4 border-bomborange md:w-[8rem] sm:w-[9rem]"
						>
							کشف پروژه‌ها
						</Link>
						<Link
							to="/SignUp"
							className="btn font-vazirmatn text-[#0C0C42] bg-[#FFFFFFAD] hover:bg-[#FFBB00AD] hover:text-white text-[1rem] w-[10rem] md:w-[8rem] sm:w-[9rem]"
						>
							ثبت نام
						</Link>
					</div>
				</div>
			</div>

			<div className={styles["slide-container"]}>
				<section
					id="slide-1"
					className={`${styles.slide} ${styles["slide-odd"]}`}
				>
					<img
						src={img2}
						className={styles["bg-img"]}
						alt="Slide 1 Background"
					/>
					<div className={styles["overlay"]}>
						<h1 className={styles["title"]}>
							تعداد کاربران و موقعیت های سایت
						</h1>
						<div
							className={`${styles["counters"]} row justify-content-center text-center`}
						>
							<div className="col-md-4">
								<span
									id="count1"
									className={styles["counter"]}
								></span>
								<p className={styles["counter-label"]}>
									تعداد پوزیشن{" "}
									<span className={styles["plus-sign"]}>
										+
									</span>
								</p>
							</div>
							<div className="col-md-4">
								<span
									id="count2"
									className={styles["counter"]}
								></span>
								<p className={styles["counter-label"]}>
									تعداد کاربران عادی{" "}
									<span className={styles["plus-sign"]}>
										+
									</span>
								</p>
							</div>
							<div className="col-md-4">
								<span
									id="count3"
									className={styles["counter"]}
								></span>
								<p className={styles["counter-label"]}>
									تعداد کاربران استارتاپ{" "}
									<span className={styles["plus-sign"]}>
										+
									</span>
								</p>
							</div>
						</div>
					</div>
				</section>

				<section
					id="slide-2"
					className={`${styles.slide} ${styles["slide-even"]}`}
				>
					<img
						src={img9}
						className={styles["bg-img"]}
						alt="Slide 2 Background"
					/>
					<h2 className={styles["slide-title"]}>
						{/* <div className="flex place-items-center place-content-center p-[1vw] justify-evenly">
						 */}
						<div
							id="my-flex-container"
							className="flex place-items-center place-content-center p-[1vw] justify-evenly"
						>
							<section>
								<h2 className="text-black font-vazirmatn text-[2vw] p-[1vw] text-center">
									چطور یک سرمایه گذاری موفق را شروع کنیم؟
								</h2>
								<p className="text-black font-vazirmatn text-[1.5vw] p-[1vw] text-center align-middle place-self-center rtl">
									فقط یا سه مرحله ساده میتوانید از پلتفرم ما
									برای سرمایه گذاری خود استفاده کنید.
								</p>
								<ol
									className={`text-black font-vazirmatn text-[1vw] align-middle place-self-center rtl ${styles.steps}`}
								>
									<li
										className={styles.step}
										style={{
											display: "flex",
											alignItems: "center",
											gap: "1rem",
											marginBottom: "1.5rem",
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="40"
											height="40"
											viewBox="0 0 50 50"
											fill="#FF7517"
										>
											<circle cx="25" cy="25" r="25" />
											<text
												x="50%"
												y="50%"
												textAnchor="middle"
												dy=".3em"
												fontSize="20"
												fill="white"
												fontFamily="Arial, sans-serif"
											>
												1
											</text>
										</svg>
										<span className="text-[1.5vw] sm:text-[1.2vw] md:text-[1.25vw] lg:text-[1.5vw]">
											ثبت‌ نام کنید: بعنوان کاربر عادی
											حساب کاربری بسازید.
										</span>
									</li>
									<li
										className={styles.step}
										style={{
											display: "flex",
											alignItems: "center",
											gap: "1rem",
											marginBottom: "1.5rem",
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="40"
											height="40"
											viewBox="0 0 50 50"
											fill="#FF7517"
										>
											<circle cx="25" cy="25" r="25" />
											<text
												x="50%"
												y="50%"
												textAnchor="middle"
												dy=".3em"
												fontSize="20"
												fill="white"
												fontFamily="Arial, sans-serif"
											>
												2
											</text>
										</svg>
										<span className="text-[1.5vw] sm:text-[1.2vw] md:text-[1.25vw] lg:text-[1.5vw]">
											پروژه ها را با فیلتر دلخواه خود
											جستجو کنید و موقعیت های مورد علاقه
											را ذخیره کنید.
										</span>
									</li>
									<li
										className={styles.step}
										style={{
											display: "flex",
											alignItems: "center",
											gap: "1rem",
											marginBottom: "1.5rem",
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="40"
											height="40"
											viewBox="0 0 50 50"
											fill="#FF7517"
										>
											<circle cx="25" cy="25" r="25" />
											<text
												x="50%"
												y="50%"
												textAnchor="middle"
												dy=".3em"
												fontSize="20"
												fill="white"
												fontFamily="Arial, sans-serif"
											>
												3
											</text>
										</svg>
										<span className="text-[1.5vw] sm:text-[1.2vw] md:text-[1.25vw] lg:text-[1.5vw]">
											حساب خود را شارژ کنید و از پروژه
											مورد نظر حمایت کنید.
										</span>
									</li>
								</ol>
							</section>
							<img
								src={landing5}
								className="w-5/12 place-self-center object-contain hidden sm:block"
							/>
						</div>
					</h2>
				</section>

				<section
					id="slide-3"
					className={`${styles.slide} ${styles["slide-even"]}`}
				>
					<img
						src={img4}
						className={styles["bg-img"]}
						alt="Slide 2 Background"
					/>
					<h2 className={styles["slide-title"]}>
						<div className="flex place-items-center place-content-center p-[1vw] justify-evenly">
							<section>
								<h2 className="text-black font-vazirmatn text-[2vw] p-[1vw] text-center">
									چطور یک استارتاپ موفق را شروع کنیم؟
								</h2>
								<p className="text-black font-vazirmatn text-[1.5vw] p-[1vw] text-center align-middle place-self-center rtl">
									فقط یا پنج مرحله ساده میتوانید از پلتفرم ما
									برای استارتاپ خود استفاده کنید.
								</p>
								<ol
									className={`text-black font-vazirmatn text-[1vw] align-middle place-self-center rtl ${styles.steps}`}
								>
									<li
										className={styles.step}
										style={{
											display: "flex",
											alignItems: "center",
											gap: "1rem",
											marginBottom: "1.5rem",
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="40"
											height="40"
											viewBox="0 0 50 50"
											fill="#FF7517"
										>
											<circle cx="25" cy="25" r="25" />
											<text
												x="50%"
												y="50%"
												textAnchor="middle"
												dy=".3em"
												fontSize="20"
												fill="white"
												fontFamily="Arial, sans-serif"
											>
												1
											</text>
										</svg>
										<span className="text-[1.5vw] sm:text-[1.2vw] md:text-[1.25vw] lg:text-[1.5vw]">
											بعنوان کاربر استارتاپ حساب کاربری
											بسازید یا اگر اکانتی دارد به نوع
											استارتاپ تغییر دهید.
										</span>
									</li>
									<li
										className={styles.step}
										style={{
											display: "flex",
											alignItems: "center",
											gap: "1rem",
											marginBottom: "1.5rem",
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="40"
											height="40"
											viewBox="0 0 50 50"
											fill="#FF7517"
										>
											<circle cx="25" cy="25" r="25" />
											<text
												x="50%"
												y="50%"
												textAnchor="middle"
												dy=".3em"
												fontSize="20"
												fill="white"
												fontFamily="Arial, sans-serif"
											>
												2
											</text>
										</svg>
										<span className="text-[1.5vw] sm:text-[1.2vw] md:text-[1.25vw] lg:text-[1.5vw]">
											پروفایل خود را پر کنید و اطلاعاتی
											مانند اعضای تیم و جزئیات شرکت نوپای
											استارتاپی خود را وارد کنید.
										</span>
									</li>
									<li
										className={styles.step}
										style={{
											display: "flex",
											alignItems: "center",
											gap: "1rem",
											marginBottom: "1.5rem",
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="40"
											height="40"
											viewBox="0 0 50 50"
											fill="#FF7517"
										>
											<circle cx="25" cy="25" r="25" />
											<text
												x="50%"
												y="50%"
												textAnchor="middle"
												dy=".3em"
												fontSize="20"
												fill="white"
												fontFamily="Arial, sans-serif"
											>
												3
											</text>
										</svg>
										<span className="text-[1.5vw] sm:text-[1.2vw] md:text-[1.25vw] lg:text-[1.5vw]">
											به کمک ادیتور پروژه ای که میخواهید
											را بسازید تا به کمک آن به سرمایه
											گذاران معرفی شوید.
										</span>
									</li>
									<li
										className={styles.step}
										style={{
											display: "flex",
											alignItems: "center",
											gap: "1rem",
											marginBottom: "1.5rem",
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="40"
											height="40"
											viewBox="0 0 50 50"
											fill="#FF7517"
										>
											<circle cx="25" cy="25" r="25" />
											<text
												x="50%"
												y="50%"
												textAnchor="middle"
												dy=".3em"
												fontSize="20"
												fill="white"
												fontFamily="Arial, sans-serif"
											>
												4
											</text>
										</svg>
										<span className="text-[1.5vw] sm:text-[1.2vw] md:text-[1.25vw] lg:text-[1.5vw]">
											برای پروژه خود پوزیشن بسازید و برای
											پوزیشن خود دنبال سرمایه گذار بگردید.
										</span>
									</li>
								</ol>
							</section>
							<img
								src={landing6}
								className="w-5/12 place-self-center object-contain hidden sm:block"
							/>
						</div>
					</h2>
				</section>
			</div>
		</>
	);
};

export default App;
