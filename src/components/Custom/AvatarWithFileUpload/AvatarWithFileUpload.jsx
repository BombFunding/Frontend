import { useRef, useState } from "react";
import AVATARIMG from "@/assets/A1.jpg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ErrorMessage from "@/components/messages/ErrorMessage/ErrorMessage";
import { toast } from "react-toastify";
import { baseURL, getData, postImageData } from "@/Services/ApiClient/Services";
import styles from "./AvatarWithFileUpload.module.scss";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
const AvatarWithFileUpload = ({ className, avatarFileState }) => {
	const [imageURL, setImageURL] = avatarFileState ?? useState("");
	const [imageLoading, setImageLoading] = useState(false);
	const fileInputRef = useRef(null);
	const { setAvatar } = useProfileStore();
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageURL(reader.result);
				const formData = new FormData();
				formData.append("profile_picture", file);
				setImageLoading(true);
				const toastId = toast.success(
					<ErrorMessage message={"آواتار در حال بارگزاری ..."} />,
					{ autoClose: 20000 }
				);
				postImageData("/auth/update_baseuser_profile/", formData)
					.then((res) => {
						console.log("Image posted successfully:", res);
						setImageLoading(false);
						setAvatar(
							`${baseURL}${res.profile.profile_picture}`
						);
						toast.dismiss(toastId);
						toast.success(
							<ErrorMessage
								message={"آواتار با موفقیت بارگزاری شد"}
							/>
						);
					})
					.catch((err) => {
						console.log("Image posting FAILED:", err);
						setImageLoading(false);
						toast.dismiss(toastId);
						toast.error(
							<ErrorMessage message={"آواتار بارگزاری نشد"} />
						);
					});
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className={`${className}`} style={{ textAlign: "center" }}>
			<Avatar
				onClick={() => fileInputRef.current.click()}
				className={styles.profile}
			>
				<div className={styles.shadow} />
				<CameraAltIcon className={styles.camera_icon} />
				<AvatarImage
					src={imageURL || AVATARIMG}
					alt="User Avatar"
					size="large"
					className="object-cover"
				/>
			</Avatar>
			<input
				type="file"
				accept="image/*"
				style={{ display: "none" }}
				ref={fileInputRef}
				onChange={handleImageChange}
			/>
		</div>
	);
};

export default AvatarWithFileUpload;
