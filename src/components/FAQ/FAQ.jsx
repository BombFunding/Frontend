import { useFAQStore } from "@/stores/FAQStore";
import { useEffect, useRef, useState } from "react";

const Questions = [
	{
		question: `چجوری باید اکانت بسازیم؟`,
		answer: `برای ساخت اکانت، روی دکمه "ورود" کلیک کرده و گزینه "حساب کاربری ندارید" را انتخاب کنید. سپس یوزری که می خواهید برای خود بسازید راانتخاب کرده و در نهایت اطلاعات خود را وارد کرده و ثبت کنید`,
	},
	// {
	// 	question: `آیا به ما برای نگهداری اطلاعاتتان اعتماد ندارید؟`,
	// 	answer: `پلتفرم ما با در نظر گرفتن اعتماد کاربران و با ارائه امنیت قوی و سهولت استفاده برای دستیابی شما به اهدافتان طراحی شده است`,
	// },
	// {
	// 	question: "چجوری باید پسووردمون رو ریست کنیم؟",
	// 	answer: `برای تغییر پسوورد اکانت، روی دکمه "ورود" کلیک کرده و گزینه "رمز عبور خود را فراموش کرده اید" را انتخاب کنید. سپس ایمیل خود را وارد کرده و روی دکمه "ارسال" کلیک کنید. روی لینکی که در ایمیلتان فرستاده شده کلیک کنید تا بتوانید پسسورد جدیدتان را وارد کنید`,
	// },
	// {
	// 	question: `چطور می‌توانم استارتاپ‌های مناسب برای سرمایه‌گذاری را پیدا کنم؟`,
	// 	answer: `شما می‌توانید با استفاده از فیلترهای هوشمند سایت مانند حوزه فعالیت، استارتاپ‌های مناسب را پیدا کنید. همچنین بخش “محبوب‌ترین”، “برترین‌” و "جدیدترین" اطلاعات به‌روز را در اختیارتان قرار می‌دهد`,
	// },
	// {
	// 	question: `آیا خدمات سایت در سراسر ایران در دسترس است؟`,
	// 	answer: `بله، ما امکان نمایش استارتاپ‌ها و سرمایه‌گذاران از سراسر ایران را فراهم کرده‌ایم. شما می‌توانید بر اساس موقعیت جغرافیایی به دنبال شرکای مناسب بگردید`,
	// },
	////////////////////////////
	{
		question: "چطور در استارتاپ‌ها سرمایه‌گذاری کنم؟",
		answer: "برای سرمایه‌گذاری، کافی است وارد حساب کاربری خود شوید، استارتاپ موردنظر را انتخاب کرده و به در پوزیشن مورد نظر پرداخت را انجام بدهید.",
	},
	{
		question: "آیا می‌توانم سرمایه‌گذاری خود را لغو کنم؟",
		answer: "پس از ارسال پول به استارتاپ، امکان بازگشت وجه وجود ندارد.",
	},
	{
		question: "آیا می‌توانم در پروژه‌های مختلف سرمایه‌گذاری کنم؟",
		answer: "می‌توانید به جای تمرکز روی یک استارتاپ، سرمایه خود را در چند پروژه مختلف تقسیم کنید تا ریسک را کاهش دهید.",
	},
	{
		question: "آیا محدودیتی برای میزان سرمایه‌گذاری وجود دارد؟",
		answer: "خیر، محدودیتی برای سرمایه گذاری در یک یا چند استارتاپ وجود ندارد",
	},
	{
		question: "آیا امکان سرمایه‌گذاری مشترک با دیگران وجود دارد؟",
		answer: "بله، سرمایه‌گذاری گروهی یکی از گزینه‌های موجود است و می‌توانید همراه با سایر سرمایه‌گذاران در یک پروژه مشارکت کنید.",
	},
	{
		question: "ریسک‌های سرمایه‌گذاری چیست؟",
		answer: "ریسک‌های متداول شامل شکست پروژه، تاخیر در بازگشت سرمایه، یا عدم تحقق اهداف استارتاپ است.",
	},
	{
		question: "چگونه می‌توانم پروفایل استارتاپ خود را ویرایش کنم؟",
		answer: "با ورود به حساب کاربری، از طریق داشبورد می‌توانید اطلاعات، تصاویر، و مستندات خود را به‌روزرسانی کنید.",
	},
	{
		question:
			"چطور می‌توانم سرمایه‌گذاران را به استارتاپ خود علاقه‌مند کنم؟",
		answer: "ارائه اطلاعات شفاف و نمایش نقاط قوت استارتاپ شما می‌تواند سرمایه‌گذاران را جذب کند.",
	},
	{
		question: "آیا می‌توانم میزان سرمایه درخواستی خود را تغییر دهم؟",
		answer: "بله، شما می‌توانید مبلغ سرمایه موردنیاز خود را پس از نهایی کردن هم، تغییر دهید.",
	},
	{
		question: "چه تضمینی برای موفقیت در جذب سرمایه وجود دارد؟",
		answer: "تضمینی وجود ندارد، اما ارائه اطلاعات شفاف و برنامه‌های قوی شانس موفقیت شما را افزایش می‌دهد.",
	},
];

const FAQ = () => {
	const { toggleIndex } = useFAQStore();
	const itemRefs = useRef([]);
	const [openIndex, setOpenIndex] = useState(toggleIndex + 1 ? toggleIndex + 1 : null);

	const scrollToIndex = (index) => {
		if (itemRefs.current[index]) {
			itemRefs.current[index].scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	useEffect(() => {
		if (toggleIndex !== null) {
			setOpenIndex(toggleIndex + 1);
			scrollToIndex(toggleIndex);
		}
	}, [toggleIndex]);

	const toggleAccordion = (index) => {
		setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<section className="py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
					<div className="w-full">
						<div className="lg:max-w-xl">
							<div className="mb-6 lg:mb-16 w-[80vw]">
								<h6 className="text-lg text-center font-medium text-orange-600 mb-2 lg:text-right">
									پرسش و پاسخ
								</h6>
								<h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-right">
									دنبال جواب می‌گردید؟
								</h2>
							</div>
							<div className="accordion-group w-[80vw]">
								{Questions.map((question, index) => (
									<div
										key={index}
										ref={(el) =>
											(itemRefs.current[index] = el)
										}
										className="accordion py-8 border-b border-solid border-gray-200"
									>
										<button
											className={`accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-orange-600 ${
												openIndex === index
													? "text-orange-600 font-medium"
													: ""
											}`}
											onClick={() =>
												toggleAccordion(index)
											}
											aria-expanded={openIndex === index}
										>
											<svg
												className={`transition duration-500 ${
													openIndex === index
														? "rotate-180 text-orange-600"
														: ""
												}`}
												width="22"
												height="22"
												viewBox="0 0 22 22"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
													stroke="currentColor"
													strokeWidth="1.6"
													strokeLinecap="round"
													strokeLinejoin="round"
												></path>
											</svg>
											<h5 className="rtl">{question.question}</h5>
										</button>
										<div
											className={`accordion-content px-0 overflow-hidden pr-4 transition-all duration-500 ${
												openIndex === index
													? "max-h-[200px]"
													: "max-h-0"
											}`}
										>
											<p className="text-base rtl text-gray-500 font-normal mt-4">
												{question.answer}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FAQ;