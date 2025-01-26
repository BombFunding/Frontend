import styles from "./InvestorDashBoard.module.scss";
import { Card } from "@/components/ui/card";
import Accounting from "@/components/Accounting/Accounting";
import PersonalInfo from "@/components/PersonalInfo/PersonalInfo";
import { useEffect, useState } from "react";
import { baseURL, getData } from "@/Services/ApiClient/Services";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/Loading/Loading";
import Bookmarks from "../Bookmarks/Bookmarks";
import InvestorTags from "@/components/InvestorTags/InvestorTags";
import ProjectsInvested from "@/components/ProjectsInvested/ProjectsInvested";

const InvestorDashBoard = () => {
	const [loading, setLoading] = useState(false);
	const {
		setFullname,
		setUsername,
		setBio,
		setAvatar,
		setHeader,
		setEmail,
		setPhone,
		setBalance,
	} = useProfileStore();
	const [subcategories, setSubcategories] = useState([]);
	console.log("Investor dashboard");
	useEffect(() => {
		setLoading(true);
		getData("/auth/view_own_baseuser_profile/").then((data) => {
			console.log("Startup data: ", data.base_profile);
			setFullname(
				data.base_profile.first_name + " " + data.base_profile.last_name
			);
			setUsername(data.base_profile.name);
			setBio(data.base_profile.bio);
			setEmail(data.base_profile.email);
			setPhone(data.base_profile.phone);
			setAvatar(
				`${baseURL}${data.base_profile.profile_picture}`
			);
			setHeader(
				`${baseURL}${data.base_profile.header_picture}`
			);
			getData(`/categories/${data.base_profile.name}/`).then((data) => {
				setSubcategories(data.subcategories);
			});
			getData(`/balance/balance/`).then((data) => {
				setBalance(data.balance);
				setLoading(false);
			});
		});
	}, []);
	if (loading) return <Loading className="pt-52 pb-64 place-self-center" />;
	return (
		<>
		<div className="flex flex-col items-center justify-center">
			<Card className={styles.card_style}>
				<PersonalInfo loading={loading} />
				<Label className={styles.label_style}>
					دسته‌بندی‌های مورد علاقه
				</Label>
				<div className="border-solid border-2 border-bomborange rounded-lg place-items-end px-[1vw]">
					<InvestorTags
						tags={subcategories}
						dashboard={true}
						setSubcategories={setSubcategories}
						setLoading={setLoading}
					/>
				</div>
				<div className="flex flex-row justify-between gap-2 mt-2">
					<div className="flex flex-col w-2/6 gap-2">
						<Label className={styles.label_style}>حساب</Label>
						<Accounting />
					</div>
					<div className="flex flex-col w-4/6 gap-2">
						<Label className={styles.label_style}>
							پروژه‌های سرمایه گذاری شده
						</Label>
						{/* <ProjectBox type="پروژه‌ا" /> */}
						<ProjectsInvested />
					</div>
				</div>
				<Label className={styles.label_style}>ذخیره شده</Label>
				<Bookmarks type="پروژه‌ا" />
			</Card>
		</div>
		</>
	);
};

export default InvestorDashBoard;
