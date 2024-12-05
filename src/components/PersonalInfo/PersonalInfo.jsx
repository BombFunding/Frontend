import headerpic from "../../assets/upProfile.jpg";
import Likes from "../Likes/Likes";
import styles from "./PersonalInfo.module.scss";
function PersonalInfo({ pfp }) {
	const x = true;
	return (
		<>
			<img
				src={headerpic}
				className="w-[88vw] h-[15vw] mt-[1vh] rounded-lg object-cover"
			/>
			<img
				src={pfp}
				className={`${styles.on} absolute place-self-end rounded-full w-[12vw] translate-x-[-5vw] mt-[6vw] border-solid ring-[0.5vw] ring-bomborange`}
			/>
			<Likes className="absolute mt-[11vw] ml-[2vw]" />
			<section
				className={`${
					x ?? "border-solid border-2 border-bomborange "
				} rounded-lg py-[3vw] px-[5vw] place-content-end`}
			>
				<div className="absolute translate-x-[5.2vw] -translate-y-[4vh] z-0"></div>
				<div className="flex justify-between">
					<h1 className="text-gray-500 text-[1.25vw] place-self-center">
						@TheBigBaldHead
					</h1>
					<h1 className={`text-[2vw]`}>
						غلامرضا کریمی تبار اصل ترکاشون اصطلخ زیر
					</h1>
				</div>
				<div></div>
			</section>
		</>
	);
}

export default PersonalInfo;
