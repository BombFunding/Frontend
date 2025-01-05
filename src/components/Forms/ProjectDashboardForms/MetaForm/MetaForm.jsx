import React from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";
import { useParams } from "react-router-dom";
import { patchData } from "@/Services/ApiClient/Services";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

const schema = yup.object().shape({
	name: yup.string().optional(),
	description: yup.string().optional(),
});

const MetaForm = ({ setClose }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const { updateProject } = useProjectStore();
	const { projectId } = useParams();

	const onSubmit = (data) => {
		console.log("Form Data:", data);
		const bodyData = {
			name: data.name,
			description: data.description,
		};
		patchData(`/projects/${projectId}/`, bodyData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
			.then((res) => {
				console.log("Project Updated:", res);
				// toast.success("پروژه با موفقیت بروزرسانی شد");
				toast.success(
					<CustomToast Header="پروژه با موفقیت بروزرسانی شد" />
				);
				setClose(false);
				updateProject(projectId);
			})
			.catch((err) => {
				console.log("Project Update Failed:", err);
				toast.error("خطا در بروزرسانی پروژه");
				toast.error(<CustomToast Header="خطا در بروزرسانی پروژه" />);
			});
	};
	return (
		<form
			className="w-full flex flex-col justify-evenly gap-5 items-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			<CustomInput
				holderClassName={"w-full"}
				inputClassName={"w-full"}
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
				className="btn bg-bomborange text-white h-6"
				style={{ "min-height": "0px" }}
			>
				ثبت اطلاعات
			</button>
		</form>
	);
};

export default MetaForm;
