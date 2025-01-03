import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";
import { Label } from "@radix-ui/react-label";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import WebIcon from "@mui/icons-material/Web";
import { useParams } from "react-router-dom";
import { getData } from "@/Services/ApiClient/Services";
import { Loading } from "@/components/Loading/Loading";
import { Separator } from "@/components/ui/separator";
import ProjectBox from "@/components/DashBoard/ProjectBox/ProjectBox";

const StartupProfile = ({ className }) => {
	const { username } = useParams();
	const [profileInfo, setProfileInfo] = React.useState({});
	const [loading, setLoading] = React.useState(true);
	useEffect(() => {
		setLoading(true);
		getData(`/auth/baseuser_search_by_name/${username}/`)
			.then((data) => {
				console.log(data);
				const profile = data.baseuser_profile;
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
				console.log(error);
				if (error.response) {
					// Server responded with a status other than 2xx
					if (error.response.status === 404) {
						// navigate(");
					}
				}
			});
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<Card
			className={`${className} bg-slate-50 overflow-hidden font-vazirmatn w-[90vw] translate-y-[3vw] mb-[6vw] place-self-center`}
		>
			<img
				className="w-full h-[15vw] rounded-t-lg object-cover"
				src={profileInfo.banner}
			/>
			<img
				className="w-[12vw] h-[12vw] rounded-full translate-x-[74vw] translate-y-[-9vw] ring-bomborange absolute ring-[0.4vw] z-[100] object-cover"
				src={profileInfo.avatar}
			/>
			<div className="relative pt-[3vw]">
				<div className="relative">
					<div className="p-8 flex flex-col gap-3 font-vazirmatn">
						<div className="flex rtl justify-between">
							<Label className="text-2xl">اطلاعات کاربری</Label>
						</div>
						<Separator className="my-2 bg-gray-300" />
						<div className="flex flex-col justify-evenly mr-3 gap-1">
							<Label className="text-xl">:نام</Label>
							<p className="text-base">
								{profileInfo.firstName +
									" " +
									profileInfo.lastName}
							</p>
							<Label className="text-xl">:ایمیل</Label>
							<p className="text-base">{profileInfo.email}</p>
							<Label className="text-xl">:بیوگرافی</Label>
							<p className="text-base">{profileInfo.bio}</p>
						</div>
						<ProjectBox type="پروژه‌ا" />
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
			</div>
		</Card>
	);
};

export default StartupProfile;
