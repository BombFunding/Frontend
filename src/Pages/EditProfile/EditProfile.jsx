import * as yup from "yup";
import AvatarWithFileUpload from "@/components/Custom/AvatarWithFileUpload/AvatarWithFileUpload";
import EditableInput from "@/components/Custom/EditableInput/EditableInput";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React, { useEffect, useRef } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import VerifiableInput from "@/components/Custom/VerifiableInput/VerifiableInput";
import WebIcon from "@mui/icons-material/Web";
import XIcon from "@mui/icons-material/X";
import styles from "./EditProfile.module.scss";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ErrorMessage from "@/components/messages/ErrorMessage/ErrorMessage";
import {
	baseURL,
	getData,
	postData,
	postImageData,
} from "@/Services/ApiClient/Services";
import { Loading } from "@/components/Loading/Loading";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import useTokenStore from "@/stores/TokenStore";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
	firstName: yup.string().optional().nullable(),
	lastName: yup.string().optional().nullable(),
	phoneNumber: yup
		.string()
		.optional()
		.nullable()
		.matches(/^09[0-9]{9}$|^$/, "شماره تلفن معتبر وارد کنید"),

	bio: yup.string().max(300, "بیوگرافی نباید بیشتر از ۳۰۰ کاراکتر باشد"),

	telegramAccount: yup
		.string()
		.nullable()
		.optional()
		.matches(
			/^[a-zA-Z][a-zA-Z0-9_]{4,31}$|^$/,
			"آدرس تلگرام معتبر وارد کنید"
		),

	linkedinAccount: yup
		.string()
		.nullable()
		.optional()
		.url("آدرس لینکدین معتبر وارد کنید")
		.matches(/linkedin\.com|^$/, "لینک باید مربوط به لینکدین باشد"),

	twitterAccount: yup
		.string()
		.nullable()
		.optional()
		.matches(
			/^[a-zA-Z][a-zA-Z0-9_]{0,14}$|^$/,
			"آدرس توییتر معتبر وارد کنید"
		),

	website: yup
		.string()
		.nullable()
		.optional()
		.url("آدرس وب‌سایت معتبر وارد کنید")
		.matches(
			/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$|^$/,
			"فرمت آدرس وب‌سایت صحیح نیست"
		),
});

