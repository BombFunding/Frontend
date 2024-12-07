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
	return (
		<div className={styles.position_box}>
			<div className={styles.create_position}>
				<Drawer>
					<DrawerTrigger>
						<Button variant="default" className="btn bg-bomborange hover:text-white hover:bg-black m-2">
							ساخت پوزیشن جدید
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<AddPositionForm />
						<DrawerClose asChild>
							<Button
								className="font-vazirmatn"
								variant="outline"
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
