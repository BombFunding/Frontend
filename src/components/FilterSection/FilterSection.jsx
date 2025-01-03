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

const categories = [
	{ value: "تکنولوژی", label: "تکنولوژی" },
	{ value: "هنری", label: "هنری" },
	{ value: "سلامت", label: "سلامت" },
	{ value: "گردشگری", label: "گردشگری" },
	{ value: "آموزش", label: "آموزش" },
	{ value: "مالی", label: "مالی" },
];

const subcategories = [
	{ value: "هوش مصنوعی", label: "هوش مصنوعی", parent: "تکنولوژی" },
	{ value: "اینترنت اشیا", label: "اینترنت اشیا", parent: "تکنولوژی" },
	{ value: "نرم‌افزار", label: "نرم‌افزار", parent: "تکنولوژی" },
	{ value: "امنیت", label: "امنیت", parent: "تکنولوژی" },
	{ value: "واقعیت افزوده", label: "واقعیت افزوده", parent: "تکنولوژی" },
	{ value: "موسیقی", label: "موسیقی", parent: "هنری" },
	{ value: "سینما", label: "سینما", parent: "هنری" },
	{ value: "صنایع دستی", label: "صنایع دستی", parent: "هنری" },
	{ value: "تغذیه", label: "تغذیه", parent: "سلامت" },
	{ value: "روان‌شناسی", label: "روان‌شناسی", parent: "سلامت" },
	{ value: "درمان", label: "درمان", parent: "سلامت" },
	{ value: "فرهنگی", label: "فرهنگی", parent: "گردشگری" },
	{ value: "شهری", label: "شهری", parent: "گردشگری" },
	{ value: "بین‌المللی", label: "بین‌المللی", parent: "گردشگری" },
	{ value: "کتب و نشریات", label: "کتب و نشریات", parent: "آموزشی" },
	{ value: "توسعه فردی", label: "توسعه فردی", parent: "آموزشی" },
	{ value: "مؤسسات آموزشی", label: "مؤسسات آموزشی", parent: "آموزشی" },
	{
		value: "سرمایه‌گذاری",
		label: "سرمایه‌گذاری",
		parent: "مالی",
	},
	{ value: "رمزارز", label: "رمزارز", parent: "مالی" },
	{ value: "بیمه", label: "بیمه", parent: "مالی" },
];

function FilterSection() {
	const {
		searchQuery,
		sorting,
		mainCategory,
		resultsPerPage,
		pageNumber,
		subcategory,
		englishToPersian,
		setMainCategory,
		setSubcategory,
		setSearchQuery,
		setProjects,
		setResultsPerPage,
		setSorting,
		setLoading,
		setResults,
		reset,
	} = useStarboardStore();
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const onSubmit = (e) => {
		e?.preventDefault();
		const formData = {
			category: englishToPersian[mainCategory],
			subcategory: englishToPersian[subcategory],
			search: searchQuery,
			results_per_page: resultsPerPage,
			page_number: pageNumber,
		};
		// console.log(`/starboard/${sorting}/`, formData);
		setLoading(true);
		getDataParams(`/starboard/${sorting}/`, null, formData).then((data) => {
			console.log("data", data);
			setResults(data.results_count);
			setProjects(data.results);
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
