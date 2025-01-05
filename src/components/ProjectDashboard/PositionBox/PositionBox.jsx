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
import { useParams } from "react-router-dom";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";
import { Loading } from "@/components/Loading/Loading";

const PositionBox = ({ className }) => {
	const [open, setOpen] = useState(false);
	const [positions, setPositions] = useState([]);
	const { positionIds } = useProjectStore();
	const [loading, setLoading] = useState(false);
	// if (positionIds.length === 0) {
	//   return (
	//     <div className={`${styles.position_box} ${className}`}>
	//       <EmptySection type="پوزیشن" />
	//     </div>
	//   );
	// }
	useEffect(() => {
		setLoading(true);
		setPositions([]);
		positionIds.map((positionId) => {
			setLoading(true);
			getData(`/position/detail/${positionId}/`).then((data) => {
				if (!positions.includes(data)) {
					setPositions((pre) => [
						...pre,
						{ ...data, id: positionId },
					]);
				}
			});
		});
		setLoading(false);
	}, []);
	if (loading) {
		return (
			<div className={`${styles.position_box} ${className}`}>
				<Loading className="pb-8" size={8} />
			</div>
		);
	}
	return (
		<div className={`${styles.position_box} ${className}`}>
			{positionIds.length === 0 ? <EmptySection type="پوزیشن" /> : <></>}
			<div className={styles.create_position}>
				<Drawer open={open}>
					<DrawerTrigger>
						<button
							className="btn bg-bomborange text-white hover:text-white hover:bg-black m-2"
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
							<Button
								variant="outline"
								className="font-vazirmatn"
								onClick={() => setOpen(false)}
							>
								بازگشت
							</Button>
						</DrawerClose>
					</DrawerContent>
				</Drawer>
			</div>
			<div className={styles.position_list}>
				{console.log("positions", positions)}
				{/* {console.log()} */}
				{positions.length !== 0 &&
					positions.map((position, index) => (
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
