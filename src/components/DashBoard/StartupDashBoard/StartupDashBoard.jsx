import styles from "./StartupDashBoard.module.scss";
import { Card } from "@/components/ui/card";
import PositionBox from "../Sections/PositionBox/PositionBox";
import Accounting from "@/components/Accounting/Accounting";
import StartupProfiles from "@/components/StartupProfiles/StartupProfiles";
import CommentSection from "@/components/CommentSection/CommentSection";
import PersonalInfo from "@/components/PersonalInfo/PersonalInfo";
import { useEffect, useState } from "react";
import { getData } from "@/Services/ApiClient/Services";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import TeamBox from "../Sections/TeamBox/TeamBox";
const StartupDashBoard = () => {
	const [loading, setLoading] = useState(false);
	const { setFullname, setUsername, setBio, setAvatar } = useProfileStore();
	useEffect(() => {
		setLoading(true);
		getData("/startup/view_own_startup_profile/").then((data) => {
			console.log("Startup data: ", data.startup_profile);
			setFullname(
				data.startup_profile.first_name +
					" " +
					data.startup_profile.last_name
			);
			setUsername(data.startup_profile.name);
			setBio(data.startup_profile.bio);
			setAvatar(
				`http://104.168.46.4:8000${data.startup_profile.profile_picture}`
			);
			setLoading(false);
		});
	}, []);
	return (
		<>
			<Card className={styles.card_style}>
				<PersonalInfo loading={loading} />
				<PositionBox />
				<TeamBox />
				<Accounting />
				<div className={styles.position_box}>Team</div>
				{/* <div className={styles.team_row}></div> */}
				{/* <div className={styles.position_box}>profiles</div> */}
				<StartupProfiles />
				<CommentSection />
				<div className={styles.position_box}>history</div>
			</Card>
		</>
	);
};

export default StartupDashBoard;
