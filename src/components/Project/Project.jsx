import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../ui/card";
import { useEffect, useState } from "react";
import { getData, postData } from "@/Services/ApiClient/Services";
import { Progress } from "@/components/ui/progress";
import toman from "../../assets/toman.png";
import { Button } from "../ui/button";
import { Loading } from "../Loading/Loading";
import { Label } from "../ui/label";
import CommentSection from "../CommentSection/CommentSection";
import Tags from "../Tags/Tags";
import InvestorDialogBox from "../ProjectDashboard/InvestorDialogBox/InvestorDialogBox";
import PageView from "./PageView/PageView";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { DrawerDialog } from "../Custom/DrawerDialog/DrawerDialog";
import styles from "./Project.module.scss";
import Like from "../Like/Like";
import Bookmark from "../Bookmark/Bookmark";
import usePublicProjectStore from "@/stores/ProjectStore/publicProjectStore";
import InvestingForm from "../Forms/ProjectForms/InvestingForm/InvestingForm";
const englishToPersian = {
	"Artificial Intelligence": "هوش مصنوعی",
	"Internet of Things": "اینترنت اشیا",
	Software: "نرم‌افزار",
	Security: "امنیت",
	"Augmented Reality": "واقعیت افزوده",
	Music: "موسیقی",
	Cinema: "سینما",
	Handicrafts: "صنایع دستی",
	Nutrition: "تغذیه",
	Psychology: "روان‌شناسی",
	Therapy: "درمان",
	Cultural: "فرهنگی",
	Urban: "شهری",
	International: "بین‌المللی",
	"Books and Publications": "کتاب و نشریات",
	"Personal Development": "توسعه فردی",
	"Educational Institutions": "آموزشگاه",
	"Investment Fund": "سرمایه‌ گذاری",
	Cryptocurrency: "ارز دیجیتال",
	Insurance: "بیمه",
};

