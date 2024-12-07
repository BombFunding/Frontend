import React from "react";
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
import { deleteData } from "@/Services/ApiClient/Services";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

const PositionItem = ({ positionData }) => {
	console.log("positionData: ", positionData);
	const deletePosition = () => {
		deleteData(`/startup/position/delete/${positionData.id}/`)
			.then((data) => {
				console.log(data);
				toast.success(<CustomToast Header="پوزیشن با موفقیت حذف شد" />);
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
			<div className={styles.col_box}>
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
					value={50}
					className={styles.progress_bar}
					mainColor="bg-gray-50"
					ProgressColor="bg-bomborange"
				/>
				<div className="self-start">
					<Label>زمان اتمام: </Label>
					<Label>{positionData?.end_time}5d</Label>
				</div>
				<Progress
					value={50}
					className={styles.progress_bar}
					mainColor="bg-gray-50"
					ProgressColor="bg-bomborange"
				/>
			</div>
			<Separator orientation="vertical" className="mx-2" />
			<div className={styles.button_box}>
				<Drawer>
					<DrawerTrigger>
						<Button
							variant="default"
							className={styles.button_style}
						>
							ویرایش
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<EditPositionForm positionData={positionData} />
						<DrawerClose asChild>
							<Button
								variant="outline"
								className="font-vazirmatn"
							>
								بازگشت
							</Button>
						</DrawerClose>
					</DrawerContent>
				</Drawer>
				<Separator className="my-1" />
				{/* <Button variant="default" className={styles.button_style}>
					بستن
				</Button> */}
				<Drawer>
					<DrawerTrigger>
						<Button
							variant="default"
							className={styles.button_style}
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
							>
								بازگشت
							</Button>
						</DrawerClose>
					</DrawerContent>
				</Drawer>
				<Separator className="my-1" />
				<Button variant="default" className={styles.button_style}>
					تمدید
				</Button>
			</div>
		</Card>
	);
};

export default PositionItem;
