import PersonalInfo from "@/components/PersonalInfo/PersonalInfo";
import PromotionBox from "../Sections/PromotionBox/PromotionBox";
import { useEffect, useState } from "react";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { getData } from "@/Services/ApiClient/Services";
import { Card } from "@/components/ui/card";
import styles from "./BaseUserDashBoard.module.scss";
import { Loading } from "@/components/Loading/Loading";
const BaseUserDashBoard = () => {
	const [loading, setLoading] = useState(false);
	const { setFirstname, setUsername, setBio, setAvatar } = useProfileStore();
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
	if (loading) return <Loading />;
	return (
		<>
			<Card className={styles.card_style}>
				<PersonalInfo loading={loading} />
				<PromotionBox />
			</Card>
		</>
	);
};

export default BaseUserDashBoard;
