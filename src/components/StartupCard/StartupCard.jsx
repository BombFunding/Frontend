import { Progress } from "@/components/ui/progress";
import mockuppic from "../../assets/upProfile.jpg";
import mockuppic2 from "../../assets/baner.jpg";
import clock from "../../assets/clock.png";
import styles from "./StartupCard.module.scss";
import defaultpfp from "../../assets/defaultpfp.png";
import Bookmark from "../Bookmark/Bookmark";
import Tags from "../Tags/Tags";
import Like from "../Like/Like";
function StartupCard() {
	return (
		<div className={`${styles.container}`}>
			<img src={mockuppic2} className={`${styles.image}`} />
			<Progress
				value={10}
				className={styles.progress_bar}
				ProgressColor="bg-bomborange"
			/>
			<div className="flex px-[1vw]">
				<img
					src={defaultpfp}
					className="rounded-full w-[4vw] m-[1vw]"
				/>
				<h1 className="text-[1.2vw] place-self-center">
					این یک پوزیشن است؟ فکر کنم لورم ایپسام ایپسام ایپسام
				</h1>
				{/* <Like className="pr-[1vw] pl-[1vw] place-self-center" />
				<Bookmark className="pl-[1.5vw] place-self-center" /> */}
			</div>
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
		</div>
	);
}

export default StartupCard;
