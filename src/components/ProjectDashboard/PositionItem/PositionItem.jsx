import React, { useState } from "react";
import styles from "./PositionItem.module.scss";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer";
import EditPositionForm from "@/components/Forms/DashBoardForms/EditPositionForm/EditPositionForm";
import { deleteData, getData } from "@/Services/ApiClient/Services";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import ExtendPositionForm from "@/components/Forms/DashBoardForms/ExtendPositionForm/ExtendPositionForm";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";
import { useParams } from "react-router-dom";

const PositionItem = ({ positionData, setPositions }) => {
  const id = positionData.id;
	const { projectId } = useParams();
	const [editFormOpen, setEditFormOpen] = useState(false);
	const [deletePositionOpen, setDeletePositionOpen] = useState(false);
	const [extendPositionOpen, setExtendPositionOpen] = useState(false);
	const { updateProject } = useProjectStore();
	const { username } = useProfileStore();
	let day_duration = 1000 * 60 * 60 * 24;
	console.log("positionData: ", positionData);
	const start = new Date(positionData?.start_time);
	const end = new Date(positionData?.end_time);
	const now = new Date();
	const deletePosition = () => {
		deleteData(`/position/delete/${id}/`)
			.then((data) => {
				toast.success(<CustomToast Header="پوزیشن با موفقیت حذف شد" />);
				updateProject(projectId);
			})
			.catch((err) => {
				toast.error(
					<CustomToast
						Header="خطا"
						Message="مشکلی در حذف پوزیشن وجود دارد"
					/>
				);
			});
	};
	return (
		<Card className={styles.card_style}>
			<div className={`${styles.col_box}`}>
				<Label className="place-self-center text-md">
					{positionData.description}
				</Label>
				<Label className="text-base font-bold">
					{positionData?.name}
				</Label>
				<div className="flex gap-28">
					<div className="self-start ">
						<Label>سرمایه مورد نیاز: </Label>
						<Label>{positionData?.total}</Label>
					</div>
					<div className="self-start">
						<Label>مقدار به دست آمده: </Label>
						<Label>{positionData?.funded}</Label>
					</div>
				</div>
				<Progress
					value={(positionData?.funded / positionData?.total) * 100}
					className={styles.progress_bar}
					mainColor="bg-gray-50"
					ProgressColor="bg-bomborange"
				/>

				<>
					<div className="self-start">
						<Label>زمان باقیمانده: </Label>
						{positionData.is_closed ? (
							<Label>بسته شده</Label>
						) : (
							<Label>
								{Math.round(
									(end.getTime() - now.getTime()) /
										day_duration
								)}{" "}
								روز
							</Label>
						)}
					</div>
					<Progress
						value={
							((now.getTime() - start.getTime()) /
								(end.getTime() - start.getTime())) *
							100
						}
						className={styles.progress_bar}
						mainColor="bg-gray-50"
						ProgressColor="bg-bomborange"
					/>
				</>
			</div>
			{positionData.is_closed ? (
				<></>
			) : (
				<>
					<Separator orientation="vertical" className="mx-2" />
					<div className={styles.button_box}>
						<Drawer open={editFormOpen}>
							<DrawerTrigger>
								<Button
									variant="default"
									className={styles.button_style}
									onClick={() => setEditFormOpen(true)}
								>
									ویرایش
								</Button>
							</DrawerTrigger>
							<DrawerContent>
								<EditPositionForm
									positionData={positionData}
									setPositions={setPositions}
									setEditFormOpen={setEditFormOpen}
									id={id}
								/>
								<DrawerClose asChild>
									<Button
										variant="outline"
										className="font-vazirmatn"
										onClick={() => setEditFormOpen(false)}
									>
										بازگشت
									</Button>
								</DrawerClose>
							</DrawerContent>
						</Drawer>
						<Separator className="my-1" />
						<Drawer open={extendPositionOpen}>
							<DrawerTrigger>
								<Button
									variant="default"
									className={styles.button_style}
									onClick={() => setExtendPositionOpen(true)}
								>
									تمدید
								</Button>
							</DrawerTrigger>
							<DrawerContent>
								<ExtendPositionForm
									setPositions={setPositions}
									positionData={positionData}
									setExtendPositionOpen={
										setExtendPositionOpen
									}
									id={id}
								/>
								<DrawerClose asChild>
									<Button
										variant="outline"
										className="font-vazirmatn"
										onClick={() =>
											setExtendPositionOpen(false)
										}
									>
										بازگشت
									</Button>
								</DrawerClose>
							</DrawerContent>
						</Drawer>
						<Separator className="my-1" />

						<Drawer open={deletePositionOpen}>
							<DrawerTrigger>
								<Button
									variant="default"
									className={styles.button_style}
									onClick={() => setDeletePositionOpen(true)}
								>
									بستن
								</Button>
							</DrawerTrigger>
							<DrawerContent>
								<Label className="text-black place-self-center mt-[2vw] font-vazirmatn">
									آیا مطمئن هستید؟
								</Label>
								<Button
									className="my-[3vw] text-black font-vazirmatn btn place-self-center bg-bomborange hover:text-bomborange hover:bg-black"
									onClick={() => deletePosition()}
								>
									بله، پوزیشن را حذف کن
								</Button>
								<DrawerClose asChild>
									<Button
										variant="outline"
										className="font-vazirmatn"
										onClick={() =>
											setDeletePositionOpen(false)
										}
									>
										بازگشت
									</Button>
								</DrawerClose>
							</DrawerContent>
						</Drawer>
					</div>
				</>
			)}
		</Card>
	);
};

export default PositionItem;
