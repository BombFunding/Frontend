import styles from "./TagBox.module.scss";
import Tags from "@/components/Tags/Tags";
import plus from "../../../assets/plus.png";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import EmptySection from "@/components/EmptySection/EmptySection";
import { Label } from "@/components/ui/label";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";
import { patchData, postData } from "@/Services/ApiClient/Services";
import { Loading } from "@/components/Loading/Loading";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

const TagBox = ({ className }) => {
	const tagCategories = [
		"هوش مصنوعی",
		"اینترنت اشیا",
		"نرم‌افزار",
		"امنیت",
		"واقعیت افزوده",
		"موسیقی",
		"سینما",
		"صنایع دستی",
		"تغذیه",
		"روان‌شناسی",
		"درمان",
		"فرهنگی",
		"شهری",
		"بین‌المللی",
		"کتب و نشریات",
		"توسعه فردی",
		"مؤسسات آموزشی",
		"صندوق سرمایه‌گذاری",
		"رمزارز",
		"بیمه",
	];

	const persianToEnglish = {
		"هوش مصنوعی": "Artificial Intelligence",
		"اینترنت اشیا": "Internet of Things",
		نرم‌افزار: "Software",
		امنیت: "Security",
		"واقعیت افزوده": "Augmented Reality",
		موسیقی: "Music",
		سینما: "Cinema",
		"صنایع دستی": "Handicrafts",
		تغذیه: "Nutrition",
		روان‌شناسی: "Psychology",
		درمان: "Therapy",
		فرهنگی: "Cultural",
		شهری: "Urban",
		بین‌المللی: "International",
		"کتب و نشریات": "Books and Publications",
		"توسعه فردی": "Personal Development",
		"مؤسسات آموزشی": "Educational Institutions",
		سرمایه‌گذاری: "Investment Fund",
		رمزارز: "Cryptocurrency",
		بیمه: "Insurance",
	};

	const englishToPersian = {
		"Artificial Intelligence": "هوش مصنوعی",
		"Internet of Things": "اینترنت اشیا",
		Software: "نرم‌افزار",
		Security: "امنیت",
		"Augmented Reality": "واقعیت افزوده",
		Music: "موسیقی",
		Cinema: "سینما",
		Handicrafts: "صنایع دستی",
		Nutrition: "تغذیه",
		Psychology: "روان‌شناسی",
		Therapy: "درمان",
		Cultural: "فرهنگی",
		Urban: "شهری",
		International: "بین‌المللی",
		"Books and Publications": "کتب و نشریات",
		"Personal Development": "توسعه فردی",
		"Educational Institutions": "مؤسسات آموزشی",
		"Investment Fund": "سرمایه‌گذاری",
		Cryptocurrency: "رمزارز",
		Insurance: "بیمه",
	};
	const { subCategories, loading } = useProjectStore();

	if (loading)
		return (
			<div className={`bg-white w-full h-full`}>
				<Loading className={`place-self-center`} />
			</div>
		);
	return (
		<div className={`${className} flex flex-col p-5`}>
			<Label className="text-black text-lg">دسته‌بندی‌ها</Label>
			{loading ? (
				<Loading size={8} className="pb-8 place-self-center" />
			) : (
				<div className="flex flex-row gap-[0.6vw]">
					<Tags
						tags={subCategories?.map((tag) => tag)}
						dashboard={true}
					/>
				</div>
			)}
		</div>
	);
};

export default TagBox;
