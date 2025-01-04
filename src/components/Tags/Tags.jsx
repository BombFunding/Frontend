import useStarboardStore from "@/stores/StarboardStore/StarboardStore";
import { useNavigate } from "react-router-dom";

function Tags({ tags, className, dashboard }) {
	const Navigate = useNavigate();
	const { setSubcategory } = useStarboardStore();
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
						className="h-[1.8vw] pt-[0.33vw] px-[0.6vw] text-center text-[0.8vw] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3] cursor-pointer"
						onClick={() => {
							if (!dashboard) {
								setSubcategory(tag);
								Navigate("/starboard");
							}
						}}
						key={index}
					>
						{tag}
					</p>
				))}
			</div>
		</div>
	);
}

export default Tags;
