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

const PositionBox = () => {
	const { positions } = useProfileStore();
	const [open, setOpen] = useState(false);
	return (
		<div className={styles.position_box}>
			<div className={styles.create_position}>
				<Drawer open={open}>
					<DrawerTrigger>
						<Button
							variant="default"
							className="btn bg-bomborange hover:text-white hover:bg-black m-2"
							onClick={() => {
								setOpen(true);
							}}
						>
							ساخت پوزیشن جدید
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<AddPositionForm setOpen={setOpen} />
						<DrawerClose asChild>
							<Button
								className="font-vazirmatn"
								variant="outline"
								onClick={() => setOpen(false)}
							>
								بازگشت
							</Button>
						</DrawerClose>
					</DrawerContent>
				</Drawer>
			</div>
			<div className={styles.position_list}>
				{positions.map((position, index) => (
					<PositionItem positionData={position} key={index} />
				))}
				{/* <PositionItem />
				<PositionItem />
				<PositionItem />
				<PositionItem /> */}
			</div>
		</div>
	);
};

export default PositionBox;
