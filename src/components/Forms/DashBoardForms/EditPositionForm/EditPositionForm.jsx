import React, { useEffect, useState } from "react";
import styles from "./EditPositionForm.module.scss";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getData, patchData } from "@/Services/ApiClient/Services";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";

const validationSchema = Yup.object().shape({
	position_name: Yup.string().required("این مورد اجباری است"),
	description: Yup.string().required("این مورد اجباری است"),
	total: Yup.string().required("این مورد اجباری است"),
	funded: Yup.string().required("این مورد اجباری است"),
});

const EditPositionForm = ({ positionData, setPositions, setEditFormOpen }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const { username } = useProfileStore();
	const [name, setName] = useState(positionData?.name);
	const [description, setDescription] = useState(positionData?.description);
	const [total, setTotal] = useState(positionData?.total);
	const [funded, setFunded] = useState(positionData?.funded);
	// const now = new Date();
	// const currentTime = now.toISOString().slice(0, 19);
	// const futureDate = new Date(now);
	// futureDate.setDate(now.getDate() + parseInt(positionData.duration, 10));
	// const endTime = futureDate.toISOString().slice(0, 19);
	useEffect(() => {
		if (errors.length) {
			console.log(errors);
			const Fields = {
				position_name: "نام پوزیشن",
				description: "توضیحات",
				total: "سرمایه مورد نیاز",
				duration: "زمان",
			};
			toast.error(
				<CustomToast
					// Header={Fields[key]}
					// Message={errors[key].message}
					Header={"خطا"}
					Message={"مشکلی در ویرایش پوزیشن وجود دارد"}
				/>
			);
			// Object.keys(Fields).map((key) => {
			// 	toast.error(
			// 		<CustomToast
			// 			// Header={Fields[key]}
			// 			// Message={errors[key].message}
			// 			Header={"خطا"}
			// 			Message={"مشکلی در ویرایش پوزیشن وجود دارد"}
			// 		/>
			// 	);
			// });
		}
	}, [errors]);
	const onSubmit = (data) => {
		console.log(data);
		// e.preventDefault();
		// const data = {
		//   name: "Ali",
		//   bio: "daaaaa",
		//   end_time: "2024-12-12T02:01:14",
		//   funded: 0,
		//   start_time: "2024-12-10T02:01:14",
		//   total: 10,
		// };
		const bodyData = {
			name: data.position_name,
			description: data.description,
			end_time: positionData?.end_time,
			funded: positionData?.funded,
			start_time: positionData?.start_time,
			total: data.total,
		};
		// console.log("Date: ", endTime);
		console.log("bodyData: ", bodyData);
		patchData(`/position/update/${positionData?.id}/`, bodyData)
			.then((res) => {
				console.log(res);
				getData(`/position/list/${username}/`).then((data) => {
					toast.success(
						<CustomToast Header="پوزیشن با موفقیت ویرایش شد" />
					);
					setTimeout(() => {
						setPositions(data);
						setEditFormOpen(false);
					}, 3000);
				});
			})
			.catch((err) => {
				console.log(err);
				toast.error(
					<CustomToast Header="خطا" Message={err.response?.data} />
				);
			});
	};

	return (
		<form
			className="flex flex-col gap-4 items-center font-vazirmatn m-5"
			onSubmit={handleSubmit(onSubmit)}
		>
			<CustomInput
				inputClassName={"w-[60vw] text-right rtl"}
				placeholder="نام پوزیشن"
				register={register}
				name={"position_name"}
				value={name}
				onChange={setName}
			/>
			<CustomInput
				inputClassName={"w-[60vw] text-right rtl"}
				placeholder="توضیحات"
				register={register}
				name={"description"}
				value={description}
				onChange={setDescription}
			/>
			<CustomInput
				inputClassName={"w-[60vw] text-right rtl"}
				placeholder="سرمایه مورد نیاز"
				register={register}
				name={"total"}
				type="number"
				value={total}
				onChange={setTotal}
			/>
			<CustomInput
				inputClassName={"w-[60vw] text-right rtl"}
				placeholder="مقدار به دست آمده"
				register={register}
				name={"funded"}
				type="number"
				value={funded}
				onChange={setFunded}
			/>

			<Button className="btn bg-bomborange hover:text-bomborange hover:bg-black m-[2vw]">
				ویرایش پوزیشن
			</Button>
		</form>
	);
};

export default EditPositionForm;
