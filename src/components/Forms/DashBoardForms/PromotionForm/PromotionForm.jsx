import { Button } from "@/components/ui/button";
import styles from "./PromotionForm.module.scss";
import { Card } from "@/components/ui/card";
function PromotionForm() {
	const Promote = (e) => {
		e.preventDefault();
	};
	return (
		<form
			className="font-vazirmatn place-items-center"
			onSubmit={(e) => Promote(e)}
		>
			<div className={styles.container}>
				<Card className="border-solid border-2 my-[4vw] border-bomborange w-[25vw] h-[30vw] place-content-center place-items-center hover:cursor-pointer">
					<div className="text-[2vw] p-[2vw]">استارت آپ</div>
					<div className="rtl place-self-end px-[3vw]">امکانات:</div>
                    <div>
                        <div>میتوانید نیگا خریداری کنید</div>
                        <div>میتوانید نیگا خریداری کنید</div>
                        <div>میتوانید نیگا خریداری کنید</div>
                        <div>میتوانید نیگا خریداری کنید</div>
                        <div>میتوانید نیگا خریداری کنید</div>
                        <div>میتوانید نیگا خریداری کنید</div>
                        <div>میتوانید نیگا خریداری کنید</div>
                        <div>میتوانید نیگا خریداری کنید</div>
                        <div>میتوانید نیگا خریداری کنید</div>
                        <div>میتوانید نیگا خریداری کنید</div>
                    </div>
				</Card>
				<Card className="border-solid border-2 border-bomborange my-[4vw] w-[25vw] h-[30vw] place-content-center place-items-center hover:cursor-pointer">
					<div className="text-[2vw] p-[2vw]">سرمایه گذار</div>
					<div className="rtl place-self-end px-[3vw]">امکانات:</div>
                    <div>
                        <div>نیگا هستید</div>
                        <div>نیگا هستید</div>
                        <div>نیگا هستید</div>
                        <div>نیگا هستید</div>
                        <div>نیگا هستید</div>
                        <div>نیگا هستید</div>
                        <div>نیگا هستید</div>
                        <div>نیگا هستید</div>
                        <div>نیگا هستید</div>
                        <div>نیگا هستید</div>
                    </div>
				</Card>
			</div>
		</form>
	);
}

export default PromotionForm;
