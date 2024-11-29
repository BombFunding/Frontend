import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import WebIcon from "@mui/icons-material/Web";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "@/Services/ApiClient/Services";
import { Loading } from "@/components/Loading/Loading";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import Error from "@/Pages/Error/Error";

const PublicCommonProfile = ({ className }) => {
	const Navigate = useNavigate();
	const { username } = useParams();
	const [profileInfo, setProfileInfo] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	console.log("username: ", username);
	useEffect(() => {
		setLoading(true);
		getData(`/startup/startup_search_by_name/${username}/`)
			.then((data) => {
				console.log(data);
				const profile = data.startup_profile;
				console.log("recived profile: ", profile);
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
					banner: `http://104.168.46.4:8000${profile.header_picture}`,
					avatar: `http://104.168.46.4:8000${profile.profile_picture}`,
				};
				setProfileInfo(profileInfo_);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setError(true);
				console.log("ERROR: ", error);
				// Server responded with a status other than 2xx
				// if (error.response.status === 404) {
				if (error.message.includes("404")) {
					toast.error(
						<CustomToast
							Header="خطا"
							Message="کاربری با این نام کاربری وجود ندارد"
						/>
					);
					setTimeout(() => Navigate("/"), 3000);
				}
			});
	}, []);

	if (loading) {
		return <Loading />;
	}
	if (error) {
		return <></>;
	}
	return (
		<Card
			className={`${className} bg-slate-50 p-0 overflow-hidden h-[80vh] font-vazirmatn`}
		>
			<div className={`h-1/3 overflow-hidden relative`}>
				<img
					className="transition-all duration-1000 ease-in-out top-0 md:top-[-100%] absolute"
					src={profileInfo.banner}
				/>
				<div className="transition-all duration-500 ease-in-out absolute bg-white opacity-[27%]  w-[70%] aspect-square rounded-full top-[-30%] left-[-10%] md:top-[-60%]"></div>
			</div>
			<div className="relative">
				<div className="flex justify-center items-center shadow-lg w-[100px] h-[100px] rounded-full overflow-hidden bg-white absolute top-[-70px] right-5">
					<div className="w-[90px] rounded-full overflow-hidden">
						<img
							className="object-cover"
							src={profileInfo.avatar}
						/>
					</div>
				</div>
				<div className="p-8 flex flex-col gap-3 font-vazirmatn">
					<Label className=" text-base">اطلاعات کاربری</Label>
					<Separator className="my-2 bg-gray-300" />
					<div className="flex flex-col justify-evenly mr-3 gap-1">
						<Label>:نام کاربری</Label>
						<p className="text-xs">{profileInfo.firstName}</p>
						<Label>:ایمیل</Label>
						<p className="text-xs">{profileInfo.email}</p>
						<Label>:بیوگرافی</Label>
						<p className="text-xs">{profileInfo.bio}</p>
					</div>
					<div className="flex justify-center items-center gap-6 absolute">
						{profileInfo.linkedinAccoun && (
							<a href={profileInfo.linkedinAccount}>
								{<LinkedInIcon />}
							</a>
						)}
						{profileInfo.telegramAccount && (
							<a
								href={`https://t.me/${profileInfo.telegramAccount}`}
							>
								{<TelegramIcon />}
							</a>
						)}
						{profileInfo.twitterAccount && (
							<a
								href={`https://x.com/${profileInfo.twitterAccount}`}
							>
								{<XIcon />}
							</a>
						)}
						{profileInfo.website && (
							<a href={profileInfo.website}>{<WebIcon />}</a>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
};

export default PublicCommonProfile;
