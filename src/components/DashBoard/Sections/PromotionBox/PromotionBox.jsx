import PromotionForm from "@/components/Forms/DashBoardForms/PromotionForm/PromotionForm";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer";

function PromotionBox() {
	return (
		<div className="border-solid border-2 border-bomborange rounded-lg ">
			<Drawer className="place-items-center">
				<DrawerTrigger className="place-self-center">
					<Button className="place-self-center ">
						ارتقا حساب کاربری
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<PromotionForm />
					<DrawerClose asChild>
						<Button className="font-vazirmatn" variant="outline">
							بازگشت
						</Button>
					</DrawerClose>
				</DrawerContent>
			</Drawer>
		</div>
	);
}

export default PromotionBox;
