import React, { useEffect } from "react";
import styles from "./EditPositionForm.module.scss";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { postData } from "@/Services/ApiClient/Services";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

const validationSchema = Yup.object().shape({
	position_name: Yup.string().required("این مورد اجباری است"),
	description: Yup.string().required("این مورد اجباری است"),
	total: Yup.string().required("این مورد اجباری است"),
	duration: Yup.string().required("این مورد اجباری است"),
});

const EditPositionForm = ({ positionData }) => {
	console.log("positionData: ", positionData.name);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		if (errors.length) {
			console.log(errors);
			const Fields = {
				position_name: "نام پوزیشن",
				description: "توضیحات",
				total: "سرمایه مورد نیاز",
				duration: "زمان",
			};
			Object.keys(Fields).forEach((key) => {
				// let tempStr = `${errors[key].message}`;
				toast.error(
					<CustomToast
						Header={Fields[key]}
						Message={errors[key].message}
					/>
				);
			});
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
		const now = new Date();
		const currentTime = now.toISOString().slice(0, 19);
		const futureDate = new Date(now);
		futureDate.setDate(now.getDate() + parseInt(data.duration, 10));
		const endTime = futureDate.toISOString().slice(0, 19);
		const bodyData = {
			name: data.position_name,
			description: data.description,
			end_time: endTime,
			funded: 0,
			start_time: currentTime,
			total: data.total,
		};
		console.log("bodyData: ", bodyData);
		postData("/startup/position/create/", bodyData)
			.then((res) => {
				console.log(res);
				toast.success(
					<CustomToast Header="پوزیشن با موفقیت ویرایش شد" />
				);
			})
			.catch((err) => {
				console.log(err);
				toast.error(<CustomToast Header="خطا" Message={"oxh"} />);
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
				value={positionData.name}
			/>
			<CustomInput
				inputClassName={"w-[60vw] text-right rtl"}
				placeholder="توضیحات"
				register={register}
				name={"description"}
				value={positionData.description}
			/>
			<CustomInput
				inputClassName={"w-[60vw] text-right rtl"}
				placeholder="سرمایه مورد نیاز"
				register={register}
				name={"total"}
				type="number"
				value={positionData.total}
			/>
			<CustomInput
				inputClassName={"w-[60vw] text-right rtl"}
				placeholder="زمان (روز)"
				type={"number"}
				register={register}
				name={"duration"}
			/>
			{/* <div className={styles.input_box}>
        <Label className={styles.label_style}>نام پوزیشن</Label>
        <Input className={styles.input_style}></Input>
      </div>
      <div className={styles.input_box}>
        <Label className={styles.label_style}>سرمایه مورد نیاز</Label>
        <Input className={styles.input_style}></Input>
      </div>
      <div className={styles.input_box}>
        <Label className={styles.label_style}>{"مدت زمان (روز)"}</Label>
        <Input
          type="number"
          className={styles.input_style}
          defaultValue={0}
        ></Input>
      </div> */}
			<Button className="btn">ویرایش پوزیشن</Button>
		</form>
	);
};

export default EditPositionForm;
