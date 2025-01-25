import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import { DrawerDialog } from "@/components/Custom/DrawerDialog/DrawerDialog";
import { postData } from "@/Services/ApiClient/Services";
import { toast } from "react-toastify";
import { use } from "react";
import useProjectBoxStore from "@/stores/ProjectStore/ProjectBoxStore";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

const schema = yup.object().shape({
	name: yup.string().required("Name is required"),
	description: yup.string().required("Description is required"),
});

const AddProjectForm = ({ addProjectCard }) => {
	const { updateProjects } = useProjectBoxStore();
	const { username } = useProfileStore();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		console.log("Form Data:", data);
		postData("/projects/", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).then((response) => {
			console.log("Response:", response);
			updateProjects(username);
			toast.success(<CustomToast Header="پروژه با موفقیت اضافه شد" />);
		});
	};

	return (
		<>
			<DrawerDialog
				title={"پروژه جدید"}
				closeButton={
					<button
						type="submit"
						className="btn bg-bomborange text-white h-8"
						style={{ "min-height": "0px" }}
					>
						بستن
					</button>
				}
				triggerButton={addProjectCard}
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col place-items-center gap-5 place-self-center align-middle"
				>
					{/* <div className="flex place-self-center place-items-center border-solid border-2">
						<CustomInput
							// holderClassName={"w-full"}
							inputClassName={"w-full"}
							name={"name"}
							register={register}
							placeholder={"نام پروژه"}
						/>
					</div> */}
					<CustomInput
						holderClassName={"w-full"}
						inputClassName={"w-full translate-x-[-0.5vw]"}
						name={"name"}
						register={register}
						placeholder={"نام پروژه"}
					/>
					<CustomTextArea
						holderClassName={"w-full"}
						inputClassName={"w-full h-32"}
						name={"description"}
						register={register}
						placeholder={"توضیحات"}
					/>
					<button
						type="submit"
						className="btn bg-bomborange text-white h-8"
						style={{ "min-height": "0px" }}
					>
						ثبت اطلاعات
					</button>
				</form>
			</DrawerDialog>
		</>
	);
};

export default AddProjectForm;
