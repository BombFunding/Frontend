import Tags from "@/components/Tags/Tags";
import { Label } from "@/components/ui/label";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";
import { Loading } from "@/components/Loading/Loading";

const TagBox = ({ className }) => {
	const { subCategories, loading } = useProjectStore();

	if (loading)
		return (
			<div className={`bg-white w-full h-full`}>
				<Loading className={`place-self-center`} />
			</div>
		);
	return (
		<div
			className={`${className} flex flex-col p-5`}
		>
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
