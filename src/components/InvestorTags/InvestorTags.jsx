import useStarboardStore from "@/stores/StarboardStore/StarboardStore";
import { useNavigate } from "react-router-dom";
import plus from "../../assets/plus.png";
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
import EmptySection from "../EmptySection/EmptySection";
import CustomToast from "../Custom/CustomToast/CustomToast";
import { toast } from "react-toastify";
import { deleteData, postData } from "@/Services/ApiClient/Services";
import styles from "./InvestorTags.module.scss";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
function InvestorTags({
	tags,
	className,
	dashboard,
	setLoading,
	setSubcategories,
}) {
	const { setSubcategory, englishToPersian } = useStarboardStore();
	const Navigate = useNavigate();
	const { username } = useProfileStore();
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
		"بیمه",
	];
	const handleAddTag = (tag) => {
		if (tags.includes(tag)) {
			toast.error(<CustomToast Header="این دسته‌بندی تکراری است" />);
			return;
		}
		setLoading(true);
		postData(`/categories/${username}/`, { subcategory: tag }).then(
			(data) => {
				setSubcategories((prev) => [...prev, tag]);
				setLoading(false);
			}
		);
		// patchData(`/projects/${projectId}/`, formData, {
		// 	headers: {
		// 		"Content-Type": "multipart/form-data",
		// 	},
		// })
		// 	.then((data) => {
		// 		console.log("Data: ", data);
		// 		updateProject(projectId);
		// 	})
		// 	.catch((err) => {
		// 		console.log("Error: ", err);
		// 	});
		// .finally(() => setLoading(false));
	};

	const deleteTag = (tag) => {
		setLoading(true);
		console.log({ subcategory: tag });
		deleteData(`/categories/${username}/`, { subcategory: tag }).then(
			(data) => {
				// subCategories.filter((subcategory) => subcategory !== tag)
				setSubcategories((prev) =>
					prev.filter((subcategory) => subcategory !== tag)
				);
				setLoading(false);
			}
		);
		// patchData(`/projects/${projectId}/`, formData, {
		// 	headers: {
		// 		"Content-Type": "multipart/form-data",
		// 	},
		// })
		// 	.then((data) => {
		// 		console.log("Data: ", data);
		// 		updateProject(projectId);
		// 	})
		// 	.catch((err) => {
		// 		console.log("Error: ", err);
		// 	});
	};
	// useEffect(() => {
	// 	console.log(persianToEnglishMain["تکنولوژی"]);
	// }, []);
	return (
		<div
			className={`flex flex-col rtl justify-center place-items-start bg-white dark:bg-transparent py-4 rounded-lg ${className}`}
		>
			{/* <p className="font-semibold text-xl text-gray-600 mb-2">Tags</p> */}
			<div className="flex flex-wrap gap-[0.6vw]">
				{tags.map((tag, index) => (
					<p
						className="flex h-[1.8vw] pt-[0.33vw] px-[0.6vw] text-center text-[0.8vw] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3] cursor-pointer"
						style={{ "min-height": "2px" }}
						onClick={() => {
							if (!dashboard) {
								setSubcategory(tag);
								Navigate("/starboard");
							}
						}}
						key={index}
					>
						{englishToPersian[tag] ?? tag}
						{dashboard ? (
							<img
								src={plus}
								className="h-[70%] mt-[0.1vw] mr-[0.3vw] rotate-45"
								onClick={() => deleteTag(tag)}
							/>
						) : (
							<></>
						)}
					</p>
				))}
				{dashboard ? (
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
									<CommandGroup
										className={`rtl font-vazirmatn ${styles.box}`}
									>
										{tagCategories.map((item, index) => (
											<CommandItem
												value={item}
												key={index}
												className={`cursor-pointer ${styles.box}`}
											>
												<p
													onClick={() =>
														handleAddTag(item)
													}
													className={`px-2 py-[2px] text-center text-xs  max-w-max rounded font-semibold text-[#7281a3] ${styles.box}`}
												>
													{item}
												</p>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default InvestorTags;
