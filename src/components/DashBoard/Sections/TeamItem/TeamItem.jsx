import React, { useState } from "react";
import styles from "./TeamItem.module.scss";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import AVATAR from "@/assets/A1.jpg";
import { Label } from "@radix-ui/react-label";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer";
import EditTeamForm from "@/components/Forms/DashBoardForms/EditTeamForm/EditTeamForm";
import { deleteData, getData } from "@/Services/ApiClient/Services";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { toast } from "react-toastify";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";

const TeamItem = ({ setMembers, memberData, className }) => {
	const [deleteMemberOpen, setDeleteMemberOpen] = useState(false);
	const [editMemberOpen, setEditMemberOpen] = useState(false);
	const [profileData, setProfileData] = React.useState(null);
	const { username } = useProfileStore();
	const formattedDescription = memberData.description.split("\n");
	console.log("memberData: ", memberData);
	React.useEffect(() => {
		if (memberData?.username) {
			getData(`/startup/profile/${memberData?.username}/`).then((res) => {
				setProfileData(res.profile);
			});
		}
		console.log(memberData);
	}, []);
	const deleteMember = () => {
		deleteData(`/startup/profile/team/remove/${memberData?.user}/`)
			.then((data) => {
				getData(`/startup/profile/team/list/${username}/`).then(
					(res) => {
						toast.success(
							<CustomToast Header="عضو با موفقیت حذف شد" />
						);
						setTimeout(() => {
							setMembers(res);
							setDeleteMemberOpen(false);
						}, 3000);
					}
				);
			})
			.catch((err) => {
				toast.error(
					<CustomToast
						Header="خطا"
						Message="مشکلی در حذف عضو وجود دارد"
					/>
				);
			});
	};
	return (
		<Card className={`${styles.card_style} ${className}`}>
			<div className="flex flex-col justify-center items-center gap-2">
				<Avatar>
					<AvatarImage
						className="w-[60px] aspect-square rounded-full"
						src={memberData.profile_pic}
					/>
				</Avatar>
				<Label>{memberData.username}</Label>
				<Label>{memberData.role}</Label>
			</div>
			<Separator />
			<div className="flex justify-center items-center">
				<Dialog>
					<DialogTrigger>
						<Button className={styles.button_style}>توضیحات</Button>
					</DialogTrigger>
					<DialogContent>
						<div className="font-vazirmatn p-5">
							{formattedDescription.map((item, index) => (
								<p key={index}>{item}</p>
							))}
						</div>
					</DialogContent>
				</Dialog>
			</div>
			<div className="flex flex-row items-center justify-center gap-2">
				<Drawer open={editMemberOpen}>
					<DrawerTrigger>
						<Button
							className={styles.button_style}
							onClick={() => setEditMemberOpen(true)}
						>
							ویرایش
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<EditTeamForm
							memberData={memberData}
							setMembers={setMembers}
							setEditMemberOpen={setEditMemberOpen}
						/>
						<DrawerClose asChild>
							<Button
								variant="outline"
								className="font-vazirmatn"
								onClick={() => setEditMemberOpen(false)}
							>
								بازگشت
							</Button>
						</DrawerClose>
					</DrawerContent>
				</Drawer>
				{/* <Button className={styles.button_style}>حذف</Button> */}
				<Drawer open={deleteMemberOpen}>
					<DrawerTrigger>
						<Button
							className={styles.button_style}
							onClick={() => setDeleteMemberOpen(true)}
						>
							حذف
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<Label className="text-black place-self-center mt-[2vw] font-vazirmatn">
							آیا مطمئن هستید؟
						</Label>
						<Button
							className="my-[3vw] text-black font-vazirmatn btn place-self-center bg-bomborange hover:text-bomborange hover:bg-black"
							onClick={() => deleteMember()}
						>
							بله، عضو را حذف کن
						</Button>
						<DrawerClose asChild>
							<Button
								variant="outline"
								className="font-vazirmatn"
								onClick={() => setDeleteMemberOpen(false)}
							>
								بازگشت
							</Button>
						</DrawerClose>
					</DrawerContent>
				</Drawer>
			</div>
		</Card>
	);
};

export default TeamItem;
