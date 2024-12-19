import styles from "./PromotionForm.module.scss";
import { Card } from "@/components/ui/card";
import { postData } from "@/Services/ApiClient/Services";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { useNavigate } from "react-router-dom";
import startup from "../../../../assets/startup.png";
import investor from "../../../../assets/investor.png";
import useTokenStore from "@/stores/TokenStore";
function PromotionForm() {
	const { deleteToken } = useTokenStore();
	const Navigate = useNavigate();
	const PromoteToInvestor = (e) => {
		e.preventDefault();
		postData("/promotion/to_investor/")
			.then((data) => {
				toast.success(
					<CustomToast Header="حساب کاربری شما با موفقیت به سرمایه گذار تبدیل شد" />
				);
				setTimeout(() => {
					deleteToken();
					Navigate("/login");
				}, 3000);
			})
			.catch((err) => {
				toast.error(
					<CustomToast
						Header="خطا"
						Message="خطایی در هنگام تبدیل شدن به سرمایه گذار رخ داد"
					/>
				);
			});
	};
	const PromoteToStartup = (e) => {
		e.preventDefault();
		postData("/promotion/to_startup/")
			.then((data) => {
				toast.success(
					<CustomToast Header="حساب کاربری شما با موفقیت به استارت آپ تبدیل شد" />
				);
				setTimeout(() => {
					deleteToken();
					Navigate("/login");
				}, 3000);
			})
			.catch((err) => {
				toast.error(
					<CustomToast
						Header="خطا"
						Message="خطایی در هنگام تبدیل شدن به استارت آپ رخ داد"
					/>
				);
			});
	};
	return (
		<form className="font-vazirmatn place-items-center">
			<div className={styles.container}>
				<Card
					className="border-solid border-2 my-[4vw] border-bomborange px-[3vw] h-[30vw] place-content-center place-items-center hover:cursor-pointer"
					onClick={PromoteToStartup}
				>
					<div className="flex gap-4">
						<img
							className="place-self-center w-12 h-12"
							src={startup}
						/>
						<div className="text-[2vw] py-[2vw] mt-2">
							استارت آپ
						</div>
					</div>
					<div className="rtl place-self-end px-[3vw] text-xl mb-3">
						امکانات:
					</div>
					<ul
						className="flex flex-col gap-2 rtl"
						style={{ listStyleType: "disc" }}
					>
						<li>ایده های خود را عملی کنید</li>
						<li>
							امکان معرفی ایده‌ها به شبکه‌ای از سرمایه‌گذاران و
							متخصصان
						</li>
						<li>با صفحه ساز شخصی پروژه خود را به همه معرفی کنید</li>
						<li>
							فرصت دریافت بازخورد از کاربران پیش از ارائه محصول
							نهایی
						</li>
						<li>ایجاد پروفایل حرفه‌ای برای ایده یا شرکت خود</li>
						<li>
							قرار گرفتن در لیست پیشنهادی برای سرمایه‌گذاران معتبر
						</li>
						<li>
							ایجاد کمپین‌های تبلیغاتی و جذب توجه به صورت
							گسترده‌تر
						</li>
						<li>
							افزایش شانس موفقیت با دسترسی به تجربیات سایر
							کارآفرینان
						</li>
					</ul>
				</Card>
				<Card
					className="border-solid border-2 border-bomborange my-[4vw] px-[3vw] h-[30vw] place-content-center place-items-center hover:cursor-pointer"
					onClick={PromoteToInvestor}
				>
					<div className="flex gap-4">
						<img
							className="place-self-center w-12 h-12"
							src={investor}
						/>
						<div className="text-[2vw] py-[2vw] mt-2">
							سرمایه گذار
						</div>
					</div>
					<div className="rtl place-self-end px-[3vw] text-xl mb-3">
						امکانات:
					</div>
					<ul
						className="flex flex-col gap-2 rtl"
						style={{ listStyleType: "disc" }}
					>
						<li>ایده های با ارزش را کشف کنید</li>
						<li>روی استارت اپ های نوپا سرمایه گذاری کنید</li>
						<li>
							با استارتاپ‌های فعال در حوزه‌های مختلف شبکه‌سازی
							کنید
						</li>
						<li>
							با صفحه ساز شخصی پوزیشن های جدید سرمایه گذاری باز
							کنید
						</li>
						<li>بخشی از هیئت‌مدیره استارتاپ‌ها شوید</li>
						<li>
							دسترسی به ایده‌هایی که پیش از عمومی شدن به اشتراک
							گذاشته می‌شوند
						</li>
						<li>به ساخت اکوسیستم کارآفرینی کمک کنید</li>
						<li>اطلاع‌رسانی فوری درباره ایده‌ها و فرصت‌های جدید</li>
					</ul>
				</Card>
			</div>
		</form>
	);
}

export default PromotionForm;
