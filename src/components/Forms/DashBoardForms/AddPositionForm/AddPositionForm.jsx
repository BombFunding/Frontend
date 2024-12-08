import styles from "./AddPositionForm.module.scss";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postData } from "@/Services/ApiClient/Services";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

const validationSchema = Yup.object().shape({
	position_name: Yup.string().required("Name is required"),
	description: Yup.string().required("Name is required"),
	total: Yup.string().required("Email is required"),
	duration: Yup.string().required("Email is required"),
});

const AddPositionForm = ({ setOpen }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

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
					<CustomToast Header="پوزیشن با موفقیت ساخته شد" />
				);
				setTimeout(() => {
					setOpen(false);
				}, 3000);
			})
			.catch((err) => {
				console.log(err);
				toast.error(<CustomToast Header="خطا" Message={err.message} />);
			});
	};

	return (
		<form
			// className="flex flex-col gap-4 items-center font-vazirmatn m-5"
			className="font-vazirmatn place-items-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col gap-2 justify-evenly items-center">
				<CustomInput
					inputClassName={"w-[60vw] text-right"}
					placeholder="نام پوزیشن"
					register={register}
					name={"position_name"}
				/>
				<CustomInput
					inputClassName={"w-[60vw] text-right"}
					placeholder="توضیحات"
					register={register}
					name={"description"}
				/>
				<CustomInput
					inputClassName={"w-[60vw] text-right"}
					placeholder="سرمایه مورد نیاز"
					type="number"
					register={register}
					name={"total"}
				/>
				<CustomInput
					inputClassName={"w-[60vw]"}
					placeholder="مدت زمان (روز)"
					type="number"
					register={register}
					name={"duration"}
				/>
				<Button
					type="submit"
					className="m-[3vw] btn bg-bomborange hover:text-white hover:bg-black"
				>
					ثبت پوزیشن
				</Button>
			</div>
			{/* <div className={styles.input_box}>
				<Label className={styles.label_style}>نام پوزیشن</Label>
				<Input className={styles.input_style}></Input>
			</div> */}
			{/* <div className={styles.input_box}>
				<Label className={styles.label_style}>سرمایه مورد نیاز</Label>
				<Input type="number" className={styles.input_style}></Input>
			</div> */}
			{/* <div className={styles.input_box}>
				<Label className={styles.label_style}>{"مدت زمان (روز)"}</Label>
				<Input type="number" className={styles.input_style}></Input>
			</div> */}
		</form>
	);
};

export default AddPositionForm;
