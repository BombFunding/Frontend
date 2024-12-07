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

const PositionItem = ({ positionData }) => {
	console.log("positionData: ", positionData);
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
						<EditPositionForm />
						<DrawerClose asChild>
							<Button variant="outline">بازگشت</Button>
						</DrawerClose>
					</DrawerContent>
				</Drawer>
				<Separator className="my-1" />
				<Button variant="default" className={styles.button_style}>
					بستن
				</Button>
				<Separator className="my-1" />
				<Button variant="default" className={styles.button_style}>
					تمدید
				</Button>
			</div>
		</Card>
	);
};

export default PositionItem;
