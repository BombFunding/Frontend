import { Progress } from "@/components/ui/progress";
import mockuppic from "../../assets/upProfile.jpg";
import mockuppic2 from "../../assets/baner.jpg";
import clock from "../../assets/clock.png";
import styles from "./StartupCard.module.scss";
import defaultpfp from "../../assets/defaultpfp.png";
import Bookmark from "../Bookmark/Bookmark";
import Tags from "../Tags/Tags";
import Like from "../Like/Like";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import useStarboardStore from "@/stores/StarboardStore/StarboardStore";
function StartupCard({
	image,
	name,
	id,
	subcategories,
	likeCount,
	description,
	onImageLoad,
}) {
	const Navigate = useNavigate();
	return (
		<div className={`${styles.container}`}>
			<img
				src={image ? image : mockuppic2}
				className={`${styles.image} hover:cursor-pointer`}
				onClick={() => Navigate(`/projects/${id}`)}
				onLoad={onImageLoad}
			/>
			<Progress
				value={10}
				className={styles.progress_bar}
				ProgressColor="bg-bomborange"
			/>
			<div className="flex justify-between">
				<div className="flex">
					<img
						src={defaultpfp}
						className="rounded-full w-[4vw] m-[1vw]"
					/>
					<h1 className="text-[1.2vw] place-self-center">{name}</h1>
				</div>
				<div className="flex">
					<Like className="pr-[1vw] pl-[1vw] place-self-center" likeCount={likeCount} />
					<Bookmark className="pl-[1.5vw] place-self-center" />
				</div>
			</div>
			<Accordion type="single" collapsible className="w-full p-3">
				<AccordionItem value="item-1">
					<AccordionTrigger>اطلاعات بیشتر</AccordionTrigger>
					<AccordionContent>
						<div className="flex m-[1vw] place-content-center rtl justify-around px-[3vw]">
							<div className={`flex ${styles.hover_trigger}`}>
								<img
									src={clock}
									className="w-[1vw] h-[1vw] place-self-center mx-[0.5vw] mb-[0.1vw] "
								/>
								2 روز باقیمانده
							</div>
							<div
								className={`border-solid border-[0.1vw] w-0 border-gray-300 rounded-full mx-[1vw]`}
							></div>
							87% سرمایه جمع شده
						</div>
						<Tags />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}

export default StartupCard;
