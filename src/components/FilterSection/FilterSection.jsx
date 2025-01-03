import useStarboardStore from "@/stores/StarboardStore/StarboardStore";
import CustomInput from "../Custom/CustomInput/CustomInput";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getDataParams } from "@/Services/ApiClient/Services";
import { useParams } from "react-router-dom";

const categories = [
	{ value: "Technology", label: "تکنولوژی " },
	{ value: "Art ", label: "هنری" },
	{ value: "Wellness ", label: "سلامت" },
	{ value: "Tourism ", label: "گردشگری" },
	{ value: "Education ", label: "آموزش" },
	{ value: "Finance ", label: "مالی" },
];
// const categories = [
// 	{ value: "تکنولوژی", label: "تکنولوژی " },
// 	{ value: "هنری ", label: "هنری" },
// 	{ value: "سلامت ", label: "سلامت" },
// 	{ value: "گردشگری ", label: "گردشگری" },
// 	{ value: "آموزش ", label: "آموزش" },
// 	{ value: "مالی ", label: "مالی" },
// ];

const subcategories = [
	{
		value: "Artificial Intelligence",
		label: "هوش مصنوعی",
		parent: "Technology",
	},
	{
		value: "Internet of Things",
		label: "اینترنت اشیا",
		parent: "Technology",
	},
	{ value: "Software", label: "نرم‌افزار", parent: "Technology" },
	{ value: "Security", label: "امنیت", parent: "Technology" },
	{
		value: "Augmented Reality",
		label: "واقعیت افزوده",
		parent: "Technology",
	},
	{ value: "Music", label: "موسیقی", parent: "Art" },
	{ value: "Cinema", label: "سینما", parent: "Art" },
	{ value: "Handicrafts", label: "صنایع دستی", parent: "Art" },
	{ value: "Nutrition", label: "تغذیه", parent: "Wellness" },
	{ value: "Psychology", label: "روان‌شناسی", parent: "Wellness" },
	{ value: "Therapy", label: "درمان", parent: "Wellness" },
	{ value: "Cultural", label: "فرهنگی", parent: "Tourism" },
	{ value: "Urban", label: "شهری", parent: "Tourism" },
	{ value: "International", label: "بین‌المللی", parent: "Tourism" },
	{
		value: "Books and Publications",
		label: "کتب و نشریات",
		parent: "Education",
	},
	{ value: "Personal Development", label: "توسعه فردی", parent: "Education" },
	{
		value: "Educational Institutions",
		label: "مؤسسات آموزشی",
		parent: "Education",
	},
	{
		value: "Investment Fund",
		label: "سرمایه‌گذاری",
		parent: "Finance",
	},
	{ value: "Cryptocurrency", label: "رمزارز", parent: "Finance" },
	{ value: "Insurance", label: "بیمه", parent: "Finance" },
];

