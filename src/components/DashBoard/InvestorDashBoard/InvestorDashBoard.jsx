import React from "react";
import styles from "./InvestorDashBoard.module.scss";
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
import { Label } from "@/components/ui/label";
import ProjectBox from "../ProjectBox/ProjectBox";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer";
import MoreInfo from "@/components/Forms/DashBoardForms/MoreInfoForm/MoreInfoForm";
import { Separator } from "@/components/ui/separator";

const mockup = {
	ssn: "4444444444",
	legal: "5555555555",
	shaba: "55555555555555555555",
	tax: "1020315",
	// address:
	//   "نبش اکبر برادرز سریلانکانبش اکبر برادرز سریلانکانبش اکبر برادرز سریلانکانبش اکبر برادرز سریلانکانبش اکبر برادرز سریلانکانبش اکبر برادرز سریلانکانبش اکبر برادرز سریلانکانبش اکبر برادرز سریلانکانبش اکبر برادرز سریلانکانبش اکبر برادرز سریلانکانبش اکبر برادرز سریلانکانبش اکبر برادرز سریلانکا",
	address:
		"ایران، تهران، تهران، رسالت، خیابان هنگام، دانشگاه علم و صنعت ایران",
};

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
				`http://104.168.46.4:8000${data.base_profile.profile_picture}`
			);
			setHeader(
				`http://104.168.46.4:8000${data.base_profile.header_picture}`
			);
			getData(`/balance/balance/`).then((data) =>
				setBalance(data.balance)
			);
			setLoading(false);
		});
	}, []);
	const check =
		mockup.ssn &&
		mockup.legal &&
		mockup.shaba &&
		mockup.tax &&
		mockup.address;
	console.log(check);
	return (
		<>
			<Card className={styles.card_style}>
				{/* <PersonalInfo loading={loading} /> */}
				<PersonalInfo loading={loading} />
				{/* <Card
					className={`bg-bomborange text-white px-5 py-3 flex gap-2 justify-end items-center`}
				>
					<Drawer>
						<DrawerTrigger>
							<Button variant="default" className="bg-white h-8">
								تکمیل
							</Button>
						</DrawerTrigger>
						<DrawerContent>
							<MoreInfo data={mockup} />
							<DrawerClose asChild>
								<Button variant="outline">Cancel</Button>
							</DrawerClose>
						</DrawerContent>
					</Drawer>
					<Label>:لطفا اطلاعات خود را تکمیل کنید</Label>
				</Card> */}
				{/* <div className="grid grid-rows-2 rounded-lg bg-white gap-2 items-end mr-1 text-black border-solid font-vazirmatn border-2 h-fit border-bomborange">
					<div className="grid grid-rows-[auto,auto,1fr] grid-cols-2 divide-x-2">
						<div className={styles.extra_item}>
							{mockup.ssn}
							<div className="">
								<label className="">کد ملی</label>
							</div>
						</div>

						<div className={styles.extra_item}>
							{mockup.legal}
							<div className="">
								<label className="">کد حقوقی</label>
							</div>
						</div>

						<div className={styles.extra_item}>
							{mockup.shaba}
							<div className="place-self-end">شماره شبا</div>
						</div>

						<div className={styles.extra_item}>
							{mockup.tax}
							<label className="">شماره مالیاتی</label>
						</div>
					</div>

					<div
						className={`self-start py-3 px-[5vw] gap-10 text-right`}
					>
						<label className="font-bold">آدرس</label>
						<div className="mt-1 text-right">{mockup.address}</div>
					</div>
				</div> */}

				{/* <Label className={styles.label_style}>پوزیشن ها</Label>
				<PositionBox /> */}
				<div className="flex flex-row justify-between gap-2 mt-2">
					<div className="flex flex-col w-2/6 gap-2">
						<Label className={styles.label_style}>حساب</Label>
						<Accounting />
					</div>
					<div className="flex flex-col w-4/6 gap-2">
						<Label className={styles.label_style}>
							پروژه‌های سرمایه گذاری شده
						</Label>
						<ProjectBox type="پروژه‌ا" />
					</div>
				</div>
				<Label className={styles.label_style}>ذخیره</Label>
				<ProjectBox type="پروژه‌ا" />
				{/* <div className={styles.position_box}>Team</div> */}
				{/* <div className={styles.team_row}></div> */}
				{/* <div className={styles.position_box}>profiles</div> */}
				{/* <StartupProfiles /> */}
				{/* <CommentSection /> */}
				{/* <div className={styles.position_box}>history</div> */}
			</Card>
		</>
	);
};

export default InvestorDashBoard;
