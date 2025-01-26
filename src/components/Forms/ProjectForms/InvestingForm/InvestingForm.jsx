import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { postData } from "@/Services/ApiClient/Services";
import usePublicProjectStore from "@/stores/ProjectStore/publicProjectStore";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
	investAmount: Yup.number()
		.typeError("لطفاً مقدار عددی وارد کنید") // Custom Persian error message
		.transform((value, originalValue) =>
			originalValue.trim() === "" ? null : value
		)
		.nullable()
		.required("فیلد مقدار خالی است")
		.min(1, "حداقل مقدار باید 1 باشد"),
});
const InvestingForm = ({ position, setCloser }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const { updatePublicProject } = usePublicProjectStore();
	const { projectId } = useParams();
	const [backErrors, setBackErrors] = React.useState({});
	useEffect(() => {
		console.log(errors);
		Object.keys(errors).forEach((key) => {
			toast.error(<CustomToast Header={errors[key].message} />);
		});
	}, [errors]);

	const onSubmit = (data) => {
		console.log("DATA: ", data);
		console.log("position id: ", position);
		const bodyData = {
			investment_amount: data.investAmount,
		};
		postData(`/invest/create_investment/${position.id}/`, bodyData)
			.then((res) => {
				console.log(res);
				toast.success(
					<CustomToast Header="سرمایه‌گذاری با موفقیت انجام شد" />
				);
				setCloser(false);
				updatePublicProject(projectId);
			})
			.catch((err) => {
				console.log("error: ", err.response.data.detail);
				if (
					err.response.data.detail ===
					"Insufficient balance for investment."
				) {
					toast.error(<CustomToast Header="موجودی کافی نمی‌باشد." />);
				} else if (
					err.response.data.detail ===
					"You cannot invest in your own position."
				) {
					toast.error(<CustomToast Header="خطا" Message="شما نمی‌توانید روی پروژه‌های خودتان سرمایه‌گذاری کنید" />);
				}
			});
	};
	return (
		<>
			<form
				className="flex flex-col justify-start items-center"
				onSubmit={handleSubmit(onSubmit)}
			>
				<CustomInput
					placeholder="مبلغ مورد نظر خود را وارد کنید"
					type={"number"}
					register={register}
					name={"investAmount"}
					//   value={1}
				/>
				<button className="btn bg-bomborange text-white hover:bg-black  mt-4">
					سرمایه‌گذاری
				</button>
			</form>
		</>
	);
};

export default InvestingForm;
