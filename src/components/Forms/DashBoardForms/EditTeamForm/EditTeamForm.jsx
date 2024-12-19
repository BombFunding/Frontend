import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import formStyles from "../DashBoardForm.module.scss";
import styles from "./EditTeamForm.module.scss";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { getData, postData, putData } from "@/Services/ApiClient/Services";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

const validationSchema = Yup.object().shape({
	description: Yup.string().required("Name is required"),
	role: Yup.string().required("Email is required"),
});

const EditTeamForm = ({ memberData, setEditMemberOpen }) => {
	const [role, setRole] = useState(memberData?.role);
	const [description, setDescription] = useState(memberData?.description);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const { profileId } = useProfileStore((state) => state);
	// console.log("profileManeger: ", ProfileManager);
	const onSubmit = (data) => {
		console.log(data);
		const bodyData = {
			role: data.role,
			description: data.description,
		};
		console.log("bodyData: ", bodyData);
		// console.log("ProfileManager: ", ProfileManager);
		putData(
			`/startup/profile/team/update/${memberData.user}/`,
			bodyData
		)
			.then((res) => {
				console.log(res);
				toast.success(
					<CustomToast Header="عضو تیم با موفقیت ویرایش شد" />
				);
				setTimeout(() => setEditMemberOpen(false), 3000);
				// getData(`/startup/profile/${profileId}/team/list`).then(
				// 	(res) => {
				// 		console.log("team list: ", res);
				// 		toast.success(
				// 			<CustomToast Header="عضو تیم با موفقیت ویرایش شد" />
				// 		);
				// 		setTimeout(() => setEditMemberOpen(false), 3000);
				// 	}
				// );
			})
			.catch((err) => {
				console.log(err);
				toast.error(
					<CustomToast
						Header="خطا"
						Message="ویرایش عضو با خطا مواجه شد"
					/>
				);
			});
	};
	return (
		<form
			className="flex flex-col gap-4 items-center font-vazirmatn m-5"
			onSubmit={handleSubmit(onSubmit)}
		>
			<CustomInput
				inputClassName={"w-[60vw] text-right"}
				placeholder="نقش عضو در تیم"
				register={register}
				name={"role"}
				value={role}
				onChange={setRole}
			/>
			<CustomInput
				inputClassName={"w-[60vw] text-right"}
				placeholder="توضیحات"
				register={register}
				name={"description"}
				value={description}
				onChange={setDescription}
			/>
			{/* <div className={formStyles.input_box}>
        <Label className={formStyles.label_style}>نقش عضو در تیم</Label>
        <Input className={formStyles.input_style}></Input>
      </div>
      <div className={formStyles.input_box}>
        <Label className={formStyles.label_style}>توضیحات</Label>
        <Textarea className={formStyles.input_style}></Textarea>
      </div> */}
			<Button className="btn bg-bomborange hover:text-white hover:bg-black">
				ثبت تغییرات
			</Button>
		</form>
	);
};

export default EditTeamForm;
