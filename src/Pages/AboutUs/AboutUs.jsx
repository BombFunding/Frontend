import TeamCard from "./TeamCard/TeamCard";
import ErfanTajik from "../../assets/ErfanTajik.png";
import AlirezaRahimi from "../../assets/AlirezaRahimi.png";
import AminFiroozi from "../../assets/AminFiroozi.png";
import TaranehAbdollahi from "../../assets/TaranehAbdollahi.png";
import MiladZarei from "../../assets/MiladZarei.png";
import AliShahrezaei from "../../assets/AliShahrezaei.png";
import styles from "./AboutUs.module.scss";
function AboutUs() {
	return (
		<div className="ml-5">
			<section className="py-14 lg:py-24 relative z-0 bg-gray-50 w-full mx-auto">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center w-full">
					<h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl  text-gray-900 mb-5 md:text-5xl md:leading-normal font-vazirmatn">
						ارتباط استارت‌آپ‌ها و سرمایه گذاران با
						<span className="text-orange-600 font-vazirmatn">
							{" "}
							بمب فاندینگ{" "}
						</span>
					</h1>
					<p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9 font-vazirmatn">
						سرمایه گذاری هوشمندانه
						<br></br>و کمک به شروع استارتاپ های تازه
					</p>
				</div>
			</section>
			<section className="py-14 lg:py-24 relative">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
						<div className="img-box">
							<img
								src="https://pagedone.io/asset/uploads/1702034769.png"
								alt="About Us tailwind page"
								// className="max-lg:mx-auto object-cover"
								className="w-full max-w-lg object-cover"
							/>
						</div>
						<div className="lg:pl-[100px] flex items-center justify-cente">
							<div className="data w-full">
								<h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative font-vazirmatn">
									{" "}
									درباره ما{" "}
								</h2>
								<p className="font-vazirmatn text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto text-right">
									تیم بامب فاندینگ اینجاست تا ارتباطی قوی و
									موثر بین استارتاپ‌ها و سرمایه‌گذاران ایجاد
									کند. اگر سرمایه‌گذار هستید، می‌توانید با
									اطلاعات شفاف و اطمینان بیشتر، در آینده‌ای
									روشن سرمایه‌گذاری کنید. اگر استارتاپ هستید،
									اینجا فرصت‌های بی‌نظیری برای رشد و موفقیت
									کسب‌وکارتان در انتظار شماست. ما کنارتان
									هستیم تا مسیرتان به سوی پیشرفت هموارتر شود و
									رویاهایتان را به واقعیت تبدیل کنید
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="py-14 lg:py-24 relative">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
					<div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 ">
						<div className="lg:pr-24 flex items-center">
							<div className="data w-full">
								<img
									src="https://pagedone.io/asset/uploads/1702034785.png"
									alt="About Us tailwind page"
									className="block lg:hidden mb-9 mx-auto object-cover"
								/>
								<h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center font-vazirmatn">
									فعالیت ما از ۱۴۰۳ شروع شده
								</h2>
								<p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto font-vazirmatn">
									تیم بامب فاندینگ پروژه خودش رو از سال ۱۴۰۳
									در به عنوان در تحلیل و طراحی شون انجام داده
									و بخاطر پتانسیل بالاش، حالا تبدیل به یک سایت
									خیلی بزرگتر برای استفاده مردم سراسر ایران
									شده
								</p>
							</div>
						</div>
						<div className="img-box ">
							<img
								src="https://pagedone.io/asset/uploads/1702034785.png"
								alt="About Us tailwind page"
								className="hidden lg:block object-cover"
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="py-20 bg-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h2 className="font-manrope text-4xl text-center text-gray-900 font-bold mb-14 font-vazirmatn">
						نتیجه پروژه ما
					</h2>
					<div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
						<div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
							<div className="flex gap-5">
								<div className="font-manrope text-2xl font-bold text-indigo-600 font-vazirmatn">
									۴۰%
								</div>
								<div className="flex-1">
									<h4 className="text-xl text-gray-900 font-semibold mb-2 font-vazirmatn">
										رشد سرمایه شرکت
									</h4>
									<p className="text-xs text-gray-500 leading-5 font-vazirmatn">
										رشد قابل توجه شرکت ما در نتیجه زحمت های
										بسیار تیم بامب فاندینگ
									</p>
								</div>
							</div>
						</div>
						<div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
							<div className="flex gap-5">
								<div className="font-manrope text-2xl font-bold text-indigo-600 font-vazirmatn">
									+۱
								</div>
								<div className="flex-1">
									<h4 className="text-xl text-gray-900 font-semibold mb-2 font-vazirmatn">
										رشد تیم شرکت
									</h4>
									<p className="text-xs text-gray-500 leading-5 font-vazirmatn">
										تیم بامب فاندینگ در کنار رشد شرکت، رشد
										می کنه تا بتونه بهترین تجربه کاربری رو
										به کاربران عزیزمون بده{" "}
									</p>
								</div>
							</div>
						</div>
						<div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
							<div className="flex gap-5">
								<div className="font-manrope text-2xl font-bold text-indigo-600 font-vazirmatn">
									+۱۰
								</div>
								<div className="flex-1">
									<h4 className="text-xl text-gray-900 font-semibold mb-2 font-vazirmatn">
										استارتاپ های موفق در سایت ما
									</h4>
									<p className="text-xs text-gray-500 leading-5 font-vazirmatn">
										سایت بامب فاندینگ با افتخار تونسته به
										بیش از ۱۰ استارتاپ کمک کنه تا بتونند
										وارد بازار بشند و کسب درآمد کنند
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className=" py-14 lg:py-24 bg-gray-50">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
					<div className="mb-16 rounded-full">
						<h2 className="text-4xl font-manrope font-bold text-gray-900 text-center rtl font-vazirmatn">
							نظر های کاربران درباره بمب فاندینگ !
						</h2>
					</div>
					<div className={`swiper ${styles.mySwiper2} text-white`}>
						<div className="swiper-wrapper">
							<div className="swiper-slide">
								<div className="relative mb-20">
									<div className="flex justify-center w-full mx-auto lg:max-w-4xl">
										<p className="text-lg text-gray-500 leading-8 text-center rtl font-vazirmatn !mr-0">
											از زمانی که پروژه‌ام رو در این سایت
											معرفی کردم، واقعاً تحولی در روند جذب
											سرمایه‌گذار به وجود اومد. طراحی و
											ساختار سایت خیلی ساده و کاربرپسنده.
											تونستم با استفاده از ابزارهای جستجوی
											دقیق و فیلترهای کاربردی،
											سرمایه‌گذارهایی رو پیدا کنم که
											دقیقاً با نیازهای استارتاپ من
											همخوانی داشتند. این سایت علاوه بر
											اینکه دسترسی به سرمایه‌گذاران رو
											برای ما راحت کرده، به ما این امکان
											رو می‌ده که ایده‌ها و پروژه‌هایمون
											رو به طور حرفه‌ای و جذاب معرفی کنیم.
											قطعاً این سایت یکی از بهترین تصمیمات
											ما بود و توصیه می‌کنم هر استارتاپی
											که به دنبال رشد و توسعه است، از این
											پلتفرم استفاده کنه.{" "}
										</p>
									</div>
								</div>
							</div>
							<div className="swiper-slide">
								<div className="relative mb-20">
									{/*Slider Wrapper*/}
									<div className="max-w-max mx-auto lg:max-w-4xl">
										<p className="text-lg text-gray-500 leading-8 mb-8 text-center rtl font-vazirmatn">
											به عنوان یک سرمایه‌گذار که به دنبال
											پروژه‌های نوآورانه هستم، این سایت به
											من کمک کرد که خیلی سریع به
											استارتاپ‌های جدید و پرپتانسیل دسترسی
											پیدا کنم. دسته‌بندی دقیق
											استارتاپ‌ها، اطلاعات شفاف و راحتی در
											ارتباط با تیم‌ها، از ویژگی‌های
											برجسته این پلتفرم است. من می‌تونم به
											راحتی استارتاپ‌هایی که با اهداف من
											همخوانی دارند رو پیدا کنم و در صورت
											نیاز، جلسات مشاوره و سرمایه‌گذاری
											ترتیب بدم. این سایت واقعاً یک ابزار
											قدرتمند برای کسانیه که می‌خوان به
											دنبال فرصت‌های جدید سرمایه‌گذاری
											برن.
										</p>
									</div>
								</div>
							</div>
							<div className="swiper-slide">
								<div className="relative mb-20">
									{/*Slider Wrapper*/}
									<div className="max-w-max mx-auto lg:max-w-4xl">
										<p className="text-lg text-gray-500 leading-8 mb-8 text-center rtl font-vazirmatn">
											استارتاپ من همیشه در جستجوی راه‌هایی
											برای معرفی ایده‌ها و جذب
											سرمایه‌گذاران جدید بوده. با استفاده
											از این پلتفرم، تونستیم نه تنها
											سرمایه‌گذاران جدیدی پیدا کنیم، بلکه
											بازخوردهای بسیار مفیدی از اون‌ها
											دریافت کنیم که باعث شد روند توسعه
											استارتاپمون رو سریع‌تر پیش ببریم.
											سیستم‌های دسته‌بندی و نمایش داده‌های
											سایت به‌قدری خوب طراحی شده که برای
											تیم‌های استارتاپی مثل ما، پیدا کردن
											اطلاعات و برقراری ارتباط با
											سرمایه‌گذاران ساده‌تر می‌شه. این
											سایت برای هر استارتاپی که می‌خواد
											پیشرفت کنه، یک ابزار ضروریه.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="flex py-14 lg:py-24 ">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-24">
						<h2 className="font-manrope text-4xl text-center font-bold text-gray-900 mb-6 font-vazirmatn">
							با تیم ما آشنا بشید
						</h2>
					</div>
					<div className="pb-10">
						<div
							// className={`${styles.team} items-center gap-[3vw]`}
							className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6`}
						>
							<TeamCard
								name="عرفان تاجیک"
								role="لیدر تیم فرانت‌اند"
								description="با خلاقیت هرچه تمام دنبال تکنولوژی‌های روز دنیاست و جدیدترین‌هارو به ارمغان میاره"
								picture={ErfanTajik}
							/>
							<TeamCard
								name="امین فیروزی"
								role="لیدر تیم"
								description="لیدر تیم که همه هماهنگی هارو انجام میده و ویژگی‌های جدید رو به سایت اضافه میکنه"
								picture={AminFiroozi}
							/>
							<TeamCard
								className="rtl"
								name="ترانه عبداللهی"
								role="فول‌استک دولوپر"
								description="همیشه سعی میکنه هرجایی مشکلی وجود داره خودشو برسونه و کمک کنه و خلاقیت عالی داره"
								picture={TaranehAbdollahi}
							/>
							<TeamCard
								className="rtl"
								name="میلاد زارعی"
								role="لیدر تیم بک‌اند و دوآپس"
								description="مهارت‌های زیادی داره و موقعش که بشه وارد گادمود میشه"
								picture={MiladZarei}
							/>

							<TeamCard
								name="علیرضا رحیمی"
								role="فرانت‌اند دولوپر"
								description="همیشه تمام تلاششو میکنه که مفید واقع بشه و دنبال خلاقیت میره"
								picture={AlirezaRahimi}
							/>

							<TeamCard
								name="علی شاهرضایی"
								role="فرانت‌اند دولوپر"
								description="با اینکه خلاقیت زیادی نداره اما تلاش زیادی میکنه که جبران کنه"
								picture={AliShahrezaei}
							/>
						</div>
						<div className="swiper-pagination" />
						<div className="swiper-scrollbar" />
					</div>
				</div>
			</section>
		</div>
	);
}

export default AboutUs;