function FilterSection() {
	const { page } = useParams();
	const {
		searchQuery,
		sorting,
		mainCategory,
		resultsPerPage,
		pageNumber,
		subcategory,
		setMainCategory,
		setSubcategory,
		setSearchQuery,
		setProjects,
		setResultsPerPage,
		setSorting,
		setLoading,
		setResults,
		setPageNumber,
		setTotalPages,
		reset,
	} = useStarboardStore();
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const onSubmit = (e) => {
		e?.preventDefault();
		setLoading(true);
		// reset();
		const formData = {
			category: mainCategory,
			subcategory: subcategory,
			search: searchQuery,
			results_per_page: resultsPerPage,
			page_number: pageNumber,
		};
		setPageNumber(page ? Number(page) : 1);
		getDataParams(`/starboard/${sorting}/`, null, formData).then((data) => {
			setResults(data.result_count);
			setTotalPages(data.total_pages);
			setProjects(data.results);
			console.log(data.results);
			setLoading(false);
		});
	};

	return (
		<form
			className="mt-36 mb-12 pt-6 pb-12 w-[95%] place-items-center place-content-center place-self-center flex flex-row rtl gap-3 border-solid border-2 border-bomborange rounded-lg"
			onSubmit={onSubmit}
		>
			<p className="place-self-center translate-y-[0.7vw]">
				به من پروژه های
			</p>
			<CustomInput
				placeholder="جستجو"
				value={searchQuery}
				onChange={setSearchQuery}
				inputClassName="text-right text-[1rem]"
			/>
			<p className="place-self-center translate-y-[0.7vw]">
				{mainCategory ? "از دسته بندی" : "از"}
			</p>
			<Popover open={open1} onOpenChange={setOpen1}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open1}
						className="place-self-center translate-y-[0.7vw]"
					>
						{mainCategory
							? categories.find(
									(category) =>
										category.value === mainCategory
							  )?.label
							: "همه دسته‌بندی‌ها"}
						{/* <ChevronsUpDown className="opacity-50" /> */}
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<Command>
						<CommandInput placeholder="دسته بندی" />
						<CommandList className="rtl">
							<CommandEmpty>هیچ دسته‌بندی پیدا نشد</CommandEmpty>
							<CommandGroup>
								{categories.map((category) => (
									<CommandItem
										key={category.value}
										value={category.value}
										onSelect={(currentValue) => {
											setMainCategory(
												currentValue === mainCategory
													? ""
													: currentValue
											);
											setOpen1(false);
										}}
										className="hover:cursor-pointer"
									>
										{category.label}
										<Check
											className={cn(
												"ml-auto",
												mainCategory === category.value
													? "opacity-100"
													: "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<p className="place-self-center translate-y-[0.7vw]">
				{subcategory ? "از زیر دسته‌بندی" : "از"}
			</p>
			<Popover open={open2} onOpenChange={setOpen2}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open2}
						className="place-self-center translate-y-[0.7vw]"
					>
						{subcategory
							? subcategories.find(
									(category) => category.value === subcategory
							  )?.label
							: "همه زیردسته‌بندی‌ها"}
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<Command>
						<CommandInput placeholder="زیر دسته‌بندی" />
						<CommandList className="rtl">
							<CommandEmpty>
								{mainCategory
									? "هیچ زیر دسته‌بندی پیدا نشد"
									: "لطفا ابتدا یک دسته‌بندی انتخاب کنید"}
							</CommandEmpty>
							<CommandGroup>
								{subcategories.map(
									(category) =>
										category.parent === mainCategory && (
											<CommandItem
												key={category.value}
												value={category.value}
												onSelect={(currentValue) => {
													setSubcategory(
														currentValue ===
															subcategory
															? ""
															: currentValue
													);
													setOpen2(false);
												}}
												className="hover:cursor-pointer"
											>
												{category.label}
												<Check
													className={cn(
														"ml-auto",
														subcategory ===
															category.value
															? "opacity-100"
															: "opacity-0"
													)}
												/>
											</CommandItem>
										)
								)}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<p className="place-self-center translate-y-[0.7vw]">رو به ترتیب</p>
			<Select
				defaultValue="most-recent"
				value={sorting}
				onValueChange={(value) => {
					setSorting(value);
				}}
			>
				<SelectTrigger className="place-self-center w-32 translate-y-[0.7vw] rtl">
					<SelectValue placeholder="جدیدترین" />
				</SelectTrigger>
				<SelectContent className="rtl">
					<SelectItem
						value="most-recent"
						className="hover:cursor-pointer"
					>
						جدیدترین
					</SelectItem>
					<SelectItem
						value="top-visited"
						className="hover:cursor-pointer"
					>
						پربازدیدترین
					</SelectItem>
					<SelectItem
						value="top-liked"
						className="hover:cursor-pointer"
					>
						محبوب‌ترین
					</SelectItem>
				</SelectContent>
			</Select>
			<p className="place-self-center translate-y-[0.7vw]">
				پروژه‌ها در هر صفحه
			</p>
			<Select
				defaultValue="6"
				value={resultsPerPage}
				onValueChange={(value) => {
					setResultsPerPage(value);
				}}
			>
				<SelectTrigger className="place-self-center w-16 translate-y-[0.7vw] rtl">
					<SelectValue placeholder={"6"} />
				</SelectTrigger>
				<SelectContent className="rtl w-16">
					<SelectItem value={"6"} className="hover:cursor-pointer">
						6
					</SelectItem>
					<SelectItem value={"12"} className="hover:cursor-pointer">
						12
					</SelectItem>
					<SelectItem value={"24"} className="hover:cursor-pointer">
						24
					</SelectItem>
					<SelectItem value={"48"} className="hover:cursor-pointer">
						48
					</SelectItem>
					<SelectItem value={"96"} className="hover:cursor-pointer">
						96
					</SelectItem>
				</SelectContent>
			</Select>
			<p className="place-self-center translate-y-[0.7vw]">پروژه‌</p>
			<Button className="place-self-center translate-y-[0.7vw] bg-bomborange hover:bg-black hover:text-white">
				نمایش بده
			</Button>
		</form>
	);
}

export default FilterSection;
