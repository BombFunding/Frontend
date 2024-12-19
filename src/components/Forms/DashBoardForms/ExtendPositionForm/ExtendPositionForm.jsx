import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { getData, patchData } from "@/Services/ApiClient/Services";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
function ExtendPositionForm({
	setPositions,
	positionData,
	setExtendPositionOpen,
}) {
	const [days, setDays] = useState(0);
	const { username } = useProfileStore();
	const onSubmit = (e) => {
		e.preventDefault();
		patchData(`/position/renew/${positionData?.id}`, { days: days })
			.then((res) => {
				console.log(res);
				getData(`/position/list/${username}/`).then((data) => {
					toast.success(
						<CustomToast Header="پوزیشن با موفقیت تمدید شد" />
					);
					setTimeout(() => {
						setPositions(data);
						setExtendPositionOpen(false);
					}, 3000);
				});
			})
			.catch((err) => {
				console.log("RR: ", err);
				toast.error(
					<CustomToast Header="خطا" Message={err.response?.data} />
				);
			});
	};
	return (
		<form
			className="flex flex-col gap-4 items-center font-vazirmatn m-5"
			onSubmit={onSubmit}
		>
			<Label className="text-black text-lg place-self-center mt-[2vw] font-vazirmatn">
				چه مقدار میخواهید این پوزیشن را تمدید کنید؟
			</Label>
			<CustomInput
				inputClassName={"w-[60vw]"}
				placeholder="روز"
				value={days}
				onChange={setDays}
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
