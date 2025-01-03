import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../ui/card";
import { useEffect, useState } from "react";
import { getData } from "@/Services/ApiClient/Services";
import { Progress } from "@/components/ui/progress";
import toman from "../../assets/toman.png";
import { Button } from "../ui/button";
import { Loading } from "../Loading/Loading";
import { Label } from "../ui/label";
import CommentSection from "../CommentSection/CommentSection";
import Tags from "../Tags/Tags";

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
	"Books and Publications": "کتب و نشریات",
	"Personal Development": "توسعه فردی",
	"Educational Institutions": "مؤسسات آموزشی",
	"Investment Fund": "سرمایه‌گذاری",
	Cryptocurrency: "رمزارز",
	Insurance: "بیمه",
};

function Project({ className }) {
	const { projectId } = useParams();
	const Navigate = useNavigate();
	const [image, setImage] = useState("");
	const [name, setName] = useState("");
	const [owner, setOwner] = useState("");
	const [description, setDescription] = useState("");
	const [profile, setProfile] = useState("");
	const [ownerName, setOwnerName] = useState("");
	const [position, setPosition] = useState(null);
	const [loading, setLoading] = useState(false);
	const [subcategories, setSubCategories] = useState([]);
	const [totalFunded, setTotalFunded] = useState(0);
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
	useEffect(() => {
		setLoading(true);
		getData(`/projects/${projectId}/`).then((data) => {
			console.log(data);
			setImage(data.image);
			setName(data.name);
			setOwner(data.username);
			setDescription(data.description);
			setSubCategories(data.subcategories);
			getData(`/auth/baseuser_search_by_name/${data.username}/`).then(
				(res) => {
					console.log(res.baseuser_profile.profile_picture);
					setProfile(
						`http://104.168.46.4:8000${res.baseuser_profile.profile_picture}`
					);
					setOwnerName(
						res.baseuser_profile.first_name +
							" " +
							res.baseuser_profile.last_name
					);
				}
			);
			getData(`/position/detail/${data.position_ids[0]}/`).then((res) => {
				console.log(res);
				if (!res.is_closed) {
					setPosition(res);
				}
			});
			getData(`/invest/history/project/${projectId}/amount/`).then(
				(data) => {
					let total = 0;
					data.forEach((element) => {
						total += Number(element.investment_amount);
					});
					console.log(total);
					setTotalFunded(total);
				}
			);
			setLoading(false);
		});
	}, []);
	if (loading) return <Loading />;
	return (
		// <Card
		// 	className={`${className} bg-slate-50 overflow-hidden font-vazirmatn w-[90vw] translate-y-[3vw] mb-[6vw] place-self-center`}
		// >
		<div
			className={`${className} w-[80vw] place-self-center py-[2vw] grid gap-y-[4vw]`}
		>
			<div className="place-self-center text-gray-800 text-4xl py-[3vw]">
				{name}
			</div>
			<div className="flex">
				<img src={image} className="w-3/5" />
				<div className="w-full flex flex-col justify-between">
					{/* <Progress
						value={10}
						className="w-full border-solid border-[1px] border-black"
						indicatorColor="bg-blue-300"
						ProgressColor="bg-bomborange"
					/> */}
					{position ? (
						<div className="flex flex-col p-[2vw] justify-between h-full">
							<div>
								<div className="flex rtl gap-[1vw] mt-[2vw] px-[1vw]">
									<div className="text-black text-[2vw] place-self-center">
										{position.funded}
									</div>
									<img
										src={toman}
										className="w-[2vw] h-[1.4vw] place-self-center mb-[0.4vw]"
									/>
								</div>
								<div className="flex rtl gap-[0.5vw] place-items-center">
									<div className="text-black text-[1.5vw]">
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
								value={(position.funded / position.total) * 100}
								className="w-full border-solid border-[1px] border-black my-[1vw]"
								indicatorColor="bg-blue-300"
								ProgressColor="bg-bomborange"
							/>
							<div className="text-[1vw]">
								تا {timeDiff(position.end_time)}
							</div>
							<Button className="btn w-full bg-bomborange hover:bg-black hover:text-white ">
								روی این پروژه سرمایه گذاری کنید
							</Button>
						</div>
					) : (
						<div className="text-black text-[4vw] h-full place-content-center place-self-center">
							این پروژه فعلا هیچ پوزیشن بازی ندارد
						</div>
					)}
				</div>
			</div>
			<div className="flex justify-between">
				<Tags
					tags={subcategories.map(
						(subcategory) =>
							englishToPersian[subcategory] || subcategory
					)}
					className="place-items-start"
				/>
				{subcategories.length > 0 ? (
					<div className="border-2 border-solid rounded-full mx-[1vw]" />
				) : (
					<></>
				)}
				<div className="my-[2vw] flex place-items-center">
					<div className="flex rtl gap-[0.5vw] place-self-start px-[2vw] py-[1vh]">
						<div className="text-black text-4xl place-self-center">
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
			<div className="text-black text-[1.5vw] rtl hover:cursor-pointer hover:underline hover:text-bomborange">
				n نفر روی این پروژه سرمایه گذاری کرده‌اند
			</div>
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
			<CommentSection />
		</div>
	);
}

export default Project;
