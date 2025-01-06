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
