import { useEffect, useState } from "react";
import styles from "./TeamBox.module.scss";
import TeamItem from "../TeamItem/TeamItem";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import AddTeamForm from "@/components/Forms/DashBoardForms/AddTeamForm/AddTeamForm";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { getData } from "@/Services/ApiClient/Services";
import { v4 as uuidv4 } from "uuid";
import EmptySection from "@/components/EmptySection/EmptySection";
import { Loading } from "@/components/Loading/Loading";

const TeamBox = ({ className }) => {
	const [formOpen, setFormOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { username } = useProfileStore();
	const [members, setMembers] = useState([]);
	useEffect(() => {
		setLoading(true);
		getData(`/startup/profile/team/list/${username}`).then((res) => {
			console.log("team list: ", res);
			setMembers(res);
			setLoading(false);
		});
	}, []);

	return (
		<div className={`${styles.team_box} ${className}`}>
			{loading ? (
				<Loading size={8} className="pt-16 pb-20" />
			) : (
				<>
					{" "}
					<div>
						{members.length === 0 ? (
							<EmptySection type="عضو" />
						) : (
							<></>
						)}
					</div>
					<div className={styles.create_member}>
						<Drawer open={formOpen}>
							<DrawerTrigger>
								<Button
									variant="default"
									className="btn bg-bomborange hover:text-white hover:bg-black m-2"
									onClick={() => setFormOpen(true)}
								>
									اضافه کردن عضو جدید
								</Button>
							</DrawerTrigger>
							<DrawerContent>
								<AddTeamForm
									setFormOpen={setFormOpen}
									setMembers={setMembers}
								/>
								<DrawerClose asChild>
									<Button
										variant="outline"
										className="font-vazirmatn"
										onClick={() => setFormOpen(false)}
									>
										بازگشت
									</Button>
								</DrawerClose>
							</DrawerContent>
						</Drawer>
					</div>
					<div className={styles.team_list}>
						{members.map((member) => (
							<TeamItem
								setMembers={setMembers}
								key={uuidv4()}
								memberData={member}
								className={"flex-shrink-0"}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default TeamBox;
