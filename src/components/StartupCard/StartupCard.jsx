// import { useState } from "react";
// import { Progress } from "@/components/ui/progress";
// import mockuppic from "../../assets/upProfile.jpg";
// import mockuppic2 from "../../assets/baner.jpg";
// import clock from "../../assets/clock.png";
// import styles from "./StartupCard.module.scss";
// import defaultpfp from "../../assets/defaultpfp.png";
// import Bookmark from "../Bookmark/Bookmark";
// import Tags from "../Tags/Tags";
// import Like from "../Like/Like";
// import { GoPaperAirplane } from "react-icons/go";
// import { FaCheckCircle } from "react-icons/fa"; // Import green check icon
// import {
// 	Accordion,
// 	AccordionContent,
// 	AccordionItem,
// 	AccordionTrigger,
// } from "@/components/ui/accordion";
// function StartupCard() {
//   const [showToast, setShowToast] = useState(false);

//   const handleShare = () => {
//     // const url = window.location.href;
//     const url = `http://104.168.46.4:3000/project/${projectId}`;
//     navigator.clipboard
//       .writeText(url)
//       .then(() => {
//         setShowToast(true);
//         setTimeout(() => setShowToast(false), 3000); // 3 second timer
//       })
//       .catch((err) => {
//         console.error("Failed to copy URL: ", err);
//       });
//   };

//   return (
//     <div className={`${styles.container}`}>
//       <img src={mockuppic2} className={`${styles.image}`} />
//       <Progress
//         value={10}
//         className={styles.progress_bar}
//         ProgressColor="bg-bomborange"
//       />
//       <div className="flex">
//         <img src={defaultpfp} className="rounded-full w-[4vw] m-[1vw]" />
//         <h1 className="text-[1.2vw] place-self-center">
//           این یک پوزیشن است؟ فکر کنم لورم ایپسام ایپسام ایپسام
//         </h1>
//         <Like className="pr-[0vw] pl-[1vw] place-self-center" />
//         <Bookmark className="pl-[0.9vw] place-self-center" />
//         <GoPaperAirplane
//           className="-rotate-45 w-[60px] h-[35px] ml-[1vw] pl-[0.5vw] mb-[0.4vh] place-self-center cursor-pointer"
//           onClick={handleShare}
//         />
//       </div>

//       <Accordion type="single" collapsible className="w-full p-3">
//         <AccordionItem value="item-1">
//           <AccordionTrigger>اطلاعات بیشتر</AccordionTrigger>
//           <AccordionContent>
//             <div className="flex m-[1vw] place-content-center rtl justify-around px-[3vw]">
//               <div className={`flex ${styles.hover_trigger}`}>
//                 <img
//                   src={clock}
//                   className="w-[1vw] h-[1vw] place-self-center mx-[0.5vw] mb-[0.1vw]"
//                 />
//                 2 روز باقیمانده
//               </div>
//               <div
//                 className={`border-solid border-[0.1vw] w-0 border-gray-300 rounded-full mx-[1vw]`}
//               ></div>
//               87% سرمایه جمع شده
//             </div>
//             <Tags />
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>

//       {showToast && (
//         <div
//           className="fixed bottom-4 left-1/2 bg-green-100 text-green-800 p-3 text-[1.5vw] rounded-lg shadow-lg flex items-center"
//           style={{ zIndex: 1000 }}
//         >
//           <FaCheckCircle className="ml-2 text-green-600 font-vazirmatn" />
//           لینک با موفقیت کپی شد.
//         </div>
//       )}
//     </div>
//   );
// }

// export default StartupCard;

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
import { useEffect, useState } from "react";
import { getData } from "@/Services/ApiClient/Services";
import { GoPaperAirplane } from "react-icons/go";
import { toast } from "react-toastify";
import CustomToast from "../Custom/CustomToast/CustomToast";
function StartupCard({
	image,
	name,
	id,
	subcategories,
	likeCount,
	description,
	onImageLoad,
	owner,
	ownerProfile,
	isLiked,
	isBookmarked,
	position,
}) {
	const Navigate = useNavigate();
	const handleShare = () => {
		// const url = window.location.href;
		const url = `https://aminfiroozi.ir/projects/${id}`;
		navigator.clipboard
			.writeText(url)
			.then(() => {
				toast.success(<CustomToast Header="لینک با موفقیت کپی شد" />);
			})
			.catch((err) => {
				toast.error(
					<CustomToast Header="مشکلی در کپی کردن لینک وجود دارد" />
				);
				console.error("Failed to copy URL: ", err);
			});
	};
	return (
		<div className={`${styles.container}`}>
			<img
				src={image ? image : mockuppic2}
				className={`${styles.image} hover:cursor-pointer`}
				onClick={() => {
					window.scrollTo(0, 0);
					Navigate(`/projects/${id}`);
				}}
				onLoad={onImageLoad}
			/>
			<Progress
				value={position.percent_funded}
				className={styles.progress_bar}
				ProgressColor="bg-bomborange"
			/>
			<div className="flex justify-between">
				<div className="flex">
					<img
						src={ownerProfile}
						className={styles.ownerProfile}
						onClick={() => {
							window.scrollTo(0, 0);
							Navigate(`/profile/${owner}`);
						}}
					/>
					<h1 className={styles.name}>{owner}</h1>
				</div>
				<div className="flex lg:pl-5 md:pl-5 sm:pl-4 pl-4">
					<Like
						className="pr-[1vw] pl-[1vw] place-self-center"
						likeCount={likeCount}
						isLiked={isLiked}
						projectId={id}
					/>
					<Bookmark
						className="pl-[1vw] place-self-center"
						isBookmarked={isBookmarked}
						projectId={id}
					/>
					<GoPaperAirplane
						className={styles.share}
						onClick={handleShare}
					/>
				</div>
			</div>

			<div className={styles.projectName}>{name}</div>
			<Accordion type="single" collapsible className="w-full px-5">
				<AccordionItem value="item-1">
					<AccordionTrigger>اطلاعات بیشتر</AccordionTrigger>
					<AccordionContent>
						<div className="py-[1vw]">{description}</div>
						<div className="flex place-content-center rtl justify-around px-4">
							<div className={`flex ${styles.hover_trigger}`}>
								<img
									src={clock}
									className="w-4 h-auto place-self-center mx-2 mb-[0.1vw] "
								/>
								<p className={styles.days_remaining}>
									{position.days_remaining} روز باقیمانده
								</p>
							</div>
							<div
								className={`border-solid border-[0.1vw] w-0 border-gray-300 rounded-full mx-4`}
							></div>
							<p className={styles.days_remaining}>
								{Math.round(
									(Number(position.funded) /
										Number(position.total)) *
										100
								)}
								% سرمایه جمع شده
							</p>
						</div>
						<Tags tags={subcategories} dashboard={false} />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}

export default StartupCard;