function Project({ className }) {
	const { projectId } = useParams();
	const Navigate = useNavigate();
	// const [image, setImage] = useState("");
	// const [name, setName] = useState("");
	// const [owner, setOwner] = useState("");
	// const [description, setDescription] = useState("");
	// const [profile, setProfile] = useState("");
	// const [ownerName, setOwnerName] = useState("");
	// const [position, setPosition] = useState(null);
	// const [loading, setLoading] = useState(false);
	// const [subcategories, setSubCategories] = useState([]);
	// const [totalFunded, setTotalFunded] = useState(0);
	const {
		image,
		name,
		owner,
		description,
		profile,
		ownerName,
		position,
		loading,
		subcategories,
		totalFunded,
		updatePublicProject,
		getLog,
		likes,
		isLiked,
		isBookmarked,
	} = usePublicProjectStore();
	const { username } = useProfileStore();
	const [closer, setCloser] = useState(false);
	function timeDiff(time) {
		const now = new Date(); // Current time
		const date = new Date(time); // Convert the comment time to a Date object

		const timeDifference = Math.floor((date - now) / 1000); // Difference in seconds

		if (timeDifference < 60) {
			return `همین الان`;
		} else if (timeDifference < 3600) {
			const minutes = Math.floor(timeDifference / 60);
			return `${minutes} دقیقه دیگر`;
		} else if (timeDifference < 86400) {
			const hours = Math.floor(timeDifference / 3600);
			return `${hours} ساعت دیگر`;
		} else {
			const days = Math.floor(timeDifference / 86400);
			return `${days} روز دیگر`;
		}
	}
	//   useEffect(() => {
	//     setLoading(true);
	//     getData(`/projects/detail/${projectId}/`).then((data) => {
	//       console.log("project", data);
	//       setImage(data.image);
	//       setName(data.name);
	//       setOwner(data.owner_username);
	//       if (data.owner_username !== username) {
	//         postData(`/profile_statics/visit/${projectId}/`);
	//       }
	//       setDescription(data.description);
	//       setSubCategories(data.subcategories);
	//       setIsLiked(data.is_liked);
	//       setIsBookmarked(data.is_bookmarked);
	//       setLoading(true);
	//       getData(`/auth/baseuser_search_by_name/${data.owner_username}/`).then(
	//         (res) => {
	//           setProfile(
	//             `http://104.168.46.4:8000${res.baseuser_profile.profile_picture}`
	//           );
	//           setOwnerName(
	//             res.baseuser_profile.first_name +
	//               " " +
	//               res.baseuser_profile.last_name
	//           );
	//           setLoading(false);
	//         }
	//       );
	//       setLoading(true);
	//       setPosition(data.open_position);
	//       // if (data.position_ids?.length > 0) {
	//       // 	getData(`/position/detail/${data.open_position}/`).then(
	//       // 		(res) => {
	//       // 			if (!res.is_closed) {
	//       // 				setLoading(false);
	//       // 			}
	//       // 		}
	//       // 	);
	//       // }
	//       setLoading(true);
	//       getData(`/invest/history/project/${projectId}/amount/`).then((data) => {
	//         let total = 0;
	//         data.forEach((element) => {
	//           total += Number(element.investment_amount);
	//         });
	//         setTotalFunded(total);
	//       });
	//     });
	//   }, []);
	useEffect(() => {
		updatePublicProject(projectId);
		getLog();
		window.scrollTo(0, 0);
	}, []);

	if (loading) return <Loading className="pt-52 pb-64 place-self-center" />;
	return (
		// <Card
		// 	className={`${className} bg-slate-50 overflow-hidden font-vazirmatn w-[90vw] translate-y-[3vw] mb-[6vw] place-self-center`}
		// >
		<>
			<div
				className={`${className} w-[80vw] place-self-center py-[2vw] grid gap-y-[2vw]`}
				// className={`${className} w-[80vw] flex flex-col justify-start items-end mx-auto bg-white my-5 gap-3`}
			>
				<div className="place-self-center text-gray-800 text-4xl py-[3vw] ">
					{name}
				</div>
				<div className="flex flex-col lg:flex-row">
					<div className="w-full lg:w-3/5 flex flex-col gap-3">
						<img src={image} className="w-full" />
						<div className="place-items-start">
							<div className="flex rtl">
								<Like
									className="pr-[1vw] pl-[1vw] place-self-center"
									likeCount={likes}
									isLiked={isLiked}
									projectId={projectId}
								/>
								<Bookmark
									className="pl-[1vw] place-self-center"
									isBookmarked={isBookmarked}
									projectId={projectId}
								/>
							</div>
						</div>
					</div>
					<div className="w-full lg:w-2/5 flex flex-col justify-between mb-7">
						{/* <Progress
						value={10}
						className="w-full border-solid border-[1px] border-black"
						indicatorColor="bg-blue-300"
						ProgressColor="bg-bomborange"
					/> */}
						{position ? (
							<div className="flex flex-col p-[2vw] justify-between h-full gap-3 lg:gap-0">
								<div>
									<div className="flex rtl gap-[1vw] mt-[2vw] px-[1vw]">
										<div className="text-black text-2xl lg:text-3xl place-self-center">
											{position.funded}
										</div>
										<img
											src={toman}
											className="w-8 h-auto lg:w-12 place-self-center mb-[0.4vw]"
										/>
									</div>
									<div className="flex rtl gap-[0.5vw] place-items-center">
										<div className="text-black text-2xl">
											سرمایه جمع‌آوری شده از
										</div>
										<div className="text-black text-[3vw] place-self-center">
											{/* 16000 */}
											{position.total}
										</div>
										<img
											src={toman}
											className="w-[4vw] h-[2.8vw] place-self-center mb-[0.4vw]"
										/>
									</div>
								</div>
								<Progress
									// value={(position.funded / position.total) * 100}
									value={position.percent_funded}
									className="w-full border-solid border-[1px] border-black my-[1vw]"
									indicatorColor="bg-blue-300"
									ProgressColor="bg-bomborange"
								/>
								<div className="text-xl">
									تا {timeDiff(position.end_time)}
								</div>

								<DrawerDialog
									open={closer}
									onOpenChange={setCloser}
									title={"سرمایه گذاری کنید"}
									triggerButton={
										// <button
										// 	className={`${styles.btn} h-8 btn bg-bomborange text-white`}
										// >
										// 	ویرایش
										// </button>
										<Button className="btn w-full bg-bomborange hover:bg-black hover:text-white text-xl">
											روی این پروژه سرمایه گذاری کنید
										</Button>
									}
									closeButton={
										<button
											className={`${styles.btn} h-6 btn bg-bomborange text-white`}
										>
											بستن
										</button>
									}
								>
									<InvestingForm
										position={position}
										setCloser={setCloser}
									/>
								</DrawerDialog>
							</div>
						) : (
							<div className="text-black text-[4vw] h-full place-content-center place-self-center">
								این پروژه فعلا هیچ پوزیشن بازی ندارد
							</div>
						)}
					</div>
				</div>
				{/* <div className="flex rtl place-items-start">
				<Like />
				<Bookmark />
			</div> */}
				{/* <div className="flex flex-col-reverse lg:flex-row"> */}
				<div className="flex flex-col-reverse">
					<Tags
						tags={subcategories.map(
							(subcategory) =>
								englishToPersian[subcategory] || subcategory
						)}
						className="place-items-start"
						dashboard={false}
					/>
					{subcategories.length > 0 ? (
						<div className="border-2 border-solid rounded-full" />
					) : (
						<></>
					)}
					<div className="my-[2vw] flex place-items-center w-full justify-end">
						<div className="flex rtl gap-[0.5vw] place-self-start px-[2vw] py-[1vh]">
							<div className="text-black text-3xl place-self-center">
								{totalFunded}
							</div>
							<img
								src={toman}
								className="w-[3vw] h-[2.1vw] place-self-center mb-[0.4vw]"
							/>
						</div>
						<div className="text-black text-2xl">
							:مجموع سرمایه جمع‌آوری شده
						</div>
					</div>
				</div>
				{/* <div className="text-black text-[1.5vw] rtl hover:cursor-pointer hover:underline hover:text-bomborange">
				n نفر روی این پروژه سرمایه گذاری کرده‌اند
			</div> */}
				<InvestorDialogBox className="rtl" projectId={projectId} />
				<div>
					<div className="text-black flex gap-[1vw] px-[4vw] place-self-end">
						<div className="flex flex-col place-items-end justify-evenly px-[2vw]">
							<Label className="text-5xl">{ownerName}</Label>
							<Label className="text-3xl">{owner}</Label>
						</div>
						<img
							src={profile}
							className="rounded-full w-[16vw] h-[16vw] hover:cursor-pointer"
							onClick={() => Navigate(`/profile/${owner}`)}
						/>
					</div>
				</div>
				<div className="text-black w-[95%] place-self-center">
					{description}
				</div>
				<PageView />
				<CommentSection />
			</div>
		</>
	);
}

export default Project;
