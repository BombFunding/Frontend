import styles from "./StartupDashBoard.module.scss";
import { Card } from "@/components/ui/card";
import PositionBox from "../../ProjectDashboard/PositionBox/PositionBox";
import Accounting from "@/components/Accounting/Accounting";
import baner from "../../../assets/baner.jpg";
// import CommentSection from "@/components/CommentSection/CommentSection";
import PersonalInfo from "@/components/PersonalInfo/PersonalInfo";
import { useEffect } from "react";
import { getData } from "@/Services/ApiClient/Services";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import TeamBox from "../Sections/TeamBox/TeamBox";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/Loading/Loading";
import BarChart1 from "@/components/BarChart/BarChart1";
import BarChart2 from "@/components/BarChart/BarChart2";
import Likes from "@/components/Likes/Likes";
import ProjectBox from "../ProjectBox/ProjectBox";
import useProjectBoxStore from "@/stores/ProjectStore/ProjectBoxStore";
import Bookmarks from "@/components/DashBoard/Bookmarks/Bookmarks";
import MainChart from "@/components/BarChart/MainChart";
import { Button } from "@/components/ui/button";

const StartupDashBoard = () => {
	const {
		username,
		loading,
		likeCount,
		setLoading,
		setFullname,
		setLikeCount,
		setEmail,
		setPhone,
		setUsername,
		setBio,
		setAvatar,
		setHeader,
		setBalance,
	} = useProfileStore();

	useEffect(() => {
		setLoading(true);
		getData(`/auth/view_own_baseuser_profile/`).then((data) => {
			console.log("Startup data: ", data.base_profile);
			setFullname(
				data.base_profile.first_name + " " + data.base_profile.last_name
			);
			setUsername(data.base_profile.name);
			setBio(data.base_profile.bio);
			// if (data.base_profile.likeCount) {
			// 	setLikeCount(data.base_profile.likeCount);
			// } else {
			// 	setLikeCount(0);
			// }
			setEmail(data.base_profile.email);
			setPhone(data.base_profile.phone);
			setAvatar(
				`https://bombfundingbackend.liara.run${data.base_profile.profile_picture}`
			);
			setHeader(
				`https://bombfundingbackend.liara.run${data.base_profile.header_picture}`
			);
			getData(`/balance/balance/`).then((data) =>
				setBalance(data.balance)
			);
			getData(`/startup/get_startup_profile/${username}/`).then((d) => {
				console.log("d: ", d.profile);
				getData(`/like/startup/${d.profile.id}/`).then((d2) => {
					setLikeCount(d2.likes);
					console.log("likes", d2.likes);
				});
			});

			setLoading(false);
		});
		window.scrollTo(0, 0);
	}, []);
	if (loading) return <Loading className="pt-52 pb-64 place-self-center" />;

	return (
		<>
			<Card className={styles.card_style}>
				{/* <Likes
					className="translate-x-[1vw] translate-y-[11.5vw]"
					count={likeCount}
					/> */}
				<PersonalInfo loading={loading} />
				<div className="flex flex-row justify-between gap-2 mt-2">
					<div className="flex flex-col w-2/6 gap-2">
						<Label className={styles.label_style}>حساب</Label>
						<Accounting />
					</div>
					<div className="flex flex-col w-4/6 gap-2">
						<Label className={styles.label_style}>اعضا</Label>
						<TeamBox />
					</div>
				</div>
				<Label className={styles.label_style}>پروژه‌ها</Label>
				<ProjectBox type="پروژه‌" add={true} />
				{/* <div
					className={`flex flex-wrap gap-6 p-6 rounded-md ${styles.chartbox}`}
				>
					<div className="flex-1 min-w-[300px]">
						<BarChart1 />
					</div>
					<div className="flex-1 min-w-[300px]">
						<BarChart2 />
					</div>
				</div> */}
				<Label className={styles.label_style}>ذخیره شده</Label>
				{/* <ProjectBox type="پروژه‌" /> */}
				<Bookmarks type="پروژه‌ا" />
				<Label className={styles.label_style}>آمار</Label>
				<MainChart
					color={"#FF7517"}
					label="fund"
					apiEndpoints={{
						"30d": "/profile_statics/fund/last-30-days/",
						"90d": "/profile_statics/fund/last-90-days/",
						"365d": "/profile_statics/fund/last-year/",
					}}
				/>
				<MainChart
					color={"#FF0000"}
					label="like"
					apiEndpoints={{
						"30d": "/profile_statics/last-30-days/",
						"90d": "/profile_statics/last-90-days/",
						"365d": "/profile_statics/last-year/",
					}}
				/>
				<MainChart
					color={"#0000FF"}
					label="view"
					apiEndpoints={{
						"30d": "/profile_statics/last-30-days/",
						"90d": "/profile_statics/last-90-days/",
						"365d": "/profile_statics/last-year/",
					}}
				/>
        <div className="flex justify-center mt-4">
        <div
            onClick={() => (window.location.href = "/googlemap")}
            className="bg-bomborange text-white text-center px-4 py-2 rounded cursor-pointer w-full max-w-[400px] font-bold text-lg"
            style={{
				width: "calc(110% - 2rem)",
            }}
        >
            تغییر موقعیت روی نقشه
        </div>
    </div>
			</Card>
		</>
	);
};

export default StartupDashBoard;
