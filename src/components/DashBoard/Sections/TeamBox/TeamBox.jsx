import React, { useEffect, useState } from "react";
import styles from "./TeamBox.module.scss";
import TeamItem from "../TeamItem/TeamItem";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer";
import AddPositionForm from "@/components/Forms/DashBoardForms/AddPositionForm/AddPositionForm";
import { Button } from "@/components/ui/button";
import AddTeamForm from "@/components/Forms/DashBoardForms/AddTeamForm/AddTeamForm";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { getData } from "@/Services/ApiClient/Services";
import { v4 as uuidv4 } from "uuid";

const TeamBox = ({ className }) => {
	const { profileId } = useProfileStore();
	const [members, setMembers] = useState([]);
	useEffect(() => {
		getData(`/startup/profile/${profileId}/team/list`).then((res) => {
			console.log("team list: ", res);
			setMembers(res);
		});
	}, []);
	return (
		<div className={`${styles.team_box} ${className}`}>
			<div className={styles.create_member}>
				<Drawer>
					<DrawerTrigger>
						<Button variant="default" className="m-2">
							اضافه کردن عضو جدید
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<AddTeamForm />
						<DrawerClose asChild>
							<Button variant="outline">بازگشت</Button>
						</DrawerClose>
					</DrawerContent>
				</Drawer>
			</div>
			<div className={styles.team_list}>
				{members.map((member) => (
					<TeamItem
						key={uuidv4()}
						memberData={member}
						className={"flex-shrink-0"}
					/>
				))}
				{members.map((member) => (
					<TeamItem
						key={uuidv4()}
						memberData={member}
						className={"flex-shrink-0"}
					/>
				))}
				{members.map((member) => (
					<TeamItem
						key={uuidv4()}
						memberData={member}
						className={"flex-shrink-0"}
					/>
				))}
			</div>
		</div>
	);
};

export default TeamBox;
