import InfiniteCarousel from "@/components/InfiniteCarousel/InfiniteCarousel";
import LandingIntroduce from "@/components/LandingIntroduce/LandingIntroduce";
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
const Landing = () => {
	return (
		<>
		
			<div>
				<LandingIntroduce /> {/* استفاده از کامپوننت LandingIntroduce */}
				<InfiniteCarousel />

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
