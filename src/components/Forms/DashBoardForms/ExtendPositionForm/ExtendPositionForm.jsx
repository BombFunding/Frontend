import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { Label } from "@/components/ui/label";
import { useState } from "react";
function ExtendPositionForm({ setPositions }) {
	const [amount, setAmount] = useState(0);
	const onSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<form
			className="flex flex-col gap-4 items-center font-vazirmatn m-5"
			onSubmit={onSubmit}
		>
			<Label className="text-black text-[1vw] place-self-center mt-[2vw] font-vazirmatn">
				چه مقدار میخواهید این پوزیشن را تمدید کنید؟
			</Label>
			<CustomInput
				inputClassName={"w-[60vw] text-right"}
				placeholder="روز"
				value={amount}
				onChange={setAmount}
				type="number"
			/>
			<Button
				type="submit"
				className="m-[3vw] btn bg-bomborange hover:text-white hover:bg-black"
			>
				تمدید پوزیشن
			</Button>
		</form>
	);
}

export default ExtendPositionForm;
