import React, { useEffect, useState } from "react";
import styles from "./PositionBox.module.scss";
import PositionItem from "../PositionItem/PositionItem";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import AddPositionForm from "@/components/Forms/DashBoardForms/AddPositionForm/AddPositionForm";
import { getData } from "@/Services/ApiClient/Services";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import EmptySection from "@/components/EmptySection/EmptySection";

const PositionBox = () => {
	const [open, setOpen] = useState(false);
	const [positions, setPositions] = useState([]);
	const { username } = useProfileStore();
	useEffect(() => {
		getData(`/position/list/${username}/`).then((data) => {
			setPositions(data);
		});
	}, []);
	return (
		<div className={styles.position_box}>
			<div>
				{positions.length === 0 ? <EmptySection type="پوزیشن" /> : <></>}
			</div>
			<div className={styles.create_position}>
				<Drawer open={open}>
					<DrawerTrigger>
						<button
							className="btn bg-bomborange text-black hover:text-white hover:bg-black m-2"
							onClick={() => {
								setOpen(true);
							}}
						>
							ساخت پوزیشن جدید
						</button>
					</DrawerTrigger>
					<DrawerContent>
						<AddPositionForm
							setOpen={setOpen}
							positions={positions}
							setPositions={setPositions}
						/>
						<DrawerClose asChild>
							<button
								className="font-vazirmatn"
								onClick={() => setOpen(false)}
							>
								بازگشت
							</button>
						</DrawerClose>
					</DrawerContent>
				</Drawer>
			</div>
			<div className={styles.position_list}>
				{positions.map((position, index) => (
					<PositionItem
						positionData={position}
						setPositions={setPositions}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

export default PositionBox;
