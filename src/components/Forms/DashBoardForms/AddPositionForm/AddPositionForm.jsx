import styles from "./AddPositionForm.module.scss";
import { Button } from "@/components/ui/button";
import { getData, postData } from "@/Services/ApiClient/Services";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { useParams } from "react-router-dom";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";

const validationSchema = Yup.object().shape({
	//   position_name: Yup.string().required("Name is required"),
	description: Yup.string().required("توضیحات الزامی است"),
	total: Yup.string().required("سرمایه مورد نیاز الزامی است"),
	duration: Yup.number().required("مدت زمان الزامی است"),
});

const AddPositionForm = ({ setOpen, positions, setPositions }) => {
	const { projectId } = useParams();
	const { updateProject } = useProjectStore();
	const { username, setBalance } = useProfileStore();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data) => {
		const now = new Date();
		const currentTime = now.toISOString().slice(0, 19); // Current time in ISO format (without milliseconds)

		// Calculate the future date by adding `data.duration` days to the current date
		const futureDate = new Date(now);
		futureDate.setDate(now.getDate() + parseInt(data.duration, 10));
		const endTime = futureDate.toISOString().slice(0, 19); // Future date in ISO format (without milliseconds)

		// Create the body data according to the required structure
		const bodyData = {
			end_time: endTime, // End time in ISO format
			total: parseInt(data.total, 10), // Total as a number
			description: data.description, // Description from input data
		};

		console.log("bodyData: ", bodyData);
		console.log("projectId: ", projectId);
		// Post the data and handle responses
		postData(`/position/create/${projectId}/`, bodyData)
			.then((res) => {
				console.log(res);
				toast.success(
					<CustomToast Header="پوزیشن با موفقیت ساخته شد" />
				);
				setOpen(false); // Close the modal
				updateProject(projectId);
				// Fetch updated positions after the new position is successfully created
				// getData(`/position/list/${username}/`).then((data) => {

				//   // Fetch balance and update state after a delay
				getData(`/balance/balance/`).then((res) => {
					setTimeout(() => {
						setBalance(res.balance); // Update balance
						//   setPositions(data); // Update positions list
					}, 3000);
				});
				// });
			})
			.catch((err) => {
				console.log("e", err);

				// Handle errors and display appropriate messages
				if (err.response?.data?.error) {
					toast.error(
						<CustomToast
							Header="خطا"
							Message={`برای ساخت این پوزیشن موجودی شما باید حداقل ${
								err.response?.data?.error.split(" ")[6]
							} تومان باشد`}
						/>
					);
				} else if (
					err.response.data?.detail ===
					"You already have an open position for this project."
				) {
					toast.error(
						<CustomToast
							Header="خطا"
							Message={
								"شما یک پوزیشن باز برای این پروژه دارید"
							}
						/>
					);
				} else {
					toast.error(
						<CustomToast
							Header="خطا"
							Message={
								"در هنگام ساخت پوزیشن جدید خطایی به وجود آمد"
							}
						/>
					);
				}
			});
	};

	return (
		<form
			className="font-vazirmatn place-items-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col gap-2 justify-evenly items-center">
				{/* <CustomInput
          inputClassName={"w-[60vw] text-right"}
          placeholder="نام پوزیشن"
          register={register}
          name={"position_name"}
        /> */}
				<CustomInput
					inputClassName={"w-[60vw] text-right"}
					placeholder="توضیحات"
					register={register}
					name={"description"}
				/>
				<CustomInput
					inputClassName={"w-[60vw]"}
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
		</form>
	);
};

export default AddPositionForm;
