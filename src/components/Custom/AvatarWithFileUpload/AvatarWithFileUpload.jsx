import { useRef, useState } from "react";
import AVATARIMG from "@/assets/A1.jpg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ErrorMessage from "@/components/messages/ErrorMessage/ErrorMessage";
import { toast } from "react-toastify";
import { postImageData } from "@/Services/ApiClient/Services";

const AvatarWithFileUpload = ({
	className,
	defaultAvatar,
	avatarFileState,
}) => {
	const [imageURL, setImageURL] = avatarFileState ?? useState("");
	const [imageLoading, setImageLoading] = useState(false);
	const fileInputRef = useRef(null);

	// Function to handle file input change
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
					<ErrorMessage message={"آواتار در حال بروزرسانی ..."} />,
					{
						autoClose: 20000,
					}
				);
				postImageData("/auth/update_baseuser_profile/", formData)
					.then((res) => {
						console.log("Image posted successfully:", res);
						setImageLoading(false);
						toast.dismiss(toastId);
						toast.success(
							<ErrorMessage
								message={"آواتار با موفقیت بروزرسانی شد"}
							/>
						);
					})
					.catch((err) => {
						console.log("Image posting FAILED:", err);
						setImageLoading(false);
						toast.dismiss(toastId);
						toast.error(
							<ErrorMessage message={"آواتار بروزرسانی نشد"} />
						);
					});
			};
			reader.readAsDataURL(file);
		}
	};

	// Function to trigger file input click
	const handleAvatarClick = () => {
		fileInputRef.current.click();
	};

	return (
		<div className={`${className}`} style={{ textAlign: "center" }}>
			<Avatar
				// src={imageURL || AVATARIMG} // Display a default avatar image if none is selected
				// alt="User Avatar"
				// size="large" // Customize size according to your preference
				onClick={handleAvatarClick} // Trigger file selection on avatar click
				// style={{ cursor: "pointer" }} // Change cursor to pointer indicating it's clickable
				className={`w-[12vw] h-[12vw] translate-y-[5vw] translate-x-[-3vw] border-solid ring-[0.4vw] ring-bomborange z-[50] absolute flex justify-center items-center object-cover`}
			>
				<div className="w-full h-full top-2/3 absolute bg-black opacity-25" />
				<CameraAltIcon className="absolute top-[70%] text-white opacity-90" />
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
				style={{ display: "none" }} // Hide the file input element
				ref={fileInputRef} // Attach input to useRef
				onChange={handleImageChange} // Handle file selection
			/>
		</div>
	);
};

export default AvatarWithFileUpload;