const EditProfile = () => {
	const userType = useTokenStore((state) => state.userType);
	const Navigate = useNavigate();
	const {
		loading,
		setLoading,
		setFullname,
		setEmail,
		setPhone,
		setUsername,
		setBio,
		setAvatar,
		setHeader,
	} = useProfileStore();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
		setValue,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [profileInfo, setProfileInfo] = React.useState({});
	const [bannerFile, setBannerFile] = React.useState(null);
	const [avatarFile, setAvatarFile] = React.useState(null);
	const [imageLoading, setImageLoading] = React.useState(false);

	useEffect(() => {
		const fetchDefaultValues = async () => {
			setLoading(true);
			// await getData("/startup/view_own_startup_profile/", {
			//   headers: {
			//     "Cache-Control": "no-cache",
			//     Pragma: "no-cache",
			//   },
			// });
			// if (userType === "startup") {
			await getData("/auth/view_own_baseuser_profile/")
				.then((data) => {
					console.log("data: ", data);
					const profile = data.base_profile;
					console.log("recived profile: ", profile);
					setBannerFile(`${baseURL}${profile.header_picture}`);
					setAvatarFile(`${baseURL}${profile.profile_picture}`);
					const profileInfo_ = {
						firstName: profile.first_name ?? "",
						lastName: profile.last_name ?? "",
						phoneNumber: profile.phone ?? "",
						bio: profile.bio ?? "",
						telegramAccount: profile.socials?.telegram ?? "",
						linkedinAccount: profile.socials?.linkedin ?? "",
						twitterAccount: profile.socials?.twitter ?? "",
						website: profile.socials?.website ?? "",
						email: profile.email ?? "",
					};
					setProfileInfo(profileInfo_);
					reset(profileInfo_);
					setLoading(false);
				})
				.catch((error) => {
					console.log(error);
				});
			// }
		};

		fetchDefaultValues();
	}, [reset]);

	useEffect(() => {
		if (errors) {
			console.log("errors: ", errors);
			Object.values(errors).map((err) => {
				// console.log(err.message);
				// toast.error(err.message);
				// toast.error(<ErrorMessage message={err.message} />);
				toast.error(<CustomToast Header={err.message} />);
			});
		}
	}, [errors]);

	const onSubmit = (data) => {
		console.log("Form submitted");
		console.log(data);
		const bodyData = {
			phone: data.phoneNumber ?? profileInfo.phoneNumber,
			first_name: data.firstName ?? profileInfo.firstName,
			last_name: data.lastName ?? profileInfo.lastName,
			bio: data.bio ?? profileInfo.bio,
			socials: {
				linkedin: data.linkedinAccount ?? profileInfo.linkedinAccount,
				twitter: data.twitterAccount ?? profileInfo.twitterAccount,
				telegram: data.telegramAccount ?? profileInfo.telegramAccount,
				website: data.website ?? profileInfo.website,
			},
		};
		const updateData = async (bodyData) => {
			console.log("bodyData: ", bodyData);
			await postData("/auth/update_baseuser_profile/", bodyData)
				.then((res) => {
					console.log(res);

					toast.success(
						<CustomToast Header="پروفایل با موفقیت بروزرسانی شد" />
					);
					// setTimeout(() => {
					// 	Navigate("/dashboard");
					// }, 3000);
					setLoading(false);

					setFullname(
						res.profile.first_name + " " + res.profile.last_name
					);
					setUsername(res.profile.name);
					setBio(res.profile.bio);
					setEmail(res.profile.email);
					setPhone(res.profile.phone);
				})
				.catch((error) => {
					console.log("Data posting FAILED:", error);
					toast.error(
						<CustomToast
							Header="خطا"
							Message="پروفایل بروزرسانی نشد"
						/>
					);
				});
		};
		updateData(bodyData);
	};

	const fileInputRef = useRef(null);

	const handleBannerClick = () => {
		fileInputRef.current.click();
	};

	// Function to handle file input change
	const handleBannerChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBannerFile(reader.result);
				const formData = new FormData();
				formData.append("header_picture", file);
				setImageLoading(true);
				const toastId = toast.success(
					<CustomToast Header="بنر در حال بارگزاری ..." />,
					{ autoClose: 20000 }
				);
				postImageData("/auth/update_baseuser_profile/", formData)
					.then((res) => {
						console.log("Image posted successfully:", res);
						setImageLoading(false);
						setHeader(`${baseURL}${res.profile.header_picture}`);
						toast.dismiss(toastId);
						toast.success(
							<CustomToast Header="بنر با موفقیت بارگزاری شد" />
						);
					})
					.catch((err) => {
						console.log("Image posting FAILED:", err);
						setImageLoading(false);
						toast.dismiss(toastId);
						toast.error(<CustomToast Header="بنر بارگزاری نشد" />);
					});
			};
			reader.readAsDataURL(file);
		}
	};
	if (loading) return <Loading className="pt-52 pb-64 place-self-center" />;
	return (
		<div className="font-vazirmatn mt-8 h-auto rtl place-self-center translate-y-[3vw] mb-[6vw]">
			<Label className=" text-black text-2xl">اطلاعات کاربری</Label>

			<Card className={styles.card_style}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<AvatarWithFileUpload
						avatarFileState={[avatarFile, setAvatarFile]}
						className="m-4"
					/>
					<div className={styles.avatar_container}>
						<img
							className="w-full object-cover absolute"
							src={bannerFile}
							alt="avatar"
						/>

						<button
							className="absolute bottom-2 left-3 font-vazirmatn text-xs px-1 bg-gray-100 rounded-xl text-black text-gray-500 hover:text-bomborange transition-all duration-300 ease-in-out transform opacity-[93%] hover:opacity-100 hover:scale-110 bg-slate-50 shadow-md rounded-lg flex items-center h-4"
							type="button"
							onClick={handleBannerClick}
						>
							تغییر
						</button>
						<input
							type="file"
							accept="image/*"
							style={{ display: "none" }} // Hide the file input element
							ref={fileInputRef} // Attach input to useRef
							onChange={handleBannerChange} // Handle file selection
						/>
					</div>
					<div className="m-5">
						<Label className="z-10 text-xl colo">نام کاربری</Label>

						<Separator className="my-4" />
						<div className="flex flex-col gap-6">
							<div className={styles.input_row}>
								<EditableInput
									setFocus={setFocus}
									setValue={setValue}
									register={register}
									name={"نام"}
									value={"نام"}
									fieldName={"firstName"}
								/>
								<EditableInput
									setFocus={setFocus}
									setValue={setValue}
									register={register}
									name={"نام خانوادگی"}
									value={"نام خانوادگی"}
									fieldName={"lastName"}
								/>
							</div>
							<div className={styles.input_row}>
								<VerifiableInput
									setFocus={setFocus}
									setValue={setValue}
									register={register}
									isVerified={true}
									name={"ایمیل"}
									value={"ایمیل"}
									editable={false}
									fieldName={"email"}
								/>
								<EditableInput
									setFocus={setFocus}
									setValue={setValue}
									register={register}
									name={"شماره تماس"}
									value={"شماره تماس"}
									fieldName={"phoneNumber"}
								/>
							</div>
							<div className="grid w-full gap-1.5 ">
								<EditableInput
									setValue={setValue}
									setFocus={setFocus}
									register={register}
									name={"بیوگرافی"}
									isTextArea={true}
									value={
										"سیبدهیسدلهبدهیسبد سیهدبهدبهسی دهیس دبهد سید یسدهب یسهبدهسیدبه دصثهلد هحدلاخسجیلخئ هخیلت خهد سهخیبدلهیدل خخ لهخ لی دخد  "
									}
									fieldName={"bio"}
								/>
							</div>

							<div className="flex flex-col gap-6">
								<div className={styles.input_row}>
									<EditableInput
										setFocus={setFocus}
										setValue={setValue}
										register={register}
										icon={<LinkedInIcon />}
										name={"لینکدین"}
										value={"لینکدین"}
										fieldName={"linkedinAccount"}
									/>
									<EditableInput
										setFocus={setFocus}
										setValue={setValue}
										register={register}
										icon={<TelegramIcon />}
										name={"تلگرام"}
										value={"تلگرام"}
										fieldName={"telegramAccount"}
									/>
								</div>
								<div className={styles.input_row}>
									<EditableInput
										setFocus={setFocus}
										setValue={setValue}
										register={register}
										icon={<WebIcon />}
										name={"سایت"}
										value={"سایت"}
										fieldName={"website"}
									/>
									<EditableInput
										setFocus={setFocus}
										setValue={setValue}
										register={register}
										icon={<XIcon />}
										name={"ایکس"}
										value={"ایکس"}
										fieldName={"twitterAccount"}
									/>
								</div>
							</div>
						</div>
					</div>
					<button className={styles.save_btn} type="submit">
						<SaveIcon className={styles.save_icon} />
						<span className={styles.save_txt}>ذخیره</span>
					</button>
				</form>
			</Card>
		</div>
	);
};

export default EditProfile;
