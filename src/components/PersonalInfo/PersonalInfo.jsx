import headerpic from "../../assets/upProfile.jpg";
import Likes from "../Likes/Likes";
import styles from "./PersonalInfo.module.scss";
import calendarIcon from "../../assets/calendarIcon.png";
import defaultpfp from "../../assets/defaultpfp.png";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
function PersonalInfo({ header, loading }) {
	const x = true;
	const { fullname, username, bio, avatar } = useProfileStore();
	const Navigate = useNavigate();
	return (
		<>
			<img
				src={headerpic}
				className="w-[88vw] h-[15vw] mt-[1vh] rounded-lg object-cover"
			/>
			<img
				src={avatar ? avatar : defaultpfp}
				className={`${
					styles.on
				} absolute place-self-end rounded-full w-[12vw] translate-x-[-5vw] mt-[6vw] border-solid ${
					loading ? "" : "ring-[0.5vw]"
				} ring-bomborange`}
			/>
			<Button
				className="absolute border-solid border-2 bg-bomborange hover:bg-white translate-x-[1vw] translate-y-[1vw]"
				onClick={() => Navigate("/editprofile")}
			>
				ویرایش اطلاعات
			</Button>
			<Likes className="absolute mt-[11.2vw] ml-[1.5vw]" />
			<section
				className={`${
					x ?? "border-solid border-2 border-bomborange "
				} rounded-lg py-[3vw] px-[5vw] place-content-end`}
			>
				<div className="absolute translate-x-[5.2vw] -translate-y-[4vh] z-0"></div>
				<div className="flex justify-between">
					<h1 className="text-gray-500 text-[1.25vw] place-self-center">
						@{username}
					</h1>
					<h1 className={`text-[2vw]`}>
						{/* غلامرضا کریمی تبار اصل ترکاشون اصطلخ زیر */}
						{fullname}
					</h1>
				</div>
				<div className="flex gap-[0.75vw]">
					<img src={calendarIcon} className="h-[2vw]" />
					<div className="text-[1.5vw] place-self-center place-content-center align-middle">
						عضویت از 2024/12/5
					</div>
				</div>
				<p className="rtl text-[1.5vw] border-solid border-2 my-[1vw] p-[2vw] rounded-lg">
					{bio}
				</p>
			</section>
		</>
	);
}

export default PersonalInfo;
