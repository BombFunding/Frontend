import { Button } from "@/components/ui/button";
import { useState } from "react";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { getData, putData } from "@/Services/ApiClient/Services";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";

const validationSchema = Yup.object().shape({
	description: Yup.string().required("Name is required"),
	role: Yup.string().required("Email is required"),
});

const EditTeamForm = ({ memberData, setMembers, setEditMemberOpen }) => {
	const [role, setRole] = useState(memberData?.role);
	const [description, setDescription] = useState(memberData?.description);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const { username } = useProfileStore((state) => state);
	// console.log("profileManeger: ", ProfileManager);
	const onSubmit = (data) => {
		console.log(data);
		const bodyData = {
			role: data.role,
			description: data.description,
		};
		console.log("bodyData: ", bodyData);
		// console.log("ProfileManager: ", ProfileManager);
		putData(`/startup/profile/team/update/${memberData.user}/`, bodyData)
			.then((res) => {
				console.log(res);
				getData(`/startup/profile/team/list/${username}/`).then(
					(res) => {
						toast.success(
							<CustomToast Header="عضو تیم با موفقیت ویرایش شد" />
						);
						setTimeout(() => {
							setMembers(res);
							setEditMemberOpen(false);
						}, 3000);
					}
				);
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
				inputClassName={"w-[60vw] text-right rtl translate-x-[-0.5vw]"}
				placeholder="نقش عضو در تیم"
				register={register}
				name={"role"}
				value={role}
				onChange={setRole}
			/>
			<CustomTextArea
				inputClassName={"w-[60vw] text-right rtl"}
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
