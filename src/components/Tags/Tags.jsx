import useStarboardStore from "@/stores/StarboardStore/StarboardStore";
import { useNavigate } from "react-router-dom";
import plus from "../../assets/plus.png";

function Tags({ tags, className, dashboard, deleteTag }) {
	const Navigate = useNavigate();
	const { setSubcategory, englishToPersian } = useStarboardStore();
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
			</div>
		</div>
	);
}

export default Tags;
