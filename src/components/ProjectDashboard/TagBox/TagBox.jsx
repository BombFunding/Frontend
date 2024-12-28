import React from "react";
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
    "روان",
    "درمان",
    "فرهنگی",
    "شهری",
    "بین‌المللی",
    "کتاب و نشریات",
    "توسعه فردی",
    "آموزشگاه",
    "سرمایه گذاری",
    "ارز دیجیتال",
    "بیمه"
	];
	return (
		<div className={`${className} flex flex-col p-5`}>
			<Label>دسته بندی ها :</Label>
			<div className="flex flex-row gap-[0.6vw]">
				<Tags />
				<Popover>
					<PopoverTrigger>
						<button
							// className="btn h-8 bg-bomborange text-white"
							className="flex h-[1.8vw] pt-[0.33vw] px-[0.6vw] text-center text-[0.8vw] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3]"
							style={{ "min-height": "2px" }}
						>
							اضافه کردن
							<img
								src={plus}
								className="h-[70%] mt-[0.1vw] mr-[0.2vw]"
							/>
						</button>
					</PopoverTrigger>
					<PopoverContent>
						<Command
							className={`border-solid border-2 border-gray-200 p-3 ${styles.box}`}
						>
							<CommandInput
								className={`rtl ${styles.searchBox}`}
								placeholder="جستجو کنید ..."
							/>
							<CommandList>
								<CommandEmpty>
									<EmptySection
										textClassName="text-xs"
										imageClassName="w-2"
										type="سرمایه گذار"
									/>
								</CommandEmpty>
								<CommandGroup className={`rtl font-vazirmatn ${styles.box}`}>
									{tagCategories.map((item, index) => (
										<CommandItem
											value={item}
											key={index}
											className={`cursor-pointer ${styles.box}`}
										>
											<p className={`px-2 py-[2px] text-center text-xs  max-w-max rounded font-semibold text-[#7281a3] ${styles.box}`}>
												{item}
											</p>
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export default TagBox;
