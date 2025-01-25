import useStarboardStore from "@/stores/StarboardStore/StarboardStore";
import CustomInput from "../Custom/CustomInput/CustomInput";
import styles from "./FilterSection.module.scss";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import useTokenStore from "@/stores/TokenStore";

// const categories = [
// 	{ value: "تکنولوژی", label: "تکنولوژی " },
// 	{ value: "هنری ", label: "هنری" },
// 	{ value: "سلامت ", label: "سلامت" },
// 	{ value: "گردشگری ", label: "گردشگری" },
// 	{ value: "آموزش ", label: "آموزش" },
// 	{ value: "مالی ", label: "مالی" },
// ];
const categories = [
	{ value: "تکنولوژی", label: "تکنولوژی" },
	{ value: "هنری", label: "هنری" },
	{ value: "سلامت", label: "سلامت" },
	{ value: "گردشگری", label: "گردشگری" },
	{ value: "آموزش", label: "آموزش" },
	{ value: "مالی", label: "مالی" },
];

const subcategories = [
	{
		value: "هوش مصنوعی",
		label: "هوش مصنوعی",
		parent: "تکنولوژی",
	},
	{
		value: "اینترنت اشیا",
		label: "اینترنت اشیا",
		parent: "تکنولوژی",
	},
	{ value: "نرم‌افزار", label: "نرم‌افزار", parent: "تکنولوژی" },
	{ value: "امنیت", label: "امنیت", parent: "تکنولوژی" },
	{
		value: "واقعیت افزوده",
		label: "واقعیت افزوده",
		parent: "تکنولوژی",
	},
	{ value: "موسیقی", label: "موسیقی", parent: "هنری" },
	{ value: "سینما", label: "سینما", parent: "هنری" },
	{ value: "صنایع دستی", label: "صنایع دستی", parent: "هنری" },
	{ value: "تغذیه", label: "تغذیه", parent: "سلامت" },
	{ value: "روان", label: "روان", parent: "سلامت" },
	{ value: "درمان", label: "درمان", parent: "سلامت" },
	{ value: "فرهنگی", label: "فرهنگی", parent: "گردشگری" },
	{ value: "شهری", label: "شهری", parent: "گردشگری" },
	{ value: "بین‌المللی", label: "بین‌المللی", parent: "گردشگری" },
	{
		value: "کتاب و نشریات",
		label: "کتاب و نشریات",
		parent: "آموزش",
	},
	{ value: "توسعه فردی", label: "توسعه فردی", parent: "آموزش" },
	{
		value: "آموزشگاه",
		label: "آموزشگاه",
		parent: "آموزش",
	},
	{
		value: "سرمایه‌ گذاری",
		label: "سرمایه‌گذاری",
		parent: "مالی",
	},
	{ value: "ارز دیجیتال", label: "ارز دیجیتال", parent: "مالی" },
	{ value: "بیمه", label: "بیمه", parent: "مالی" },
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
		favorite,
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
		setFavorite,
	} = useStarboardStore();
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const { accessToken } = useTokenStore();
	const { userType } = useProfileStore();
	const onSubmit = (e) => {
		e?.preventDefault();
		setLoading(true);
		// reset();
		const formData = {
			// category: `"${mainCategory}"`,
			// subcategory: `"${subcategory}"`,
			search: searchQuery,
			results_per_page: resultsPerPage,
			page_number: pageNumber,
			my_favorite: favorite,
		};
		formData.append("category", mainCategory);
		formData.append("subcategory", subcategory);
		setPageNumber(page ? Number(page) : 1);
		console.log("formData", formData);
		getDataParams(`/starboard/${sorting}/`, null, formData).then((data) => {
			setResults(data.result_count);
			setTotalPages(data.total_pages);
			setProjects(data.results);
			setLoading(false);
		});
	};

	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<form
			onSubmit={onSubmit}
			className={`${styles.topMargin} mb-12 py-6 px-2 border-solid border-2 border-bomborange rounded-lg w-[95vw] text-[1vw] place-items-center place-self-center ${styles.formWidth}`}
		>
			<div className={`flex flex-row rtl gap-3 ${styles.flexBox}`}>
				<p className="place-self-center translate-y-[0.7vw]">
					{" "}
					پروژه های
				</p>
				<CustomInput
					placeholder="جستجو"
					value={searchQuery}
					onChange={setSearchQuery}
					inputClassName="text-right text-sm -translate-y-0 placeholder:text-[0]"
					labelClassname="-translate-y-1"
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
								<CommandEmpty>
									هیچ دسته‌بندی پیدا نشد
								</CommandEmpty>
								<CommandGroup>
									{categories.map((category) => (
										<CommandItem
											key={category.value}
											value={category.value}
											onSelect={(currentValue) => {
												setMainCategory(
													currentValue ===
														mainCategory
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
													mainCategory ===
														category.value
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
										(category) =>
											category.value === subcategory
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
											category.parent ===
												mainCategory && (
												<CommandItem
													key={category.value}
													value={category.value}
													onSelect={(
														currentValue
													) => {
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
				<p className="place-self-center translate-y-[0.7vw]">
					رو به ترتیب
				</p>
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
						<SelectItem
							value={"6"}
							className="hover:cursor-pointer"
						>
							6
						</SelectItem>
						<SelectItem
							value={"12"}
							className="hover:cursor-pointer"
						>
							12
						</SelectItem>
						<SelectItem
							value={"24"}
							className="hover:cursor-pointer"
						>
							24
						</SelectItem>
						<SelectItem
							value={"48"}
							className="hover:cursor-pointer"
						>
							48
						</SelectItem>
						<SelectItem
							value={"96"}
							className="hover:cursor-pointer"
						>
							96
						</SelectItem>
					</SelectContent>
				</Select>
				{/* <p className="place-self-center translate-y-[0.7vw]">پروژه‌</p> */}
				<Button
					className={`place-self-center translate-y-[0.7vw] bg-bomborange hover:bg-black hover:text-white col-span-2 ${styles.buttonWidth}`}
				>
					نمایش بده
				</Button>
			</div>
			{userType === "basic" && accessToken && (
				<div className="flex gap-2 place-self-end pt-5 pr-5">
					<Label>فقط دسته‌بندی‌های مورد علاقه من</Label>
					<Checkbox
						checked={favorite}
						onCheckedChange={setFavorite}
					/>
				</div>
			)}
		</form>
	);
}

export default FilterSection;
